import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DataserviceService,
  CurrencyValue,
  TradeHistory,
} from '../../services/dataservice.service';
import { CurrenciesNames } from '../../services/samples/sampledata';
import { SiglasNomes } from '../userinput/userinput.component';

declare var Plotly: any;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent implements OnInit {
  data: TradeHistory; // todos os dados históricos de cotação do dólar
  titulo_prefix: string;
  titulo_sufix: string;

  lista_moedas: SiglasNomes = CurrenciesNames; // lista de moedas com abreviacoes (keys) e nomes extensos (values)
  moeda = new FormControl('BRL'); // valor padrão é nossa moeda nacional

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_data().subscribe((data: TradeHistory) => {
      this.data = data;

      // atualiza titulo do grafico
      this.titulo_prefix = 'Valor necessário em ';
      this.titulo_sufix = ' para comprar 1' + this.data.base;

      this.plot(); // plota o grafico
    });
  }

  plot() {
    /* opções gráficas para o Plotly */
    const graph = {
      data: [
        {
          x: this.get_dates_from_currency(),
          y: this.get_values_from_currency(this.moeda.value),
          type: 'scatter',
          mode: 'lines+markers+text',
          textposition: 'top',
          showlegend: false,
          hovertemplate: '%{y:.3f} ' + this.moeda.value + '<extra></extra>',
        },
      ],
      layout: {
        title: false,
        font: { size: 12 },
        hovermode: 'closest',
        xaxis: { title: 'Datas', fixedrange: true },
        yaxis: {
          title: 'Valor em ' + this.moeda.value,
          fixedrange: true,
          rangemode: 'tozero',
          showticksuffix: 'all',
          ticksuffix: ' ' + this.moeda.value,
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
      },
      config: {
        responsive: true,
        displayModeBar: false,
      },
    };

    Plotly.newPlot('grafico', graph.data, graph.layout, graph.config);
  }

  /* exporta uma array com todos valores da moeda */
  get_values_from_currency(abreviacao_da_moeda: string): Array<number> {
    const array_output: Array<number> = [];
    const dates = Object.keys(this.data.array);

    dates.map((date) => {
      // para cada data da array...
      const teste = Object.values(this.data.array[date]);
      teste.map((values: CurrencyValue) => {
        if (values.sigla === abreviacao_da_moeda) {
          array_output.push(values.valor);
        }
      });
    });

    return array_output;
  }

  get_dates_from_currency(): Array<string> {
    const dates = Object.keys(this.data.array);
    return dates;
  }

  currency_change(event) {
    // console.log(event);
    this.plot();
  }
}

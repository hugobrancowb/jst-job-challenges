import { Component, OnInit, Input } from '@angular/core';
import {
  DataserviceService,
  CurrencyValue,
  TradeHistory,
} from '../../services/dataservice.service';

declare var Plotly: any;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent implements OnInit {
  @Input() currency: string; // moeda selecionada para analisar seu valor em relação ao dólar
  data: TradeHistory; // todos os dados históricos de cotação do dólar
  titulo: string;

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_sample().subscribe((data: TradeHistory) => {
      this.data = data;
      this.titulo = // atualiza titulo do grafico
        'Valor necessário em ' +
        this.currency +
        ' para comprar 1' +
        this.data.base;
      this.plot(); // plota o grafico
    });
  }

  plot() {
    /* opções gráficas para o Plotly */
    const graph = {
      data: [
        {
          x: this.get_dates_from_currency(),
          y: this.get_values_from_currency(this.currency),
          type: 'scatter',
          mode: 'lines+markers+text',
          textposition: 'top',
          showlegend: false,
          hovertemplate: '%{y:.3f} ' + this.currency + '<extra></extra>',
        },
      ],
      layout: {
        title: false,
        hovermode: 'closest',
        font: { size: 12 },
        xaxis: { title: 'Datas', fixedrange: true },
        yaxis: {
          title: 'Valor em ' + this.currency,
          fixedrange: true,
          showticksuffix: 'all',
          ticksuffix: ' ' + this.currency,
        },
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
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DataserviceService,
  CurrencyValue,
  TradeHistory,
} from '../../services/dataservice.service';
import { CurrenciesNames } from '../../services/samples/sampledata';
import { SiglasNomes } from '../userinput/userinput.component';

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
  moeda = new FormControl('BRL'); // valor padrão: moeda nacional

  /* dados plot */
  options: any; // opcoes para o gráfico
  update_data: any; // update nos dados
  x_axis: Array<string>;
  y_axis: Array<number>;

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
    /* opções gráficas para o ngx-charts */
    this.options = graphic_options;

    this.update_data = {
      tooltip: {
        formatter: 'Data: {b}<br/>Valor: {c} ' + this.moeda.value,
      },
      xAxis: {
        data: this.get_dates_from_currency(),
      },
      yAxis: {
        axisLabel: {
          formatter: '{value} ' + this.moeda.value,
        },
      },
      series: [
        {
          data: this.get_values_from_currency(this.moeda.value),
        },
      ],
    };
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
    let dates = Object.keys(this.data.array);

    /* transforma: 2020/12/31 => 31/12/2020 */
    dates = dates.map((item) => {
      const newdate = item.split('-');
      return newdate[2] + '/' + newdate[1] + '/' + newdate[0];
    });

    return dates;
  }

  currency_change() {
    this.plot();
  }

  /* filtra para nao mostrar a moeda BASE na lista de cambio e, assim, não oferecer a opção de converter euro em euro, por exemplo */
  filter_moedas(): SiglasNomes {
    const lista_filtrada = Object.assign({}, CurrenciesNames);
    delete lista_filtrada[this.data.base];

    return lista_filtrada;
  }
}

const graphic_options = {
  title: {
    show: false,
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false,
    },
    data: [],
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    min: 0,
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: [],
    },
  ],
};

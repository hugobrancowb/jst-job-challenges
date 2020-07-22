import { Component, OnInit, Input } from '@angular/core';
import {
  DataserviceService,
  TradeByDate,
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

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    console.log(this.currency);

    this.dataservice.get_sample().subscribe((data: TradeHistory) => {
      this.data = data;
      console.log(this.data);
      this.plot();
    });
  }

  plot() {
    /* opções gráficas para o Plotly */
    const graph = {
      data: [
        {
          x: [1, 2, 3, 4, 5],
          y: [1, 2, 2, 4, 5],
          type: 'scatter',
          mode: 'lines+markers+text',
          textposition: 'top',
          showlegend: false,
          hovertemplate: '%{y:.3f} ' + this.currency + '<extra></extra>',
          // marker: { color: 'rgb(251,174,53)' }, // cor da linha
        },
      ],
      layout: {
        title:
          'Valor necessário em ' +
          this.currency +
          ' para comprar 1' +
          this.data.base,
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
}

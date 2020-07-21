import { Component, Input, OnInit } from '@angular/core';
import {
  DataserviceService,
  HistoricalData,
} from '../../services/dataservice.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent implements OnInit {
  data: HistoricalData; /* talvez não precisemos utilizar essa variavel nesse componente */

  most_recent_data: AllCurrencies;

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_sample().subscribe((data: HistoricalData) => {
      this.data = data; /* valor inicial: Sample Data */
      this.most_recent_data = new AllCurrencies(data, this.dataservice);
    });
  }
}

class AllCurrencies {
  array: Array<CurrencyValue> = [];

  constructor(data: HistoricalData, dataservice: DataserviceService) {
    const size = Object.keys(data.rates).length;
    const last_date = Object.keys(data.rates)[size - 1];

    const siglas: Array<string> = Object.keys(data.rates[last_date]);
    const valores: Array<number> = Object.values(data.rates[last_date]);

    siglas.map((data_row, index) => {
      this.array.push({
        sigla: data_row,
        nome: dataservice.get_name(data_row),
        valor: valores[index],
      });
    });
  }
}

interface CurrencyValue {
  sigla: string;
  nome: string;
  valor: number;
}

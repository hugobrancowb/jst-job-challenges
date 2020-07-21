import { Component, Input, OnInit } from '@angular/core';
import {
  DataserviceService,
  HistoricalData,
} from '../../services/dataservice.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent implements OnInit {
  most_recent_data: TradeByDate;

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_sample().subscribe((data: HistoricalData) => {
      const _tradeHistory = new TradeHistory(data, this.dataservice);
      this.most_recent_data = _tradeHistory.get_data_from_last_date();
      console.log(this.most_recent_data);
    });
  }
}

export class TradeHistory {
  array: Array<TradeByDate> = [];

  constructor(data: HistoricalData, dataservice: DataserviceService) {
    const size = Object.keys(data.rates).length;
    const date_array = Object.keys(data.rates);

    date_array.map((date) => {
      const siglas: Array<string> = Object.keys(data.rates[date]);
      const valores: Array<number> = Object.values(data.rates[date]);

      const array: Array<CurrencyValue> = [];

      siglas.map((data_row, index) => {
        array.push({
          sigla: data_row,
          nome: dataservice.get_name(data_row),
          valor: valores[index],
        });
      });

      this.array[date] = array;
    });
  }

  /* returns data the most recent date from current data */
  get_data_from_last_date(): TradeByDate {
    const last_date = this.get_last_date();

    return this.array[last_date];
  }

  /* returns the most recent date  */
  get_last_date(): string {
    const dates_array = Object.keys(this.array);
    const size = dates_array.length - 1;

    return dates_array[size];
  }
}

interface TradeByDate {
  [key: string]: Array<CurrencyValue>;
}

interface CurrencyValue {
  sigla: string;
  nome: string;
  valor: number;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { SampleData, CurrenciesNames } from './samples/sampledata';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  private response: BehaviorSubject<TradeHistory>;

  constructor(private http: HttpClient) {
    this.response = new BehaviorSubject<TradeHistory>(SampleData);
  }

  set_sample(input: DataResponse): void {
    const output = new TradeHistory(input);
    this.response.next(output);
  }

  get_sample(): Observable<TradeHistory> {
    /* apenas para testes: importa sample data */
    const data = SampleData as DataResponse;

    this.set_sample(data); /* transforma em TradeHistory e aciona o next() */
    return this.response.asObservable();
  }
}

/* nosso tipo principal para trabalhar no aplicativo */
export class TradeHistory {
  base: string; // Abreviação da moeda base
  array: Array<TradeByDate> = []; // Conjunto de conversões classificado por data

  constructor(data: DataResponse) {
    const date_array = Object.keys(data.rates); // Array com todas datas da resposta

    /* Para cada data de dados, reorganizamos a resposta do API para passarmos a trabalhar com Arrays no tipo TradeHistory */
    date_array.map((date) => {
      const siglas: Array<string> = Object.keys(data.rates[date]);
      const valores: Array<number> = Object.values(data.rates[date]);

      const array: Array<CurrencyValue> = [];

      siglas.map((data_row, index) => {
        array.push({
          sigla: data_row,
          nome: this.get_name(data_row), // converte para o nome completo da moeda
          valor: valores[index],
        });
      });

      this.array[date] = array;
    });

    this.base = data.base; // moeda base (por ex: dólar para ser convertido a várias moedas)
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

  /* transforma abreviatura em nome completo para a moeda */
  get_name(abrv: string): string {
    const names = CurrenciesNames;

    return names[abrv];
  }
}

export interface TradeByDate {
  [key: string]: Array<CurrencyValue>;
}

export interface CurrencyValue {
  sigla: string;
  nome: string;
  valor: number;
}

/* * * * * * * * * */

/* resposta do API */
export interface DataResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [key: string]: Rate;
  };
}
interface Rate {
  [key: string]: number;
}

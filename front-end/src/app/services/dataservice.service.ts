import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { SampleData, CurrenciesNames } from './samples/sampledata';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  private response: Subject<TradeHistory>;

  constructor(private http: HttpClient) {
    this.response = new Subject<TradeHistory>();
  }

  set_data(input: DataResponse): void {
    const output = new TradeHistory(input);
    this.response.next(output);
  }

  // Retorna data do observable para todos subscribers
  get_data(): Observable<TradeHistory> {
    return this.response.asObservable();
  }

  get_sample(): Observable<TradeHistory> {
    /* esta funcao, por ora, cumpre o papel da API */

    /* apenas para testes: importa sample data */
    const data = SampleData as DataResponse;

    this.set_data(data); /* transforma em TradeHistory e aciona o next() */
    return this.response.asObservable();
  }

  /* converte para string no formato yyyy-mm-dd */
  date_to_string(date: Date): string {
    const date_string = date.toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const string_array = date_string.split('/');

    return string_array[2] + '-' + string_array[1] + '-' + string_array[0];
  }

  /* * * * * * * * * * * * * * */
  /*      Requisições API      */

  async request_data(
    inicio: Date,
    fim: Date,
    moeda: string
  ): Promise<Observable<TradeHistory>> {
    /* apenas para testes: importa sample data */

    await this.http
      .get(
        'https://api.frankfurter.app/' +
          this.date_to_string(inicio) +
          '..' +
          this.date_to_string(fim) +
          '?from=' +
          moeda
      )
      .subscribe((res: DataResponse) => {
        this.set_data(res); /* transforma em TradeHistory e aciona o next() */
      });

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
  get_data_from_date(date: string): TradeByDate {
    return this.array[date];
  }

  /* returns the most recent date  */
  get_last_date(): string {
    const dates_array = Object.keys(this.array);
    const size = dates_array.length - 1;

    return dates_array[size];
  }

  /* returns an array of dates in string */
  get_all_dates(): Array<string> {
    return Object.keys(this.array); // Array com todas datas da resposta
  }

  /* transforma abreviatura em nome completo para a moeda */
  get_name(abreviacao_da_moeda: string): string {
    const names = CurrenciesNames;

    return names[abreviacao_da_moeda];
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

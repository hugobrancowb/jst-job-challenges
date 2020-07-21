import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { SampleData } from './samples/sampledata';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  private response: BehaviorSubject<HistoricalData>;

  constructor(private http: HttpClient) {
    this.response = new BehaviorSubject<HistoricalData>({
      amount: 0,
      base: '',
      start_date: '',
      end_date: '',
      rates: {},
    });
  }

  set_sample(input: HistoricalData): void {
    this.response.next(input);
  }

  get_sample(): Observable<HistoricalData> {
    const data = SampleData as HistoricalData;

    this.set_sample(data); // linha utilizada para teste apenas
    return this.response.asObservable();
  }
}

export class HistoricalData implements DataResponse {
  constructor(
    public amount: number,
    public base: string,
    public start_date: string,
    public end_date: string,
    public rates: {
      [key: string]: Rate;
    }
  ) {}
}

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

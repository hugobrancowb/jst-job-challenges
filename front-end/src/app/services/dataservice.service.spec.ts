import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import {
  DataserviceService,
  TradeHistory,
  DataResponse,
} from './dataservice.service';
import { SampleData } from '../services/samples/sampledata';
import { Component } from '@angular/core';

describe('DataserviceService', () => {
  let service: DataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    });

    service = TestBed.inject(DataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return full name of currency', () => {
    const sampledata = new TradeHistory(SampleData);

    expect(sampledata.get_name('BRL')).toBe('Brazilian Real');
  });

  it('should convert DataResponse to TradeHistory', () => {
    const sampledata: DataResponse = SampleData;
    const test_if_its_tradehistory = new TradeHistory(sampledata);

    expect(test_if_its_tradehistory).toBeInstanceOf(TradeHistory);
  });

  it('should convert <Date> to a string format that matches the API', () => {
    const date_example = new Date('July 23, 2020 11:00:00');
    const date_API_string_format = service.date_to_string(date_example);

    expect(date_API_string_format).toBe('2020-07-23');
  });
});

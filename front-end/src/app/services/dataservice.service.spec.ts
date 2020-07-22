import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { DataserviceService, TradeHistory } from './dataservice.service';
import { SampleData } from '../services/samples/sampledata';

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
});

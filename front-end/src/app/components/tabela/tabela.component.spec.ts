import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TabelaComponent, TradeHistory } from './tabela.component';
import {
  DataserviceService,
  HistoricalData,
} from '../../services/dataservice.service';

import { SampleData } from '../../services/samples/sampledata';
import { of } from 'rxjs';

describe('TabelaComponent', () => {
  let component: TabelaComponent;
  let fixture: ComponentFixture<TabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TabelaComponent],
      providers: [HttpClient],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get data from subscribing to service', async(() => {
    const service = TestBed.get(DataserviceService);
    const sampledata: HistoricalData = SampleData;

    spyOn(service, 'get_sample').and.returnValue(of(sampledata));

    fixture.detectChanges();

    expect(component.most_recent_data).toBeDefined();
  }));

  it('should convert data:HistoricalData to most_recent_data:TradeHistory', async(() => {
    const service = TestBed.get(DataserviceService);
    const sampledata: HistoricalData = SampleData;

    spyOn(service, 'get_sample').and.returnValue(of(sampledata));

    fixture.detectChanges();

    expect(component.most_recent_data).toBeInstanceOf(TradeHistory);
  }));
});

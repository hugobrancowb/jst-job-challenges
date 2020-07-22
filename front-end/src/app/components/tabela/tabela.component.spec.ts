import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { TabelaComponent } from './tabela.component';
import {
  DataserviceService,
  DataResponse,
  TradeByDate,
} from '../../services/dataservice.service';

import { SampleData } from '../../services/samples/sampledata';

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
    const sampledata: DataResponse = SampleData;

    spyOn(service, 'get_sample').and.returnValue(of(sampledata));

    fixture.detectChanges();

    expect(component.most_recent_data).toBeDefined();
  }));

  it('most_recent_data should be instance of TradeByDate', async(() => {
    const service = TestBed.get(DataserviceService);
    const sampledata: DataResponse = SampleData;

    spyOn(service, 'get_sample').and.returnValue(of(sampledata));

    fixture.detectChanges();

    /* como TradyByDate é uma interface, então olhamos para suas keys */
    expect(Object.keys(component.most_recent_data[0])).toEqual([
      'sigla',
      'nome',
      'valor',
    ]);
  }));
});

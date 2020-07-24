import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { TabelaComponent } from './tabela.component';
import {
  DataserviceService,
  DataResponse,
  TradeHistory,
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

  it('should get data from subscribing to service', (done) => {
    const service = TestBed.get(DataserviceService);
    const sampledata: DataResponse = SampleData;

    spyOn(service, 'get_data').and.returnValue(
      of(new TradeHistory(sampledata))
    );

    service.get_data().subscribe((data) => {
      expect(data).toBeDefined();
      done();
    });
  });

  it('most_recent_data should be instance of TradeByDate', (done) => {
    const service = TestBed.get(DataserviceService);
    const sampledata: DataResponse = SampleData;

    spyOn(service, 'get_data').and.returnValue(
      of(new TradeHistory(sampledata))
    );

    service.get_data().subscribe((data) => {
      component.most_recent_data = data.get_data_from_date('2020-01-31');
      expect(component.most_recent_data).toBeDefined();
      done();
    });
  });
});

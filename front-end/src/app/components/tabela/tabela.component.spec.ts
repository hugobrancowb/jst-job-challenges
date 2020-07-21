import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TabelaComponent } from './tabela.component';
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

  it('should use SampleData as Input to data', () => {
    const sample: HistoricalData = SampleData;

    component.data = sample;

    expect(component.data).toBeDefined();
  });

  it('should get data from subscribing to service', async(() => {
    const service = TestBed.get(DataserviceService);

    const sampledata: HistoricalData = SampleData;

    spyOn(service, 'get_sample').and.returnValue(of(sampledata));

    fixture.detectChanges();

    expect(component.data).toBeDefined();
  }));
});

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

import {
  DataserviceService,
  HistoricalData,
} from './services/dataservice.service';
import { SampleData } from './services/samples/sampledata';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [HttpClient],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should trigger function after click on button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(app, 'get_data_from_service');

    const button = fixture.debugElement.nativeElement.querySelector(
      'button.getsample'
    );
    button.click();
    fixture.detectChanges();

    expect(app.get_data_from_service).toHaveBeenCalled();
  });

  it('should get data from "get_data_from_service"', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const service = TestBed.get(DataserviceService);
    const app = fixture.componentInstance;

    const sampledata: HistoricalData = SampleData;

    spyOn(service, 'get_sample').and.returnValue(of(sampledata));
    app.get_data_from_service();

    fixture.detectChanges();

    expect(app.data).toBeDefined();
    /* quero implementar: teste de instance */
  }));
});

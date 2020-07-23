import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { UserinputComponent } from './userinput.component';
import {
  DataserviceService,
  DataResponse,
  TradeHistory,
} from '../../services/dataservice.service';

describe('UserinputComponent', () => {
  let component: UserinputComponent;
  let fixture: ComponentFixture<UserinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
      declarations: [UserinputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('"set_defaults_if_undefined()" should define user variables', () => {
    /* define valores de referencia para comparar com os resultados */
    const today = new Date();
    const one_year_ago = new Date();
    one_year_ago.setDate(one_year_ago.getDate() - 365);

    component.set_defaults_if_undefined();
    fixture.detectChanges();

    expect(component.data_fim.value).toEqual(today);
    expect(component.data_inicio.value).toEqual(one_year_ago);
    expect(component.moeda.value).toBe('USD');
  });

  it('should request data from service at button click', () => {
    spyOn(component, 'get_response');

    const get_response_button = fixture.debugElement.nativeElement.querySelector(
      'button.get_response_button'
    );
    get_response_button.click(); /* botão para realizar request de dados */

    expect(component.get_response).toHaveBeenCalled();
  });
});

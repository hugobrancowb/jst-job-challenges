import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { UserinputComponent } from './userinput.component';
import { ActivatedRoute } from '@angular/router';

describe('UserinputComponent', () => {
  let component: UserinputComponent;
  let fixture: ComponentFixture<UserinputComponent>;
  const route = ({
    snapshot: {
      params: {
        from: '2020-01-13',
        to: '2020-01-20',
        currency: 'BRL',
      },
    },
  } as any) as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient, { provide: ActivatedRoute, useValue: route }],
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
    /* como estamos utilizando rotas, primeiro é necessario remover os valores já definidos */
    component.data_inicio.patchValue('');
    component.data_fim.patchValue('');
    component.moeda.patchValue('');

    /* define valores de referencia para comparar com os resultados */
    const today = new Date();
    const one_year_ago = new Date();
    one_year_ago.setDate(one_year_ago.getDate() - 365);

    component.set_defaults_if_undefined();
    fixture.detectChanges();

    expect(component.data_inicio.value).toEqual(one_year_ago);
    expect(component.data_fim.value).toEqual(today);
    expect(component.moeda.value).toBe('USD');
  });

  it('should read url params and set variables', () => {
    /* define valores de referencia para comparar com os resultados */

    const datas_inicio_fim = component.date_from_string(
      component.data_inicio.value,
      component.data_fim.value
    );

    fixture.detectChanges();

    /* valores abaixo definidos na rota URL */
    /* o teste só funcionou qnd converti Date para string */
    expect(component.data_inicio.value.toString()).toEqual(
      datas_inicio_fim[0].toString()
    );
    expect(component.data_fim.value.toString()).toBe(
      datas_inicio_fim[1].toString()
    );
    expect(component.moeda.value).toBe('BRL');
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

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrenciesNames } from '../../services/samples/sampledata';

/* Material */
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userinput',
  templateUrl: './userinput.component.html',
  styleUrls: ['./userinput.component.scss'],
})
export class UserinputComponent implements OnInit {
  data_inicio = new FormControl('');
  data_fim = new FormControl('');
  moeda = new FormControl('');

  lista_moedas: SiglasNomes = CurrenciesNames; // lista de moedas com abreviacoes (keys) e nomes extensos (values)

  constructor(
    private dataservice: DataserviceService,
    private route: ActivatedRoute
  ) {
    if (
      this.route.snapshot.params.from &&
      this.route.snapshot.params.to &&
      this.route.snapshot.params.currency
    ) {
      /* há os 3 parametros no link url */

      // modelo: http://localhost:4200/23-10-1993/23-10-2019/BRL

      /* Converter de String para Date */
      let date_string: Array<Date>;

      date_string = this.date_from_string(
        this.route.snapshot.params.from as string,
        this.route.snapshot.params.to as string
      );

      /* atualizar variaveis */
      this.data_inicio.patchValue(date_string[0] as Date);
      this.data_fim.patchValue(date_string[1] as Date);
      this.moeda.patchValue(this.route.snapshot.params.currency as string);

      /* valores definidos, podemos fazer a requisição dos dados */
      this.get_response();
    }
  }

  ngOnInit(): void {}

  get_response() {
    /* se as datas e/ou moeda não estiverem definidas, seleciona valores padrões caso o usuário não escolha alguma opção */
    this.set_defaults_if_undefined();

    this.dataservice.request_data(
      this.data_inicio.value,
      this.data_fim.value,
      this.moeda.value
    );
  }

  /* salva valor em variavel a cada mudança no DatePicker */
  date_change(
    inicio_ou_fim: string,
    event: MatDatepickerInputEvent<Date>
  ): void {
    /* associa a data de acordo com o indicador */
    if (inicio_ou_fim === 'inicio') {
      this.data_inicio.patchValue(event.value);
    } else {
      this.data_fim.patchValue(event.value);
    }
  }

  /* se as datas e/ou moeda não estiverem definidas, seleciona valores padrões caso o usuário não escolha alguma opção */
  set_defaults_if_undefined(): void {
    const today = new Date();
    const one_year_ago = new Date();
    one_year_ago.setDate(one_year_ago.getDate() - 365);

    if (this.data_inicio.value === '') {
      this.data_inicio.patchValue(one_year_ago);
    }
    if (this.data_fim.value === '') {
      this.data_fim.patchValue(today);
    }
    if (this.moeda.value === '' || this.moeda.value === '--') {
      /* Dólar é a opção padrão */
      this.moeda.patchValue('USD');
    }
  }

  date_from_string(from: string, to: string): Array<Date> {
    const output: Array<Date> = [];

    /* from */
    let date_string = this.route.snapshot.params.from.split('-');
    const from_param = new Date();
    from_param.setFullYear(
      parseInt(date_string[2], 10),
      parseInt(date_string[1], 10) - 1,
      parseInt(date_string[0], 10)
    );

    /* to */
    date_string = this.route.snapshot.params.to.split('-');
    const to_param = new Date();
    to_param.setFullYear(
      parseInt(date_string[2], 10),
      parseInt(date_string[1], 10) - 1,
      parseInt(date_string[0], 10)
    );

    output.push(from_param);
    output.push(to_param);

    return output;
  }
}

export interface SiglasNomes {
  [key: string]: string;
}

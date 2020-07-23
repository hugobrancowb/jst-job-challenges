import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrenciesNames } from '../../services/samples/sampledata';

/* Material */
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DataserviceService } from 'src/app/services/dataservice.service';

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

  constructor(private dataservice: DataserviceService) {}

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
}

export interface SiglasNomes {
  [key: string]: string;
}

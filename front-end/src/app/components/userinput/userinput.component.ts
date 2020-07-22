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

    this.dataservice.get_sample(); /* mudar para função que dispara HTTP Request */
  }

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

  /* converte para string no formato yyyy-mm-dd */
  date_to_string(date: Date): string {
    const date_string = date.toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const string_array = date_string.split('/');

    return string_array[2] + '-' + string_array[1] + '-' + string_array[0];
  }
}

interface SiglasNomes {
  [key: string]: string;
}

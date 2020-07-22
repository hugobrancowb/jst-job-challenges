import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CurrenciesNames } from './services/samples/sampledata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Cotação do Dólar';

  private data_inicio: Date;
  private data_fim: Date;

  moedas: SiglasNomes = CurrenciesNames; // lista de moedas com abreviacoes (keys) e nomes extensos (values)
  opcoes_sigla = new FormControl('');

  constructor() {}

  ngOnInit(): void {}

  get_response() {
    console.log('get_response()');
    console.log('inicio: ' + this.date_to_string(this.data_inicio));
    console.log('fim: ' + this.date_to_string(this.data_fim));
    console.log('sigla: ' + this.opcoes_sigla.value);
  }

  date_change(
    inicio_ou_fim: string,
    event: MatDatepickerInputEvent<Date>
  ): void {
    /* associa a data de acordo com o indicador */
    if (inicio_ou_fim === 'inicio') {
      this.data_inicio = event.value;
      console.log(this.data_inicio);
    } else {
      this.data_fim = event.value;
      console.log(this.data_fim);
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

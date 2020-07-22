import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Cotação do Dólar';

  data_inicio: Date;
  data_fim: Date;

  constructor() {}

  ngOnInit(): void {}

  get_response() {
    console.log('');
  }

  date_change(
    inicio_ou_fim: string,
    event: MatDatepickerInputEvent<Date>
  ): void {
    /* associa a data de acordo com o indicador */
    if (inicio_ou_fim === 'inicio') {
      this.data_inicio = event.value;
    } else {
      this.data_fim = event.value;
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

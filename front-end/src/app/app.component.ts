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

  /* grupo criado para o Form de busca */
  form_options = new FormGroup({
    start_date: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  get_response() {
    console.log(this.form_options.value.start_date);
  }

  date_change(event: MatDatepickerInputEvent<Date>) {
    // start by converting to stirng format dd/mm/yyyy
    const date_format = event.value.toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    console.log(event.value);
    console.log(date_format);
  }

  /* implementar opções de moedas para o plot do gráfico */
}

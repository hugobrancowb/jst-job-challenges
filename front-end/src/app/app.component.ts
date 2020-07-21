import { Component, OnInit } from '@angular/core';
import {
  DataserviceService,
  HistoricalData,
} from './services/dataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Cotação do Dólar';
  data: HistoricalData;

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_sample().subscribe((data: HistoricalData) => {
      this.data = data; /* valor inicial: Sample Data */
      console.log('subscribe');
      console.log(this.data);
    });
  }

  get_data_from_service(): void {
    this.dataservice.get_sample();
  }
}

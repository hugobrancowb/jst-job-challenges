import { Component, OnInit } from '@angular/core';
import {
  DataserviceService,
  TradeHistory,
} from './services/dataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data: TradeHistory;
  title = 'Cotação de Moedas';

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_data().subscribe((data: TradeHistory) => {
      this.data = data;
    });
  }
}

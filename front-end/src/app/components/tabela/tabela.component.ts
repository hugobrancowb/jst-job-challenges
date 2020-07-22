import { Component, OnInit } from '@angular/core';
import {
  DataserviceService,
  TradeByDate,
  TradeHistory,
} from '../../services/dataservice.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent implements OnInit {
  most_recent_data: TradeByDate;

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_sample().subscribe((data: TradeHistory) => {
      const _tradeHistory = data;
      this.most_recent_data = _tradeHistory.get_data_from_last_date();
    });
  }
}

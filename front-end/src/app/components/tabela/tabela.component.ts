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
  date_mais_recente: string;
  sigla_da_moeda: string;

  /* Material Table */
  displayedColumns = ['sigla', 'nome', 'valor'];

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_data().subscribe((data: TradeHistory) => {
      const _tradeHistory = data;
      this.sigla_da_moeda = data.base;
      this.most_recent_data = _tradeHistory.get_data_from_last_date();
      this.date_mais_recente = _tradeHistory.get_last_date();
    });
  }
}

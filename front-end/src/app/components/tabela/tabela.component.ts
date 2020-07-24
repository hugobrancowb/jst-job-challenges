import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  dados_recebidos_do_API: TradeHistory; // salva todos os dados para nao precisar refazer uma requisição para exibir outras datas na tabela

  most_recent_data: TradeByDate;
  sigla_da_moeda: string;
  date_em_exibicao = new FormControl('');
  todas_as_datas_recebidas: Array<string>;

  /* Material Table */
  displayedColumns = ['sigla', 'nome', 'valor'];

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_data().subscribe((data: TradeHistory) => {
      /* recebe dados do serviço */
      this.dados_recebidos_do_API = data;

      /* atualiza a moeda analisada */
      this.sigla_da_moeda = data.base;

      /* data atualmente exibida na tabela */
      this.date_em_exibicao.patchValue(
        this.dados_recebidos_do_API.get_last_date()
      );

      /* dados da data atualmente exibida na tabela */
      this.most_recent_data = this.dados_recebidos_do_API.get_data_from_date(
        this.date_em_exibicao.value
      );

      /* array de datas */
      this.todas_as_datas_recebidas = this.dados_recebidos_do_API.get_all_dates();
    });
  }

  date_change(): void {
    /* dados da data atualmente exibida na tabela */
    this.most_recent_data = this.dados_recebidos_do_API.get_data_from_date(
      this.date_em_exibicao.value
    );
  }
}

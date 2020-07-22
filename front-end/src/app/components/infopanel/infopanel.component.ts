import { Component, OnInit } from '@angular/core';
import {
  TradeHistory,
  DataserviceService,
} from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-infopanel',
  templateUrl: './infopanel.component.html',
  styleUrls: ['./infopanel.component.scss'],
})
export class InfopanelComponent implements OnInit {
  data: TradeHistory;

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.get_data().subscribe((data: TradeHistory) => {
      this.data = data;
    });
  }
}

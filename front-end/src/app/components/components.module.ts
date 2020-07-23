import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './tabela/tabela.component';
import { GraficoComponent } from './grafico/grafico.component';
import { UserinputComponent } from './userinput/userinput.component';

import { ReactiveFormsModule } from '@angular/forms';

/* ngx-charts */
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

/* Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { InfopanelComponent } from './infopanel/infopanel.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    TabelaComponent,
    GraficoComponent,
    UserinputComponent,
    InfopanelComponent,
  ],
  exports: [
    TabelaComponent,
    GraficoComponent,
    UserinputComponent,
    InfopanelComponent,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
  ],
  imports: [
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
  ],
})
export class ComponentsModule {}

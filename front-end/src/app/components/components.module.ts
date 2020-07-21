import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './tabela/tabela.component';
import { GraficoComponent } from './grafico/grafico.component';

@NgModule({
  declarations: [TabelaComponent, GraficoComponent],
  exports: [TabelaComponent, GraficoComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}

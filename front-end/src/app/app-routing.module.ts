import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserinputComponent } from './components/userinput/userinput.component';

const routes: Routes = [
  { path: '', component: UserinputComponent },
  { path: ':from/:to/:currency', component: UserinputComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

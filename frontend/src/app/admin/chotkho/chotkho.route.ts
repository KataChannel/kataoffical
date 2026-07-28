import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListChotkhoComponent } from './listchotkho/listchotkho';
const routes: Routes = [
  {
    path: '',
    component: ListChotkhoComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailchotkho/detailchotkho').then(
            (c) => c.DetailChotkhoComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChotkhoRoutingModule {}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListLichhenComponent } from './listlichhen/listlichhen';
const routes: Routes = [
  {
    path: '',
    component: ListLichhenComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detaillichhen/detaillichhen').then(
            (c) => c.DetailLichhenComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichhenRoutingModule {}
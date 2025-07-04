import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListKhoahocComponent } from './listkhoahoc/listkhoahoc';
const routes: Routes = [
  {
    path: '',
    component: ListKhoahocComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailkhoahoc/detailkhoahoc').then(
            (c) => c.DetailKhoahocComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhoahocRoutingModule {}
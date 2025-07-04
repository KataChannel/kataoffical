import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHoahongComponent } from './listhoahong/listhoahong';
const routes: Routes = [
  {
    path: '',
    component: ListHoahongComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailhoahong/detailhoahong').then(
            (c) => c.DetailHoahongComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoahongRoutingModule {}
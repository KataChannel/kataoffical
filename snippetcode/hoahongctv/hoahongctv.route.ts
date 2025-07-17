import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHoahongctvComponent } from './listhoahongctv/listhoahongctv';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarhoahongctv/dashboarhoahongctv').then(
        (c) => c.DashboarhoahongctvComponent
      ),
  },
  {
    path: '',
    component: ListHoahongctvComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailhoahongctv/detailhoahongctv').then(
            (c) => c.DetailHoahongctvComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoahongctvRoutingModule {}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDoanhsoComponent } from './listdoanhso/listdoanhso.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboardoanhso/dashboardoanhso.component').then(
        (c) => c.DashboardoanhsoComponent
      ),
  },
  {
    path: '',
    component: ListDoanhsoComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detaildoanhso/detaildoanhso.component').then(
            (c) => c.DetailDoanhsoComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoanhsoRoutingModule {}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDanhmucComponent } from './listdanhmuc/listdanhmuc.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboardanhmuc/dashboardanhmuc.component').then(
        (c) => c.DashboardanhmucComponent
      ),
  },
  {
    path: '',
    component: ListDanhmucComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detaildanhmuc/detaildanhmuc.component').then(
            (c) => c.DetailDanhmucComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DanhmucRoutingModule {}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDanhmucComponent } from './listdanhmuc/listdanhmuc';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboardanhmuc/dashboardanhmuc').then(
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
          import('./detaildanhmuc/detaildanhmuc').then(
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
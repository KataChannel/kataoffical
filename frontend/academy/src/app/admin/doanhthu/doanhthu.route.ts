import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDoanhthuComponent } from './listdoanhthu/listdoanhthu.component';
const routes: Routes = [
  // {
  //       path: 'doanhthu',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'doanhthu.view' },
  //       loadChildren: () =>
  //          import('./admin/doanhthu/doanhthu.route').then(m => m.DoanhthuRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboardoanhthu/dashboardoanhthu.component').then(
        (c) => c.DashboardoanhthuComponent
      ),
  },
  {
    path: '',
    component: ListDoanhthuComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detaildoanhthu/detaildoanhthu.component').then(
            (c) => c.DetailDoanhthuComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoanhthuRoutingModule {}
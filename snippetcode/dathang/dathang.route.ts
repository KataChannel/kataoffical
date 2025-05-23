import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDathangComponent } from './listdathang/listdathang.component';
const routes: Routes = [
  // {
  //       path: 'dathang',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'dathang.view' },
  //       loadChildren: () =>
  //          import('./admin/dathang/dathang.route').then(m => m.DathangRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboardathang/dashboardathang.component').then(
        (c) => c.DashboardathangComponent
      ),
  },
  {
    path: '',
    component: ListDathangComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detaildathang/detaildathang.component').then(
            (c) => c.DetailDathangComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DathangRoutingModule {}
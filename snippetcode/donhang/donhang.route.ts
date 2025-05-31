import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDonhangComponent } from './listdonhang/listdonhang.component';
const routes: Routes = [
  // {
  //       path: 'donhang',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'donhang.view' },
  //       loadChildren: () =>
  //          import('./admin/donhang/donhang.route').then(m => m.DonhangRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboardonhang/dashboardonhang.component').then(
        (c) => c.DashboardonhangComponent
      ),
  },
  {
    path: '',
    component: ListDonhangComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detaildonhang/detaildonhang.component').then(
            (c) => c.DetailDonhangComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonhangRoutingModule {}
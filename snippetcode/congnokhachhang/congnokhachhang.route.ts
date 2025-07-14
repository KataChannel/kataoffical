import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCongnokhachhangComponent } from './listcongnokhachhang/listcongnokhachhang';
const routes: Routes = [
  // {
  //       path: 'congnokhachhang',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'congnokhachhang.view' },
  //       loadChildren: () =>
  //          import('./admin/congnokhachhang/congnokhachhang.route').then(m => m.CongnokhachhangRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarcongnokhachhang/dashboarcongnokhachhang').then(
        (c) => c.DashboarcongnokhachhangComponent
      ),
  },
  {
    path: '',
    component: ListCongnokhachhangComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailcongnokhachhang/detailcongnokhachhang').then(
            (c) => c.DetailCongnokhachhangComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CongnokhachhangRoutingModule {}
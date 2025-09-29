import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListKhachhangComponent } from './listkhachhang/listkhachhang.component';
const routes: Routes = [
  // {
  //       path: 'khachhang',
  //       canActivate: [KhachhangGuard],
  //       data: { khachhang: 'khachhang.view' },
  //       loadChildren: () =>
  //          import('./admin/khachhang/khachhang.route').then(m => m.KhachhangRoutingModule),
  // },
  // {
  //   path: 'dashboard',
  //   loadComponent: () =>
  //     import('./dashboarkhachhang/dashboarkhachhang.component').then(
  //       (c) => c.DashboarkhachhangComponent
  //     ),
  // },
  {
    path: '',
    component: ListKhachhangComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailkhachhang/detailkhachhang.component').then(
            (c) => c.DetailKhachhangComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhachhangRoutingModule {}
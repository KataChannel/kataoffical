import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListKhachhangComponent } from './listkhachhang/listkhachhang.component';
const routes: Routes = [
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
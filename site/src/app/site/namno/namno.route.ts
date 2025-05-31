import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '', 
    loadComponent: () =>
      import('./namno.component').then(
        (c) => c.NamnoComponent
      ),
    children: [
      {
            path: 'donhang',
            loadChildren: () =>
              import('./donhang/donhang.route').then(m => m.DonhangRoutingModule),
      },
      {
        path: 'dathang',
        loadComponent: () =>
          import('./dathang/dathang.component').then((c) => c.DathangComponent),
      },
      {
        path: 'baogia',
        loadComponent: () =>
          import('./baogia/baogia.component').then((c) => c.BaogiaComponent),
      },
      {
        path: 'kho',
        loadComponent: () =>
          import('./kho/kho.component').then((c) => c.KhoComponent),
      },
      {
        path: 'vanchuyen',
        loadComponent: () =>
          import('./vanchuyen/vanchuyen.component').then((c) => c.VanchuyenComponent),
      },
      {
        path: 'khachhang',
        loadComponent: () =>
          import('./khachhang/khachhang.component').then((c) => c.KhachhangComponent),
      },
      {
        path: 'nhacungcap',
        loadComponent: () =>
          import('./nhacungcap/nhacungcap.component').then((c) => c.NhacungcapComponent),
      },
      {
        path: 'sanpham',
        loadComponent: () =>
          import('./sanpham/sanpham.component').then((c) => c.SanphamComponent),
      },
      {
        path: 'danhmuc',
        loadComponent: () =>
          import('./danhmuc/danhmuc.component').then((c) => c.DanhmucComponent),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NamnoRoutingModule {}
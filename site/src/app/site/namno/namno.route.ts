import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./namno.component').then((c) => c.NamnoComponent),
    children: [
      {
        path: '',
        redirectTo: 'donhang',
        pathMatch: 'full',
      },
      {
        path: 'donhang',
        loadChildren: () =>
          import('./donhang/donhang.route').then((m) => m.DonhangRoutingModule),
      },
      {
        path: 'sanpham',
        loadChildren: () =>
          import('./sanpham/sanpham.route').then((m) => m.SanphamRoutingModule),
      },
      {
        path: 'danhmuc',
        loadChildren: () =>
          import('./danhmuc/danhmuc.route').then((m) => m.DanhmucRoutingModule),
      },
  {
        path: 'dathang',
        loadChildren: () =>
           import('./dathang/dathang.route').then(m => m.DathangRoutingModule),
  },
      {
        path: 'banggia',
        loadChildren: () =>
          import('./banggia/banggia.route').then((m) => m.BanggiaRoutingModule),
      },
      {
        path: 'kho',
        loadComponent: () =>
          import('./kho/kho.component').then((c) => c.KhoComponent),
      },
      {
        path: 'vanchuyen',
        loadComponent: () =>
          import('./vanchuyen/vanchuyen.component').then(
            (c) => c.VanchuyenComponent
          ),
      },
      {
        path: 'khachhang',
        loadChildren: () =>
          import('./khachhang/khachhang.route').then(
            (m) => m.KhachhangRoutingModule
          ),
      },
      {
        path: 'nhacungcap',
        loadChildren: () =>
          import('./nhacungcap/nhacungcap.route').then(
            (m) => m.NhacungcapRoutingModule
          ),
      },
        {
        path: 'phieukho',
        loadChildren: () =>
           import('./phieukho/phieukho.route').then(m => m.PhieukhoRoutingModule),
  },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NamnoRoutingModule {}

import { Routes } from '@angular/router';
import { GuestGuard } from './shared/users/guards/guest.guard';
import { AuthGuard } from './shared/users/guards/auth.guard';
export const routes: Routes = [
        {
          path: 'tin-tuc/:slug',
          loadComponent: () =>import('./site/danhmucbaiviet/danhmucbaiviet.component').then((c) => c.DanhmucbaivietComponent),
          data: { Type: 'baiviet'},
        },
        {
          path: 'tin-tuc/:slug',
          loadComponent: () =>import('./site/baiviet/baiviet.component').then((c) => c.BaivietComponent),
          data: { Type: 'baivietchitiet'},
        },
        {
          path: 'tin-tuc/:slug',
          loadComponent: () =>import('./site/danhmuc/danhmuc.component').then((c) => c.DanhmucComponent),
          data: { Type: 'sanpham'},
        },
        {
          path: 'tin-tuc/:slug',
          loadComponent: () =>import('./site/sanpham/sanpham.component').then((c) => c.SanphamComponent),
          data: { Type: 'sanphamchitiet'},
        },
  ];

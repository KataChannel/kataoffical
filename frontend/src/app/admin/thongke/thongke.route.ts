import { Routes } from '@angular/router';

export const THONGKE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./khoiluong-khachhang/khoiluong-khachhang.component').then(m => m.KhoiluongKhachhangComponent),
    title: 'Thống kê khối lượng SP theo KH'
  },
  {
    path: 'khoiluong-khachhang',
    loadComponent: () => import('./khoiluong-khachhang/khoiluong-khachhang.component').then(m => m.KhoiluongKhachhangComponent),
    title: 'Thống kê khối lượng SP theo KH'
  }
];

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
  },
  {
    path: 'doisoat-nhap',
    loadComponent: () => import('./doisoat-nhap/doisoat-nhap').then(m => m.DoisoatNhapComponent),
    title: 'Đối soát Nhập hàng (NCC vs Kho)'
  }
];

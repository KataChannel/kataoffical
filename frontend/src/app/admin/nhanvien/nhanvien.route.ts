import { Routes } from '@angular/router';

export const nhanvienRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => 
      import('./listnhanvien/listnhanvien.component').then(m => m.ListNhanvienComponent),
    data: { 
      title: 'Danh sách Nhân Viên',
      breadcrumb: 'Danh sách'
    }
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./formnhanvien/formnhanvien.component').then(m => m.FormNhanvienComponent),
    data: {
      title: 'Thêm Nhân Viên',
      breadcrumb: 'Thêm mới',
      mode: 'create'
    }
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./formnhanvien/formnhanvien.component').then(m => m.FormNhanvienComponent),
    data: {
      title: 'Chỉnh Sửa Nhân Viên',
      breadcrumb: 'Chỉnh sửa',
      mode: 'edit'
    }
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./detailnhanvien/detailnhanvien.component').then(m => m.DetailNhanvienComponent),
    data: {
      title: 'Chi Tiết Nhân Viên',
      breadcrumb: 'Chi tiết'
    }
  }
];

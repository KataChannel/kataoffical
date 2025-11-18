import { Routes } from '@angular/router';

export const phongbanRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => 
      import('./listphongban/listphongban.component').then(m => m.ListPhongbanComponent),
    data: { 
      title: 'Danh sách Phòng Ban',
      breadcrumb: 'Danh sách'
    }
  },
  {
    path: 'tree',
    loadComponent: () => 
      import('./treephongban/treephongban.component').then(m => m.TreePhongbanComponent),
    data: { 
      title: 'Sơ Đồ Tổ Chức',
      breadcrumb: 'Sơ đồ'
    }
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./formphongban/formphongban.component').then(m => m.FormPhongbanComponent),
    data: { 
      title: 'Thêm Phòng Ban',
      breadcrumb: 'Thêm mới',
      mode: 'create'
    }
  },
  {
    path: 'edit/:id',
    loadComponent: () => 
      import('./formphongban/formphongban.component').then(m => m.FormPhongbanComponent),
    data: { 
      title: 'Sửa Phòng Ban',
      breadcrumb: 'Chỉnh sửa',
      mode: 'edit'
    }
  },
  {
    path: 'detail/:id',
    loadComponent: () => 
      import('./detailphongban/detailphongban.component').then(m => m.DetailPhongbanComponent),
    data: { 
      title: 'Chi Tiết Phòng Ban',
      breadcrumb: 'Chi tiết'
    }
  }
];

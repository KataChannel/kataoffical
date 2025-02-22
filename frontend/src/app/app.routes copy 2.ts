import { Routes } from '@angular/router';
import { GuestGuard } from './shared/users/guards/guest.guard';
import { AuthGuard } from './shared/users/guards/auth.guard';
export const routes: Routes = [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: '',
      loadComponent: () =>import('./site/sitemain/sitemain.component').then((c) => c.SitemainComponent),
      children: [
        {
          path: '',
          loadComponent: () =>import('./site/home/home.component').then((c) => c.HomeComponent),
        },
        {
          path: 'danh-muc/:slug',
          data: { breadcrumb: 'Danh Sách Sản Phẩm' },
          loadComponent: () =>import('./site/danhmuc/danhmuc.component').then((c) => c.DanhmucComponent),
        },
        {
          path: 'san-pham/:slug',
          loadComponent: () =>import('./site/sanpham/sanpham.component').then((c) => c.SanphamComponent),
        },
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
      ],
    },
    {
      path: 'admin',
      canActivate: [AuthGuard],
      loadComponent: () => import('./admin/adminmain/adminmain.component').then((c) => c.AdminmainComponent),
      children: [
        {
          path: 'users',
          loadComponent: () => import('./admin/adminmain/listuser/listuser.component').then((c) => c.ListuserComponent),
          children: [
            {
              path: ':id',
              loadComponent: () => import('./admin/adminmain/listuser/detailuser/detailuser.component').then((c) => c.DetailUserComponent),
            },
          ],
        },
        {
          path: 'danhmuc',
          loadComponent: () => import('./admin/listdanhmuc/listdanhmuc.component').then((c) => c.ListdanhmucComponent),
          children: [
            {
              path: ':id',
              loadComponent: () => import('./admin/listdanhmuc/detaildanhmuc/detaildanhmuc.component').then((c) => c.DetailDanhmucComponent),
            },
          ],
        },
        {
          path: 'baiviet',
          loadComponent: () => import('./admin/listbaiviet/listbaiviet.component').then((c) => c.ListbaivietComponent),
          children: [
            {
              path: ':id',
              loadComponent: () => import('./admin/listbaiviet/detailbaiviet/detailbaiviet.component').then((c) => c.DetailBaivietComponent),
            },
          ],
        },
        {
          path: 'sanpham',
          loadComponent: () => import('./admin/listsanpham/listsanpham.component').then((c) => c.ListsanphamComponent),
          children: [
            {
              path: ':id',
              loadComponent: () => import('./admin/listsanpham/detailsanpham/detailsanpham.component').then((c) => c.DetailSanphamComponent),
            },
          ],
        },
        {
          path: 'profile',
          loadComponent: () => import('./shared/users/profile/profile.component').then((c) => c.ProfileComponent),
          children:[
            {
              path: 'socialpage',
              loadComponent: () => import('./shared/users/profile/social/social.component').then((c) => c.SocialComponent),
            },
          ]
        },
        {
          path: 'account',
          redirectTo: 'account/general', // Chuyển hướng đến 'account/password'
          pathMatch: 'full', // Xác định khớp chính xác
        },
        {
          path: 'account',
          loadComponent: () => import('./shared/users/account/account.component').then((c) => c.AccountComponent),
          children:[
            {
              path: 'password',
              loadComponent: () => import('./shared/users/account/password/password.component').then((c) => c.PasswordComponent),
            },
            {
              path:'general',
              loadComponent: () => import('./shared/users/account/general/general.component').then((c) => c.GeneralComponent),
            }
          ]
        },
      ],
    },
    {
      path: 'login',
      canActivate: [GuestGuard],
      canActivateChild: [GuestGuard],
      loadComponent: () => import('./shared/users/login/login.component').then((c) => c.LoginComponent),
    },
    {
      path: 'register',
      loadComponent: () => import('./shared/users/register/register.component').then((c) => c.RegisterComponent),
    },
  ];

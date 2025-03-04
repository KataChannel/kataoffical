import { Routes,Router } from '@angular/router';
import { GuestGuard } from './shared/users/guards/guest.guard';
import { AuthGuard } from './shared/users/guards/auth.guard';
import { DynamicComponentResolver } from './dynamic-component.resolver';
export const routes: Routes = [
    { path: '', redirectTo: 'admin/menu', pathMatch: 'full' },
    {
      path: '404',
      loadComponent: () => import('./site/notfound/notfound.component').then((c) => c.NotfoundComponent),
    },
    {
      path: 'admin',
      canActivate: [AuthGuard],
      loadComponent: () => import('./admin/adminmain/adminmain.component').then((c) => c.AdminmainComponent),
      children: [
        {
          path: 'menu',
          loadComponent: () => import('./admin/menu/menu/listmenu/listmenu.component').then((c) => c.ListMenuComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/menu/menu/listmenu/listmenu.component').then((c) => c.ListMenuComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/menu/menu/detailmenu/detailmenu.component').then((c) => c.DetailMenuComponent),
            },
          ],
        },
        {
          path: 'hotro',
          loadComponent: () => import('./admin/hotro/listhotro/listhotro.component').then((c) => c.ListHotroComponent),
          children: [
            {
              path: ':id',
              loadComponent: () => import('./admin/hotro/listhotro/detailhotro/detailhotro.component').then((c) => c.DetailHotroComponent),
            },
          ],
        },
        {
          path: 'users',
          loadComponent: () => import('./admin/adminmain/listuser/listuser.component').then((c) => c.ListuserComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/adminmain/listuser/listuser.component').then((c) => c.ListuserComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/adminmain/listuser/detailuser/detailuser.component').then((c) => c.DetailUserComponent),
            },
          ],
        },
        {
          path: 'nhomuser',
          loadComponent: () => import('./admin/role/listrole/listrole.component').then((c) => c.ListRoleComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/role/listrole/listrole.component').then((c) => c.ListRoleComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/role/detailrole/detailrole.component').then((c) => c.DetailRoleComponent),
            },
          ],
        },
        {
          path: 'permission',
          loadComponent: () => import('./admin/permission/listpermission/listpermission.component').then((c) => c.ListPermissionComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/permission/listpermission/listpermission.component').then((c) => c.ListPermissionComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/permission/detailpermission/detailpermission.component').then((c) => c.DetailPermissionComponent),
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
          path: 'goooglesheets',
          loadComponent: () => import('./shared/googlesheets/googlesheets.component').then((c) => c.GooglesheetsComponent),
        },
        {
          path: 'sanpham',
          loadComponent: () => import('./admin/sanpham/listsanpham/listsanpham.component').then((c) => c.ListSanphamComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/sanpham/listsanpham/listsanpham.component').then((c) => c.ListSanphamComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/sanpham/detailsanpham/detailsanpham.component').then((c) => c.DetailSanphamComponent),
            },
          ],
        },
        {
          path: 'banggia',
          loadComponent: () => import('./admin/banggia/listbanggia/listbanggia.component').then((c) => c.ListBanggiaComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/banggia/listbanggia/listbanggia.component').then((c) => c.ListBanggiaComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/banggia/detailbanggia/detailbanggia.component').then((c) => c.DetailBanggiaComponent),
            },
          ],
        },
        {
          path: 'khachhang',
          loadComponent: () => import('./admin/khachhang/listkhachhang/listkhachhang.component').then((c) => c.ListKhachhangComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/khachhang/listkhachhang/listkhachhang.component').then((c) => c.ListKhachhangComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/khachhang/detailkhachhang/detailkhachhang.component').then((c) => c.DetailKhachhangComponent),
            },
          ],
        },
        {
          path: 'khachhang',
          loadComponent: () => import('./admin/khachhang/listkhachhang/listkhachhang.component').then((c) => c.ListKhachhangComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/khachhang/listkhachhang/listkhachhang.component').then((c) => c.ListKhachhangComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/khachhang/detailkhachhang/detailkhachhang.component').then((c) => c.DetailKhachhangComponent),
            },
          ],
        },
        {
          path: 'nhomkhachhang',
          loadComponent: () => import('./admin/nhomkhachhang/listnhomkhachhang/listnhomkhachhang.component').then((c) => c.ListNhomkhachhangComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/nhomkhachhang/listnhomkhachhang/listnhomkhachhang.component').then((c) => c.ListNhomkhachhangComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/nhomkhachhang/detailnhomkhachhang/detailnhomkhachhang.component').then((c) => c.DetailNhomkhachhangComponent),
            },
          ],
        },
        {
          path: 'nhacungcap',
          loadComponent: () => import('./admin/nhacungcap/listnhacungcap/listnhacungcap.component').then((c) => c.ListNhacungcapComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/nhacungcap/listnhacungcap/listnhacungcap.component').then((c) => c.ListNhacungcapComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/nhacungcap/detailnhacungcap/detailnhacungcap.component').then((c) => c.DetailNhacungcapComponent),
            },
          ],
        },
        {
          path: 'dathang',
          loadComponent: () => import('./admin/dathang/listdathang/listdathang.component').then((c) => c.ListDathangComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/dathang/listdathang/listdathang.component').then((c) => c.ListDathangComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/dathang/detaildathang/detaildathang.component').then((c) => c.DetailDathangComponent),
            },
          ],
        },
        {
          path: 'donhang',
          loadComponent: () => import('./admin/donhang/listdonhang/listdonhang.component').then((c) => c.ListDonhangComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/donhang/listdonhang/listdonhang.component').then((c) => c.ListDonhangComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/donhang/detaildonhang/detaildonhang.component').then((c) => c.DetailDonhangComponent),
            },
          ],
        },
        {
          path: 'vandon',
          loadComponent: () => import('./admin/donhang/vandon/vandon.component').then((c) => c.VandonComponent),
        },
        {
          path: 'kho',
          loadComponent: () => import('./admin/kho/listkho/listkho.component').then((c) => c.ListKhoComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/kho/listkho/listkho.component').then((c) => c.ListKhoComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/kho/detailkho/detailkho.component').then((c) => c.DetailKhoComponent),
            },
          ],
        },
        {
          path: 'phieukho',
          loadComponent: () => import('./admin/phieukho/listphieukho/listphieukho.component').then((c) => c.ListPhieukhoComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/phieukho/listphieukho/listphieukho.component').then((c) => c.ListPhieukhoComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/phieukho/detailphieukho/detailphieukho.component').then((c) => c.DetailPhieukhoComponent),
            },
          ],
        },
        {
          path: 'user',
          loadComponent: () => import('./admin/user/listuser/listuser.component').then((c) => c.ListUserComponent),
          children: [
            {
              path: '',
              loadComponent: () => import('./admin/user/listuser/listuser.component').then((c) => c.ListUserComponent),
            },
            {
              path: ':id',
              loadComponent: () => import('./admin/user/detailuser/detailuser.component').then((c) => c.DetailUserComponent),
            },
          ],
        },
        {
          path: 'quanlyfile',
          loadComponent: () => import('./admin/listquanlyfile/listquanlyfile.component').then((c) => c.ListquanlyfileComponent),
          children: [
            {
              path: ':id',
              loadComponent: () => import('./admin/listquanlyfile/detailquanlyfile/detailquanlyfile.component').then((c) => c.DetailQuanlyfileComponent),
            }] 
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
      canActivate: [GuestGuard],
      canActivateChild: [GuestGuard],
      loadComponent: () => import('./shared/users/register/register.component').then((c) => c.RegisterComponent),
    },
    {
      path: '',
      loadComponent: () =>import('./site/sitemain/sitemain.component').then((c) => c.SitemainComponent),
      // loadComponent: () =>import('./admin/hotro/listhotro/listhotro.component').then((c) => c.ListHotroComponent),
      // loadComponent: () =>import('./admin/vantay/vantay.component').then((c) => c.VantayComponent),
      //loadComponent: () =>import('./admin/facecomparison/facecomparison.component').then((c) => c.FacecomparisonComponent),
      children: [
        {
          path: '',
          loadComponent: () =>import('./site/home/home.component').then((c) => c.HomeComponent),
        },
        {
          path: 'lien-he',
          loadComponent: () =>import('./site/lienhe/lienhe.component').then((c) => c.LienheComponent),
        },
        {
          path: ':slug',
          resolve: { componentType: DynamicComponentResolver },
          loadComponent: async () => {
            const componentType = history?.state?.componentType; 
            if(componentType)
            {
              switch (componentType) {
                case 'danhmucbaiviet':
                  const c = await import('./site/danhmucbaiviet/danhmucbaiviet.component');
                  return c.DanhmucbaivietComponent;
                case 'baiviet':
                  const c_1 = await import('./site/baiviet/baiviet.component');
                  return c_1.BaivietComponent;
                case 'danhmuc':
                  const c_2 = await import('./site/danhmuc/danhmuc.component');
                  return c_2.DanhmucComponent;
                case 'sanpham':
                  const c_3 = await import('./site/sanpham/sanpham.component');
                  return c_3.SanphamComponent;
                case 'danhmucgioithieu':
                  const c_5 = await import('./site/danhmucgioithieu/danhmucgioithieu.component');
                  return c_5.DanhmucgioithieuComponent;
                case 'gioithieu':
                  const c_6 = await import('./site/gioithieu/gioithieu.component');
                  return c_6.GioithieuComponent;
                default:
                  const c_4 = await import('./site/notfound/notfound.component');
                  return c_4.NotfoundComponent; // Component mặc định
              }
            }
            else {
             return import('./site/home/home.component').then((c) => c.HomeComponent)
            }
          },
        },
      ],
    },
  ];

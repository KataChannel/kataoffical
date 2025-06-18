import { Routes, Router } from '@angular/router';
import { DynamicComponentResolver } from './dynamic-component.resolver';
import { AuthGuard } from './admin/user/common/guards/auth.guard';
import { GuestGuard } from './admin/user/common/guards/guest.guard';
import { PermissionGuard } from './admin/user/common/guards/permission.guard';
export const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '404',
    loadComponent: () =>
      import('./site/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./admin/adminmain/adminmain.component').then(
        (c) => c.AdminmainComponent
      ),
    children: [
      {
        path: 'auditlog',
        canActivate: [PermissionGuard],
        data: { permission: 'auditlog.view' },
        loadChildren: () =>
          import('./admin/auditlog/auditlog.route').then(
            (m) => m.AuditlogRoutingModule
          ),
      },
      {
        path: 'setting',
        canActivate: [PermissionGuard],
        data: { permission: 'setting.view' },
        loadChildren: () =>
          import('./admin/setting/setting.route').then(
            (m) => m.SettingRoutingModule
          ),
      },
      {
        path: 'resource',
        canActivate: [PermissionGuard],
        data: { permission: 'resource.view' },
        loadChildren: () =>
          import('./admin/resource/resource.route').then(
            (m) => m.ResourceRoutingModule
          ),
      },
      {
        path: 'baiviet',
        canActivate: [PermissionGuard],
        data: { permission: 'baiviet.view' },
        loadChildren: () =>
          import('./admin/baiviet/baiviet.route').then(
            (m) => m.BaivietRoutingModule
          ),
      },
      {
        path: 'sanpham',
        canActivate: [PermissionGuard],
        data: { permission: 'sanpham.view' },
        loadChildren: () =>
          import('./admin/sanpham/sanpham.route').then(
            (m) => m.SanphamRoutingModule
          ),
      },

      {
        path: 'welcome',
        loadComponent: () =>
          import('./admin/welcome/welcome.component').then(
            (c) => c.WelcomeComponent
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'hoadon',
        canActivate: [PermissionGuard],
        data: { permission: 'hoadon.view' },
        loadComponent: () =>
          import('./admin/hoadon/listhoadon/listhoadon.component').then(
            (c) => c.ListHoadonComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./admin/hoadon/listhoadon/listhoadon.component').then(
                (c) => c.ListHoadonComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./admin/hoadon/detailhoadon/detailhoadon.component').then(
                (c) => c.DetailHoadonComponent
              ),
          },
        ],
      },
      {
        path: 'hoadonchitiet',
        canActivate: [PermissionGuard],
        data: { permission: 'hoadonchitiet.view' },
        loadComponent: () =>
          import(
            './admin/hoadonchitiet/listhoadonchitiet/listhoadonchitiet.component'
          ).then((c) => c.ListHoadonchitietComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/hoadonchitiet/listhoadonchitiet/listhoadonchitiet.component'
              ).then((c) => c.ListHoadonchitietComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/hoadonchitiet/detailhoadonchitiet/detailhoadonchitiet.component'
              ).then((c) => c.DetailHoadonchitietComponent),
          },
        ],
      },
      {
        path: 'xuatnhapton',
        loadComponent: () =>
          import(
            './admin/hoadonchitiet/xuatnhapton/xuatnhapton.component'
          ).then((c) => c.XuatnhaptonComponent),
      },
      {
        path: 'mathang',
        loadComponent: () =>
          import('./admin/hoadonchitiet/mathang/mathang.component').then(
            (c) => c.MathangComponent
          ),
      },
      {
        path: 'menu',
        canActivate: [PermissionGuard],
        data: { permission: 'menu.view' },
        loadComponent: () =>
          import('./admin/menu/listmenu/listmenu.component').then(
            (c) => c.ListMenuComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./admin/menu/listmenu/listmenu.component').then(
                (c) => c.ListMenuComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./admin/menu/detailmenu/detailmenu.component').then(
                (c) => c.DetailMenuComponent
              ),
          },
        ],
      },
      {
        path: 'userguide',
        canActivate: [PermissionGuard],
        data: { permission: 'userguide.view' },
        loadComponent: () =>
          import(
            './admin/userguide/listuserguide/listuserguide.component'
          ).then((c) => c.ListUserguideComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/userguide/listuserguide/listuserguide.component'
              ).then((c) => c.ListUserguideComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/userguide/detailuserguide/detailuserguide.component'
              ).then((c) => c.DetailUserguideComponent),
          },
        ],
      },
      {
        path: 'quanlyqrcode',
        canActivate: [PermissionGuard],
        data: { permission: 'quanlyqrcode.view' },
        loadComponent: () =>
          import(
            './admin/quanlyqrcode/listquanlyqrcode/listquanlyqrcode.component'
          ).then((c) => c.ListQuanlyqrcodeComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/quanlyqrcode/listquanlyqrcode/listquanlyqrcode.component'
              ).then((c) => c.ListQuanlyqrcodeComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/quanlyqrcode/detailquanlyqrcode/detailquanlyqrcode.component'
              ).then((c) => c.DetailQuanlyqrcodeComponent),
          },
        ],
      },
      {
        path: 'quanlydrive',
        canActivate: [PermissionGuard],
        data: { permission: 'quanlydrive.view' },
        loadComponent: () =>
          import(
            './admin/quanlydrive/listquanlydrive/listquanlydrive.component'
          ).then((c) => c.ListQuanlydriveComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/quanlydrive/listquanlydrive/listquanlydrive.component'
              ).then((c) => c.ListQuanlydriveComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/quanlydrive/detailquanlydrive/detailquanlydrive.component'
              ).then((c) => c.DetailQuanlydriveComponent),
          },
        ],
      },
      {
        path: 'drivelocal',
        canActivate: [PermissionGuard],
        data: { permission: 'drivelocal.view' },
        loadComponent: () =>
          import(
            './admin/quanlydrive/drivelocal/listdrivelocal/listdrivelocal.component'
          ).then((c) => c.ListDrivelocalComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/quanlydrive/drivelocal/listdrivelocal/listdrivelocal.component'
              ).then((c) => c.ListDrivelocalComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/quanlydrive/drivelocal/detaildrivelocal/detaildrivelocal.component'
              ).then((c) => c.DetailDrivelocalComponent),
          },
        ],
      },
      {
        path: 'googlesheet',
        canActivate: [PermissionGuard],
        data: { permission: 'googlesheet.view' },
        loadComponent: () =>
          import(
            './admin/googlesheet/listgooglesheet/listgooglesheet.component'
          ).then((c) => c.ListGooglesheetComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/googlesheet/listgooglesheet/listgooglesheet.component'
              ).then((c) => c.ListGooglesheetComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/googlesheet/detailgooglesheet/detailgooglesheet.component'
              ).then((c) => c.DetailGooglesheetComponent),
          },
        ],
      },
      {
        path: 'landingpage',
        canActivate: [PermissionGuard],
        data: { permission: 'landingpage.view' },
        loadComponent: () =>
          import(
            './admin/landingpage/listlandingpage/listlandingpage.component'
          ).then((c) => c.ListLandingpageComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/landingpage/listlandingpage/listlandingpage.component'
              ).then((c) => c.ListLandingpageComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/landingpage/detaillandingpage/detaillandingpage.component'
              ).then((c) => c.DetailLandingpageComponent),
          },
        ],
      },
      {
        path: 'hotro',
        loadComponent: () =>
          import('./admin/hotro/listhotro/listhotro.component').then(
            (c) => c.ListHotroComponent
          ),
        children: [
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/hotro/listhotro/detailhotro/detailhotro.component'
              ).then((c) => c.DetailHotroComponent),
          },
        ],
      },
      {
        path: 'nhomuser',
        canActivate: [PermissionGuard],
        data: { permission: 'nhomuser.view' },
        loadComponent: () =>
          import('./admin/role/listrole/listrole.component').then(
            (c) => c.ListRoleComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./admin/role/listrole/listrole.component').then(
                (c) => c.ListRoleComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./admin/role/detailrole/detailrole.component').then(
                (c) => c.DetailRoleComponent
              ),
          },
        ],
      },
      {
        path: 'permission',
        canActivate: [PermissionGuard],
        data: { permission: 'permission.view' },
        loadComponent: () =>
          import(
            './admin/permission/listpermission/listpermission.component'
          ).then((c) => c.ListPermissionComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/permission/listpermission/listpermission.component'
              ).then((c) => c.ListPermissionComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/permission/detailpermission/detailpermission.component'
              ).then((c) => c.DetailPermissionComponent),
          },
        ],
      },
      {
        path: 'goooglesheets',
        loadComponent: () =>
          import('./shared/googlesheets/googlesheets.component').then(
            (c) => c.GooglesheetsComponent
          ),
      },
      {
            path: 'user',
            canActivate: [PermissionGuard],
            data: { permission: 'user.view' },
            loadChildren: () =>
              import('./admin/user/user.route').then(m => m.UserRoutingModule),
      },
      {
        path: 'quanlyfile',
        canActivate: [PermissionGuard],
        data: { permission: 'quanlyfile.view' },
        loadComponent: () =>
          import('./admin/listquanlyfile/listquanlyfile.component').then(
            (c) => c.ListquanlyfileComponent
          ),
        children: [
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/listquanlyfile/detailquanlyfile/detailquanlyfile.component'
              ).then((c) => c.DetailQuanlyfileComponent),
          },
        ],
      },
      {
        path: 'profile',
        redirectTo: 'profile/newsfeed',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        canActivate: [PermissionGuard],
        data: { permission: 'profile.view' },
        loadComponent: () =>
          import('./admin/user/common/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
        children: [
          {
            path: 'newsfeed',
            loadComponent: () =>
              import(
                './admin/user/common/profile/newsfeed/newsfeed.component'
              ).then((c) => c.NewsfeedComponent),
          },
          {
            path: 'socialpage',
            loadComponent: () =>
              import(
                './admin/user/common/profile/social/social.component'
              ).then((c) => c.SocialComponent),
          },
          {
            path: 'activity',
            loadComponent: () =>
              import(
                './admin/user/common/profile/activity/activity.component'
              ).then((c) => c.ActivityComponent),
          },
          {
            path: 'gallery',
            loadComponent: () =>
              import(
                './admin/user/common/profile/gallery/gallery.component'
              ).then((c) => c.GalleryComponent),
          },
        ],
      },
      {
        path: 'dexuat',
        canActivate: [PermissionGuard],
        data: { permission: 'dexuat.view' },
        loadComponent: () =>
          import('./admin/dexuat/listdexuat/listdexuat.component').then(
            (c) => c.ListDexuatComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./admin/dexuat/listdexuat/listdexuat.component').then(
                (c) => c.ListDexuatComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./admin/dexuat/detaildexuat/detaildexuat.component').then(
                (c) => c.DetailDexuatComponent
              ),
          },
        ],
      },
      {
        path: 'account',
        redirectTo: 'account/general',
        pathMatch: 'full',
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./admin/user/common/account/account.component').then(
            (c) => c.AccountComponent
          ),
        children: [
          {
            path: 'password',
            loadComponent: () =>
              import(
                './admin/user/common/account/password/password.component'
              ).then((c) => c.PasswordComponent),
          },
          {
            path: 'general',
            loadComponent: () =>
              import(
                './admin/user/common/account/general/general.component'
              ).then((c) => c.GeneralComponent),
          },
          {
            path: 'notifications',
            loadComponent: () =>
              import(
                './admin/user/common/account/notifications/notifications.component'
              ).then((c) => c.NotificationsComponent),
          },
          {
            path: 'billing',
            loadComponent: () =>
              import(
                './admin/user/common/account/billing/billing.component'
              ).then((c) => c.BillingComponent),
          },
          {
            path: 'security',
            loadComponent: () =>
              import(
                './admin/user/common/account/security/security.component'
              ).then((c) => c.SecurityComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
    loadComponent: () =>
      import('./admin/user/common/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
    loadComponent: () =>
      import('./admin/user/common/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'kata',
    canActivate: [AuthGuard],
    // data: { permission: 'site.view' },
    loadChildren: () =>
      import('./site/site.route').then((m) => m.SiteRoutingModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    // data: { permission: 'site.view' },
    loadChildren: () =>
      import('./site/namno/namno.route').then((m) => m.NamnoRoutingModule),
  },

  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   loadComponent: () =>
  //     import('./site/sitemain/sitemain.component').then(
  //       (c) => c.SitemainComponent
  //     ),
  //   // loadComponent: () =>import('./admin/hotro/listhotro/listhotro.component').then((c) => c.ListHotroComponent),
  //   // loadComponent: () =>import('./admin/vantay/vantay.component').then((c) => c.VantayComponent),
  //   //loadComponent: () =>import('./admin/facecomparison/facecomparison.component').then((c) => c.FacecomparisonComponent),
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () =>
  //         import('./site/home/home.component').then((c) => c.HomeComponent),
  //     },
  //     {
  //       path: 'game1',
  //       loadComponent: () =>
  //         import('./site/home/game1/game1.component').then(
  //           (c) => c.Game1Component
  //         ),
  //     },
  //     {
  //       path: 'game2',
  //       loadComponent: () =>
  //         import('./site/home/farm/farm.component').then(
  //           (c) => c.FarmComponent
  //         ),
  //     },
  //     {
  //       path: 'game3',
  //       loadComponent: () =>
  //         import('./site/home/townerdefense/townerdefense.component').then(
  //           (c) => c.TownerdefenseComponent
  //         ),
  //     },
  //     {
  //       path: 'lien-he',
  //       loadComponent: () =>
  //         import('./site/lienhe/lienhe.component').then(
  //           (c) => c.LienheComponent
  //         ),
  //     },
  //     {
  //       path: ':slug',
  //       resolve: { componentType: DynamicComponentResolver },
  //       loadComponent: async () => {
  //         const componentType = history?.state?.componentType;
  //         if (componentType) {
  //           switch (componentType) {
  //             case 'danhmucbaiviet':
  //               const c = await import(
  //                 './site/danhmucbaiviet/danhmucbaiviet.component'
  //               );
  //               return c.DanhmucbaivietComponent;
  //             case 'baiviet':
  //               const c_1 = await import('./site/baiviet/baiviet.component');
  //               return c_1.BaivietComponent;
  //             case 'danhmuc':
  //               const c_2 = await import('./site/danhmuc/danhmuc.component');
  //               return c_2.DanhmucComponent;
  //             case 'sanpham':
  //               const c_3 = await import('./site/sanpham/sanpham.component');
  //               return c_3.SanphamComponent;
  //             case 'danhmucgioithieu':
  //               const c_5 = await import(
  //                 './site/danhmucgioithieu/danhmucgioithieu.component'
  //               );
  //               return c_5.DanhmucgioithieuComponent;
  //             case 'gioithieu':
  //               const c_6 = await import(
  //                 './site/gioithieu/gioithieu.component'
  //               );
  //               return c_6.GioithieuComponent;
  //             default:
  //               const c_4 = await import('./site/notfound/notfound.component');
  //               return c_4.NotfoundComponent; // Component mặc định
  //           }
  //         } else {
  //           return import('./site/home/home.component').then(
  //             (c) => c.HomeComponent
  //           );
  //         }
  //       },
  //     },
  //   ],
  // },
];

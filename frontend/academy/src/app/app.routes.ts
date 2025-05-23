import { Routes, Router } from '@angular/router';
import { DynamicComponentResolver } from './dynamic-component.resolver';
import { AuthGuard } from './admin/user/common/guards/auth.guard';
import { GuestGuard } from './admin/user/common/guards/guest.guard';
import { PermissionGuard } from './admin/user/common/guards/permission.guard';
import { AuthAdminGuard } from './admin/user/common/guards/auth.guardadmin';
export const routes: Routes = [
  // { path: '', redirectTo: 'admin/profile', pathMatch: 'full' },
  {
    path: '404',
    loadComponent: () =>
      import('./site/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
  },
  {
    path: 'admin',
    redirectTo: 'admin/thongkectv',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivate: [AuthAdminGuard],
    loadComponent: () =>
      import('./admin/adminmain/adminmain.component').then(
        (c) => c.AdminmainComponent
      ),
    children: [
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
        path: 'tainguyen',
        canActivate: [PermissionGuard],
        data: { permission: 'tainguyen.view' },
        loadComponent: () =>
          import(
            './admin/tainguyen/listtainguyen/listtainguyen.component'
          ).then((c) => c.ListTainguyenComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/tainguyen/listtainguyen/listtainguyen.component'
              ).then((c) => c.ListTainguyenComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/tainguyen/detailtainguyen/detailtainguyen.component'
              ).then((c) => c.DetailTainguyenComponent),
          },
        ],
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
        path: 'quanlyctv',
        canActivate: [PermissionGuard],
        data: { permission: 'quanlyctv.view' },
        loadComponent: () =>
          import(
            './admin/quanlyctv/listquanlyctv/listquanlyctv.component'
          ).then((c) => c.ListQuanlyctvComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/quanlyctv/listquanlyctv/listquanlyctv.component'
              ).then((c) => c.ListQuanlyctvComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/quanlyctv/detailquanlyctv/detailquanlyctv.component'
              ).then((c) => c.DetailQuanlyctvComponent),
          },
        ],
      },
      {
        path: 'tracking',
        canActivate: [PermissionGuard],
        data: { permission: 'tracking.view' },
        loadComponent: () =>
          import('./admin/tracking/listtracking/listtracking.component').then(
            (c) => c.ListTrackingComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/tracking/listtracking/listtracking.component'
              ).then((c) => c.ListTrackingComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/tracking/detailtracking/detailtracking.component'
              ).then((c) => c.DetailTrackingComponent),
          },
        ],
      },
      {
        path: 'thongkectv',
        canActivate: [PermissionGuard],
        data: { permission: 'thongkectv.view' },
        loadComponent: () =>
          import('./admin/thongkectv/thongkectv.component').then(
            (c) => c.ThongkectvComponent
          ),
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
        path: 'khachhang',
        canActivate: [PermissionGuard],
        data: { permission: 'khachhang.view' },
        loadComponent: () =>
          import(
            './admin/khachhang/listkhachhang/listkhachhang.component'
          ).then((c) => c.ListKhachhangComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/khachhang/listkhachhang/listkhachhang.component'
              ).then((c) => c.ListKhachhangComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/khachhang/detailkhachhang/detailkhachhang.component'
              ).then((c) => c.DetailKhachhangComponent),
          },
        ],
      },
      {
        path: 'nhomkhachhang',
        canActivate: [PermissionGuard],
        data: { permission: 'nhomkhachhang.view' },
        loadComponent: () =>
          import(
            './admin/nhomkhachhang/listnhomkhachhang/listnhomkhachhang.component'
          ).then((c) => c.ListNhomkhachhangComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin/nhomkhachhang/listnhomkhachhang/listnhomkhachhang.component'
              ).then((c) => c.ListNhomkhachhangComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './admin/nhomkhachhang/detailnhomkhachhang/detailnhomkhachhang.component'
              ).then((c) => c.DetailNhomkhachhangComponent),
          },
        ],
      },
      {
        path: 'user',
        canActivate: [PermissionGuard],
        data: { permission: 'user.view' },
        loadComponent: () =>
          import('./admin/user/listuser/listuser.component').then(
            (c) => c.ListUserComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./admin/user/listuser/listuser.component').then(
                (c) => c.ListUserComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./admin/user/detailuser/detailuser.component').then(
                (c) => c.DetailUserComponent
              ),
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
    path: 'loginctv',
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
    loadComponent: () =>
      import('./admin/user/common/loginctv/loginctv.component').then(
        (c) => c.LoginctvComponent
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
    path: 'ladictv/:slug',
    loadComponent: () =>
      import('./site/home/ladictv/detailladictv/detailladictv.component').then(
        (c) => c.DetailladictvComponent
      ),
  },
  {
    path: '',
    redirectTo: 'gioithieuctv',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./site/home/home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: 'gioithieuctv',
        loadComponent: () =>
          import('./site/home/gioithieuctv/gioithieuctv.component').then(
            (c) => c.GioithieuctvComponent
          ),
      },
      {
        path: 'dangkyctv',
        canActivate: [GuestGuard],
        loadComponent: () =>
          import('./site/home/dangkyctv/dangkyctv.component').then(
            (c) => c.DangkyctvComponent
          ),
      },
      {
        path: 'hotroctv',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./site/home/hotroctv/hotroctv.component').then(
            (c) => c.HotroctvComponent
          ),
      },
      {
        path: 'ladictv',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./site/home/ladictv/ladictv.component').then(
            (c) => c.LadictvComponent
          ),
      },
      {
        path: 'tainguyenctv',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./site/home/tainguyenctv/tainguyenctv.component').then(
            (c) => c.TainguyenctvComponent
          ),
      },
      {
        path: 'leaderboard',
        loadComponent: () =>
          import('./site/home/leaderboard/leaderboard.component').then(
            (c) => c.LeaderboardComponent
          ),
      },
      {
        path: 'taikhoanctv',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./site/home/taikhoanctv/taikhoanctv.component').then(
            (c) => c.TaikhoanctvComponent
          ),
        children: [
          // {
          //   path: '',
          //   loadComponent: () =>
          //     import(
          //       './site/home/taikhoanctv/dashboardthongke/dashboardthongke.component'
          //     ).then((c) => c.DashboardthongkeComponent),
          // },
          // {
          //   path: 'thongketruycap',
          //   loadComponent: () =>
          //     import(
          //       './site/home/taikhoanctv/thongketruycap/thongketruycap.component'
          //     ).then((c) => c.ThongketruycapComponent),
          // },
        ],
      },
      {
        path: 'dashboardctv',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./site/home/dashboardctv/dashboardctv.component').then(
            (c) => c.DashboardctvComponent
          ),
        children: [
        ],
      },
      {
        path: 'thongkectv',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./site/home/thongkectv/thongkectv.component').then(
            (c) => c.ThongkectvComponent
          ),
        children: [
        ],
      },
      {
        path: 'lienketctv',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./site/home/lienketctv/lienketctv.component').then(
            (c) => c.LienketctvComponent
          ),
        children: [
        ],
      },
      {
        path: 'faqctv',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./site/home/faqctv/faqctv.component').then(
            (c) => c.FaqctvComponent
          ),
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
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./site/sitemain/sitemain.component').then(
  //       (c) => c.SitemainComponent
  //     ),
  //   children: [
  //     { path: '', redirectTo: 'gioithieuctv', pathMatch: 'full' },
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

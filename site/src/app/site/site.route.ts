import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '', 
    loadComponent: () =>
      import('./sitemain/sitemain.component').then(
        (c) => c.SitemainComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'game1',
        loadComponent: () =>
          import('./home/game1/game1.component').then(
            (c) => c.Game1Component
          ),
      },
      {
        path: 'game2',
        loadComponent: () =>
          import('./home/farm/farm.component').then(
            (c) => c.FarmComponent
          ),
      },
      {
        path: 'game3',
        loadComponent: () =>
          import('./home/townerdefense/townerdefense.component').then(
            (c) => c.TownerdefenseComponent
          ),
      }
      // {
      //   path: ':slug',
      //   resolve: { componentType: DynamicComponentResolver },
      //   loadComponent: async () => {
      //     const componentType = history?.state?.componentType;
      //     if (componentType) {
      //       switch (componentType) {
      //         case 'danhmucbaiviet':
      //           const c = await import(
      //             './danhmucbaiviet/danhmucbaiviet.component'
      //           );
      //           return c.DanhmucbaivietComponent;
      //         case 'baiviet':
      //           const c_1 = await import('./baiviet/baiviet.component');
      //           return c_1.BaivietComponent;
      //         case 'danhmuc':
      //           const c_2 = await import('./danhmuc/danhmuc.component');
      //           return c_2.DanhmucComponent;
      //         case 'sanpham':
      //           const c_3 = await import('./sanpham/sanpham.component');
      //           return c_3.SanphamComponent;
      //         case 'danhmucgioithieu':
      //           const c_5 = await import(
      //             './danhmucgioithieu/danhmucgioithieu.component'
      //           );
      //           return c_5.DanhmucgioithieuComponent;
      //         case 'gioithieu':
      //           const c_6 = await import(
      //             './gioithieu/gioithieu.component'
      //           );
      //           return c_6.GioithieuComponent;
      //         default:
      //           const c_4 = await import('./notfound/notfound.component');
      //           return c_4.NotfoundComponent; // Component mặc định
      //       }
      //     } else {
      //       return import('./home/home.component').then(
      //         (c) => c.HomeComponent
      //       );
      //     }
      //   },
      // },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
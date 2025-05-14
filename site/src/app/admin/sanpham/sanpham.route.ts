import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSanphamComponent } from './listsanpham/listsanpham.component';
const routes: Routes = [
  // {
  //       path: 'sanpham',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'sanpham.view' },
  //       loadChildren: () =>
  //          import('./admin/sanpham/sanpham.route').then(m => m.SanphamRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarsanpham/dashboarsanpham.component').then(
        (c) => c.DashboarsanphamComponent
      ),
  },
  {
    path: '',
    component: ListSanphamComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailsanpham/detailsanpham.component').then(
            (c) => c.DetailSanphamComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SanphamRoutingModule {}

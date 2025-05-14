import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBaivietComponent } from './listbaiviet/listbaiviet.component';
const routes: Routes = [
  // {
  //       path: 'baiviet',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'baiviet.view' },
  //       loadChildren: () =>
  //          import('./admin/baiviet/baiviet.route').then(m => m.BaivietRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarbaiviet/dashboarbaiviet.component').then(
        (c) => c.DashboarbaivietComponent
      ),
  },
  {
    path: '',
    component: ListBaivietComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailbaiviet/detailbaiviet.component').then(
            (c) => c.DetailBaivietComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaivietRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHoadonComponent } from './listhoadon/listhoadon.component';
const routes: Routes = [
  // {
  //       path: 'hoadon',
  //       canActivate: [HoadonGuard],
  //       data: { hoadon: 'hoadon.view' },
  //       loadChildren: () =>
  //          import('./admin/hoadon/hoadon.route').then(m => m.HoadonRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarhoadon/dashboarhoadon.component').then(
        (c) => c.DashboarhoadonComponent
      ),
  },
  {
    path: '',
    component: ListHoadonComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailhoadon/detailhoadon.component').then(
            (c) => c.DetailHoadonComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoadonRoutingModule {}
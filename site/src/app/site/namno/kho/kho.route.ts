import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListKhoComponent } from './listkho/listkho';
const routes: Routes = [
  // {
  //       path: 'kho',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'kho.view' },
  //       loadChildren: () =>
  //          import('./admin/kho/kho.route').then(m => m.KhoRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarkho/dashboarkho').then(
        (c) => c.DashboarkhoComponent
      ),
  },
  {
    path: '',
    component: ListKhoComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailkho/detailkho').then(
            (c) => c.DetailKhoComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhoRoutingModule {}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListThanhtoanhoahongComponent } from './listthanhtoanhoahong/listthanhtoanhoahong';
const routes: Routes = [
  // {
  //       path: 'thanhtoanhoahong',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'thanhtoanhoahong.view' },
  //       loadChildren: () =>
  //          import('./admin/thanhtoanhoahong/thanhtoanhoahong.route').then(m => m.ThanhtoanhoahongRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarthanhtoanhoahong/dashboarthanhtoanhoahong').then(
        (c) => c.DashboarthanhtoanhoahongComponent
      ),
  },
  {
    path: '',
    component: ListThanhtoanhoahongComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailthanhtoanhoahong/detailthanhtoanhoahong').then(
            (c) => c.DetailThanhtoanhoahongComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThanhtoanhoahongRoutingModule {}
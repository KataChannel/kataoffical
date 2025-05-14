import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPermissionComponent } from './listpermission/listpermission.component';
const routes: Routes = [
  // {
  //       path: 'permission',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'permission.view' },
  //       loadChildren: () =>
  //          import('./admin/permission/permission.route').then(m => m.PermissionRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarpermission/dashboarpermission.component').then(
        (c) => c.DashboarpermissionComponent
      ),
  },
  {
    path: '',
    component: ListPermissionComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailpermission/detailpermission.component').then(
            (c) => c.DetailPermissionComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListXuatnhaptonComponent } from './listxuatnhapton/listxuatnhapton.component';
const routes: Routes = [
  // {
  //       path: 'xuatnhapton',
  //       canActivate: [XuatnhaptonGuard],
  //       data: { xuatnhapton: 'xuatnhapton.view' },
  //       loadChildren: () =>
  //          import('./admin/xuatnhapton/xuatnhapton.route').then(m => m.XuatnhaptonRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarxuatnhapton/dashboarxuatnhapton.component').then(
        (c) => c.DashboarxuatnhaptonComponent
      ),
  },
  {
    path: '',
    component: ListXuatnhaptonComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailxuatnhapton/detailxuatnhapton.component').then(
            (c) => c.DetailXuatnhaptonComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XuatnhaptonRoutingModule {}
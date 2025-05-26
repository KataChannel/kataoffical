import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFilemanagerComponent } from './listfilemanager/listfilemanager.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarfilemanager/dashboarfilemanager.component').then(
        (c) => c.DashboarfilemanagerComponent
      ),
  },
  {
    path: '',
    component: ListFilemanagerComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailfilemanager/detailfilemanager.component').then(
            (c) => c.DetailFilemanagerComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilemanagerRoutingModule {}
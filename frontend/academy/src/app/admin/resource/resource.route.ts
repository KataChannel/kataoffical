import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListResourceComponent } from './listresource/listresource.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarresource/dashboarresource.component').then(
        (c) => c.DashboarresourceComponent
      ),
  },
  {
    path: '',
    component: ListResourceComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailresource/detailresource.component').then(
            (c) => c.DetailResourceComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './listuser/listuser.component';

const routes: Routes = [
  {
    path: '',
    component: ListUserComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailuser/detailuser.component').then(
            (c) => c.DetailUserComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

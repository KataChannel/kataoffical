import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListNhomnccComponent } from './listnhomncc/listnhomncc.component';
const routes: Routes = [
  {
    path: '',
    component: ListNhomnccComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailnhomncc/detailnhomncc.component').then(
            (c) => c.DetailNhomnccComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhomnccRoutingModule {}
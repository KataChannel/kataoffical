import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListNhomnccComponent } from './listnhomncc/listnhomncc';
const routes: Routes = [
  {
    path: '',
    component: ListNhomnccComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailnhomncc/detailnhomncc').then(
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
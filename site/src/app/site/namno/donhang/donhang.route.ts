import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDonhangComponent } from './listdonhang/listdonhang.component';
const routes: Routes = [
  {
    path: '',
    component: ListDonhangComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detaildonhang/detaildonhang.component').then(
            (c) => c.DetailDonhangComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonhangRoutingModule {}
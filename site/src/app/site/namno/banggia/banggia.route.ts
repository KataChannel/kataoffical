import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBanggiaComponent } from './listbanggia/listbanggia.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarbanggia/dashboarbanggia.component').then(
        (c) => c.DashboarbanggiaComponent
      ),
  },
  {
    path: '',
    component: ListBanggiaComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailbanggia/detailbanggia.component').then(
            (c) => c.DetailBanggiaComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanggiaRoutingModule {}
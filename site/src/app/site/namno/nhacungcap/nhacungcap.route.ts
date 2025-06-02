import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListNhacungcapComponent } from './listnhacungcap/listnhacungcap.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarnhacungcap/dashboarnhacungcap.component').then(
        (c) => c.DashboarnhacungcapComponent
      ),
  },
  {
    path: '',
    component: ListNhacungcapComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailnhacungcap/detailnhacungcap.component').then(
            (c) => c.DetailNhacungcapComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhacungcapRoutingModule {}
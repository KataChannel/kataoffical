import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListNhacungcapComponent } from './listnhacungcap/listnhacungcap';
const routes: Routes = [
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
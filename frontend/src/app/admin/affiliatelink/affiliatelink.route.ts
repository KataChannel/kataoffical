import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAffiliatelinkComponent } from './listaffiliatelink/listaffiliatelink.component';
const routes: Routes = [

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboaraffiliatelink/dashboaraffiliatelink.component').then(
        (c) => c.DashboaraffiliatelinkComponent
      ),
  },
  {
    path: '',
    component: ListAffiliatelinkComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailaffiliatelink/detailaffiliatelink.component').then(
            (c) => c.DetailAffiliatelinkComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffiliatelinkRoutingModule {}
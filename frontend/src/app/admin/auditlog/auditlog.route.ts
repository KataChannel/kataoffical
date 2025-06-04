import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAuditlogComponent } from './listauditlog/listauditlog.component';
const routes: Routes = [
  {
    path: '',
    component: ListAuditlogComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailauditlog/detailauditlog.component').then(
            (c) => c.DetailAuditlogComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditlogRoutingModule {}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListImportdataComponent } from './listimportdata/listimportdata.component';
const routes: Routes = [
  // {
  //       path: 'importdata',
  //       canActivate: [PermissionGuard],
  //       data: { permission: 'importdata.view' },
  //       loadChildren: () =>
  //          import('./admin/importdata/importdata.route').then(m => m.ImportdataRoutingModule),
  // },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarimportdata/dashboarimportdata.component').then(
        (c) => c.DashboarimportdataComponent
      ),
  },
  {
    path: '',
    component: ListImportdataComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailimportdata/detailimportdata.component').then(
            (c) => c.DetailImportdataComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportdataRoutingModule {}
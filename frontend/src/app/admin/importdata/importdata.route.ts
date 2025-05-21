import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListImportdataComponent } from './listimportdata/listimportdata.component';
const routes: Routes = [
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
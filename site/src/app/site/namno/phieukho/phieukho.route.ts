import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPhieukhoComponent } from './listphieukho/listphieukho.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarphieukho/dashboarphieukho.component').then(
        (c) => c.DashboarphieukhoComponent
      ),
  },
  {
    path: '',
    component: ListPhieukhoComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailphieukho/detailphieukho.component').then(
            (c) => c.DetailPhieukhoComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhieukhoRoutingModule {}
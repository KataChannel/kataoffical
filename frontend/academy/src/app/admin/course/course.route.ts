import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCourseComponent } from './listcourse/listcourse.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarcourse/dashboarcourse.component').then(
        (c) => c.DashboarcourseComponent
      ),
  },
  {
    path: '',
    component: ListCourseComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailcourse/detailcourse.component').then(
            (c) => c.DetailCourseComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
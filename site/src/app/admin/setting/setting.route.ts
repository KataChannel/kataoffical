import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSettingComponent } from './listsetting/listsetting.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboarsetting/dashboarsetting.component').then(
        (c) => c.DashboarsettingComponent
      ),
  },
  {
    path: '',
    component: ListSettingComponent,
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./detailsetting/detailsetting.component').then(
            (c) => c.DetailSettingComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
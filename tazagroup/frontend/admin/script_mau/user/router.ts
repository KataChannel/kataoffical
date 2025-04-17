{
         path: 'user',
         canActivate: [PermissionGuard],
         data: { permission: 'user.view' },
         loadComponent: () => import('./admin/user/listuser/listuser.component').then((c) => c.ListUserComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/user/listuser/listuser.component').then((c) => c.ListUserComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/user/detailuser/detailuser.component').then((c) => c.DetailUserComponent),
           },
         ],
       },
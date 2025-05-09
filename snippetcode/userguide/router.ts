{
         path: 'userguide',
         canActivate: [PermissionGuard],
         data: { permission: 'userguide.view' },
         loadComponent: () => import('./admin/userguide/listuserguide/listuserguide.component').then((c) => c.ListUserguideComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/userguide/listuserguide/listuserguide.component').then((c) => c.ListUserguideComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/userguide/detailuserguide/detailuserguide.component').then((c) => c.DetailUserguideComponent),
           },
         ],
       },
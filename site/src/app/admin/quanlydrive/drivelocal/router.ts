{
         path: 'drivelocal',
         canActivate: [PermissionGuard],
         data: { permission: 'drivelocal.view' },
         loadComponent: () => import('./admin/drivelocal/listdrivelocal/listdrivelocal.component').then((c) => c.ListDrivelocalComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/drivelocal/listdrivelocal/listdrivelocal.component').then((c) => c.ListDrivelocalComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/drivelocal/detaildrivelocal/detaildrivelocal.component').then((c) => c.DetailDrivelocalComponent),
           },
         ],
       },
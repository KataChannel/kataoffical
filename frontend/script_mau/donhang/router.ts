{
         path: 'donhang',
         canActivate: [PermissionGuard],
         data: { permission: 'donhang.view' },
         loadComponent: () => import('./admin/donhang/listdonhang/listdonhang.component').then((c) => c.ListDonhangComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/donhang/listdonhang/listdonhang.component').then((c) => c.ListDonhangComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/donhang/detaildonhang/detaildonhang.component').then((c) => c.DetailDonhangComponent),
           },
         ],
       },
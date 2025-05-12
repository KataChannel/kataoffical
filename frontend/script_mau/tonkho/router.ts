{
         path: 'tonkho',
         canActivate: [PermissionGuard],
         data: { permission: 'tonkho.view' },
         loadComponent: () => import('./admin/tonkho/listtonkho/listtonkho.component').then((c) => c.ListTonkhoComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/tonkho/listtonkho/listtonkho.component').then((c) => c.ListTonkhoComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/tonkho/detailtonkho/detailtonkho.component').then((c) => c.DetailTonkhoComponent),
           },
         ],
       },
{
         path: 'hoadonchitiet',
         canActivate: [PermissionGuard],
         data: { permission: 'hoadonchitiet.view' },
         loadComponent: () => import('./admin/hoadonchitiet/listhoadonchitiet/listhoadonchitiet.component').then((c) => c.ListHoadonchitietComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/hoadonchitiet/listhoadonchitiet/listhoadonchitiet.component').then((c) => c.ListHoadonchitietComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/hoadonchitiet/detailhoadonchitiet/detailhoadonchitiet.component').then((c) => c.DetailHoadonchitietComponent),
           },
         ],
       },
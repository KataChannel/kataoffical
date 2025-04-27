{
         path: 'quanlyctv',
         canActivate: [PermissionGuard],
         data: { permission: 'quanlyctv.view' },
         loadComponent: () => import('./admin/quanlyctv/listquanlyctv/listquanlyctv.component').then((c) => c.ListQuanlyctvComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/quanlyctv/listquanlyctv/listquanlyctv.component').then((c) => c.ListQuanlyctvComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/quanlyctv/detailquanlyctv/detailquanlyctv.component').then((c) => c.DetailQuanlyctvComponent),
           },
         ],
       },
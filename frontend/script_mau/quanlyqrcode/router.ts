{
         path: 'quanlyqrcode',
         canActivate: [PermissionGuard],
         data: { permission: 'quanlyqrcode.view' },
         loadComponent: () => import('./admin/quanlyqrcode/listquanlyqrcode/listquanlyqrcode.component').then((c) => c.ListQuanlyqrcodeComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/quanlyqrcode/listquanlyqrcode/listquanlyqrcode.component').then((c) => c.ListQuanlyqrcodeComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/quanlyqrcode/detailquanlyqrcode/detailquanlyqrcode.component').then((c) => c.DetailQuanlyqrcodeComponent),
           },
         ],
       },
{
         path: 'trackingevent',
         canActivate: [PermissionGuard],
         data: { permission: 'trackingevent.view' },
         loadComponent: () => import('./admin/trackingevent/listtrackingevent/listtrackingevent.component').then((c) => c.ListTrackingeventComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/trackingevent/listtrackingevent/listtrackingevent.component').then((c) => c.ListTrackingeventComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/trackingevent/detailtrackingevent/detailtrackingevent.component').then((c) => c.DetailTrackingeventComponent),
           },
         ],
       },
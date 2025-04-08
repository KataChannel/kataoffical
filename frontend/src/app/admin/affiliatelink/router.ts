{
         path: 'affiliatelink',
         canActivate: [PermissionGuard],
         data: { permission: 'affiliatelink.view' },
         loadComponent: () => import('./admin/affiliatelink/listaffiliatelink/listaffiliatelink.component').then((c) => c.ListAffiliatelinkComponent),
         children: [
           {
        path: '',
        loadComponent: () => import('./admin/affiliatelink/listaffiliatelink/listaffiliatelink.component').then((c) => c.ListAffiliatelinkComponent),
           },
           {
        path: ':id',
        loadComponent: () => import('./admin/affiliatelink/detailaffiliatelink/detailaffiliatelink.component').then((c) => c.DetailAffiliatelinkComponent),
           },
         ],
       },
import { Component, inject } from '@angular/core';
import { StorageService } from '../../shared/utils/storage.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-lienheadmin',
  imports: [],
  templateUrl: './lienheadmin.component.html',
  styleUrl: './lienheadmin.component.scss'
})
export class LienheadminComponent {
  private _StorageService:StorageService = inject(StorageService);
  private _route:Router = inject(Router);

  constructor() { 
    
  }
  ngOnInit(): void {
    const permissions = this._StorageService.getItem('permissions');
    if (permissions && Array.isArray(permissions) && permissions.length > 0) {
      const target = permissions[0];
      if (target) {
        const path = typeof target === 'string' ? target : (target.name || target.path || '');
        if (path && typeof path === 'string') {
          this._route.navigate(['admin/', path.split('.')[0]]);
        }
      }
    }
  }
}

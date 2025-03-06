import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../../../../admin/user/user.service';
@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private _UserService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredPermission = route.data['permission'];
    console.log('requiredPermission', requiredPermission);
    console.log(this._UserService.hasPermission(requiredPermission));
    
    if (!this._UserService.hasPermission(requiredPermission)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

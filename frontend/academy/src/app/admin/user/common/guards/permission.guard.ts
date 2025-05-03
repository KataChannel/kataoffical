import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAdminService } from '../../useradmin.service';
@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(
     private _UserService: UserAdminService,
     private router: Router,
     private _snackBar: MatSnackBar
    ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredPermission = route.data['permission'];   
    if (!this._UserService.hasPermission(requiredPermission)) {
      this._snackBar.open('Chưa Có Quyền Truy Cập', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-warning'],
      }); 
      this.router.navigate(['/']);
      return false;
    }else {
      return true;
    }
  }
}

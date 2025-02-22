import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, of,switchMap } from 'rxjs';
import { UsersService } from '../../../admin/adminmain/listuser/listuser.services';
@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(
    private _usersService: UsersService,
    private _router: Router,
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //return true;
    return this._check();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
   return this._check();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
   return this._check();
  }
  private _check(): Observable<boolean> {
    return this._usersService.checkDangnhap().pipe(
      switchMap((authenticated) => {
        console.log(authenticated);
        if (authenticated) {
         this._router.navigate(['']);
          return of(false);
        }
        return of(true);
      })
    );
  }
}

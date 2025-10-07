import { inject, Inject, Injectable, PLATFORM_ID, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { isPlatformBrowser } from '@angular/common';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { AuthUtils } from '../../shared/utils/auth.utils';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _secret: any;
  private _authenticated: boolean = false;
  private APIURL: string = environment.APIURL;
  private isBrowser: boolean;
  constructor(
    private _StorageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  private BASE_URL = `${environment.APIURL}/auth`
  profile = signal<any>({});
  ListUser = signal<any[]>([]);
  DetailUser = signal<any>({});
  userId = signal<string | null>(null);
  setUserId(id: string | null) {
    this.userId.set(id);
  }
  private permissionsSubject = new BehaviorSubject<string[]>([]);
  public permissions$ = this.permissionsSubject.asObservable();
  async getAdmin() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/users/get/admin`, options);
      const data = await response.json();
      // this._users.next(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async CreateUser(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/users`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllUser()
        this.userId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }

  async getAllUser() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/users`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();           
      this.ListUser.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async getUserByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/users/findid/${id}`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailUser.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateUser(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/users/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllUser()
        this.getUserByid(dulieu.id)
    } catch (error) {
        return console.error(error);
    }
  }
  async assignRoleToUser(dulieu: any) {
    try {
      console.log(dulieu);
      
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/users/assign`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getUserByid(dulieu.userId)
    } catch (error) {
        return console.error(error);
    }
  }
  async removeRoleFromUser(dulieu:any) {    
    try {
      console.log(dulieu);
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this._StorageService.getItem('token')
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/users/remove`, options);
          if (!response.ok) {
              // this.handleError(response.status);
          }
          console.log(dulieu);
          
          this.getUserByid(dulieu.userId)
      } catch (error) {
          return console.error(error);
      }
  }
  async DeleteUser(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this._StorageService.getItem('token')
            },
          };
          const response = await fetch(`${environment.APIURL}/users/${item.id}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllUser()
      } catch (error) {
          return console.error(error);
      }
  }



  async changepass(data: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${environment.APIURL}/users/changepass`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result
    } catch (error) {
      return console.error(error);
    }
  }
  async Randompass(data: any){
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${environment.APIURL}/auth/randompass`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json();
      console.log(data);
      return data
    } catch (error) {
      return console.error(error);
    }
  }

  async getProfile() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/users/profile`, options);
      if (!response.ok) {
        console.log(response.status);
        this.handleError(response.status);
        return null;
      }
      const data = await response.json();
      
      // Safe check for permissions array
      const permissions = data.permissions && Array.isArray(data.permissions) 
        ? data.permissions.map((p: any) => p.name || p) 
        : [];
        
      this.profile.set(data);
      if(permissions.length > 0) {
        this._StorageService.setItem('permissions', JSON.stringify(permissions));
      } else {
        // Clear permissions if none found
        this._StorageService.removeItem('permissions');
      }
      return data;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }
  set accessToken(token: string) {
    if (this.isBrowser) {
      this._StorageService.setItem('token', token);
    }
  }
  get accessToken(): string {
    return this.isBrowser ? (this._StorageService.getItem('token') ?? '') : '';
  }


  async login(user: any) {
    if (this._authenticated) {
      return of([false, 'User Đã Đăng Nhập']);
    }

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(`${environment.APIURL}/auth/login`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if(data)
      {
        this._authenticated = true;
        this.accessToken = data.access_token;
        this._StorageService.setItem('permissions', JSON.stringify(data?.user?.permissions||[]));
        this.permissionsSubject.next(data?.user?.permissions);
        return [true,data]
      }
      return  [false, 'Đăng Nhập Thất Bại']
    } catch (error) {
      return console.error(error);
    }
  }
  loadPermissions() {
    const permissions = this._StorageService.getItem('permissions');
    this.permissionsSubject.next(permissions);
    return permissions;
  }

  hasPermission(permission: string): boolean {
    if (!this.permissionsSubject?.getValue()) {
     this.logout()
    }
    return this.permissionsSubject?.getValue()?.includes(permission);
  }
  async register(user: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(`${environment.APIURL}/users/register`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      console.log(data);
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async LoginByGoogle(user: any) {
    if (this._authenticated) {
      return of([false, 'User Đã Đăng Nhập']);
    }

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(`${environment.APIURL}/users/loginbygoogle`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._authenticated = true;
      this.accessToken = data[1].access_token;
      console.log(data);
      return [true,this.accessToken]
    } catch (error) {
      return console.error(error);
    }
  }
  checkDangnhap(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken || this.accessToken === 'undefined') {
      if (this.isBrowser) {
        this._StorageService.removeItem('token');
      }
      return of(false);
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return of(true);
    // return this.signInUsingToken();
  }


  loginWithGoogle() {
    window.location.href = `${this.BASE_URL}/google`; // Chuyển hướng đến Google OAuth
  }

  loginWithFacebook() {
    window.location.href = `${this.BASE_URL}/facebook`;
  }

  loginWithZalo() {
    window.location.href = `${this.BASE_URL}/zalo`;
  }

  handleOAuthCallback(token: string) {
    localStorage.setItem('access_token', token);
    this.router.navigate(['/dashboard']);
  }

  getToken() {
    return this._StorageService.getItem('token')
  }

  async logout() {
    this._StorageService.removeItem('token');
    this._StorageService.removeItem('permissions');
    this.permissionsSubject.next([]);
    this.router.navigate(['/']);
    return true
  }

  private _snackBar:MatSnackBar = inject(MatSnackBar);
  private handleError(status: number) {
    let message = 'Lỗi không xác định';
    switch (status) {
      case 400:
        message = 'Thông tin đã tồn tại';
        this._snackBar.open(message, '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error'],
        });
        break;
      case 404:
        message = 'Vui lòng đăng nhập lại';
        // this._StorageService.removeItem('token');
        // this._StorageService.removeItem('permissions');
        // this.router.navigate(['/login']);
        break;
      case 401:
        message = 'Vui lòng đăng nhập lại';
        // this._StorageService.removeItem('token');
        // this._StorageService.removeItem('permissions');
        // this.router.navigate(['/login']);
        break;
      case 403:
        message = 'Bạn không có quyền truy cập';
        this._snackBar.open(message, '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error'],
        });
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
          this._snackBar.open(message, '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error'],
        });
        break;
      default:
        this._snackBar.open(message, '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error'],
        });
        break;
    }
    //const result = JSON.stringify({ code: status, title: message });
    // this.router.navigate(['/errorserver'], { queryParams: { data: result } });
  }
}
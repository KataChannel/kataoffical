import { inject, Inject, Injectable, PLATFORM_ID, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { openDB } from 'idb';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthUtils } from '../../shared/utils/auth.utils';
  @Injectable({
    providedIn: 'root'
  })
  export class UserAdminService {
    private isBrowser: boolean;
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
      @Inject(PLATFORM_ID) private platformId: object,
    ) { 
      this.isBrowser = isPlatformBrowser(this.platformId);
    }
    private _snackBar: MatSnackBar = inject(MatSnackBar);
    ListUser = signal<any[]>([]);
    DetailUser = signal<any>({});
    userId = signal<string | null>(null);
    setUserId(id: string | null) {
      this.userId.set(id);
    }
      private socket = io(`${environment.ACADEMY_APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
    private readonly _secret: any;
    private _authenticated: boolean = false;
    private APIURL: string = environment.ACADEMY_APIURL;
    private BASE_URL = `${environment.ACADEMY_APIURL}/auth`
    profile = signal<any>({});
    private permissionsadminSubject = new BehaviorSubject<string[]>([]);
    public permissionsadmin$ = this.permissionsadminSubject.asObservable();
    async getAdmin() {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(`${environment.ACADEMY_APIURL}/users/get/admin`, options);
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
          const response = await fetch(`${environment.ACADEMY_APIURL}/users`, options);
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
          this._ErrorLogService.logError('Failed to CreateUser', error);
          return console.error(error);
      }
    }
  
    async getAllUser() {
      const db = await this.initDB();
      const cachedData = await db.getAll('users');
      const updatedAtCache = this._StorageService.getItem('users_updatedAt') || '0';
      // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
      if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
        this.ListUser.set(cachedData);
        return cachedData;
      }
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('tokenadmin')}`
          },
        };
        const lastUpdatedResponse = await fetch(`${environment.ACADEMY_APIURL}/users/last-updated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          return cachedData;
        }    
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        //Nếu cache vẫn mới, không cần tải lại dữ liệu
        if (updatedAtServer <= updatedAtCache) {
          this.ListUser.set(cachedData);
          return cachedData;
        }
        console.log(updatedAtServer, updatedAtCache); 
        //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
        const response = await fetch(`${environment.ACADEMY_APIURL}/users`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return cachedData;
        }
        const data = await response.json();
        await this.saveUsers(data);
        this._StorageService.setItem('users_updatedAt', updatedAtServer);
        this.ListUser.set(data);
        return data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllUser', error);
        console.error(error);
        return cachedData;
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenUserUpdates() {
      this.socket.on('user-updated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('users_updatedAt');
        await this.getAllUser();
      });
    }
    //Khởi tạo IndexedDB
    private async initDB() {
      return await openDB('UserDB', 1, {
        upgrade(db) {
          db.createObjectStore('users', { keyPath: 'id' });
        },
      });
    }
    // Lưu vào IndexedDB
    private async saveUsers(data: any[]) {
      const db = await this.initDB();
      const tx = db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      await store.clear(); // Xóa dữ liệu cũ
      data.forEach(item => store.put(item));
      await tx.done;
    }
  
    async getUserBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('tokenadmin')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.ACADEMY_APIURL}/users/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.DetailUser.set(data)
      } catch (error) {
        this._ErrorLogService.logError('Failed to getUserBy', error);
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
          const response = await fetch(`${environment.ACADEMY_APIURL}/users/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllUser()
          this.getUserBy({id:data.id})
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateUser', error);
          return console.error(error);
      }
    }
    async DeleteUser(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const response = await fetch(`${environment.ACADEMY_APIURL}/users/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllUser()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteUser', error);
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/users/changepass`, options);
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/auth/randompass`, options);
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
          'Authorization': 'Bearer '+ this._StorageService.getItem('tokenadmin')
        },
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/users/profile`, options);
      if (!response.ok) {
        // console.log(response.status);
        this.handleError(response.status);
      }
      const data = await response.json();
      const permissionsadmin = data.permissions.map((p: any) => p.name);
      // console.log(data);
      // console.log(permissionsadmin);
      
      this.profile.set(data)     
      if(permissionsadmin.length>0)
      {
        this._StorageService.setItem('permissionsadmin', JSON.stringify(permissionsadmin));
      }
      return data;
    } catch (error) {
      return console.error(error);
    }
  }


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
          // this._StorageService.removeItem('tokenadmin');
          // this._StorageService.removeItem('permissionsadmin');
          // this.router.navigate(['/login']);
          break;
        case 401:
          message = 'Vui lòng đăng nhập lại';
          // this._StorageService.removeItem('tokenadmin');
          // this._StorageService.removeItem('permissionsadmin');
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
      const result = JSON.stringify({ code: status, title: message });
      // this.router.navigate(['/errorserver'], { queryParams: { data: result } });
    }


  set accesstokenadmin(tokenadmin: string) {
    if (this.isBrowser) {
      this._StorageService.setItem('tokenadmin', tokenadmin);
    }
  }
  get accesstokenadmin(): string {
    return this.isBrowser ? (this._StorageService.getItem('tokenadmin') ?? '') : '';
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/auth/login`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if(data)
      {
        this._authenticated = true;
        this.accesstokenadmin = data.access_token;
        this._StorageService.setItem('permissionsadmin', JSON.stringify(data?.user?.permissions||[]));
        this.permissionsadminSubject.next(data?.user?.permissions);
        return [true,data]
      }
      return  [false, 'Đăng Nhập Thất Bại']
    } catch (error) {
      return console.error(error);
    }
  }
  loadPermissions() {
    const permissionsadmin = this._StorageService.getItem('permissionsadmin');
    this.permissionsadminSubject.next(permissionsadmin);
    return permissionsadmin;
  }

  hasPermission(permission: string): boolean {
    if (!this.permissionsadminSubject?.getValue()) {
      this.logout();
    }
    return this.permissionsadminSubject?.getValue()?.includes(permission);
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/auth/register`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/users/loginbygoogle`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._authenticated = true;
      this.accesstokenadmin = data[1].access_token;
      console.log(data);
      return [true,this.accesstokenadmin]
    } catch (error) {
      return console.error(error);
    }
  }
  checkDangnhap(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accesstokenadmin || this.accesstokenadmin === 'undefined') {
      if (this.isBrowser) {
        this._StorageService.removeItem('tokenadmin');
      }
      return of(false);
    }
    if (AuthUtils.isTokenExpired(this.accesstokenadmin)) {
      return of(false);
    }
    return of(true);
    // return this.signInUsingtokenadmin();
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

  handleOAuthCallback(tokenadmin: string) {
    localStorage.setItem('tokenadmin', tokenadmin);
    this.router.navigate(['/dashboard']);
  }

  gettokenadmin() {
    return this._StorageService.getItem('tokenadmin')
  }

  async logout() {
    this._StorageService.removeItem('tokenadmin');
    this._StorageService.removeItem('permissionsadmin');
    this.permissionsadminSubject.next([]);
    this.router.navigate(['/']);
    return true
  }

  }
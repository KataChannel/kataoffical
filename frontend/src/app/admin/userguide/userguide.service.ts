import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
  @Injectable({
    providedIn: 'root'
  })
  export class UserguideService {
    constructor(
      private _StorageService: StorageService,
      private _ErrorLogService: ErrorLogService,
      private _snackBar: MatSnackBar = inject(MatSnackBar),
    ) { }
    ListUserguide = signal<any[]>([]);
    DetailUserguide = signal<any>({});
    userguideId = signal<string | null>(null);
    setUserguideId(id: string | null) {
      this.userguideId.set(id);
    }
    async CreateUserguide(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',  
              'Authorization': `Bearer ${this._StorageService.getItem('token')}`
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/userguide`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllUserguide()
          this.userguideId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateUserguide', error);
          return console.error(error);
      }
    }
  
    async getAllUserguide() {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
              
          },
        };
        const response = await fetch(`${environment.APIURL}/userguide`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();
        this.ListUserguide.set(data.data);
        return data.data;
      } catch (error) {
        console.error(error);
      }
    }
  
    
    async getUserguideBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.APIURL}/userguide/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.DetailUserguide.set(data.data[0])
      } catch (error) {
        this._ErrorLogService.logError('Failed to getUserguideBy', error);
        return console.error(error);
      }
    }
    async updateUserguide(dulieu: any) {
      try {
        const options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this._StorageService.getItem('token')}`
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/userguide/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          await this.getAllUserguide();
          // await this.getUserguideBy({id:data.data[0].id});
      } catch (error) {
         this._ErrorLogService.logError('Failed to updateUserguide', error);
          return console.error(error);
      }
    }
    async DeleteUserguide(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this._StorageService.getItem('token')
              },
            };
            const response = await fetch(`${environment.APIURL}/userguide/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllUserguide()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteUserguide', error);
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
          //this._StorageService.removeItem('token');
          //this._StorageService.removeItem('permissions');
          //this.router.navigate(['/login']);
          break;
        case 401:
          message = 'Vui lòng đăng nhập lại';
          //this._StorageService.removeItem('token');
          //this._StorageService.removeItem('permissions');
          //this.router.navigate(['/login']);
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
  }
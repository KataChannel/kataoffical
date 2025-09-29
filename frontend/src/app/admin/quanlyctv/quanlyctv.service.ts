import { inject, Inject, Injectable, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { openDB } from 'idb';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
  @Injectable({
    providedIn: 'root'
  })
  export class QuanlyctvService {
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
    ) { }
    private _snackBar:MatSnackBar = inject(MatSnackBar);
    ListQuanlyctv = signal<any[]>([]);
    DetailQuanlyctv = signal<any>({});
    quanlyctvId = signal<string | null>(null);
    setQuanlyctvId(id: string | null) {
      this.quanlyctvId.set(id);
    }
      private socket = io(`${environment.ACADEMY_APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
    async CreateQuanlyctv(dulieu: any) {
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
          this.getAllQuanlyctv()
          this.quanlyctvId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateQuanlyctv', error);
          return console.error(error);
      }
    }
  
    async getAllQuanlyctv() {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
        };
        const response = await fetch(`${environment.ACADEMY_APIURL}/users`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();
        this.ListQuanlyctv.set(data);
        return data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllQuanlyctv', error);
        console.error(error);
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenQuanlyctvUpdates() {
      this.socket.on('quanlyctv-updated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('quanlyctvs_updatedAt');
        await this.getAllQuanlyctv();
      });
    }
  
    async getQuanlyctvBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.ACADEMY_APIURL}/users/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.DetailQuanlyctv.set(data)
      } catch (error) {
        this._ErrorLogService.logError('Failed to getQuanlyctvBy', error);
        return console.error(error);
      }
    }
    async updateQuanlyctv(dulieu: any) {
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
          this.getAllQuanlyctv()
          this.getQuanlyctvBy({id:data.id})
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateQuanlyctv', error);
          return console.error(error);
      }
    }
    async DeleteQuanlyctv(item:any) {    
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
            this.getAllQuanlyctv()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteQuanlyctv', error);
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
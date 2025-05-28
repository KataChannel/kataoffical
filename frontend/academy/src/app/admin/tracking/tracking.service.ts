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
  export class TrackingService {
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
    ) { }
    private _snackBar:MatSnackBar = inject(MatSnackBar);
    ListTracking = signal<any[]>([]);
    DetailTracking = signal<any>({});
    trackingId = signal<string | null>(null);
    setTrackingId(id: string | null) {
      this.trackingId.set(id);
    }
      private socket = io(`${environment.ACADEMY_APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });


    async CreateTracking(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.ACADEMY_APIURL}/trackingevent`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          // this.getAllTracking()
          this.trackingId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateTracking', error);
          return console.error(error);
      }
    }
  
    async getAllTracking() {
      const db = await this.initDB();
      const cachedData = await db.getAll('trackings');
      const updatedAtCache = this._StorageService.getItem('trackings_updatedAt') || '0';
      // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
      if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
        this.ListTracking.set(cachedData);
        return cachedData;
      }
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
        };
        const lastUpdatedResponse = await fetch(`${environment.ACADEMY_APIURL}/last-updated?table=trackingEvent`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          return cachedData;
        }    
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        //Nếu cache vẫn mới, không cần tải lại dữ liệu
        if (updatedAtServer <= updatedAtCache) {
          this.ListTracking.set(cachedData);
          return cachedData;
        }
        console.log(updatedAtServer, updatedAtCache); 
        //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
        const response = await fetch(`${environment.ACADEMY_APIURL}/trackingevent`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return cachedData;
        }
        const data = await response.json();
        await this.saveTrackings(data);
        this._StorageService.setItem('trackings_updatedAt', updatedAtServer);
        this.ListTracking.set(data);
        return data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllTracking', error);
        console.error(error);
        return cachedData;
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenTrackingUpdates() {
      this.socket.on('tracking-updated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('trackings_updatedAt');
        await this.getAllTracking();
      });
    }
    //Khởi tạo IndexedDB
    private async initDB() {
      return await openDB('TrackingDB', 1, {
        upgrade(db) {
          db.createObjectStore('trackings', { keyPath: 'id' });
        },
      });
    }
    // Lưu vào IndexedDB
    private async saveTrackings(data: any[]) {
      const db = await this.initDB();
      const tx = db.transaction('trackings', 'readwrite');
      const store = tx.objectStore('trackings');
      await store.clear(); // Xóa dữ liệu cũ
      data.forEach(item => store.put(item));
      await tx.done;
    }
  
    async getTrackingBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.ACADEMY_APIURL}/trackingevent/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.ListTracking.set(data);
        return data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to getTrackingBy', error);
        return console.error(error);
      }
    }
    async updateTracking(dulieu: any) {
      try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.ACADEMY_APIURL}/trackingevent/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllTracking()
          this.getTrackingBy({id:data.id})
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateTracking', error);
          return console.error(error);
      }
    }
    async DeleteTracking(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const response = await fetch(`${environment.ACADEMY_APIURL}/trackingevent/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllTracking()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteTracking', error);
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
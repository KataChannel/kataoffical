import { inject, Injectable, signal, Signal } from '@angular/core';
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
  export class ResourceService {
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
    ) { }
    private _snackBar:MatSnackBar = inject(MatSnackBar);
    ListResource = signal<any[]>([]);
    DetailResource = signal<any>({});
    resourceId = signal<string | null>(null);
    setResourceId(id: string | null) {
      this.resourceId.set(id);
    }
      private socket = io(`${environment.APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
    async CreateResource(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this._StorageService.getItem('token')}`
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/resource`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllResource()
          this.resourceId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateResource', error);
          return console.error(error);
      }
    }
  
    async getAllResource() {
      const db = await this.initDB();
      const cachedData = await db.getAll('resources');
      const updatedAtCache = this._StorageService.getItem('resources_updatedAt') || '0';
      // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
      if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
        this.ListResource.set(cachedData);
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
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/resource/lastupdated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          return cachedData;
        }    
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        //Nếu cache vẫn mới, không cần tải lại dữ liệu
        if (updatedAtServer <= updatedAtCache) {
          this.ListResource.set(cachedData);
          return cachedData;
        }
        //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
        const response = await fetch(`${environment.APIURL}/resource`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return cachedData;
        }
        const data = await response.json();
        await this.saveResources(data.data);
        this._StorageService.setItem('resources_updatedAt', updatedAtServer);
        this.ListResource.set(data.data);
        return data.data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllResource', error);
        console.error(error);
        return cachedData;
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenResourceUpdates() {
      this.socket.on('resource-updated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('resources_updatedAt');
        await this.getAllResource();
      });
    }
    //Khởi tạo IndexedDB
    private async initDB() {
      return await openDB('ResourceDB', 1, {
        upgrade(db) {
          db.createObjectStore('resources', { keyPath: 'id' });
        },
      });
    }
    // Lưu vào IndexedDB
    private async saveResources(data: any[]) {
      const db = await this.initDB();
      const tx = db.transaction('resources', 'readwrite');
      const store = tx.objectStore('resources');
      await store.clear(); // Xóa dữ liệu cũ
      data.forEach(item => store.put(item));
      await tx.done;
    }
  
    async getResourceBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.APIURL}/resource/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.DetailResource.set(data)
      } catch (error) {
        this._ErrorLogService.logError('Failed to getResourceBy', error);
        return console.error(error);
      }
    }
    async updateResource(dulieu: any) {
      try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this._StorageService.getItem('token')}`
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/resource/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllResource()
          this.getResourceBy({id:data.id})
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateResource', error);
          return console.error(error);
      }
    }
    async DeleteResource(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const response = await fetch(`${environment.APIURL}/resource/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllResource()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteResource', error);
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

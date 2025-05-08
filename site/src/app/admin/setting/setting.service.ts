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
  export class SettingService {
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
    ) { }
    private _snackBar:MatSnackBar = inject(MatSnackBar);
    ListSetting = signal<any[]>([]);
    DetailSetting = signal<any>({});
    settingId = signal<string | null>(null);
    setSettingId(id: string | null) {
      this.settingId.set(id);
    }
      private socket = io(`${environment.APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
    async CreateSetting(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/setting`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllSetting()
          this.settingId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateSetting', error);
          return console.error(error);
      }
    }
  
    async getAllSetting() {
      const db = await this.initDB();
      const cachedData = await db.getAll('settings');
      const updatedAtCache = this._StorageService.getItem('settings_updatedAt') || '0';
      // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
      if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
        this.ListSetting.set(cachedData);
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
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/setting/lastupdated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          return cachedData;
        }    
        const { updatedAt: updatedAtServer } = (await lastUpdatedResponse.json()).data;
        //Nếu cache vẫn mới, không cần tải lại dữ liệu
        if (updatedAtServer <= updatedAtCache) {
          this.ListSetting.set(cachedData);
          return cachedData;
        }
        console.log(updatedAtServer, updatedAtCache); 
        //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
        const response = await fetch(`${environment.APIURL}/setting`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return cachedData;
        }
        const data = await response.json();        
        await this.saveSettings(data.data.data);
        this._StorageService.setItem('settings_updatedAt', updatedAtServer);
        this.ListSetting.set(data);
        return data.data.data
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllSetting', error);
        console.error(error);
        return cachedData;
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenSettingUpdates() {
      this.socket.on('settingupdated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('settings_updatedAt');
        await this.getAllSetting();
      });
    }
    //Khởi tạo IndexedDB
    private async initDB() {
      return await openDB('SettingDB', 1, {
        upgrade(db) {
          db.createObjectStore('settings', { keyPath: 'id' });
        },
      });
    }
    // Lưu vào IndexedDB
    private async saveSettings(data: any[]) {
      const db = await this.initDB();
      const tx = db.transaction('settings', 'readwrite');
      const store = tx.objectStore('settings');
      await store.clear(); // Xóa dữ liệu cũ
      data.forEach(item => store.put(item));
      await tx.done;
    }
  
    async getSettingBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.APIURL}/setting/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();        
        return data.data.data      
      } catch (error) {
        this._ErrorLogService.logError('Failed to getSettingBy', error);
        return console.error(error);
      }
    }
    async updateSetting(dulieu: any) {
      try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/setting/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          //this.getAllSetting()
        //  this.getSettingBy({id:data.id})
          return data.data.data
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateSetting', error);
          return console.error(error);
      }
    }
    async DeleteSetting(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const response = await fetch(`${environment.APIURL}/setting/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllSetting()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteSetting', error);
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
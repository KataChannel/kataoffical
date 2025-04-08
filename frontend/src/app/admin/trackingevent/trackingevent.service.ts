import { Inject, Injectable, signal, Signal } from '@angular/core';
  import { Router } from '@angular/router';
  import { environment } from '../../../environments/environment.development';
  import { StorageService } from '../../shared/utils/storage.service';
  import { io } from 'socket.io-client';
  import { openDB } from 'idb';
  import { ErrorLogService } from '../../shared/services/errorlog.service';
  @Injectable({
    providedIn: 'root'
  })
  export class TrackingeventService {
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
    ) { }
    ListTrackingevent = signal<any[]>([]);
    DetailTrackingevent = signal<any>({});
    trackingeventId = signal<string | null>(null);
    setTrackingeventId(id: string | null) {
      this.trackingeventId.set(id);
    }
      private socket = io(`${environment.APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
    async CreateTrackingevent(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/trackingevent`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllTrackingevent()
          this.trackingeventId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateTrackingevent', error);
          return console.error(error);
      }
    }
  
    async getAllTrackingevent() {
      const db = await this.initDB();
      const cachedData = await db.getAll('trackingevents');
      const updatedAtCache = this._StorageService.getItem('trackingevents_updatedAt') || '0';
      // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
      if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
        this.ListTrackingevent.set(cachedData);
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
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/last-updated?table=trackingEvent`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          return cachedData;
        }    
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        //Nếu cache vẫn mới, không cần tải lại dữ liệu
        if (updatedAtServer <= updatedAtCache) {
          this.ListTrackingevent.set(cachedData);
          return cachedData;
        }
        console.log(updatedAtServer, updatedAtCache); 
        //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
        const response = await fetch(`${environment.APIURL}/trackingevent`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return cachedData;
        }
        const data = await response.json();
        await this.saveTrackingevents(data);
        this._StorageService.setItem('trackingevents_updatedAt', updatedAtServer);
        this.ListTrackingevent.set(data);
        return data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllTrackingevent', error);
        console.error(error);
        return cachedData;
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenTrackingeventUpdates() {
      this.socket.on('trackingevent-updated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('trackingevents_updatedAt');
        await this.getAllTrackingevent();
      });
    }
    //Khởi tạo IndexedDB
    private async initDB() {
      return await openDB('TrackingeventDB', 1, {
        upgrade(db) {
          db.createObjectStore('trackingevents', { keyPath: 'id' });
        },
      });
    }
    // Lưu vào IndexedDB
    private async saveTrackingevents(data: any[]) {
      const db = await this.initDB();
      const tx = db.transaction('trackingevents', 'readwrite');
      const store = tx.objectStore('trackingevents');
      await store.clear(); // Xóa dữ liệu cũ
      data.forEach(item => store.put(item));
      await tx.done;
    }
  
    async getTrackingeventBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.APIURL}/trackingevent/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.DetailTrackingevent.set(data)
      } catch (error) {
        this._ErrorLogService.logError('Failed to getTrackingeventBy', error);
        return console.error(error);
      }
    }
    async updateTrackingevent(dulieu: any) {
      try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/trackingevent/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllTrackingevent()
          this.getTrackingeventBy({id:data.id})
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateTrackingevent', error);
          return console.error(error);
      }
    }
    async DeleteTrackingevent(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const response = await fetch(`${environment.APIURL}/trackingevent/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllTrackingevent()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteTrackingevent', error);
            return console.error(error);
        }
    }
    private handleError(status: number) {
      let message = 'Lỗi không xác định';
      switch (status) {
        case 401:
          message = 'Vui lòng đăng nhập lại';
          break;
        case 403:
          message = 'Bạn không có quyền truy cập';
          break;
        case 500:
          message = 'Lỗi máy chủ, vui lòng thử lại sau';
          break;
      }
      const result = JSON.stringify({ code: status, title: message });
      this.router.navigate(['/errorserver'], { queryParams: { data: result } });
    }
  }
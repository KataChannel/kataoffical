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
  export class QuanlyqrcodeService {
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
    ) { }
    ListQuanlyqrcode = signal<any[]>([]);
    DetailQuanlyqrcode = signal<any>({});
    quanlyqrcodeId = signal<string | null>(null);
    setQuanlyqrcodeId(id: string | null) {
      this.quanlyqrcodeId.set(id);
    }
      private socket = io(`${environment.APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
    async CreateQuanlyqrcode(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/quanlyqrcode`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllQuanlyqrcode()
          this.quanlyqrcodeId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateQuanlyqrcode', error);
          return console.error(error);
      }
    }
  
    async getAllQuanlyqrcode() {
      const db = await this.initDB();
      const cachedData = await db.getAll('quanlyqrcodes');
      const updatedAtCache = this._StorageService.getItem('quanlyqrcodes_updatedAt') || '0';
      // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
      if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
        this.ListQuanlyqrcode.set(cachedData);
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
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/last-updated?table=quanlyqrcode`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          return cachedData;
        }    
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        //Nếu cache vẫn mới, không cần tải lại dữ liệu
        if (updatedAtServer <= updatedAtCache) {
          this.ListQuanlyqrcode.set(cachedData);
          return cachedData;
        }
        console.log(updatedAtServer, updatedAtCache); 
        //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
        const response = await fetch(`${environment.APIURL}/quanlyqrcode`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return cachedData;
        }
        const data = await response.json();
        await this.saveQuanlyqrcodes(data);
        this._StorageService.setItem('quanlyqrcodes_updatedAt', updatedAtServer);
        this.ListQuanlyqrcode.set(data);
        return data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllQuanlyqrcode', error);
        console.error(error);
        return cachedData;
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenQuanlyqrcodeUpdates() {
      this.socket.on('quanlyqrcode-updated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('quanlyqrcodes_updatedAt');
        await this.getAllQuanlyqrcode();
      });
    }
    //Khởi tạo IndexedDB
    private async initDB() {
      return await openDB('QuanlyqrcodeDB', 1, {
        upgrade(db) {
          db.createObjectStore('quanlyqrcodes', { keyPath: 'id' });
        },
      });
    }
    // Lưu vào IndexedDB
    private async saveQuanlyqrcodes(data: any[]) {
      const db = await this.initDB();
      const tx = db.transaction('quanlyqrcodes', 'readwrite');
      const store = tx.objectStore('quanlyqrcodes');
      await store.clear(); // Xóa dữ liệu cũ
      data.forEach(item => store.put(item));
      await tx.done;
    }
  
    async getQuanlyqrcodeBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.APIURL}/quanlyqrcode/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.DetailQuanlyqrcode.set(data)
      } catch (error) {
        this._ErrorLogService.logError('Failed to getQuanlyqrcodeBy', error);
        return console.error(error);
      }
    }
    async updateQuanlyqrcode(dulieu: any) {
      try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/quanlyqrcode/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllQuanlyqrcode()
          this.getQuanlyqrcodeBy({id:data.id})
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateQuanlyqrcode', error);
          return console.error(error);
      }
    }
    async DeleteQuanlyqrcode(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const response = await fetch(`${environment.APIURL}/quanlyqrcode/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllQuanlyqrcode()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteQuanlyqrcode', error);
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
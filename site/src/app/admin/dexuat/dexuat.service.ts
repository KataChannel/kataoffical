import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { openDB } from 'idb';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';
@Injectable({
  providedIn: 'root'
})
export class DexuatService {
    private socket;
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
    private _sharedSocketService: SharedSocketService,
  ) { 
    this.socket = this._sharedSocketService.getSocket();
    this.listenDexuatUpdates();
  }
  ListDexuat = signal<any[]>([]);
  DetailDexuat = signal<any>({});
  dexuatId = signal<string | null>(null);
  setDexuatId(id: string | null) {
    this.dexuatId.set(id);
  }
  async CreateDexuat(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/dexuat`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllDexuat()
        this.dexuatId.set(data.id)
    } catch (error) {
        this._ErrorLogService.logError('Failed to CreateDexuat', error);
        return console.error(error);
    }
  }

  async getAllDexuat() {
    const db = await this.initDB();
    const cachedData = await db.getAll('dexuats');
    const updatedAtCache = this._StorageService.getItem('dexuats_updatedAt') || '0';
    // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
    if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
      this.ListDexuat.set(cachedData);
      return cachedData;
    }
    try {
      // Gọi API chỉ để lấy `updatedAt` mới nhất
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const lastUpdatedResponse = await fetch(`${environment.APIURL}/dexuat/last-updated`, options);
      if (!lastUpdatedResponse.ok) {
        this.handleError(lastUpdatedResponse.status);
        return cachedData;
      }    
      const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
      //Nếu cache vẫn mới, không cần tải lại dữ liệu
      if (updatedAtServer <= updatedAtCache) {
        this.ListDexuat.set(cachedData);
        return cachedData;
      }
      console.log(updatedAtServer, updatedAtCache); 
      //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
      const response = await fetch(`${environment.APIURL}/dexuat`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return cachedData;
      }
      const data = await response.json();
      await this.saveDexuats(data);
      this._StorageService.setItem('dexuats_updatedAt', updatedAtServer);
      this.ListDexuat.set(data);
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to create getAllDexuat', error);
      console.error(error);
      return cachedData;
    }
  }


  //Lắng nghe cập nhật từ WebSocket
  listenDexuatUpdates() {
    this.socket.off('dexuat-updated'); // đảm bảo không đăng ký nhiều lần
    this.socket.on('dexuat-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('dexuats_updatedAt');
      await this.getAllDexuat();
    });
  }
  //Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('DexuatDB', 1, {
      upgrade(db) {
        db.createObjectStore('dexuats', { keyPath: 'id' });
      },
    });
  }
  // Lưu vào IndexedDB
  private async saveDexuats(data: any[]) {
    const db = await this.initDB();
    const tx = db.transaction('dexuats', 'readwrite');
    const store = tx.objectStore('dexuats');
    await store.clear(); // Xóa dữ liệu cũ
    data.forEach(item => store.put(item));
    await tx.done;
  }

  async getDexuatBy(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.APIURL}/dexuat/findby`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailDexuat.set(data)
    } catch (error) {
      this._ErrorLogService.logError('Failed to getDexuatBy', error);
      return console.error(error);
    }
  }
  async updateDexuat(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/dexuat/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllDexuat()
        this.getDexuatBy({id:data.id})
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateDexuat', error);
        return console.error(error);
    }
  }
  async DeleteDexuat(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/dexuat/${item.id}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllDexuat()
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteDexuat', error);
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
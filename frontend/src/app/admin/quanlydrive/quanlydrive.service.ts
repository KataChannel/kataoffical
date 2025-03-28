import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { openDB } from 'idb';
import { ErrorLogService } from '../../shared/services/errorlog.service';
@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
  ) { }
  ListSanpham = signal<any[]>([]);
  DetailSanpham = signal<any>({});
  sanphamId = signal<string | null>(null);
  setSanphamId(id: string | null) {
    this.sanphamId.set(id);
  }
  private socket = io(`${environment.APIURL}`);
  async CreateSanpham(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/sanpham`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllSanpham()
        this.sanphamId.set(data.id)
    } catch (error) {
        this._ErrorLogService.logError('Failed to CreateSanpham', error);
        return console.error(error);
    }
  }

  async getAllSanpham() {
    const db = await this.initDB();
    const cachedData = await db.getAll('sanphams');
    const updatedAtCache = this._StorageService.getItem('sanphams_updatedAt') || '0';
    // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
    if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
      this.ListSanpham.set(cachedData);
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
      const lastUpdatedResponse = await fetch(`${environment.APIURL}/sanpham/last-updated`, options);
      if (!lastUpdatedResponse.ok) {
        this.handleError(lastUpdatedResponse.status);
        return cachedData;
      }    
      const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
      //Nếu cache vẫn mới, không cần tải lại dữ liệu
      if (updatedAtServer <= updatedAtCache) {
        this.ListSanpham.set(cachedData);
        return cachedData;
      }
      console.log(updatedAtServer, updatedAtCache); 
      //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
      const response = await fetch(`${environment.APIURL}/sanpham`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return cachedData;
      }
      const data = await response.json();
      await this.saveSanphams(data);
      this._StorageService.setItem('sanphams_updatedAt', updatedAtServer.toString());
      this.ListSanpham.set(data);
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to create getAllSanpham', error);
      console.error(error);
      return cachedData;
    }
  }


  //Lắng nghe cập nhật từ WebSocket
  listenSanphamUpdates() {
    this.socket.on('sanpham-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('sanphams_updatedAt');
      await this.getAllSanpham();
    });
  }
  //Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('SanphamDB', 1, {
      upgrade(db) {
        db.createObjectStore('sanphams', { keyPath: 'id' });
      },
    });
  }
  // Lưu vào IndexedDB
  private async saveSanphams(data: any[]) {
    const db = await this.initDB();
    const tx = db.transaction('sanphams', 'readwrite');
    const store = tx.objectStore('sanphams');
    await store.clear(); // Xóa dữ liệu cũ
    data.forEach(item => store.put(item));
    await tx.done;
  }

  async getSanphamBy(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.APIURL}/sanpham/findby`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailSanpham.set(data)
    } catch (error) {
      this._ErrorLogService.logError('Failed to getSanphamBy', error);
      return console.error(error);
    }
  }
  async updateSanpham(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/sanpham/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllSanpham()
        this.getSanphamBy({id:data.id})
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateSanpham', error);
        return console.error(error);
    }
  }
  async DeleteSanpham(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/sanpham/${item.id}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllSanpham()
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteSanpham', error);
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
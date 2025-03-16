import {  Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { openDB } from 'idb';
@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
  ) { }
  ListKhachhang = signal<any[]>([]);
  DetailKhachhang = signal<any>({});
  khachhangId = signal<string | null>(null);
  setKhachhangId(id: string | null) {
    this.khachhangId.set(id);
  }
  private socket = io(`${environment.APIURL}`);
  async CreateKhachhang(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/khachhang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllKhachhang()
        this.khachhangId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }
  async searchfield(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/khachhang/searchfield`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }      
        this.DetailKhachhang.set(data)
        this.khachhangId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }

  async getAllKhachhang() {
    const db = await this.initDB();
    
    // 🛑 Kiểm tra cache từ IndexedDB trước
    const cachedData = await db.getAll('khachhangs');
    const updatedAtCache = this._StorageService.getItem('khachhangs_updatedAt') || '0';
    
    // ✅ Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
    if (cachedData.length > 0 && Date.now() - updatedAtCache < 5 * 60 * 1000) { // 5 phút cache TTL
      this.ListKhachhang.set(cachedData);
      return cachedData;
    }
  
    try {
      // ✅ Gọi API chỉ để lấy `updatedAt` mới nhất
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      
      const lastUpdatedResponse = await fetch(`${environment.APIURL}/last-updated?table=khachhang`, options);
      if (!lastUpdatedResponse.ok) {
        this.handleError(lastUpdatedResponse.status);
        return cachedData;
      }    
      const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
      // ✅ Nếu cache vẫn mới, không cần tải lại dữ liệu
      if (updatedAtServer <= updatedAtCache) {
        this.ListKhachhang.set(cachedData);
        return cachedData;
      }
      console.log(updatedAtServer, updatedAtCache); 
      // ✅ Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
      const response = await fetch(`${environment.APIURL}/khachhang`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return cachedData;
      }
      const data = await response.json();
      await this.saveKhachhangs(data);
      this._StorageService.setItem('khachhangs_updatedAt', updatedAtServer.toString());
      this.ListKhachhang.set(data);
      return data;
    } catch (error) {
      console.error(error);
      return cachedData;
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

  // 3️⃣ Lắng nghe cập nhật từ WebSocket
  listenKhachhangUpdates() {
    this.socket.on('khachhang-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      await this.getAllKhachhang();
    });
  }
  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('KhachhangDB', 1, {
      upgrade(db) {
        db.createObjectStore('khachhangs', { keyPath: 'id' });
      },
    });
  }

  // Lưu vào IndexedDB
  private async saveKhachhangs(data: any[]) {
    const db = await this.initDB();
    const tx = db.transaction('khachhangs', 'readwrite');
    const store = tx.objectStore('khachhangs');
    await store.clear(); // Xóa dữ liệu cũ
    data.forEach(item => store.put(item));
    await tx.done;
  }

  async getKhachhangByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/khachhang/findid/${id}`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailKhachhang.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateKhachhang(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/khachhang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllKhachhang()
        this.searchfield({id:dulieu.id})
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteKhachhang(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/khachhang/${item.id}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllKhachhang()
      } catch (error) {
          return console.error(error);
      }
  }
}
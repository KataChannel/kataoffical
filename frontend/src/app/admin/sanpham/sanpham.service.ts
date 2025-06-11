import {  Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { openDB } from 'idb';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }
  ListSanpham = signal<any[]>([]);
  DetailSanpham = signal<any>({});
  sanphamId = signal<string | null>(null);
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50); // Mặc định 50 mục mỗi trang


  setSanphamId(id: string | null) {
    this.sanphamId.set(id);
  }
  private socket = io(`${environment.APIURL}`,{
    transports: ['websocket', 'polling'], // Thêm polling để fallback
    reconnectionAttempts: 5, // Giới hạn reconnect nếu fail
    timeout: 5000, // Timeout 5s
  });
  async ImportSanpham(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/sanpham/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllSanpham()
    } catch (error) {
        return console.error(error);
    }
  }
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
        return console.error(error);
    }
  }
  async getNhucau() {
    try {
      const options = {
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
        };
        const response = await fetch(`${environment.APIURL}/sanpham/nhucaudathang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.ListSanpham.set(data)
        return data;
    } catch (error) {
        return console.error(error);
    }
  }

  async getAllSanpham(queryParams: any = {}, forceRefresh: boolean = false) {
    const cached = await this.getCachedData();
    const updatedAtCacheDate = this._StorageService.getItem('sanphams_updatedAt') || '0';
    const updatedAtCache = new Date(updatedAtCacheDate).getTime();
    // Nếu không yêu cầu tải mới và cache hợp lệ, trả về cache
    if (!forceRefresh && cached.sanphams.length > 0 && Date.now() - updatedAtCache < 5 * 60 * 1000) {
      this.ListSanpham.set(cached.sanphams);
      this.page.set(cached.pagination.page);
      this.totalPages.set(cached.pagination.totalPages);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.sanphams;
    }

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };

      queryParams = {
        page: this.page().toString(),
        pageSize: this.pageSize().toString(),
        ...queryParams, // Thêm các tham số khác nếu cần
      };
      // Tạo query string từ queryParams, chỉ thêm các giá trị có nội dung
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value) {
          query.append(key, String(value));
        }
      });

      // Nếu forceRefresh = true thì bỏ qua cache và tải dữ liệu mới luôn
      const response = await fetch(`${environment.APIURL}/sanpham?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        this.ListSanpham.set(cached.sanphams);
        this.page.set(cached.pagination.page);
        this.totalPages.set(cached.pagination.totalPages);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
        return cached.sanphams;
      }
      // Lưu dữ liệu mới vào cache
      const data = await response.json();
      await this.saveSanphams(data.data, {
        page: data.page || 1,
        totalPages: data.totalPages || 1,
        total: data.total || data.data.length,
        pageSize: this.pageSize()
      });

      // Cập nhật thời gian cache: với forceRefresh, sử dụng thời gian hiện tại
      if (forceRefresh) {
        this._StorageService.setItem('sanphams_updatedAt', new Date().toISOString());
      } else {
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/sanpham/lastupdated`, options);
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        this._StorageService.setItem('sanphams_updatedAt', updatedAtServer);
      }
      this.ListSanpham.set(data.data);
      this.page.set(data.page || 1);
      this.totalPages.set(data.totalPages || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(this.pageSize());
      return data.data;

    } catch (error) {
      console.error(error);
      this.ListSanpham.set(cached.sanphams);
      this.page.set(cached.pagination.page);
      this.totalPages.set(cached.pagination.totalPages);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.sanphams;
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
    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['snackbar-warning'],
    });
  }

  // 3️⃣ Lắng nghe cập nhật từ WebSocket
  listenSanphamUpdates() {
    this.socket.on('sanpham-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      await this.getAllSanpham();
    });
  }
  private async initDB() {
    return await openDB('SanphamDB', 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('sanphams', { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains('sanphams')) {
            db.deleteObjectStore('sanphams');
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore('sanphams', { keyPath: 'id' });
        }
        if (oldVersion < 4) {
          // Không cần xóa store, vì cấu trúc vẫn tương thích
          // Chỉ cần đảm bảo pagination có thêm pageSize
        }
      },
    });
  }

  // Lưu dữ liệu và phân trang vào IndexedDB
  private async saveSanphams(data: any[], pagination: { page: number, totalPages: number, total: number, pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction('sanphams', 'readwrite');
    const store = tx.objectStore('sanphams');
    await store.clear();
    await store.put({ id: 'data', sanphams: data, pagination });
    await tx.done;
  }

  // Lấy dữ liệu và phân trang từ cache
  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get('sanphams', 'data');
    if (cached && cached.sanphams) {
      return {
        sanphams: cached.sanphams,
        pagination: cached.pagination || { page: 1, totalPages: 1, total: cached.sanphams.length, pageSize: 10 }
      };
    }
    return { sanphams: [], pagination: { page: 1, totalPages: 1, total: 0, pageSize: 10 } };
  }

  async getSanphamByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/sanpham/findid/${id}`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailSanpham.set(data)
    } catch (error) {
      return console.error(error);
    }
  }

  async getSanphamby(param: any) {
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
      return data 
    } catch (error) {
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
        this.getSanphamByid(dulieu.id)
    } catch (error) {
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
          return console.error(error);
      }
  }
}
import { inject, Injectable, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { openDB } from 'idb';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  private socket: any;
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenKhachhangUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListKhachhang = signal<any[]>([]);
  DetailKhachhang = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(10); // Mặc định 10 mục mỗi trang
  khachhangId = signal<string | null>(null);

  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('KhachhangDB', 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('khachhangs', { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains('khachhangs')) {
            db.deleteObjectStore('khachhangs');
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore('khachhangs', { keyPath: 'id' });
        }
        if (oldVersion < 4) {
          // Không cần xóa store, vì cấu trúc vẫn tương thích
          // Chỉ cần đảm bảo pagination có thêm pageSize
        }
      },
    });
  }

  // Lưu dữ liệu và phân trang vào IndexedDB
  private async saveKhachhangs(data: any[], pagination: { page: number, pageCount: number, total: number, pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction('khachhangs', 'readwrite');
    const store = tx.objectStore('khachhangs');
    await store.clear();
    await store.put({ id: 'data', khachhangs: data, pagination });
    await tx.done;
  }

  // Lấy dữ liệu và phân trang từ cache
  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get('khachhangs', 'data');
    if (cached && cached.khachhangs) {
      return {
        khachhangs: cached.khachhangs,
        pagination: cached.pagination || { page: 1, pageCount: 1, total: cached.khachhangs.length, pageSize: 10 }
      };
    }
    return { khachhangs: [], pagination: { page: 1, pageCount: 1, total: 0, pageSize: 10 } };
  }

  setKhachhangId(id: string | null) {
    this.khachhangId.set(id);
  }

  async CreateKhachhang(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/khachhang`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.getAllKhachhang(this.pageSize());
      this.khachhangId.set(data.id);
    } catch (error) {
      this._ErrorLogService.logError('Failed to CreateKhachhang', error);
      console.error(error);
    }
  }

  async getAllKhachhang(pageSize: number = this.pageSize(), forceRefresh: boolean = false) {
    this.pageSize.set(pageSize);
    const cached = await this.getCachedData();   
    const updatedAtCache = this._StorageService.getItem('khachhangs_updatedAt') || '0';    
    
    // Nếu không yêu cầu tải mới và cache hợp lệ, trả về cache
    if (!forceRefresh && cached.khachhangs.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) {
      this.ListKhachhang.set(cached.khachhangs);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.khachhangs;
    }

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };

      // Kiểm tra thời gian cập nhật từ server, trừ khi được yêu cầu forceRefresh
      if (!forceRefresh) {
        const lastUpdatedResponse = await fetch(`${environment.ACADEMY_APIURL}/khachhang/lastupdated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          this.ListKhachhang.set(cached.khachhangs);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.khachhangs;
        }

        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();

        // Nếu cache còn mới, trả về cache
        if (updatedAtServer <= updatedAtCache) {
          this.ListKhachhang.set(cached.khachhangs);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.khachhangs;
        }
      }

      // Tải dữ liệu mới từ server
      const query = new URLSearchParams({
        page: this.page().toString(),
        limit: pageSize.toString()
      });
      const response = await fetch(`${environment.ACADEMY_APIURL}/khachhang/vttech?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        this.ListKhachhang.set(cached.khachhangs);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
        return cached.khachhangs;
      }

      const data = await response.json();
      console.log('Khachhang data:', data);
      
      await this.saveKhachhangs(data, {
        page: data.page || 1,
        pageCount: data.pageCount || 1,
        total: data.total || data.length,
        pageSize: data.pageSize || this.pageSize()
      });
      // Với forceRefresh, cập nhật luôn với thời gian mới từ server, nếu không thì sử dụng thời gian lấy từ lastUpdatedResponse
      if (!forceRefresh) {
        const lastUpdatedResponse = await fetch(`${environment.ACADEMY_APIURL}/khachhang/lastupdated`, options);
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        this._StorageService.setItem('khachhangs_updatedAt', updatedAtServer);
      } else {
        this._StorageService.setItem('khachhangs_updatedAt', new Date().toISOString());
      }
      this.ListKhachhang.set(data.data);
      this.page.set(data.page || 1);
      this.pageCount.set(data.pageCount || 1);
      this.total.set(data.length);
      this.pageSize.set(pageSize);
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getAllKhachhang', error);
      console.error(error);
      this.ListKhachhang.set(cached.khachhangs);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.khachhangs;
    }
  }

  async getUpdatedCodeIds() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/khachhang/updateCodeIds`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllKhachhang(this.pageSize());
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getUpdatedCodeIds', error);
      console.error(error);
    }
  }

  listenKhachhangUpdates() {
    this.socket.off('khachhang-updated'); // đảm bảo không đăng ký nhiều lần
    this.socket.on('khachhang-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('khachhangs_updatedAt');
      await this.getAllKhachhang();
    });
  }

  async getKhachhangBy(param: any, pageSize: number = this.pageSize()) {
    this.pageSize.set(pageSize); // Cập nhật pageSize
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify({ ...param, page: this.page(), limit: pageSize }),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/khachhang/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailKhachhang.set(data);
      } else {
        await this.saveKhachhangs(data.data, {
          page: data.page || 1,
          pageCount: data.pageCount || 1,
          total: data.total || data.data.length,
          pageSize
        });
        this._StorageService.setItem('khachhangs_updatedAt', new Date().toISOString());
        this.ListKhachhang.set(data.data);
        this.page.set(data.page || 1);
        this.pageCount.set(data.pageCount || 1);
        this.total.set(data.length);
        this.pageSize.set(pageSize);
      }
    } catch (error) {
      this._ErrorLogService.logError('Failed to getKhachhangBy', error);
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListKhachhang.set(cached.khachhangs);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
      }
    }
  }

  async updateKhachhang(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/khachhang/${dulieu.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllKhachhang(this.pageSize());
      this.getKhachhangBy({ id: data.id, isOne: true }, this.pageSize());
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateKhachhang', error);
      console.error(error);
    }
  }

  async DeleteKhachhang(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/khachhang/${item.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      this.getAllKhachhang(this.pageSize());
    } catch (error) {
      this._ErrorLogService.logError('Failed to DeleteKhachhang', error);
      console.error(error);
    }
  }

  private handleError(status: number) {
    let message = 'Lỗi không xác định';
    switch (status) {
      case 400:
        message = 'Thông tin đã tồn tại';
        break;
      case 401:
      case 404:
        message = 'Vui lòng đăng nhập lại';
        break;
      case 403:
        message = 'Bạn không có quyền truy cập';
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
        break;
    }
    this._snackBar.open(message, '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }



  async getKhachhangDoanhthu(listphone: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(listphone),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/khachhang/vttech/doanhthu`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
  }
}

}
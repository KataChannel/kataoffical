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
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50); // Mặc định 10 mục mỗi trang
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

  // Lấy dữ liệu và phân trang từ cache

  setKhachhangId(id: string | null) {
    this.khachhangId.set(id);
  }
    async ImportKhachhang(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this._StorageService.getItem('token')}`
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/khachhang/import`, options);
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
      const response = await fetch(`${environment.APIURL}/khachhang`, options);
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

  async getKhachhangforselect() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };

      const response = await fetch(`${environment.APIURL}/khachhang/forselect`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return [];
      }
      const data = await response.json();
      this.ListKhachhang.set(data.data);
      return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }


  async getAllKhachhang(queryParams: any = {}, forceRefresh: boolean = false) {
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
      const response = await fetch(`${environment.APIURL}/khachhang?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      // Lưu dữ liệu mới vào cache
      const data = await response.json();

      // Cập nhật thời gian cache: với forceRefresh, sử dụng thời gian hiện tại
      this.ListKhachhang.set(data.data);
      this.page.set(data.page || 1);
      this.totalPages.set(data.totalPages || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(this.pageSize());
      return data.data;

    } catch (error) {
      console.error(error);
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
      const response = await fetch(`${environment.APIURL}/khachhang/updateCodeIds`, options);
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

  async getKhachhangBy(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.APIURL}/khachhang/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      
      if (param.isOne === true) {
        this.DetailKhachhang.set(data);        
        return data;
      } else {
        this._StorageService.setItem('khachhangs_updatedAt', new Date().toISOString());
        this.ListKhachhang.set(data.data);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(this.pageSize());
        return data.data;
      }
    } catch (error) {
      console.error(error);
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
      const response = await fetch(`${environment.APIURL}/khachhang/${dulieu.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllKhachhang(this.pageSize());
      this.getKhachhangBy({ id: data.id, isOne: true });
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
      const response = await fetch(`${environment.APIURL}/khachhang/${item.id}`, options);
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
}
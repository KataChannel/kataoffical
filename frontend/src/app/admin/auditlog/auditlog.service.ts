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
export class AuditlogService {
  private socket: any;
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenAuditlogUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListAuditlog = signal<any[]>([]);
  DetailAuditlog = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50); // Mặc định 50 mục mỗi trang
  auditlogId = signal<string | null>(null);

  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('AuditlogDB', 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('auditlogs', { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains('auditlogs')) {
            db.deleteObjectStore('auditlogs');
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore('auditlogs', { keyPath: 'id' });
        }
        if (oldVersion < 4) {
          // Không cần xóa store, vì cấu trúc vẫn tương thích
          // Chỉ cần đảm bảo pagination có thêm pageSize
        }
      },
    });
  }

  // Lưu dữ liệu và phân trang vào IndexedDB
  private async saveAuditlogs(data: any[], pagination: { page: number, pageCount: number, total: number, pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction('auditlogs', 'readwrite');
    const store = tx.objectStore('auditlogs');
    await store.clear();
    await store.put({ id: 'data', auditlogs: data, pagination });
    await tx.done;
  }

  // Lấy dữ liệu và phân trang từ cache
  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get('auditlogs', 'data');
    if (cached && cached.auditlogs) {
      return {
        auditlogs: cached.auditlogs,
        pagination: cached.pagination || { page: 1, pageCount: 1, total: cached.auditlogs.length, pageSize: 10 }
      };
    }
    return { auditlogs: [], pagination: { page: 1, pageCount: 1, total: 0, pageSize: 10 } };
  }

  setAuditlogId(id: string | null) {
    this.auditlogId.set(id);
  }

  async CreateAuditlog(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.APIURL}/auditlog`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.getAllAuditlog(this.pageSize());
      this.auditlogId.set(data.id);
    } catch (error) {
      this._ErrorLogService.logError('Failed to CreateAuditlog', error);
      console.error(error);
    }
  }

  async getAllAuditlog(pageSize: number = this.pageSize(), forceRefresh: boolean = false) {
    this.pageSize.set(pageSize);
    const cached = await this.getCachedData();   
    const updatedAtCache = this._StorageService.getItem('auditlogs_updatedAt') || '0';    
    
    // Nếu không yêu cầu tải mới và cache hợp lệ, trả về cache
    if (!forceRefresh && cached.auditlogs.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) {
      this.ListAuditlog.set(cached.auditlogs);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.auditlogs;
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
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/auditlog/lastupdated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          this.ListAuditlog.set(cached.auditlogs);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.auditlogs;
        }

        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();

        // Nếu cache còn mới, trả về cache
        if (updatedAtServer <= updatedAtCache) {
          this.ListAuditlog.set(cached.auditlogs);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.auditlogs;
        }
      }

      // Tải dữ liệu mới từ server
      const query = new URLSearchParams({
        page: this.page().toString(),
        limit: pageSize.toString()
      });
      const response = await fetch(`${environment.APIURL}/auditlog?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        this.ListAuditlog.set(cached.auditlogs);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
        return cached.auditlogs;
      }

      const data = await response.json();
      await this.saveAuditlogs(data.data, {
        page: data.page || 1,
        pageCount: data.pageCount || 1,
        total: data.total || data.data.length,
        pageSize
      });
      // Với forceRefresh, cập nhật luôn với thời gian mới từ server, nếu không thì sử dụng thời gian lấy từ lastUpdatedResponse
      if (!forceRefresh) {
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/auditlog/lastupdated`, options);
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        this._StorageService.setItem('auditlogs_updatedAt', updatedAtServer);
      } else {
        this._StorageService.setItem('auditlogs_updatedAt', new Date().toISOString());
      }
      this.ListAuditlog.set(data.data);
      this.page.set(data.page || 1);
      this.pageCount.set(data.pageCount || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(pageSize);
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getAllAuditlog', error);
      console.error(error);
      this.ListAuditlog.set(cached.auditlogs);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.auditlogs;
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
      const response = await fetch(`${environment.APIURL}/auditlog/updateCodeIds`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllAuditlog(this.pageSize());
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getUpdatedCodeIds', error);
      console.error(error);
    }
  }

  listenAuditlogUpdates() {
    this.socket.off('auditlog-updated'); // đảm bảo không đăng ký nhiều lần
    this.socket.on('auditlog-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('auditlogs_updatedAt');
      await this.getAllAuditlog();
    });
  }

  async getAuditlogBy(param: any) {
    param.pageSize = Number(this.pageSize())
    param.page = Number(this.page())
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.APIURL}/auditlog/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailAuditlog.set(data);
      } else {
        await this.saveAuditlogs(data.data, {
          page: data.pagination.page || 1,
          pageCount: data.pagination.pageCount || 1,
          total: data.pagination.total || data.data.length,
          pageSize: this.pageSize()
        });
        this._StorageService.setItem('auditlogs_updatedAt', new Date().toISOString());
        this.ListAuditlog.set(data.data);
        this.page.set(data.pagination.page || 1);
        this.pageCount.set(data.pagination.pageCount || 1);
        this.total.set(data.pagination.total || data.data.length);
        this.pageSize.set(this.pageSize());
      }
    } catch (error) { 
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListAuditlog.set(cached.auditlogs);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
      }
    }
  }

  async updateAuditlog(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.APIURL}/auditlog/${dulieu.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllAuditlog(this.pageSize());
      this.getAuditlogBy({ id: data.id, isOne: true, pageSize: this.pageSize() });
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateAuditlog', error);
      console.error(error);
    }
  }

  async DeleteAuditlog(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/auditlog/${item.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      this.getAllAuditlog(this.pageSize());
    } catch (error) {
      this._ErrorLogService.logError('Failed to DeleteAuditlog', error);
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
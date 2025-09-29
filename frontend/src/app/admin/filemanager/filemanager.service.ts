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
export class FilemanagerService {
  private socket: any;
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenFilemanagerUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListFilemanager = signal<any[]>([]);
  DetailFilemanager = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(10); // Mặc định 10 mục mỗi trang
  filemanagerId = signal<string | null>(null);

  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('FilemanagerDB', 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('filemanagers', { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains('filemanagers')) {
            db.deleteObjectStore('filemanagers');
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore('filemanagers', { keyPath: 'id' });
        }
        if (oldVersion < 4) {
          // Không cần xóa store, vì cấu trúc vẫn tương thích
          // Chỉ cần đảm bảo pagination có thêm pageSize
        }
      },
    });
  }

  // Lưu dữ liệu và phân trang vào IndexedDB
  private async saveFilemanagers(data: any[], pagination: { page: number, pageCount: number, total: number, pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction('filemanagers', 'readwrite');
    const store = tx.objectStore('filemanagers');
    await store.clear();
    await store.put({ id: 'data', filemanagers: data, pagination });
    await tx.done;
  }

  // Lấy dữ liệu và phân trang từ cache
  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get('filemanagers', 'data');
    if (cached && cached.filemanagers) {
      return {
        filemanagers: cached.filemanagers,
        pagination: cached.pagination || { page: 1, pageCount: 1, total: cached.filemanagers.length, pageSize: 10 }
      };
    }
    return { filemanagers: [], pagination: { page: 1, pageCount: 1, total: 0, pageSize: 10 } };
  }

  setFilemanagerId(id: string | null) {
    this.filemanagerId.set(id);
  }

  async CreateFilemanager(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/filemanager`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.getAllFilemanager(this.pageSize());
      this.filemanagerId.set(data.id);
    } catch (error) {
      this._ErrorLogService.logError('Failed to CreateFilemanager', error);
      console.error(error);
    }
  }

  async getAllFilemanager(pageSize: number = this.pageSize(), forceRefresh: boolean = false) {
    this.pageSize.set(pageSize);
    const cached = await this.getCachedData();   
    const updatedAtCache = this._StorageService.getItem('filemanagers_updatedAt') || '0';    
    
    // Nếu không yêu cầu tải mới và cache hợp lệ, trả về cache
    if (!forceRefresh && cached.filemanagers.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) {
      this.ListFilemanager.set(cached.filemanagers);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.filemanagers;
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
        const lastUpdatedResponse = await fetch(`${environment.ACADEMY_APIURL}/filemanager/lastupdated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          this.ListFilemanager.set(cached.filemanagers);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.filemanagers;
        }

        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();

        // Nếu cache còn mới, trả về cache
        if (updatedAtServer <= updatedAtCache) {
          this.ListFilemanager.set(cached.filemanagers);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.filemanagers;
        }
      }

      // Tải dữ liệu mới từ server
      const query = new URLSearchParams({
        page: this.page().toString(),
        limit: pageSize.toString()
      });
      const response = await fetch(`${environment.ACADEMY_APIURL}/filemanager?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        this.ListFilemanager.set(cached.filemanagers);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
        return cached.filemanagers;
      }

      const data = await response.json();
      await this.saveFilemanagers(data.data, {
        page: data.page || 1,
        pageCount: data.pageCount || 1,
        total: data.total || data.data.length,
        pageSize
      });
      // Với forceRefresh, cập nhật luôn với thời gian mới từ server, nếu không thì sử dụng thời gian lấy từ lastUpdatedResponse
      if (!forceRefresh) {
        const lastUpdatedResponse = await fetch(`${environment.ACADEMY_APIURL}/filemanager/lastupdated`, options);
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        this._StorageService.setItem('filemanagers_updatedAt', updatedAtServer);
      } else {
        this._StorageService.setItem('filemanagers_updatedAt', new Date().toISOString());
      }
      this.ListFilemanager.set(data.data);
      this.page.set(data.page || 1);
      this.pageCount.set(data.pageCount || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(pageSize);
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getAllFilemanager', error);
      console.error(error);
      this.ListFilemanager.set(cached.filemanagers);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.filemanagers;
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/filemanager/updateCodeIds`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllFilemanager(this.pageSize());
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getUpdatedCodeIds', error);
      console.error(error);
    }
  }

  listenFilemanagerUpdates() {
    this.socket.off('filemanager-updated'); // đảm bảo không đăng ký nhiều lần
    this.socket.on('filemanager-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('filemanagers_updatedAt');
      await this.getAllFilemanager();
    });
  }

  async getFilemanagerBy(param: any, pageSize: number = this.pageSize()) {
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/filemanager/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailFilemanager.set(data);
      } else {
        await this.saveFilemanagers(data.data, {
          page: data.page || 1,
          pageCount: data.pageCount || 1,
          total: data.total || data.data.length,
          pageSize
        });
        this._StorageService.setItem('filemanagers_updatedAt', new Date().toISOString());
        this.ListFilemanager.set(data.data);
        this.page.set(data.page || 1);
        this.pageCount.set(data.pageCount || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(pageSize);
      }
    } catch (error) {
      this._ErrorLogService.logError('Failed to getFilemanagerBy', error);
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListFilemanager.set(cached.filemanagers);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
      }
    }
  }

  async updateFilemanager(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/filemanager/${dulieu.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllFilemanager(this.pageSize());
      this.getFilemanagerBy({ id: data.id, isOne: true }, this.pageSize());
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateFilemanager', error);
      console.error(error);
    }
  }

  async DeleteFilemanager(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/filemanager/${item.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      this.getAllFilemanager(this.pageSize());
    } catch (error) {
      this._ErrorLogService.logError('Failed to DeleteFilemanager', error);
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
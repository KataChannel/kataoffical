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
export class AffiliatelinkService {
  private socket: any;
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenAffiliatelinkUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListAffiliatelink = signal<any[]>([]);
  DetailAffiliatelink = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(10); // Mặc định 10 mục mỗi trang
  affiliatelinkId = signal<string | null>(null);

  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('AffiliatelinkDB', 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('affiliatelinks', { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains('affiliatelinks')) {
            db.deleteObjectStore('affiliatelinks');
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore('affiliatelinks', { keyPath: 'id' });
        }
        if (oldVersion < 4) {
          // Không cần xóa store, vì cấu trúc vẫn tương thích
          // Chỉ cần đảm bảo pagination có thêm pageSize
        }
      },
    });
  }

  // Lưu dữ liệu và phân trang vào IndexedDB
  private async saveAffiliatelinks(data: any[], pagination: { page: number, pageCount: number, total: number, pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction('affiliatelinks', 'readwrite');
    const store = tx.objectStore('affiliatelinks');
    await store.clear();
    await store.put({ id: 'data', affiliatelinks: data, pagination });
    await tx.done;
  }

  // Lấy dữ liệu và phân trang từ cache
  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get('affiliatelinks', 'data');
    if (cached && cached.affiliatelinks) {
      return {
        affiliatelinks: cached.affiliatelinks,
        pagination: cached.pagination || { page: 1, pageCount: 1, total: cached.affiliatelinks.length, pageSize: 10 }
      };
    }
    return { affiliatelinks: [], pagination: { page: 1, pageCount: 1, total: 0, pageSize: 10 } };
  }

  setAffiliatelinkId(id: string | null) {
    this.affiliatelinkId.set(id);
  }

  async CreateAffiliatelink(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/affiliatelink`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      await this.getAllAffiliatelink(this.pageSize());
      this.affiliatelinkId.set(data.id);
    } catch (error) {
      this._ErrorLogService.logError('Failed to CreateAffiliatelink', error);
      console.error(error);
    }
  }

  async getAllAffiliatelink(param:any, forceRefresh: boolean = false) { 
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      // Tải dữ liệu mới từ server
      const query = new URLSearchParams({
        ...param,
        page: this.page(),
        pageSize: this.pageSize()
      });
      const response = await fetch(`${environment.ACADEMY_APIURL}/affiliatelink?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.ListAffiliatelink.set(data.data);
      this.page.set(data.page || 1);
      this.pageCount.set(data.pageCount || 1);
      this.total.set(data.total || data.data.length);
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/affiliatelink/updateCodeIds`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllAffiliatelink(this.pageSize());
      return data.data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getUpdatedCodeIds', error);
      console.error(error);
    }
  }

  listenAffiliatelinkUpdates() {
    this.socket.off('affiliatelink-updated'); // đảm bảo không đăng ký nhiều lần
    this.socket.on('affiliatelink-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('affiliatelinks_updatedAt');
      await this.getAllAffiliatelink(this.pageSize());
    });
  }

  async getAffiliatelinkBy(param: any, pageSize: number = this.pageSize()) {
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/affiliatelink/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailAffiliatelink.set(data);
        this.affiliatelinkId.set(data.id);
      } else {
        await this.saveAffiliatelinks(data.data, {
          page: data.page || 1,
          pageCount: data.pageCount || 1,
          total: data.total || data.data.length,
          pageSize
        });
        this._StorageService.setItem('affiliatelinks_updatedAt', new Date().toISOString());
        this.ListAffiliatelink.set(data.data);
        this.page.set(data.page || 1);
        this.pageCount.set(data.pageCount || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(pageSize);
      }
    } catch (error) {
      this._ErrorLogService.logError('Failed to getAffiliatelinkBy', error);
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListAffiliatelink.set(cached.affiliatelinks);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
      }
    }
  }

  async updateAffiliatelink(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/affiliatelink/${dulieu.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllAffiliatelink(this.pageSize());
      this.getAffiliatelinkBy({ id: data.id, isOne: true }, this.pageSize());
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateAffiliatelink', error);
      console.error(error);
    }
  }

  async DeleteAffiliatelink(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/affiliatelink/${item.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      this.getAllAffiliatelink(this.pageSize());
    } catch (error) {
      this._ErrorLogService.logError('Failed to DeleteAffiliatelink', error);
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
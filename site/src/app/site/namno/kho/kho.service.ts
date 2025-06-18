import { inject, Injectable, signal, Signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openDB } from 'idb';
import { environment } from '../../../../environments/environment.development';
import { SharedSocketService } from '../../../shared/services/sharedsocket.service';
import { StorageService } from '../../../shared/utils/storage.service';
@Injectable({
  providedIn: 'root'
})
export class KhoService {
  private socket: any;
  constructor(
    private _StorageService: StorageService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenKhoUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListKho = signal<any[]>([]);
  DetailKho = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(10); // Mặc định 10 mục mỗi trang
  khoId = signal<string | null>(null);

  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('KhoDB', 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('khos', { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains('khos')) {
            db.deleteObjectStore('khos');
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore('khos', { keyPath: 'id' });
        }
        if (oldVersion < 4) {
          // Không cần xóa store, vì cấu trúc vẫn tương thích
          // Chỉ cần đảm bảo pagination có thêm pageSize
        }
      },
    });
  }

  // Lưu dữ liệu và phân trang vào IndexedDB
  private async saveKhos(data: any[], pagination: { page: number, pageCount: number, total: number, pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction('khos', 'readwrite');
    const store = tx.objectStore('khos');
    await store.clear();
    await store.put({ id: 'data', khos: data, pagination });
    await tx.done;
  }

  // Lấy dữ liệu và phân trang từ cache
  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get('khos', 'data');
    if (cached && cached.khos) {
      return {
        khos: cached.khos,
        pagination: cached.pagination || { page: 1, pageCount: 1, total: cached.khos.length, pageSize: 10 }
      };
    }
    return { khos: [], pagination: { page: 1, pageCount: 1, total: 0, pageSize: 10 } };
  }

  setKhoId(id: string | null) {
    this.khoId.set(id);
  }
  async getTonKho(page: string, limit: string) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/kho/tonkho?page=${page}&limit=${limit}`, options);
      if (!response.ok) {
        this.handleError(response.status);  
      }
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  }

  async CreateKho(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.APIURL}/kho`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return;
      }
      const data = await response.json();
      this.getAllKho(this.pageSize());
      this.khoId.set(data.id);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllKho(pageSize: number = this.pageSize(), forceRefresh: boolean = false, queryParams: any = {}) {
    this.pageSize.set(pageSize);
    const cached = await this.getCachedData();   
    const updatedAtCacheDate = this._StorageService.getItem('khos_updatedAt') || '0';    
    const updatedAtCache = new Date(updatedAtCacheDate).getTime();
    // Nếu không yêu cầu tải mới và cache hợp lệ, trả về cache
    if (!forceRefresh && cached.khos.length > 0 && Date.now() - updatedAtCache < 5 * 60 * 1000) {
      this.ListKho.set(cached.khos);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.khos;
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
      if (forceRefresh) {
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/kho/lastupdated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          this.ListKho.set(cached.khos);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.khos;
        }

        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();

        // Nếu cache còn mới, trả về cache
        
        if (updatedAtServer <= updatedAtCache) {
          this.ListKho.set(cached.khos);
          this.page.set(cached.pagination.page);
          this.pageCount.set(cached.pagination.pageCount);
          this.total.set(cached.pagination.total);
          this.pageSize.set(cached.pagination.pageSize);
          return cached.khos;
        }
      }

      // Tải dữ liệu mới từ server với queryParams đã được cập nhật
      queryParams = {
        page: this.page().toString(),
        pageSize: pageSize.toString(),
        ...queryParams, // Thêm các tham số khác nếu cần
      };
      // Tạo query string từ queryParams, chỉ thêm các giá trị có nội dung
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value) {
          query.append(key, String(value));
        }
      });



      const response = await fetch(`${environment.APIURL}/kho?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        this.ListKho.set(cached.khos);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
        return cached.khos;
      }
      // Lưu dữ liệu mới vào cache
      const data = await response.json();
      await this.saveKhos(data.data, {
        page: data.page || 1,
        pageCount: data.pageCount || 1,
        total: data.total || data.data.length,
        pageSize
      });
      // Với forceRefresh, cập nhật luôn với thời gian mới từ server, nếu không thì sử dụng thời gian lấy từ lastUpdatedResponse
      if (!forceRefresh) {
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/kho/lastupdated`, options);
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        this._StorageService.setItem('khos_updatedAt', updatedAtServer);
      } else {
        this._StorageService.setItem('khos_updatedAt', new Date().toISOString());
      }
      this.ListKho.set(data.data);
      this.page.set(data.page || 1);
      this.pageCount.set(data.pageCount || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(pageSize);
      return data.data;
    } catch (error) {
      console.error(error);
      this.ListKho.set(cached.khos);
      this.page.set(cached.pagination.page);
      this.pageCount.set(cached.pagination.pageCount);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.khos;
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
      const response = await fetch(`${environment.APIURL}/kho/updateCodeIds`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllKho(this.pageSize());
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  listenKhoUpdates() {
    this.socket.off('kho-updated'); // đảm bảo không đăng ký nhiều lần
    this.socket.on('kho-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('khos_updatedAt');
      await this.getAllKho();
    });
  }

  async getKhoBy(param: any, pageSize: number = this.pageSize()) {
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
      const response = await fetch(`${environment.APIURL}/kho/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailKho.set(data);
      } else {
        await this.saveKhos(data.data, {
          page: data.page || 1,
          pageCount: data.pageCount || 1,
          total: data.total || data.data.length,
          pageSize
        });
        this._StorageService.setItem('khos_updatedAt', new Date().toISOString());
        this.ListKho.set(data.data);
        this.page.set(data.page || 1);
        this.pageCount.set(data.pageCount || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(pageSize);
      }
    } catch (error) {
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListKho.set(cached.khos);
        this.page.set(cached.pagination.page);
        this.pageCount.set(cached.pagination.pageCount);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
      }
    }
  }

  async updateKho(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.APIURL}/kho/${dulieu.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllKho(this.pageSize());
      this.getKhoBy({ id: data.id, isOne: true }, this.pageSize());
    } catch (error) {
      console.error(error);
    }
  }

  async DeleteKho(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/kho/${item.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      this.getAllKho(this.pageSize());
    } catch (error) {
      console.error(error);
    }
  }

  private handleError(status: number): void {
    let message = 'Lỗi không xác định';
    let panelClass = 'snackbar-error';
    switch (status) {
      case 400:
        message = 'Thông tin đã tồn tại hoặc không hợp lệ';
        break;
      case 401:
        message = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
        break;
      case 403:
        message = 'Bạn không có quyền thực hiện thao tác này';
        break;
      case 404:
        message = 'Không tìm thấy dữ liệu yêu cầu';
        break;
      case 422:
        message = 'Dữ liệu không hợp lệ';
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
        break;
      case 503:
        message = 'Dịch vụ tạm thời không khả dụng';
        break;
      default:
        message = `Lỗi HTTP ${status}`;
    }

    this._snackBar.open(message, 'Đóng', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
        
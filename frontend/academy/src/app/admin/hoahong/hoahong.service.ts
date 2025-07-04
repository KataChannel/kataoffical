import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';
import { openDB } from 'idb';
@Injectable({
  providedIn: 'root'
})
export class HoahongService {
  private socket: any;
  constructor(
    private _StorageService: StorageService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenHoahongUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListHoahong = signal<any[]>([]);
  DetailHoahong = signal<any>({});
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50); // Mặc định 50 mục mỗi trang
  hoahongId = signal<string | null>(null);

  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('HoahongDB', 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('hoahongs', { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains('hoahongs')) {
            db.deleteObjectStore('hoahongs');
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore('hoahongs', { keyPath: 'id' });
        }
        if (oldVersion < 4) {
          // Không cần xóa store, vì cấu trúc vẫn tương thích
          // Chỉ cần đảm bảo pagination có thêm pageSize
        }
      },
    });
  }

  // Lưu dữ liệu và phân trang vào IndexedDB
  private async saveHoahongs(data: any[], pagination: { page: number, totalPages: number, total: number, pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction('hoahongs', 'readwrite');
    const store = tx.objectStore('hoahongs');
    await store.clear();
    await store.put({ id: 'data', hoahongs: data, pagination });
    await tx.done;
  }

  // Lấy dữ liệu và phân trang từ cache
  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get('hoahongs', 'data');
    if (cached && cached.hoahongs) {
      return {
        hoahongs: cached.hoahongs,
        pagination: cached.pagination || { page: 1, totalPages: 1, total: cached.hoahongs.length, pageSize: 10 }
      };
    }
    return { hoahongs: [], pagination: { page: 1, totalPages: 1, total: 0, pageSize: 10 } };
  }

  setHoahongId(id: string | null) {
    this.hoahongId.set(id);
  }
  async ImportHoahong(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.ACADEMY_APIURL}/hoahong/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllHoahong()
    } catch (error) {
        return console.error(error);
    }
  }
  async CreateHoahong(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/hoahong`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return;
      }
      const data = await response.json();
      this.getAllHoahong();
      this.hoahongId.set(data.id);
    } catch (error) {
      console.error(error);
    }
  }

async getTotalHoahongByUserId(userId: string): Promise<number> {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._StorageService.getItem('token')}`
      },
    };
    const response = await fetch(`${environment.ACADEMY_APIURL}/hoahong/total?userId=${userId}`, options);
    if (!response.ok) {
      this.handleError(response.status);
      return 0;
    }
    const data = await response.json();
    return data.total || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

  async getAllHoahong(queryParams: any = {}, forceRefresh: boolean = false) {
    const cached = await this.getCachedData();
    const updatedAtCacheDate = this._StorageService.getItem('hoahongs_updatedAt') || '0';
    const updatedAtCache = new Date(updatedAtCacheDate).getTime();
    // Nếu không yêu cầu tải mới và cache hợp lệ, trả về cache
    if (!forceRefresh && cached.hoahongs.length > 0 && Date.now() - updatedAtCache < 5 * 60 * 1000) {
      this.ListHoahong.set(cached.hoahongs);
      this.page.set(cached.pagination.page);
      this.totalPages.set(cached.pagination.totalPages);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.hoahongs;
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/hoahong?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        this.ListHoahong.set(cached.hoahongs);
        this.page.set(cached.pagination.page);
        this.totalPages.set(cached.pagination.totalPages);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
        return cached.hoahongs;
      }
      // Lưu dữ liệu mới vào cache
      const data = await response.json();
      await this.saveHoahongs(data.data, {
        page: data.page || 1,
        totalPages: data.totalPages || 1,
        total: data.total || data.data.length,
        pageSize: this.pageSize()
      });

      // Cập nhật thời gian cache: với forceRefresh, sử dụng thời gian hiện tại
      if (forceRefresh) {
        this._StorageService.setItem('hoahongs_updatedAt', new Date().toISOString());
      } else {
        const lastUpdatedResponse = await fetch(`${environment.ACADEMY_APIURL}/hoahong/lastupdated`, options);
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        this._StorageService.setItem('hoahongs_updatedAt', updatedAtServer);
      }
      this.ListHoahong.set(data.data);
      this.page.set(data.page || 1);
      this.totalPages.set(data.totalPages || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(this.pageSize());
      return data.data;

    } catch (error) {
      console.error(error);
      this.ListHoahong.set(cached.hoahongs);
      this.page.set(cached.pagination.page);
      this.totalPages.set(cached.pagination.totalPages);
      this.total.set(cached.pagination.total);
      this.pageSize.set(cached.pagination.pageSize);
      return cached.hoahongs;
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/hoahong/updateCodeIds`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllHoahong(this.pageSize());
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  listenHoahongUpdates() {
    this.socket.off('hoahong-updated'); // đảm bảo không đăng ký nhiều lần
    this.socket.on('hoahong-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('hoahongs_updatedAt');
      await this.getAllHoahong();
    });
  }

  async getHoahongBy(param: any = {}) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        }
      };
      const query = new URLSearchParams();
      Object.entries(param).forEach(([key, value]) => {
        if (value) {
          query.append(key, String(value));
        }
      });
     const response = await fetch(`${environment.ACADEMY_APIURL}/hoahong?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.DetailHoahong.set(data);
    } catch (error) {
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListHoahong.set(cached.hoahongs);
        this.page.set(cached.pagination.page);
        this.totalPages.set(cached.pagination.totalPages);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
      }
    }
  }

  async SearchBy(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/hoahong/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailHoahong.set(data);
      } else {
        this._StorageService.setItem('hoahongs_updatedAt', new Date().toISOString());
        this.ListHoahong.set(data.data);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(this.pageSize());
      }
      return data
    } catch (error) {
      console.error(error);
    }
  }

  async updateHoahong(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/hoahong/${dulieu.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllHoahong(this.pageSize());
      this.getHoahongBy({ id: data.id,isOne: true });
    } catch (error) {
      console.error(error);
    }
  }

  async DeleteHoahong(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/hoahong/${item.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      this.getAllHoahong(this.pageSize());
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
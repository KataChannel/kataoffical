import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';
import { openDB } from 'idb';
@Injectable({
  providedIn: 'root'
})
export class LichhenService {
  private socket: any;
  constructor(
    private _StorageService: StorageService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenLichhenUpdates();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListLichhen = signal<any[]>([]);
  DetailLichhen = signal<any>({});
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50); // Mặc định 50 mục mỗi trang
  lichhenId = signal<string | null>(null);

  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('LichhenDB', 4, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('lichhens', { keyPath: 'id' });
        }
        if (oldVersion < 3) {
          if (db.objectStoreNames.contains('lichhens')) {
            db.deleteObjectStore('lichhens');
          }
          if (db.objectStoreNames.contains('pagination')) {
            db.deleteObjectStore('pagination');
          }
          db.createObjectStore('lichhens', { keyPath: 'id' });
        }
        if (oldVersion < 4) {
          // Không cần xóa store, vì cấu trúc vẫn tương thích
          // Chỉ cần đảm bảo pagination có thêm pageSize
        }
      },
    });
  }

  // Lưu dữ liệu và phân trang vào IndexedDB
  private async saveLichhens(data: any[], pagination: { page: number, totalPages: number, total: number, pageSize: number }) {
    const db = await this.initDB();
    const tx = db.transaction('lichhens', 'readwrite');
    const store = tx.objectStore('lichhens');
    await store.clear();
    await store.put({ id: 'data', lichhens: data, pagination });
    await tx.done;
  }

  // Lấy dữ liệu và phân trang từ cache
  private async getCachedData() {
    const db = await this.initDB();
    const cached = await db.get('lichhens', 'data');
    if (cached && cached.lichhens) {
      return {
        lichhens: cached.lichhens,
        pagination: cached.pagination || { page: 1, totalPages: 1, total: cached.lichhens.length, pageSize: 10 }
      };
    }
    return { lichhens: [], pagination: { page: 1, totalPages: 1, total: 0, pageSize: 10 } };
  }

  setLichhenId(id: string | null) {
    this.lichhenId.set(id);
  }
  async ImportLichhen(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllLichhen()
    } catch (error) {
        return console.error(error);
    }
  }

  async getSyncsLichhen(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen/syncslichhen`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      console.log('Syncs Lichhen Data:', data);
    } catch (error) {
      console.error(error);
    }
  }
  
async getTotalLichhenByUserId(userId: string): Promise<number> {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._StorageService.getItem('token')}`
      },
    };
    const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen/total?userId=${userId}`, options);
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
  
  async CreateLichhen(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return;
      }
      const data = await response.json();
      this.getAllLichhen();
      this.lichhenId.set(data.id);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllLichhen(queryParams: any = {}, forceRefresh: boolean = false) {
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      // Lưu dữ liệu mới vào cache
      const data = await response.json();
      this.ListLichhen.set(data.data);
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen/updateCodeIds`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllLichhen(this.pageSize());
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  listenLichhenUpdates() {
    this.socket.off('lichhen-updated'); // đảm bảo không đăng ký nhiều lần
    this.socket.on('lichhen-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('lichhens_updatedAt');
      await this.getAllLichhen();
    });
  }

  async getLichhenBy(param: any = {}) {
    console.log('Fetching Lichhen with params:', param);
    
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
     const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.DetailLichhen.set(data);
    } catch (error) {
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListLichhen.set(cached.lichhens);
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
      const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailLichhen.set(data);
      } else {
        await this.saveLichhens(data.data, {
          page: data.page || 1,
          totalPages: data.totalPages || 1, 
          total: data.total || data.data.length,
          pageSize: this.pageSize()
        });
        this._StorageService.setItem('lichhens_updatedAt', new Date().toISOString());
        this.ListLichhen.set(data.data);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(this.pageSize());
      }
      return data
    } catch (error) {
      console.error(error);
      const cached = await this.getCachedData();
      if (!param.isOne) {
        this.ListLichhen.set(cached.lichhens);
        this.page.set(cached.pagination.page);
        this.totalPages.set(cached.pagination.totalPages);
        this.total.set(cached.pagination.total);
        this.pageSize.set(cached.pagination.pageSize);
      }
    }
  }

  async updateLichhen(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen/${dulieu.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllLichhen(this.pageSize());
      this.getLichhenBy({ id: data.id,isOne: true });
    } catch (error) {
      console.error(error);
    }
  }

  async DeleteLichhen(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/lichhen/${item.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      this.getAllLichhen(this.pageSize());
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
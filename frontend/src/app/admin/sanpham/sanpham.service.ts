import {  Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
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

  async Banggiamacdinh(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/sanpham/banggiamacdinh`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllSanpham();
        return data;
    } catch (error) {
        return console.error(error);
    }
  }
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

   async getSanphamforselect() {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
        };
  
        const response = await fetch(`${environment.APIURL}/sanpham/forselect`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return [];
        }
        const data = await response.json();
        this.ListSanpham.set(data.data);
        return data.data;
      } catch (error) {
        console.error(error);
        return [];
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
      }
      // Lưu dữ liệu mới vào cache
      const data = await response.json();
      this.ListSanpham.set(data.data);
      this.page.set(data.page || 1);
      this.totalPages.set(data.totalPages || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(this.pageSize());
      return data.data;

    } catch (error) {
      console.error(error);
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

  // Lấy dữ liệu và phân trang từ cache
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

  async getSanphamBy(param: any) {
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
      
      if (param.isOne === true) {
        this.DetailSanpham.set(data);        
        return data;
      } else {
        this.ListSanpham.set(data.data);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(this.pageSize());
        return data.data;
      }
    } catch (error) {
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
              'Authorization': `Bearer ${this._StorageService.getItem('token')}`
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
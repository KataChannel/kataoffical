import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {
  private socket: any;
  
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
    this.listenNhanvienUpdates();
  }
  
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListNhanvien = signal<any[]>([]);
  DetailNhanvien = signal<any>({});
  nhanvienId = signal<string | null>(null);

  setNhanvienId(id: string | null) {
    this.nhanvienId.set(id);
  }

  /**
   * Socket listener for real-time updates
   */
  private listenNhanvienUpdates() {
    this.socket.on('nhanvien:updated', (data: any) => {
      console.log('🔄 Received nhanvien:updated event:', data);
      this.getAllNhanvien();
    });
  }

  /**
   * Import multiple Nhanvien records
   */
  async ImportNhanvien(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      
      const response = await fetch(`${environment.APIURL}/nhanvien/import`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      await this.getAllNhanvien();
      
      this._snackBar.open(`✅ Import thành công: ${data.success} nhân viên`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to ImportNhanvien', error);
      this._snackBar.open('❌ Import nhân viên thất bại', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      console.error(error);
    }
  }

  /**
   * Create a new Nhanvien
   */
  async CreateNhanvien(dulieu: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };
      
      const response = await fetch(`${environment.APIURL}/nhanvien`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add to list instead of full reload
      const currentList = this.ListNhanvien();
      this.ListNhanvien.set([data, ...currentList]);
      this.nhanvienId.set(data.id);
      
      this._snackBar.open('✅ Tạo nhân viên thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to CreateNhanvien', error);
      this._snackBar.open('❌ Tạo nhân viên thất bại', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      console.error(error);
    }
  }

  /**
   * Get all Nhanvien for select dropdown (minimal data)
   */
  async getNhanvienforselect(): Promise<any[]> {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };

      const response = await fetch(`${environment.APIURL}/nhanvien/forselect`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getNhanvienforselect', error);
      console.error(error);
      return [];
    }
  }

  /**
   * Get all Nhanvien (full data)
   */
  async getAllNhanvien(queryParams: any = {}) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };

      // Build query string
      const query = new URLSearchParams();
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key]) {
          query.append(key, queryParams[key]);
        }
      });

      const queryString = query.toString() ? `?${query.toString()}` : '';
      const response = await fetch(`${environment.APIURL}/nhanvien${queryString}`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate response is array
      if (Array.isArray(data)) {
        this.ListNhanvien.set(data);
      } else {
        console.error('Nhanvien response is not an array:', data);
        this.ListNhanvien.set([]);
      }
      
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getAllNhanvien', error);
      console.error(error);
      this.ListNhanvien.set([]);
      return [];
    }
  }

  /**
   * Get one Nhanvien by ID
   */
  async getOneNhanvien(id: string) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };

      const response = await fetch(`${environment.APIURL}/nhanvien/${id}`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.DetailNhanvien.set(data);
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to getOneNhanvien', error);
      console.error(error);
      return null;
    }
  }

  /**
   * Search Nhanvien by field
   */
  async SearchField(searchParams: Record<string, any>) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(searchParams),
      };

      const response = await fetch(`${environment.APIURL}/nhanvien/searchfield`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to SearchField Nhanvien', error);
      console.error(error);
      return null;
    }
  }

  /**
   * Update Nhanvien
   */
  async updateNhanvien(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(dulieu),
      };

      const response = await fetch(`${environment.APIURL}/nhanvien/${dulieu.id}`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update item in list
      const currentList = this.ListNhanvien();
      const index = currentList.findIndex(item => item.id === data.id);
      if (index !== -1) {
        currentList[index] = data;
        this.ListNhanvien.set([...currentList]);
      }
      
      this._snackBar.open('✅ Cập nhật nhân viên thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateNhanvien', error);
      this._snackBar.open('❌ Cập nhật nhân viên thất bại', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      console.error(error);
    }
  }

  /**
   * Delete Nhanvien
   */
  async deleteNhanvien(id: string) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };

      const response = await fetch(`${environment.APIURL}/nhanvien/${id}`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Remove from list
      const currentList = this.ListNhanvien();
      this.ListNhanvien.set(currentList.filter(item => item.id !== id));
      
      this._snackBar.open('✅ Xóa nhân viên thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return true;
    } catch (error) {
      this._ErrorLogService.logError('Failed to deleteNhanvien', error);
      this._snackBar.open('❌ Xóa nhân viên thất bại', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      console.error(error);
      return false;
    }
  }

  /**
   * Handle HTTP errors
   */
  private handleError(status: number) {
    switch (status) {
      case 401:
        this._snackBar.open('❌ Phiên đăng nhập hết hạn', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        this.router.navigate(['/login']);
        break;
      case 403:
        this._snackBar.open('❌ Không có quyền truy cập', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        break;
      case 404:
        this._snackBar.open('❌ Không tìm thấy dữ liệu', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        break;
      default:
        this._snackBar.open('❌ Có lỗi xảy ra', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
    }
  }
}

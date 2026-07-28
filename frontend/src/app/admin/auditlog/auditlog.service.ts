import { inject, Injectable, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuditlogService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
  ) { }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListAuditlog = signal<any[]>([]);
  DetailAuditlog = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50); // Mặc định 50 mục mỗi trang
  auditlogId = signal<string | null>(null);

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
        page: this.page().toString(),
        limit: pageSize.toString()
      });
      const response = await fetch(`${environment.APIURL}/auditlog?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.ListAuditlog.set(data.data);
      this.page.set(data.page || 1);
      this.pageCount.set(data.pageCount || 1);
      this.total.set(data.total || data.data.length);
      this.pageSize.set(pageSize);
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
        this._StorageService.setItem('auditlogs_updatedAt', new Date().toISOString());
        this.ListAuditlog.set(data.data);
        this.page.set(data.page || 1);
        this.pageCount.set(data.pageCount || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(this.pageSize());
      }
    } catch (error) { 
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
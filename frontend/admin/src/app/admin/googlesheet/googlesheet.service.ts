import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { openDB } from 'idb';
import { ErrorLogService } from '../../shared/services/errorlog.service';
@Injectable({
  providedIn: 'root'
})
export class GooglesheetService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
  ) { }
  ListGooglesheet = signal<any[]>([]);
  DetailGooglesheet = signal<any>({});
  googlesheetId = signal<string | null>(null);
  setGooglesheetId(id: string | null) {
    this.googlesheetId.set(id);
  }
  private socket = io(`${environment.APIURL}`);
  async CreateGooglesheet(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/googlesheet`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.googlesheetId.set(data.id)
    } catch (error) {
        this._ErrorLogService.logError('Failed to CreateGooglesheet', error);
        return console.error(error);
    }
  }

  async getAllGooglesheet(sheetId:any,sheetName:any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
      const response = await fetch(`${environment.APIURL}/googlesheet/?sheetId=${sheetId}&sheetName=${sheetName}`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.ListGooglesheet.set(data);
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to create getAllGooglesheet', error);
      console.error(error);

    }
  }
  async getGooglesheetBy(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.APIURL}/googlesheet/findby`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailGooglesheet.set(data)
    } catch (error) {
      this._ErrorLogService.logError('Failed to getGooglesheetBy', error);
      return console.error(error);
    }
  }
  async updateGooglesheet(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/googlesheet/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getGooglesheetBy({id:data.id})
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateGooglesheet', error);
        return console.error(error);
    }
  }
  async DeleteGooglesheet(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/googlesheet/${item.id}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteGooglesheet', error);
          return console.error(error);
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
    const result = JSON.stringify({ code: status, title: message });
    this.router.navigate(['/errorserver'], { queryParams: { data: result } });
  }

}
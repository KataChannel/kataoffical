import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { ErrorLogService } from '../../shared/services/errorlog.service';
@Injectable({
  providedIn: 'root'
})
export class LandingpageService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
  ) { }
  ListLandingpage = signal<any[]>([]);
  DetailLandingpage = signal<any>({});
  landingpageId = signal<string | null>(null);
  setLandingpageId(id: string | null) {
    this.landingpageId.set(id);
  }
    private socket = io(`${environment.ACADEMY_APIURL}`,{
    transports: ['websocket'],
    reconnectionAttempts: 5,
    timeout: 5000,
  });

  async CreateLandingpage(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.ACADEMY_APIURL}/landingpage`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllLandingpage()
        this.landingpageId.set(data.id)
    } catch (error) {
        this._ErrorLogService.logError('Failed to CreateLandingpage', error);
        return console.error(error);
    }
  }

  async getAllLandingpage() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/landingpage`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return [];
      }
      const data = await response.json();
      this.ListLandingpage.set(data);
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to create getAllLandingpage', error);
      console.error(error);
      return [];
    }
  }

  //Lắng nghe cập nhật từ WebSocket
  listenLandingpageUpdates() {
    this.socket.on('landingpage-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      await this.getAllLandingpage();
    });
  }

  async getLandingpageBy(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.ACADEMY_APIURL}/landingpage/findby`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      if (param.isOne === true) {
        this.DetailLandingpage.set(data);
      } else {
        this.ListLandingpage.set(data.data);
      }
    } catch (error) {
      this._ErrorLogService.logError('Failed to getLandingpageBy', error);
      console.error(error);
  }
  }
  async updateLandingpage(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.ACADEMY_APIURL}/landingpage/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllLandingpage()
        this.getLandingpageBy({id:data.id})
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateLandingpage', error);
        return console.error(error);
    }
  }
  async DeleteLandingpage(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.ACADEMY_APIURL}/landingpage/${item.id}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllLandingpage()
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteLandingpage', error);
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

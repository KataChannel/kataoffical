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
export class QuanlydriveService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
  ) { }
  ListQuanlydrive = signal<any[]>([]);
  DetailQuanlydrive = signal<any>({});
  quanlydriveId = signal<string | null>(null);
  setQuanlydriveId(id: string | null) {
    this.quanlydriveId.set(id);
  }
  private socket = io(`${environment.APIURL}`);
  async CreateQuanlydrive(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/quanlydrive`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllQuanlydrive()
        this.quanlydriveId.set(data.id)
    } catch (error) {
        this._ErrorLogService.logError('Failed to CreateQuanlydrive', error);
        return console.error(error);
    }
  }

  async getAllQuanlydrive(driveId?: string,isLoad?: boolean) {
    if(isLoad){
      this._StorageService.removeItem('quanlydrives_updatedAt')
    }
    const db = await this.initDB();
    const cachedData = await db.getAll('quanlydrives');
    const updatedAtCache = this._StorageService.getItem('quanlydrives_updatedAt') || '0';
    // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
    if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
      this.ListQuanlydrive.set(cachedData);
      return cachedData;
    }
    try {
      // Gọi API chỉ để lấy `updatedAt` mới nhất
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const lastUpdatedResponse = await fetch(`${environment.APIURL}/last-updated?table=driveItem`, options);
      if (!lastUpdatedResponse.ok) {
        this.handleError(lastUpdatedResponse.status);
        return cachedData;
      }    
      const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
      //Nếu cache vẫn mới, không cần tải lại dữ liệu
      if (updatedAtServer <= updatedAtCache) {
        this.ListQuanlydrive.set(cachedData);
        return cachedData;
      }
      console.log(updatedAtServer, updatedAtCache); 
      //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
      const response = await fetch(`${environment.APIURL}/quanlydrive?driveId=${driveId}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return cachedData;
      }
      const data = await response.json();
      await this.saveQuanlydrives(data);
      this._StorageService.setItem('quanlydrives_updatedAt', updatedAtServer.toString());
      this.ListQuanlydrive.set(data);
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to create getAllQuanlydrive', error);
      console.error(error);
      return cachedData;
    }
  }
  async getAllDrivelocal(driveId?: string,isLoad?: boolean) {
    if(isLoad){
      this._StorageService.removeItem('quanlydrives_updatedAt')
    }
    const db = await this.initDB();
    const cachedData = await db.getAll('quanlydrives');
    const updatedAtCache = this._StorageService.getItem('quanlydrives_updatedAt') || '0';
    // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
    if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
      this.ListQuanlydrive.set(cachedData);
      return cachedData;
    }
    try {
      // Gọi API chỉ để lấy `updatedAt` mới nhất
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const lastUpdatedResponse = await fetch(`${environment.APIURL}/last-updated?table=driveItem`, options);
      if (!lastUpdatedResponse.ok) {
        this.handleError(lastUpdatedResponse.status);
        return cachedData;
      }    
      const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
      //Nếu cache vẫn mới, không cần tải lại dữ liệu
      if (updatedAtServer <= updatedAtCache) {
        this.ListQuanlydrive.set(cachedData);
        return cachedData;
      }
      console.log(updatedAtServer, updatedAtCache); 
      //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
      const response = await fetch(`${environment.APIURL}/quanlydrive`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return cachedData;
      }
      const data = await response.json();
      await this.saveQuanlydrives(data);
      this._StorageService.setItem('quanlydrives_updatedAt', updatedAtServer.toString());
      this.ListQuanlydrive.set(data);
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to create getAllQuanlydrive', error);
      console.error(error);
      return cachedData;
    }
  }


  //Lắng nghe cập nhật từ WebSocket
  listenQuanlydriveUpdates() {
    this.socket.on('quanlydrive-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('quanlydrives_updatedAt');
      await this.getAllQuanlydrive();
    });
  }
  //Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('QuanlydriveDB', 1, {
      upgrade(db) {
        db.createObjectStore('quanlydrives', { keyPath: 'id' });
      },
    });
  }
  // Lưu vào IndexedDB
  private async saveQuanlydrives(data: any[]) {
    const db = await this.initDB();
    const tx = db.transaction('quanlydrives', 'readwrite');
    const store = tx.objectStore('quanlydrives');
    await store.clear(); // Xóa dữ liệu cũ
    data.forEach(item => store.put(item));
    await tx.done;
  }

  async getQuanlydriveBy(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.APIURL}/quanlydrive/findby`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailQuanlydrive.set(data)
    } catch (error) {
      this._ErrorLogService.logError('Failed to getQuanlydriveBy', error);
      return console.error(error);
    }
  }
  async updateQuanlydrive(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/quanlydrive/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllQuanlydrive()
        this.getQuanlydriveBy({id:data.id})
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateQuanlydrive', error);
        return console.error(error);
    }
  }
  async DeleteUserDrive(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/quanlydrive/users/${item.userIdDrive}/${item.googleId}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          return response.json();
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteQuanlydrive', error);
          return console.error(error);
      }
  }
  async DeleteQuanlydrive(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/quanlydrive/${item.id}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllQuanlydrive()
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteQuanlydrive', error);
          return console.error(error);
      }
  }
  
  async QuanlydriveQueryfolder(item:any) {    
    try {
        const options = {
            method:'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/quanlydrive/queryfolder?query=${item.googleId}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllQuanlydrive()
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteQuanlydrive', error);
          return console.error(error);
      }
  }
  async ListUsersFolder(item:any) {    
    try {
        const options = {
            method:'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/quanlydrive/listUsersFolder?query=${item.googleId}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllQuanlydrive()
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteQuanlydrive', error);
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
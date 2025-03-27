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
export class LeadService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
  ) { }
  ListLead = signal<any[]>([]);
  DetailLead = signal<any>({});
  leadId = signal<string | null>(null);
  setLeadId(id: string | null) {
    this.leadId.set(id);
  }
    private socket = io(`${environment.APIURL}`,{
    transports: ['websocket'],
    reconnectionAttempts: 5,
    timeout: 5000,
  });
  async CreateLead(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/lead`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllLead()
        this.leadId.set(data.id)
    } catch (error) {
        this._ErrorLogService.logError('Failed to CreateLead', error);
        return console.error(error);
    }
  }

  async getAllLead() {
    const db = await this.initDB();
    const cachedData = await db.getAll('lead');
    const updatedAtCache = this._StorageService.getItem('lead_updatedAt') || '0';
    // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
    if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
      this.ListLead.set(cachedData);
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
      const lastUpdatedResponse = await fetch(`${environment.APIURL}/lead/last-updated`, options);
      if (!lastUpdatedResponse.ok) {
        this.handleError(lastUpdatedResponse.status);
        return cachedData;
      }    
      const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
      //Nếu cache vẫn mới, không cần tải lại dữ liệu
      if (updatedAtServer <= updatedAtCache) {
        this.ListLead.set(cachedData);
        return cachedData;
      }
      console.log(updatedAtServer, updatedAtCache); 
      //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
      const response = await fetch(`${environment.APIURL}/lead`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return cachedData;
      }
      const data = await response.json();
      await this.saveLeads(data);
      this._StorageService.setItem('lead_updatedAt', updatedAtServer);
      this.ListLead.set(data);
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to create getAllLead', error);
      console.error(error);
      return cachedData;
    }
  }


  //Lắng nghe cập nhật từ WebSocket
  listenLeadUpdates() {
    this.socket.on('lead-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('lead_updatedAt');
      await this.getAllLead();
    });
  }
  //Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('LeadDB', 1, {
      upgrade(db) {
        db.createObjectStore('lead', { keyPath: 'id' });
      },
    });
  }
  // Lưu vào IndexedDB
  private async saveLeads(data: any[]) {
    const db = await this.initDB();
    const tx = db.transaction('lead', 'readwrite');
    const store = tx.objectStore('lead');
    await store.clear(); // Xóa dữ liệu cũ
    data.forEach(item => store.put(item));
    await tx.done;
  }

  async getLeadBy(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(`${environment.APIURL}/lead/findby`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailLead.set(data)
    } catch (error) {
      this._ErrorLogService.logError('Failed to getLeadBy', error);
      return console.error(error);
    }
  }
  async updateLead(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/lead/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllLead()
        this.getLeadBy({id:data.id})
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateLead', error);
        return console.error(error);
    }
  }
  async DeleteLead(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/lead/${item.id}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllLead()
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteLead', error);
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
import { Inject, Injectable, signal, Signal } from '@angular/core';
  import { Router } from '@angular/router';
  import { environment } from '../../../environments/environment.development';
  import { StorageService } from '../../shared/utils/storage.service';
  import { io } from 'socket.io-client';
  import { openDB } from 'idb';
  import { ErrorLogService } from '../../shared/services/errorlog.service';
  @Injectable({
    providedIn: 'root'
  })
  export class AffiliatelinkService {
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
    ) { }
    ListAffiliatelink = signal<any[]>([]);
    DetailAffiliatelink = signal<any>({});
    affiliatelinkId = signal<string | null>(null);
    setAffiliatelinkId(id: string | null) {
      this.affiliatelinkId.set(id);
    }
      private socket = io(`${environment.APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
    async Tracking(codeId: any) {
      try {
        const options = {
            method:'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/affiliatelink/track/${codeId}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log('data',data);
          
          if (!response.ok) {
            this.handleError(response.status);
          }
      } catch (error) {
          this._ErrorLogService.logError('Failed to Tracking', error);
          return console.error(error);
      }
    }
    async CreateAffiliatelink(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/affiliatelink`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          await this.getAllAffiliatelink()
          this.affiliatelinkId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateAffiliatelink', error);
          return console.error(error);
      }
    }
  
    async getAllAffiliatelink() {
      const db = await this.initDB();
      const cachedData = await db.getAll('affiliatelinks');
      const updatedAtCache = this._StorageService.getItem('affiliatelinks_updatedAt') || '0';
      // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
      if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
        this.ListAffiliatelink.set(cachedData);
        return cachedData;
      }
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
        };
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/last-updated?table=affiliateLink`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          this.ListAffiliatelink.set(cachedData);
          return cachedData;
        }    
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        //Nếu cache vẫn mới, không cần tải lại dữ liệu
        if (updatedAtServer <= updatedAtCache) {
          this.ListAffiliatelink.set(cachedData);
          return cachedData;
        }
        //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
        const response = await fetch(`${environment.APIURL}/affiliatelink`, options);
        if (!response.ok) {
          this.handleError(response.status);
          this.ListAffiliatelink.set(cachedData);
          return cachedData;
        }
        const data = await response.json();
        await this.saveAffiliatelinks(data);
        this._StorageService.setItem('affiliatelinks_updatedAt', updatedAtServer);
        this.ListAffiliatelink.set(data);
        return data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllAffiliatelink', error);
        console.error(error);
        return cachedData;
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenAffiliatelinkUpdates() {
      this.socket.on('affiliatelink-updated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('affiliatelinks_updatedAt');
        await this.getAllAffiliatelink();
      });
    }
    //Khởi tạo IndexedDB
    private async initDB() {
      return await openDB('AffiliatelinkDB', 1, {
        upgrade(db) {
          db.createObjectStore('affiliatelinks', { keyPath: 'id' });
        },
      });
    }
    // Lưu vào IndexedDB
    private async saveAffiliatelinks(data: any[]) {
      const db = await this.initDB();
      const tx = db.transaction('affiliatelinks', 'readwrite');
      const store = tx.objectStore('affiliatelinks');
      await store.clear(); // Xóa dữ liệu cũ
      data.forEach(item => store.put(item));
      await tx.done;
    }
    async getAffiliatelinkBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.APIURL}/affiliatelink/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.DetailAffiliatelink.set(data)
      } catch (error) {
        this._ErrorLogService.logError('Failed to getAffiliatelinkBy', error);
        return console.error(error);
      }
    }
    async getAffiliateListBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.APIURL}/affiliatelink/findlistby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        console.log('data',data);
        
        this.ListAffiliatelink.set(data)
      } catch (error) {
        this._ErrorLogService.logError('Failed to getAffiliateListBy', error);
        return console.error(error);
      }
    }
    async updateAffiliatelink(dulieu: any) {
      try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/affiliatelink/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
         await this.getAllAffiliatelink()
          this.getAffiliatelinkBy({id:data.id})
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateAffiliatelink', error);
          return console.error(error);
      }
    }
    async DeleteAffiliatelink(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const response = await fetch(`${environment.APIURL}/affiliatelink/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllAffiliatelink()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteAffiliatelink', error);
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
import { inject, Injectable, signal, Signal } from '@angular/core';
  import { Router } from '@angular/router';
  import { environment } from '../../../environments/environment.development';
  import { StorageService } from '../../shared/utils/storage.service';
  import { io } from 'socket.io-client';
  import { openDB } from 'idb';
  import { ErrorLogService } from '../../shared/services/errorlog.service';
  import { MatSnackBar } from '@angular/material/snack-bar';
  @Injectable({
    providedIn: 'root'
  })
  export class HoadonchitietService {
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
    ) { }
    private _snackBar:MatSnackBar = inject(MatSnackBar);
    ListHoadonchitiet = signal<any[]>([]);
    DetailHoadonchitiet = signal<any>({});
    hoadonchitietId = signal<string | null>(null);
    setHoadonchitietId(id: string | null) {
      this.hoadonchitietId.set(id);
    }
      private socket = io(`${environment.APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
     async fetchData(dulieu: any) {
      console.log('dulieu', dulieu);
      
      const API_URL = `https://hoadondientu.gdt.gov.vn:30000/query/invoices/detail?nbmst=${dulieu.nbmst}&khhdon=${dulieu.khhdon}&shdon=${dulieu.shdon}&khmshdon=${dulieu.khmshdon}`;
      try {
        const options = {
            headers: {
              "Authorization": `Bearer ${dulieu.token}`
            },
          };
          const response = await fetch(API_URL, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
            console.log(data);
            // if (data.datas.length > 0) {
            // for (const item of data.datas) {
            //     const rest = {

            //     }
            //     await this.CreateHoadon(rest);
            //     await new Promise(resolve => setTimeout(resolve, 300)); // delay 300ms giữa các lần gọi
            //    }
            // }
            return data;

      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateHoadon', error);
          return console.error(error);
      }
    }
   
   
   
   
    async CreateHoadonchitiet(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/hoadonchitiet`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllHoadonchitiet()
          this.hoadonchitietId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateHoadonchitiet', error);
          return console.error(error);
      }
    }
  
    async getAllHoadonchitiet() {
      const db = await this.initDB();
      const cachedData = await db.getAll('hoadonchitiets');
      const updatedAtCache = this._StorageService.getItem('hoadonchitiets_updatedAt') || '0';
      // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
      if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
        this.ListHoadonchitiet.set(cachedData);
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
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/hoadonchitiet/lastupdated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          return cachedData;
        }    
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        //Nếu cache vẫn mới, không cần tải lại dữ liệu
        if (updatedAtServer <= updatedAtCache) {
          this.ListHoadonchitiet.set(cachedData);
          return cachedData;
        }
        console.log(updatedAtServer, updatedAtCache); 
        //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
        const response = await fetch(`${environment.APIURL}/hoadonchitiet`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return cachedData;
        }
        const data = await response.json();
        await this.saveHoadonchitiets(data.data);
        this._StorageService.setItem('hoadonchitiets_updatedAt', updatedAtServer);
        this.ListHoadonchitiet.set(data.data);
        return data.data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllHoadonchitiet', error);
        console.error(error);
        return cachedData;
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenHoadonchitietUpdates() {
      this.socket.on('hoadonchitiet-updated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('hoadonchitiets_updatedAt');
        await this.getAllHoadonchitiet();
      });
    }
    //Khởi tạo IndexedDB
    private async initDB() {
      return await openDB('HoadonchitietDB', 1, {
        upgrade(db) {
          db.createObjectStore('hoadonchitiets', { keyPath: 'id' });
        },
      });
    }
    // Lưu vào IndexedDB
    private async saveHoadonchitiets(data: any[]) {
      const db = await this.initDB();
      const tx = db.transaction('hoadonchitiets', 'readwrite');
      const store = tx.objectStore('hoadonchitiets');
      await store.clear(); // Xóa dữ liệu cũ
      data.forEach(item => store.put(item));
      await tx.done;
    }
  
    async getHoadonchitietBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.APIURL}/hoadonchitiet/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.DetailHoadonchitiet.set(data)
      } catch (error) {
        this._ErrorLogService.logError('Failed to getHoadonchitietBy', error);
        return console.error(error);
      }
    }
    async updateHoadonchitiet(dulieu: any) {
      try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/hoadonchitiet/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllHoadonchitiet()
          this.getHoadonchitietBy({id:data.id})
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateHoadonchitiet', error);
          return console.error(error);
      }
    }
    async DeleteHoadonchitiet(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const response = await fetch(`${environment.APIURL}/hoadonchitiet/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllHoadonchitiet()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteHoadonchitiet', error);
            return console.error(error);
        }
    }
    private handleError(status: number) {
      let message = 'Lỗi không xác định';
      switch (status) {
        case 400:
          message = 'Thông tin đã tồn tại';
          this._snackBar.open(message, '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
          break;
        case 404:
          message = 'Vui lòng đăng nhập lại';
          //this._StorageService.removeItem('token');
          //this._StorageService.removeItem('permissions');
          //this.router.navigate(['/login']);
          break;
        case 401:
          message = 'Vui lòng đăng nhập lại';
          //this._StorageService.removeItem('token');
          //this._StorageService.removeItem('permissions');
          //this.router.navigate(['/login']);
          break;
        case 403:
          message = 'Bạn không có quyền truy cập';
          this._snackBar.open(message, '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
          break;
        case 500:
          message = 'Lỗi máy chủ, vui lòng thử lại sau';
            this._snackBar.open(message, '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
          break;
        default:
          this._snackBar.open(message, '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
          break;
      }
      const result = JSON.stringify({ code: status, title: message });
      // this.router.navigate(['/errorserver'], { queryParams: { data: result } });
    }
  }
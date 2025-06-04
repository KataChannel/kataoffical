import {  Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { openDB } from 'idb';
@Injectable({
  providedIn: 'root'
})
export class BanggiaService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
  ) { }
  ListBanggia = signal<any[]>([]);
  DetailBanggia = signal<any>({});
  banggiaId = signal<string | null>(null);
  setBanggiaId(id: string | null) {
    this.banggiaId.set(id);
  }
  private socket = io(`${environment.APIURL}`,{
    transports: ['websocket', 'polling'], // Thêm polling để fallback
    reconnectionAttempts: 5, // Giới hạn reconnect nếu fail
    timeout: 5000, // Timeout 5s
  });

  async importBGKH(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/banggia/importbgkh`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia()
    } catch (error) {
        return console.error(error);
    }
  }
  async importSPBG(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/banggia/importspbg`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia()
    } catch (error) {
        return console.error(error);
    }
  }

  async ImportBanggia(dulieu: any) {
    console.log('bg', dulieu);
    
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/banggia/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia()
    } catch (error) {
        return console.error(error);
    }
  }


  async CreateBanggia(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/banggia`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia()
        this.banggiaId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }


  async getAllBanggia() {
    const db = await this.initDB();
    const cachedData = await db.getAll('banggias');
    const updatedAtCache = this._StorageService.getItem('banggias_updatedAt') || '0'; 
          
    if (cachedData.length > 0 && Date.now() - updatedAtCache < 5 * 60 * 1000) { // 5 phút cache TTL
      this.ListBanggia.set(cachedData);
      return cachedData;
    }
  
    try {
      // ✅ Gọi API chỉ để lấy `updatedAt` mới nhất
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      
      const lastUpdatedResponse = await fetch(`${environment.APIURL}/last-updated?table=banggia`, options);
      if (!lastUpdatedResponse.ok) {
        this.handleError(lastUpdatedResponse.status);
        return cachedData;
      }    
      const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();     
      if (updatedAtServer <= updatedAtCache) {
        this.ListBanggia.set(cachedData);
        return cachedData;
      }
      // ✅ Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
      const response = await fetch(`${environment.APIURL}/banggia`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return cachedData;
      }
      const data = await response.json();
      await this.saveBanggias(data);
      this._StorageService.setItem('banggias_updatedAt', updatedAtServer);
      this.ListBanggia.set(data);
      return data;
    } catch (error) {
      console.error(error);
      return cachedData;
    }
  }
  async getAllBGSP() {
    try {
        const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/banggia/getbgsp`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async getAllBGKH() {
    try {
        const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/banggia/getbgkh`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      return data;
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
    const result = JSON.stringify({ code: status, title: message });
    this.router.navigate(['/errorserver'], { queryParams: { data: result } });
  }

  // 3️⃣ Lắng nghe cập nhật từ WebSocket
  listenBanggiaUpdates() {
    this.socket.on('banggia-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      await this.getAllBanggia();
    });
  }
  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('BanggiaDB', 1, {
      upgrade(db) {
        db.createObjectStore('banggias', { keyPath: 'id' });
      },
    });
  }

  // Lưu vào IndexedDB
  private async saveBanggias(data: any[]) {
    const db = await this.initDB();
    const tx = db.transaction('banggias', 'readwrite');
    const store = tx.objectStore('banggias');
    await store.clear(); // Xóa dữ liệu cũ
    data.forEach(item => store.put(item));
    await tx.done;
  }

  async getBanggiaByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/banggia/findid/${id}`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailBanggia.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateBanggia(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/banggia/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia()
        this.getBanggiaByid(dulieu.id)
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteBanggia(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/banggia/${item.id}`, options);
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllBanggia()
      } catch (error) {
          return console.error(error);
      }
  }
  async addKHtoBG(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/banggia/addKHtoBG`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 403) {
            const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 500) {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          }
        }
        this.getBanggiaByid(dulieu.banggiaId)
    } catch (error) {
        return console.error(error);
    }
  }
  async removeKHfromBG(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/banggia/removeKHfromBG`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 403) {
            const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 500) {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          }
        }
        this.getBanggiaByid(dulieu.banggiaId)
    } catch (error) {
        return console.error(error);
    }
  }
}
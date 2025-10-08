import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { openDB } from 'idb';
@Injectable({
  providedIn: 'root'
})
export class NhomkhachhangService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
  ) { }
  ListNhomkhachhang = signal<any[]>([]);
  DetailNhomkhachhang = signal<any>({});
  nhomkhachhangId = signal<string | null>(null);
  setNhomkhachhangId(id: string | null) {
    this.nhomkhachhangId.set(id);
  }
  async addKHtoNhom(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/nhomkhachhang/addKHtoNhom`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
       // this.getNhomkhachhangByid(dulieu.nhomkhachhangId)
    } catch (error) {
        return console.error(error);
    }
  }
  async removeKHfromNhom(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/nhomkhachhang/removeKHfromNhom`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        //this.getNhomkhachhangByid(dulieu.nhomkhachhangId)
    } catch (error) {
        return console.error(error);
    }
  }

  async CreateNhomkhachhang(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/nhomkhachhang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        this.getAllNhomkhachhang()
        this.nhomkhachhangId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }

  async getAllNhomkhachhang() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/nhomkhachhang`, options);
      if (!response.ok) {

      }
      const data = await response.json();       
      this.ListNhomkhachhang.set(data);   
      // localStorage.setItem('nhomkhachhangs', JSON.stringify(data)); // Cache vào LocalStorage
    } catch (error) {
      return console.error(error);
    }
  }

  // 3️⃣ Lắng nghe cập nhật từ WebSocket
  listenNhomkhachhangUpdates() {

  }
  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('NhomkhachhangDB', 1, {
      upgrade(db) {
        db.createObjectStore('nhomkhachhangs', { keyPath: 'id' });
      },
    });
  }

  async getNhomkhachhangByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/nhomkhachhang/findid/${id}`, options);      
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
      const data = await response.json();      
      this.DetailNhomkhachhang.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateNhomkhachhang(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/nhomkhachhang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        this.getAllNhomkhachhang()
        this.getNhomkhachhangByid(dulieu.id)
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteNhomkhachhang(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this._StorageService.getItem('token')
            },
          };
          const response = await fetch(`${environment.APIURL}/nhomkhachhang/${item.id}`, options);
          if (!response.ok) {
            if (response.status === 401) {
              const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else if (response.status === 403) {
              const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else if (response.status === 500) {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            }
          }
          this.getAllNhomkhachhang()
      } catch (error) {
          return console.error(error);
      }
  }
}
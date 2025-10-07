import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { openDB } from 'idb';
@Injectable({
  providedIn: 'root'
})
export class NhomnccService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
  ) { }
  ListNhomncc = signal<any[]>([]);
  DetailNhomncc = signal<any>({});
  nhomnccId = signal<string | null>(null);
  setNhomnccId(id: string | null) {
    this.nhomnccId.set(id);
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
        const response = await fetch(`${environment.APIURL}/nhomncc/addKHtoNhom`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
       // this.getNhomnccByid(dulieu.nhomnccId)
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
        const response = await fetch(`${environment.APIURL}/nhomncc/removeKHfromNhom`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        //this.getNhomnccByid(dulieu.nhomnccId)
    } catch (error) {
        return console.error(error);
    }
  }

  async CreateNhomncc(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/nhomncc`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        this.getAllNhomncc()
        this.nhomnccId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }

  async getAllNhomncc() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/nhomncc`, options);
      if (!response.ok) {

      }
      const data = await response.json();       
      this.ListNhomncc.set(data);   
      // localStorage.setItem('nhomnccs', JSON.stringify(data)); // Cache vào LocalStorage
    } catch (error) {
      return console.error(error);
    }
  }

  // 3️⃣ Lắng nghe cập nhật từ WebSocket
  listenNhomnccUpdates() {

  }
  // Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('NhomnccDB', 1, {
      upgrade(db) {
        db.createObjectStore('nhomnccs', { keyPath: 'id' });
      },
    });
  }

  async getNhomnccByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/nhomncc/findid/${id}`, options);      
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
      this.DetailNhomncc.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateNhomncc(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/nhomncc/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        this.getAllNhomncc()
        this.getNhomnccByid(dulieu.id)
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteNhomncc(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this._StorageService.getItem('token')
            },
          };
          const response = await fetch(`${environment.APIURL}/nhomncc/${item.id}`, options);
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
          this.getAllNhomncc()
      } catch (error) {
          return console.error(error);
      }
  }
}
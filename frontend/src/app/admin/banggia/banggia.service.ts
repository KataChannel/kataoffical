import {  Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
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
      // Chia dữ liệu thành các batch 10 items
      const batchSize = 10;
      const batches = [];
      
      for (let i = 0; i < dulieu.length; i += batchSize) {
        batches.push(dulieu.slice(i, i + batchSize));
      }

      // Gửi từng batch
      for (const batch of batches) {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(batch),
        };
        
        const response = await fetch(`${environment.APIURL}/banggia/importspbg`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
      }
      
      this.getAllBanggia();
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
    try {
      // ✅ Gọi API chỉ để lấy `updatedAt` mới nhất
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };

      const response = await fetch(`${environment.APIURL}/banggia`, options);
      if (!response.ok) {
        this.handleError(response.status);

      }
      const data = await response.json();
      this.ListBanggia.set(data);
      return data;
    } catch (error) {
      console.error(error);

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

        }
        this.getBanggiaByid(dulieu.banggiaId)
    } catch (error) {
        return console.error(error);
    }
  }
}
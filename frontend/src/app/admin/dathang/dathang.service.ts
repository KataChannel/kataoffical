import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import moment from 'moment';
import { TimezoneService } from '../../shared/services/timezone.service';
@Injectable({
  providedIn: 'root'
})
export class DathangService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private timezoneService: TimezoneService,
  ) { }
  ListDathang = signal<any[]>([]);
  DetailDathang = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50); // Mặc định 10 mục mỗi trang
  dathangId = signal<string | null>(null);
  setDathangId(id: string | null) {
    this.dathangId.set(id);
  }
  async ImportDathang(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this._StorageService.getItem('token')
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/dathang/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }       
      const data = await response.json();
        if (!response.ok) {
            console.log(response.status);     
        }        
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }
  async CreateDathang(dulieu: any) {
    try {
      // Enhanced date synchronization for dathang creation
      console.log('🔄 Creating dathang with enhanced date sync:', dulieu);
      
      // Synchronize date fields if they exist
      const synchronizedData = this.timezoneService.synchronizeObjectDates(dulieu, ['ngaygiao', 'ngaynhan']);
      
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(synchronizedData),
        };
        const response = await fetch(`${environment.APIURL}/dathang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        this.getAllDathang()
        this.dathangId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }
  async CreateByNhucau(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/dathang/bynhucau`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        this.getAllDathang()
        this.dathangId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }

  async getSLChonhap(SearchParams: any) {
    // Enhanced date synchronization for search parameters
    const payload = {...SearchParams}
    
    console.log('🔄 Enhanced date sync for getSLChonhap:', payload);
    
    // Use enhanced synchronization for date range filters
    if (payload.Batdau || payload.Ketthuc) {
      payload.Batdau = this.timezoneService.toUTC(payload.Batdau, 'searchStartDate');
      payload.Ketthuc = this.timezoneService.toUTC(payload.Ketthuc, 'searchEndDate');
    }
    
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(`${environment.APIURL}/dathang/getchonhap`, options);
      if (!response.ok) {

      }
      const data = await response.json();
      return data
    } catch (error) {
      return console.error(error);
    }
  }



  async searchDathang(SearchParams: any) {
    // Enhanced date synchronization for search parameters
    const payload = {...SearchParams}
    
    console.log('🔄 Enhanced date sync for searchDathang:', payload);
    
    // Use enhanced synchronization for date range filters
    if (payload.Batdau || payload.Ketthuc) {
      payload.Batdau = this.timezoneService.toUTC(payload.Batdau, 'searchStartDate');
      payload.Ketthuc = this.timezoneService.toUTC(payload.Ketthuc, 'searchEndDate');
    }
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(`${environment.APIURL}/dathang/search`, options);
      if (!response.ok) {

      }
      const data = await response.json();           
      this.ListDathang.set(data.data)
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async getAllDathang() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/dathang?`, options);
      if (!response.ok) {

      }
      const data = await response.json();           
      this.ListDathang.set(data)
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async getDathangByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/dathang/findid/${id}`, options);      
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
      this.DetailDathang.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async findbysanpham(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/dathang/findbysanpham/${id}`, options);
      if (!response.ok) {
          this.handleError(response.status);
      }
      const data = await response.json();      
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async updateDathang(dulieu: any) {
    try {
      // Enhanced date synchronization for dathang update
      console.log('🔄 Updating dathang with enhanced date sync:', dulieu);
      
      // Synchronize date fields if they exist
      const synchronizedData = this.timezoneService.synchronizeObjectDates(dulieu, ['ngaygiao', 'ngaynhan']);
      
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(synchronizedData),
        };
        const response = await fetch(`${environment.APIURL}/dathang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        console.log('data Update',data);
        
        // this.getAllDathang()
        this.getDathangByid(data.id)
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteDathang(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/dathang/${item.id}`, options);
          if (!response.ok) {
          }
          this.getAllDathang()
      } catch (error) {
          return console.error(error);
      }
  }

 async getDathangBy(param: any) {
  if (param.Batdau || param.Ketthuc) {
      const dateRange = this.timezoneService.getAPIDateRange(param.Batdau, param.Ketthuc);
      param.Batdau = dateRange.Batdau;
      param.Ketthuc = dateRange.Ketthuc;
    }
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify({ ...param}),
      };
      const response = await fetch(`${environment.APIURL}/dathang/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      if (param.isOne === true) {
        this.DetailDathang.set(data);
      } else {
        this._StorageService.setItem('dathangs_updatedAt', this.timezoneService.nowUTC());
        this.ListDathang.set(data.data);
        this.page.set(data.page || 1);
        this.pageCount.set(data.pageCount || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(this.pageSize());
      }
    } catch (error) {

    }
  }
  private handleError(status: number) {
    let message = 'Lỗi không xác định';
    switch (status) {
      case 400:
        message = 'Thông tin đã tồn tại';
        break;
      case 401:
      case 404:
        message = 'Vui lòng đăng nhập lại';
        break;
      case 403:
        message = 'Bạn không có quyền truy cập';
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
        break;
    }
  }

  async ImportDathangCu(listImportData: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
        body: JSON.stringify(listImportData),
      };
      const response = await fetch(`${environment.APIURL}/dathang/importcu`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.getAllDathang();
      return data;
    } catch (error) {
      console.error('Error importing dathang:', error);
      throw error;
    }
  }

  async DeleteBulkDathang(ids: string[]) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
        body: JSON.stringify({ ids }),
      };
      const response = await fetch(`${environment.APIURL}/dathang/deletebulk`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.getAllDathang();
      return data;
    } catch (error) {
      console.error('Error deleting bulk dathang:', error);
      throw error;
    }
  }

  async getNhacungcapBy(params: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
        body: JSON.stringify(params),
      };
      const response = await fetch(`${environment.APIURL}/nhacungcap/findby`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error finding nhacungcap:', error);
      throw error;
    }
  }

  async searchCongno(SearchParams: any) {
    const payload = {...SearchParams}
    // ✅ Sử dụng getAPIDateRange để đảm bảo consistent date handling
    if (payload.Batdau || payload.Ketthuc) {
      const dateRange = this.timezoneService.getAPIDateRange(payload.Batdau, payload.Ketthuc);
      payload.Batdau = dateRange.Batdau;
      payload.Ketthuc = dateRange.Ketthuc;
    }
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(`${environment.APIURL}/dathang/congnoncc`, options); // Thay đổi endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();                 
      this.ListDathang.set(data)
      return data
    } catch (error) {
      console.error('Error searching congno:', error);
      return [];
    }
  }
}
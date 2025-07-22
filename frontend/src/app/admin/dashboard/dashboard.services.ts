import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
  ) { }
  ListDashboard = signal<any[]>([]);
  DetailDashboard = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50);
  dashboardId = signal<string | null>(null);
  setDashboardId(id: string | null) {
    this.dashboardId.set(id);
  }
async DonhangDashboard(params: any) {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const options = {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this._StorageService.getItem('token')
                },
            };
            const response = await fetch(`${environment.APIURL}/dashboard/donhang?${queryParams}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);  
            return data 
    } catch (error) {
            return console.error(error);
    }
}

  async getSLChogiao(SearchParams: any) {
    const payload = {...SearchParams}
    payload.Batdau = moment(payload.Batdau).utc()
    payload.Ketthuc = moment(payload.Ketthuc).utc()
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(`${environment.APIURL}/dashboard/getchogiao`, options);
      if (!response.ok) {

      }
      const data = await response.json();           
      this.ListDashboard.set(data.data)
      this.page.set(data.pageNumber);
      this.pageCount.set(data.totalPages);
      this.total.set(data.total);
      this.pageSize.set(data.pageSize);
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async searchDashboard(SearchParams: any) {
    const payload = {...SearchParams}
    payload.Batdau = moment(payload.Batdau).utc()
    payload.Ketthuc = moment(payload.Ketthuc).utc()
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(`${environment.APIURL}/dashboard/search`, options);
      if (!response.ok) {

      }
      const data = await response.json();   
      console.log('search data', data);
              
      this.ListDashboard.set(data.data)
      this.page.set(data.pageNumber);
      this.pageCount.set(data.totalPages);
      this.total.set(data.total);
      this.pageSize.set(data.pageSize);
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async searchCongno(SearchParams: any) {
    const payload = {...SearchParams}
    payload.Batdau = moment(payload.Batdau).utc()
    payload.Ketthuc = moment(payload.Ketthuc).utc()
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(`${environment.APIURL}/dashboard/congnokhachhang`, options);
      if (!response.ok) {

      }
      const data = await response.json();                 
      this.ListDashboard.set(data)
      return data
    } catch (error) {
      return console.error(error);
    }
  }

  async Phieuchuyen(SearchParams: any) {
    const payload = {...SearchParams}
    payload.Batdau = moment(payload.Batdau).utc()
    payload.Ketthuc = moment(payload.Ketthuc).utc()
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(`${environment.APIURL}/dashboard/phieuchuyen`, options);
      if (!response.ok) {

      }
      const data = await response.json();           
      this.ListDashboard.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async Phieugiaohang(Params: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
        body: JSON.stringify(Params),
      };
      const response = await fetch(`${environment.APIURL}/dashboard/phieugiao`, options);
      if (!response.ok) {

      }
      const data = await response.json();           
      this.DetailDashboard.set(data)
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
      const response = await fetch(`${environment.APIURL}/dashboard/findbysanpham/${id}`, options);
      if (!response.ok) {
     
      }
      const data = await response.json();      
      return data
    } catch (error) {
      return console.error(error);
    }
  }



  async getAllDashboard() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/dashboard`, options);
      if (!response.ok) {
        // if (response.status === 401) {
        //   const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
        //   this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        //   // this.Dangxuat()
        // } else if (response.status === 403) {
        //   const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
        //   this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        //   // this.Dangxuat()
        // } else if (response.status === 500) {
        //   const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
        //   this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        // } else {
        //   const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
        //   this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        // }
      }
      const data = await response.json();           
      this.ListDashboard.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async getDashboardByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/dashboard/findid/${id}`, options);      
      if (!response.ok) {
        // if (response.status === 401) {
        //   const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
        //   this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        //   // this.Dangxuat()
        // } else if (response.status === 403) {
        //   const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
        //   this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        //   // this.Dangxuat()
        // } else if (response.status === 500) {
        //   const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
        //   this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        //   // this.Dangxuat()
        // } else {
        //   const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
        //   this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        // }
      }
      const data = await response.json();      
      this.DetailDashboard.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateDashboard(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/dashboard/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          
        }
        this.getAllDashboard()
        this.getDashboardByid(dulieu.id)
        return data
    } catch (error) {
        return console.error(error);
    }
  }
  async updatePhieugiao(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/dashboard/phieugiao/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          
        }
        this.getAllDashboard()
        this.Phieugiaohang({id:dulieu.id})
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteDashboard(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/dashboard/${item.id}`, options);
          if (!response.ok) {
          }
      } catch (error) {
          return console.error(error);
      }
  }

  
  async UpdateBulkDashboard(items:any[]) {    
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(items),
          };
          const response = await fetch(`${environment.APIURL}/dashboard/bulk`, options);
          if (!response.ok) {
          }
           this.getAllDashboard()
          const data = await response.json();
          return data
  
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteBulkDashboard(items:any[]) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(items),
          };
          const response = await fetch(`${environment.APIURL}/dashboard/bulk`, options);
          if (!response.ok) {
          }
           this.getAllDashboard()
          const data = await response.json();
          return data
  
      } catch (error) {
          return console.error(error);
      }
  }

  // async SearchDashboard(SearchParams:any) {
  //   try {
  //     const options = {
  //       method:'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(SearchParams),
  //     };
  //         const response = await fetch(`${environment.APIURL}/dashboard/search`,options);
  //         if (!response.ok) {
  //         }
  //         const data = await response.json();   
  //         this.ListDashboard.set(data.items)
  //         return data;
  //     } catch (error) {
  //         return console.error(error);
  //     }
  // }
  async SearchField(SearchParams:any) {   
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/dashboard/searchfield`,options);
          if (!response.ok) {
          }
          const data = await response.json();   
          this.DetailDashboard.set(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
}
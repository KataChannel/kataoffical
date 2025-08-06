import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DonhangService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
  ) { }
  ListDonhang = signal<any[]>([]);
  DetailDonhang = signal<any>({});
  page = signal<number>(1);
  pageCount = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50);
  donhangId = signal<string | null>(null);
  setDonhangId(id: string | null) {
    this.donhangId.set(id);
  }
  async ImportDonhangCu(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/donhang/importold`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        // this.getAllDonhang()
        return data;
    } catch (error) {
        return console.error(error);
    }
  }
  async ImportDonhang(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/donhang/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        this.getAllDonhang()
        this.donhangId.set(data.id)
        return data;
    } catch (error) {
        return console.error(error);
    }
  }

  async DongboGia(list:any){
    const dulieu = list.map((item:any) => item.id);
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/donhang/dongbogia`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        this.getAllDonhang()
        return data;
    } catch (error) {
        return console.error(error);
    }
  }
  async CreateDonhang(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/donhang`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        this.getAllDonhang()
        this.donhangId.set(data.id)
        return data;
    } catch (error) {
        return console.error(error);
    }
  }

  async DagiaoDonhang(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/donhang/${dulieu.id}/dagiao`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {

        }
        console.log(data);   
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
      const response = await fetch(`${environment.APIURL}/donhang/getchogiao`, options);
      if (!response.ok) {

      }
      const data = await response.json();           
      this.ListDonhang.set(data.data)
      this.page.set(data.pageNumber);
      this.pageCount.set(data.totalPages);
      this.total.set(data.total);
      this.pageSize.set(data.pageSize);
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async searchDonhang(SearchParams: any) {
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
      const response = await fetch(`${environment.APIURL}/donhang/search`, options);
      if (!response.ok) {

      }
      const data = await response.json();                 
      this.ListDonhang.set(data.data)
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
      const response = await fetch(`${environment.APIURL}/donhang/congnokhachhang`, options);
      if (!response.ok) {

      }
      const data = await response.json();                 
      this.ListDonhang.set(data)
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
      const response = await fetch(`${environment.APIURL}/donhang/phieuchuyen`, options);
      if (!response.ok) {

      }
      const data = await response.json();           
      this.ListDonhang.set(data)
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
      const response = await fetch(`${environment.APIURL}/donhang/phieugiao`, options);
      if (!response.ok) {

      }
      const data = await response.json();           
      this.DetailDonhang.set(data)
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
      const response = await fetch(`${environment.APIURL}/donhang/findbysanpham/${id}`, options);
      if (!response.ok) {
     
      }
      const data = await response.json();      
      return data
    } catch (error) {
      return console.error(error);
    }
  }



  async getAllDonhang() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/donhang`, options);
      if (!response.ok) {

      }
      const data = await response.json();           
      this.ListDonhang.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async getDonhangByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/donhang/findid/${id}`, options);      
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
      this.DetailDonhang.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateDonhang(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/donhang/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          
        }
        this.getAllDonhang()
        this.getDonhangByid(dulieu.id)
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
        const response = await fetch(`${environment.APIURL}/donhang/phieugiao/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          
        }
        // this.getAllDonhang()
        this.Phieugiaohang({id:dulieu.id})
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteDonhang(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/donhang/${item.id}`, options);
          if (!response.ok) {
          }
      } catch (error) {
          return console.error(error);
      }
  }

  
  async UpdateBulkDonhang(items:any[]) {    
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(items),
          };
          const response = await fetch(`${environment.APIURL}/donhang/bulk`, options);
          if (!response.ok) {
          }
           this.getAllDonhang()
          const data = await response.json();
          return data
  
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteBulkDonhang(items:any[]) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(items),
          };
          const response = await fetch(`${environment.APIURL}/donhang/bulk`, options);
          if (!response.ok) {
          }
           this.getAllDonhang()
          const data = await response.json();
          return data
  
      } catch (error) {
          return console.error(error);
      }
  }

  // async SearchDonhang(SearchParams:any) {
  //   try {
  //     const options = {
  //       method:'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(SearchParams),
  //     };
  //         const response = await fetch(`${environment.APIURL}/donhang/search`,options);
  //         if (!response.ok) {
  //         }
  //         const data = await response.json();   
  //         this.ListDonhang.set(data.items)
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
          const response = await fetch(`${environment.APIURL}/donhang/searchfield`,options);
          if (!response.ok) {
          }
          const data = await response.json();   
          this.DetailDonhang.set(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
}
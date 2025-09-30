import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { TimezoneService } from '../../shared/services/timezone.service';

@Injectable({
  providedIn: 'root'
})
export class DonhangService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private timezoneService: TimezoneService,
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
            'Authorization': 'Bearer ' + this._StorageService.getItem('token')
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/donhang/importold`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // 🎯 NEW LOGIC: Handle duplicate detection
        if (data.status === 'duplicates_found') {
          // Return special response for frontend to handle confirmation
          return {
            needsConfirmation: true,
            message: data.message,
            duplicates: data.duplicates,
            pendingOrders: data.pendingOrders,
            processResults: data.processResults
          };
        }
        
        // Normal completion or other statuses
        return data;
    } catch (error) {
        console.error('Error in ImportDonhangCu:', error);
        throw error;
    }
  }

  // 🎯 NEW METHOD: Handle confirmed duplicate orders
  async ImportDonhangCuConfirmed(pendingOrders: any[], userChoice: 'proceed' | 'skip') {
    try {
      const options = {
          method:'POST',
                    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this._StorageService.getItem('token')
          },
          body: JSON.stringify({ pendingOrders, userChoice }),
        };
        const response = await fetch(`${environment.APIURL}/donhang/importold/confirmed`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Refresh the donhang list after successful import
        if (data.status === 'completed' && data.success > 0) {
          // this.getAllDonhang();
        }
        
        return data;
    } catch (error) {
        console.error('Error in ImportDonhangCuConfirmed:', error);
        throw error;
    }
  }
  async ImportDonhang(dulieu: any) {
    try {
      const options = {
          method:'POST',
                    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this._StorageService.getItem('token')
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

  async DongboGia(list: any) {
    const dulieu = list.map((item: any) => item.id);
    
    if (dulieu.length === 0) {
      return {
        status: 'error',
        message: 'Không có đơn hàng nào được chọn để đồng bộ giá'
      };
    }

    try {
      const options = {
        method: 'POST',
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
      
      // Refresh danh sách đơn hàng sau khi đồng bộ
      this.getAllDonhang();
      
      return data;
    } catch (error: any) {
      console.error('Lỗi khi đồng bộ giá:', error);
      return {
        status: 'error',
        message: error.message || 'Lỗi khi đồng bộ giá từ server'
      };
    }
  }
  async CreateDonhang(dulieu: any) {
    try {
      const options = {
          method:'POST',
                    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this._StorageService.getItem('token')
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
            'Authorization': 'Bearer ' + this._StorageService.getItem('token')
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
  async downloadCongno(SearchParams: any) {
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
      const response = await fetch(`${environment.APIURL}/donhang/downloadcongnokhachhang`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'CongNoKhachHang.xlsx';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }

      // Get blob data
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return { success: true, filename };
    } catch (error) {
      console.error('Error downloading congno:', error);
      throw error;
    }
  }

  async Phieuchuyen(SearchParams: any) {
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
            'Authorization': 'Bearer ' + this._StorageService.getItem('token')
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
            'Authorization': 'Bearer ' + this._StorageService.getItem('token')
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
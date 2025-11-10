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
        
        // ✅ Không gọi getAllDonhang() - component sẽ reload khi cần
        this.donhangId.set(data.id);
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
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
        body: JSON.stringify(dulieu),
      };
      
      const response = await fetch(`${environment.APIURL}/donhang/dongbogia`, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // ✅ Không gọi getAllDonhang() - component sẽ reload khi cần
      // Component có thể gọi searchDonhang() để refresh data
      
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
        
        // ✅ Không gọi getAllDonhang() nữa vì endpoint không tồn tại
        // Component sẽ tự reload data khi cần
        this.donhangId.set(data.id);
        
        // ✅ Thêm đơn hàng mới vào ListDonhang thay vì reload toàn bộ
        const currentList = this.ListDonhang();
        if (Array.isArray(currentList)) {
          this.ListDonhang.set([data, ...currentList]);
        }
        
        return data;
    } catch (error) {
        console.error('Error in CreateDonhang:', error);
        throw error;
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // ✅ Đảm bảo data.data là array trước khi set
      if (Array.isArray(data.data)) {
        this.ListDonhang.set(data.data);
      } else {
        console.error('searchDonhang: data.data is not an array:', data.data);
        this.ListDonhang.set([]);
      }
      
      this.page.set(data.pageNumber || 1);
      this.pageCount.set(data.totalPages || 0);
      this.total.set(data.total || 0);
      this.pageSize.set(data.pageSize || 50);
      return data;
    } catch (error) {
      console.error('Error in searchDonhang:', error);
      // ✅ Đảm bảo ListDonhang luôn là array khi có lỗi
      this.ListDonhang.set([]);
      return { data: [], pageNumber: 1, totalPages: 0, total: 0, pageSize: 50 };
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
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
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
    // ⚠️ DEPRECATED: Không nên dùng GET /donhang vì không có endpoint này
    // Sử dụng searchDonhang() với params rỗng thay thế
    console.warn('getAllDonhang() is deprecated. Use searchDonhang() instead.');
    
    try {
      // Gọi searchDonhang với params mặc định để lấy tất cả đơn hàng
      await this.searchDonhang({
        pageSize: 999999,
        Type: 'all'
      });
    } catch (error) {
      console.error('Error in getAllDonhang:', error);
      // Đảm bảo ListDonhang luôn là array
      if (!Array.isArray(this.ListDonhang())) {
        this.ListDonhang.set([]);
      }
    }
  }
  async getDonhangByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
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
        
        // ✅ Không gọi getAllDonhang() - update item trong ListDonhang thay vì reload
        const currentList = this.ListDonhang();
        if (Array.isArray(currentList)) {
          const index = currentList.findIndex((item: any) => item.id === dulieu.id);
          if (index !== -1) {
            currentList[index] = { ...currentList[index], ...data };
            this.ListDonhang.set([...currentList]);
          }
        }
        
        this.getDonhangByid(dulieu.id);
        return data;
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
              'Authorization': 'Bearer ' + this._StorageService.getItem('token')
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
              'Authorization': 'Bearer ' + this._StorageService.getItem('token')
            },
            body: JSON.stringify(items),
          };
          const response = await fetch(`${environment.APIURL}/donhang/bulk`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          // ✅ Không gọi getAllDonhang() - component sẽ reload khi cần
          return data;
  
      } catch (error) {
          console.error('Error in UpdateBulkDonhang:', error);
          throw error;
      }
  }

  async DeleteBulkDonhang(items:any[]) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this._StorageService.getItem('token')
            },
            body: JSON.stringify(items),
          };
          const response = await fetch(`${environment.APIURL}/donhang/bulk`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          // ✅ Không gọi getAllDonhang() - component sẽ reload khi cần
          return data;
  
      } catch (error) {
          console.error('Error in DeleteBulkDonhang:', error);
          throw error;
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
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
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

  /**
   * Hủy đơn hàng với lý do
   * @param donhangId ID đơn hàng cần hủy
   * @param lydohuy Lý do hủy đơn (bắt buộc, tối thiểu 10 ký tự)
   * @returns Promise với kết quả hủy đơn
   */
  async cancelDonhang(donhangId: string, lydohuy: string): Promise<any> {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
        body: JSON.stringify({ lydohuy }),
      };
      
      const response = await fetch(`${environment.APIURL}/orders/donhang/${donhangId}/cancel`, options);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // ✅ Không gọi getAllDonhang() - update item trong list thay vì reload
      const currentList = this.ListDonhang();
      if (Array.isArray(currentList)) {
        const index = currentList.findIndex((item: any) => item.id === donhangId);
        if (index !== -1) {
          currentList[index] = { ...currentList[index], ...data };
          this.ListDonhang.set([...currentList]);
        }
      }
      
      return data;
    } catch (error: any) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      throw error;
    }
  }
}
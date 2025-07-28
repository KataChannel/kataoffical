import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChotkhoService {
  private socket: any;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 phút cache cho performance
  
  constructor(
    private _StorageService: StorageService,
    private _sharedSocketService: SharedSocketService,
  ) {
    this.socket = this._sharedSocketService.getSocket();
  }

  private _snackBar: MatSnackBar = inject(MatSnackBar);
  
  // Signals for state management
  ListChotkho = signal<any[]>([]);
  DetailChotkho = signal<any>({});
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50);
  chotkhoId = signal<string | null>(null);
  
  // Loading states for better UX
  isLoading = signal<boolean>(false);
  isRefreshing = signal<boolean>(false);
  lastUpdated = signal<Date | null>(null);

  setChotkhoId(id: string | null) {
    this.chotkhoId.set(id);
  }
  async getListSanphamTonKho(maspList: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
        },
        body: JSON.stringify(maspList),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/tonkhobylist`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Lỗi lấy danh sách sản phẩm tồn kho:', error);
      this.handleError(500);
      return [];
    }
  }
  async CreateChotkho(dulieu: any) {
    this.isLoading.set(true);
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
        },
        body: JSON.stringify(dulieu),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/create`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      
      const data = await response.json();
      
      // Tự động refresh danh sách và set ID mới
      await this.getAllChotkho();
      this.chotkhoId.set(data.id);      
      this._snackBar.open('Tạo chốt kho thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return data;
    } catch (error) {
      console.error('Lỗi tạo chốt kho:', error);
      this.handleError(500);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  // Tạo chốt kho hàng loạt cho nhiều sản phẩm
  async bulkCreateChotkho(dataList: any[]) {
    this.isLoading.set(true);
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
        },
        body: JSON.stringify(dataList),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/bulk-create`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      
      const data = await response.json();
      
      // Tự động refresh danh sách
      await this.getAllChotkho();      
      this._snackBar.open(`Tạo thành công ${data?.data?.length || 0} bản ghi chốt kho`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return data;
    } catch (error) {
      console.error('Lỗi tạo chốt kho hàng loạt:', error);
      this.handleError(500);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getChotkhoByDateRange(params: any) {
    this.isLoading.set(true);
    try {
      const { startDate, endDate, page = 1, limit = this.pageSize() } = params;
      
      const query = new URLSearchParams({
        startDate: startDate || '',
        endDate: endDate || '',
        page: page.toString(),
        limit: limit.toString()
      });

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      };

      const response = await fetch(`${environment.APIURL}/chotkho/bydate?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }

      const data = await response.json();
      
      // Update state with the returned data
      this.ListChotkho.set(data.data || []);
      this.page.set(data.page || page);
      this.totalPages.set(data.totalPages || 1);
      this.total.set(data.total || 0);
      this.pageSize.set(limit);
      this.lastUpdated.set(new Date());
      
      return data;
    } catch (error) {
      console.error('Lỗi lấy chốt kho theo khoảng thời gian:', error);
      this.handleError(500);
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getAllChotkho(queryParams: any = {}) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      };

      queryParams = {
        page: this.page().toString(),
        pageSize: this.pageSize().toString(),
        ...queryParams,
      };

      // Build query string
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          query.append(key, String(value));
        }
      });

      // Always fetch fresh data from server
      const response = await fetch(`${environment.APIURL}/chotkho?${query}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return [];
      }

      const data = await response.json();
      
      // Update state immediately
      this.ListChotkho.set(data.data || []);
      this.page.set(data.page || 1);
      this.totalPages.set(data.totalPages || 1);
      this.total.set(data.total || 0);
      this.pageSize.set(data.pageSize || this.pageSize());
      this.lastUpdated.set(new Date());
      
      return data.data || [];

    } catch (error) {
      console.error('Lỗi tải dữ liệu chốt kho:', error);
      this.handleError(500);
      return [];
    } finally {
      this.isRefreshing.set(false);
    }
  }

  async getUpdatedCodeIds() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/chotkho/updateCodeIds`, options);
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();
      this.getAllChotkho(this.pageSize());
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getChotkhoBy(param: any, pageSize: number = this.pageSize()) {
    this.pageSize.set(pageSize);
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        body: JSON.stringify({ 
          ...param, 
          page: this.page(), 
          limit: pageSize,
        }),
      };

      const response = await fetch(`${environment.APIURL}/chotkho/findby`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return;
      }

      const data = await response.json();
      
      if (param.isOne === true) {
        this.DetailChotkho.set(data);
      } else {
        // Cập nhật state ngay lập tức không cần cache
        this.ListChotkho.set(data.data || []);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || 0);
        this.pageSize.set(pageSize);
      }
    } catch (error) {
      console.error('Lỗi tìm kiếm chốt kho:', error);
      this.handleError(500);
    }
  }

  async updateChotkho(dulieu: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({
          ...dulieu
        }),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/update/${dulieu.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      
      const data = await response.json();
      
      // Refresh cả danh sách và chi tiết
      await this.getAllChotkho();
      if (data?.id) {
        await this.getChotkhoBy({ id: data.id, isOne: true });
      }
      
      return data;
    } catch (error) {
      console.error('Lỗi cập nhật chốt kho:', error);
      this.handleError(500);
      return null;
    }
  }

  async DeleteChotkho(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
          'Cache-Control': 'no-cache'
        },
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/delete/${item.id}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return false;
      }
      
      // Refresh danh sách ngay lập tức
      await this.getAllChotkho();
      return true;
    } catch (error) {
      console.error('Lỗi xóa chốt kho:', error);
      this.handleError(500);
      return false;
    }
  }

  // Phương thức tạo báo cáo chốt kho
  async generateReport(queryParams: any = {}) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(queryParams),
      };
      const response = await fetch(`${environment.APIURL}/chotkho/report`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi tạo báo cáo:', error);
      return null;
    }
  }

  // Phương thức cập nhật hàng loạt trạng thái chốt kho
  async bulkUpdateStatus(ids: string[], status: string) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify({ ids, status }),
      };
      const response = await fetch(`${environment.APIURL}/chotkho/bulk-update-status`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return false;
      }
      await this.getAllChotkho();
      return true;
    } catch (error) {
      console.error('Lỗi cập nhật hàng loạt:', error);
      return false;
    }
  }

  // Phương thức lấy thống kê chốt kho
  async getStatistics() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/chotkho/statistics`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi lấy thống kê:', error);
      return null;
    }
  }

  // Phương thức tìm chốt kho theo sản phẩm
  async findBySanpham(sanphamId: string, page: number = 1, limit: number = 20) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/chotkho/by-sanpham/${sanphamId}?page=${page}&limit=${limit}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi tìm chốt kho theo sản phẩm:', error);
      return null;
    }
  }

  // Phương thức tìm chốt kho theo kho
  async findByKho(khoId: string, page: number = 1, limit: number = 20) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
      };
      const response = await fetch(`${environment.APIURL}/chotkho/by-kho/${khoId}?page=${page}&limit=${limit}`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error('Lỗi tìm chốt kho theo kho:', error);
      return null;
    }
  }

  // Phương thức tìm kiếm nâng cao với tối ưu hóa
  async advancedSearch(criteria: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({
          ...criteria,
        }),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/advanced-search`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return [];
      }
      
      const data = await response.json();
      this.ListChotkho.set(data.data || []);
      this.page.set(data.page || 1);
      this.totalPages.set(data.totalPages || 1);
      this.total.set(data.total || 0);
      
      return data.data || [];
    } catch (error) {
      console.error('Lỗi tìm kiếm nâng cao:', error);
      return [];
    }
  }

  // Phương thức refresh dữ liệu nhanh
  async quickRefresh() {
    try {
      await this.getAllChotkho();
      this._snackBar.open('Dữ liệu đã được cập nhật', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    } catch (error) {
      console.error('Lỗi refresh:', error);
    }
  }

  // Phương thức validate dữ liệu trước khi gửi
  validateChotkhoData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!data.title || data.title.trim() === '') {
      errors.push('Tiêu đề không được để trống');
    }
    
    if (!data.ngayChot) {
      errors.push('Ngày chốt kho không được để trống');
    }
    
    if (data.slThucTe && data.slThucTe < 0) {
      errors.push('Số lượng thực tế không được âm');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Phương thức tính toán chênh lệch tự động
  calculateChenhLech(slHeThong: number, slThucTe: number): number {
    return (slThucTe || 0) - (slHeThong || 0);
  }

  // Phương thức export dữ liệu
  async exportData(format: 'excel' | 'pdf' | 'csv' = 'excel', filters: any = {}) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify({
          format,
          filters,
        }),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/export`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chot-kho-${new Date().toISOString().split('T')[0]}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Lỗi export dữ liệu:', error);
      return false;
    }
  }

  // Phương thức thông minh kiểm tra chênh lệch
  async smartCheckChenhLech(chotKhoId: string) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify({ 
          chotKhoId,
          autoCorrect: true 
        }),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/smart-check-chenhlech`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Lỗi kiểm tra chênh lệch thông minh:', error);
      return null;
    }
  }

  // Phương thức tạo mẫu import
  async generateImportTemplate(templateType: 'standard' | 'advanced' = 'standard') {
    try {
      const response = await fetch(`${environment.APIURL}/chotkho/import-template?type=${templateType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        this.handleError(response.status);
        return false;
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mau-import-chot-kho-${templateType}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Lỗi tạo mẫu import:', error);
      return false;
    }
  }

  // Phương thức import từ Excel
  async importFromExcel(file: File, options: any = {}) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('options', JSON.stringify(options));
      
      const response = await fetch(`${environment.APIURL}/chotkho/import`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: formData
      });
      
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      
      const result = await response.json();
      
      // Refresh data after import
      await this.getAllChotkho();
      
      this._snackBar.open(`Import thành công ${result.successCount} mục`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return result;
    } catch (error) {
      console.error('Lỗi import:', error);
      return null;
    }
  }

  // Phương thức sao lưu dữ liệu
  async backupData(backupType: 'full' | 'incremental' = 'full') {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify({ 
          type: backupType,
        }),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/backup`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return false;
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-chot-kho-${backupType}-${new Date().toISOString().split('T')[0]}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Lỗi sao lưu:', error);
      return false;
    }
  }

  // Phương thức phục hồi từ backup
  async restoreFromBackup(file: File) {
    try {
      const formData = new FormData();
      formData.append('backup', file);
      
      const response = await fetch(`${environment.APIURL}/chotkho/restore`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: formData
      });
      
      if (!response.ok) {
        this.handleError(response.status);
        return false;
      }
      
      // Refresh all data after restore
      await this.getAllChotkho();
      
      this._snackBar.open('Phục hồi dữ liệu thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return true;
    } catch (error) {
      console.error('Lỗi phục hồi:', error);
      return false;
    }
  }

  // Phương thức kiểm tra trùng lặp
  async checkDuplicates(data: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify(data),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/check-duplicates`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Lỗi kiểm tra trùng lặp:', error);
      return null;
    }
  }

  // Phương thức tối ưu hóa hiệu suất
  async optimizePerformance() {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        },
        body: JSON.stringify({ 
          action: 'optimize',
        }),
      };
      
      const response = await fetch(`${environment.APIURL}/chotkho/optimize`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return false;
      }
      
      const result = await response.json();
      
      this._snackBar.open('Tối ưu hóa thành công', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return result;
    } catch (error) {
      console.error('Lỗi tối ưu hóa:', error);
      return false;
    }
  }

  // Phương thức debug và monitoring
  async getSystemHealth() {
    try {
      const response = await fetch(`${environment.APIURL}/chotkho/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        this.handleError(response.status);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Lỗi kiểm tra sức khỏe hệ thống:', error);
      return null;
    }
  }

  private handleError(status: number): void {
    let message = 'Lỗi không xác định';
    let panelClass = 'snackbar-error';
    switch (status) {
      case 400:
        message = 'Thông tin đã tồn tại hoặc không hợp lệ';
        break;
      case 401:
        message = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
        break;
      case 403:
        message = 'Bạn không có quyền thực hiện thao tác này';
        break;
      case 404:
        message = 'Không tìm thấy dữ liệu yêu cầu';
        break;
      case 422:
        message = 'Dữ liệu không hợp lệ';
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
        break;
      case 503:
        message = 'Dịch vụ tạm thời không khả dụng';
        break;
      default:
        message = `Lỗi HTTP ${status}`;
    }

    this._snackBar.open(message, 'Đóng', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
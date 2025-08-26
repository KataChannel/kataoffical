import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { GraphqlService } from '../../shared/services/graphql.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';

@Injectable({
  providedIn: 'root'
})
export class KhachhangGraphqlService {
  private _GraphqlService = inject(GraphqlService);
  private _StorageService = inject(StorageService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private _ErrorLogService = inject(ErrorLogService);
  private _sharedSocketService = inject(SharedSocketService);
  
  private socket: any;

  // Signals for reactive state management
  ListKhachhang = signal<any[]>([]);
  DetailKhachhang = signal<any>({});
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50);
  khachhangId = signal<string | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.socket = this._sharedSocketService.getSocket();
    this.listenKhachhangUpdates();
  }

  setKhachhangId(id: string | null) {
    this.khachhangId.set(id);
  }

  /**
   * Lấy toàn bộ danh sách khách hàng (không pagination)
   */
  async getAllKhachhang(searchParam: any = {}) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Optimized select - chỉ lấy các field cần thiết cho list view
      const select = {
        id: true,
        makh: true,
        name: true,
        diachi: true,
        quan: true,
        email: true,
        sdt: true,
        mst: true,
        gionhanhang: true,
        loaikh: true,
        ghichu: true,
        isActive: true,
        createdAt: true,
        banggiaId: true,
        banggia: {
          select: {
            id: true,
            title: true,
            mabanggia: true
          }
        }
      };

      // Xây dựng where clause từ searchParam
      const where: any = { 
        isActive: true  // Chỉ lấy khách hàng active
      };

      if (searchParam.subtitle) {
        where.OR = [
          { name: { contains: searchParam.subtitle, mode: 'insensitive' } },
          { makh: { contains: searchParam.subtitle, mode: 'insensitive' } },
          { email: { contains: searchParam.subtitle, mode: 'insensitive' } },
          { sdt: { contains: searchParam.subtitle, mode: 'insensitive' } }
        ];
      }

      if (searchParam.loaikh) {
        where.loaikh = searchParam.loaikh;
      }

      if (searchParam.banggiaId) {
        where.banggiaId = searchParam.banggiaId;
      }

      // Ordering không pagination - lấy tất cả
      const orderBy = { createdAt: 'desc' };

      // Fetch tất cả data với GraphQL (không skip/take)
      const result = await this._GraphqlService.findMany('khachhang', {
        where,
        orderBy,
        select
      });

      const totalCount = result?.length || 0;
      
      // Update signals với toàn bộ data
      this.ListKhachhang.set(result || []);
      this.total.set(totalCount);
      this.totalPages.set(1); // Chỉ có 1 trang vì load tất cả
      this.page.set(1); // Reset về trang 1

      return result;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khách hàng:', error);
      this.error.set('Không thể tải danh sách khách hàng');
      this._ErrorLogService.logError('getAllKhachhang', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Tìm kiếm khách hàng (không pagination)
   */
  async getKhachhangBy(searchParam: any) {
    try {
      // Không reset trang vì không có pagination
      return await this.getAllKhachhang(searchParam);
    } catch (error) {
      console.error('Lỗi tìm kiếm khách hàng:', error);
      throw error;
    }
  }

  /**
   * Lấy chi tiết khách hàng với đầy đủ thông tin liên quan
   */
  async getKhachhangById(id: string) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Detailed select với tất cả relations cần thiết
      const include = {
        banggia: {
          select: {
            id: true,
            title: true,
            mabanggia: true,
            type: true,
            status: true
          }
        }
      };
      const khachhang = await this._GraphqlService.findUnique('khachhang', 
        { id },
        { include }
      );
      console.log(khachhang);

      if (khachhang) {
        this.DetailKhachhang.set(khachhang);
        this.setKhachhangId(id);
      }

      return khachhang;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết khách hàng:', error);
      this.error.set('Không thể tải thông tin khách hàng');
      this._ErrorLogService.logError('getKhachhangById', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Tạo khách hàng mới với GraphQL
   */
  async createKhachhang(dulieu: any) {
    try {
      this.loading.set(true);
      this.error.set(null);

      const createData = {
        makh: dulieu.makh || this.generateMaKhachHang(),
        subtitle: dulieu.subtitle || '',
        tenfile: dulieu.tenfile || '',
        name: dulieu.name,
        diachi: dulieu.diachi || '',
        quan: dulieu.quan || '',
        email: dulieu.email || '',
        sdt: dulieu.sdt || '',
        mst: dulieu.mst || '',
        gionhanhang: dulieu.gionhanhang || '',
        loaikh: dulieu.loaikh || 'banle',
        ghichu: dulieu.ghichu || '',
        isActive: dulieu.isActive !== false,
        isshowvat: dulieu.isshowvat,
        hiengia: dulieu.hiengia,
        istitle2: dulieu.istitle2,
        banggiaId: dulieu.banggiaId || null
      };

      const include = {
        banggia: {
          select: {
            id: true,
            title: true,
            mabanggia: true
          }
        }
      };

      const newKhachhang = await this._GraphqlService.createOne('khachhang', createData, { include });
      
      this.khachhangId.set(newKhachhang.id);
      this.DetailKhachhang.set(newKhachhang);
      
      // Refresh list
      await this.getAllKhachhang();
      
      this._snackBar.open('Tạo khách hàng thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      return newKhachhang;
    } catch (error) {
      console.error('Lỗi tạo khách hàng:', error);
      this.error.set('Không thể tạo khách hàng');
      this._snackBar.open('Lỗi tạo khách hàng', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Cập nhật khách hàng với GraphQL
   */
  async updateKhachhang(id: string, dulieu: any) {
    try {
      this.loading.set(true);
      this.error.set(null);

      const updateData = {
        name: dulieu.name,
        subtitle: dulieu.subtitle,
        tenfile: dulieu.tenfile,
        diachi: dulieu.diachi,
        quan: dulieu.quan,
        email: dulieu.email,
        sdt: dulieu.sdt,
        mst: dulieu.mst,
        gionhanhang: dulieu.gionhanhang,
        loaikh: dulieu.loaikh,
        ghichu: dulieu.ghichu,
        isActive: dulieu.isActive,
        isshowvat: dulieu.isshowvat,
        hiengia: dulieu.hiengia,
        istitle2: dulieu.istitle2,
        banggiaId: dulieu.banggiaId
      };

      const include = {
        banggia: {
          select: {
            id: true,
            title: true,
            mabanggia: true
          }
        }
      };

      const updatedKhachhang = await this._GraphqlService.updateOne('khachhang', 
        { id },
        updateData,
        { include }
      );

      this.DetailKhachhang.set(updatedKhachhang);
      
      // Refresh list
      await this.getAllKhachhang();
      
      this._snackBar.open('Cập nhật khách hàng thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      return updatedKhachhang;
    } catch (error) {
      console.error('Lỗi cập nhật khách hàng:', error);
      this.error.set('Không thể cập nhật khách hàng');
      this._snackBar.open('Lỗi cập nhật khách hàng', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Xóa khách hàng với GraphQL
   */
  async deleteKhachhang(id: string) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Soft delete by setting isActive = false
      const deletedKhachhang = await this._GraphqlService.updateOne('khachhang', 
        { id }, 
        { isActive: false }
      );

      // Refresh list
      await this.getAllKhachhang();
      
      this._snackBar.open('Xóa khách hàng thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      return deletedKhachhang;
    } catch (error) {
      console.error('Lỗi xóa khách hàng:', error);
      this.error.set('Không thể xóa khách hàng');
      this._snackBar.open('Lỗi xóa khách hàng', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Import khách hàng với batch operation
   */
  async importKhachhang(dulieu: any[]) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Chuẩn bị data cho batch create
      const batchData = dulieu.map(item => ({
        makh: item.makh || this.generateMaKhachHang(),
        name: item.name,
        diachi: item.diachi || '',
        quan: item.quan || '',
        email: item.email || '',
        sdt: item.sdt || '',
        mst: item.mst || '',
        gionhanhang: item.gionhanhang || '',
        loaikh: item.loaikh || 'banle',
        ghichu: item.ghichu || '',
        isActive: item.isActive !== false,
        banggiaId: item.banggiaId || null
      }));

      const result = await this._GraphqlService.batchCreate('khachhang', batchData);
      
      // Refresh list
      await this.getAllKhachhang();
      
      this._snackBar.open(`Import thành công ${result.length} khách hàng`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      return result;
    } catch (error) {
      console.error('Lỗi import khách hàng:', error);
      this.error.set('Không thể import khách hàng');
      this._snackBar.open('Lỗi import khách hàng', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Thay đổi trang (không cần thiết vì đã bỏ pagination)
   * Giữ lại để tương thích với code cũ
   */
  async changePage(newPage: number, pageSize?: number) {
    // Không làm gì vì đã load tất cả data
    console.log('Pagination disabled - all data loaded');
    return this.ListKhachhang();
  }

  /**
   * Socket listener cho real-time updates
   */
  private listenKhachhangUpdates() {
    if (this.socket) {
      this.socket.on('khachhang:created', (data: any) => {
        const current = this.ListKhachhang();
        this.ListKhachhang.set([data, ...current]);
        this.total.set(this.total() + 1);
      });

      this.socket.on('khachhang:updated', (data: any) => {
        const current = this.ListKhachhang();
        const index = current.findIndex(item => item.id === data.id);
        if (index !== -1) {
          current[index] = data;
          this.ListKhachhang.set([...current]);
        }
        
        // Update detail if it's the same record
        if (this.khachhangId() === data.id) {
          this.DetailKhachhang.set(data);
        }
      });

      this.socket.on('khachhang:deleted', (data: any) => {
        const current = this.ListKhachhang();
        const filtered = current.filter(item => item.id !== data.id);
        this.ListKhachhang.set(filtered);
        this.total.set(this.total() - 1);
      });
    }
  }

  /**
   * Generate mã khách hàng tự động
   */
  private generateMaKhachHang(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `KH${timestamp}${random}`.toUpperCase();
  }

  /**
   * Lấy các mã đã được cập nhật (legacy support)
   */
  async getUpdatedCodeIds() {
    try {
      const result = await this._GraphqlService.findMany('khachhang', {
        where: { isActive: true },
        select: { id: true, makh: true },
        orderBy: { updatedAt: 'desc' },
        take: 100
      });
      return result;
    } catch (error) {
      console.error('Lỗi lấy updated code IDs:', error);
      return [];
    }
  }

  /**
   * Clear cache và reset state
   */
  clearCache() {
    this.ListKhachhang.set([]);
    this.DetailKhachhang.set({});
    this.khachhangId.set(null);
    this.error.set(null);
    this.page.set(1);
  }
}

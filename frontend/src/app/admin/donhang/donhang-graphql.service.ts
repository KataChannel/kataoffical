import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { GraphqlService } from '../../shared/services/graphql.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';
import { DonhangService } from './donhang.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DonhangGraphqlService {
  private _GraphqlService = inject(GraphqlService);
  private _StorageService = inject(StorageService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private _ErrorLogService = inject(ErrorLogService);
  private _sharedSocketService = inject(SharedSocketService);
  private _donhangService = inject(DonhangService);
  
  private socket: any;

  // Signals for reactive state management
  ListDonhang = signal<any[]>([]);
  ListVandon = signal<any[]>([]);
  DetailDonhang = signal<any>({});
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50);
  donhangId = signal<string | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.socket = this._sharedSocketService.getSocket();
    this.socket?.on('donhang:updated', (data: any) => {
      this.refreshDonhangData();
    });
  }

  setDonhangId(id: string | null) {
    this.donhangId.set(id);
    if (id) {
      this.getOneDonhang(id);
    }
  }

  /**
   * Tìm kiếm đơn hàng với GraphQL - tối ưu cho component vandon
   */
  async searchDonhang(searchParams: any) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Xây dựng where condition từ search params
      let where: any = {};

      // Filter theo ngày
      if (searchParams.Batdau && searchParams.Ketthuc) {
        where.ngaygiao = {
          gte: moment(searchParams.Batdau).startOf('day').toISOString(),
          lte: moment(searchParams.Ketthuc).endOf('day').toISOString()
        };
      }
      // Filter theo trạng thái nếu có
      if (searchParams.Status) {
        where.status = searchParams.Status;
      }

      // Lấy dữ liệu đơn hàng với GraphQL
      const result = await this._GraphqlService.findMany('donhang', {
        where,
        include: {
          khachhang: {
            select: {
              id: true,
              name: true,
              sdt: true,
              diachi: true
            }
          },
          sanpham: {
            select: {
              id: true,
              idSP: true,
              sldat: true,
              slgiao: true,
              slnhan: true,
              slhuy: true,
              ttdat: true,
              ttgiao: true,
              ttnhan: true,
              ghichu: true,
              order: true,
              isActive: true,
              giaban: true,
              ttsauvat: true,
              vat: true,
              sanpham: {
                select: {
                  id: true,
                  masp: true,
                  title: true,
                  giagoc: true,
                  dvt: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: searchParams.pageSize || 9999
      });

      this.ListDonhang.set(result || []);
      
      // Tạo danh sách vận đơn flatten từ đơn hàng
      const vandonList = this.createVandonList(result || []);
      this.ListVandon.set(vandonList);

      this.loading.set(false);
      return result;

    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải dữ liệu đơn hàng');
      this.loading.set(false);
      
      await this._ErrorLogService.logError(
        `Lỗi tìm kiếm đơn hàng GraphQL: ${error.message || error}`
      );

      throw error;
    }
  }

  /**
   * Tạo danh sách vận đơn từ đơn hàng
   */
  private createVandonList(donhangList: any[]): any[] {
    return donhangList.flatMap((item: any, index: any) =>
      (item.sanpham || []).map((v: any) => ({
        // Dữ liệu từ Donhangsanpham
        id: v.id,
        idSP: v.idSP,
        sldat: v.sldat,
        slgiao: v.slgiao,
        slnhan: v.slnhan,
        slhuy: v.slhuy,
        ttdat: v.ttdat,
        ttgiao: v.ttgiao,
        ttnhan: v.ttnhan,
        ghichu: v.ghichu,
        order: v.order,
        isActive: v.isActive,
        giaban: v.giaban,
        ttsauvat: v.ttsauvat,
        vat: v.vat,
        
        // Dữ liệu từ Sanpham (nested relation)
        masp: v.sanpham?.masp,
        title: v.sanpham?.title,
        giagoc: v.sanpham?.giagoc,
        dvt: v.sanpham?.dvt,
        
        // Dữ liệu từ Donhang
        madonhang: item.madonhang,
        khachhang: item.khachhang?.name,
        sdt: item.khachhang?.sdt,
        diachi: item.khachhang?.diachi,
        createdAt: item.createdAt,
        ngaygiao: item.ngaygiao,
        status: item.status,
      }))
    ).map((v: any, i: any) => ({ ...v, stt: i + 1 }));
  }

  /**
   * Lấy chi tiết một đơn hàng
   */
  async getOneDonhang(id: string) {
    try {
      this.loading.set(true);
      this.error.set(null);

      const result = await this._GraphqlService.findUnique('donhang', {
        id
      }, {
        include: {
          khachhang: {
            select: {
              id: true,
              name: true,
              sdt: true,
              diachi: true,
              email: true
            }
          },
          sanpham: {
            select: {
              id: true,
              idSP: true,
              sldat: true,
              slgiao: true,
              slnhan: true,
              slhuy: true,
              ttdat: true,
              ttgiao: true,
              ttnhan: true,
              ghichu: true,
              order: true,
              isActive: true,
              giaban: true,
              ttsauvat: true,
              vat: true,
              sanpham: {
                select: {
                  id: true,
                  masp: true,
                  title: true,
                  giagoc: true,
                  dvt: true
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      });

      this.DetailDonhang.set(result || {});
      this.loading.set(false);
      return result;

    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tải chi tiết đơn hàng');
      this.loading.set(false);
      
      await this._ErrorLogService.logError(
        `Lỗi lấy chi tiết đơn hàng GraphQL: ${error.message || error}`
      );

      throw error;
    }
  }

  /**
   * Tạo đơn hàng mới
   */
  async CreateDonhang(dulieu: any) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Chuẩn bị data cho GraphQL mutation
      const createData = {
        madonhang: dulieu.madonhang || this.generateMaDonhang(),
        status: dulieu.status || 'dadat',
        tongtien: dulieu.tongtien || 0,
        khachhangId: dulieu.khachhangId,
        ngaygiao: dulieu.ngaygiao ? new Date(dulieu.ngaygiao).toISOString() : null,
        ghichu: dulieu.ghichu || '',
        order: dulieu.order || 1,
        isActive: dulieu.isActive !== undefined ? dulieu.isActive : true
      };

      const result = await this._GraphqlService.createOne('donhang', createData);

      // Cập nhật danh sách
      await this.refreshDonhangData();
      
      this._snackBar.open('Tạo đơn hàng thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

      this.loading.set(false);
      return result;

    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tạo đơn hàng');
      this.loading.set(false);
      
      await this._ErrorLogService.logError(
        `Lỗi tạo đơn hàng GraphQL: ${error.message || error}`
      );

      this._snackBar.open('Lỗi khi tạo đơn hàng: ' + error.message, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      throw error;
    }
  }

  /**
   * Cập nhật đơn hàng
   */
  async updateDonhang(dulieu: any) {
    try {
      this.loading.set(true);
      this.error.set(null);

      const updateData = {
        madonhang: dulieu.madonhang,
        status: dulieu.status,
        tongtien: dulieu.tongtien,
        khachhangId: dulieu.khachhangId,
        ngaygiao: dulieu.ngaygiao ? new Date(dulieu.ngaygiao).toISOString() : null,
        ghichu: dulieu.ghichu,
        order: dulieu.order,
        isActive: dulieu.isActive
      };

      const result = await this._GraphqlService.updateOne('donhang', { id: dulieu.id }, updateData);

      // Cập nhật danh sách
      await this.refreshDonhangData();
      
      this._snackBar.open('Cập nhật đơn hàng thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

      this.loading.set(false);
      return result;

    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi cập nhật đơn hàng');
      this.loading.set(false);
      
      await this._ErrorLogService.logError(
        `Lỗi cập nhật đơn hàng GraphQL: ${error.message || error}`
      );

      this._snackBar.open('Lỗi khi cập nhật đơn hàng: ' + error.message, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      throw error;
    }
  }

  /**
   * Xóa đơn hàng
   */
  async deleteDonhang(id: string) {
    try {
      this.loading.set(true);
      this.error.set(null);

      await this._GraphqlService.deleteOne('donhang', { id });

      // Cập nhật danh sách
      await this.refreshDonhangData();
      
      this._snackBar.open('Xóa đơn hàng thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

      this.loading.set(false);

    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi xóa đơn hàng');
      this.loading.set(false);
      
      await this._ErrorLogService.logError(
        `Lỗi xóa đơn hàng GraphQL: ${error.message || error}`
      );

      this._snackBar.open('Lỗi khi xóa đơn hàng: ' + error.message, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      throw error;
    }
  }

  /**
   * Làm mới dữ liệu đơn hàng
   */
  private async refreshDonhangData() {
    const currentList = this.ListDonhang();
    if (currentList.length > 0) {
      // Sử dụng lại search params cuối cùng để làm mới
      await this.searchDonhang({
        pageSize: 9999
      });
    }
  }

  /**
   * Tạo mã đơn hàng tự động
   */
  private generateMaDonhang(): string {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `DH${timestamp}${random}`;
  }

  /**
   * Xuất Excel danh sách vận đơn và phiếu chuyển
   */
  async exportVandonToExcel(data?: any[]) {
    try {
      const vandonData = data || this.ListVandon();
      
      // Lấy dữ liệu phiếu chuyển từ DonhangService
      const phieuchuyenData = this._donhangService.ListDonhang();
      
      if (vandonData.length === 0 && phieuchuyenData.length === 0) {
        this._snackBar.open('Không có dữ liệu để xuất', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning']
        });
        return;
      }

      // Chuẩn bị dữ liệu xuất Excel cho vận đơn - Chỉ các trường cần thiết
      const vandonExcelData = vandonData.map((item: any, index: number) => ({
        'STT': index + 1,
        'Mã Đơn Hàng': item.madonhang || '',
        'Khách Hàng': item.khachhang || '',
        'Tên Sản Phẩm': item.title || '',
        'Đơn Vị Tính': item.dvt || '',
        'SL Đặt': Number(item.sldat) || 0,
        'SL Giao': Number(item.slgiao) || 0,
        'SL Nhận': Number(item.slnhan) || 0,
        'Ngày Giao': item.ngaygiao ? new Date(item.ngaygiao).toLocaleDateString('vi-VN') : '',
        'Trạng Thái': this.getStatusLabel(item.status) || ''
      }));

      // Chuẩn bị dữ liệu xuất Excel cho phiếu chuyển
      const phieuchuyenExcelData = phieuchuyenData.map((item: any, index: number) => ({
        'STT': index + 1,
        'Ngày Giao': item.ngaygiao ? new Date(item.ngaygiao).toLocaleString('vi-VN') : '',
        'Tên Khách Hàng': item.name || '',
        'Số Lượng': item.soluongtt || 0,
        'Chuyến': item.chuyen || '',
        'Địa Chỉ': item.diachi || '',
        'Liên Hệ': '',
        'Số Điện Thoại': item.sdt || '',
        'Giờ Nhận Hàng': item.gionhanhang || '',
        'Tổng Số Món': item.tongsomon || 0,
        'Số Lượng TT': item.loadpoint || 0,
        'Shipper': item.shipper || '',
        'Giờ Đi': item.giodi || '',
        'Giờ Về': item.giove || '',
        'Ký Nhận': item.kynhan || '',
        // 'Trạng Thái': this.getStatusLabel(item.status) || ''
      }));

      // Import dynamic để tránh bundle size
      const { writeExcelFileSheets } = await import('../../shared/utils/exceldrive.utils');
      const fileName = `VanDon_PhieuChuyen_${new Date().toISOString().slice(0, 10)}`;
      
      // Tạo Excel với 2 sheets - format đúng theo interface
      const sheets = {
        'Vận Đơn': {
          data: vandonExcelData
        },
        'Phiếu Chuyển': {
          data: phieuchuyenExcelData
        }
      };
      
      writeExcelFileSheets(sheets, fileName);
      
      this._snackBar.open('Xuất Excel thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

    } catch (error: any) {
      await this._ErrorLogService.logError(
        `Lỗi xuất Excel vận đơn: ${error.message || error}`
      );

      this._snackBar.open('Lỗi khi xuất Excel: ' + error.message, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  }

  /**
   * Lấy nhãn trạng thái đơn hàng
   */
  private getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'dadat': 'Đã Đặt',
      'dagiao': 'Đã Giao',
      'danhan': 'Đã Nhận',
      'hoanthanh': 'Hoàn Thành',
      'huy': 'Hủy'
    };
    return statusMap[status] || status;
  }

  /**
   * Lấy thống kê đơn hàng
   */
  async getStatistics(searchParams?: any): Promise<any> {
    try {
      let where: any = {};

      if (searchParams?.Batdau && searchParams?.Ketthuc) {
        where.createdAt = {
          gte: new Date(searchParams.Batdau).toISOString(),
          lte: new Date(searchParams.Ketthuc).toISOString()
        };
      }

      const totalResult = await this._GraphqlService.findMany('donhang', {
        where,
        select: { id: true }
      });

      const completedResult = await this._GraphqlService.findMany('donhang', {
        where: { ...where, status: 'hoanthanh' },
        select: { id: true }
      });

      const cancelledResult = await this._GraphqlService.findMany('donhang', {
        where: { ...where, status: 'huy' },
        select: { id: true }
      });

      return {
        total: totalResult?.length || 0,
        completed: completedResult?.length || 0,
        cancelled: cancelledResult?.length || 0,
        pending: (totalResult?.length || 0) - (completedResult?.length || 0) - (cancelledResult?.length || 0)
      };

    } catch (error: any) {
      console.error('Error getting statistics:', error);
      return {
        total: 0,
        completed: 0,
        cancelled: 0,
        pending: 0
      };
    }
  }

  /**
   * Tìm kiếm nhanh đơn hàng
   */
  async quickSearch(searchTerm: string) {
    try {
      this.loading.set(true);

      const result = await this._GraphqlService.findMany('donhang', {
        where: {
          OR: [
            { madonhang: { contains: searchTerm, mode: 'insensitive' } },
            { khachhang: { name: { contains: searchTerm, mode: 'insensitive' } } },
            { khachhang: { sdt: { contains: searchTerm } } }
          ]
        },
        include: {
          khachhang: {
            select: {
              id: true,
              name: true,
              sdt: true,
              diachi: true
            }
          },
          sanpham: {
            select: {
              id: true,
              idSP: true,
              sldat: true,
              slgiao: true,
              slnhan: true,
              slhuy: true,
              ttdat: true,
              ttgiao: true,
              ttnhan: true,
              ghichu: true,
              order: true,
              isActive: true,
              giaban: true,
              ttsauvat: true,
              vat: true,
              sanpham: {
                select: {
                  id: true,
                  masp: true,
                  title: true,
                  giagoc: true,
                  dvt: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 100
      });

      this.ListDonhang.set(result || []);
      
      // Tạo danh sách vận đơn
      const vandonList = this.createVandonList(result || []);
      this.ListVandon.set(vandonList);

      this.loading.set(false);
      return result;

    } catch (error: any) {
      this.error.set(error.message || 'Lỗi khi tìm kiếm');
      this.loading.set(false);
      throw error;
    }
  }
}

import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { GraphqlService } from '../../shared/services/graphql.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';
import { DonhangService } from './donhang.service';
import { NhanvienService } from '../nhanvien/nhanvien.service';
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
  private _NhanvienService = inject(NhanvienService);
  
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
  lastSearchParams: any = {};

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
      this.lastSearchParams = searchParams;
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
        select: {
          id: true,
          madonhang: true,
          status: true,
          ngaygiao: true,
          ghichu: true,
          shipper: true,
          phieuve: true,
          giodi: true,
          giove: true,
          kynhan: true,
          khachhangId: true,
          banggiaId: true,
          createdAt: true,
          khachhang: {
            select: {
              id: true,
              name: true,
              sdt: true,
              diachi: true,
              machuyen: true,
              gionhanhang: true,
              nhomkhachhang: {
                select: {
                  id: true,
                  name: true
                }
              }
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
        
        // Dữ liệu phiếu chuyển
        shipper: item.shipper,
        phieuve: item.phieuve,
        giodi: item.giodi,
        giove: item.giove,
        kynhan: item.kynhan,
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
   * Xuất Excel danh sách vận đơn và phiếu chuyển (3 sheet: Vận đơn + Hàng Siêu Thị + Phiếu Chuyển)
   * Theo yêu cầu đặc thù cho nhóm SIÊU THỊ (30128727-7c5c-43c0-bc4b-0da5c6db0141)
   */
  async exportVandonToExcel(data?: any[]) {
    try {
      // Nhóm Siêu Thị ID từ tài liệu yêu cầu
      const GROUP_SIEU_THI_ID = '30128727-7c5c-43c0-bc4b-0da5c6db0141';
      const rawDonhangList = this.ListDonhang();
      
      if (!rawDonhangList || rawDonhangList.length === 0) {
        this._snackBar.open('Không có dữ liệu để xuất (Vui lòng Nhấn Tìm Kiếm trước)', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning']
        });
        return;
      }

      // 1. FILTER: Lấy tất cả đơn hàng KHÔNG HỦY cho Vận Đơn & Phiếu Chuyển
      const allActiveOrders = rawDonhangList.filter((order: any) => order.status !== 'huy');

      if (allActiveOrders.length === 0) {
        this._snackBar.open('Không có đơn hàng nào hợp lệ (tất cả đã hủy)', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning']
        });
        return;
      }

      // 2. FILTER RIÊNG: Chỉ lấy nhóm SIÊU THỊ cho sheet HÀNG ST
      const sieuThiOrders = allActiveOrders.filter((order: any) => 
        order.khachhang?.nhomkhachhang?.some(
          (nhom: any) => nhom.id === GROUP_SIEU_THI_ID || nhom.name?.toLowerCase().includes('siêu thị')
        )
      );

      // Lấy danh sách nhân viên để mapping shipper theo machuyen (nếu cần)
      let nhanvienList: any[] = [];
      try {
        const nhanvienResponse = await this._NhanvienService.getAllNhanvien({ limit: 9999 });
        nhanvienList = nhanvienResponse.data || [];
      } catch (error) {
        console.warn('Không thể lấy danh sách nhân viên:', error);
      }

      const dateStr = moment(this.lastSearchParams?.Batdau || new Date()).format('DD/MM/YYYY');
      const fileName = `VanDon_TongHop_${moment(this.lastSearchParams?.Batdau || new Date()).format('DD-MM-YYYY')}`;

      // --- SHEET 1: VẬN ĐƠN (Tất cả đơn hàng) ---
      const vandonSheetData = allActiveOrders.flatMap((order: any) => 
        (order.sanpham || []).map((sp: any) => ({
          'STT': '',
          'Mã Đơn Hàng': order.madonhang || '',
          'Khách Hàng': order.khachhang?.name || '',
          'Tên Sản Phẩm': sp.sanpham?.title || '',
          'Đơn Vị Tính': sp.sanpham?.dvt || '',
          'SL Đặt': Number(sp.sldat) || 0,
          'SL Giao': Number(sp.slgiao) || 0,
          'SL Nhận': Number(sp.slnhan) || 0,
          'Ngày Giao': order.ngaygiao ? moment(order.ngaygiao).format('D/M/YYYY') : dateStr,
          'Trạng Thái': this.getStatusLabel(order.status)
        }))
      ).map((v, i) => ({ ...v, 'STT': i + 1 }));

      // --- SHEET 2: HÀNG ST (Chỉ nhóm Siêu Thị) ---
      const hangSieuThiAOA: any[][] = [
        ["BẢNG SẢN PHẨM HÀNG ĐÓNG GÓI SIÊU THỊ", "", "", "", "", "", "", "", "", "", "", ""],
        ["tên khách hàng", "sản phẩm", "DVT", "KL", "", "mã KH", "", "", "", "", "", ""]
      ];
      
      sieuThiOrders.forEach((order: any) => {
        (order.sanpham || []).forEach((sp: any) => {
          if (!sp.isActive) return;
          const slGiao = Number(sp.slgiao || sp.sldat) || 0;
          hangSieuThiAOA.push([
            order.khachhang?.name || '',
            sp.sanpham?.title || '',
            sp.sanpham?.dvt || '',
            slGiao,
            order.ngaygiao ? moment(order.ngaygiao).format('D/M/YYYY') : dateStr,
            'st'
          ]);
        });
      });

      // --- SHEET 3: PHIẾU CHUYẾN (Tất cả đơn hàng) ---
      const phieuChuyenSheetData = allActiveOrders.map((order: any, index: number) => {
        const activeProducts = (order.sanpham || []).filter((sp: any) => sp.isActive);
        const totalItems = activeProducts.length;
        
        // Số Lượng = Tổng SL Đặt
        const totalQty = activeProducts.reduce((sum: number, sp: any) => sum + (Number(sp.sldat) || 0), 0);
        
        // Số Lượng TT = Tổng SL Giao (Thực Tế bốc đi)
        const totalQtyTT = activeProducts.reduce((sum: number, sp: any) => sum + (Number(sp.slgiao || sp.sldat) || 0), 0);
        
        // Nếu shipper rỗng, thử tìm trong nhanvienList theo machuyen
        let shipperName = order.shipper || '';
        if (!shipperName && order.khachhang?.machuyen && nhanvienList.length > 0) {
          const nv = nhanvienList.find(n => 
            n.maNV === order.khachhang.machuyen || 
            n.maLamViec === order.khachhang.machuyen
          );
          if (nv) shipperName = nv.hoTen;
        }

        return {
          'STT': index + 1,
          'Mã Đơn Hàng': order.madonhang || '',
          'Ngày Giao': order.ngaygiao ? moment(order.ngaygiao).format('HH:mm:ss DD/MM/YYYY') : `07:00:00 ${dateStr}`,
          'Tên Khách Hàng': order.khachhang?.name || '',
          'Số Lượng': totalQty,
          'Mã Chuyến': order.khachhang?.machuyen || '',
          'Địa Chỉ': order.khachhang?.diachi || '',
          'Liên Hệ': '', 
          'Số Điện Thoại': order.khachhang?.sdt || '',
          'Giờ Nhận Hàng': order.khachhang?.gionhanhang || '',
          'Tổng Số Món': totalItems,
          'Số Lượng TT': totalQtyTT,
          'Shipper': shipperName,
          'Phiếu Về': order.phieuve || '',
          'Giờ Đi': order.giodi || '',
          'Giờ Về': order.giove || '',
          'Ký Nhận': order.kynhan || ''
        };
      });

      // Import dynamic để tránh bundle size
      const { writeExcelFileSheets } = await import('../../shared/utils/exceldrive.utils');
      
      const sheets = {
        'Vận Đơn': { data: vandonSheetData },
        'HÀNG ST': { data: hangSieuThiAOA },
        'Phiếu Chuyển': { data: phieuChuyenSheetData }
      };
      
      writeExcelFileSheets(sheets, fileName);

      this._snackBar.open('Xuất Excel thành công (3 sheet)', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

    } catch (error: any) {
      await this._ErrorLogService.logError(`Lỗi xuất Excel vận đơn siêu thị: ${error.message || error}`);
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
   * Import Excel dữ liệu phiếu chuyển để cập nhật shipper, phieuve, giodi, giove, kynhan
   */
  async importPhieuChuyenFromExcel(excelData: any[]): Promise<{ success: number; error: number; total: number }> {
    try {
      this.loading.set(true);
      this.error.set(null);

      let successCount = 0;
      let errorCount = 0;
      const errors: string[] = [];
      const total = excelData.length;

      console.log(`[IMPORT] Bắt đầu import ${total} dòng...`);

      // Show initial progress
      this._snackBar.open(`⏳ Đang xử lý 0/${total}...`, '', {
        duration: undefined,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info']
      });

      for (let i = 0; i < excelData.length; i++) {
        const row = excelData[i];
        
        // Update progress every 10 rows or at milestones
        if (i % 10 === 0 || i === total - 1) {
          const progress = Math.round(((i + 1) / total) * 100);
          this._snackBar.open(`⏳ Đang xử lý ${i + 1}/${total} (${progress}%)...`, '', {
            duration: undefined,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-info']
          });
        }

        try {
          const madonhang = row['Mã Đơn Hàng']?.toString().trim();
          
          if (!madonhang) {
            console.warn(`[IMPORT] Dòng ${i + 1}: Bỏ qua - không có mã đơn hàng`);
            continue;
          }

          const donhang = await this._GraphqlService.findFirst('donhang', {
            where: { madonhang },
            include: {
              khachhang: {
                select: { id: true, makh: true }
              }
            }
          });

          if (!donhang) {
            errors.push(`${madonhang}: Không tìm thấy`);
            errorCount++;
            continue;
          }

          const updateData: any = {};
          
          if (row['Shipper']) updateData.shipper = row['Shipper'].toString().trim();
          if (row['Phiếu Về']) updateData.phieuve = row['Phiếu Về'].toString().trim();
          if (row['Giờ Đi']) updateData.giodi = row['Giờ Đi'].toString().trim();
          if (row['Giờ Về']) updateData.giove = row['Giờ Về'].toString().trim();
          if (row['Ký Nhận']) updateData.kynhan = row['Ký Nhận'].toString().trim();

          // Update donhang if needed
          if (Object.keys(updateData).length > 0) {
            await this._GraphqlService.updateOne('donhang', { id: donhang.id }, updateData);
            successCount++;
          }

          // Update machuyen to khachhang if provided
          if (row['Mã Chuyến'] && donhang.khachhang?.id) {
            const machuyen = row['Mã Chuyến'].toString().trim();
            await this._GraphqlService.updateOne('khachhang', 
              { id: donhang.khachhang.id }, 
              { machuyen }
            );
            console.log(`[IMPORT] Updated machuyen: ${machuyen} for khachhang: ${donhang.khachhang.makh}`);
          }

        } catch (rowError: any) {
          const rowNum = row['STT'] || i + 1;
          errors.push(`Dòng ${rowNum}: ${rowError.message}`);
          errorCount++;
        }
      }

      // Invalidate cache
      console.log('[IMPORT] Đang xóa cache...');
      const token = this._StorageService.getItem('token');
      if (token) {
        await fetch(`${environment.APIURL}/cache/invalidate/donhang`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }

      // Refresh data
      console.log('[IMPORT] Đang làm mới dữ liệu...');
      await this.refreshDonhangData();

      this.loading.set(false);

      // Show compact result
      const icon = errorCount > 0 ? '⚠️' : '✅';
      const message = errorCount > 0 
        ? `${icon} ${successCount} thành công, ${errorCount} lỗi`
        : `${icon} Import thành công ${successCount} đơn hàng`;

      this._snackBar.open(message, 'Đóng', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: errorCount > 0 ? ['snackbar-warning'] : ['snackbar-success']
      });

      // Log errors if any
      if (errors.length > 0) {
        console.warn('[IMPORT] Lỗi:', errors.slice(0, 10));
        if (errors.length > 10) {
          console.warn(`[IMPORT] ... và ${errors.length - 10} lỗi khác`);
        }
      }

      return { success: successCount, error: errorCount, total };

    } catch (error: any) {
      this.error.set(error.message || 'Lỗi import');
      this.loading.set(false);

      await this._ErrorLogService.logError(`Import error: ${error.message || error}`);

      this._snackBar.open(`❌ ${error.message}`, 'Đóng', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      throw error;
    }
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

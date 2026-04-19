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
import { TimezoneService } from '../../shared/services/timezone.service';
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
  private _DonhangService = inject(DonhangService);
  private _NhanvienService = inject(NhanvienService);
  private _timezoneService = inject(TimezoneService);
  
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
        include: {
          khachhang: {
            select: {
              id: true,
              name: true,
              sdt: true,
              diachi: true,
              machuyen: true,
              loaikh: true,
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
              ttsauvat: true,
              vat: true,
              sanpham: {
                select: {
                  id: true,
                  masp: true,
                  title: true,
                  giagoc: true,
                  dvt: true,
                  loadpoint: true
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
  async exportVandonToExcel(data?: any[], filterMaSPs?: string[]) {
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
      let allActiveOrders = rawDonhangList.filter((order: any) => order.status !== 'huy');

      // 🔥 LỌC THEO MÃ SẢN PHẨM (Nếu có truyền vào list mã)
      if (filterMaSPs && filterMaSPs.length > 0) {
        allActiveOrders = allActiveOrders.map(order => ({
          ...order,
          sanpham: (order.sanpham || []).filter((sp: any) => 
            filterMaSPs.includes(sp.sanpham?.masp)
          )
        })).filter(order => order.sanpham.length > 0);
      }

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

      // 3. FILTER RIÊNG: Chỉ lấy nhóm KHÁCH LẺ cho sheet KHÁCH LẺ
      const khachLeOrders = allActiveOrders.filter((order: any) => 
        order.khachhang?.loaikh?.toLowerCase().includes('lẻ')
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
        ["BẢNG SẢN PHẨM HÀNG ĐÓNG GÓI SIÊU THỊ", "", "", "", "", ""],
        ["tên khách hàng", "sản phẩm", "DVT", "KL", "Ngày Giao", "Trạng Thái"]
      ];
      
      sieuThiOrders.forEach((order: any) => {
        (order.sanpham || []).forEach((sp: any) => {
          // Bỏ qua filter isActive
          const slGiao = Number(sp.slgiao || sp.sldat) || 0;
          hangSieuThiAOA.push([
            order.khachhang?.name || '',
            sp.sanpham?.title || '',
            sp.sanpham?.dvt || '',
            slGiao,
            order.ngaygiao ? moment(order.ngaygiao).format('D/M/YYYY') : dateStr,
            this.getStatusLabel(order.status)
          ]);
        });
      });

      // --- NEW SHEET: TH Hàng ST (Aggregated by Product) ---
      const thHangSieuThiMap = new Map<string, { title: string, dvt: string, qty: number }>();
      sieuThiOrders.forEach((order: any) => {
        (order.sanpham || []).forEach((sp: any) => {
          // Bỏ qua filter isActive
          const title = sp.sanpham?.title || 'Unknown';
          const slGiao = Number(sp.slgiao || sp.sldat) || 0;
          const existing = thHangSieuThiMap.get(title);
          if (existing) {
            existing.qty += slGiao;
          } else {
            thHangSieuThiMap.set(title, {
              title,
              dvt: sp.sanpham?.dvt || '',
              qty: slGiao
            });
          }
        });
      });

      const thHangSieuThiAOA: any[][] = [
        ["TỔNG HỢP HÀNG SIÊU THỊ ĐÓNG GÓI", "", "", ""],
        ["sản phẩm", "DVT", "KL", "Ghi chú"]
      ];
      Array.from(thHangSieuThiMap.values())
        .sort((a, b) => a.title.localeCompare(b.title))
        .forEach(item => {
          thHangSieuThiAOA.push([item.title, item.dvt, item.qty, ""]);
        });

      // --- SHEET 3: KHÁCH LẺ (Loại Khách Hàng = Lẻ) ---
      const hangKhachLeAOA: any[][] = [
        ["BẢNG SẢN PHẨM HÀNG KHÁCH LẺ", "", "", "", "", ""],
        ["tên khách hàng", "sản phẩm", "DVT", "KL", "Ngày Giao", "Trạng Thái"]
      ];
      
      khachLeOrders.forEach((order: any) => {
        (order.sanpham || []).forEach((sp: any) => {
          // Bỏ qua filter isActive
          const slGiao = Number(sp.slgiao || sp.sldat) || 0;
          hangKhachLeAOA.push([
            order.khachhang?.name || '',
            sp.sanpham?.title || '',
            sp.sanpham?.dvt || '',
            slGiao,
            order.ngaygiao ? moment(order.ngaygiao).format('D/M/YYYY') : dateStr,
            this.getStatusLabel(order.status)
          ]);
        });
      });

      // --- SHEET 4: PHIẾU CHUYẾN (Tất cả đơn hàng) ---
      const phieuChuyenSheetData = allActiveOrders.map((order: any, index: number) => {
        const activeProducts = (order.sanpham || []); // Không filter isActive để đảm bảo có số liệu
        const totalItems = activeProducts.length;
        
        // Số Lượng = Tổng SL Đặt
        const totalQty = activeProducts.reduce((sum: number, sp: any) => sum + (Number(sp.sldat) || 0), 0);
        
        // Số Lượng TT = Tổng SL Giao (Thực Tế bốc đi) - Ưu tiên slgiao, fallback sldat nếu slgiao chưa nhập (null/undefined)
        const totalQtyTT = activeProducts.reduce((sum: number, sp: any) => {
          const slActual = (sp.slgiao !== undefined && sp.slgiao !== null && sp.slgiao !== '') ? Number(sp.slgiao) : Number(sp.sldat);
          return sum + (slActual || 0);
        }, 0);
        
        // Trọng Tải = Tổng (loadpoint sản phẩm × SL Đặt)
        const totalLoadpoint = parseFloat(activeProducts.reduce((sum: number, sp: any) => sum + (Number(sp.sanpham?.loadpoint || 0) * Number(sp.sldat || 0)), 0).toFixed(3));
        
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
          'Số Lượng TT': totalQtyTT,
          'Trọng Tải': totalLoadpoint,
          'Mã Chuyến': order.khachhang?.machuyen || '',
          'Địa Chỉ': order.khachhang?.diachi || '',
          'Liên Hệ': '', 
          'Số Điện Thoại': order.khachhang?.sdt || '',
          'Giờ Nhận Hàng': order.khachhang?.gionhanhang || '',
          'Tổng Số Món': totalItems,
          'Shipper': shipperName,
          'Phiếu Về': order.phieuve || '',
          'Giờ Đi': order.giodi || '',
          'Giờ Về': order.giove || '',
          'Ký Nhận': order.kynhan || ''
        };
      });

      // --- NEW SHEET: TỔNG HỢP (Aggregated from Nhu Cau Dat Hang) ---
      let tonghopSheetData: any[] = [];
      try {
        // Use the same date range as the search to fetch aggregate data
        let startDate: string;
        let endDate: string;

        if (this.lastSearchParams?.Batdau && this.lastSearchParams?.Ketthuc) {
          const range = this._timezoneService.getAPIDateRange(
            this.lastSearchParams.Batdau,
            this.lastSearchParams.Ketthuc
          );
          startDate = range.Batdau;
          endDate = range.Ketthuc;
        } else {
          const today = new Date();
          const range = this._timezoneService.getAPIDateRange(today, today);
          startDate = range.Batdau;
          endDate = range.Ketthuc;
        }

        const response = await this._GraphqlService.getNhuCauDatHang(startDate, endDate, true);
        const rawAggregated = response || [];

        // Define warehouses for mapping
        const warehouses = [
          { value: 'kho1', label: 'TG-LONG AN', makho: 'TG-LA' },
          { value: 'kho2', label: 'Bổ Sung', makho: 'TG-BS' },
          { value: 'kho3', label: 'TG-ĐÀ LẠT', makho: 'TG-ĐL' },
          { value: 'kho4', label: 'KHO TỔNG - HCM', makho: 'TG-HCM' },
          { value: 'kho5', label: 'SG1', makho: 'TG-SG1' },
          { value: 'kho6', label: 'SG2', makho: 'TG-SG2' },
        ];

        // Process data using Reliable Stock formula
        const processedAggregated = (rawAggregated.data || []).map((item: any) => {
          const lastCountTime = item.updatedAt ? new Date(item.updatedAt).getTime() : 0;

          // 1. Nhập mới sau chốt
          const receivedAfterCount = (item.Dathangs || [])
            .filter((dh: any) => dh.status === 'danhan' && dh.updatedAt && new Date(dh.updatedAt).getTime() > lastCountTime)
            .reduce((sum: number, dh: any) => sum + (Number(dh.slnhan) || 0), 0);

          // 2. Xuất mới sau chốt
          const deliveredAfterCount = (item.Donhangs || [])
            .filter((dh: any) => (dh.status === 'dagiao' || dh.status === 'danhan' || dh.status === 'hoanthanh') &&
              dh.updatedAt && new Date(dh.updatedAt).getTime() > lastCountTime)
            .reduce((sum: number, dh: any) => sum + (Number(dh.slnhan) || 0), 0);

          // 3. Đang về từ NCC
          const khoValues: any = {};
          warehouses.forEach(w => khoValues[w.value] = 0);
          if (item.Dathangs) {
            item.Dathangs.forEach((dh: any) => {
              const w = warehouses.find(kho => kho.makho === dh.makho);
              if (w) khoValues[w.value] += (Number(dh.sldat) || 0);
            });
          }

          const incomingStock = Object.values(khoValues).reduce((sum: any, val: any) => sum + val, 0) as number;

          // formula: Tồn chốt + Biến động + Đang về
          const tongkho = parseFloat((Number(item.sltontt || 0) + receivedAfterCount - deliveredAfterCount + incomingStock).toFixed(3));
          
          // khachdat & khachgiao logic from backended pre-aggregated fields
          const khachdat = Number(item.khachdat) || 0;
          const khachgiao = Number(item.khachgiao) || 0;

          const goiy = parseFloat((khachdat + khachgiao - tongkho).toFixed(3));
          const slhaohut = khachdat > 0 ? parseFloat(((khachdat * (item.haohut || 0)) / 100).toFixed(3)) : 0;

          return {
            ngaynhan: item.Dathangs && item.Dathangs.length > 0 ? moment(item.Dathangs[0].ngaynhan).format('YYYY-MM-DD') : '',
            mancc: item.mancc || '',
            name: item.name || '',
            masp: item.masp || '',
            title: item.title || '',
            dvt: item.dvt || '',
            xSLDat: 0, // Default for template
            goiy: goiy,
            ghichu: item.ghichu || '',
            khachdat: khachdat,
            khachgiao: khachgiao,
            khachhuy: item.khachhuy || 0,
            slton: parseFloat((tongkho - khachgiao).toFixed(3)),
            tongkho: tongkho,
            sltontt: Number(item.sltontt) || 0,
            slsnapshot: Number(item.slsnapshot) || 0,
            chenhlech: parseFloat((tongkho - khachgiao - (Number(item.sltontt) || 0)).toFixed(3)),
            ...khoValues,
            haohut: item.haohut || 0,
            slhaohut: slhaohut
          };
        });

        // Apply mapping to match F1 (NhucauDathang)
        const mapping: any = {
          ngaynhan: 'NGÀY',
          mancc: 'MÃ NCC',
          name: 'TÊN NHÀ CUNG CẤP',
          masp: 'MÃ SẢN PHẨM',
          title: 'TÊN SẢN PHẨM',
          dvt: 'ĐVT',
          xSLDat: 'SL ĐẶT (NHÀ CC)',
          goiy: 'SL CẦN ĐẶT (GỢI Ý)',
          ghichu: 'GHI CHÚ',
          khachdat: 'TỔNG ĐẶT (KHÁCH)',
          khachgiao: 'TỔNG BÁN (GIAO)',
          khachhuy: 'SỐ LƯỢNG HỦY',
          slton: 'TỒN HỆ THỐNG',
          tongkho: 'TỔNG TỒN (CÁC KHO)',
          sltontt: 'TỒN CHỐT KHO (THỰC TẾ)',
          slsnapshot: 'SỐ LƯỢNG CHỐT KHO (SNAPSHOT)',
          chenhlech: 'CHÊNH LỆCH',
          kho1: 'TG-LONG AN',
          kho2: 'BỔ SUNG',
          kho3: 'TG-ĐÀ LẠT',
          kho4: 'KHO TỔNG - HCM',
          kho5: 'SG1',
          kho6: 'SG2',
          haohut: 'TỈ LỆ HAO HỤT (%)',
          slhaohut: 'SL HAO HỤT',
        };

        tonghopSheetData = processedAggregated.map((item: any) => {
          const row: any = {};
          Object.keys(mapping).forEach(key => {
            const val = item[key];
            // Ensure 0 for numeric fields if empty/null, but keep strings as strings
            if (['ngaynhan', 'mancc', 'name', 'masp', 'title', 'dvt', 'ghichu'].includes(key)) {
              row[mapping[key]] = val || '';
            } else {
              row[mapping[key]] = (val === null || val === undefined || val === '') ? 0 : val;
            }
          });
          return row;
        });

      } catch (error) {
        console.warn('Không thể tạo sheet Tổng hợp:', error);
      }

      // Import dynamic để tránh bundle size
      const { writeExcelFileSheets } = await import('../../shared/utils/exceldrive.utils');
      
      const sheets = {
        'Tổng hợp': { data: tonghopSheetData },
        'Vận đơn': { data: vandonSheetData },
        'Hàng ST': { data: hangSieuThiAOA },
        'TH Hang ST': { data: thHangSieuThiAOA },
        'Khách lẻ': { data: hangKhachLeAOA },
        'Phiếu Chuyển': { data: phieuChuyenSheetData }
      };
      
      writeExcelFileSheets(sheets, fileName);

      this._snackBar.open('Xuất Excel thành công (5 sheet)', '', {
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

  /**
   * Xuất Excel báo cáo tồn kho cho Figure 2
   */
  async exportFig2InventoryToExcel(maSPs: string[]) {
    try {
      this.loading.set(true);
      
      // Lấy danh sách sản phẩm cùng thông tin tồn kho và phiên chốt kho gần nhất
      const products = await this._GraphqlService.findMany('sanpham', {
        where: { masp: { in: maSPs } },
        include: {
          TonKho: {
            select: {
              slton: true
            }
          },
          chotkhodetail: {
            orderBy: { ngaychot: 'desc' },
            take: 1,
            select: {
              sltonhethong: true,
              sltonthucte: true,
              chenhlech: true,
              ngaychot: true
            }
          }
        }
      });

      if (!products || products.length === 0) {
        throw new Error('Không tìm thấy dữ liệu cho các sản phẩm Figure 2');
      }

      // Sắp xếp theo thứ tự yêu cầu trong hình
      const sortedProducts = maSPs.map(masp => 
        products.find((p: any) => p.masp === masp)
      ).filter(p => !!p);

      const reportData = sortedProducts.map((p: any) => {
        const lastClosing = p.chotkhodetail?.[0] || {};
        return {
          'Mã Sản Phẩm': p.masp || '',
          'Tên Sản Phẩm': p.title || '',
          'TỒN HỆ THỐNG': Number(p.TonKho?.slton) || 0,
          'TỒN CHỐT KHO (THỰC TẾ)': Number(lastClosing.sltonthucte) || 0,
          'SỐ LƯỢNG CHỐT KHO (SNAPSHOT)': Number(lastClosing.sltonhethong) || 0,
          'CHÊNH LỆCH': Number(lastClosing.chenhlech) || 0
        };
      });

      const fileName = `DoiSoat_TonKho_Hinh2_${moment().format('DD-MM-YYYY')}`;
      const { writeExcelFileSheets } = await import('../../shared/utils/exceldrive.utils');
      
      writeExcelFileSheets({ 
        'Đối Soát Figure 2': { 
          data: reportData,
          headers: ['Mã Sản Phẩm', 'Tên Sản Phẩm', 'TỒN HỆ THỐNG', 'TỒN CHỐT KHO (THỰC TẾ)', 'SỐ LƯỢNG CHỐT KHO (SNAPSHOT)', 'CHÊNH LỆCH']
        } 
      }, fileName);

      this._snackBar.open('Xuất Excel Hình 2 (Đối soát tồn kho) thành công', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

    } catch (error: any) {
      console.error('Export error:', error);
      this._snackBar.open('Lỗi khi xuất Excel Hình 2: ' + error.message, '', {
        duration: 5000,
        panelClass: ['snackbar-error']
      });
    } finally {
      this.loading.set(false);
    }
  }
}

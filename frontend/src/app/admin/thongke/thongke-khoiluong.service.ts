import { Injectable, signal, computed } from '@angular/core';
import { GraphqlService } from '../../shared/services/graphql.service';
import { TimezoneService } from '../../shared/services/timezone.service';
import moment from 'moment';

export interface KhoiluongSanpham {
  sanphamId: string;
  masp: string;
  title: string;
  dvt: string;
  giaSanpham: number; // Giá từ đơn hàng mới nhất
  tongSoluongDat: number;
  tongSoluongGiao: number;
  tongSoluongNhan: number;
  tongGiaTri: number;
  soLanMua: number;
  donhangIds: string[];
  latestOrderDate?: string; // Ngày đơn hàng mới nhất
}

export interface ThongkeKhachhangResult {
  khachhangId: string;
  khachhangName: string;
  makh: string;
  batdau: string;
  ketthuc: string;
  tongDonhang: number;
  tongGiaTri: number;
  tongSanpham: number;
  chiTietSanpham: KhoiluongSanpham[];
}

@Injectable({
  providedIn: 'root'
})
export class ThongkeKhoiluongService {
  
  isLoading = signal<boolean>(false);
  result = signal<ThongkeKhachhangResult | null>(null);
  error = signal<string | null>(null);

  constructor(
    private graphqlService: GraphqlService,
    private timezoneService: TimezoneService
  ) {}

  /**
   * Lấy danh sách khách hàng để chọn
   */
  async getAllKhachhang(): Promise<any[]> {
    try {
      const response = await this.graphqlService.findAll('khachhang', {
        take: 99999,
        aggressiveCache: true,
        enableParallelFetch: true,
        select: {
          id: true,
          makh: true,
          name: true,
          tenfile: true,
          loaikh: true,
          diachi: true,
          sdt: true,
          isActive: true
        },
        orderBy: { name: 'asc' }
      });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching khachhang:', error);
      return [];
    }
  }

  /**
   * Thống kê khối lượng sản phẩm đã bán cho khách hàng theo khoảng thời gian
   */
  async thongkeKhoiluongByKhachhang(
    khachhangId: string,
    batdau: Date | string,
    ketthuc: Date | string
  ): Promise<ThongkeKhachhangResult | null> {
    this.isLoading.set(true);
    this.error.set(null);
    
    try {
      // Convert dates to API format
      const dateRange = this.timezoneService.getAPIDateRange(
        typeof batdau === 'string' ? new Date(batdau) : batdau,
        typeof ketthuc === 'string' ? new Date(ketthuc) : ketthuc
      );

      // Lấy thông tin khách hàng
      const khachhangResponse = await this.graphqlService.findAll('khachhang', {
        take: 1,
        where: { id: khachhangId },
        select: {
          id: true,
          makh: true,
          name: true,
          tenfile: true
        }
      });

      if (!khachhangResponse.data || khachhangResponse.data.length === 0) {
        this.error.set('Không tìm thấy khách hàng');
        this.isLoading.set(false);
        return null;
      }

      const khachhang = khachhangResponse.data[0];

      // Lấy tất cả đơn hàng của khách hàng trong khoảng thời gian
      // Query theo createdAt vì ngaygiao có thể null
      console.log('📊 Query donhang với params:', {
        khachhangId,
        dateRange,
        Batdau: dateRange.Batdau,
        Ketthuc: dateRange.Ketthuc
      });

      const donhangResponse = await this.graphqlService.findAll('donhang', {
        take: 99999,
        enableParallelFetch: true,
        aggressiveCache: false,
        where: {
          khachhangId: khachhangId,
          createdAt: {
            gte: dateRange.Batdau,
            lte: dateRange.Ketthuc
          },
          status: {
            notIn: ['huy'] // Loại bỏ đơn hàng đã hủy
          }
        },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          madonhang: true,
          ngaygiao: true,
          createdAt: true,
          status: true,
          tongtien: true,
          tongvat: true,
          sanpham: {
            select: {
              id: true,
              sldat: true,
              slgiao: true,
              slnhan: true,
              giaban: true,
              ttdat: true,
              ttgiao: true,
              ttnhan: true,
              sanpham: {
                select: {
                  id: true,
                  masp: true,
                  title: true,
                  dvt: true
                }
              }
            }
          }
        }
      });

      const donhangs = donhangResponse.data || [];

      console.log('📊 Kết quả donhang:', {
        tongDonhang: donhangs.length,
        donhangs: donhangs.slice(0, 3) // Log 3 đơn đầu tiên để debug
      });

      // Tổng hợp dữ liệu theo sản phẩm
      const sanphamMap = new Map<string, KhoiluongSanpham>();

      // Sort donhangs by createdAt descending to get latest orders first
      const sortedDonhangs = donhangs.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      sortedDonhangs.forEach((donhang: any) => {
        if (donhang.sanpham && Array.isArray(donhang.sanpham)) {
          donhang.sanpham.forEach((item: any) => {
            const sp = item.sanpham;
            if (!sp || !sp.id) return;

            const key = sp.id;
            const existing = sanphamMap.get(key);

            const sldat = Number(item.sldat) || 0;
            const slgiao = Number(item.slgiao) || 0;
            const slnhan = Number(item.slnhan) || 0;
            const giaban = Number(item.giaban) || 0;
            const giatri = slnhan * giaban; // Tính giá trị dựa trên SL Nhận

            if (existing) {
              existing.tongSoluongDat += sldat;
              existing.tongSoluongGiao += slgiao;
              existing.tongSoluongNhan += slnhan;
              existing.tongGiaTri += giatri;
              existing.soLanMua += 1;
              if (!existing.donhangIds.includes(donhang.id)) {
                existing.donhangIds.push(donhang.id);
              }
              // Giữ nguyên giaSanpham từ đơn hàng mới nhất (đã được xử lý đầu tiên do sort)
            } else {
              sanphamMap.set(key, {
                sanphamId: sp.id,
                masp: sp.masp || '',
                title: sp.title || '',
                dvt: sp.dvt || '',
                giaSanpham: giaban, // Giá từ đơn hàng mới nhất
                tongSoluongDat: sldat,
                tongSoluongGiao: slgiao,
                tongSoluongNhan: slnhan,
                tongGiaTri: giatri,
                soLanMua: 1,
                donhangIds: [donhang.id],
                latestOrderDate: donhang.createdAt // Lưu ngày đơn hàng mới nhất
              });
            }
          });
        }
      });

      // Convert map to array and sort by khối lượng giao giảm dần
      const chiTietSanpham = Array.from(sanphamMap.values())
        .sort((a, b) => b.tongSoluongGiao - a.tongSoluongGiao);

      // Tính tổng
      const tongGiaTri = chiTietSanpham.reduce((sum, sp) => sum + sp.tongGiaTri, 0);

      const result: ThongkeKhachhangResult = {
        khachhangId: khachhang.id,
        khachhangName: khachhang.name || khachhang.tenfile || '',
        makh: khachhang.makh || '',
        batdau: moment(batdau).format('DD/MM/YYYY'),
        ketthuc: moment(ketthuc).format('DD/MM/YYYY'),
        tongDonhang: donhangs.length,
        tongGiaTri: tongGiaTri,
        tongSanpham: chiTietSanpham.length,
        chiTietSanpham: chiTietSanpham
      };

      this.result.set(result);
      this.isLoading.set(false);
      return result;

    } catch (error: any) {
      console.error('Error in thongkeKhoiluongByKhachhang:', error);
      this.error.set(error.message || 'Có lỗi xảy ra khi thống kê');
      this.isLoading.set(false);
      return null;
    }
  }

  /**
   * Export dữ liệu ra Excel
   */
  exportToExcel(result: ThongkeKhachhangResult): any[] {
    return result.chiTietSanpham.map((sp, index) => ({
      STT: index + 1,
      'Mã SP': sp.masp,
      'Tên sản phẩm': sp.title,
      'ĐVT': sp.dvt,
      'Giá SP (VNĐ)': sp.giaSanpham,
      'Tổng Khối Lượng': sp.tongSoluongNhan,
      'Giá trị (VNĐ)': sp.tongGiaTri,
      'Số lần mua': sp.soLanMua
    }));
  }

  /**
   * Reset kết quả
   */
  reset() {
    this.result.set(null);
    this.error.set(null);
    this.isLoading.set(false);
  }
}

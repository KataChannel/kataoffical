import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

interface BaoCaoDongTienQuery {
  tuNgay?: Date;
  denNgay?: Date;
  groupBy?: 'day' | 'week' | 'month';
}

interface DongTienItem {
  ngay: string;
  thu: number;
  chi: number;
  ton: number;
}

interface ThongKeDongTien {
  tongThu: number;
  tongChi: number;
  tonDauKy: number;
  tonCuoiKy: number;
  data: DongTienItem[];
}

@Injectable()
export class BaoCaoDongTienService {
  constructor(private prisma: PrismaService) {}

  /**
   * Lấy báo cáo dòng tiền theo khoảng thời gian
   */
  async getBaoCaoDongTien(query: BaoCaoDongTienQuery): Promise<ThongKeDongTien> {
    const { tuNgay, denNgay, groupBy = 'day' } = query;

    // Mặc định: 30 ngày gần nhất
    const endDate = denNgay || new Date();
    const startDate = tuNgay || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Tính tồn đầu kỳ (tổng thu - chi trước ngày bắt đầu)
    const tonDauKy = await this.getTonDauKy(startDate);

    // Lấy dữ liệu thu chi trong khoảng thời gian
    const [thuData, chiData] = await Promise.all([
      this.getPhieuThu(startDate, endDate),
      this.getPhieuChi(startDate, endDate),
    ]);

    // Nhóm dữ liệu theo ngày/tuần/tháng
    const groupedData = this.groupDongTien(thuData, chiData, groupBy, startDate, endDate);

    // Tính tổng thu, tổng chi, tồn cuối kỳ
    const tongThu = thuData.reduce((sum, item) => sum + Number(item.soTien), 0);
    const tongChi = chiData.reduce((sum, item) => sum + Number(item.soTien), 0);
    const tonCuoiKy = tonDauKy + tongThu - tongChi;

    return {
      tongThu,
      tongChi,
      tonDauKy,
      tonCuoiKy,
      data: groupedData,
    };
  }

  /**
   * Tính tồn đầu kỳ (thu - chi trước ngày bắt đầu)
   */
  private async getTonDauKy(startDate: Date): Promise<number> {
    const [thu, chi] = await Promise.all([
      this.prisma.phieuThuChi.aggregate({
        where: {
          loai: 'THU',
          trangThai: 'DA_DUYET',
          ngay: { lt: startDate },
        },
        _sum: { soTien: true },
      }),
      this.prisma.phieuThuChi.aggregate({
        where: {
          loai: 'CHI',
          trangThai: 'DA_DUYET',
          ngay: { lt: startDate },
        },
        _sum: { soTien: true },
      }),
    ]);

    const tongThu = Number(thu._sum.soTien || 0);
    const tongChi = Number(chi._sum.soTien || 0);

    return tongThu - tongChi;
  }

  /**
   * Lấy danh sách phiếu thu đã duyệt
   */
  private async getPhieuThu(startDate: Date, endDate: Date) {
    return this.prisma.phieuThuChi.findMany({
      where: {
        loai: 'THU',
        trangThai: 'DA_DUYET',
        ngay: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        ngay: true,
        soTien: true,
      },
      orderBy: { ngay: 'asc' },
    });
  }

  /**
   * Lấy danh sách phiếu chi đã duyệt
   */
  private async getPhieuChi(startDate: Date, endDate: Date) {
    return this.prisma.phieuThuChi.findMany({
      where: {
        loai: 'CHI',
        trangThai: 'DA_DUYET',
        ngay: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        ngay: true,
        soTien: true,
      },
      orderBy: { ngay: 'asc' },
    });
  }

  /**
   * Nhóm dữ liệu theo ngày/tuần/tháng
   */
  private groupDongTien(
    thuData: any[],
    chiData: any[],
    groupBy: 'day' | 'week' | 'month',
    startDate: Date,
    endDate: Date,
  ): DongTienItem[] {
    const result: Map<string, DongTienItem> = new Map();

    // Khởi tạo các ngày trong khoảng thời gian
    const dateKeys = this.generateDateKeys(startDate, endDate, groupBy);
    dateKeys.forEach((key) => {
      result.set(key, { ngay: key, thu: 0, chi: 0, ton: 0 });
    });

    // Tính thu theo từng kỳ
    thuData.forEach((item) => {
      const key = this.getDateKey(item.ngay, groupBy);
      const current = result.get(key);
      if (current) {
        current.thu += Number(item.soTien);
      }
    });

    // Tính chi theo từng kỳ
    chiData.forEach((item) => {
      const key = this.getDateKey(item.ngay, groupBy);
      const current = result.get(key);
      if (current) {
        current.chi += Number(item.soTien);
      }
    });

    // Chuyển Map thành Array và tính tồn tích lũy
    const sortedData = Array.from(result.values()).sort((a, b) =>
      a.ngay.localeCompare(b.ngay),
    );

    let tonLuyKe = 0;
    sortedData.forEach((item) => {
      tonLuyKe += item.thu - item.chi;
      item.ton = tonLuyKe;
    });

    return sortedData;
  }

  /**
   * Tạo danh sách key ngày theo groupBy
   */
  private generateDateKeys(
    startDate: Date,
    endDate: Date,
    groupBy: 'day' | 'week' | 'month',
  ): string[] {
    const keys: string[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      keys.push(this.getDateKey(current, groupBy));

      if (groupBy === 'day') {
        current.setDate(current.getDate() + 1);
      } else if (groupBy === 'week') {
        current.setDate(current.getDate() + 7);
      } else {
        current.setMonth(current.getMonth() + 1);
      }
    }

    return [...new Set(keys)]; // Remove duplicates
  }

  /**
   * Lấy key ngày theo groupBy
   */
  private getDateKey(date: Date, groupBy: 'day' | 'week' | 'month'): string {
    const d = new Date(date);

    if (groupBy === 'day') {
      return d.toISOString().split('T')[0]; // YYYY-MM-DD
    } else if (groupBy === 'week') {
      const year = d.getFullYear();
      const week = this.getWeekNumber(d);
      return `${year}-W${week.toString().padStart(2, '0')}`;
    } else {
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${month}`;
    }
  }

  /**
   * Lấy số tuần trong năm
   */
  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  /**
   * Lấy thống kê nhanh dòng tiền hôm nay
   */
  async getThongKeHomNay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [thu, chi] = await Promise.all([
      this.prisma.phieuThuChi.aggregate({
        where: {
          loai: 'THU',
          trangThai: 'DA_DUYET',
          ngay: {
            gte: today,
            lt: tomorrow,
          },
        },
        _sum: { soTien: true },
      }),
      this.prisma.phieuThuChi.aggregate({
        where: {
          loai: 'CHI',
          trangThai: 'DA_DUYET',
          ngay: {
            gte: today,
            lt: tomorrow,
          },
        },
        _sum: { soTien: true },
      }),
    ]);

    return {
      thu: Number(thu._sum.soTien || 0),
      chi: Number(chi._sum.soTien || 0),
      chenh: Number(thu._sum.soTien || 0) - Number(chi._sum.soTien || 0),
    };
  }
}

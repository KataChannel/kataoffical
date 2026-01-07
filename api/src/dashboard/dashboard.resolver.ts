import { Injectable } from '@nestjs/common';
import {
    Args,
    Field,
    Float,
    Int,
    ObjectType,
    Query,
    Resolver,
} from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { PrismaService } from 'prisma/prisma.service';

// Define GraphQL types for code-first approach
@ObjectType()
export class AggregateCount {
  @Field(() => Int)
  _all: number;
}

@ObjectType()
export class AggregateSum {
  @Field(() => Float, { nullable: true })
  tongtien?: number;

  @Field(() => Float, { nullable: true })
  tongvat?: number;
}

@ObjectType()
export class AggregateResult {
  @Field(() => AggregateCount)
  _count: AggregateCount;

  @Field(() => AggregateSum, { nullable: true })
  _sum?: AggregateSum;
}

@ObjectType()
export class DailyMonthlyReportItem {
  @Field(() => String)
  period: string;

  @Field(() => Int)
  totalDonhang: number;

  @Field(() => Int)
  totalDathang: number;

  @Field(() => Float)
  totalRevenue: number;

  @Field(() => Float)
  totalProfit: number;
}

@ObjectType()
export class SanphamInfo {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  masp?: string;
}

@ObjectType()
export class TopProductItem {
  @Field(() => SanphamInfo)
  sanpham: SanphamInfo;

  @Field(() => Float)
  totalQuantity: number;

  @Field(() => Float)
  totalValue: number;
}

@ObjectType()
export class DashboardKhachhangInfo {
  @Field(() => String, { nullable: true })
  ten?: string;

  @Field(() => String, { nullable: true })
  sdt?: string;
}

@ObjectType()
export class DonhangChoXacNhanItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  madonhang: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Float)
  tongTien: number;

  @Field(() => Boolean)
  xacNhanLan1: boolean;

  @Field(() => Boolean)
  xacNhanLan2: boolean;

  @Field(() => String, { nullable: true })
  confirmToken?: string;

  @Field(() => DashboardKhachhangInfo, { nullable: true })
  khachhang?: DashboardKhachhangInfo;
}

@ObjectType()
export class CongNoKhachHangItem {
  @Field(() => String)
  khachhangId: string;

  @Field(() => String)
  ten: string;

  @Field(() => String, { nullable: true })
  sdt?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Float)
  tongNo: number;

  @Field(() => Int)
  soDonNo: number;

  @Field(() => Date, { nullable: true })
  ngayMuaGanNhat?: Date;
}

@ObjectType()
export class CongNoSummaryResult {
  @Field(() => Float)
  tongCongNo: number;

  @Field(() => Int)
  soKhachNo: number;

  @Field(() => Int)
  soKhachQuaHan: number;

  @Field(() => Float)
  trungBinhNo: number;

  @Field(() => [CongNoKhachHangItem])
  topKhachNo: CongNoKhachHangItem[];
}

@Injectable()
@Resolver('Dashboard')
export class DashboardResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => AggregateResult)
  async aggregateDonhang(
    @Args('batdau', { nullable: true }) batdau?: string,
    @Args('ketthuc', { nullable: true }) ketthuc?: string,
  ): Promise<AggregateResult> {
    const processedWhere: any = {};

    if (batdau || ketthuc) {
      processedWhere.createdAt = {};
      if (batdau) {
        processedWhere.createdAt.gte = new Date(batdau);
      }
      if (ketthuc) {
        processedWhere.createdAt.lte = new Date(ketthuc);
      }
    }

    const count = await this.prisma.donhang.count({ where: processedWhere });
    const sum = await this.prisma.donhang.aggregate({
      where: processedWhere,
      _sum: {
        tongtien: true,
        tongvat: true,
      },
    });

    return {
      _count: { _all: count },
      _sum: {
        tongtien: sum._sum.tongtien ? Number(sum._sum.tongtien) : undefined,
        tongvat: sum._sum.tongvat ? Number(sum._sum.tongvat) : undefined,
      },
    };
  }

  @Query(() => AggregateResult)
  async aggregateDathang(
    @Args('batdau', { nullable: true }) batdau?: string,
    @Args('ketthuc', { nullable: true }) ketthuc?: string,
  ): Promise<AggregateResult> {
    const processedWhere: any = {};

    if (batdau || ketthuc) {
      processedWhere.createdAt = {};
      if (batdau) {
        processedWhere.createdAt.gte = new Date(batdau);
      }
      if (ketthuc) {
        processedWhere.createdAt.lte = new Date(ketthuc);
      }
    }

    const count = await this.prisma.dathang.count({ where: processedWhere });

    const sum = await this.prisma.dathang.aggregate({
      where: processedWhere,
      _sum: {
        tongtien: true,
      },
    });

    return {
      _count: { _all: count },
      _sum: {
        tongtien: sum._sum?.tongtien ? Number(sum._sum.tongtien) : 0,
      },
    };
  }

  @Query(() => AggregateResult)
  async aggregateSanpham(): Promise<AggregateResult> {
    const count = await this.prisma.sanpham.count();
    return {
      _count: { _all: count },
    };
  }

  @Query(() => AggregateResult)
  async aggregateKhachhang(): Promise<AggregateResult> {
    const count = await this.prisma.khachhang.count();
    return {
      _count: { _all: count },
    };
  }

  @Query(() => AggregateResult)
  async aggregateNhacungcap(): Promise<AggregateResult> {
    const count = await this.prisma.nhacungcap.count();
    return {
      _count: { _all: count },
    };
  }

  @Query(() => [DailyMonthlyReportItem])
  async dailyMonthlyReport(
    @Args('batdau') batdau: string,
    @Args('ketthuc') ketthuc: string,
    @Args('groupBy') groupBy: string,
  ): Promise<DailyMonthlyReportItem[]> {
    const startDate = new Date(batdau);
    const endDate = new Date(ketthuc);

    let selectFormat = '';
    let groupByFormat = '';
    let orderBy = '';

    switch (groupBy) {
      case 'day':
        selectFormat = `DATE("createdAt") as period`;
        groupByFormat = `DATE("createdAt")`;
        orderBy = 'period';
        break;
      case 'month':
        selectFormat = `TO_CHAR("createdAt", 'YYYY-MM') as period`;
        groupByFormat = `TO_CHAR("createdAt", 'YYYY-MM')`;
        orderBy = 'period';
        break;
      case 'year':
        selectFormat = `EXTRACT(YEAR FROM "createdAt")::text as period`;
        groupByFormat = `EXTRACT(YEAR FROM "createdAt")`;
        orderBy = 'period';
        break;
      default:
        selectFormat = `DATE("createdAt")::text as period`;
        groupByFormat = `DATE("createdAt")`;
        orderBy = 'period';
    }

    const rawQuery = `
      SELECT 
        ${selectFormat},
        COUNT(*)::int as total_donhang,
        COALESCE(SUM("tongtien"), 0)::numeric as total_revenue,
        COALESCE(SUM("tongtien"), 0)::numeric as total_profit
      FROM "Donhang" 
      WHERE "createdAt" >= $1 AND "createdAt" <= $2
      GROUP BY ${groupByFormat}
      ORDER BY ${orderBy}
    `;

    const result = await this.prisma.$queryRawUnsafe(
      rawQuery,
      startDate,
      endDate,
    ) as any[];

    return result.map((item: any) => ({
      period: String(item.period),
      totalDonhang: parseInt(item.total_donhang) || 0,
      totalDathang: 0, // Not available in Donhang table
      totalRevenue: parseFloat(item.total_revenue) || 0,
      totalProfit: parseFloat(item.total_profit) || 0,
    }));
  }

  @Query(() => [TopProductItem])
  async topProductsByQuantity(
    @Args('batdau') batdau: string,
    @Args('ketthuc') ketthuc: string,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<TopProductItem[]> {
    const startDate = new Date(batdau);
    const endDate = new Date(ketthuc);

    const rawQuery = `
      SELECT 
        sp.id,
        sp.title,
        sp.masp,
        SUM(dsp.sldat) as totalQuantity,
        SUM(dsp.ttdat) as totalValue
      FROM "Donhangsanpham" dsp
      INNER JOIN "Sanpham" sp ON dsp."idSP" = sp.id
      INNER JOIN "Donhang" dh ON dsp."donhangId" = dh.id
      WHERE dh."createdAt" >= $1 AND dh."createdAt" <= $2
      GROUP BY sp.id, sp.title, sp.masp
      ORDER BY totalQuantity DESC
      LIMIT $3
    `;

    const result = await this.prisma.$queryRawUnsafe(
      rawQuery,
      startDate,
      endDate,
      limit,
    ) as any[];

    return result.map((item: any) => ({
      sanpham: {
        id: item.id,
        title: item.title,
        masp: item.masp,
      },
      totalQuantity: Number(item.totalquantity) || 0,
      totalValue: Number(item.totalvalue) || 0,
    }));
  }

  @Query(() => [TopProductItem])
  async topProductsByValue(
    @Args('batdau') batdau: string,
    @Args('ketthuc') ketthuc: string,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<TopProductItem[]> {
    const startDate = new Date(batdau);
    const endDate = new Date(ketthuc);

    const rawQuery = `
      SELECT 
        sp.id,
        sp.title,
        sp.masp,
        SUM(dsp.sldat) as totalQuantity,
        SUM(dsp.ttdat) as totalValue
      FROM "Donhangsanpham" dsp
      INNER JOIN "Sanpham" sp ON dsp."idSP" = sp.id
      INNER JOIN "Donhang" dh ON dsp."donhangId" = dh.id
      WHERE dh."createdAt" >= $1 AND dh."createdAt" <= $2
      GROUP BY sp.id, sp.title, sp.masp
      ORDER BY totalValue DESC
      LIMIT $3
    `;

    const result = await this.prisma.$queryRawUnsafe(
      rawQuery,
      startDate,
      endDate,
      limit,
    ) as any[];

    return result.map((item: any) => ({
      sanpham: {
        id: item.id,
        title: item.title,
        masp: item.masp,
      },
      totalQuantity: Number(item.totalquantity) || 0,
      totalValue: Number(item.totalvalue) || 0,
    }));
  }

  // ==================== DASHBOARD WIDGETS ====================

  @Query(() => [DonhangChoXacNhanItem], { name: 'donhangChoXacNhan' })
  async donhangChoXacNhan(): Promise<DonhangChoXacNhanItem[]> {
    // Find orders that need confirmation
    // xacNhanLan1 = false OR xacNhanLan2 = false
    const donhangs = await this.prisma.donhang.findMany({
      where: {
        OR: [{ xacNhanLan1: false }, { xacNhanLan1: true, xacNhanLan2: false }],
        status: {
          notIn: ['huy', 'hoanthanh'],
        },
      },
      select: {
        id: true,
        madonhang: true,
        createdAt: true,
        tongtien: true,
        xacNhanLan1: true,
        xacNhanLan2: true,
        confirmToken: true,
        khachhang: {
          select: {
            name: true,
            sdt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });

    return donhangs.map((d) => ({
      ...d,
      tongTien: Number(d.tongtien),
      xacNhanLan1: !!d.xacNhanLan1,
      xacNhanLan2: !!d.xacNhanLan2,
      confirmToken: d.confirmToken || undefined,
      khachhang: d.khachhang
        ? {
            ten: d.khachhang.name,
            sdt: d.khachhang.sdt || undefined,
          }
        : undefined,
    })) as any;
  }

  @Query(() => CongNoSummaryResult, { name: 'congNoSummary' })
  async congNoSummary(): Promise<CongNoSummaryResult> {
    // Get all customers with debt
    const congNoData = await this.prisma.$queryRaw<
      Array<{
        khachhangId: string;
        name: string;
        sdt: string | null;
        email: string | null;
        tongNo: number;
        soDonNo: bigint;
        ngayMuaGanNhat: Date | null;
      }>
    >`
      SELECT 
        k.id as "khachhangId",
        k.name,
        k.sdt,
        k.email,
        COALESCE(SUM(d."tongtien" - COALESCE((SELECT SUM("soTien") FROM "ThanhToan" tt WHERE tt."donhangId" = d.id AND tt."trangThai" = 'DA_THANH_TOAN'), 0)), 0) as "tongNo",
        COUNT(d.id) as "soDonNo",
        MAX(d."createdAt") as "ngayMuaGanNhat"
      FROM "Khachhang" k
      INNER JOIN "Donhang" d ON d."khachhangId" = k.id
      WHERE d.status NOT IN ('huy')
      GROUP BY k.id, k.name, k.sdt, k.email
      HAVING COALESCE(SUM(d."tongtien"), 0) > 0
      ORDER BY "tongNo" DESC
      LIMIT 10
    `;

    // Calculate stats
    const tongCongNo = congNoData.reduce(
      (sum, item) => sum + Number(item.tongNo),
      0,
    );
    const soKhachNo = congNoData.length;

    // Calculate how many customers are overdue (example: > 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const soKhachQuaHan = congNoData.filter(
      (item) => item.ngayMuaGanNhat && item.ngayMuaGanNhat < thirtyDaysAgo,
    ).length;

    const trungBinhNo = soKhachNo > 0 ? tongCongNo / soKhachNo : 0;

    // Convert bigint to number and handle nulls
    const topKhachNo: CongNoKhachHangItem[] = congNoData.map((item) => ({
      khachhangId: item.khachhangId,
      ten: item.name,
      sdt: item.sdt || undefined,
      email: item.email || undefined,
      tongNo: Number(item.tongNo),
      soDonNo: Number(item.soDonNo),
      ngayMuaGanNhat: item.ngayMuaGanNhat || undefined,
    }));

    return {
      tongCongNo,
      soKhachNo,
      soKhachQuaHan,
      trungBinhNo,
      topKhachNo,
    };
  }

  @Query(() => GraphQLJSON, { name: 'financialSummary' })
  async financialSummary(
    @Args('batdau', { nullable: true }) batdau?: string,
    @Args('ketthuc', { nullable: true }) ketthuc?: string,
  ) {
    const now = new Date();
    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);

    const where: any = {};
    if (batdau || ketthuc) {
      where.createdAt = {};
      if (batdau) where.createdAt.gte = new Date(batdau);
      if (ketthuc) where.createdAt.lte = new Date(ketthuc);
    }

    const [arStats, apStats, arOverdue, apOverdue, apUpcoming] = await Promise.all([
      this.prisma.aRDocument.aggregate({
        where,
        _sum: {
          totalAmount: true,
          paidAmount: true,
          remainingAmount: true,
        } as any,
      }),
      this.prisma.paymentProposal.aggregate({
        where,
        _sum: {
          totalAmount: true,
          paidAmount: true,
          remainingAmount: true,
        } as any,
      }),
      // Nợ quá hạn khách hàng (AR Overdue)
      this.prisma.aRDocument.aggregate({
        where: { ...where, dueDate: { lt: now }, remainingAmount: { gt: 0 } },
        _sum: { remainingAmount: true } as any,
      }),
      // Nợ quá hạn nhà cung cấp (AP Overdue)
      this.prisma.paymentProposal.aggregate({
        where: { ...where, dueDate: { lt: now }, remainingAmount: { gt: 0 } },
        _sum: { remainingAmount: true } as any,
      }),
      // Nợ sắp đến hạn NCC (AP Upcoming - 7 days)
      this.prisma.paymentProposal.aggregate({
        where: { 
          ...where, 
          dueDate: { gte: now, lte: next7Days }, 
          remainingAmount: { gt: 0 } 
        },
        _sum: { remainingAmount: true } as any,
      }),
    ]);

    const alerts: any[] = [];
    const arOverdueAmt = Number((arOverdue._sum as any)?.remainingAmount) || 0;
    const apOverdueAmt = Number((apOverdue._sum as any)?.remainingAmount) || 0;
    const apUpcomingAmt = Number((apUpcoming._sum as any)?.remainingAmount) || 0;

    if (arOverdueAmt > 0) {
      alerts.push({
        type: 'warning',
        category: 'AR',
        message: `Có ${arOverdueAmt.toLocaleString('vi-VN')} VNĐ nợ quá hạn từ khách hàng cần thu hồi.`,
      });
    }

    if (apOverdueAmt > 0) {
      alerts.push({
        type: 'danger',
        category: 'AP',
        message: `Có ${apOverdueAmt.toLocaleString('vi-VN')} VNĐ nợ quá hạn NCC cần thanh toán ngay!`,
      });
    }

    if (apUpcomingAmt > 0) {
      alerts.push({
        type: 'info',
        category: 'AP',
        message: `Có ${apUpcomingAmt.toLocaleString('vi-VN')} VNĐ nợ NCC sắp đến hạn trong 7 ngày tới.`,
      });
    }

    return {
      ar: {
        total: Number(arStats._sum?.totalAmount) || 0,
        paid: Number((arStats._sum as any)?.paidAmount) || 0,
        remaining: Number((arStats._sum as any)?.remainingAmount) || 0,
        overdue: arOverdueAmt,
      },
      ap: {
        total: Number(apStats._sum?.totalAmount) || 0,
        paid: Number((apStats._sum as any)?.paidAmount) || 0,
        remaining: Number((apStats._sum as any)?.remainingAmount) || 0,
        overdue: apOverdueAmt,
        upcoming: apUpcomingAmt,
      },
      alerts,
    };
  }
}

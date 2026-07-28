import { Resolver, Query, Args } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

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
export class TopCustomerItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  ten: string;

  @Field(() => String)
  loai: string;

  @Field(() => Float)
  doanhthu: number;

  @Field(() => String, { nullable: true })
  ngay?: string;
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
export class InventoryDiscrepancyItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  masp?: string;

  @Field(() => Float)
  chenhlech: number;

  @Field(() => Float)
  sltonhethong: number;

  @Field(() => Float)
  sltonthucte: number;

  @Field(() => String)
  type: string;

  @Field(() => String, { nullable: true })
  ngaychot?: string;
}

@Injectable()
@Resolver('Dashboard')
export class DashboardResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => AggregateResult)
  async aggregateDonhang(
    @Args('batdau', { nullable: true }) batdau?: string,
    @Args('ketthuc', { nullable: true }) ketthuc?: string
  ): Promise<AggregateResult> {
    let processedWhere: any = {};
    
    if (batdau || ketthuc) {
      processedWhere.ngaygiao = {};
      if (batdau) {
        processedWhere.ngaygiao.gte = new Date(batdau);
      }
      if (ketthuc) {
        processedWhere.ngaygiao.lte = new Date(ketthuc);
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
    @Args('ketthuc', { nullable: true }) ketthuc?: string
  ): Promise<AggregateResult> {
    let processedWhere: any = {};
    
    if (batdau || ketthuc) {
      processedWhere.ngaynhan = {};
      if (batdau) {
        processedWhere.ngaynhan.gte = new Date(batdau);
      }
      if (ketthuc) {
        processedWhere.ngaynhan.lte = new Date(ketthuc);
      }
    }

    const count = await this.prisma.dathang.count({ where: processedWhere });
    
    // Tính tổng từ Dathangsanpham
    const sumQuery = await this.prisma.dathangsanpham.aggregate({
      where: {
        dathang: processedWhere,
      },
      _sum: {
        ttdat: true,
      },
    });

    return {
      _count: { _all: count },
      _sum: { 
        tongtien: sumQuery._sum?.ttdat ? Number(sumQuery._sum.ttdat) : 0 
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
        selectFormat = `DATE("ngaygiao") as period`;
        groupByFormat = `DATE("ngaygiao")`;
        orderBy = 'period';
        break;
      case 'month':
        selectFormat = `TO_CHAR("ngaygiao", 'YYYY-MM') as period`;
        groupByFormat = `TO_CHAR("ngaygiao", 'YYYY-MM')`;
        orderBy = 'period';
        break;
      case 'year':
        selectFormat = `EXTRACT(YEAR FROM "ngaygiao")::text as period`;
        groupByFormat = `EXTRACT(YEAR FROM "ngaygiao")`;
        orderBy = 'period';
        break;
      default:
        selectFormat = `DATE("ngaygiao")::text as period`;
        groupByFormat = `DATE("ngaygiao")`;
        orderBy = 'period';
    }

    const rawQuery = `
      SELECT 
        ${selectFormat},
        COUNT(*)::int as total_donhang,
        COALESCE(SUM("tongtien"), 0)::numeric as total_revenue,
        COALESCE(SUM("tongtien"), 0)::numeric as total_profit
      FROM "Donhang" 
      WHERE "ngaygiao" >= $1 AND "ngaygiao" <= $2
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
      WHERE dh."ngaygiao" >= $1 AND dh."ngaygiao" <= $2
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
      WHERE dh."ngaygiao" >= $1 AND dh."ngaygiao" <= $2
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

  @Query(() => [TopCustomerItem])
  async topCustomers(
    @Args('batdau') batdau: string,
    @Args('ketthuc') ketthuc: string,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<TopCustomerItem[]> {
    const startDate = new Date(batdau);
    const endDate = new Date(ketthuc);

    const rawQuery = `
      SELECT 
        kh.id,
        kh.name as ten,
        COALESCE(kh.loaikh, 'Khách hàng') as loai,
        SUM(dh.tongtien) as doanhthu,
        MAX(dh.ngaygiao)::text as ngay
      FROM "Donhang" dh
      INNER JOIN "Khachhang" kh ON dh."khachhangId" = kh.id
      WHERE dh."ngaygiao" >= $1 AND dh."ngaygiao" <= $2
      GROUP BY kh.id, kh.name, kh.loaikh
      ORDER BY doanhthu DESC
      LIMIT $3
    `;

    const result = await this.prisma.$queryRawUnsafe(
      rawQuery,
      startDate,
      endDate,
      limit,
    ) as any[];

    return result.map((item: any) => ({
      id: item.id,
      ten: item.ten,
      loai: item.loai,
      doanhthu: Number(item.doanhthu) || 0,
      ngay: item.ngay
    }));
  }

  @Query(() => [StagnantProductItem])
  async getStagnantProducts(
    @Args('limit', { type: () => Int, nullable: true }) limit: number = 5
  ): Promise<StagnantProductItem[]> {
    const limitVal = limit || 5;

    // 1. Lấy đơn hàng KHÁCH (Đang đi) - Trễ chứng từ
    const rawDonhang = await this.prisma.$queryRawUnsafe(`
      SELECT 
        sp.id as "sanphamId",
        dh.id as "orderId",
        sp.title,
        sp.masp,
        'Đang đi' as status,
        dh.status as "realStatus",
        dh.madonhang as "orderCode",
        dh.ngaygiao as "ngay",
        EXTRACT(EPOCH FROM (NOW() - dh.ngaygiao))/3600 as hours,
        dsp.sldat as quantity
      FROM "Donhangsanpham" dsp
      INNER JOIN "Donhang" dh ON dsp."donhangId" = dh.id
      INNER JOIN "Sanpham" sp ON dsp."idSP" = sp.id
      WHERE dh.status IN ('dadat', 'dagiao') 
      ORDER BY dh.ngaygiao ASC
      LIMIT 100
    `) as any[];

    // 2. Lấy đơn hàng NCC (Đang về) - Trễ nhập kho
    const rawDathang = await this.prisma.$queryRawUnsafe(`
      SELECT 
        sp.id as "sanphamId",
        dh.id as "orderId",
        sp.title,
        sp.masp,
        'Đang về' as status,
        dh.status as "realStatus",
        dh.madncc as "orderCode",
        dh."createdAt" as "ngay",
        EXTRACT(EPOCH FROM (NOW() - dh."createdAt"))/3600 as hours,
        dsp.sldat as quantity
      FROM "Dathangsanpham" dsp
      INNER JOIN "Dathang" dh ON dsp."dathangId" = dh.id
      INNER JOIN "Sanpham" sp ON dsp."idSP" = sp.id
      WHERE dh.status IN ('dadat')
      ORDER BY dh."createdAt" ASC
      LIMIT 100
    `) as any[];

    // 3. Gộp và lấy Top theo số giờ trễ
    const combined = [...rawDonhang, ...rawDathang]
      .sort((a, b) => b.hours - a.hours)
      .slice(0, limitVal);

    return combined.map(item => ({
      sanpham: {
        id: item.sanphamId,
        title: item.title,
        masp: item.masp
      },
      status: item.status,
      realStatus: item.realStatus,
      hoursStagnant: Math.round(item.hours),
      orderId: item.orderId,
      oldestOrderCode: item.orderCode,
      quantity: Number(item.quantity) || 0
    }));
  }

  @Query(() => [InventoryDiscrepancyItem])
  async getInventoryDiscrepancies(): Promise<InventoryDiscrepancyItem[]> {
    // 1. Tìm các sản phẩm có tồn kho hệ thống bị âm (Dấu hiệu quên xác nhận nhập hàng)
    const negativeStock = await this.prisma.tonKho.findMany({
      where: { slton: { lt: 0 } },
      include: { sanpham: true }
    });

    // 2. Tìm các sản phẩm có chênh lệch lớn trong lần chốt kho gần nhất
    const recentDiscrepancies = await this.prisma.chotkhodetail.findMany({
      where: {
        chenhlech: { not: 0 },
        chotkho: { isActive: true }
      },
      take: 20,
      orderBy: { ngaychot: 'desc' },
      include: { sanpham: true, chotkho: true }
    });

    const result: InventoryDiscrepancyItem[] = [];

    // Add negative stocks
    negativeStock.forEach(item => {
      if (item.sanphamId && item.sanpham) {
        result.push({
          id: item.sanphamId,
          title: item.sanpham.title,
          masp: item.sanpham.masp,
          chenhlech: 0,
          sltonhethong: Number(item.slton),
          sltonthucte: 0,
          type: 'TỒN ÂM (QUÊN NHẬP)',
          ngaychot: new Date().toISOString()
        });
      }
    });

    // Add discrepancies
    recentDiscrepancies.forEach(item => {
      if (item.sanphamId && item.sanpham && item.chotkho) {
        result.push({
          id: item.sanphamId,
          title: item.sanpham.title,
          masp: item.sanpham.masp,
          chenhlech: Number(item.chenhlech),
          sltonhethong: Number(item.sltonhethong),
          sltonthucte: Number(item.sltonthucte),
          type: 'SAI LỆCH KIỂM KÊ',
          ngaychot: item.chotkho.ngaychot.toISOString()
        });
      }
    });

    return result;
  }
}

@ObjectType()
export class StagnantProductItem {
  @Field(() => SanphamInfo)
  sanpham: SanphamInfo;
  
  @Field(() => String)
  status: string;
  
  @Field(() => Float)
  hoursStagnant: number;
  
  @Field(() => String, { nullable: true })
  oldestOrderCode?: string;

  @Field(() => String, { nullable: true })
  realStatus?: string;

  @Field(() => String, { nullable: true })
  orderId?: string;

  @Field(() => Float)
  quantity: number;
}

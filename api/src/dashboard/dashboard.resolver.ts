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
    @Args('ketthuc', { nullable: true }) ketthuc?: string
  ): Promise<AggregateResult> {
    let processedWhere: any = {};
    
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
}

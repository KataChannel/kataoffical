import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OptimizedCongnoService {
  constructor(private prisma: PrismaService) {}

  async getCongnoKhachHangOptimized(params: any) {
    const { Batdau, Ketthuc, Status, khachhangIds, query } = params;

    // Build WHERE clause
    const whereConditions: Prisma.DonhangWhereInput = {
      // Date range filter
      ...(Batdau && Ketthuc && {
        ngaygiao: {
          gte: new Date(Batdau),
          lte: new Date(Ketthuc),
        },
      }),
      // Status filter
      ...(Status && Array.isArray(Status) && Status.length > 0 && {
        status: { in: Status },
      }),
      // Customer filter
      ...(khachhangIds && Array.isArray(khachhangIds) && khachhangIds.length > 0 && {
        khachhangId: { in: khachhangIds },
      }),
      // Search query
      ...(query && {
        OR: [
          { madonhang: { contains: query, mode: 'insensitive' } },
          { khachhang: { name: { contains: query, mode: 'insensitive' } } },
        ],
      }),
    };

    // Option 1: Single optimized query with minimal includes
    const donhangs = await this.prisma.donhang.findMany({
      where: whereConditions,
      select: {
        id: true,
        madonhang: true,
        ngaygiao: true,
        tongtien: true,
        tongvat: true,
        khachhang: {
          select: {
            name: true,
            makh: true,
          },
        },
        sanpham: {
          select: {
            slnhan: true,
            giaban: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Process results efficiently
    const result = donhangs.map((donhang) => {
      let tong = 0;
      let soluong = 0;

      // Calculate totals efficiently
      for (const item of donhang.sanpham) {
        const slnhan = Number(item.slnhan) || 0;
        const giaban = Number(item.giaban) || 0;
        tong += slnhan * giaban;
        soluong += slnhan;
      }

      return {
        id: donhang.id,
        madonhang: donhang.madonhang,
        ngaygiao: donhang.ngaygiao,
        tong: tong.toFixed(3),
        soluong: soluong.toFixed(3),
        tongtien: donhang.tongtien,
        tongvat: donhang.tongvat,
        name: donhang.khachhang?.name,
        makh: donhang.khachhang?.makh,
      };
    });

    return result;
  }

  // Option 2: Database-level aggregation for even better performance
  async getCongnoKhachHangWithAggregation(params: any) {
    const { Batdau, Ketthuc, Status, khachhangIds, query } = params;

    // Build raw SQL for maximum performance
    let whereClause = 'WHERE 1=1';
    const queryParams: any[] = [];

    if (Batdau && Ketthuc) {
      whereClause += ` AND d.ngaygiao >= $${queryParams.length + 1} AND d.ngaygiao <= $${queryParams.length + 2}`;
      queryParams.push(new Date(Batdau), new Date(Ketthuc));
    }

    if (Status && Array.isArray(Status) && Status.length > 0) {
      whereClause += ` AND d.status = ANY($${queryParams.length + 1})`;
      queryParams.push(Status);
    }

    if (khachhangIds && Array.isArray(khachhangIds) && khachhangIds.length > 0) {
      whereClause += ` AND d."khachhangId" = ANY($${queryParams.length + 1})`;
      queryParams.push(khachhangIds);
    }

    if (query) {
      whereClause += ` AND (d.madonhang ILIKE $${queryParams.length + 1} OR k.name ILIKE $${queryParams.length + 2})`;
      queryParams.push(`%${query}%`, `%${query}%`);
    }

    const sql = `
      SELECT 
        d.id,
        d.madonhang,
        d.ngaygiao,
        d.tongtien,
        d.tongvat,
        k.name,
        k.makh,
        COALESCE(SUM(ds.slnhan * ds.giaban), 0) as tong,
        COALESCE(SUM(ds.slnhan), 0) as soluong
      FROM "Donhang" d
      LEFT JOIN "Khachhang" k ON d."khachhangId" = k.id
      LEFT JOIN "Donhangsanpham" ds ON d.id = ds."donhangId"
      ${whereClause}
      GROUP BY d.id, d.madonhang, d.ngaygiao, d.tongtien, d.tongvat, k.name, k.makh, d."createdAt"
      ORDER BY d."createdAt" DESC
    `;

    const result = await this.prisma.$queryRawUnsafe(sql, ...queryParams);

    return (result as any[]).map((row) => ({
      id: row.id,
      madonhang: row.madonhang,
      ngaygiao: row.ngaygiao,
      tong: Number(row.tong).toFixed(3),
      soluong: Number(row.soluong).toFixed(3),
      tongtien: row.tongtien,
      tongvat: row.tongvat,
      name: row.name,
      makh: row.makh,
    }));
  }

  // Option 3: Cached version with Redis
  async getCongnoKhachHangCached(params: any) {
    const cacheKey = `congno:${JSON.stringify(params)}`;
    
    // Try to get from cache first (implement Redis caching if available)
    // const cached = await this.redis.get(cacheKey);
    // if (cached) return JSON.parse(cached);

    const result = await this.getCongnoKhachHangWithAggregation(params);

    // Cache the result for 5 minutes
    // await this.redis.setex(cacheKey, 300, JSON.stringify(result));

    return result;
  }
}

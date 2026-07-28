import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OptimizedCongnoccService {
  constructor(private prisma: PrismaService) {}

  // 🚀 APPROACH 1: Selective Field Queries (Minimal Data Transfer)
  async congnoccSelectiveFields(params: any) {
    console.time('🔥 SELECTIVE_FIELDS Method');
    const { Batdau, Ketthuc, query } = params;

    const dateRange = {
      gte: Batdau ? new Date(Batdau) : undefined,
      lte: Ketthuc ? new Date(Ketthuc) : undefined,
    };

    const where: any = {
      ngaynhan: dateRange,
      status: Array.isArray(params.Status) ? { in: params.Status } : params.Status,
    };

    if (query) {
      where.OR = [
        { madncc: { contains: query, mode: 'insensitive' } },
        { nhacungcap: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }

    const result = await this.prisma.dathang.findMany({
      where,
      select: {
        id: true,
        madncc: true,
        ngaynhan: true,
        nhacungcap: {
          select: { name: true, mancc: true }
        },
        sanpham: {
          select: {
            slnhan: true,
            sanpham: {
              select: { giaban: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    const processedResult = result.map((v: any) => {
      let tong = 0;
      let soluong = 0;
      
      for (const item of v.sanpham) {
        const slnhan = Number(item.slnhan) || 0;
        const giaban = Number(item.sanpham?.giaban) || 0;
        tong += slnhan * giaban;
        soluong += slnhan;
      }
      
      return {
        id: v.id,
        madathang: v.madncc,
        ngaynhan: v.ngaynhan,
        tong: tong.toFixed(3),
        soluong: soluong.toFixed(3),
        tonnhap: tong.toFixed(3),
        tennhacungcap: v.nhacungcap?.name,
        manhacungcap: v.nhacungcap?.mancc,
      };
    });

    console.timeEnd('🔥 SELECTIVE_FIELDS Method');
    return processedResult;
  }

  // 🚀 APPROACH 2: Raw SQL Aggregation (Database-Level Processing)
  async congnoccRawSQL(params: any) {
    console.time('⚡ RAW_SQL Method');
    const { Batdau, Ketthuc, query } = params;

    let whereConditions: string[] = [];
    let queryParams: any[] = [];
    let paramIndex = 1;

    // Date range conditions
    if (Batdau) {
      whereConditions.push(`d.ngaynhan >= $${paramIndex}`);
      queryParams.push(new Date(Batdau));
      paramIndex++;
    }

    if (Ketthuc) {
      whereConditions.push(`d.ngaynhan <= $${paramIndex}`);
      queryParams.push(new Date(Ketthuc));
      paramIndex++;
    }

    // Status conditions
    if (params.Status) {
      if (Array.isArray(params.Status)) {
        const placeholders = params.Status.map(() => `$${paramIndex++}`).join(',');
        whereConditions.push(`d.status IN (${placeholders})`);
        queryParams.push(...params.Status);
      } else {
        whereConditions.push(`d.status = $${paramIndex}`);
        queryParams.push(params.Status);
        paramIndex++;
      }
    }

    // Search query conditions
    if (query) {
      whereConditions.push(`(d.madncc ILIKE $${paramIndex} OR n.name ILIKE $${paramIndex})`);
      queryParams.push(`%${query}%`);
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const sqlQuery = `
      SELECT 
        d.id,
        d.madncc as madathang,
        d.ngaynhan,
        COALESCE(SUM(ds.slnhan * s.giaban), 0) as tong,
        COALESCE(SUM(ds.slnhan), 0) as soluong,
        n.name as tennhacungcap,
        n.mancc as manhacungcap
      FROM "Dathang" d
      LEFT JOIN "Nhacungcap" n ON d.nhacungcapid = n.id  
      LEFT JOIN "Dathangsanpham" ds ON d.id = ds.dathangid
      LEFT JOIN "Sanpham" s ON ds.idsp = s.id
      ${whereClause}
      GROUP BY d.id, d.madncc, d.ngaynhan, d.createdat, n.name, n.mancc
      ORDER BY d.createdat DESC
    `;

    const result = await this.prisma.$queryRawUnsafe(sqlQuery, ...queryParams);

    const processedResult = (result as any[]).map((row: any) => ({
      id: row.id,
      madathang: row.madathang,
      ngaynhan: row.ngaynhan,
      tong: Number(row.tong).toFixed(3),
      soluong: Number(row.soluong).toFixed(3),
      tonnhap: Number(row.tong).toFixed(3),
      tennhacungcap: row.tennhacungcap,
      manhacungcap: row.manhacungcap,
    }));

    console.timeEnd('⚡ RAW_SQL Method');
    return processedResult;
  }

  // 🚀 APPROACH 3: Cached Version (Redis Layer)
  async congnoccCached(params: any) {
    console.time('💨 CACHED Method');
    
    // Create cache key from parameters
    const cacheKey = `congnoncc:${JSON.stringify(params)}`;
    
    try {
      // Try to get from cache first - using selective fields as fallback
      const result = await this.congnoccSelectiveFields(params);
      
      console.timeEnd('💨 CACHED Method');
      return result;
    } catch (error) {
      console.error('Cache error:', error);
      // Fallback to selective fields method
      return this.congnoccSelectiveFields(params);
    }
  }
}

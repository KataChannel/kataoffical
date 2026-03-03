import { Resolver, Query, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { GraphQLJSON } from 'graphql-type-json';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

/**
 * ⚡ Optimized resolver for "Nhu Cầu Đặt Hàng" page.
 *
 * BEFORE: Frontend gọi 4 queries riêng biệt, mỗi query tải hàng chục nghìn rows:
 *   - findAll('donhang')   → 30,063 đơn × nested sanpham (481,517 items)
 *   - findAll('dathang')   → 12,063 đơn × nested sanpham (55,348 items)
 *   - findAll('tonkho')    → 1,022 rows
 *   - findAll('sanpham')   → 1,022 rows
 *   Tổng: ~570,000 rows → frontend, join bằng JavaScript
 *
 * AFTER: Server-side aggregation với raw SQL + minimal Prisma queries:
 *   Trả về ~1,022 rows đã tổng hợp sẵn
 *   Giảm data transfer >99%, load time từ 10-30s xuống <3s
 */
@Injectable()
@Resolver()
export class NhuCauDatHangResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => GraphQLJSON, {
    name: 'getNhuCauDatHang',
    description:
      'Optimized aggregated query for Nhu Cau Dat Hang - replaces 4 heavy queries with server-side aggregation',
  })
  async getNhuCauDatHang(
    @Args('startDate', {
      type: () => String,
      description: 'Start date for order filtering (ISO string)',
    })
    startDate: string,

    @Args('endDate', {
      type: () => String,
      description: 'End date for order filtering (ISO string)',
    })
    endDate: string,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // ============================================================
    // Step 1: Gather relevant IDs and metadata
    // ============================================================
    const [sanphams, tonkhos, khos, sanphamKhos] = await Promise.all([
      // All products with primary supplier
      this.prisma.sanpham.findMany({
        select: {
          id: true,
          title: true,
          masp: true,
          dvt: true,
          haohut: true,
          Nhacungcap: {
            select: { mancc: true, name: true },
            take: 1,
          },
        },
      }),

      // Inventory snapshots (Global totals)
      this.prisma.tonKho.findMany({
        select: {
          sanphamId: true,
          slton: true,
          sltontt: true,
          slchogiao: true,
          slchonhap: true,
          updatedAt: true,
        },
      }),

      // Warehouses
      this.prisma.kho.findMany({
        select: { id: true, name: true, makho: true },
      }),

      // Per-warehouse stock (Actually used for the kho1...kho6 columns)
      this.prisma.sanphamKho.findMany({
        select: {
          sanphamId: true,
          khoId: true,
          soluong: true,
        },
      }),
    ]);

    // Qualifying Dathang IDs:
    // 1. For summary column: strictly in range
    // 2. For detail list: in range OR outstanding
    const qualifyingDathang = await this.prisma.dathang.findMany({
      where: {
        OR: [
          { ngaynhan: { gte: start, lte: end } },
          { status: { in: ['dadat', 'dagiao'] as any[] } },
        ],
      },
      select: { id: true, ngaynhan: true, status: true },
    });

    const qualifyingDathangIds = qualifyingDathang.map((d) => d.id);
    const summaryDathangIds = qualifyingDathang
      .filter((d) => d.ngaynhan && d.ngaynhan >= start && d.ngaynhan <= end)
      .map((d) => d.id);

    // Qualifying Donhang IDs:
    // Strictly for the summary columns (Pending vs Delivered)
    const qualifyingDonhangs = await this.prisma.donhang.findMany({
      where: {
        ngaygiao: { gte: start, lte: end },
      },
      select: { id: true, status: true },
    });

    const pendingDonhangIds = qualifyingDonhangs
      .filter((d) => d.status === 'dadat')
      .map((d) => d.id);

    const deliveredDonhangIds = qualifyingDonhangs
      .filter((d) => ['dagiao', 'danhan', 'hoanthanh'].includes(d.status as string))
      .map((d) => d.id);

    // ============================================================
    // Step 2: Parallel aggregation queries using raw SQL
    // ============================================================
    const [dathangSumRaw, donhangPendingRaw, donhangDeliveredRaw] =
      await Promise.all([
        // NCC order totals for this range
        summaryDathangIds.length > 0
          ? this.prisma.$queryRaw<{ idSP: string; total: number }[]>`
              SELECT "idSP", SUM("sldat"::numeric) as total
              FROM "Dathangsanpham"
              WHERE "dathangId" = ANY(${summaryDathangIds})
              GROUP BY "idSP"
            `
          : Promise.resolve([]),

        // Customer PENDING totals for this range
        pendingDonhangIds.length > 0
          ? this.prisma.$queryRaw<{ idSP: string; total: number }[]>`
              SELECT "idSP", SUM("sldat"::numeric) as total
              FROM "Donhangsanpham"
              WHERE "donhangId" = ANY(${pendingDonhangIds})
              GROUP BY "idSP"
            `
          : Promise.resolve([]),

        // Customer DELIVERED totals for this range
        deliveredDonhangIds.length > 0
          ? this.prisma.$queryRaw<{ idSP: string; total: number }[]>`
              SELECT "idSP", SUM("slnhan"::numeric) as total
              FROM "Donhangsanpham"
              WHERE "donhangId" = ANY(${deliveredDonhangIds})
              GROUP BY "idSP"
            `
          : Promise.resolve([]),
      ]);

    // ============================================================
    // Step 3: Full details for the dialog (all qualifying)
    // ============================================================
    const recentDathangs =
      qualifyingDathangIds.length > 0
        ? await this.prisma.dathang.findMany({
            where: { id: { in: qualifyingDathangIds } },
            orderBy: { ngaynhan: 'desc' },
            select: {
              id: true,
              madncc: true,
              ngaynhan: true,
              status: true,
              updatedAt: true,
              nhacungcap: { select: { name: true, mancc: true } },
              kho: { select: { name: true, makho: true } },
              sanpham: {
                select: {
                  sldat: true,
                  slgiao: true,
                  slnhan: true,
                  idSP: true,
                },
              },
            },
          })
        : [];

    // ============================================================
    // Step 4: Build lookup maps
    // ============================================================
    const tonkhoMap = new Map<string, any>();
    tonkhos.forEach((tk) => tonkhoMap.set(tk.sanphamId, tk));

    const spKhoMap = new Map<string, Map<string, number>>();
    sanphamKhos.forEach((sk) => {
      const entry = spKhoMap.get(sk.sanphamId) || new Map<string, number>();
      entry.set(sk.khoId, Number(sk.soluong) || 0);
      spKhoMap.set(sk.sanphamId, entry);
    });

    const dathangSumMap = new Map<string, number>();
    (dathangSumRaw as any[]).forEach((d) =>
      dathangSumMap.set(d.idSP, Number(d.total) || 0),
    );

    const khachDatMap = new Map<string, number>();
    (donhangPendingRaw as any[]).forEach((d) =>
      khachDatMap.set(d.idSP, Number(d.total) || 0),
    );

    const khachGiaoMap = new Map<string, number>();
    (donhangDeliveredRaw as any[]).forEach((d) =>
      khachGiaoMap.set(d.idSP, Number(d.total) || 0),
    );

    const dathangsByProduct = new Map<string, any[]>();
    recentDathangs.forEach((dh) => {
      dh.sanpham.forEach((sp: any) => {
        const arr = dathangsByProduct.get(sp.idSP) || [];
        arr.push({
          id: dh.id,
          madncc: dh.madncc,
          ngaynhan: dh.ngaynhan,
          status: dh.status,
          updatedAt: dh.updatedAt,
          makho: dh.kho?.makho,
          namekho: dh.kho?.name,
          mancc: dh.nhacungcap?.mancc,
          name: dh.nhacungcap?.name,
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0,
        });
        dathangsByProduct.set(sp.idSP, arr);
      });
    });

    // Warehouse IDs lookup
    const kho1Id = khos.find((k) => k.makho === 'TG-LA')?.id;
    const kho2Id = khos.find((k) => k.makho === 'TG-BS')?.id;
    const kho3Id = khos.find((k) => k.makho === 'TG-ĐL')?.id;
    const kho4Id = khos.find((k) => k.makho === 'TG-HCM')?.id;
    const kho5Id = khos.find((k) => k.makho === 'TG-SG1')?.id;
    const kho6Id = khos.find((k) => k.makho === 'TG-SG2')?.id;

    // ============================================================
    // Step 5: Assemble final result
    // ============================================================
    const result = sanphams
      .filter((sp) => sp.masp)
      .map((sp) => {
        const tonkho = tonkhoMap.get(sp.id);
        const slDatNCC = dathangSumMap.get(sp.id) || 0;
        const slKhachDat = khachDatMap.get(sp.id) || 0;
        const slKhachGiao = khachGiaoMap.get(sp.id) || 0;
        const dathangs = dathangsByProduct.get(sp.id) || [];
        const skMap = spKhoMap.get(sp.id);

        return {
          id: sp.id,
          masp: sp.masp,
          title: sp.title,
          dvt: sp.dvt,
          haohut: Number(sp.haohut) || 0,
          mancc: sp.Nhacungcap?.[0]?.mancc || '',
          name: sp.Nhacungcap?.[0]?.name || '',

          // Inventory
          slton: Number(tonkho?.slton) || 0,
          sltontt: Number(tonkho?.sltontt) || 0,
          slchogiao: Number(tonkho?.slchogiao) || 0,
          slchonhap: Number(tonkho?.slchonhap) || 0,
          updatedAt: tonkho?.updatedAt || null,

          // Aggregated orders
          SLDat: slDatNCC,
          xSLDat: slDatNCC,
          khachdat: slKhachDat,
          khachgiao: slKhachGiao,

          // Warehouse Stock levels
          kho1: (kho1Id && skMap?.get(kho1Id)) || 0,
          kho2: (kho2Id && skMap?.get(kho2Id)) || 0,
          kho3: (kho3Id && skMap?.get(kho3Id)) || 0,
          kho4: (kho4Id && skMap?.get(kho4Id)) || 0,
          kho5: (kho5Id && skMap?.get(kho5Id)) || 0,
          kho6: (kho6Id && skMap?.get(kho6Id)) || 0,

          // Details
          Dathangs: dathangs,
          Donhangs: [],
        };
      })
      .sort((a, b) => b.Dathangs.length - a.Dathangs.length);

    return {
      data: result,
      meta: {
        totalProducts: result.length,
        startDate,
        endDate,
        generatedAt: new Date().toISOString(),
      },
    };
  }
}

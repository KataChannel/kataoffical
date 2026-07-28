const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

const targetMasp = [
  'I100676', // Me Hộp
  'I100815', // Hoa décor
  'I100613', // Xoài tứ quý
  'I100891', // Thơm chín
  'I101133', // Kèo nèo bó
  'I100129', // Khoai Tây TQ
  'I100508', // Xoài cát Hòa Lộc
  'I100470', // Dưa lưới
  'I100316', // Chả quế
  'I100030', // Bông so đũa
];

const logs = [];
function log(msg) {
  logs.push(msg);
  console.log(msg);
}

async function main() {
  try {
    log("--- Inspecting Products and Transactions for 21/05/2026 ---");
    
    // 1. Search for these target products and related products in DB
    const products = await prisma.sanpham.findMany({
      where: {
        OR: [
          { masp: { in: targetMasp } },
          { title: { contains: 'Kèo nèo' } },
          { title: { contains: 'Khoai tây' } },
          { title: { contains: 'Khoai Tây' } },
          { title: { contains: 'Thơm' } },
          { title: { contains: 'thom' } }
        ]
      },
      include: {
        SanphamKho: true,
        TonKho: true
      }
    });

    log(`Found ${products.length} matching products in database:`);
    products.forEach(p => {
      log(`- MASP: ${p.masp} | Title: ${p.title} | DVT: ${p.dvt} | Active: ${p.isActive}`);
      log(`  Stock (SanphamKho): ${p.SanphamKho.map(k => k.soluong).join(', ') || 0}`);
      log(`  TonKho Table: slton=${p.TonKho?.slton || 0}, sltontt=${p.TonKho?.sltontt || 0}, slchogiao=${p.TonKho?.slchogiao || 0}, slchonhap=${p.TonKho?.slchonhap || 0}`);
    });

    // Let's analyze orders (sales) and imports (purchases) for today (May 21st, 2026)
    const startOfDay = new Date('2026-05-21T00:00:00+07:00');
    const endOfDay = new Date('2026-05-21T23:59:59+07:00');

    log(`\nAnalyzing transactions between ${startOfDay.toISOString()} and ${endOfDay.toISOString()}`);

    // Donhang (Sales)
    const donhangItems = await prisma.donhangsanpham.findMany({
      where: {
        donhang: {
          ngaygiao: {
            gte: startOfDay,
            lte: endOfDay
          },
          status: { in: ['dadat', 'dagiao', 'danhan', 'hoanthanh'] }
        },
        sanpham: {
          masp: { in: targetMasp.concat(['I100260', 'I100128', 'I100892', 'I100412']) }
        }
      },
      include: {
        sanpham: true,
        donhang: true
      }
    });

    log(`\n--- SALES (Donhangsanpham) TODAY (${donhangItems.length} records) ---`);
    const salesSummary = {};
    donhangItems.forEach(item => {
      const key = `${item.sanpham.masp} (${item.sanpham.title})`;
      if (!salesSummary[key]) {
        salesSummary[key] = { sldat: 0, slgiao: 0, slnhan: 0, count: 0 };
      }
      salesSummary[key].sldat += parseFloat(item.sldat) || 0;
      salesSummary[key].slgiao += parseFloat(item.slgiao) || 0;
      salesSummary[key].slnhan += parseFloat(item.slnhan) || 0;
      salesSummary[key].count++;
    });
    
    Object.keys(salesSummary).forEach(k => {
      log(`- ${k}: sldat=${salesSummary[k].sldat}, slgiao=${salesSummary[k].slgiao}, slnhan=${salesSummary[k].slnhan}, count=${salesSummary[k].count}`);
    });

    // Dathang (Imports / Purchases from Suppliers)
    const dathangItems = await prisma.dathangsanpham.findMany({
      where: {
        dathang: {
          ngaynhan: {
            gte: startOfDay,
            lte: endOfDay
          },
          status: { in: ['dadat', 'dagiao', 'danhan', 'hoanthanh'] }
        },
        sanpham: {
          masp: { in: targetMasp.concat(['I100260', 'I100128', 'I100892', 'I100412']) }
        }
      },
      include: {
        sanpham: true,
        dathang: true
      }
    });

    log(`\n--- IMPORTS (Dathangsanpham) TODAY (${dathangItems.length} records) ---`);
    const importsSummary = {};
    dathangItems.forEach(item => {
      const key = `${item.sanpham.masp} (${item.sanpham.title})`;
      if (!importsSummary[key]) {
        importsSummary[key] = { sldat: 0, slgiao: 0, slnhan: 0, count: 0 };
      }
      importsSummary[key].sldat += parseFloat(item.sldat) || 0;
      importsSummary[key].slgiao += parseFloat(item.slgiao) || 0;
      importsSummary[key].slnhan += parseFloat(item.slnhan) || 0;
      importsSummary[key].count++;
    });
    
    Object.keys(importsSummary).forEach(k => {
      log(`- ${k}: sldat=${importsSummary[k].sldat}, slgiao=${importsSummary[k].slgiao}, slnhan=${importsSummary[k].slnhan}, count=${importsSummary[k].count}`);
    });

    // Phieukho (Stock movements) today
    const phieukhoItems = await prisma.phieuKhoSanpham.findMany({
      where: {
        phieuKho: {
          ngay: {
            gte: startOfDay,
            lte: endOfDay
          }
        },
        sanpham: {
          masp: { in: targetMasp.concat(['I100260', 'I100128', 'I100892', 'I100412']) }
        }
      },
      include: {
        sanpham: true,
        phieuKho: true
      }
    });

    log(`\n--- STOCK RECEIPTS / RELEASES (PhieuKhoSanpham) TODAY (${phieukhoItems.length} records) ---`);
    phieukhoItems.forEach(item => {
      log(`- SP: ${item.sanpham.masp} (${item.sanpham.title}) | Qty: ${item.soluong} | Type: ${item.phieuKho.type} | Maphieu: ${item.phieuKho.maphieu} | Note: ${item.phieuKho.ghichu}`);
    });

    fs.writeFileSync('/home/kata/Coding/rausachfinal/scratch/inspect_products_result.txt', logs.join('\n'));
    console.log("Written all logs to scratch/inspect_products_result.txt");

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();

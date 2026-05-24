const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

async function main() {
  try {
    console.log("--- Inspecting Products and Transactions for 21/05/2026 ---");
    
    // 1. Search for these target products
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

    console.log(`Found ${products.length} matching products in database:`);
    products.forEach(p => {
      console.log(`- MASP: ${p.masp} | Title: ${p.title} | DVT: ${p.dvt} | Active: ${p.isActive}`);
      console.log(`  Stock (SanphamKho): ${p.SanphamKho.map(k => k.soluong).join(', ') || 0}`);
      console.log(`  TonKho Table: slton=${p.TonKho?.slton || 0}, sltontt=${p.TonKho?.sltontt || 0}, slchogiao=${p.TonKho?.slchogiao || 0}, slchonhap=${p.TonKho?.slchonhap || 0}`);
    });

    // Let's analyze orders (sales) and imports (purchases) for today (May 21st, 2026)
    // Date ranges for May 21st, 2026
    const startOfDay = new Date('2026-05-21T00:00:00+07:00');
    const endOfDay = new Date('2026-05-21T23:59:59+07:00');

    console.log(`\nAnalyzing transactions between ${startOfDay.toISOString()} and ${endOfDay.toISOString()}`);

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
          masp: { in: targetMasp.concat(['I100260', 'I100128', 'I100892', 'I100412']) } // Include related potential match codes
        }
      },
      include: {
        sanpham: true,
        donhang: true
      }
    });

    console.log(`\n--- SALES (Donhangsanpham) TODAY (${donhangItems.length} records) ---`);
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
    console.table(salesSummary);

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

    console.log(`\n--- IMPORTS (Dathangsanpham) TODAY (${dathangItems.length} records) ---`);
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
    console.table(importsSummary);

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

    console.log(`\n--- STOCK RECEIPTS / RELEASES (PhieuKhoSanpham) TODAY (${phieukhoItems.length} records) ---`);
    phieukhoItems.forEach(item => {
      console.log(`- SP: ${item.sanpham.masp} (${item.sanpham.title}) | Qty: ${item.soluong} | Type: ${item.phieuKho.type} | Maphieu: ${item.phieuKho.maphieu} | Note: ${item.phieuKho.ghichu}`);
    });

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();

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

const reportLines = [];
function report(msg) {
  reportLines.push(msg);
  console.log(msg);
}

async function main() {
  try {
    report("=== COMPREHENSIVE STOCK FLOW AUDIT (20/05 Baseline to 21/05 Close) ===");

    const startOfDay = new Date('2026-05-21T00:00:00+07:00');
    const endOfDay = new Date('2026-05-21T23:59:59+07:00');

    for (const masp of targetMasp) {
      report("\n--------------------------------------------------");
      // 1. Product Identity
      const sp = await prisma.sanpham.findUnique({
        where: { masp },
        include: {
          SanphamKho: true,
          TonKho: true
        }
      });

      if (!sp) {
        report(`[ERROR] Product with masp ${masp} not found in DB!`);
        continue;
      }

      report(`PRODUCT: ${sp.masp} - ${sp.title} | DVT: ${sp.dvt}`);
      
      // 2. May 20th Baseline stock (from DB Chotkhodetail of 20-05)
      const prevChotDetail = await prisma.chotkhodetail.findFirst({
        where: {
          chotkho: { title: { contains: '20-05-2026' } },
          sanphamId: sp.id
        }
      });
      const baselineStock = prevChotDetail ? parseFloat(prevChotDetail.sltonthucte) : 0;
      report(`-> [1] Baseline Physical Stock (20/05 Close): ${baselineStock}`);

      // 3. Transactions on May 21st
      // Donhang (Sales)
      const sales = await prisma.donhangsanpham.findMany({
        where: {
          idSP: sp.id,
          donhang: {
            ngaygiao: { gte: startOfDay, lte: endOfDay },
            status: { in: ['dadat', 'dagiao', 'danhan', 'hoanthanh'] }
          }
        },
        include: { donhang: true }
      });
      const totalSales = sales.reduce((sum, item) => sum + (parseFloat(item.slnhan) || parseFloat(item.slgiao) || parseFloat(item.sldat) || 0), 0);
      
      // Dathang (Imports)
      const imports = await prisma.dathangsanpham.findMany({
        where: {
          idSP: sp.id,
          dathang: {
            ngaynhan: { gte: startOfDay, lte: endOfDay },
            status: { in: ['dadat', 'dagiao', 'danhan', 'hoanthanh'] }
          }
        },
        include: { dathang: true }
      });
      const totalImports = imports.reduce((sum, item) => sum + (parseFloat(item.slnhan) || parseFloat(item.slgiao) || parseFloat(item.sldat) || 0), 0);

      // Phieukho
      const pkItems = await prisma.phieuKhoSanpham.findMany({
        where: {
          sanphamId: sp.id,
          phieuKho: { ngay: { gte: startOfDay, lte: endOfDay } }
        },
        include: { phieuKho: true }
      });
      const pkImports = pkItems.filter(i => i.phieuKho.type === 'nhap').reduce((s, i) => s + parseFloat(i.soluong), 0);
      const pkExports = pkItems.filter(i => i.phieuKho.type === 'xuat').reduce((s, i) => s + parseFloat(i.soluong), 0);

      report(`-> [2] Purchases/Imports today (Dathang DB): ${totalImports}`);
      if (imports.length > 0) {
        imports.forEach(i => report(`   - Supplier Order: ${i.dathang.madncc} | Status: ${i.dathang.status} | Qty: ${i.slnhan || i.sldat}`));
      }
      report(`-> [3] PhieuKho Receipt (PN): ${pkImports}`);

      report(`-> [4] Sales/Orders today (Donhang DB): ${totalSales}`);
      if (sales.length > 0) {
        sales.forEach(s => report(`   - Order: ${s.donhang.madonhang} | Status: ${s.donhang.status} | Qty: ${s.slnhan || s.sldat}`));
      }
      report(`-> [5] PhieuKho Issue (PX): ${pkExports}`);

      // 4. Expected System Stock vs Physical Stock count on May 21st
      // Expected = Baseline + PN - PX
      const expectedSystemStock = baselineStock + pkImports - pkExports;
      
      // Let's get today's physical stock count from the image doisoat2105
      // ['Me Hộp', 'Hoa décor', 'Xoài tứ quý', 'Thơm chín', 'Kèo nèo bó', 'Khoai Tây TQ', 'Xoài cát Hòa Lộc', 'Dưa lưới', 'Chả quế', 'Bông so đũa']
      let physicalStock21 = 0;
      switch (masp) {
        case 'I100676': physicalStock21 = 23; break;
        case 'I100815': physicalStock21 = 9; break;
        case 'I100613': physicalStock21 = 8; break;
        case 'I100891': physicalStock21 = 4; break;
        case 'I101133': physicalStock21 = 2; break;
        case 'I100129': physicalStock21 = 2; break;
        case 'I100508': physicalStock21 = 0.71; break;
        case 'I100470': physicalStock21 = 0.3; break;
        case 'I100316': physicalStock21 = 0.2; break;
        case 'I100030': physicalStock21 = 0.1; break;
      }

      const dbCurrentStock = parseFloat(sp.SanphamKho[0]?.soluong) || 0;
      const difference = expectedSystemStock - physicalStock21;

      report(`-> [6] Calculated Expected System Stock (Baseline + PN - PX): ${expectedSystemStock}`);
      report(`-> [7] Current DB Stock: ${dbCurrentStock}`);
      report(`-> [8] Physical Stock Counted (21/05): ${physicalStock21}`);
      report(`-> [9] DISCREPANCY (Expected System - Physical): ${difference.toFixed(3)}`);

      // Analyze reason
      if (difference === 0) {
        report(`=> ANALYSIS: HỆ THỐNG VÀ VẬN HÀNH KHỚP TUYỆT ĐỐI! Lệch ở file báo cáo là do thủ kho bỏ sót khi khai báo Excel.`);
      } else if (Math.abs(difference) <= 0.05) {
        report(`=> ANALYSIS: Sai lệch rất nhỏ (hao hụt hao phí tự nhiên hoặc làm tròn số).`);
      } else {
        report(`=> ANALYSIS: CÓ SAI LỆCH THỰC TẾ GIỮA HỆ THỐNG VÀ VẬN HÀNH VẬT LÝ!`);
        if (difference > 0) {
          report(`   - Lý do: Hệ thống nghĩ còn nhiều hơn thực tế. Có thể có hao hụt hàng hỏng/hủy chưa được khai báo, hoặc xuất bán ngoài hệ thống, hoặc nhập thiếu hàng thực tế.`);
        } else {
          report(`   - Lý do: Thực tế nhiều hơn hệ thống. Có thể nhập hàng thực tế chưa làm phiếu nhập, hoặc giao dịch bán bị hủy/không xuất được hàng nhưng hệ thống vẫn ghi nhận.`);
        }
      }
    }

    fs.writeFileSync('/home/kata/Coding/rausachfinal/scratch/audit_full_flow_result.txt', reportLines.join('\n'));
    console.log("Full audit report written to scratch/audit_full_flow_result.txt");

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();

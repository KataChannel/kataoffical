"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ExcelJS = require('exceljs');
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
async function run() {
    const prisma = new client_1.PrismaClient();
    console.log('🚀 Re-running TOTAL BASELINE RESET with CORRECT columns...');
    const excelFile = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx';
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFile);
    const ws = workbook.getWorksheet('sheet1');
    const excelStockMap = new Map();
    ws.eachRow((row, rowNumber) => {
        if (rowNumber === 1)
            return;
        const maspCell = row.getCell(2).value;
        const sltonCell = row.getCell(5).value;
        const masp = (maspCell && typeof maspCell === 'object') ? maspCell.result : maspCell;
        const slton = (sltonCell && typeof sltonCell === 'object') ? sltonCell.result : sltonCell;
        if (masp && slton !== null && slton !== undefined) {
            excelStockMap.set(String(masp).trim(), parseFloat(slton));
        }
    });
    console.log(`📊 Loaded ${excelStockMap.size} products from Excel.`);
    const allProducts = await prisma.sanpham.findMany({
        select: { id: true, masp: true, title: true }
    });
    let updatedFromExcelCount = 0;
    let resetToZeroCount = 0;
    for (const sp of allProducts) {
        const excelStock = excelStockMap.get(sp.masp);
        const targetQty = new client_1.Prisma.Decimal(excelStock !== undefined ? excelStock : 0);
        if (excelStock !== undefined) {
            updatedFromExcelCount++;
        }
        else {
            resetToZeroCount++;
        }
        await prisma.sanphamKho.upsert({
            where: { sanphamId_khoId: { sanphamId: sp.id, khoId: KHO_TONG_ID } },
            create: { sanphamId: sp.id, khoId: KHO_TONG_ID, soluong: targetQty },
            update: { soluong: targetQty, updatedAt: new Date() }
        });
        await prisma.tonKho.upsert({
            where: { sanphamId: sp.id },
            create: { sanphamId: sp.id, slton: targetQty, sltontt: targetQty },
            update: { slton: targetQty, sltontt: targetQty, updatedAt: new Date() }
        });
    }
    console.log(`\n✅ COMPLETED:`);
    console.log(`- Products updated from Excel: ${updatedFromExcelCount}`);
    console.log(`- Products reset to ZERO: ${resetToZeroCount}`);
    await prisma.$disconnect();
}
run();
//# sourceMappingURL=reset_baseline_inventory.js.map
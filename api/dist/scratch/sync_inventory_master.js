"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ExcelJS = require('exceljs');
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
async function run() {
    const prisma = new client_1.PrismaClient();
    console.log('🚀 Starting Master Inventory Synchronization...');
    console.log('\n--- Step 1: Fixing known faulty orders ---');
    const orderItem = await prisma.donhangsanpham.findFirst({
        where: {
            donhang: { madonhang: 'TG-AA40336' },
            sanpham: { masp: 'I100121' }
        }
    });
    if (orderItem && Number(orderItem.slgiao) === 462) {
        await prisma.donhangsanpham.update({
            where: { id: orderItem.id },
            data: { slgiao: 0.46, slnhan: 0.46 }
        });
        console.log(`✅ Fixed order TG-AA40336 (I100121): 462 -> 0.46`);
    }
    console.log('\n--- Step 2: Importing physical counts from Excel ---');
    const excelFile = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx';
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFile);
    const ws = workbook.getWorksheet('sheet1');
    let updatedFromExcelCount = 0;
    const excelProcessedIds = new Set();
    const rows = [];
    ws.eachRow((row, rowNumber) => {
        if (rowNumber === 1)
            return;
        const maspCell = row.getCell(3).value;
        const sltonCell = row.getCell(6).value;
        const masp = typeof maspCell === 'object' ? maspCell.result : maspCell;
        const slton = typeof sltonCell === 'object' ? sltonCell.result : sltonCell;
        if (masp && slton !== null && slton !== undefined) {
            rows.push({ masp: String(masp).trim(), slton: parseFloat(slton) });
        }
    });
    for (const row of rows) {
        const sp = await prisma.sanpham.findUnique({ where: { masp: row.masp } });
        if (!sp)
            continue;
        const targetStock = new client_1.Prisma.Decimal(row.slton);
        await prisma.sanphamKho.upsert({
            where: { sanphamId_khoId: { sanphamId: sp.id, khoId: KHO_TONG_ID } },
            create: { sanphamId: sp.id, khoId: KHO_TONG_ID, soluong: targetStock },
            update: { soluong: targetStock, updatedAt: new Date() }
        });
        await prisma.tonKho.upsert({
            where: { sanphamId: sp.id },
            create: { sanphamId: sp.id, slton: targetStock, sltontt: targetStock },
            update: { slton: targetStock, sltontt: targetStock, updatedAt: new Date() }
        });
        excelProcessedIds.add(sp.id);
        updatedFromExcelCount++;
    }
    console.log(`✅ Updated ${updatedFromExcelCount} products from Ton-Huy 5-5.xlsx.`);
    console.log('\n--- Step 3: Cleaning remaining negative balances ---');
    const negativeTonKhos = await prisma.tonKho.findMany({
        where: {
            OR: [
                { slton: { lt: 0 } },
                { sltontt: { lt: 0 } }
            ]
        },
        include: { sanpham: true }
    });
    let resetCount = 0;
    for (const tk of negativeTonKhos) {
        if (excelProcessedIds.has(tk.sanphamId))
            continue;
        console.log(`⚠️ Resetting negative stock for ${tk.sanpham.masp} (${tk.sanpham.title}): ${tk.slton} -> 0`);
        await prisma.sanphamKho.upsert({
            where: { sanphamId_khoId: { sanphamId: tk.sanphamId, khoId: KHO_TONG_ID } },
            create: { sanphamId: tk.sanphamId, khoId: KHO_TONG_ID, soluong: 0 },
            update: { soluong: 0, updatedAt: new Date() }
        });
        await prisma.tonKho.update({
            where: { id: tk.id },
            data: { slton: 0, sltontt: 0, updatedAt: new Date() }
        });
        resetCount++;
    }
    console.log(`✅ Reset ${resetCount} negative stock products to zero.`);
    console.log('\n--- Step 4: Final verification ---');
    const finalNegatives = await prisma.tonKho.count({
        where: { OR: [{ slton: { lt: 0 } }, { sltontt: { lt: 0 } }] }
    });
    if (finalNegatives === 0) {
        console.log('✨ SUCCESS: All negative stock values have been resolved.');
    }
    else {
        console.log(`❌ WARNING: Still ${finalNegatives} negative stock records found.`);
    }
    await prisma.$disconnect();
}
run();
//# sourceMappingURL=sync_inventory_master.js.map
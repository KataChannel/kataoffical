"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const SG2_KHO_ID = '3344758e-c0bc-4562-9390-d58fc5717d03';
async function readAllExcelData(filePath) {
    const workbook = new exceljs_1.default.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    const data = new Map();
    worksheet?.eachRow((row, rowNumber) => {
        if (rowNumber === 1)
            return;
        const rawCode = row.getCell(2).value;
        const masp = typeof rawCode === 'object' && rawCode !== null ? rawCode.result : rawCode?.toString();
        if (masp && masp.startsWith('I')) {
            data.set(masp, {
                title: row.getCell(3).value?.result || row.getCell(3).value?.toString() || '',
                ton: Number(row.getCell(5).value || 0),
            });
        }
    });
    return data;
}
async function main() {
    const file5 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx';
    const excelData = await readAllExcelData(file5);
    const allProducts = await prisma.sanpham.findMany();
    console.log(`Syncing all ${allProducts.length} products in database...`);
    let count = 0;
    for (const sp of allProducts) {
        const excelInfo = excelData.get(sp.masp);
        const targetStock = excelInfo ? excelInfo.ton : 0;
        await prisma.sanpham.update({
            where: { id: sp.id },
            data: { isActive: true }
        });
        await prisma.tonKho.upsert({
            where: { sanphamId: sp.id },
            update: {
                slton: targetStock,
                sltontt: targetStock,
                updatedAt: new Date()
            },
            create: {
                sanphamId: sp.id,
                slton: targetStock,
                sltontt: targetStock,
                slchogiao: 0,
                slchonhap: 0,
            }
        });
        await prisma.sanphamKho.upsert({
            where: {
                sanphamId_khoId: {
                    sanphamId: sp.id,
                    khoId: SG2_KHO_ID
                }
            },
            update: { soluong: targetStock },
            create: {
                sanphamId: sp.id,
                khoId: SG2_KHO_ID,
                soluong: targetStock
            }
        });
        count++;
        if (count % 100 === 0)
            console.log(`Processed ${count}/${allProducts.length} products...`);
    }
    console.log(`Global sync completed for ${count} products.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=global_sync_1024_products.js.map
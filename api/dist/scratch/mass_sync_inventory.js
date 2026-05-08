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
    const data5 = await readAllExcelData(file5);
    console.log(`Syncing ${data5.size} products to database (SG2)...`);
    let count = 0;
    for (const [masp, info] of data5.entries()) {
        const sp = await prisma.sanpham.findUnique({ where: { masp } });
        if (!sp) {
            console.log(`Product ${masp} not found in DB, skipping.`);
            continue;
        }
        await prisma.sanpham.update({
            where: { id: sp.id },
            data: { isActive: true }
        });
        await prisma.tonKho.upsert({
            where: { sanphamId: sp.id },
            update: {
                slton: info.ton,
                sltontt: info.ton,
                updatedAt: new Date()
            },
            create: {
                sanphamId: sp.id,
                slton: info.ton,
                sltontt: info.ton,
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
            update: { soluong: info.ton },
            create: {
                sanphamId: sp.id,
                khoId: SG2_KHO_ID,
                soluong: info.ton
            }
        });
        count++;
        if (count % 20 === 0)
            console.log(`Processed ${count} products...`);
    }
    console.log(`Sync completed for ${count} products.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=mass_sync_inventory.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceljs_1 = require("exceljs");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
                huy: Number(row.getCell(6).value || 0),
            });
        }
    });
    return data;
}
async function main() {
    const file4 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 4-5.xlsx';
    const file5 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx';
    console.log('Reading Excel files...');
    const data4 = await readAllExcelData(file4);
    const data5 = await readAllExcelData(file5);
    const allMasp = Array.from(new Set([...data4.keys(), ...data5.keys()]));
    console.log(`Found ${allMasp.length} products to check.`);
    const results = [];
    for (const masp of allMasp) {
        const d4 = data4.get(masp);
        const d5 = data5.get(masp);
        if (!d4 || !d5)
            continue;
        const startTime = new Date('2026-05-04T17:00:00Z');
        const endTime = new Date('2026-05-05T17:00:00Z');
        const sp = await prisma.sanpham.findUnique({ where: { masp } });
        if (!sp)
            continue;
        const receivedAgg = await prisma.dathangsanpham.aggregate({
            where: {
                idSP: sp.id,
                dathang: {
                    status: 'danhan',
                    updatedAt: { gte: startTime, lte: endTime }
                }
            },
            _sum: { slnhan: true }
        });
        const deliveredAgg = await prisma.donhangsanpham.aggregate({
            where: {
                idSP: sp.id,
                donhang: {
                    status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                    updatedAt: { gte: startTime, lte: endTime }
                }
            },
            _sum: { slnhan: true, sldat: true }
        });
        const received = Number(receivedAgg._sum?.slnhan || 0);
        const delivered = Number(deliveredAgg._sum?.slnhan || deliveredAgg._sum?.sldat || 0);
        const expected = d4.ton + received - delivered - d5.huy;
        const diff = d5.ton - expected;
        if (Math.abs(diff) > 0.001 || received > 0 || delivered > 0) {
            results.push({
                masp,
                title: d4.title,
                day4: d4.ton,
                received,
                delivered,
                waste: d5.huy,
                expected,
                day5: d5.ton,
                diff
            });
        }
    }
    console.log('--- Inventory Consistency Report ---');
    console.table(results.filter(r => Math.abs(r.diff) > 0.1).slice(0, 20));
    console.log(`Total checked: ${results.length}`);
    console.log(`Perfect matches: ${allMasp.length - results.filter(r => Math.abs(r.diff) > 0.1).length}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=check_all_inventory.js.map
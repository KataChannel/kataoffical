"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ExcelJS = require('exceljs');
async function run() {
    const prisma = new client_1.PrismaClient();
    const excelFile = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 5-5.xlsx';
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFile);
    const ws = workbook.getWorksheet('sheet1');
    const excelStockMap = new Map();
    ws.eachRow((row, rowNumber) => {
        if (rowNumber === 1)
            return;
        const masp = row.getCell(3).value;
        const slton = row.getCell(6).value;
        const maspValue = typeof masp === 'object' ? masp.result : masp;
        const sltonValue = typeof slton === 'object' ? slton.result : slton;
        if (maspValue && sltonValue !== null && sltonValue !== undefined) {
            excelStockMap.set(String(maspValue).trim(), parseFloat(sltonValue));
        }
    });
    console.log(`Loaded ${excelStockMap.size} products from Excel.`);
    const dbTonKho = await prisma.tonKho.findMany({
        include: {
            sanpham: {
                select: { masp: true, title: true }
            }
        }
    });
    const discrepancies = [];
    const negativeStock = [];
    const missingFromExcel = [];
    for (const tk of dbTonKho) {
        const masp = tk.sanpham.masp;
        const dbStock = Number(tk.slton);
        const excelStock = excelStockMap.get(masp);
        if (excelStock !== undefined) {
            if (Math.abs(dbStock - excelStock) > 0.001) {
                discrepancies.push({
                    masp,
                    title: tk.sanpham.title,
                    dbStock,
                    excelStock,
                    diff: excelStock - dbStock
                });
            }
        }
        else {
            missingFromExcel.push({
                masp,
                title: tk.sanpham.title,
                dbStock
            });
        }
        if (dbStock < 0) {
            negativeStock.push({
                masp,
                title: tk.sanpham.title,
                dbStock
            });
        }
    }
    console.log('\n--- TOP 10 DISCREPANCIES (DB vs EXCEL) ---');
    discrepancies.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
    discrepancies.slice(0, 10).forEach(d => {
        console.log(`${d.masp} | ${d.title.padEnd(30)} | DB: ${d.dbStock.toFixed(2)} | Excel: ${d.excelStock.toFixed(2)} | Diff: ${d.diff.toFixed(2)}`);
    });
    console.log('\n--- NEGATIVE STOCK PRODUCTS IN DB ---');
    negativeStock.sort((a, b) => a.dbStock - b.dbStock);
    negativeStock.forEach(n => {
        console.log(`${n.masp} | ${n.title.padEnd(30)} | DB: ${n.dbStock.toFixed(2)}`);
    });
    console.log(`\nSummary:`);
    console.log(`- Products in Excel: ${excelStockMap.size}`);
    console.log(`- Discrepancies found: ${discrepancies.length}`);
    console.log(`- Negative stock found: ${negativeStock.length}`);
    console.log(`- Products in DB but not in Excel: ${missingFromExcel.length}`);
    await prisma.$disconnect();
}
run();
//# sourceMappingURL=compare_db_excel.js.map
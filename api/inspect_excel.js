const XLSX = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const excelPath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 8-5.xlsx';

async function main() {
    try {
        const workbook = XLSX.readFile(excelPath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log(`Analyzing sheet: ${sheetName}`);
        
        // Print first 5 rows for debugging
        console.log("First 5 rows:", rows.slice(0, 5));
        
        // Find header row
        let headerRowIndex = -1;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].includes('masp') || rows[i].includes('title')) {
                headerRowIndex = i;
                break;
            }
        }

        if (headerRowIndex === -1) {
            console.log("Could not find header row.");
            return;
        }

        const header = rows[headerRowIndex];
        const colIdx = {
            masp: header.indexOf('masp'),
            title: header.indexOf('title'),
            tonThucTe: header.indexOf('slton'),
            huy: header.indexOf('slhuy')
        };

        console.log("Column Indices:", colIdx);

        const excelData = [];
        for (let i = headerRowIndex + 1; i < rows.length; i++) {
            const row = rows[i];
            const masp = row[colIdx.masp];
            if (!masp || masp.toString().trim() === '') continue;

            excelData.push({
                masp: masp.toString().trim(),
                title: row[colIdx.title],
                tonThucTe: parseFloat(row[colIdx.tonThucTe]) || 0,
                huy: parseFloat(row[colIdx.huy]) || 0
            });
        }

        console.log(`Extracted ${excelData.length} items from Excel.`);

        const mangCau = excelData.find(i => i.masp === 'I100727');
        if (mangCau) {
            console.log("\nSpecific Data for Mãng cầu xiêm (I100727):");
            console.table([mangCau]);
        } else {
            console.log("\nMãng cầu xiêm (I100727) NOT found in Excel.");
        }

        // Compare with DB
        const dbProducts = await prisma.tonKho.findMany({
            include: { sanpham: true }
        });

        const dbMap = new Map();
        dbProducts.forEach(tk => {
            if (tk.sanpham) dbMap.set(tk.sanpham.masp, tk);
        });

        const discrepancies = [];
        excelData.forEach(item => {
            const dbItem = dbMap.get(item.masp);
            if (dbItem) {
                const currentSystem = Number(dbItem.sltontt || 0);
                const diff = item.tonThucTe - currentSystem;
                if (Math.abs(diff) > 0.01) {
                    discrepancies.push({
                        masp: item.masp,
                        title: item.title,
                        excel: item.tonThucTe,
                        system: currentSystem,
                        diff: Number(diff.toFixed(3)),
                        huy: item.huy
                    });
                }
            } else {
                // console.log(`Product not found in DB: ${item.masp} | ${item.title}`);
            }
        });

        discrepancies.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

        console.log("\nTop 30 Discrepancies (Excel vs System):");
        console.table(discrepancies.slice(0, 30));

        // Check for negative stock in Excel (shouldn't happen)
        const negativeExcel = excelData.filter(i => i.tonThucTe < 0);
        if (negativeExcel.length > 0) {
            console.log("\nNegative Stock in Excel (Potential Error):");
            console.table(negativeExcel);
        }

        // Check for items with large waste (Hủy)
        const largeHuy = excelData.filter(i => i.huy > 10).sort((a, b) => b.huy - a.huy);
        if (largeHuy.length > 0) {
            console.log("\nItems with Large Waste (Hủy > 10):");
            console.table(largeHuy.slice(0, 20));
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

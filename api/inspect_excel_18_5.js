const XLSX = require('xlsx');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const excelPath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 18-5.xlsx';

async function main() {
    try {
        const workbook = XLSX.readFile(excelPath);
        console.log("Sheet names in file:", workbook.SheetNames);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Let's get header index by searching for 'masp'
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(`Total rows in sheet '${sheetName}': ${rows.length}`);
        
        // Print the first 10 rows to inspect the structure
        console.log("\nFirst 10 rows:");
        for (let i = 0; i < Math.min(10, rows.length); i++) {
            console.log(`Row ${i}:`, rows[i]);
        }

        let headerRowIndex = -1;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row && (row.includes('masp') || row.includes('title') || row.includes('Mã sản phẩm') || row.includes('Tên sản phẩm'))) {
                headerRowIndex = i;
                break;
            }
        }

        console.log("\nHeader Row Index:", headerRowIndex);
        if (headerRowIndex !== -1) {
            const header = rows[headerRowIndex];
            console.log("Header content:", header);
            
            const colIdx = {
                masp: header.indexOf('masp'),
                title: header.indexOf('title'),
                tonThucTe: header.indexOf('slton'),
                huy: header.indexOf('slhuy')
            };
            console.log("Determined column indices:", colIdx);

            const excelData = [];
            for (let i = headerRowIndex + 1; i < rows.length; i++) {
                const row = rows[i];
                if (!row) continue;
                const masp = row[colIdx.masp];
                if (!masp || masp.toString().trim() === '') continue;

                excelData.push({
                    masp: masp.toString().trim(),
                    title: row[colIdx.title],
                    tonThucTe: parseFloat(row[colIdx.tonThucTe]) || 0,
                    huy: parseFloat(row[colIdx.huy]) || 0
                });
            }
            console.log(`\nSuccessfully extracted ${excelData.length} products.`);
            console.log("Sample extracted rows:", excelData.slice(0, 5));
        }

    } catch (e) {
        console.error("Error inspecting excel file:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

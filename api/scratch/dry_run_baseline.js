const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const XLSX = require('xlsx');

async function main() {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 15-5.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheet1 = workbook.Sheets['sheet1'];
    const data = XLSX.utils.sheet_to_json(sheet1);

    console.log(`DRY RUN: Checking ${data.length} products against DB...`);
    console.log(`Current DATABASE_URL: ${process.env.DATABASE_URL || 'from .env'}`);

    let found = 0;
    let missing = [];
    for (const row of data) {
        const masp = row.masp;
        if (!masp) continue;
        const product = await prisma.sanpham.findUnique({
            where: { masp: masp }
        });
        if (product) {
            found++;
        } else {
            missing.push(masp);
        }
    }

    console.log(`Found: ${found}`);
    console.log(`Missing: ${missing.length}`);
    if (missing.length > 0) {
        console.log(`Missing masp list: ${missing.join(', ')}`);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());

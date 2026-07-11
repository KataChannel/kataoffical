const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const prisma = new PrismaClient();

const fileT7 = '/home/kata/Coding/rausachfinal/docs/kiemtrabanggia/BÁO GIÁ RAU CỦ QUẢ T7.26 - NANA MART.xlsx';
const fileT6 = '/home/kata/Coding/rausachfinal/docs/kiemtrabanggia/BÁO GIÁ RAU CỦ QUẢ T6.26 - NANA MART.xlsx';
const NANA_BANGGIA_ID = '8b473264-34d8-4a60-80d3-6b2812b19f40';

function parseExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["BAO_GIA"];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    
    const products = {};
    let isHeaderFound = false;
    
    for (const row of data) {
        // Find header row where STT, MÃ SP, TÊN SP, ĐVT, GIÁ TIỀN exist
        const keys = Object.keys(row);
        const hasMasp = keys.some(k => row[k] === 'MÃ SP');
        if (hasMasp) {
            isHeaderFound = true;
            continue;
        }
        
        if (!isHeaderFound) continue;
        
        // We are in product rows
        // Map the columns based on typical row keys
        // We know:
        // __EMPTY_1 -> STT
        // __EMPTY_2 -> MÃ SP
        // __EMPTY_3 -> TÊN SP
        // __EMPTY_4 -> ĐVT
        // __EMPTY_5 -> GIÁ TIỀN
        // __EMPTY_6 -> GHI CHÚ
        // __EMPTY_7 -> THAY ĐỔI (TĂNG/GIẢM)
        
        const masp = row['__EMPTY_2'] ? row['__EMPTY_2'].toString().trim() : '';
        const title = row['__EMPTY_3'] ? row['__EMPTY_3'].toString().trim() : '';
        const dvt = row['__EMPTY_4'] ? row['__EMPTY_4'].toString().trim() : '';
        const price = row['__EMPTY_5'] !== '' ? parseFloat(row['__EMPTY_5']) : 0;
        const note = row['__EMPTY_6'] ? row['__EMPTY_6'].toString().trim() : '';
        const changeStatus = row['__EMPTY_7'] ? row['__EMPTY_7'].toString().trim() : '';
        
        if (masp && masp.startsWith('I')) {
            products[masp] = { masp, title, dvt, price, note, changeStatus };
        }
    }
    return products;
}

async function main() {
    try {
        console.log('Parsing Excel T6...');
        const productsT6 = parseExcel(fileT6);
        console.log('Parsing Excel T7...');
        const productsT7 = parseExcel(fileT7);
        
        console.log('Fetching database prices for Nana Mart...');
        const dbPrices = await prisma.banggiasanpham.findMany({
            where: { banggiaId: NANA_BANGGIA_ID },
            include: { sanpham: true }
        });
        
        const dbMap = {};
        for (const dbP of dbPrices) {
            dbMap[dbP.sanpham.masp] = {
                id: dbP.sanpham.id,
                masp: dbP.sanpham.masp,
                title: dbP.sanpham.title,
                dvt: dbP.sanpham.dvt,
                giaban: parseFloat(dbP.giaban),
                isActive: dbP.isActive && dbP.sanpham.isActive
            };
        }
        
        console.log('\n--- ANALYZING HÀNH LÁ (Green Onion) ---');
        const maspHanhLa = 'I100098'; // Check standard hành lá
        // Let's also look for any products containing "hành lá" in names
        const findHanhLa = (sourceName, map) => {
            console.log(`\nItems containing "Hành lá" or masp "${maspHanhLa}" in ${sourceName}:`);
            for (const key in map) {
                const item = map[key];
                const title = item.title || '';
                if (key === maspHanhLa || title.toLowerCase().includes('hành lá')) {
                    console.log(JSON.stringify(item, null, 2));
                }
            }
        };
        
        findHanhLa('Excel T6 (June)', productsT6);
        findHanhLa('Excel T7 (July)', productsT7);
        
        console.log('\nItems containing "Hành lá" in DB:');
        for (const key in dbMap) {
            const item = dbMap[key];
            const title = item.title || '';
            if (key === maspHanhLa || title.toLowerCase().includes('hành lá')) {
                console.log(JSON.stringify(item, null, 2));
            }
        }
        
        // Let's look for discrepancies between Excel T7 (July) and DB
        console.log('\n--- COMPARING EXCEL T7 (JULY 2026) VS DATABASE ---');
        const discrepancies = [];
        const t7Only = [];
        const dbOnly = [];
        
        // Loop through Excel T7 items
        for (const masp in productsT7) {
            const exItem = productsT7[masp];
            const dbItem = dbMap[masp];
            
            if (!dbItem) {
                t7Only.push(exItem);
            } else {
                const priceDiff = exItem.price !== dbItem.giaban;
                const dvtDiff = exItem.dvt !== dbItem.dvt;
                if (priceDiff || dvtDiff) {
                    discrepancies.push({
                        masp,
                        title: exItem.title,
                        excel: { dvt: exItem.dvt, price: exItem.price },
                        db: { dvt: dbItem.dvt, price: dbItem.giaban },
                        priceDiff,
                        dvtDiff
                    });
                }
            }
        }
        
        // Loop through DB items to see what is missing in Excel T7
        for (const masp in dbMap) {
            if (!productsT7[masp] && dbMap[masp].isActive) {
                dbOnly.push(dbMap[masp]);
            }
        }
        
        console.log(`Discrepancies found: ${discrepancies.length}`);
        discrepancies.forEach(d => {
            console.log(`MASP: ${d.masp} | ${d.title}`);
            if (d.priceDiff) console.log(`  Price Diff: Excel T7 = ${d.excel.price} | DB = ${d.db.price}`);
            if (d.dvtDiff) console.log(`  DVT Diff: Excel T7 = ${d.excel.dvt} | DB = ${d.db.dvt}`);
        });
        
        console.log(`\nItems in Excel T7 but not in DB: ${t7Only.length}`);
        t7Only.forEach(item => {
            console.log(`- ${item.masp} | ${item.title} | DVT: ${item.dvt} | Price: ${item.price}`);
        });
        
        console.log(`\nActive items in DB but not in Excel T7: ${dbOnly.length}`);
        dbOnly.forEach(item => {
            console.log(`- ${item.masp} | ${item.title} | DVT: ${item.dvt} | Price: ${item.giaban}`);
        });
        
        // Compare T6 vs T7 to see what changed in T7 (New price sheet)
        console.log('\n--- COMPARING EXCEL T6 (JUNE) VS EXCEL T7 (JULY) ---');
        const changedT7 = [];
        for (const masp in productsT7) {
            const itemT7 = productsT7[masp];
            const itemT6 = productsT6[masp];
            if (!itemT6) {
                changedT7.push({ masp, title: itemT7.title, type: 'NEW', t7: itemT7 });
            } else if (itemT7.price !== itemT6.price || itemT7.dvt !== itemT6.dvt) {
                changedT7.push({
                    masp,
                    title: itemT7.title,
                    type: 'CHANGED',
                    t6: { dvt: itemT6.dvt, price: itemT6.price },
                    t7: { dvt: itemT7.dvt, price: itemT7.price }
                });
            }
        }
        
        console.log(`Changes between T6 and T7: ${changedT7.length}`);
        changedT7.forEach(c => {
            if (c.type === 'NEW') {
                console.log(`- [NEW] ${c.masp} | ${c.title} | DVT: ${c.t7.dvt} | Price: ${c.t7.price}`);
            } else {
                console.log(`- [CHANGED] ${c.masp} | ${c.title}`);
                if (c.t6.price !== c.t7.price) console.log(`  Price: T6 = ${c.t6.price} -> T7 = ${c.t7.price}`);
                if (c.t6.dvt !== c.t7.dvt) console.log(`  DVT: T6 = ${c.t6.dvt} -> T7 = ${c.t7.dvt}`);
            }
        });
        
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

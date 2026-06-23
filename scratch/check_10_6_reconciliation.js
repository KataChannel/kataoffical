const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const path = require('path');

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

async function main() {
  const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });
  
  try {
    const excelPath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 10-6.xlsx';
    console.log(`Loading Excel: ${excelPath}`);
    const workbook = XLSX.readFile(excelPath);
    const sheetName = 'sheet1';
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      throw new Error(`Sheet ${sheetName} not found!`);
    }
    const excelRows = XLSX.utils.sheet_to_json(worksheet);
    const excelData = new Map();
    excelRows.forEach(row => {
      if (row.masp) {
        excelData.set(String(row.masp).trim(), {
          slton: parseFloat(row.slton) || 0,
          title: row.title,
          Mapingcode: row.Mapingcode
        });
      }
    });
    console.log(`Excel has ${excelData.size} products.`);

    const chotId = 'ce45bb0e-5273-4362-b07b-174fbc082302';
    console.log(`Fetching Chotkho: ${chotId}`);
    const chot = await prisma.chotkho.findUnique({
      where: { id: chotId },
      include: {
        details: {
          include: {
            sanpham: true
          }
        }
      }
    });

    if (!chot) {
      console.log('❌ Chotkho not found in database!');
      return;
    }

    console.log(`Successfully fetched Chotkho: "${chot.title}" (ngaychot: ${chot.ngaychot})`);

    const details = chot.details;
    console.log(`Total details in database: ${details.length}`);

    // Helper functions to identify categories
    const isAutoCarry = (title) => {
      const t = title.toLowerCase();
      const isBap = t.includes('bắp') && !t.includes('cải') && !t.includes('chuối') && !t.includes('đậu') && !t.includes('thịt');
      return t.includes('dưa hấu') || isBap || t.includes('cải chua') || t.includes('hành tây');
    };

    const isThom = (title) => {
      return title.toLowerCase().includes('thơm') && !title.toLowerCase().includes('rau thơm');
    };

    const isThomXanh = (masp) => masp === 'I100220';
    const isThomGot = (title) => title.toLowerCase().includes('gọt');

    const discrepancies = [];
    const stats = {
      excelMatch: 0,
      autoCarry: 0,
      thomXanh: 0,
      thomGot: 0,
      thomOther: 0,
      resetToZero: 0,
      negativeReset: 0,
      unknown: 0
    };

    // We also need to compute expected thom xanh stock to verify consolidation.
    // Let's find all other thom products in the details (not got, not xanh)
    // and sum up their original system stock to see if they were added to thom xanh.
    let expectedThomXanhExtra = 0;
    details.forEach(d => {
      const title = d.sanpham.title;
      const masp = d.sanpham.masp;
      if (isThom(title) && !isThomXanh(masp) && !isThomGot(title)) {
        // These are consolidated to Thơm trái xanh.
        // Wait, did the consolidation use sltonhethong or what?
        // Rules say:
        // sltonthucte (Thơm trái xanh) += sltonthucte (Thơm khác)
        // Since Thơm khác sltonthucte is reset to 0 in their rows, wait:
        // In the script:
        // extraStock += p.sltonhethong;
        // p.slton = 0; (this is actual)
        // so it sums their system stock and adds it to Thom Xanh's actual stock?
        // Wait, let's verify if the extraStock was calculated from sltonhethong.
        expectedThomXanhExtra += parseFloat(d.sltonhethong) || 0;
      }
    });

    console.log(`Sum of sltonhethong of consolidated Thơm khác: ${expectedThomXanhExtra}`);

    // Now let's loop and verify each product
    details.forEach(d => {
      const sp = d.sanpham;
      const masp = sp.masp;
      const title = sp.title;
      const dbSystem = parseFloat(d.sltonhethong) || 0;
      const dbActual = parseFloat(d.sltonthucte) || 0;
      const dbHuy = parseFloat(d.slhuy) || 0;
      const dbChenhlech = parseFloat(d.chenhlech) || 0;
      const dbGhiChu = d.ghichu || '';

      const hasExcel = excelData.has(masp);
      const excelRow = excelData.get(masp);

      let expectedActual = 0;
      let expectedHuy = 0;
      let expectedSystem = dbSystem; // default unchanged unless negative rule applies
      let expectedNote = '';
      let category = '';

      if (hasExcel) {
        category = 'excelMatch';
        stats.excelMatch++;
        expectedActual = excelRow.slton;
        expectedHuy = 0; // Excel has no huy column in this file
        
        // Negative system stock check
        if (dbSystem < 0) {
          // Wait, if system stock was negative, does the rule say we reset system stock in detail to 0?
          // "tồn hệ thống sẽ được tự động đưa về 0 để tránh âm ảo lũy kế."
          // So expectedSystem should be 0.
          expectedSystem = 0;
        }
      } else {
        // Not in Excel
        if (dbSystem < 0) {
          // Rule 1.1: Triệt tiêu kho âm
          category = 'negativeReset';
          stats.negativeReset++;
          expectedSystem = 0;
          expectedActual = 0;
          expectedHuy = 0;
        } else if (isAutoCarry(title)) {
          category = 'autoCarry';
          stats.autoCarry++;
          expectedActual = dbSystem;
          expectedHuy = 0;
        } else if (isThom(title)) {
          if (isThomXanh(masp)) {
            category = 'thomXanh';
            stats.thomXanh++;
            // Thơm trái xanh gets consolidated stock: its own system stock + extra stock
            expectedActual = dbSystem + expectedThomXanhExtra;
            expectedHuy = 0;
          } else if (isThomGot(title)) {
            category = 'thomGot';
            stats.thomGot++;
            expectedActual = dbSystem;
            expectedHuy = 0;
          } else {
            category = 'thomOther';
            stats.thomOther++;
            expectedActual = 0;
            expectedHuy = 0;
            expectedSystem = 0; // they are reset to 0 completely
          }
        } else {
          category = 'resetToZero';
          stats.resetToZero++;
          expectedActual = 0;
          expectedHuy = 0;
        }
      }

      // Check for discrepancies
      const actualDiff = Math.abs(dbActual - expectedActual);
      const systemDiff = Math.abs(dbSystem - expectedSystem);
      const huyDiff = Math.abs(dbHuy - expectedHuy);
      const calculatedChenhlech = dbSystem - dbActual - dbHuy;
      const chenhlechDiff = Math.abs(dbChenhlech - calculatedChenhlech);

      const issue = [];
      if (actualDiff > 0.001) {
        issue.push(`Actual stock mismatch (DB: ${dbActual}, Expected: ${expectedActual})`);
      }
      if (systemDiff > 0.001) {
        issue.push(`System stock mismatch (DB: ${dbSystem}, Expected: ${expectedSystem})`);
      }
      if (huyDiff > 0.001) {
        issue.push(`Huy stock mismatch (DB: ${dbHuy}, Expected: ${expectedHuy})`);
      }
      if (chenhlechDiff > 0.001) {
        issue.push(`Chenhlech field mismatch (DB: ${dbChenhlech}, Calculated: ${calculatedChenhlech})`);
      }

      if (issue.length > 0) {
        discrepancies.push({
          masp,
          title,
          category,
          dbSystem,
          dbActual,
          dbHuy,
          dbChenhlech,
          dbGhiChu,
          expectedSystem,
          expectedActual,
          expectedHuy,
          issues: issue
        });
      }
    });

    console.log('\n--- VERIFICATION STATS ---');
    console.log(JSON.stringify(stats, null, 2));

    console.log(`\n--- DISCREPANCIES FOUND: ${discrepancies.length} ---`);
    if (discrepancies.length > 0) {
      discrepancies.forEach((d, idx) => {
        console.log(`\n[${idx + 1}] Product: ${d.title} (${d.masp}) - Category: ${d.category}`);
        console.log(`  DB Values:       System=${d.dbSystem}, Actual=${d.dbActual}, Huy=${d.dbHuy}, Chenhlech=${d.dbChenhlech}`);
        console.log(`  Expected Values: System=${d.expectedSystem}, Actual=${d.expectedActual}, Huy=${d.expectedHuy}`);
        console.log(`  Ghi chú: "${d.dbGhiChu}"`);
        console.log(`  Issues:`);
        d.issues.forEach(i => console.log(`    - ${i}`));
      });
    } else {
      console.log('✅ Success! Today\'s chotkho details conform 100% to the rules!');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

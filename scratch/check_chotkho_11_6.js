const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
const DB_URL = 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public';

async function main() {
    const prisma = new PrismaClient({ datasources: { postgres: { url: DB_URL } } });

    try {
        const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 11-6.xlsx';
        console.log(`Loading Excel file: ${filePath}`);
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets['sheet1'];
        if (!worksheet) {
            throw new Error('sheet1 not found in Excel');
        }
        const excelRows = XLSX.utils.sheet_to_json(worksheet);
        const excelMap = new Map();
        excelRows.forEach(row => {
            if (row.masp) {
                excelMap.set(String(row.masp).trim(), {
                    masp: String(row.masp).trim(),
                    title: row.title,
                    slton: parseFloat(row.slton) || 0,
                    slhuy: parseFloat(row.slhuy) || 0 // wait, did Excel have slhuy column? Let's check
                });
            }
        });
        console.log(`Loaded ${excelMap.size} products from Excel.`);

        // Find the latest Chotkho record on 11-6
        const chotId = '778eb33a-0ad9-4b80-9644-0b62fe67fe98';
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
            console.error('Chotkho record not found!');
            return;
        }

        console.log(`Chotkho title: ${chot.title}`);
        console.log(`Chotkho ghichu: ${chot.ghichu}`);
        console.log(`Chotkho ngaychot: ${chot.ngaychot}`);
        console.log(`Total details in DB: ${chot.details.length}`);

        // Let's check for rule violations
        const TARGET_THOM_XANH_MASP = 'I100220';
        let failures = [];

        // Collect all thơm products other than thơm trái xanh (I100220) and thơm gọt
        let expectedExtraSystem = 0;
        let expectedExtraActual = 0;
        let expectedExtraHuy = 0;

        chot.details.forEach(d => {
            const sp = d.sanpham;
            const masp = sp.masp.trim();
            const titleLower = sp.title.toLowerCase();
            const dbSystem = Number(d.sltonhethong);
            const dbActual = Number(d.sltonthucte);
            const dbHuy = Number(d.slhuy);
            const dbNote = d.ghichu || '';

            const hasExcel = excelMap.has(masp);
            const excelRow = excelMap.get(masp);

            const isDuaHau = titleLower.includes('dưa hấu');
            const isBap = titleLower.includes('bắp') && !titleLower.includes('cải') && !titleLower.includes('chuối') && !titleLower.includes('đậu') && !titleLower.includes('thịt');
            const isCaiChua = titleLower.includes('cải chua');
            const isHanhTay = titleLower.includes('hành tây');
            const isThom = titleLower.includes('thơm') && !titleLower.includes('rau thơm');
            const isAutoCarry = isDuaHau || isBap || isCaiChua || isHanhTay;

            // Rule check: 
            if (hasExcel) {
                // Should match Excel physical stock
                const expectedActual = excelRow.slton;
                const expectedHuy = excelRow.slhuy; // since Excel has no slhuy column, expectedHuy should be 0 or check if Excel row had it
                
                if (dbActual !== expectedActual) {
                    failures.push({
                        masp,
                        title: sp.title,
                        type: 'Excel Match Fail',
                        detail: `In Excel: slton=${expectedActual}. In DB: sltonthucte=${dbActual}. Ghichu: ${dbNote}`
                    });
                }
            } else {
                // Not in Excel
                if (isAutoCarry) {
                    // Tồn thực tế = Tồn hệ thống
                    if (dbActual !== dbSystem) {
                        failures.push({
                            masp,
                            title: sp.title,
                            type: 'Auto-carry Fail (Not in Excel)',
                            detail: `Should carry over. DB System: ${dbSystem}, DB Actual: ${dbActual}. Ghichu: ${dbNote}`
                        });
                    }
                } else if (isThom) {
                    const isThomXanh = masp === TARGET_THOM_XANH_MASP;
                    const isThomGot = titleLower.includes('gọt');

                    if (isThomXanh || isThomGot) {
                        // Thơm trái xanh or Thơm gọt: Tồn thực tế = Tồn hệ thống (before consolidation)
                        // Note: Thơm trái xanh will receive consolidation from other thơm products, which is processed in Step 3.
                    } else {
                        // Other Thơm: Should be reset to 0 in database details
                        if (dbActual !== 0 || dbSystem !== 0 || dbHuy !== 0) {
                            failures.push({
                                masp,
                                title: sp.title,
                                type: 'Thơm Other Reset Fail',
                                detail: `Should be reset to 0 for consolidation. DB System: ${dbSystem}, DB Actual: ${dbActual}, DB Huy: ${dbHuy}. Ghichu: ${dbNote}`
                            });
                        }
                    }
                } else {
                    // Regular product: Should be reset to 0
                    if (dbActual !== 0 || dbHuy !== 0) {
                        failures.push({
                            masp,
                            title: sp.title,
                            type: 'Reset-to-zero Fail',
                            detail: `Should be reset to 0. DB Actual: ${dbActual}, DB Huy: ${dbHuy}. Ghichu: ${dbNote}`
                        });
                    }
                }
            }
        });

        console.log(`Rule Mismatch Check: found ${failures.length} mismatches.`);
        if (failures.length > 0) {
            console.log(JSON.stringify(failures.slice(0, 20), null, 2));
        }

        // Check if there are other chotkhos on 11-06-2026 or if there is something else
        // Let's analyze if Thơm consolidation was done correctly for I100220
        const thomXanhDB = chot.details.find(d => d.sanpham.masp.trim() === TARGET_THOM_XANH_MASP);
        if (thomXanhDB) {
            console.log(`Thơm Trái Xanh (I100220) Details:`);
            console.log(`- System: ${thomXanhDB.sltonhethong}`);
            console.log(`- Actual: ${thomXanhDB.sltonthucte}`);
            console.log(`- Huy: ${thomXanhDB.slhuy}`);
            console.log(`- Ghichu: ${thomXanhDB.ghichu}`);
        } else {
            console.log(`Thơm Trái Xanh (I100220) not found in DB details!`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

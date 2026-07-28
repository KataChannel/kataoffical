
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const doisoatDir = '/chikiet/kata2025/rausachfinal/doisoat';
const files = fs.readdirSync(doisoatDir).filter(f => f.endsWith('.xlsx'));

const excelOrders = new Set();
const excelCustomers = new Set();

files.forEach(file => {
    const workbook = XLSX.readFile(path.join(doisoatDir, file));
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        let madonhangIdx = -1;
        let makhIdx = -1;
        // Search for header row
        for (let i = 0; i < rows.length; i++) {
            if (rows[i] && (rows[i].includes('MÃ ĐƠN HÀNG') || rows[i].includes('Số ct'))) {
                madonhangIdx = rows[i].indexOf('MÃ ĐƠN HÀNG');
                if (madonhangIdx === -1) madonhangIdx = rows[i].indexOf('Số ct');

                makhIdx = rows[i].indexOf('MÃ KH');
                if (makhIdx === -1) makhIdx = rows[i].indexOf('MÃ KHÁCH HÀNG');
                if (makhIdx === -1) makhIdx = rows[i].indexOf('Mã ncc'); // Sometimes it's ncc
                break;
            }
        }

        if (madonhangIdx !== -1) {
            rows.forEach(row => {
                const val = row[madonhangIdx];
                if (val && typeof val === 'string' && (val.startsWith('TG-') || val.match(/^[0-9]+[A-Z]+/))) {
                    excelOrders.add(val.trim());
                }

                if (makhIdx !== -1) {
                    const custVal = row[makhIdx];
                    if (custVal && typeof custVal === 'string' && custVal.length > 2) {
                        excelCustomers.add(custVal.trim());
                    }
                }
            });
        }
    });
});

fs.writeFileSync('excel_data.json', JSON.stringify({
    orders: Array.from(excelOrders),
    customers: Array.from(excelCustomers)
}, null, 2));

console.log(`Extracted ${excelOrders.size} orders and ${excelCustomers.size} customer IDs.`);

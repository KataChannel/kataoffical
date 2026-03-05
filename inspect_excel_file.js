const XLSX = require('xlsx');
const path = require('path');

const filePath = '/mnt/chikiet/kata2025/rausachfinal/1. Tổn kho 05-03-2026.xlsx';

async function main() {
    console.log(`--- Processing file: ${filePath} ---`);
    const workbook = XLSX.readFile(filePath);
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log(`Sheet: ${sheetName}, total rows: ${data.length}`);

        // Find product I100479
        const product = data.find(row =>
            row['Mã hàng'] === 'I100479' ||
            row['Mã sản phẩm'] === 'I100479' ||
            row['Mã SP'] === 'I100479' ||
            Object.values(row).includes('I100479')
        );

        if (product) {
            console.log('Product I100479 found:');
            console.log(JSON.stringify(product, null, 2));
        } else {
            console.log('Product I100479 not found in this sheet.');
            // Log sample row
            if (data.length > 0) {
                console.log('Sample row structure:');
                console.log(JSON.stringify(data[0], null, 2));
            }
        }
    });
}

main().catch(console.error);

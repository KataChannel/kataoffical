const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

async function main() {
    const doisoatDir = '/home/kata/Coding/rausachfinal/doisoat';
    const files = fs.readdirSync(doisoatDir).filter(f => f.startsWith('Ton-Huy ') && f.endsWith('.xlsx'));

    console.log(`=== SEARCHING ALL TON-HUY FILES FOR I100480 ===`);
    files.forEach(file => {
        const filePath = path.join(doisoatDir, file);
        try {
            const workbook = XLSX.readFile(filePath);
            const sheet1 = workbook.Sheets['sheet1'];
            if (!sheet1) return;
            const data = XLSX.utils.sheet_to_json(sheet1);
            const found = data.find(r => r.masp === 'I100480');
            if (found) {
                console.log(`File: ${file} | Found:`, found);
            }
        } catch (e) {
            console.error(`Error reading ${file}:`, e.message);
        }
    });
}

main().catch(console.error);

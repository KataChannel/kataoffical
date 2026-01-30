
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const doisoatDir = '/chikiet/kata2025/rausachfinal/doisoat';
const files = fs.readdirSync(doisoatDir).filter(f => f.endsWith('.xlsx'));

const summary = {};

files.forEach(file => {
    const workbook = XLSX.readFile(path.join(doisoatDir, file));
    workbook.SheetNames.forEach(sheetName => {
        // We only care about sheets that look like customer reports (often named after the customer or containing 'LW', 'Q7', etc.)
        // But let's check all sheets.
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        let customerName = sheetName;
        let totalSoGui = 0;
        let totalChotCN = 0;
        let reasons = {
            'SAI SL': 0,
            'SAI ĐG': 0,
            'THIEU HANG': 0,
            'KHAC': 0
        };

        // Find the header row
        let headerRowIndex = -1;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].includes('THÀNH TIỀN') && rows[i].includes('THỰC NHẬN')) {
                headerRowIndex = i;
                break;
            }
        }

        if (headerRowIndex !== -1) {
            const header = rows[headerRowIndex];
            const colIdx = {
                soGui: header.indexOf('THÀNH TIỀN'), // First occurrence is usually ordered amount
                thucNhan: header.indexOf('THÀNH TIỀN', header.indexOf('THÀNH TIỀN') + 1), // Second occurrence is actual
                note: header.indexOf('NOTE') !== -1 ? header.indexOf('NOTE') : header.indexOf('GHI CHÚ')
            };

            // If second THÀNH TIỀN not found, maybe it's called something else
            if (colIdx.thucNhan === -1) colIdx.thucNhan = header.indexOf('THÀNH TIỀN THỰC');

            for (let i = headerRowIndex + 1; i < rows.length; i++) {
                const row = rows[i];
                if (!row[0] || row[0] === 'NGÀY') continue; // Skip empty or footer
                if (typeof row[0] === 'string' && row[0].includes('Cộng')) break;

                const valGui = parseFloat(row[colIdx.soGui]) || 0;
                const valThuc = parseFloat(row[colIdx.thucNhan]) || 0;
                const note = (row[colIdx.note] || '').toString().toUpperCase();

                if (valGui === 0 && valThuc === 0) continue;

                totalSoGui += valGui;
                totalChotCN += valThuc;

                if (valGui !== valThuc) {
                    if (note.includes('SL')) reasons['SAI SL'] += (valGui - valThuc);
                    else if (note.includes('ĐG') || note.includes('GIÁ')) reasons['SAI ĐG'] += (valGui - valThuc);
                    else if (note.includes('THIẾU') || note.includes('TRẢ')) reasons['THIEU HANG'] += (valGui - valThuc);
                    else reasons['KHAC'] += (valGui - valThuc);
                }
            }

            summary[customerName] = {
                file,
                totalSoGui,
                totalChotCN,
                diff: totalSoGui - totalChotCN,
                reasons
            };
        }
    });
});

console.log(JSON.stringify(summary, null, 2));

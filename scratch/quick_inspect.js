const XLSX = require('xlsx');
const fs = require('fs');

const excelPath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 20-5 (2).xlsx';
const output = [];

try {
    const workbook = XLSX.readFile(excelPath);
    output.push("Sheet names: " + JSON.stringify(workbook.SheetNames));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    output.push(`Total rows in sheet '${sheetName}': ${rows.length}`);
    
    output.push("\nFirst 5 rows:");
    for (let i = 0; i < Math.min(5, rows.length); i++) {
        output.push(`Row ${i}: ${JSON.stringify(rows[i])}`);
    }

    // Also try as JSON with headers
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    output.push(`\nAs JSON (with auto headers): ${jsonData.length} rows`);
    if (jsonData.length > 0) {
        output.push("Keys: " + JSON.stringify(Object.keys(jsonData[0])));
        output.push("First 3 items: " + JSON.stringify(jsonData.slice(0, 3), null, 2));
    }

} catch (e) {
    output.push("Error: " + e.message);
}

fs.writeFileSync('/home/kata/Coding/rausachfinal/scratch/inspect_20_5_result.txt', output.join('\n'));
console.log('Done - check scratch/inspect_20_5_result.txt');

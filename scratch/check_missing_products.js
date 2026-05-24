const XLSX = require('xlsx');
const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 15-5.xlsx';
const workbook = XLSX.readFile(filePath);
const sheet1 = workbook.Sheets['sheet1'];
const data = XLSX.utils.sheet_to_json(sheet1);

const targetMasp = [
    'I100325', 'I100213', 'I100499', 'I100800', 'I100172', 'I100478', 
    'I100134', 'I100473', 'I100491', 'I100501', 'I100133', 'I100500'
];

console.log('Checking target masp in Excel file...');
targetMasp.forEach(masp => {
    const found = data.find(row => row.masp === masp);
    if (found) {
        console.log(`[FOUND] ${masp}: ${JSON.stringify(found)}`);
    } else {
        console.log(`[NOT FOUND] ${masp}`);
    }
});

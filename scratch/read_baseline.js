const XLSX = require('xlsx');
const fs = require('fs');

const wb = XLSX.readFile('./doisoat/Ton-Huy 20-5 (2).xlsx');
console.log('Sheet names:', wb.SheetNames);

const result = {};
wb.SheetNames.forEach(name => {
  const ws = wb.Sheets[name];
  console.log('\nSheet:', name, 'Range:', ws['!ref']);
  const data = XLSX.utils.sheet_to_json(ws, {header: 1, range: 0, defval: ''});
  result[name] = data;
  // Print first 5 rows
  for(let i = 0; i < Math.min(5, data.length); i++) {
    console.log('  Row', i, ':', JSON.stringify(data[i]));
  }
  console.log('  Total rows:', data.length);
});

fs.writeFileSync('./scratch/baseline_data.json', JSON.stringify(result, null, 2));
console.log('\nData saved to scratch/baseline_data.json');

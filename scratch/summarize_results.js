const fs = require('fs');

const data = JSON.parse(fs.readFileSync('/home/kata/Coding/rausachfinal/scratch/reconciliation_results.json', 'utf8'));

console.log('--- Summary of Reconciliation Discrepancies ---');
console.log(`Total Discrepancies: ${data.discrepanciesCount}`);

const categoryCounts = {};
const issueTypeCounts = {};

data.discrepancies.forEach(d => {
  categoryCounts[d.category] = (categoryCounts[d.category] || 0) + 1;
  d.issues.forEach(i => {
    // Extract generic issue type (e.g. Actual stock mismatch, System stock mismatch)
    const type = i.split('(')[0].trim();
    issueTypeCounts[type] = (issueTypeCounts[type] || 0) + 1;
  });
});

console.log('\nDiscrepancies by Category:');
console.log(JSON.stringify(categoryCounts, null, 2));

console.log('\nDiscrepancies by Issue Type:');
console.log(JSON.stringify(issueTypeCounts, null, 2));

console.log('\nSample Discrepancies (first 10):');
data.discrepancies.slice(0, 15).forEach((d, i) => {
  console.log(`${i+1}. ${d.title} (${d.masp}) - Category: ${d.category}`);
  console.log(`   DB System: ${d.dbSystem}, Expected: ${d.expectedSystem}`);
  console.log(`   DB Actual: ${d.dbActual}, Expected: ${d.expectedActual}`);
  console.log(`   Ghi chú: "${d.dbGhiChu}"`);
  console.log(`   Issues: ${d.issues.join(', ')}`);
});

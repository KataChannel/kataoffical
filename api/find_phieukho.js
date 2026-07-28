
const fs = require('fs');
const content = fs.readFileSync('src/dathang/dathang.service.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('PhieuKho')) {
        console.log(`${i + 1}: ${line.trim()}`);
    }
});

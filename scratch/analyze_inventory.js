const fs = require('fs');

const logFile = '/chikiet/kata2025/rausachfinal/docs/fixbug/thay_doi_sl_san_pham_20260408_13h.md';
const content = fs.readFileSync(logFile, 'utf8');

const products = [
    { id: 'I100233', name: 'Trứng gà' },
    { id: 'I100479', name: 'Dưa hấu' },
    { id: 'I100207', name: 'Xà lách lolo xanh' },
    { id: 'I100003', name: 'Bắp cải trắng' },
    { id: 'I100002', name: 'Bắp cải tím' },
    { id: 'I100164', name: 'Ớt đà lạt (đỏ)' },
    { id: 'I100165', name: 'Ớt đà lạt (vàng)' },
    { id: 'I100166', name: 'Ớt đà lạt (xanh)' },
    { id: 'I100004', name: 'Bắp chuối bào' },
    { id: 'I100256', name: 'Bún nhỏ' },
    { id: 'I100113', name: 'Húng lũi' }
];

const lines = content.split('\n');
const results = {};

products.forEach(p => {
    results[p.id] = {
        name: p.name,
        end84: null,
        nhap94: 0,
        xuat94: 0,
        logSystemEnd: null,
        logRealEnd: null
    };
});

lines.forEach(line => {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length < 10) return;
    
    const time = parts[1];
    const id = parts[2];
    const type = parts[5];
    const before = parseFloat(parts[6]);
    const change = parseFloat(parts[7].replace(/\*\*/g, ''));
    const after = parseFloat(parts[8]);
    
    if (results[id]) {
        if (time.includes('8/4/2026') && type === 'Chốt Kho') {
            results[id].end84 = after;
        } else if (time.includes('9/4/2026')) {
            if (type === 'Nhập Kho') {
                results[id].nhap94 += change;
            } else if (type === 'Xuất Kho') {
                results[id].xuat94 += change;
            } else if (type === 'Chốt Kho') {
                results[id].logSystemEnd = before;
                results[id].logRealEnd = after;
            }
        }
    }
});

console.log(JSON.stringify(results, null, 2));

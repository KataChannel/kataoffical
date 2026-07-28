const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masps = ['I100233', 'I100479', 'I100207', 'I100003', 'I100002', 'I100164', 'I100165', 'I100166', 'I100004', 'I100256', 'I100113'];
  const startDate = new Date('2026-04-13T00:00:00Z');
  const endDate = new Date('2026-04-23T00:00:00Z');

  const dates = [];
  for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  const matrix = {};

  for (const masp of masps) {
    const sp = await prisma.sanpham.findFirst({ where: { masp } });
    if (!sp) continue;

    matrix[masp] = { title: sp.title, values: [] };

    for (const d of dates) {
      const dayStart = new Date(d);
      const dayEnd = new Date(d);
      dayEnd.setDate(dayEnd.getDate() + 1);

      // SL Nhap
      const nhap = await prisma.dathangsanpham.aggregate({
        where: { idSP: sp.id, dathang: { status: 'danhan', updatedAt: { gte: dayStart, lt: dayEnd } } },
        _sum: { slnhan: true }
      });

      // SL Xuat
      const xuat = await prisma.donhangsanpham.aggregate({
        where: { idSP: sp.id, donhang: { status: { in: ['dagiao', 'danhan', 'hoanthanh'] }, updatedAt: { gte: dayStart, lt: dayEnd } } },
        _sum: { slnhan: true, slgiao: true, sldat: true }
      });

      // SL Chot
      const chot = await prisma.chotkhodetail.findFirst({
        where: { sanphamId: sp.id, ngaychot: { gte: dayStart, lt: dayEnd } }
      });

      matrix[masp].values.push({
        nhap: Number(nhap._sum.slnhan || 0),
        xuat: Number(xuat._sum.slnhan || xuat._sum.slgiao || xuat._sum.sldat || 0),
        ton: chot ? Number(chot.sltonhethong) : 0,
        chot: chot ? Number(chot.sltonthucte) : 0
      });
    }
  }

  // Generate One BIG HTML Table
  let html = '<div style="overflow-x: auto;">\n';
  html += '<table style="min-width: 2000px; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 12px;" border="1">\n';
  
  // Row 1: Dates
  html += '  <tr style="background-color: #004d99; color: white;">\n';
  html += '    <th rowspan="2" style="padding: 10px; min-width: 150px;">Sản phẩm</th>\n';
  dates.forEach(d => {
    const dateStr = d.toISOString().split('T')[0].split('-').slice(1).reverse().join('/');
    html += `    <th colspan="4" style="padding: 10px; text-align: center; border-left: 2px solid #fff;">${dateStr}</th>\n`;
  });
  html += '  </tr>\n';

  // Row 2: Metrics
  html += '  <tr style="background-color: #0066cc; color: white;">\n';
  dates.forEach(() => {
    html += '    <th style="padding: 5px; width: 40px; border-left: 2px solid #fff;">N</th>\n';
    html += '    <th style="padding: 5px; width: 40px;">X</th>\n';
    html += '    <th style="padding: 5px; width: 40px;">T</th>\n';
    html += '    <th style="padding: 5px; width: 40px;">C</th>\n';
  });
  html += '  </tr>\n';

  // Row 3+: Product Data
  Object.keys(matrix).forEach(masp => {
    const item = matrix[masp];
    html += '  <tr>\n';
    html += `    <td style="padding: 8px; font-weight: bold; background-color: #f9f9f9;">${item.title}<br><small>${masp}</small></td>\n`;
    item.values.forEach(v => {
      html += `    <td style="padding: 5px; text-align: center; border-left: 2px solid #ddd;">${v.nhap || '-'}</td>\n`;
      html += `    <td style="padding: 5px; text-align: center;">${v.xuat || '-'}</td>\n`;
      html += `    <td style="padding: 5px; text-align: center; color: ${v.ton < 0 ? 'red' : 'inherit'}">${v.ton || '0'}</td>\n`;
      html += `    <td style="padding: 5px; text-align: center; font-weight: bold; background-color: #e6f7ff;">${v.chot || '0'}</td>\n`;
    });
    html += '  </tr>\n';
  });

  html += '</table>\n</div>\n';

  console.log(html);
}

main().catch(console.error).finally(() => prisma.$disconnect());

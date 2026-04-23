const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masps = ['I100233', 'I100479', 'I100207', 'I100003', 'I100002', 'I100164', 'I100165', 'I100166', 'I100004', 'I100256', 'I100113'];
  const startDate = new Date('2026-04-13T00:00:00Z');
  const endDate = new Date('2026-04-23T00:00:00Z');

  const history = {};

  for (const masp of masps) {
    history[masp] = [];
    const sp = await prisma.sanpham.findFirst({ where: { masp } });
    if (!sp) continue;

    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dayStart = new Date(d);
      const dayEnd = new Date(d);
      dayEnd.setDate(dayEnd.getDate() + 1);
      const dateStr = d.toISOString().split('T')[0].split('-').slice(1).reverse().join('/'); // DD/MM

      // SL Nhap
      const nhap = await prisma.dathangsanpham.aggregate({
        where: {
          idSP: sp.id,
          dathang: { status: 'danhan', updatedAt: { gte: dayStart, lt: dayEnd } }
        },
        _sum: { slnhan: true }
      });

      // SL Xuat
      const xuat = await prisma.donhangsanpham.aggregate({
        where: {
          idSP: sp.id,
          donhang: { status: { in: ['dagiao', 'danhan', 'hoanthanh'] }, updatedAt: { gte: dayStart, lt: dayEnd } }
        },
        _sum: { slnhan: true, slgiao: true, sldat: true }
      });

      // SL Chot
      const chot = await prisma.chotkhodetail.findFirst({
        where: { sanphamId: sp.id, ngaychot: { gte: dayStart, lt: dayEnd } }
      });

      history[masp].push({
        date: dateStr,
        nhap: Number(nhap._sum.slnhan || 0),
        xuat: Number(xuat._sum.slnhan || xuat._sum.slgiao || xuat._sum.sldat || 0),
        ton: chot ? Number(chot.sltonhethong) : 0,
        chot: chot ? Number(chot.sltonthucte) : 0
      });
    }
  }

  // Generate HTML table for each product
  let content = '# Báo cáo Đối soát và Phân tích Tồn kho - Ngày 13/04/2026\n\n';
  content += '## 1. Tổng quan\nBáo cáo chi tiết biến động Nhập - Xuất - Tồn - Chốt hàng ngày.\n\n';
  content += '## 2. Chi tiết theo từng Sản phẩm\n\n';

  for (const masp of masps) {
    const sp = await prisma.sanpham.findFirst({ where: { masp } });
    const data = history[masp];
    if (!data || data.length === 0) continue;

    content += `### ${sp.title} (${masp})\n\n`;
    content += '<table style="width:100%; border-collapse: collapse; margin-bottom: 20px;" border="1">\n';
    
    // Header Row 1: Dates
    content += '  <tr style="background-color: #f2f2f2;">\n';
    content += '    <th rowspan="2" style="padding: 8px;">Ngày</th>\n';
    data.forEach(d => {
        content += `    <th colspan="4" style="padding: 8px; text-align: center;">${d.date}</th>\n`;
    });
    content += '  </tr>\n';

    // Header Row 2: Metrics
    content += '  <tr style="background-color: #f2f2f2;">\n';
    data.forEach(d => {
        content += '    <th style="padding: 4px; font-size: 11px;">Nhập</th>\n';
        content += '    <th style="padding: 4px; font-size: 11px;">Xuất</th>\n';
        content += '    <th style="padding: 4px; font-size: 11px;">Tồn</th>\n';
        content += '    <th style="padding: 4px; font-size: 11px;">Chốt</th>\n';
    });
    content += '  </tr>\n';

    // Data Row
    content += '  <tr>\n';
    content += '    <td style="padding: 8px; font-weight: bold;">Số lượng</td>\n';
    data.forEach(d => {
        content += `    <td style="padding: 4px; text-align: center;">${d.nhap}</td>\n`;
        content += `    <td style="padding: 4px; text-align: center;">${d.xuat}</td>\n`;
        content += `    <td style="padding: 4px; text-align: center; color: ${d.ton < 0 ? 'red' : 'inherit'}">${d.ton}</td>\n`;
        content += `    <td style="padding: 4px; text-align: center; font-weight: bold; background-color: #e6f7ff;">${d.chot}</td>\n`;
    });
    content += '  </tr>\n';
    content += '</table>\n\n';
  }

  content += `## 3. Phân tích vấn đề\n\n... (Phần phân tích cũ) ...`;

  console.log(content);
}

main().catch(console.error).finally(() => prisma.$disconnect());

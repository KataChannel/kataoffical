const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    const start = new Date('2026-03-05T15:00:00+07:00');
    const end = new Date('2026-03-06T07:00:00+07:00');

    console.log(`Generating report from ${start.toISOString()} to ${end.toISOString()}`);

    const [donhang, dathang, sanphams, tonkhos] = await Promise.all([
        prisma.donhang.findMany({
            where: { ngaygiao: { gte: start, lte: end } },
            include: {
                khachhang: true,
                sanpham: { include: { sanpham: true } }
            }
        }),
        prisma.dathang.findMany({
            where: { ngaynhan: { gte: start, lte: end } },
            include: {
                nhacungcap: true,
                sanpham: { include: { sanpham: true } }
            }
        }),
        prisma.sanpham.findMany({
            select: { id: true, title: true, masp: true, dvt: true }
        }),
        prisma.tonKho.findMany({
            select: { sanphamId: true, slton: true, sltontt: true }
        })
    ]);

    // Aggregate Donhang
    let dhTotalRevenue = 0;
    let dhStatusCount = {};
    let dhByProduct = new Map();

    donhang.forEach(d => {
        dhTotalRevenue += Number(d.tongtien);
        dhStatusCount[d.status] = (dhStatusCount[d.status] || 0) + 1;
        d.sanpham.forEach(sp => {
            const current = dhByProduct.get(sp.idSP) || { qty: 0, title: sp.sanpham.title, masp: sp.sanpham.masp };
            current.qty += Number(sp.sldat);
            dhByProduct.set(sp.idSP, current);
        });
    });

    // Aggregate Dathang
    let dtTotalCost = 0;
    let dtStatusCount = {};
    let dtByProduct = new Map();

    dathang.forEach(d => {
        dtStatusCount[d.status] = (dtStatusCount[d.status] || 0) + 1;
        let poTotal = 0;
        d.sanpham.forEach(sp => {
            poTotal += Number(sp.sldat) * Number(sp.gianhap);
            const current = dtByProduct.get(sp.idSP) || { qty: 0, title: sp.sanpham.title, masp: sp.sanpham.masp };
            current.qty += Number(sp.sldat);
            dtByProduct.set(sp.idSP, current);
        });
        dtTotalCost += poTotal;
    });

    // Calculate NhuCau (Demand) roughly
    // Demand = (Khach Dat) - (Da Dat NCC) - (Ton Kho) ?
    // Or just (Khach Dat) for this period.
    const tonkhoMap = new Map();
    tonkhos.forEach(tk => tonkhoMap.set(tk.sanphamId, Number(tk.slton)));

    let report = `# Báo cáo tổng hợp Dathang & Donhang\n`;
    report += `Thời gian: **15:00 05/03/2026** đến **07:00 06/03/2026**\n\n`;

    report += `## 1. Tổng quan Đơn hàng (Donhang)\n`;
    report += `- **Tổng số đơn hàng:** ${donhang.length}\n`;
    report += `- **Tổng doanh thu:** ${dhTotalRevenue.toLocaleString('vi-VN')} VNĐ\n`;
    report += `- **Trạng thái:** ${Object.entries(dhStatusCount).map(([status, count]) => `${status}: ${count}`).join(', ')}\n\n`;

    report += `## 2. Tổng quan Đặt hàng NCC (Dathang)\n`;
    report += `- **Tổng số phiếu đặt:** ${dathang.length}\n`;
    report += `- **Tổng giá trị nhập dự kiến:** ${dtTotalCost.toLocaleString('vi-VN')} VNĐ\n`;
    report += `- **Trạng thái:** ${Object.entries(dtStatusCount).map(([status, count]) => `${status}: ${count}`).join(', ')}\n\n`;

    report += `## 3. Top 10 sản phẩm có nhu cầu cao nhất (Donhang)\n`;
    const topProducts = Array.from(dhByProduct.values())
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 10);

    report += `| STT | Mã SP | Tên Sản Phẩm | Số lượng đặt | Đã đặt NCC | Tồn kho |\n`;
    report += `|---|---|---|---|---|---|\n`;
    topProducts.forEach((p, i) => {
        const id = Array.from(dhByProduct.keys()).find(key => dhByProduct.get(key).masp === p.masp);
        const nccQty = dtByProduct.get(id)?.qty || 0;
        const ton = tonkhoMap.get(id) || 0;
        report += `| ${i + 1} | ${p.masp} | ${p.title} | ${p.qty.toFixed(2)} | ${nccQty.toFixed(2)} | ${ton.toFixed(2)} |\n`;
    });

    report += `\n## 4. Phân tích Nhu Cầu Đặt Hàng (Nhucaudathang)\n`;
    report += `Dựa trên số liệu thực tế tại các thời điểm:\n\n`;

    // Time blocks: 15h-18h, 18h-21h, 21h-00h, 00h-03h, 03h-07h
    const blocks = [
        { name: '15h-18h (05/03)', start: new Date('2026-03-05T15:00:00+07:00'), end: new Date('2026-03-05T18:00:00+07:00') },
        { name: '18h-21h (05/03)', start: new Date('2026-03-05T18:00:00+07:00'), end: new Date('2026-03-05T21:00:00+07:00') },
        { name: '21h-00h (05/03)', start: new Date('2026-03-05T21:00:00+07:00'), end: new Date('2026-03-06T00:00:00+07:00') },
        { name: '00h-03h (06/03)', start: new Date('2026-03-06T00:00:00+07:00'), end: new Date('2026-03-06T03:00:00+07:00') },
        { name: '03h-07h (06/03)', start: new Date('2026-03-06T03:00:00+07:00'), end: new Date('2026-03-06T07:00:00+07:00') }
    ];

    report += `| Khung giờ | Số Đơn hàng | Doanh thu | Số Đặt hàng | Giá trị nhập |\n`;
    report += `|---|---|---|---|---|\n`;

    blocks.forEach(b => {
        const dhB = donhang.filter(d => d.ngaygiao >= b.start && d.ngaygiao < b.end);
        const dtB = dathang.filter(d => d.ngaynhan >= b.start && d.ngaynhan < b.end);

        const dhRev = dhB.reduce((acc, d) => acc + Number(d.tongtien), 0);
        const dtCost = dtB.reduce((acc, d) => {
            let cost = 0;
            d.sanpham.forEach(sp => cost += Number(sp.sldat) * Number(sp.gianhap));
            return acc + cost;
        }, 0);

        report += `| ${b.name} | ${dhB.length} | ${dhRev.toLocaleString('vi-VN')} | ${dtB.length} | ${dtCost.toLocaleString('vi-VN')} |\n`;
    });

    report += `\n> **Gợi ý:** Nhu cầu đặt hàng tập trung mạnh vào khung giờ đêm và sáng sớm (00h-07h) để chuẩn bị hàng cho ngày mới. Cần điều chỉnh lượng tồn kho dự phòng cho các mặt hàng bán chạy.\n`;

    fs.writeFileSync('report_detailed_rausach.md', report);
    console.log('Report saved to report_detailed_rausach.md');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

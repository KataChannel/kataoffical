const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

// Use current environment'S DATABASE_URL if it's already rausachfinal, 
// but we'll try to use the raw Postgres connection to be sure.
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public&connection_limit=5"
        },
    },
});

async function main() {
    const start = new Date('2026-03-05T07:00:00+07:00');
    const end = new Date('2026-03-06T07:00:00+07:00');

    console.log(`Querying RAUSACHFINAL...`);

    const [donhang, dathang, tonkhos] = await Promise.all([
        prisma.donhang.findMany({
            where: { ngaygiao: { gte: start, lte: end } },
            include: {
                khachhang: { select: { name: true } },
                sanpham: { include: { sanpham: { select: { title: true, masp: true } } } }
            }
        }),
        prisma.dathang.findMany({
            where: { ngaynhan: { gte: start, lte: end } },
            include: {
                nhacungcap: { select: { name: true } },
                sanpham: { include: { sanpham: { select: { title: true, masp: true } } } }
            }
        }),
        prisma.tonKho.findMany({
            select: { sanphamId: true, slton: true }
        })
    ]);

    console.log(`Processing ${donhang.length} orders and ${dathang.length} purchases...`);

    let dhTotalRevenue = 0;
    let dhStatusCount = {};
    let dhByProduct = new Map();

    donhang.forEach(d => {
        dhTotalRevenue += Number(d.tongtien);
        dhStatusCount[d.status] = (dhStatusCount[d.status] || 0) + 1;
        d.sanpham.forEach(sp => {
            if (!sp.sanpham) return;
            const current = dhByProduct.get(sp.idSP) || { qty: 0, title: sp.sanpham.title, masp: sp.sanpham.masp };
            current.qty += Number(sp.sldat);
            dhByProduct.set(sp.idSP, current);
        });
    });

    let dtTotalCost = 0;
    let dtStatusCount = {};
    let dtByProduct = new Map();

    dathang.forEach(d => {
        dtStatusCount[d.status] = (dtStatusCount[d.status] || 0) + 1;
        let poTotal = 0;
        d.sanpham.forEach(sp => {
            if (!sp.sanpham) return;
            const itemCost = Number(sp.ttnhan) || (Number(sp.sldat) * Number(sp.gianhap));
            poTotal += itemCost;
            const current = dtByProduct.get(sp.idSP) || { qty: 0, title: sp.sanpham.title, masp: sp.sanpham.masp };
            current.qty += Number(sp.sldat);
            dtByProduct.set(sp.idSP, current);
        });
        dtTotalCost += poTotal;
    });

    const tonkhoMap = new Map();
    tonkhos.forEach(tk => tonkhoMap.set(tk.sanphamId, Number(tk.slton)));

    let report = `# Báo cáo RAUSACHFINAL (05/03 - 06/03)\n`;
    report += `Dữ liệu từ Database: **rausachfinal**\n\n`;

    report += `## 1. Đơn hàng (Bán)\n`;
    report += `- Số lượng: ${donhang.length}\n`;
    report += `- Doanh thu: ${dhTotalRevenue.toLocaleString('vi-VN')} VNĐ\n\n`;

    report += `## 2. Đặt hàng (Mua)\n`;
    report += `- Số lượng: ${dathang.length}\n`;
    report += `- Giá trị: ${dtTotalCost.toLocaleString('vi-VN')} VNĐ\n\n`;

    report += `## 3. Danh sách toàn bộ sản phẩm\n`;
    const sorted = Array.from(dhByProduct.entries()).sort((a, b) => b[1].qty - a[1].qty);
    report += `| STT | Mã SP | Tên SP | Bán (Khách) | Mua (NCC) | Tồn kho |\n|---|---|---|---|---|---|\n`;
    sorted.forEach(([id, p], i) => {
        const buy = dtByProduct.get(id)?.qty || 0;
        const ton = tonkhoMap.get(id) || 0;
        report += `| ${i + 1} | ${p.masp} | ${p.title} | ${p.qty.toFixed(1)} | ${buy.toFixed(1)} | ${ton.toFixed(1)} |\n`;
    });

    report += `\n## 4. Biến động theo cung thời gian\n`;
    const blocks = [
        { name: '07h-11h', s: 7, e: 11 },
        { name: '11h-15h', s: 11, e: 15 },
        { name: '15h-19h', s: 15, e: 19 },
        { name: '19h-23h', s: 19, e: 23 },
        { name: '23h-03h', s: 23, e: 3 },
        { name: '03h-07h', s: 3, e: 7 }
    ];

    report += `| Khung giờ | Bán (SL) | Doanh thu | Mua (SL) | Giá trị Mua |\n|---|---|---|---|---|\n`;
    blocks.forEach(b => {
        const dhB = donhang.filter(d => {
            const h = new Date(d.ngaygiao).getHours();
            if (b.s < b.e) return h >= b.s && h < b.e;
            return h >= b.s || h < b.e;
        });
        const dtB = dathang.filter(d => {
            const h = new Date(d.ngaynhan).getHours();
            if (b.s < b.e) return h >= b.s && h < b.e;
            return h >= b.s || h < b.e;
        });
        const rev = dhB.reduce((a, c) => a + Number(c.tongtien), 0);
        const buyV = dtB.reduce((a, c) => a + c.sanpham.reduce((s, sp) => s + (Number(sp.ttnhan) || Number(sp.sldat) * Number(sp.gianhap)), 0), 0);
        const sQty = dhB.reduce((a, c) => a + c.sanpham.reduce((s, sp) => s + Number(sp.sldat), 0), 0);
        const bQty = dtB.reduce((a, c) => a + c.sanpham.reduce((s, sp) => s + Number(sp.sldat), 0), 0);
        report += `| ${b.name} | ${sQty.toFixed(1)} | ${rev.toLocaleString('vi-VN')} | ${bQty.toFixed(1)} | ${buyV.toLocaleString('vi-VN')} |\n`;
    });

    fs.writeFileSync('report_rausachfinal_fixed.md', report);
    console.log('Done: report_rausachfinal_fixed.md');
}

main().catch(console.error).finally(() => prisma.$disconnect());

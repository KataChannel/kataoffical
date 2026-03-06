const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

// Connect specifically to rausachfinal database
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public&connection_limit=25"
        },
    },
});

async function main() {
    const start = new Date('2026-03-05T07:00:00+07:00');
    const end = new Date('2026-03-06T07:00:00+07:00');

    console.log(`Generating report for RAUSACHFINAL from ${start.toISOString()} to ${end.toISOString()}`);

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

    // Aggregate Donhang (Bán)
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

    // Aggregate Dathang (Mua)
    let dtTotalCost = 0;
    let dtStatusCount = {};
    let dtByProduct = new Map();

    dathang.forEach(d => {
        dtStatusCount[d.status] = (dtStatusCount[d.status] || 0) + 1;
        let poTotal = 0;
        d.sanpham.forEach(sp => {
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

    let report = `# Báo cáo tổng hợp RAUSACHFINAL (07h 05/03 -> 07h 06/03)\n`;
    report += `Cơ sở dữ liệu: **rausachfinal**\n`;
    report += `Thời gian: **07:00 05/03/2026** đến **07:00 06/03/2026**\n\n`;

    report += `## 1. Tổng quan Đơn hàng (Bán ra)\n`;
    report += `- **Tổng số đơn hàng:** ${donhang.length}\n`;
    report += `- **Tổng doanh thu:** ${dhTotalRevenue.toLocaleString('vi-VN')} VNĐ\n`;
    report += `- **Trạng thái:** ${Object.entries(dhStatusCount).map(([status, count]) => `**${status}**: ${count}`).join(', ')}\n\n`;

    report += `## 2. Tổng quan Đặt hàng (Mua vào)\n`;
    report += `- **Tổng số phiếu đặt:** ${dathang.length}\n`;
    report += `- **Tổng giá trị nhập:** ${dtTotalCost.toLocaleString('vi-VN')} VNĐ\n`;
    report += `- **Trạng thái:** ${Object.entries(dtStatusCount).map(([status, count]) => `**${status}**: ${count}`).join(', ')}\n\n`;

    report += `## 3. Danh sách toàn bộ sản phẩm phát sinh nhu cầu\n`;
    const sortedProducts = Array.from(dhByProduct.entries())
        .sort((a, b) => b[1].qty - a[1].qty);

    report += `| STT | Mã SP | Tên Sản Phẩm | SL Khách Đặt | SL Đã Đặt NCC | Tồn kho |\n`;
    report += `|---|---|---|---|---|---|\n`;
    sortedProducts.forEach(([id, p], i) => {
        const nccQty = dtByProduct.get(id)?.qty || 0;
        const ton = tonkhoMap.get(id) || 0;
        report += `| ${i + 1} | ${p.masp} | ${p.title} | ${p.qty.toFixed(2)} | ${nccQty.toFixed(2)} | ${ton.toFixed(2)} |\n`;
    });

    report += `\n## 4. Bảng biến động số liệu mua, bán sản phẩm theo khung giờ\n`;

    const intervals = [];
    let current = new Date(start);
    while (current < end) {
        let next = new Date(current.getTime() + 4 * 60 * 60 * 1000);
        intervals.push({ start: new Date(current), end: next });
        current = next;
    }

    report += `| Khung giờ | SL Bán (Khách) | Doanh thu Bán | SL Mua (NCC) | Giá trị Mua |\n`;
    report += `|---|---|---|---|---|\n`;

    intervals.forEach(interval => {
        const dhI = donhang.filter(d => {
            const t = new Date(d.ngaygiao);
            return t >= interval.start && t < interval.end;
        });
        const dtI = dathang.filter(d => {
            const t = new Date(d.ngaynhan);
            return t >= interval.start && t < interval.end;
        });

        const rev = dhI.reduce((acc, d) => acc + Number(d.tongtien), 0);
        const buyValue = dtI.reduce((acc, d) => {
            return acc + d.sanpham.reduce((s, sp) => s + (Number(sp.ttnhan) || (Number(sp.sldat) * Number(sp.gianhap))), 0);
        }, 0);

        const sellQty = dhI.reduce((acc, d) => acc + d.sanpham.reduce((s, sp) => s + Number(sp.sldat), 0), 0);
        const buyQty = dtI.reduce((acc, d) => acc + d.sanpham.reduce((s, sp) => s + Number(sp.sldat), 0), 0);

        const timeLabel = `${interval.start.getHours()}h - ${interval.end.getHours()}h`;
        report += `| ${timeLabel} | ${sellQty.toFixed(1)} | ${rev.toLocaleString('vi-VN')} | ${buyQty.toFixed(1)} | ${buyValue.toLocaleString('vi-VN')} |\n`;
    });

    fs.writeFileSync('report_rausachfinal_24h.md', report);
    console.log('Report saved to report_rausachfinal_24h.md');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

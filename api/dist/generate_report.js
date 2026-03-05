"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const prisma = new client_1.PrismaClient();
async function main() {
    const startDate = new Date('2026-02-20T17:00:00+07:00');
    const endDate = new Date('2026-02-21T19:00:00+07:00');
    const donhang = await prisma.donhang.findMany({
        where: { createdAt: { gte: startDate, lte: endDate } },
        include: { khachhang: true, sanpham: { include: { sanpham: true } } },
        orderBy: { createdAt: 'asc' }
    });
    const dathang = await prisma.dathang.findMany({
        where: { createdAt: { gte: startDate, lte: endDate } },
        include: { nhacungcap: true, sanpham: { include: { sanpham: true } } },
        orderBy: { createdAt: 'asc' }
    });
    let md = `# Report: Đơn Hàng & Đặt Hàng (17:00 20/02/2026 - 19:00 21/02/2026 VN)\n\n`;
    let dhTotalRevenue = 0;
    let dhStatusCount = {};
    donhang.forEach(d => {
        dhTotalRevenue += Number(d.tongtien);
        dhStatusCount[d.status] = (dhStatusCount[d.status] || 0) + 1;
    });
    md += `## 1. Đơn Hàng (Sales Orders)\n`;
    md += `- **Tổng số đơn hàng:** ${donhang.length}\n`;
    md += `- **Tổng doanh thu ước tính:** ${dhTotalRevenue.toLocaleString('vi-VN')} VNĐ\n`;
    md += `- **Trạng thái đơn hàng:** ${Object.entries(dhStatusCount).map(([k, v]) => `${k} (${v})`).join(', ')}\n\n`;
    md += `### Chi tiết các đơn hàng:\n`;
    donhang.forEach(d => {
        md += `- **${d.madonhang}** (${d.createdAt.toISOString()}) | Khách: ${d.khachhang?.name || 'N/A'} | Trạng thái: ${d.status} | Tổng tiền: ${Number(d.tongtien).toLocaleString('vi-VN')} VNĐ\n`;
    });
    let dathangStatusCount = {};
    let zeroPriceCount = 0;
    let dathangTotalEstimated = 0;
    dathang.forEach(d => {
        dathangStatusCount[d.status] = (dathangStatusCount[d.status] || 0) + 1;
        let poTotal = 0;
        d.sanpham.forEach(sp => {
            poTotal += Number(sp.sldat) * Number(sp.gianhap);
            if (Number(sp.gianhap) === 0)
                zeroPriceCount++;
        });
        dathangTotalEstimated += poTotal;
    });
    md += `\n## 2. Phiếu Đặt Hàng (Purchase Orders)\n`;
    md += `- **Tổng số phiếu đặt hàng:** ${dathang.length}\n`;
    md += `- **Trạng thái phiếu:** ${Object.entries(dathangStatusCount).map(([k, v]) => `${k} (${v})`).join(', ')}\n`;
    md += `- **Tổng số mục sản phẩm nhập giá 0đ:** ${zeroPriceCount} mục\n`;
    md += `- **Tổng giá trị dự kiến (chỉ tính mục có giá):** ${dathangTotalEstimated.toLocaleString('vi-VN')} VNĐ\n\n`;
    md += `### Thống kê các số PO nhập giá 0đ:\n`;
    dathang.forEach(d => {
        let hasZero = d.sanpham.some(sp => Number(sp.gianhap) === 0);
        if (hasZero) {
            md += `- **${d.madncc}** (NCC: ${d.nhacungcap?.name || 'N/A'}): Có sản phẩm giá 0đ\n`;
        }
    });
    fs.writeFileSync('/chikiet/kata2025/rausachfinal/api/report_summary_2.md', md);
    console.log('Report generated at report_summary_2.md');
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=generate_report.js.map
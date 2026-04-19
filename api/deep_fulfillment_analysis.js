const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function deepAnalysis() {
    const targetDateStr = '2026-04-17';
    const dayStart = new Date('2026-04-16T17:00:00Z'); // Start of 17th Local
    const dayEnd = new Date('2026-04-17T17:00:00Z');   // End of 17th Local

    console.log('--- DEEP FULFILLMENT ANALYSIS FOR 2026-04-17 ---');

    // 1. Get Demand (164 Orders)
    const donhangItems = await prisma.donhangsanpham.findMany({
        where: {
            donhang: {
                ngaygiao: { gte: dayStart, lte: dayEnd },
                status: { not: 'huy' }
            }
        },
        include: {
            sanpham: { select: { title: true, masp: true, dvt: true } }
        }
    });

    const demandMap = new Map();
    donhangItems.forEach(item => {
        const key = item.idSP;
        const current = demandMap.get(key) || { title: item.sanpham.title, masp: item.sanpham.masp, dvt: item.sanpham.dvt, requested: 0 };
        current.requested += Number(item.sldat);
        demandMap.set(key, current);
    });

    // 2. Get Supply (Dathang on 17/04)
    const dathangItems = await prisma.dathangsanpham.findMany({
        where: {
            dathang: {
                ngaynhan: { gte: dayStart, lte: dayEnd },
                status: { not: 'huy' }
            }
        }
    });

    const supplyMap = new Map();
    dathangItems.forEach(item => {
        const key = item.idSP;
        const current = supplyMap.get(key) || { received: 0, ordered: 0 };
        current.received += Number(item.slnhan);
        current.ordered += Number(item.sldat);
        supplyMap.set(key, current);
    });

    // 3. Get Initial Stock (Chotkho from 16th or before)
    // We'll look for the most recent chotkho detail before 17th.
    const lastChotkhos = await prisma.chotkhodetail.findMany({
        where: {
            ngaychot: { lt: dayStart }
        },
        orderBy: { ngaychot: 'desc' },
        distinct: ['sanphamId'],
        select: { sanphamId: true, sltonthucte: true, ngaychot: true }
    });

    const stockMap = new Map();
    lastChotkhos.forEach(ck => {
        stockMap.set(ck.sanphamId, Number(ck.sltonthucte));
    });

    // 4. Combine
    const analysis = [];
    for (const [id, data] of demandMap.entries()) {
        const received = supplyMap.get(id)?.received || 0;
        const initialStock = stockMap.get(id) || 0;
        const totalAvailable = initialStock + received;
        const requested = data.requested;
        const gap = totalAvailable - requested;

        analysis.push({
            masp: data.masp,
            title: data.title,
            dvt: data.dvt,
            initialStock,
            received,
            totalAvailable,
            requested,
            gap,
            status: gap >= 0 ? 'OK' : 'SHORT'
        });
    }

    // Sort by gap (most negative first)
    analysis.sort((a, b) => a.gap - b.gap);

    // Save to Markdown
    const outputDir = '/chikiet/kata2025/rausachfinal/doisoat/dieuchinh';
    const outputPath = path.join(outputDir, 'analysis_fulfillment_20260417.md');

    let md = `# BÁO CÁO PHÂN TÍCH CHUYÊN SÂU PHỤC VỤ 164 ĐƠN HÀNG (2026-04-17)\n\n`;
    md += `## 1. Tổng quan\n`;
    md += `*   **Số lượng đơn hàng:** 164\n`;
    md += `*   **Thời điểm đối soát:** 00:30 Ngày 18/04/2026\n`;
    md += `*   **Nguyên tắc tính:** \`Tồn đầu (Chốt 16/04)\` + \`Nhập NCC (17/04)\` - \`Khách đặt (17/04)\`.\n\n`;

    md += `## 2. Top 20 mặt hàng THIẾU HỤT (Shortage)\n\n`;
    md += `| Mã SP | Tên Sản Phẩm | ĐVT | Tồn Đầu | Nhập NCC | Khả dụng | Khách Đặt | **Thiếu** |\n`;
    md += `| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |\n`;

    analysis.filter(a => a.gap < -0.01).slice(0, 20).forEach(a => {
        md += `| ${a.masp} | ${a.title} | ${a.dvt} | ${a.initialStock} | ${a.received} | ${a.totalAvailable} | ${a.requested} | **${a.gap.toFixed(3)}** |\n`;
    });

    md += `\n## 3. Top 10 mặt hàng DƯ THỪA (Excess)\n\n`;
    md += `| Mã SP | Tên Sản Phẩm | ĐVT | Khả dụng | Khách Đặt | **Dư** |\n`;
    md += `| :--- | :--- | :--- | :---: | :---: | :---: |\n`;

    analysis.filter(a => a.gap > 0.01).reverse().slice(0, 10).forEach(a => {
        md += `| ${a.masp} | ${a.title} | ${a.dvt} | ${a.totalAvailable} | ${a.requested} | **${a.gap.toFixed(3)}** |\n`;
    });

    md += `\n## 4. Phân tích nguyên nhân (Root Cause)\n\n`;
    const totalShortItems = analysis.filter(a => a.gap < -0.01).length;
    md += `*   **Tổng số mặt hàng thiếu hụt:** ${totalShortItems} / ${analysis.length} mã hàng.\n`;
    md += `*   **Nguyên nhân kĩ thuật (Ghost Stock):** Nhiều mã có \`Tồn đầu = 0\` và \`Nhập NCC = 0\` nhưng vẫn có đơn bán. Điều này chứng tỏ hàng thực tế có trong kho nhưng **chưa được nhập kho (Phiếu Đặt Hàng chưa được xác nhận Đã Nhận)** hoặc **Chốt kho nhầm về 0** khiến hệ thống bị mù màu dữ liệu.\n`;
    md += `*   **Sai lệch chốt kho:** Một số mã có tồn đầu âm (ví dụ: bún, rau muống) do các giao dịch xuất trước khi nhập, tạo ra lỗ hổng trong số liệu lũy kế.\n`;
    md += `*   **Kiến nghị:** Cần bộ phận Kho rà soát lại toàn bộ Phiếu Nhập NCC cho 164 đơn này và xác nhận trên hệ thống để hoàn tất dòng tiền và dòng hàng.\n`;

    fs.writeFileSync(outputPath, md);
    console.log(`Analysis saved to ${outputPath}`);
}

deepAnalysis().catch(console.error).finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function generateReportOptimized(startDateStr, endDateStr, outputFilename) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    const now = new Date();

    const formatDate = (date) => {
        if (!date) return '-';
        const d = new Date(date);
        const pad = (n) => n.toString().padStart(2, '0');
        return `${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
    };

    const [donhang, dathang, sanphams, tonkhos] = await Promise.all([
        prisma.donhang.findMany({
            where: { ngaygiao: { gte: start, lte: end } },
            include: { khachhang: true, sanpham: { include: { sanpham: true } } }
        }),
        prisma.dathang.findMany({
            where: { ngaynhan: { gte: start, lte: end } },
            include: { nhacungcap: true, sanpham: { include: { sanpham: true } } }
        }),
        prisma.sanpham.findMany({
            select: {
                id: true, title: true, masp: true, dvt: true, haohut: true,
                Dathangsanpham: {
                    where: { dathang: { ngaynhan: { gte: start, lte: end } } },
                    orderBy: { dathang: { updatedAt: 'desc' } },
                    take: 1,
                    include: { dathang: true }
                },
                PhieuKhoSanpham: {
                    orderBy: { updatedAt: 'desc' },
                    take: 1,
                    include: { phieuKho: true }
                }
            }
        }),
        prisma.tonKho.findMany({
            select: {
                sanphamId: true,
                slton: true,
                sltontt: true,
                updatedAt: true
            }
        })
    ]);

    const phieuKhoIds = sanphams
        .flatMap(s => s.PhieuKhoSanpham.map(pks => pks.phieuKho.id))
        .filter(id => id);

    const auditLogs = await prisma.auditLog.findMany({
        where: {
            entityId: { in: phieuKhoIds },
            entityName: { in: ['Create Phieukho', 'Update Phieukho'] }
        },
        include: { user: { select: { name: true, email: true } } }
    });

    const auditMap = new Map();
    auditLogs.forEach(log => auditMap.set(log.entityId, log));

    const getUserLabel = (log) => {
        if (!log) return 'Admin';
        if (log.user?.name) return log.user.name;
        if (log.userEmail) return log.userEmail.split('@')[0];
        return 'Admin';
    };

    const tonkhoMap = new Map();
    let oldestUpdate = now;
    tonkhos.forEach(tk => {
        tonkhoMap.set(tk.sanphamId, tk);
        if (tk.updatedAt < oldestUpdate) oldestUpdate = tk.updatedAt;
    });

    const [allRecSinceUpdate, allDelSinceUpdate, allRecSinceTarget, allDelSinceTarget] = await Promise.all([
        prisma.dathangsanpham.findMany({
            where: { dathang: { status: 'danhan', updatedAt: { gt: oldestUpdate } } },
            select: { idSP: true, slnhan: true, dathangId: true, dathang: { select: { updatedAt: true } } }
        }),
        prisma.donhangsanpham.findMany({
            where: { donhang: { status: { in: ['dagiao', 'danhan', 'hoanthanh'] }, updatedAt: { gt: oldestUpdate } } },
            select: { idSP: true, slnhan: true, sldat: true, donhang: { select: { updatedAt: true } } }
        }),
        prisma.dathangsanpham.findMany({
            where: { dathang: { status: 'danhan', updatedAt: { gte: end } } },
            select: { idSP: true, slnhan: true }
        }),
        prisma.donhangsanpham.findMany({
            where: { donhang: { status: { in: ['dagiao', 'danhan', 'hoanthanh'] }, updatedAt: { gte: end } } },
            select: { idSP: true, slnhan: true, sldat: true }
        })
    ]);

    let dhTotalRevenue = 0;
    let dhStatusCount = {};
    let dhByProduct = new Map();
    donhang.forEach(d => {
        dhTotalRevenue += Number(d.tongtien);
        dhStatusCount[d.status] = (dhStatusCount[d.status] || 0) + 1;
        d.sanpham.forEach(sp => {
            const current = dhByProduct.get(sp.idSP) || { qty: 0, title: sp.sanpham.title, masp: sp.sanpham.masp, haohut: sp.sanpham.haohut };
            current.qty += Number(sp.sldat);
            dhByProduct.set(sp.idSP, current);
        });
    });

    let dtTotalCost = 0;
    let dtStatusCount = {};
    let dtByProduct = new Map();
    dathang.forEach(d => {
        dtStatusCount[d.status] = (dtStatusCount[d.status] || 0) + 1;
        d.sanpham.forEach(sp => {
            dtTotalCost += (Number(sp.ttnhan) || (Number(sp.sldat) * Number(sp.gianhap)));
            const current = dtByProduct.get(sp.idSP) || { qty: 0, title: sp.sanpham.title, masp: sp.sanpham.masp, haohut: sp.sanpham.haohut };
            current.qty += Number(sp.sldat);
            dtByProduct.set(sp.idSP, current);
        });
    });

    const productIds = Array.from(new Set([...dhByProduct.keys(), ...dtByProduct.keys()]));
    let report = `# BÁO CÁO TỔNG HỢP SỐ LIỆU NGÀY HÔM QUA (17/04/2026)\n\n`;
    report += `**Ngày xuất báo cáo:** ${new Date().toLocaleString('vi-VN')}\n`;
    report += `**Khoảng thời gian đối soát:** ${startDateStr} - ${endDateStr}\n\n`;

    report += `## 1. ĐƠN HÀNG (Bán ra cho Khách hàng)\n`;
    report += `- **Tổng số đơn hàng:** ${donhang.length}\n`;
    report += `- **Tổng doanh thu:** ${dhTotalRevenue.toLocaleString('vi-VN')} VNĐ\n`;
    report += `- **Trạng thái chi tiết:** ${Object.entries(dhStatusCount).map(([status, count]) => "**" + status + "**: " + count).join(', ')}\n\n`;

    report += `## 2. ĐẶT HÀNG (Mua từ Nhà cung cấp)\n`;
    report += `- **Tổng số phiếu đặt:** ${dathang.length}\n`;
    report += `- **Tổng giá trị nhập:** ${dtTotalCost.toLocaleString('vi-VN')} VNĐ\n`;
    report += `- **Trạng thái chi tiết:** ${Object.entries(dtStatusCount).map(([status, count]) => "**" + status + "**: " + count).join(', ')}\n\n`;

    report += `## 3. TỒN KHO VÀ NHU CẦU SẢN PHẨM\n`;
    report += `| STT | Mã SP | Tên Sản Phẩm | Khách Đặt | Đã Đặt NCC | Gợi ý đặt thêm | Tồn Chốt Kho | Tồn Hệ Thống |\n`;
    report += `|---|---|---|---|---|---|---|---|\n`;

    const sortedProductIds = productIds.sort((a, b) => {
        const qtyA = (dhByProduct.get(a)?.qty || 0);
        const qtyB = (dhByProduct.get(b)?.qty || 0);
        return qtyB - qtyA;
    });

    sortedProductIds.slice(0, 50).forEach((idSP, i) => {
        const tk = tonkhoMap.get(idSP);
        const spInfo = sanphams.find(s => s.id === idSP);
        const p = dhByProduct.get(idSP) || dtByProduct.get(idSP);
        const nccQty = dtByProduct.get(idSP)?.qty || 0;
        const khachQty = dhByProduct.get(idSP)?.qty || 0;

        const latestDathangSP = spInfo?.Dathangsanpham?.[0];
        const timeOrder = latestDathangSP ? formatDate(latestDathangSP.dathang.updatedAt || latestDathangSP.dathang.createdAt) : '-';

        const latestPhieuKho = spInfo?.PhieuKhoSanpham?.[0];
        let timeChot = '-';
        if (latestPhieuKho) {
            timeChot = formatDate(latestPhieuKho.updatedAt || latestPhieuKho.phieuKho.updatedAt);
        } else if (tk) {
            timeChot = formatDate(tk.updatedAt);
        }

        const haohutRate = Number(p.haohut || 0) / 100;
        const suggestion = Math.max(0, (khachQty * (1 + haohutRate)) - nccQty);

        let hRel = 0;
        let currentSltontt = 0;
        if (tk) {
            const recNow = allRecSinceUpdate.filter(x => x.idSP === idSP && x.dathang.updatedAt > tk.updatedAt).reduce((s, x) => s + Number(x.slnhan || 0), 0);
            const delNow = allDelSinceUpdate.filter(x => x.idSP === idSP && x.donhang.updatedAt > tk.updatedAt).reduce((s, x) => s + Number(x.slnhan || x.sldat || 0), 0);
            const recSinceT = allRecSinceTarget.filter(x => x.idSP === idSP).reduce((s, x) => s + Number(x.slnhan || 0), 0);
            const delSinceT = allDelSinceTarget.filter(x => x.idSP === idSP).reduce((s, x) => s + Number(x.slnhan || x.sldat || 0), 0);
            const relNow = Number(tk.sltontt || 0) + recNow - delNow;
            hRel = relNow - recSinceT + delSinceT;
            currentSltontt = Number(tk.sltontt || 0);
        }

        report += `| ${i + 1} | ${spInfo?.masp || p.masp} | ${spInfo?.title || p.title} | ${khachQty.toFixed(1)} | ${nccQty.toFixed(1)} | **${suggestion.toFixed(1)}** | ${currentSltontt.toFixed(1)} | **${hRel.toFixed(1)}** |\n`;
    });

    fs.writeFileSync(outputFilename, report);
    console.log(`Báo cáo đã được ghi vào: ${outputFilename}`);
}

async function start() {
    // Yesterday: 2026-04-17
    const startDate = '2026-04-17T00:00:00+07:00';
    const endDate = '2026-04-17T23:59:59+07:00';
    const outputDir = '/chikiet/kata2025/rausachfinal/doisoat/dieuchinh';
    const outputFile = path.join(outputDir, 'report_tong_hop_20260417.md');
    
    await generateReportOptimized(startDate, endDate, outputFile);
}

start().catch(console.error).finally(() => prisma.$disconnect());

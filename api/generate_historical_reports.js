const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

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

    // Fetch AuditLogs for the PhieuKhos found to get operators
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
    let report = `# Báo cáo tổng hợp Dathang & Donhang\n`;
    report += `Thời gian: **${startDateStr}** đến **${endDateStr}**\n\n`;

    report += `## 1. Tổng quan Đơn hàng (Bán ra)\n`;
    report += `- **Tổng số đơn hàng:** ${donhang.length}\n`;
    report += `- **Tổng doanh thu:** ${dhTotalRevenue.toLocaleString('vi-VN')} VNĐ\n`;
    report += `- **Trạng thái:** ${Object.entries(dhStatusCount).map(([status, count]) => "**" + status + "**: " + count).join(', ')}\n\n`;

    report += `## 2. Tổng quan Đặt hàng (Mua vào)\n`;
    report += `- **Tổng số phiếu đặt:** ${dathang.length}\n`;
    report += `- **Tổng giá trị nhập:** ${dtTotalCost.toLocaleString('vi-VN')} VNĐ\n`;
    report += `- **Trạng thái:** ${Object.entries(dtStatusCount).map(([status, count]) => "**" + status + "**: " + count).join(', ')}\n\n`;

    report += `## 3. Danh sách sản phẩm\n`;
    report += `> **Giải thích thuật ngữ:**\n`;
    report += `> - **Tồn Hệ Thống Tính Toán:** Là số liệu tồn kho được truy ngược chính xác tại thời điểm kết thúc ngày.\n`;
    report += `> - **Tồn Chốt Kho (Ghi nhận):** Là số lượng tồn kho được nhân viên nhập thủ công (kiểm kê) trong phân hệ UI (trường \`sltontt\`). Đây là con số snapshot tĩnh không biến động theo giao dịch.\n`;
    report += `> - **Gợi ý đặt hàng:** Số lượng đề xuất cần đặt thêm từ NCC để đáp ứng nhu cầu khách hàng (đã tính tỉ lệ hao hụt).\n\n`;

    report += `| STT | Mã SP | Tên Sản Phẩm | SL Khách Đặt | SL Đã Đặt NCC | Gợi ý đặt hàng | Tồn Chốt Kho (Ghi nhận) | Tồn Hệ Thống Tính Toán |\n`;
    report += `|---|---|---|---|---|---|---|---|\n`;

    // Sort products by demand
    const sortedProductIds = productIds.sort((a, b) => {
        const qtyA = (dhByProduct.get(a)?.qty || 0);
        const qtyB = (dhByProduct.get(b)?.qty || 0);
        return qtyB - qtyA;
    });

    sortedProductIds.forEach((idSP, i) => {
        const tk = tonkhoMap.get(idSP);
        const spInfo = sanphams.find(s => s.id === idSP);
        const p = dhByProduct.get(idSP) || dtByProduct.get(idSP);
        const nccQty = dtByProduct.get(idSP)?.qty || 0;
        const khachQty = dhByProduct.get(idSP)?.qty || 0;

        // Suggestion Detail
        const latestDathangSP = spInfo?.Dathangsanpham?.[0];
        const timeOrder = latestDathangSP ? formatDate(latestDathangSP.dathang.updatedAt || latestDathangSP.dathang.createdAt) : formatDate(now);
        const userOrder = 'System'; // Suggestions are always System generated based on orders

        // Manual Count Detail
        const latestPhieuKho = spInfo?.PhieuKhoSanpham?.[0];
        const audit = latestPhieuKho ? auditMap.get(latestPhieuKho.phieuKho.id) : null;
        let timeChot = '-';
        if (latestPhieuKho) {
            timeChot = formatDate(latestPhieuKho.updatedAt || latestPhieuKho.phieuKho.updatedAt);
        } else if (tk) {
            timeChot = formatDate(tk.updatedAt);
        }
        const userChot = getUserLabel(audit);

        if (!tk) {
            const haohutRate = Number(p.haohut || 0) / 100;
            const suggestion = Math.max(0, (khachQty * (1 + haohutRate)) - nccQty);
            const displayTimeOrder = (suggestion > 0 || latestDathangSP) ? `(${timeOrder} - ${userOrder})` : `(${formatDate(now)} - System)`;
            report += `| ${i + 1} | ${spInfo?.masp || p.masp} | ${spInfo?.title || p.title} | ${khachQty.toFixed(2)} | ${nccQty.toFixed(2)} | **${suggestion.toFixed(2)}**<br><small>${displayTimeOrder}</small> | 0.00 | **0.00** |\n`;
            return;
        }

        // Calculate in-memory
        const recNow = allRecSinceUpdate.filter(x => x.idSP === idSP && x.dathang.updatedAt > tk.updatedAt).reduce((s, x) => s + Number(x.slnhan || 0), 0);
        const delNow = allDelSinceUpdate.filter(x => x.idSP === idSP && x.donhang.updatedAt > tk.updatedAt).reduce((s, x) => s + Number(x.slnhan || x.sldat || 0), 0);

        const recSinceT = allRecSinceTarget.filter(x => x.idSP === idSP).reduce((s, x) => s + Number(x.slnhan || 0), 0);
        const delSinceT = allDelSinceTarget.filter(x => x.idSP === idSP).reduce((s, x) => s + Number(x.slnhan || x.sldat || 0), 0);

        const relNow = Number(tk.sltontt || 0) + recNow - delNow;

        // The historical reliable stock (Tồn tính toán tại thời điểm đó)
        const hRel = relNow - recSinceT + delSinceT;

        // The EXACT value found in DB sltontt right now (as seen in the UI image's green box)
        const currentSltontt = Number(tk.sltontt || 0);

        const haohutRate = Number(p.haohut || 0) / 100;
        const suggestion = Math.max(0, (khachQty * (1 + haohutRate)) - nccQty);
        const displayTimeOrder = (suggestion > 0 || latestDathangSP) ? `(${timeOrder} - ${userOrder})` : `(${formatDate(now)} - System)`;

        report += `| ${i + 1} | ${spInfo?.masp || p.masp} | ${spInfo?.title || p.title} | ${khachQty.toFixed(2)} | ${nccQty.toFixed(2)} | **${suggestion.toFixed(2)}**<br><small>${displayTimeOrder}</small> | ${currentSltontt.toFixed(2)}<br><small>(${timeChot} - ${userChot})</small> | **${hRel.toFixed(2)}** |\n`;
    });

    report += `\n## 4. Bảng biến động theo khung giờ (4h/lần)\n`;
    const intervals = [];
    let curr = new Date(start);
    while (curr < end) {
        let nxt = new Date(curr.getTime() + 4 * 60 * 60 * 1000);
        intervals.push({ s: new Date(curr), e: nxt });
        curr = nxt;
    }

    report += `| Khung giờ | SL Bán | Doanh thu | SL Mua | Giá trị Mua |\n`;
    report += `|---|---|---|---|---|\n`;
    intervals.forEach(inv => {
        const dhI = donhang.filter(d => { const t = new Date(d.ngaygiao); return t >= inv.s && t < inv.e; });
        const dtI = dathang.filter(d => { const t = new Date(d.ngaynhan); return t >= inv.s && t < inv.e; });
        const rev = dhI.reduce((acc, d) => acc + Number(d.tongtien), 0);
        const buyV = dtI.reduce((acc, d) => acc + d.sanpham.reduce((s, sp) => s + (Number(sp.ttnhan) || (Number(sp.sldat) * Number(sp.gianhap))), 0), 0);
        const sQty = dhI.reduce((acc, d) => acc + d.sanpham.reduce((s, sp) => s + Number(sp.sldat), 0), 0);
        const bQty = dtI.reduce((acc, d) => acc + d.sanpham.reduce((s, sp) => s + Number(sp.sldat), 0), 0);
        report += `| ${inv.s.getHours()}h-${inv.e.getHours()}h | ${sQty.toFixed(1)} | ${rev.toLocaleString('vi-VN')} | ${bQty.toFixed(1)} | ${buyV.toLocaleString('vi-VN')} |\n`;
    });

    fs.writeFileSync(outputFilename, report);
}

async function start() {
    await generateReportOptimized('2026-03-03T07:00:00+07:00', '2026-03-04T07:00:00+07:00', 'report_full_03_03.md');
    await generateReportOptimized('2026-03-04T07:00:00+07:00', '2026-03-05T07:00:00+07:00', 'report_full_04_03.md');
    await generateReportOptimized('2026-03-05T07:00:00+07:00', '2026-03-06T07:00:00+07:00', 'report_full_24h.md');
}

start().catch(console.error).finally(() => prisma.$disconnect());

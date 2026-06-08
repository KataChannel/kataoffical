"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
const TARGET_THOM_XANH_MASP = 'I101127';
const CHOTKHO_ID = '03dba5dc-ddac-4ae6-a0cc-8a5e5fc63461';
async function main() {
    console.log('--- RETROSPECTIVELY APPLYING RULES.MD TO TODAY\'S CHOTKHO ---');
    const chot = await prisma.chotkho.findUnique({
        where: { id: CHOTKHO_ID },
        include: { details: { include: { sanpham: true } } }
    });
    if (!chot) {
        console.error('❌ Today\'s chotkho not found!');
        return;
    }
    console.log(`Loaded chotkho: ${chot.title} (${chot.id}) with ${chot.details.length} details.`);
    const autoCarryTitles = ['dưa hấu', 'bắp', 'cải chua', 'hành tây'];
    const processedDetails = new Map();
    for (const detail of chot.details) {
        const sp = detail.sanpham;
        if (!sp) {
            console.warn(`Detail ${detail.id} has no associated product.`);
            continue;
        }
        const title = sp.title.toLowerCase();
        const masp = sp.masp.trim();
        const ghichu = detail.ghichu || '';
        const inExcel = ghichu.includes('Excel') && !ghichu.includes('không có trong Excel');
        const sltonhethong = Number(detail.sltonhethong);
        let sltonthucte = Number(detail.sltonthucte);
        let slhuy = Number(detail.slhuy);
        let note = ghichu;
        const isAutoCarry = autoCarryTitles.some(t => title.includes(t));
        const isThom = title.includes('thơm');
        if (inExcel) {
            note = `${ghichu} (Áp dụng rule: có trong Excel)`;
        }
        else {
            if (isAutoCarry) {
                sltonthucte = sltonhethong;
                note = 'Tự động đưa qua (không có trong Excel - Auto-carried)';
            }
            else if (isThom) {
                const isThomXanh = title.includes('xanh');
                const isThomGot = title.includes('gọt');
                if (isThomXanh || isThomGot) {
                    sltonthucte = sltonhethong;
                    note = 'Tự động đưa qua (Thơm xanh/Thơm gọt - Auto-carried)';
                }
                else {
                    sltonthucte = 0;
                    slhuy = 0;
                    note = 'Thơm khác reset về 0 (không có trong Excel)';
                }
            }
            else {
                sltonthucte = 0;
                slhuy = 0;
                note = 'Reset về 0 (không có trong Excel - Rules.md)';
            }
        }
        processedDetails.set(sp.id, {
            id: detail.id,
            sanphamId: sp.id,
            masp,
            title: sp.title,
            isThom,
            titleLower: title,
            sltonhethong,
            sltonthucte,
            slhuy,
            ghichu: note
        });
    }
    let targetThomXanh = null;
    for (const p of processedDetails.values()) {
        if (p.masp === TARGET_THOM_XANH_MASP) {
            targetThomXanh = p;
            break;
        }
    }
    if (targetThomXanh) {
        let extraStock = 0;
        for (const p of processedDetails.values()) {
            if (p.isThom && p.masp !== TARGET_THOM_XANH_MASP) {
                const isThomGot = p.titleLower.includes('gọt');
                if (!isThomGot) {
                    extraStock += p.sltonthucte;
                    p.sltonthucte = 0;
                    p.ghichu = `Quy đổi tồn kho về Thơm xanh (kg) [${TARGET_THOM_XANH_MASP}] (Rules.md)`;
                }
            }
        }
        if (extraStock > 0) {
            targetThomXanh.sltonthucte += extraStock;
            targetThomXanh.ghichu += ` (Nhận quy đổi từ các loại thơm khác: +${extraStock})`;
            console.log(`[Thơm Consolidation] Consolidated +${extraStock} to Thơm xanh [${TARGET_THOM_XANH_MASP}]`);
        }
    }
    else {
        console.warn(`[Thơm Consolidation] Target product '${TARGET_THOM_XANH_MASP}' not found in details!`);
    }
    console.log('Starting DB Update Transaction...');
    await prisma.$transaction(async (tx) => {
        let updatedCount = 0;
        for (const p of processedDetails.values()) {
            const chenhlech = p.sltonhethong - p.sltonthucte - p.slhuy;
            await tx.chotkhodetail.update({
                where: { id: p.id },
                data: {
                    sltonthucte: new client_1.Prisma.Decimal(p.sltonthucte),
                    slhuy: new client_1.Prisma.Decimal(p.slhuy),
                    chenhlech: new client_1.Prisma.Decimal(chenhlech),
                    ghichu: p.ghichu
                }
            });
            await tx.sanphamKho.upsert({
                where: { sanphamId_khoId: { sanphamId: p.sanphamId, khoId: KHO_TONG_ID } },
                create: { sanphamId: p.sanphamId, khoId: KHO_TONG_ID, soluong: new client_1.Prisma.Decimal(p.sltonthucte) },
                update: { soluong: new client_1.Prisma.Decimal(p.sltonthucte), updatedAt: new Date() }
            });
            await tx.tonKho.upsert({
                where: { sanphamId: p.sanphamId },
                create: { sanphamId: p.sanphamId, slton: new client_1.Prisma.Decimal(p.sltonthucte), sltontt: new client_1.Prisma.Decimal(p.sltonthucte) },
                update: { slton: new client_1.Prisma.Decimal(p.sltonthucte), sltontt: new client_1.Prisma.Decimal(p.sltonthucte), updatedAt: new Date() }
            });
            updatedCount++;
        }
        await tx.sanphamKho.updateMany({
            where: { NOT: { khoId: KHO_TONG_ID } },
            data: { soluong: 0, updatedAt: new Date() }
        });
        console.log(`Updated ${updatedCount} products in DB.`);
    }, { timeout: 300000 });
    console.log('--- RECONCILIATION & CORRECTION COMPLETE ---');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=apply_rules_today.js.map
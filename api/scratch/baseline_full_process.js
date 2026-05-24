const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const XLSX = require('xlsx');
const { Decimal } = require('@prisma/client/runtime/library');

async function main() {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 15-5.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheet1 = workbook.Sheets['sheet1'];
    const data = XLSX.utils.sheet_to_json(sheet1);

    const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM
    const cutoff = new Date('2026-05-15T17:00:00+07:00');

    console.log(`Starting Full Baseline Process at Cut-off: ${cutoff.toLocaleString('vi-VN')}`);

    // 1. Map Excel data
    const excelMap = new Map();
    for (const row of data) {
        if (row.masp) {
            excelMap.set(row.masp, {
                slton: parseFloat(row.slton) || 0,
                slhuy: parseFloat(row.slhuy) || 0
            });
        }
    }

    // 2. Fetch all products
    const allProducts = await prisma.sanpham.findMany({
        include: {
            SanphamKho: {
                where: { khoId: khoId }
            }
        }
    });

    const details = [];
    for (const p of allProducts) {
        const excelData = excelMap.get(p.masp);
        const sltonthucte = excelData ? excelData.slton : 0; // Reset to 0 if not in file
        const slhuy = excelData ? excelData.slhuy : 0;
        const sltonhethong = Number(p.SanphamKho[0]?.soluong || 0);

        details.push({
            sanphamId: p.id,
            masp: p.masp,
            sltonhethong,
            sltonthucte,
            slhuy,
            giagoc: Number(p.giagoc) || 0
        });
    }

    console.log(`Prepared ${details.length} products. Products from Excel: ${excelMap.size}. Resetting others to 0.`);

    await prisma.$transaction(async (tx) => {
        // 3. Update pending orders to 'choxuly' (dadat, dagiao) before cutoff
        const dhUpdate = await tx.donhang.updateMany({
            where: {
                createdAt: { lt: cutoff },
                status: { in: ['dadat', 'dagiao'] }
            },
            data: { status: 'choxuly' }
        });
        console.log(`Updated ${dhUpdate.count} Donhang to 'choxuly'.`);

        const dthUpdate = await tx.dathang.updateMany({
            where: {
                createdAt: { lt: cutoff },
                status: { in: ['dadat', 'dagiao'] }
            },
            data: { status: 'choxuly' }
        });
        console.log(`Updated ${dthUpdate.count} Dathang to 'choxuly'.`);

        // 4. Create Chotkho Master
        const chotkhoMaster = await tx.chotkho.create({
            data: {
                ngaychot: cutoff,
                title: `Chốt kho Baseline 15-05 (Cut-off 17h)`,
                ghichu: 'Reset tồn kho về 0 cho sản phẩm không có trong file. Cập nhật theo thực tế kiểm kê 15-5.',
                khoId: khoId,
                codeId: `BASELINE_FULL_15052026_${Date.now()}`,
                isActive: true,
                isLocked: true,
                lockedAt: new Date()
            }
        });

        console.log(`Created Chotkho Master: ${chotkhoMaster.id}`);

        // 5. Create Details and Update Stock
        // For performance with many records, we'll batch the createMany and then update stock
        const detailRecords = details.map(d => ({
            chotkhoId: chotkhoMaster.id,
            sanphamId: d.sanphamId,
            sltonhethong: new Decimal(d.sltonhethong),
            sltonthucte: new Decimal(d.sltonthucte),
            slhuy: new Decimal(d.slhuy),
            chenhlech: new Decimal(d.sltonhethong - d.sltonthucte - d.slhuy),
            giaGocSnapshot: new Decimal(d.giagoc),
            ngaychot: cutoff
        }));

        // Prisma createMany is faster
        await tx.chotkhodetail.createMany({
            data: detailRecords
        });
        console.log(`Created ${detailRecords.length} Chotkhodetail records.`);

        // 6. Update Stock levels
        // For SanphamKho and TonKho, we have to do them one by one or use raw SQL for performance
        // Given there are ~1500 products, let's do it in a loop for reliability
        for (const d of details) {
            // Update SanphamKho (HCM)
            await tx.sanphamKho.upsert({
                where: { sanphamId_khoId: { sanphamId: d.sanphamId, khoId: khoId } },
                create: { sanphamId: d.sanphamId, khoId: khoId, soluong: new Decimal(d.sltonthucte) },
                update: { soluong: new Decimal(d.sltonthucte), updatedAt: new Date() }
            });

            // Update TonKho (Global)
            await tx.tonKho.upsert({
                where: { sanphamId: d.sanphamId },
                create: { sanphamId: d.sanphamId, slton: new Decimal(d.sltonthucte), sltontt: new Decimal(d.sltonthucte) },
                update: { slton: new Decimal(d.sltonthucte), sltontt: new Decimal(d.sltonthucte), updatedAt: new Date() }
            });
        }
        console.log('Stock levels updated for all products.');

    }, {
        timeout: 600000 // 10 minutes
    });

    console.log('Full Baseline Process COMPLETED.');
}

main().catch(e => {
    console.error('FAILED:', e);
}).finally(() => prisma.$disconnect());

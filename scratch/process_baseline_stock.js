const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const XLSX = require('xlsx');
const { Decimal } = require('@prisma/client/runtime/library');

async function main() {
    const filePath = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 15-5.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheet1 = workbook.Sheets['sheet1'];
    const data = XLSX.utils.sheet_to_json(sheet1);

    const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM (KHO_TONG_ID)
    const ngaychot = new Date('2026-05-15T23:59:59Z'); // Use UTC for consistency if needed, or local

    console.log(`Processing baseline for ${data.length} products...`);

    const details = [];
    for (const row of data) {
        const masp = row.masp;
        const slton = parseFloat(row.slton) || 0;
        const slhuy = parseFloat(row.slhuy) || 0;

        if (!masp) continue;

        const product = await prisma.sanpham.findUnique({
            where: { masp: masp }
        });

        if (product) {
            // Get current system stock for this product at this warehouse
            const currentSpKho = await prisma.sanphamKho.findUnique({
                where: {
                    sanphamId_khoId: {
                        sanphamId: product.id,
                        khoId: khoId
                    }
                }
            });
            const sltonhethong = currentSpKho ? Number(currentSpKho.soluong) : 0;

            details.push({
                sanphamId: product.id,
                sltonhethong: sltonhethong,
                sltonthucte: slton,
                slhuy: slhuy,
                giagoc: Number(product.giagoc) || 0,
                ghichu: 'Chốt kho Baseline từ file Ton-Huy 15-5.xlsx'
            });
        } else {
            console.warn(`Product not found in DB: ${masp}`);
        }
    }

    if (details.length === 0) {
        console.error('No products matched!');
        return;
    }

    console.log(`Starting transaction for ${details.length} details...`);

    await prisma.$transaction(async (tx) => {
        const chotkhoMaster = await tx.chotkho.create({
            data: {
                ngaychot: ngaychot,
                title: `Chốt kho Baseline 15-05-2026`,
                ghichu: 'Cập nhật số dư kho Baseline 15-5 theo yêu cầu (không ảnh hưởng ngày mai)',
                khoId: khoId,
                codeId: `BASELINE_15052026_${Date.now()}`,
                isActive: true,
                isLocked: true, // Lock this baseline
                lockedAt: new Date()
            }
        });

        console.log(`Created Chotkho Master: ${chotkhoMaster.id}`);

        for (const detail of details) {
            const chenhlech = detail.sltonhethong - detail.sltonthucte - detail.slhuy;
            const giaTriChenhLech = chenhlech * detail.giagoc;
            const giaTriHuy = detail.slhuy * detail.giagoc;

            await tx.chotkhodetail.create({
                data: {
                    chotkhoId: chotkhoMaster.id,
                    sanphamId: detail.sanphamId,
                    sltonhethong: new Decimal(detail.sltonhethong),
                    sltonthucte: new Decimal(detail.sltonthucte),
                    slhuy: new Decimal(detail.slhuy),
                    chenhlech: new Decimal(chenhlech),
                    giaGocSnapshot: new Decimal(detail.giagoc),
                    giaTriChenhLech: new Decimal(giaTriChenhLech),
                    giaTriHuy: new Decimal(giaTriHuy),
                    ghichu: detail.ghichu,
                    ngaychot: ngaychot
                }
            });

            // Update SanphamKho
            await tx.sanphamKho.upsert({
                where: {
                    sanphamId_khoId: {
                        sanphamId: detail.sanphamId,
                        khoId: khoId
                    }
                },
                create: {
                    sanphamId: detail.sanphamId,
                    khoId: khoId,
                    soluong: new Decimal(detail.sltonthucte)
                },
                update: {
                    soluong: new Decimal(detail.sltonthucte),
                    updatedAt: new Date()
                }
            });

            // Update TonKho
            await tx.tonKho.upsert({
                where: { sanphamId: detail.sanphamId },
                create: {
                    sanphamId: detail.sanphamId,
                    slton: new Decimal(detail.sltonthucte),
                    sltontt: new Decimal(detail.sltonthucte)
                },
                update: {
                    slton: new Decimal(detail.sltonthucte),
                    sltontt: new Decimal(detail.sltonthucte),
                    updatedAt: new Date()
                }
            });
        }
    }, {
        timeout: 120000 // Increase timeout for large transaction
    });

    console.log('Successfully updated baseline stock.');
}

main().catch(e => {
    console.error('FAILED:', e);
}).finally(() => prisma.$disconnect());

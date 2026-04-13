
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const MASPS = [
    'I100233', 'I100479', 'I100207', 'I100003', 'I100002',
    'I100164', 'I100165', 'I100166', 'I100004', 'I100256', 'I100113'
];

async function main() {
    console.log('--- PRODUCT DATA ---');
    const products = await prisma.sanpham.findMany({
        where: {
            masp: { in: MASPS }
        },
        include: {
            TonKho: true,
            SanphamKho: {
                include: {
                    kho: true
                }
            }
        }
    });

    products.forEach(p => {
        console.log(`\nProduct: ${p.title} (${p.masp})`);
        console.log(`  Unit: ${p.dvt}`);
        console.log(`  System Total (soluong): ${p.soluong}`);
        console.log(`  Stock Total (soluongkho): ${p.soluongkho}`);
        if (p.TonKho) {
            console.log(`  TonKho slton: ${p.TonKho.slton}`);
            console.log(`  TonKho sltontt: ${p.TonKho.sltontt}`);
        }
        p.SanphamKho.forEach(sk => {
            console.log(`  Warehouse ${sk.kho.name}: ${sk.soluong}`);
        });
    });

    console.log('\n--- LATEST RECONCILIATIONS ---');
    const reconciliations = await prisma.chotkhodetail.findMany({
        where: {
            sanpham: { masp: { in: MASPS } }
        },
        orderBy: {
            ngaychot: 'desc'
        },
        take: 30, // reduce limit to avoid too much output
        include: {
            sanpham: true,
            chotkho: {
                include: {
                    kho: true
                }
            }
        }
    });

    reconciliations.forEach(r => {
        console.log(`[${r.ngaychot.toISOString()}] ${r.sanpham.masp} - ${r.sanpham.title}`);
        console.log(`  Warehouse: ${r.chotkho?.kho?.name || 'N/A'}`);
        console.log(`  System: ${r.sltonhethong}`);
        console.log(`  Physical: ${r.sltonthucte}`);
        console.log(`  Diff: ${r.chenhlech}`);
        console.log(`  Note: ${r.ghichu}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

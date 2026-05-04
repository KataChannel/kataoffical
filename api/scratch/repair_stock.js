import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        postgres: {
            url: 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public'
        }
    }
});

async function main() {
    const masp = 'I100479';
    const product = await prisma.sanpham.findUnique({
        where: { masp },
        include: {
            TonKho: true
        }
    });

    if (!product) {
        console.log('Product not found');
        return;
    }

    console.log('Product:', product.title);
    const tonkho = product.TonKho;

    // Get last Chotkho detail using select to avoid missing columns
    const lastDetail = await prisma.chotkhodetail.findFirst({
        where: { sanphamId: product.id },
        orderBy: { ngaychot: 'desc' },
        select: {
            id: true,
            ngaychot: true,
            sltonthucte: true,
            sltonhethong: true
        }
    });

    console.log('\n--- LAST CHOT KHO DETAIL ---');
    console.log('Time:', lastDetail?.ngaychot);
    console.log('Detail:', JSON.stringify(lastDetail, null, 2));

    // Get all orders since last chotkho (or all time if none)
    const orders = await prisma.donhangsanpham.findMany({
        where: {
            idSP: product.id,
            donhang: {
                status: { not: 'huy' }
            }
        },
        include: {
            donhang: {
                select: {
                    id: true,
                    status: true,
                    madonhang: true,
                    createdAt: true
                }
            }
        }
    });

    console.log('\n--- ACTIVE ORDERS ---');
    let totalDadat = 0;
    let totalDagiao = 0;
    
    for (const o of orders) {
        const sldat = Number(o.sldat);
        const slgiao = Number(o.slgiao);
        
        if (o.donhang.status === 'dadat') {
            totalDadat += sldat;
            console.log(`- [PENDING] ${o.donhang.madonhang}: ${sldat}`);
        } else if (['dagiao', 'danhan', 'hoanthanh'].includes(o.donhang.status)) {
            totalDagiao += slgiao;
            console.log(`- [FULFILLED] ${o.donhang.madonhang}: ${slgiao}`);
        }
    }

    console.log('\nSummary:');
    console.log('- Total Pending (Dadat):', totalDadat);
    console.log('- Total Fulfilled (Dagiao/Danhan):', totalDagiao);

    // Get last chotkho physical stock
    const basePhysical = Number(lastDetail?.sltonthucte || 0);
    console.log('Base Physical (from ChotKho):', basePhysical);

    const calculatedPhysical = basePhysical - totalDagiao;
    const calculatedAvailable = calculatedPhysical - totalDadat;

    console.log('\n--- FINAL RECONCILIATION ---');
    console.log('Calculated Physical (sltontt) = Base - Fulfilled:', calculatedPhysical);
    console.log('Calculated Available (slton) = Physical - Pending:', calculatedAvailable);
    console.log('Calculated Pending (slchogiao):', totalDadat);
    
    console.log('\nCurrent DB State:', {
        slton: Number(tonkho?.slton),
        sltontt: Number(tonkho?.sltontt),
        slchogiao: Number(tonkho?.slchogiao)
    });

    if (Math.abs(Number(tonkho?.slton) - calculatedAvailable) > 0.01 || 
        Math.abs(Number(tonkho?.sltontt) - calculatedPhysical) > 0.01) {
        console.log('\n⚠️ REPAIRING DATA...');
        await prisma.tonKho.update({
            where: { id: tonkho.id },
            data: {
                slton: calculatedAvailable,
                sltontt: calculatedPhysical,
                slchogiao: totalDadat,
                updatedAt: new Date()
            }
        });
        console.log('✅ REPAIR COMPLETE!');
    } else {
        console.log('\n✅ Data is already correct!');
    }
}

main().finally(() => prisma.$disconnect());

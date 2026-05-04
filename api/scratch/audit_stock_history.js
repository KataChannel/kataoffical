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
    console.log('Current TonKho in DB:', JSON.stringify(tonkho, null, 2));

    // Get last Chotkho detail directly to avoid Chotkho table issue
    const lastDetail = await prisma.chotkhodetail.findFirst({
        where: { sanphamId: product.id },
        orderBy: { ngaychot: 'desc' }
    });

    if (lastDetail) {
        console.log('\n--- LAST CHOT KHO DETAIL ---');
        console.log('Time:', lastDetail.ngaychot);
        console.log('Detail:', JSON.stringify(lastDetail, null, 2));

        // Get PhieuKho since last ChotKho
        const phieuKhos = await prisma.phieuKhoSanpham.findMany({
            where: {
                sanphamId: product.id,
                phieuKho: {
                    ngay: { gt: lastDetail.ngaychot }
                }
            },
            include: {
                phieuKho: true
            }
        });

        console.log('\n--- MOVEMENTS SINCE CHOT KHO ---');
        let totalXuat = 0;
        let totalNhap = 0;
        for (const pk of phieuKhos) {
            if (pk.phieuKho.type === 'xuat') totalXuat += Number(pk.soluong);
            else totalNhap += Number(pk.soluong);
            console.log(`- [${pk.phieuKho.maphieu}] ${pk.phieuKho.type}: ${pk.soluong} (at ${pk.phieuKho.ngay})`);
        }
        
        console.log('\nTotal Xuat (from PhieuKho):', totalXuat);
        console.log('Total Nhap (from PhieuKho):', totalNhap);
        
        const expectedPhysical = Number(lastDetail.sltonthucte) + totalNhap - totalXuat;
        console.log('Calculated Expected Physical (sltontt):', expectedPhysical);
        console.log('DB sltontt:', tonkho?.sltontt);
    }

    // Get all orders that are NOT cancelled
    const orders = await prisma.donhangsanpham.findMany({
        where: {
            idSP: product.id,
            donhang: {
                status: { not: 'huy' },
                ngaygiao: { gt: lastDetail?.ngaychot || new Date(0) }
            }
        },
        include: {
            donhang: true
        }
    });

    console.log('\n--- ORDERS SINCE CHOT KHO ---');
    let totalDadat = 0;
    let totalDagiao = 0;
    let totalDanhan = 0;
    
    for (const o of orders) {
        const sldat = Number(o.sldat);
        const slgiao = Number(o.slgiao);
        const slnhan = Number(o.slnhan);
        
        if (o.donhang.status === 'dadat') totalDadat += sldat;
        if (['dagiao', 'danhan', 'hoanthanh'].includes(o.donhang.status)) {
             totalDagiao += slgiao;
             if (o.donhang.status === 'danhan' || o.donhang.status === 'hoanthanh') totalDanhan += slnhan;
        }
        
        console.log(`- Order ${o.donhang.madonhang} [${o.donhang.status}]: Dat=${sldat}, Giao=${slgiao}, Nhan=${slnhan}`);
    }

    console.log('\nSummary:');
    console.log('- Total Pending (Dadat):', totalDadat);
    console.log('- Total Fulfilled (Dagiao/Danhan):', totalDagiao);

    console.log('\n--- CORRECT LOGIC CALCULATION ---');
    const physical = Number(lastDetail?.sltonthucte || 0) - totalDagiao;
    const available = physical - totalDadat;
    
    console.log('Correct Physical (sltontt) should be:', physical);
    console.log('Correct Available (slton) should be:', available);
    console.log('Current DB values:', { slton: tonkho?.slton, sltontt: tonkho?.sltontt, slchogiao: tonkho?.slchogiao });
}

main().finally(() => prisma.$disconnect());

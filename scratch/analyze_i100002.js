const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';
const START_TIME = new Date('2026-04-08T13:00:00+07:00');

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP }
    });

    if (!product) {
        console.log("Product not found");
        return;
    }

    console.log("Current Product Info:", {
        id: product.id,
        masp: product.masp,
        title: product.title,
        slkho: product.slkho
    });

    // Sales
    const sales = await prisma.donhangsanpham.findMany({
        where: {
            idSP: product.id,
            donhang: {
                status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                updatedAt: { gte: START_TIME }
            }
        },
        include: {
            donhang: true
        }
    });

    // Purchases
    const purchases = await prisma.dathangsanpham.findMany({
        where: {
            idSP: product.id,
            dathang: {
                status: 'danhan',
                updatedAt: { gte: START_TIME }
            }
        },
        include: {
            dathang: true
        }
    });

    // Stock Takes
    const stockTakes = await prisma.chotkhodetail.findMany({
        where: {
            sanphamId: product.id,
            chotkho: {
                ngaychot: { gte: START_TIME }
            }
        },
        include: {
            chotkho: true
        }
    });

    console.log("\n--- Transactions Details ---");
    const all = [];

    sales.forEach(s => all.push({ 
        type: 'SALE', 
        time: s.donhang.updatedAt, 
        qty: -(s.slnhan || s.sldat || 0), 
        ref: s.donhang.madonhang,
        status: s.donhang.status
    }));

    purchases.forEach(p => all.push({ 
        type: 'PURCHASE', 
        time: p.dathang.updatedAt, 
        qty: (p.slnhan || p.sldat || 0), 
        ref: p.dathang.madncc,
        status: p.dathang.status
    }));

    stockTakes.forEach(st => all.push({ 
        type: 'STOCKTAKE', 
        time: st.chotkho.ngaychot, 
        sys: st.sltonhethong, 
        actual: st.sltonthucte, 
        diff: st.chenhlech, 
        ref: st.chotkho.codeId 
    }));

    all.sort((a, b) => a.time - b.time);
    console.table(all);

    // Also look for transactions WITHOUT START_TIME filter to see the total sum
    const allSalesTotal = await prisma.donhangsanpham.aggregate({
        where: { idSP: product.id, donhang: { status: { in: ['dagiao', 'danhan', 'hoanthanh'] } } },
        _sum: { slnhan: true, sldat: true }
    });

    const allPurchasesTotal = await prisma.dathangsanpham.aggregate({
        where: { idSP: product.id, dathang: { status: 'danhan' } },
        _sum: { slnhan: true, sldat: true }
    });

    console.log("\n--- Totals (Lifetime) ---");
    console.log("Total Sales Sum:", allSalesTotal._sum);
    console.log("Total Purchases Sum:", allPurchasesTotal._sum);
}

main().catch(console.error).finally(() => prisma.$disconnect());

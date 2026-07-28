const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP = 'I100002';
const START_TIME = new Date('2026-04-08T13:00:00+07:00');

async function main() {
    const product = await prisma.sanpham.findUnique({
        where: { masp: MASP },
        include: { TonKho: true }
    });

    if (!product) {
        console.log("Product not found");
        return;
    }

    console.log("Current Product Info:", {
        id: product.id,
        masp: product.masp,
        title: product.title,
        soluongkho: product.soluongkho,
        TonKho_slton: product.TonKho?.slton
    });

    // Sales (Xuat kho)
    const sales = await prisma.donhangsanpham.findMany({
        where: {
            idSP: product.id,
            donhang: {
                status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
                updatedAt: { gte: START_TIME }
            }
        },
        include: {
            donhang: {
                select: { madonhang: true, updatedAt: true, status: true, khachhang: { select: { name: true } } }
            }
        }
    });

    // Purchases (Nhap kho)
    const purchases = await prisma.dathangsanpham.findMany({
        where: {
            idSP: product.id,
            dathang: {
                status: 'danhan',
                updatedAt: { gte: START_TIME }
            }
        },
        include: {
            dathang: {
                select: { madncc: true, updatedAt: true, status: true, nhacungcap: { select: { name: true } } }
            }
        }
    });

    // Stock Takes (Chot kho)
    const stockTakes = await prisma.chotkhodetail.findMany({
        where: {
            sanphamId: product.id,
            chotkho: {
                ngaychot: { gte: START_TIME }
            }
        },
        include: {
            chotkho: {
                select: { codeId: true, ngaychot: true, title: true }
            }
        }
    });

    console.log("\n--- Transactions Details ---");
    const all = [];

    sales.forEach(s => all.push({ 
        type: 'XUAT', 
        time: s.donhang.updatedAt, 
        qty: -(s.slnhan || s.sldat || 0), 
        ref: s.donhang.madonhang,
        note: `Khách: ${s.donhang.khachhang?.name || 'N/A'}`
    }));

    purchases.forEach(p => all.push({ 
        type: 'NHAP', 
        time: p.dathang.updatedAt, 
        qty: (p.slnhan || p.sldat || 0), 
        ref: p.dathang.madncc,
        note: `NCC: ${p.dathang.nhacungcap?.name || 'N/A'}`
    }));

    stockTakes.forEach(st => all.push({ 
        type: 'CHOT', 
        time: st.chotkho.ngaychot, 
        qty: 0, 
        sys: Number(st.sltonhethong), 
        actual: Number(st.sltonthucte), 
        change: Number(st.chenhlech), 
        ref: st.chotkho.codeId,
        note: st.chotkho.title
    }));

    all.sort((a, b) => a.time - b.time);
    
    let currentBalance = Number(product.soluongkho || product.TonKho?.slton || 0);
    let tempBalance = currentBalance;
    
    const timeline = [];
    const reversedAll = [...all].reverse();
    
    reversedAll.forEach(ev => {
        let change = 0;
        if (ev.type === 'NHAP' || ev.type === 'XUAT') {
            change = Number(ev.qty);
        } else if (ev.type === 'CHOT') {
            // Chot kho adjustment logic:
            // Usually, chenhlech = sys - actual (if it's a loss?)
            // Or actual - sys.
            // Let's use the provided 'change' field assuming it is what was applied to the stock.
            change = Number(ev.change || 0);
        }
        
        timeline.unshift({ ...ev, balanceAfter: tempBalance, balanceBefore: Number((tempBalance - change).toFixed(3)) });
        tempBalance = Number((tempBalance - change).toFixed(3));
    });

    console.table(timeline.map(e => ({
        time: e.time.toISOString(),
        type: e.type,
        qty: e.qty || '',
        sys: e.sys || '',
        actual: e.actual || '',
        change: e.change || '',
        before: e.balanceBefore,
        after: e.balanceAfter,
        ref: e.ref,
        note: e.note
    })));

    console.log("\nSummary:");
    console.log("Calculated Baseline (Apr 8 13:00):", tempBalance);
    console.log("Current System Stock:", currentBalance);
}

main().catch(console.error).finally(() => prisma.$disconnect());

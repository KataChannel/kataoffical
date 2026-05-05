"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function traceProduct(masp) {
    const p = await prisma.sanpham.findUnique({
        where: { masp },
        include: {
            TonKho: true,
            chotkhodetail: {
                orderBy: { ngaychot: 'desc' },
                include: { chotkho: true }
            }
        }
    });
    if (!p)
        return console.log('Not found');
    console.log(`\n=== TRACING ${masp} (${p.title}) ===`);
    const sessions = p.chotkhodetail.slice(0, 5);
    for (let i = 0; i < sessions.length - 1; i++) {
        const cur = sessions[i];
        const prev = sessions[i + 1];
        console.log(`\nInterval: from [${prev.ngaychot.toLocaleString()}] to [${cur.ngaychot.toLocaleString()}]`);
        console.log(`  Prev Session Snapshot: Reality: ${prev.sltonthucte} | System: ${prev.sltonhethong}`);
        console.log(`  Current Session Snapshot: System: ${cur.sltonhethong} | Reality: ${cur.sltonthucte}`);
        const deliveries = await prisma.donhangsanpham.findMany({
            where: {
                idSP: p.id,
                donhang: {
                    ngaygiao: { gt: prev.ngaychot, lte: cur.ngaychot },
                    status: { in: ['dagiao', 'danhan', 'hoanthanh'] }
                }
            },
            include: { donhang: true }
        });
        const imports = await prisma.dathangsanpham.findMany({
            where: {
                idSP: p.id,
                dathang: {
                    updatedAt: { gt: prev.ngaychot, lte: cur.ngaychot },
                    status: 'danhan'
                }
            },
            include: { dathang: true }
        });
        const totalOut = deliveries.reduce((s, i) => s + Number(i.slgiao || i.sldat || 0), 0);
        const totalIn = imports.reduce((s, i) => s + Number(i.slnhan || 0), 0);
        console.log(`  Real-time Activity (Orders/Imports):`);
        console.log(`    Total Out: ${totalOut}`);
        console.log(`    Total In: ${totalIn}`);
        const expectedSystem = Number(prev.sltonthucte) + totalIn - totalOut;
        console.log(`  Expected System Stock based on Prev Reality + Activity: ${expectedSystem}`);
        console.log(`  Actual Snapshot System: ${cur.sltonhethong}`);
        console.log(`  GAP: ${Number(cur.sltonhethong) - expectedSystem}`);
        if (deliveries.length > 0) {
            console.log('    Deliveries:');
            deliveries.forEach(d => console.log(`      - ${d.donhang.madonhang}: ${d.slgiao || d.sldat} (Status: ${d.donhang.status}, NgayGiao: ${d.donhang.ngaygiao?.toLocaleString()})`));
        }
        if (imports.length > 0) {
            console.log('    Imports:');
            imports.forEach(im => console.log(`      - ${im.dathang.madncc}: ${im.slnhan} (Status: ${im.dathang.status}, UpdatedAt: ${im.dathang.updatedAt?.toLocaleString()})`));
        }
    }
}
async function main() {
    await traceProduct('I100207');
    await traceProduct('I100164');
}
main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=deep_trace_product.js.map
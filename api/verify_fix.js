
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MASP_LIST = ['I100727']; // Mãng Cầu Xiêm
const KHO_HCM = '4cc01811-61f5-4bdc-83de-a493764e9258';

async function main() {
    const products = await prisma.sanpham.findMany({
        where: { masp: { in: MASP_LIST } },
        select: { id: true, masp: true, title: true }
    });

    if (products.length === 0) return;
    const spId = products[0].id;

    // Simulate calculateStockFromLogs
    const lastChot = await prisma.chotkhodetail.findFirst({
      where: {
        sanphamId: spId,
        chotkho: {
          khoId: KHO_HCM,
          isActive: true
        }
      },
      orderBy: { ngaychot: 'desc' }
    });

    const startTime = lastChot ? lastChot.ngaychot : new Date(0);
    const initialQty = lastChot ? Number(lastChot.sltonthucte) : 0;

    console.log(`Last Chot: ${startTime.toISOString()} | Initial: ${initialQty}`);

    // FIXED LOGIC: Include all warehouses if KHO_HCM
    const xuat = await prisma.donhangsanpham.findMany({
      where: {
        idSP: spId,
        donhang: {
          // NO khoId filter for KHO_HCM (Aggregate mode)
          status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
          updatedAt: { gt: startTime }
        }
      }
    });

    const nhap = await prisma.dathangsanpham.findMany({
      where: {
        idSP: spId,
        dathang: {
          // NO khoId filter for KHO_HCM (Aggregate mode)
          status: 'danhan',
          updatedAt: { gt: startTime }
        }
      }
    });

    let xuatTotal = 0;
    xuat.forEach(x => xuatTotal += Number(x.slnhan || x.slgiao || x.sldat));
    let nhapTotal = 0;
    nhap.forEach(n => nhapTotal += Number(n.slnhan));

    const finalCalc = initialQty + nhapTotal - xuatTotal;

    console.log(`Calculated (Fixed Logic): ${initialQty} + ${nhapTotal} (Nhap) - ${xuatTotal} (Xuat) = ${finalCalc}`);
    
    const currentStock = await prisma.sanphamKho.findUnique({
        where: { sanphamId_khoId: { sanphamId: spId, khoId: KHO_HCM } }
    });
    console.log(`Actual Physical Stock in HCM: ${currentStock?.soluong}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());

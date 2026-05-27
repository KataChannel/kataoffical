const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Checking Negative Stock Calculation (Strictly Past) ---');
  
  // 1. Find latest Excel/Base Line Chotkho strictly in the past
  const latestChot = await prisma.chotkho.findFirst({
    where: {
      isActive: true,
      ngaychot: { lt: new Date() },
      OR: [
        { title: { contains: 'Base Line', mode: 'insensitive' } },
        { title: { contains: 'EXCEL', mode: 'insensitive' } },
        { title: { contains: 'Chốt kho', mode: 'insensitive' } }
      ]
    },
    orderBy: { ngaychot: 'desc' }
  });

  if (!latestChot) {
    console.log('No recent Excel/Base Line chotkho in the past found.');
    return;
  }

  console.log(`Latest Past Chotkho Session: ${latestChot.title} (${latestChot.id}) at ${latestChot.ngaychot}`);

  const startTime = latestChot.ngaychot;

  // 2. Fetch all products
  const products = await prisma.sanpham.findMany({
    select: {
      id: true,
      masp: true,
      title: true,
      dvt: true
    }
  });
  console.log(`Total products: ${products.length}`);

  // 3. Fetch initial quantities from latest chotkhodetail
  const chotDetails = await prisma.chotkhodetail.findMany({
    where: { chotkhoId: latestChot.id },
    select: {
      sanphamId: true,
      sltonthucte: true
    }
  });

  const initialQtyMap = new Map();
  chotDetails.forEach(d => {
    initialQtyMap.set(d.sanphamId, Number(d.sltonthucte || 0));
  });

  // 4. Fetch all imports (received) since startTime
  const imports = await prisma.dathangsanpham.findMany({
    where: {
      dathang: {
        status: 'danhan',
        updatedAt: { gt: startTime }
      }
    },
    select: {
      idSP: true,
      slnhan: true,
      slgiao: true
    }
  });

  const importMap = new Map();
  imports.forEach(imp => {
    const qty = Number(imp.slnhan || imp.slgiao || 0);
    importMap.set(imp.idSP, (importMap.get(imp.idSP) || 0) + qty);
  });

  // 5. Fetch all exports since startTime
  const exports = await prisma.donhangsanpham.findMany({
    where: {
      donhang: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        updatedAt: { gt: startTime }
      }
    },
    select: {
      idSP: true,
      slnhan: true,
      slgiao: true,
      sldat: true
    }
  });

  const exportMap = new Map();
  exports.forEach(exp => {
    const qty = Number(exp.slnhan || exp.slgiao || exp.sldat || 0);
    exportMap.set(exp.idSP, (exportMap.get(exp.idSP) || 0) + qty);
  });

  // 6. Calculate system stock and find negative ones
  const negativeProducts = [];
  products.forEach(p => {
    const initialQty = initialQtyMap.get(p.id) || 0;
    const receivedQty = importMap.get(p.id) || 0;
    const shippedQty = exportMap.get(p.id) || 0;
    const systemQty = initialQty + receivedQty - shippedQty;

    if (systemQty < 0) {
      negativeProducts.push({
        id: p.id,
        masp: p.masp,
        title: p.title,
        dvt: p.dvt,
        initialQty,
        receivedQty,
        shippedQty,
        systemQty
      });
    }
  });

  console.log(`Found ${negativeProducts.length} negative stock products:`);
  console.log(JSON.stringify(negativeProducts.slice(0, 10), null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

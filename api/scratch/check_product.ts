
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const productId = 'eda0e3cc-ac3f-4f38-8eba-05093b340987';
  
  const product = await prisma.sanpham.findUnique({
    where: { id: productId },
    include: {
      TonKho: true,
      SanphamKho: {
        include: { kho: true }
      }
    }
  });

  console.log('--- Product Info ---');
  console.log(JSON.stringify(product, null, 2));

  // Simulating ChotkhoService.calculateStockFromLogs
  const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM
  
  // 1. Tìm phiên chốt kho gần nhất
  const lastChot = await prisma.chotkhodetail.findFirst({
    where: {
      sanphamId: productId,
      chotkho: {
        khoId,
        isActive: true,
      }
    },
    orderBy: { ngaychot: 'desc' },
    include: { chotkho: true }
  });

  const startTime = lastChot ? lastChot.ngaychot : new Date(0);
  const initialQty = lastChot ? Number(lastChot.sltonthucte) : 0;

  console.log('--- Log Analysis ---');
  console.log('Last Chot:', lastChot ? { ngaychot: lastChot.ngaychot, sltonthucte: lastChot.sltonthucte } : 'None');

  // 2. Lấy tất cả các phiếu xuất
  const xuat = await prisma.donhangsanpham.findMany({
    where: {
      idSP: productId,
      donhang: {
        khoId: khoId,
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        updatedAt: { gt: startTime }
      }
    }
  });

  // 3. Lấy tất cả các phiếu nhập
  const nhap = await prisma.dathangsanpham.findMany({
    where: {
      idSP: productId,
      dathang: {
        khoId: khoId,
        status: 'danhan',
        updatedAt: { gt: startTime }
      }
    }
  });

  const xuatQty = xuat.reduce((acc, x) => acc + Number(x.slnhan || x.slgiao || x.sldat), 0);
  const nhapQty = nhap.reduce((acc, n) => acc + Number(n.slnhan || n.slgiao), 0);

  const currentCalc = initialQty + nhapQty - xuatQty;

  console.log('Initial Qty:', initialQty);
  console.log('Nhap Qty:', nhapQty);
  console.log('Xuat Qty:', xuatQty);
  console.log('Current Calc:', currentCalc);

}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

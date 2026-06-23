import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateMaSP(): Promise<string> {
  const latest = await prisma.sanpham.findFirst({
    where: {
      masp: {
        startsWith: 'I1',
      },
    },
    orderBy: { masp: 'desc' },
  });

  let nextNumber = 1;
  if (latest) {
    const match = latest.masp.match(/I1(\d+)/);
    if (match) {
      nextNumber = parseInt(match[1]) + 1;
    }
  }

  return `I1${nextNumber.toString().padStart(5, '0')}`;
}

async function main() {
  const masp = await generateMaSP();
  console.log('Sinh mã sản phẩm mới:', masp);

  const maxOrder = await prisma.sanpham.aggregate({
    _max: { order: true },
  });
  const newOrder = (maxOrder._max?.order || 0) + 1;

  const newProduct = await prisma.sanpham.create({
    data: {
      title: 'Đậu Ván',
      dvt: 'Kg',
      masp,
      order: newOrder,
      isActive: true,
      giaban: 0,
      giagoc: 0,
      haohut: 0,
      soluong: 0,
      soluongkho: 0
    },
  });

  console.log('Đã tạo sản phẩm thành công:');
  console.log(JSON.stringify(newProduct, null, 2));
}

main()
  .catch((e) => {
    console.error('Lỗi khi tạo sản phẩm:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

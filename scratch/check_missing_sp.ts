import { PrismaClient } from '../api/node_modules/@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const maspList = [
    'I100484', // Hoa cúc vàng
    'I100236', // Nấm mèo
    'I100226', // Tỏi bắc
    'I100227', // Tỏi Lý Sơn
    'I100138', // Lá chanh Thái
    'I100223', // Rau thyme
    'I100665', // Đậu hủ trứng cây Ichiban 220gr
    'I100510', // Xoài thái
    'I100777', // Khoai tây hồng hai da
    'I100526', // Lá Giang (kg)
    'I100346'  // Hoa hồi
  ];

  for (const masp of maspList) {
    const sp = await prisma.sanpham.findUnique({
      where: { masp },
      include: { TonKho: true }
    });
    console.log(`${masp} (${sp?.title}): slton=${sp?.TonKho?.slton}, sltontt=${sp?.TonKho?.sltontt}`);
  }
  await prisma.$disconnect();
}

main();

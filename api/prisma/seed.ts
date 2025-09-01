import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Xóa dữ liệu theo thứ tự để tránh lỗi foreign key
  await prisma.donhangsanpham.deleteMany({});
  console.log('✅ Đã xóa tất cả donhangsanpham');

  await prisma.donhang.deleteMany({});
  console.log('✅ Đã xóa tất cả donhang');

  await prisma.dathangsanpham.deleteMany({});
  console.log('✅ Đã xóa tất cả dathangsanpham');

  await prisma.dathang.deleteMany({});
  console.log('✅ Đã xóa tất cả dathang');

  await prisma.chotkhoDetail.deleteMany({});
  console.log('✅ Đã xóa tất cả ChotkhoDetail');

  await prisma.phieuKhoSanpham.deleteMany({});
  console.log('✅ Đã xóa tất cả phieukhosanpham');

  await prisma.phieuKho.deleteMany({});
  console.log('✅ Đã xóa tất cả phieukho');
  
  await prisma.phieuKhoSanpham.deleteMany({});
  console.log('✅ Đã xóa tất cả phieukhoSanpham');

  // Reset tồn kho
  const updateTonkho = await prisma.tonKho.updateMany({
    data: {
      slton: 0,
      slchonhap: 0,
      slchogiao: 0
    }
  });

  console.log(`✅ Đã reset ${updateTonkho.count} bản ghi tồn kho!`);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

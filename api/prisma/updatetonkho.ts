import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateTonkho() {
  try {
    // Lấy tất cả tồn kho kèm thông tin khách hàng
    const tonkhos = await prisma.tonKho.findMany();

    // Cập nhật từng tồn kho
    for (const tonkho of tonkhos) {
      if (tonkho.slchonhap.toNumber() > 0 || tonkho.slchogiao.toNumber() > 0) {
          await prisma.tonKho.update({
            where: {
              id: tonkho.id
            },
            data: {
              // slton: tonkho.slton.toNumber() + tonkho.slchonhap.toNumber() - tonkho.slchogiao.toNumber(),
              slchogiao: 0, // Reset số lượng chờ giao
              slchonhap: 0 // Reset số lượng chọn nhập
            }
          });
      }
    }

    console.log('Cập nhật tồn kho thành công!');
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chạy function
updateTonkho();
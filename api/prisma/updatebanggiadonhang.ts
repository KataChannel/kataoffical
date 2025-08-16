import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateBanggiaIdDonhang() {
  try {
    // Lấy tất cả đơn hàng kèm thông tin khách hàng
    const donhangs = await prisma.donhang.findMany({
      include: {
        khachhang:{
          include: {
            banggia: true // Lấy thông tin bảng giá của khách hàng
          }
        }
      }
    });

    // Cập nhật từng đơn hàng
    for (const donhang of donhangs) {
      if (donhang.khachhang?.id && donhang.khachhang.banggia?.id) {
        // Kiểm tra xem banggia có tồn tại không
        const banggiaExists = await prisma.banggia.findUnique({
          where: {
            id: donhang.khachhang.banggia.id
          }
        });
        
        if (banggiaExists) {
          await prisma.donhang.update({
            where: {
              id: donhang.id
            },
            data: {
              banggiaId: donhang.khachhang.banggia.id
            }
          });
        } else {
          console.log(`Banggia với id ${donhang.khachhang.banggia.id} không tồn tại cho đơn hàng ${donhang.id}`);
        }
      }
    }

    console.log('Cập nhật banggiaId cho đơn hàng thành công!');
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chạy function
updateBanggiaIdDonhang();
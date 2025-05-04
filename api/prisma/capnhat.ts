import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Giá trị mới bạn muốn cập nhật cho soluong và slkho
  // Thay đổi số 0 này thành giá trị mong muốn
  const newSoLuong = 0;
  const newSlKho = 0;

  const updateProducts = await prisma.sanpham.updateMany({
    // Không cần điều kiện `where` nếu bạn muốn cập nhật TẤT CẢ sản phẩm
    // where: {
    //   // Thêm điều kiện lọc nếu cần, ví dụ: chỉ cập nhật sản phẩm có hiengia = true
    //   // hiengia: true,
    // },
    data: {
      soluong: newSoLuong, // Cập nhật trường soluong
      soluongkho: newSlKho,     // Cập nhật trường slkho
      // Bạn cũng có thể cập nhật các trường khác ở đây nếu cần
      // viDuTruongKhac: 'giaTriMoi',
    },
  });

  console.log(`✅ Đã cập nhật soluong và slkho cho ${updateProducts.count} sản phẩm!`);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi cập nhật dữ liệu sản phẩm:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
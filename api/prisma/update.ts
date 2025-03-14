import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Lấy tất cả khách hàng
  const customers = await prisma.khachhang.findMany({
    select: { id: true, name: true, namenn: true },
  });

  // Cập nhật từng khách hàng
  for (const customer of customers) {
    await prisma.khachhang.update({
      where: { id: customer.id },
      data: {
        subtile: customer.name ? removeVietnameseAccents(customer.name) : null,
      },
    });
  }

  console.log(`✅ Đã cập nhật ${customers.length} khách hàng!`);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});



export function removeVietnameseAccents(text:any) {
  if (!text) {
      return ""; // Xử lý trường hợp đầu vào rỗng hoặc null
    }
    return text
      .replace(/đ/g, "d")
      .normalize("NFD") // Chuẩn hóa chuỗi về dạng NFD để tách dấu
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu thanh
      .replace(/[^a-zA-Z0-9]/g, "") // Loại bỏ tất cả ký tự không phải chữ cái hoặc số
      .toLowerCase(); // Chuyển đổi thành chữ thường
}
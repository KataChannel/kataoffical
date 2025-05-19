import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function importData() {
  const hoadonChitiets = await prisma.hoadonChitiet.findMany();
  for (const hoadonChitiet of hoadonChitiets) {
    if (hoadonChitiet.ten) {
      try {
        await prisma.hoadonChitiet.update({
          where: { id: hoadonChitiet.id },
          data: { title2: hoadonChitiet.title2 },
        });
        console.log(`✅ Updated title for hoadonChitiet with ID ${hoadonChitiet.id}`);
      } catch (error) {
        console.error(`⚠️ Error updating title for hoadonChitiet with ID ${hoadonChitiet.id}:`, error.message);
      }
    }
  }

  console.log('✅ Completed updating hoadonChitiet titles!');
  await prisma.$disconnect();
}

importData();



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
export function toSnakeCase(text:any) {
    return removeVietnameseAccents(text)
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/\W+/g, "_")
        .toLowerCase();
}
export function toKebabCase(text:any) {
    return removeVietnameseAccents(text)
        .replace(/\s+/g, "-")
        .toLowerCase();
}
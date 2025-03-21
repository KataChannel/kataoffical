import { PrismaClient } from '@prisma/client';
import { bangiakhachahng } from './migrations/dulieu';

const prisma = new PrismaClient();
const dulieus = bangiakhachahng
async function main() {
  const sanphams = await prisma.sanpham.findMany({
    select: { id: true,makh: true},
  });
  console.error(sanphams);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});


export function convertData(data1) {
  const result = {};

  data1.forEach(item => {
    if (item.banggiaId) {
      if (!result[item.banggiaId]) {
        result[item.banggiaId] = [];
      }
      result[item.banggiaId].push(item.khachhangId);
    }
  });

  return Object.keys(result).map(key => ({
    banggiaId: key,
    khachhangIds: result[key]
  }));
}

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
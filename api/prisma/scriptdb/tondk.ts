import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
const prisma = new PrismaClient();
const tondk = JSON.parse(fs.readFileSync('prisma/scriptdb/ton2022.json', 'utf-8'));
async function importData() {

  try {
    await Promise.all(
      tondk.map((item: any) =>
      prisma.hoadonChitiet.upsert({
        where: { id: item.idhoadon },
        update: {
        ten: item.ten,
        title: removeVietnameseAccents(item.ten),
        title2: removeVietnameseAccents(item.ten)
        },
        create: {
        ten: item.ten,
        title: removeVietnameseAccents(item.ten),
        title2: removeVietnameseAccents(item.ten),
        idhoadon: item.idhoadon,
        idhdon: item.idhoadon,
        dvtinh: item.dvtinh,
        sluong: Number(item.sluong),
        dgia: Number(item.dgia),
        thtien: Number(item.thtien)
      }
    })
      )
    );

  } catch (error: any) {
    console.error('Error updating hoadonChitiet titles:', error);
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
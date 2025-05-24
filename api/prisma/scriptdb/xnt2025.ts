import { PrismaClient } from '@prisma/client';
import * as fs from 'node:fs';
const prisma = new PrismaClient();
async function importData() {
  const data = JSON.parse(fs.readFileSync('prisma/scriptdb/xnt2025.json', 'utf-8'));
  try {
// Find groups of duplicate records (same codeId and title)
    const data1 = data.map((item: any) => {
      return {
        ...item,
        title: removeVietnameseAccents(item.ten),
      };
    });
    // Group data1 by title and sum up the numeric fields,
    // defaulting null, undefined or '' values to 0.
    const mergedData = Object.values(
      data1.reduce((acc: { [key: string]: any }, item: any) => {
      const key = item.title;
      const toNumber = (value: any): number => {
        return value == null || value === '' || isNaN(Number(value)) ? 0 : Number(value);
      };

      if (!acc[key]) {
        acc[key] = { ...item };
        acc[key].sldau = toNumber(item.sldau);
        acc[key].ttdau = toNumber(item.ttdau);
        acc[key].slnhap = toNumber(item.slnhap);
        acc[key].ttnhap = toNumber(item.ttnhap);
        acc[key].slxuat = toNumber(item.slxuat);
        acc[key].ttxuat = toNumber(item.ttxuat);
        acc[key].slton = toNumber(item.slton);
        acc[key].ttton = toNumber(item.ttton);
      } else {
        acc[key].sldau += toNumber(item.sldau);
        acc[key].ttdau += toNumber(item.ttdau);
        acc[key].slnhap += toNumber(item.slnhap);
        acc[key].ttnhap += toNumber(item.ttnhap);
        acc[key].slxuat += toNumber(item.slxuat);
        acc[key].ttxuat += toNumber(item.ttxuat);
        acc[key].slton += toNumber(item.slton);
        acc[key].ttton += toNumber(item.ttton);
      }
      return acc;
      }, {} as { [key: string]: any })
    );

    fs.writeFileSync('prisma/scriptdb/xnt2025-merged.json', JSON.stringify(mergedData, null, 2), 'utf-8');
    console.log('Merged data exported to prisma/scriptdb/xnt2025-merged.json');



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
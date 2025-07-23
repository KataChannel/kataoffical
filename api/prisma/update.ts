import { PrismaClient } from '@prisma/client';
import { bangiakhachahng } from './migrations/dulieu';
const fs = require('fs');
const path = require('path');

interface DonHangSanPham {
  id: string | number;
  donhangId: string | number;
  slgiao: number;
  slnhan: number;
}

const prisma = new PrismaClient();

async function main() {
  try {
    // Đọc dữ liệu từ file dh18.json
    const dh18Data = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'dh18.json'), 'utf-8')
    );
    
    // Đọc dữ liệu từ file dhsp.json
    const dhsp: DonHangSanPham[] = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'dhsp.json'), 'utf-8')
    );

    // Tạo map để tra cứu nhanh hơn
    const dhspMap = new Map(dhsp.map(dh => [dh.donhangId, dh]));

    // Chuẩn bị batch update
    const updatePromises:any[] = [];

    for (const donhangId of dh18Data) {
      const dh: any = dhspMap.get(donhangId);
      
      if (!dh) {
        console.warn(`⚠️ Không tìm thấy donhang với ID: ${donhangId}`);
        continue;
      }

      updatePromises.push(
        prisma.donhangsanpham.update({
          where: { id: dh.id },
          data: {
            sldat: dh.slgiao,
            slgiao: dh.slgiao,
            slnhan: dh.slnhan,
          }
        })
      );
    }

    // Thực hiện batch update
    await prisma.$transaction(updatePromises);

    console.log(`✅ Hoàn thành cập nhật ${updatePromises.length} bản ghi từ dh18.json`);

  } catch (error) {
    console.error('❌ Lỗi khi cập nhật dữ liệu:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export function convertData(data1: any[]) {
  const result: { [key: string]: any[] } = {};

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

export function removeVietnameseAccents(text: any) {
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

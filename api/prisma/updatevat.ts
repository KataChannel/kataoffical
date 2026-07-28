import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu cập nhật tongvat và tongtien cho tất cả đơn hàng...');
  
  // Lấy tất cả đơn hàng cùng với sản phẩm
  const donhangs = await prisma.donhang.findMany({
    include: {
      sanpham: {
        select: {
          id: true,
          giaban: true,
          slnhan: true,
        }
      }
    }
  });

  console.log(`📦 Tìm thấy ${donhangs.length} đơn hàng để xử lý`);
  
  let processedCount = 0;
  let errorCount = 0;

  for (const donhang of donhangs) {
    try {
      console.log(`\n📋 Xử lý đơn hàng: ${donhang.madonhang}`);
      
      // Tính tổng tiền từ sản phẩm: tong = sum(sanpham.giaban * sanpham.slnhan)
      const tong = donhang.sanpham.reduce((total, sp) => {
        const giaban = sp.giaban || new Decimal(0);
        const slnhan = sp.slnhan || new Decimal(0);
        const subtotal = giaban.mul(slnhan);
        return total.add(subtotal);
      }, new Decimal(0));

      // Tính thuế VAT: tongvat = tong * donhang.vat
      const vatRate = donhang.vat || new Decimal(0.05); // Default 5% nếu không có VAT
      const tongvat = tong.mul(vatRate);

      // Tính tổng tiền cuối: tongtien = tong + tongvat  
      const tongtien = tong.add(tongvat);

      console.log(`   💰 Tổng tiền gốc: ${tong.toString()}`);
      console.log(`   📊 VAT rate: ${vatRate.toString()} (${vatRate.mul(100).toString()}%)`);
      console.log(`   💸 Tổng VAT: ${tongvat.toString()}`);
      console.log(`   🎯 Tổng tiền cuối: ${tongtien.toString()}`);

      // Cập nhật đơn hàng
      await prisma.donhang.update({
        where: { id: donhang.id },
        data: {
          tongvat: tongvat,
          tongtien: tongtien
        }
      });

      processedCount++;
      console.log(`   ✅ Đã cập nhật thành công đơn hàng ${donhang.madonhang}`);

    } catch (error) {
      errorCount++;
      console.error(`   ❌ Lỗi khi xử lý đơn hàng ${donhang.madonhang}:`, error);
    }
  }

  console.log(`\n🎉 Hoàn thành cập nhật:`);
  console.log(`   ✅ Đã xử lý thành công: ${processedCount} đơn hàng`);
  console.log(`   ❌ Lỗi: ${errorCount} đơn hàng`);
  console.log(`   📊 Tổng cộng: ${donhangs.length} đơn hàng`);
}

/**
 * Helper function to calculate totals for a specific donhang
 * Formula: tong = sum(sanpham.giaban * sanpham.slnhan), tongvat = tong * vat, tongtien = tong + tongvat
 */
export async function calculateDonhangTotals(donhangId: string) {
  try {
    const donhang = await prisma.donhang.findUnique({
      where: { id: donhangId },
      include: {
        sanpham: {
          select: {
            id: true,
            giaban: true,
            slnhan: true,
          }
        }
      }
    });

    if (!donhang) {
      throw new Error(`Không tìm thấy đơn hàng với ID: ${donhangId}`);
    }

    // Tính tổng tiền từ sản phẩm
    const tong = donhang.sanpham.reduce((total, sp) => {
      const giaban = sp.giaban || new Decimal(0);
      const slnhan = sp.slnhan || new Decimal(0);
      return total.add(giaban.mul(slnhan));
    }, new Decimal(0));

    // Tính VAT và tổng tiền
    const vatRate = donhang.vat || new Decimal(0.05);
    const tongvat = tong.mul(vatRate);
    const tongtien = tong.add(tongvat);

    return {
      tong: tong,
      tongvat: tongvat,
      tongtien: tongtien,
      vatRate: vatRate
    };

  } catch (error) {
    console.error(`❌ Lỗi khi tính toán totals cho đơn hàng ${donhangId}:`, error);
    throw error;
  }
}

/**
 * Update totals for specific donhang IDs
 */
export async function updateSpecificDonhangs(donhangIds: string[]) {
  console.log(`🎯 Cập nhật totals cho ${donhangIds.length} đơn hàng cụ thể...`);
  
  let processedCount = 0;
  let errorCount = 0;

  for (const donhangId of donhangIds) {
    try {
      const totals = await calculateDonhangTotals(donhangId);
      
      await prisma.donhang.update({
        where: { id: donhangId },
        data: {
          tongvat: totals.tongvat,
          tongtien: totals.tongtien
        }
      });

      processedCount++;
      console.log(`✅ Đã cập nhật đơn hàng ${donhangId}: tongvat=${totals.tongvat}, tongtien=${totals.tongtien}`);
      
    } catch (error) {
      errorCount++;
      console.error(`❌ Lỗi khi cập nhật đơn hàng ${donhangId}:`, error);
    }
  }

  console.log(`🎉 Kết quả: ${processedCount} thành công, ${errorCount} lỗi`);
  return { processedCount, errorCount };
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

// Hàm chuyển mã TG-XXYYYYY sang số thứ tự
export function DonhangcodeToNumber(code:any) {
  // Kiểm tra định dạng mã
  if (!code.match(/^TG-[A-Z]{2}\d{5}$/)) {
    throw new Error("Mã không đúng định dạng TG-XXYYYYY");
  }

  // Tách phần chữ cái và số
  const letters = code.slice(3, 5); // Lấy AA, AB,...
  const number = parseInt(code.slice(5), 10); // Lấy 00001, 00002,...

  // Chuyển phần chữ cái thành số (0-675)
  const letterValue = (letters.charCodeAt(0) - 65) * 26 + (letters.charCodeAt(1) - 65);

  // Tính số thứ tự (bắt đầu từ 1)
  return letterValue * 99999 + (number - 1) + 1;
}

// Hàm chuyển số thứ tự về mã TG-XXYYYYY
export function DonhangnumberToCode(number:any) {
  // Kiểm tra số thứ tự hợp lệ
  if (number < 1 || number > 676 * 99999) {
    throw new Error("Số thứ tự không hợp lệ");
  }

  // Trừ 1 vì số thứ tự bắt đầu từ 1
  number -= 1;

  // Tính phần chữ cái và số
  const letterValue = Math.floor(number / 99999);
  const numValue = (number % 99999) + 1;

  // Chuyển phần chữ cái thành hai chữ cái
  const firstLetter = String.fromCharCode(65 + Math.floor(letterValue / 26));
  const secondLetter = String.fromCharCode(65 + (letterValue % 26));

  // Định dạng phần số với 5 chữ số
  const numStr = numValue.toString().padStart(5, '0');

  // Tạo mã
  return `TG-${firstLetter}${secondLetter}${numStr}`;
}
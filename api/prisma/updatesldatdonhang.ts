import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const Donhangs = await prisma.donhangsanpham.findMany();
  
  for (const donhang of Donhangs) {
    try {
      await prisma.donhangsanpham.update({
        where: {
          id: donhang.id
        },
        data: {
          sldat: donhang.slgiao
        }
      });
    } catch (error) {
      console.error(`Lỗi khi xử lý đơn hàng ${donhang.idSP}:`, error);
    }
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
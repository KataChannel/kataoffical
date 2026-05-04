const XLSX = require('/home/kata/Coding/rausachfinal/frontend/node_modules/xlsx/xlsx.js');
const fs = require('fs');
const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');

async function main() {
  // 1. Read Excel
  const workbook = XLSX.readFile('/home/kata/Coding/rausachfinal/doisoat/Copy of Ton-Huy 4-5.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const excelData = XLSX.utils.sheet_to_json(worksheet);

  const excelMap = new Map();
  excelData.forEach(row => {
    const masp = row['masp'] || row['Mã SP'] || row['MÃ SẢN PHẨM'];
    if (masp) {
      excelMap.set(masp, {
        masp,
        title: row['title'] || row['Tên SP'] || row['TÊN SẢN PHẨM'] || '',
        slton: parseFloat(row['slton'] || row['Số lượng'] || row['Tồn thực tế'] || row['SỐ LƯỢNG'] || '0'),
        slhuy: parseFloat(row['slhuy'] || row['Hủy'] || row['HỦY'] || '0')
      });
    }
  });

  // 2. Read DB Chotkho
  const prisma = new PrismaClient();
  const chotkhoId = 'e59437ab-5f47-45f0-9ae0-9d892af57ada';
  const chotkho = await prisma.chotkho.findUnique({
    where: { id: chotkhoId },
    include: {
      details: {
        include: {
          sanpham: { select: { masp: true, title: true } }
        }
      }
    }
  });

  if (!chotkho) {
    console.log('Chotkho record not found in DB');
    return;
  }

  const dbDetails = chotkho.details;
  const dbMap = new Map();
  dbDetails.forEach(d => {
    if (d.sanpham?.masp) {
      dbMap.set(d.sanpham.masp, {
        masp: d.sanpham.masp,
        title: d.sanpham.title,
        sltonthucte: Number(d.sltonthucte),
        slhuy: Number(d.slhuy)
      });
    }
  });

  // 3. Comparison
  console.log(`--- SO SÁNH DỮ LIỆU (Excel vs Database ID: ${chotkhoId}) ---`);
  
  const discrepancies = [];
  const allMasp = new Set([...excelMap.keys(), ...dbMap.keys()]);

  allMasp.forEach(masp => {
    const excel = excelMap.get(masp);
    const db = dbMap.get(masp);

    if (excel && db) {
      const tonDiff = Math.abs(excel.slton - db.sltonthucte);
      const huyDiff = Math.abs(excel.slhuy - db.slhuy);
      
      if (tonDiff > 0.01 || huyDiff > 0.01) {
        discrepancies.push({
          masp,
          title: excel.title || db.title,
          excelTon: excel.slton,
          dbTon: db.sltonthucte,
          excelHuy: excel.slhuy,
          dbHuy: db.slhuy,
          status: 'LỆCH GIÁ TRỊ'
        });
      }
    } else if (excel && !db) {
      // Trong Excel có nhưng DB không có
      discrepancies.push({
        masp,
        title: excel.title,
        excelTon: excel.slton,
        dbTon: null,
        excelHuy: excel.slhuy,
        dbHuy: null,
        status: 'THIẾU TRONG DATABASE'
      });
    } else if (!excel && db) {
      // Trong DB có nhưng Excel không có (đây là hàng bị reset âm kho tự động)
      discrepancies.push({
        masp,
        title: db.title,
        excelTon: null,
        dbTon: db.sltonthucte,
        excelHuy: null,
        dbHuy: db.slhuy,
        status: 'RESET KHO ÂM (Tự động)'
      });
    }
  });

  if (discrepancies.length === 0) {
    console.log('✅ KHỚP 100%: Toàn bộ sản phẩm được xử lý chính xác!');
  } else {
    console.log(`⚠️ PHÁT HIỆN ${discrepancies.length} ĐIỂM CẦN LƯU Ý:`);
    console.log(JSON.stringify(discrepancies, null, 2));
  }

  await prisma.$disconnect();
}

main();

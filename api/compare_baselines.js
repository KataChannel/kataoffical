const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const XLSX = require('xlsx');

const targetMasp = [
  'I100676', // Me Hộp
  'I100815', // Hoa décor
  'I100613', // Xoài tứ quý
  'I100891', // Thơm chín
  'I101133', // Kèo nèo bó
  'I100129', // Khoai Tây TQ
  'I100508', // Xoài cát Hòa Lộc
  'I100470', // Dưa lưới
  'I100316', // Chả quế
  'I100030', // Bông so đũa
];

async function main() {
  try {
    console.log("--- Comparing May 20th Baseline vs May 21st Report ---");

    // 1. Read yesterday's Excel file: Ton-Huy 20-5 (2).xlsx
    const excel20 = '/home/kata/Coding/rausachfinal/doisoat/Ton-Huy 20-5 (2).xlsx';
    const wb20 = XLSX.readFile(excel20);
    const rows20 = XLSX.utils.sheet_to_json(wb20.Sheets[wb20.SheetNames[0]]);
    
    console.log("\n--- Stock in Yesterday's Excel (20/05) ---");
    targetMasp.forEach(masp => {
      const match = rows20.find(r => r.masp && String(r.masp).trim() === masp);
      if (match) {
        console.log(`- ${masp} (${match.title}): slton=${match.slton}, slhuy=${match.slhuy}`);
      } else {
        console.log(`- ${masp}: NOT FOUND in Yesterday's Excel!`);
      }
    });

    // 2. Read database chot kho detail for May 20th
    const latestChot = await prisma.chotkho.findFirst({
      where: {
        title: { contains: '20-05-2026' }
      },
      include: {
        details: {
          where: {
            sanpham: { masp: { in: targetMasp } }
          },
          include: {
            sanpham: true
          }
        }
      }
    });

    if (latestChot) {
      console.log(`\n--- DB Chotkho on 20/05 (Title: ${latestChot.title}) ---`);
      latestChot.details.forEach(d => {
        console.log(`- ${d.sanpham.masp} (${d.sanpham.title}): System=${d.sltonhethong}, Real=${d.sltonthucte}, Huy=${d.slhuy}, Chenhlech=${d.chenhlech}`);
      });
    } else {
      console.log("\n--- No Chotkho found in DB for 20/05 ---");
    }

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main();

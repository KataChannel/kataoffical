
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const chotId = '77d1c063-4e65-4e16-8563-f33a033d9251';
  const details = await prisma.chotkhodetail.findMany({
    where: { 
      chotkhoId: chotId, 
      sanpham: { masp: { in: ['I100182', 'I100178'] } } 
    },
    include: { sanpham: true }
  });
  
  console.log('--- Results for Chốt Kho 14-05 ---');
  details.forEach(d => {
    console.log(`Code: ${d.sanpham.masp}`);
    console.log(`Title: ${d.sanpham.title}`);
    console.log(`Hệ thống (Before): ${d.sltonhethong}`);
    console.log(`Thực tế (Recorded): ${d.sltonthucte}`);
    console.log(`Ghi chú: ${d.ghichu}`);
    console.log('---------------------------');
  });

  // Check current stock too
  const stock = await prisma.sanphamKho.findMany({
    where: { 
      sanpham: { masp: { in: ['I100182', 'I100178'] } },
      khoId: '4cc01811-61f5-4bdc-83de-a493764e9258'
    },
    include: { sanpham: true }
  });

  console.log('--- Current Stock in Database ---');
  stock.forEach(s => {
    console.log(`Code: ${s.sanpham.masp} | Qty: ${s.soluong}`);
  });

  await prisma.$disconnect();
}

check();

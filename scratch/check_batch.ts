import { PrismaClient } from '../api/node_modules/@prisma/client';
const prisma = new PrismaClient();

const productIds = [
  'I100233',
  'I100479',
  'I100164',
  'I100165',
  'I100166',
  'I100003',
  'I100002',
  'I100113',
  'I100207',
  'I100004',
  'I100256'
];

async function checkProduct(masp: string) {
  const tonkho = await prisma.tonKho.findMany({
    where: { sanpham: { masp: masp } },
    include: { sanpham: { select: { id: true, masp: true, title: true } } }
  });

  if (tonkho.length === 0) {
    return { masp, error: 'Not found in TonKho' };
  }

  const tk = tonkho[0];
  const sanphamId = tk.sanphamId;
  
  const spKho = await prisma.sanphamKho.findMany({
    where: { sanphamId: sanphamId },
    include: { kho: { select: { name: true, makho: true } } }
  });

  const today = new Date(); today.setUTCHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate()+1);
  const donhangItems = await prisma.donhangsanpham.findMany({
    where: { 
      idSP: sanphamId, // Use idSP here
      donhang: { 
        ngaygiao: { gte: today, lte: tomorrow }, 
        status: { in: ['dadat','dagiao','danhan','hoanthanh'] } 
      } 
    },
    include: { donhang: { select: { status: true } } }
  });

  let totalSldat=0, totalSlnhan=0;
  donhangItems.forEach(item => {
    totalSldat += Number(item.sldat||0);
    totalSlnhan += Number(item.slnhan||0);
  });

  return {
    masp: tk.sanpham?.masp,
    title: tk.sanpham?.title,
    slton: Number(tk.slton),
    sltontt: Number(tk.sltontt),
    slchogiao: Number(tk.slchogiao),
    slchonhap: Number(tk.slchonhap),
    totalKho: spKho.reduce((acc, sk) => acc + Number(sk.soluong), 0),
    todayOrders: {
      count: donhangItems.length,
      sldat: totalSldat,
      slnhan: totalSlnhan
    }
  };
}

async function main() {
  console.log('--- KIỂM TRA HÀNG LOẠT SẢN PHẨM ---');
  const results = [];
  for (const masp of productIds) {
    try {
      const data = await checkProduct(masp);
      results.push(data);
    } catch (err) {
      results.push({ masp, error: (err as Error).message });
    }
  }
  console.log(JSON.stringify(results, null, 2));
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const masp = 'I100128';
  const sanpham = await prisma.sanpham.findUnique({ where: { masp }});
  
  if (!sanpham) return console.log('Sản phẩm không tồn tại');

  console.log(`--- Phân tích nguồn gốc con số 78 cho SP: ${sanpham.title} (${masp}) ---`);

  // 1. Tìm lần chốt kho gần nhất của sản phẩm này
  const lastChot = await prisma.chotkhodetail.findFirst({
    where: { sanphamId: sanpham.id },
    orderBy: { ngaychot: 'desc' },
    include: { chotkho: true }
  });

  if (!lastChot) {
    console.log('Không tìm thấy dữ liệu chốt kho trước đó.');
  } else {
    console.log(`Lần chốt kho gần nhất: ${lastChot.ngaychot.toLocaleString('vi-VN')}`);
    console.log(`Số lượng tồn chốt (Tồn thực tế): ${lastChot.sltonthucte}`);
  }

  const startTime = lastChot ? lastChot.ngaychot : new Date(0);

  // 2. Lấy tất cả các phiếu xuất/nhập từ thời điểm chốt đến nay
  // Lưu ý: Trong hệ thống này, tồn kho thay đổi khi Phieugiao/Donhang chuyển trạng thái.
  // Chúng ta sẽ xem các dòng chi tiết Donhangsanpham/Dathangsanpham có trạng thái đã giao/nhận.
  
  const xuat = await prisma.donhangsanpham.findMany({
    where: {
      idSP: sanpham.id,
      donhang: {
        status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
        updatedAt: { gt: startTime }
      }
    },
    include: { donhang: true },
    orderBy: { donhang: { updatedAt: 'asc' } }
  });

  const nhap = await prisma.dathangsanpham.findMany({
    where: {
      idSP: sanpham.id,
      dathang: {
        status: 'danhan',
        updatedAt: { gt: startTime }
      }
    },
    include: { dathang: true },
    orderBy: { dathang: { updatedAt: 'asc' } }
  });

  let currentCalc = lastChot ? Number(lastChot.sltonthucte) : 0;
  console.log(`\nBắt đầu tính toán từ: ${currentCalc}`);

  console.log('\n--- Lịch sử giao dịch sau khi chốt ---');
  
  const allEvents = [
    ...xuat.map(x => ({ type: 'XUẤT', qty: Number(x.slnhan || x.slgiao || x.sldat), time: x.donhang.updatedAt, code: x.donhang.madonhang })),
    ...nhap.map(n => ({ type: 'NHẬP', qty: Number(n.slnhan || n.slgiao), time: n.dathang.updatedAt, code: n.dathang.madncc }))
  ].sort((a, b) => a.time - b.time);

  allEvents.forEach(e => {
    if (e.type === 'XUẤT') currentCalc -= e.qty;
    else currentCalc += e.qty;
    console.log(`[${e.time.toLocaleString('vi-VN')}] ${e.type} ${e.code}: ${e.qty} => Tồn: ${currentCalc.toFixed(2)}`);
  });

  console.log(`\nKết quả tính toán cuối cùng: ${currentCalc.toFixed(2)}`);
  
  const currentDB = await prisma.tonKho.findUnique({ where: { sanphamId: sanpham.id }});
  console.log(`Giá trị hiện tại trong DB (sltontt): ${currentDB.sltontt}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

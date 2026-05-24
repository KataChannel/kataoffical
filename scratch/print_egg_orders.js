const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function main() {
  const masp = 'I100275'; // Trứng vịt muối
  
  // 1. Get Product Details
  const product = await prisma.sanpham.findUnique({
    where: { masp }
  });
  
  if (!product) {
    console.log(`Product ${masp} not found!`);
    return;
  }

  // 2. Define Cut-off period (May 21 17h00 to May 22 17h00)
  const prevCutoff = new Date('2026-05-21T17:00:00+07:00');
  const currCutoff = new Date('2026-05-22T17:00:00+07:00');

  console.log(`=== CHI TIẾT ĐƠN HÀNG TRỨNG VỊT MUỐI (${product.title}) ===`);
  console.log(`Chu kỳ chốt kho: Từ ${prevCutoff.toLocaleString('vi-VN')} đến ${currCutoff.toLocaleString('vi-VN')}`);
  
  // 3. Query all order items in this cycle
  const orderItems = await prisma.donhangsanpham.findMany({
    where: {
      idSP: product.id,
      donhang: {
        createdAt: {
          gte: prevCutoff,
          lt: currCutoff
        },
        status: {
          notIn: ['huy'] // Loại bỏ các đơn hàng bị hủy
        }
      }
    },
    include: {
      donhang: {
        include: {
          khachhang: true
        }
      }
    },
    orderBy: {
      donhang: {
        createdAt: 'asc'
      }
    }
  });

  console.log(`\nTổng số đơn hàng phát sinh trong chu kỳ: ${orderItems.length} đơn hàng.`);
  
  let totalSoldGiao = 0;
  let totalSoldDat = 0;
  let totalSoldNhan = 0;

  console.log('\nDanh sách chi tiết các đơn hàng bán ra:');
  console.log('---------------------------------------------------------------------------------------------');
  console.log('| STT | Mã Đơn Hàng | Khách Hàng               | Ngày Tạo (VN)       | Trạng Thái | Đặt | Giao | Nhận |');
  console.log('---------------------------------------------------------------------------------------------');
  
  orderItems.forEach((item, index) => {
    const dh = item.donhang;
    const khName = dh.khachhang?.tenkh || dh.tenKH || 'Vãng lai';
    const localTime = new Date(dh.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    
    console.log(
      `| ${String(index + 1).padStart(3)} ` +
      `| ${dh.madonhang.padEnd(11)} ` +
      `| ${khName.substring(0, 24).padEnd(24)} ` +
      `| ${localTime.padEnd(19)} ` +
      `| ${dh.status.padEnd(10)} ` +
      `| ${String(item.sldat).padStart(3)} ` +
      `| ${String(item.slgiao).padStart(4)} ` +
      `| ${String(item.slnhan).padStart(4)} |`
    );

    totalSoldDat += Number(item.sldat || 0);
    totalSoldGiao += Number(item.slgiao || 0);
    totalSoldNhan += Number(item.slnhan || 0);
  });
  
  console.log('---------------------------------------------------------------------------------------------');
  console.log(`| TỔNG CỘNG                                                                   | ${String(totalSoldDat).padStart(3)} | ${String(totalSoldGiao).padStart(4)} | ${String(totalSoldNhan).padStart(4)} |`);
  console.log('---------------------------------------------------------------------------------------------');
  
  console.log(`\n=> KẾT LUẬN TOÁN HỌC:`);
  console.log(`- Lượng kiểm đếm thực tế tồn kho cuối ngày 22/05 (Excel): ${417} quả.`);
  console.log(`- Lượng hàng đã xuất kho giao đi trong chu kỳ chốt kho: ${totalSoldGiao} quả.`);
  console.log(`- Tồn kho đầu ngày thực tế bắt buộc phải có để đáp ứng là:`);
  console.log(`  Tồn Đầu Ngày = Tồn Cuối Ngày (${417}) + Đã Xuất Giao (${totalSoldGiao}) = ${417 + totalSoldGiao} quả.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());

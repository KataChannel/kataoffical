import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function main() {
  const masp = 'I100479';
  const sanpham = await prisma.sanpham.findUnique({
    where: { masp },
    include: {
      TonKho: true,
      Donhangsanpham: {
        where: {
          donhang: {
            status: { in: ['dadat', 'dagiao'] }
          }
        },
        include: {
          donhang: true
        }
      },
      Dathangsanpham: {
        where: {
          dathang: {
            status: { in: ['dadat', 'dagiao'] }
          }
        },
        include: {
          dathang: true
        }
      }
    }
  });

  if (!sanpham) {
    console.log('Product not found');
    return;
  }

  console.log(`Product: [${sanpham.masp}] ${sanpham.title}`);
  console.log(`TonKho record:`, JSON.stringify(sanpham.TonKho, null, 2));

  let totalChogiao = 0;
  console.log('\n--- PENDING DELIVERIES (Donhang) ---');
  sanpham.Donhangsanpham.forEach(item => {
    const qty = Number(item.slgiao || item.sldat || 0);
    totalChogiao += qty;
    console.log(`- Order: ${item.donhang.madonhang} | Status: ${item.donhang.status} | Qty: ${qty}`);
  });

  let totalChonhap = 0;
  console.log('\n--- PENDING IMPORTS (Dathang) ---');
  sanpham.Dathangsanpham.forEach(item => {
    const qty = Number(item.slnhan || item.sldat || 0);
    totalChonhap += qty;
    console.log(`- Purchase: ${item.dathang.madncc} | Status: ${item.dathang.status} | Qty: ${qty}`);
  });

  console.log(`\nSummary:`);
  console.log(`Total Pending Delivery (calc): ${totalChogiao}`);
  console.log(`Total Pending Import (calc): ${totalChonhap}`);
  
  const sltontt = Number(sanpham.TonKho?.sltontt || 0);
  const slton_expected = sltontt - totalChogiao + totalChonhap;
  console.log(`Expected slton: ${sltontt} - ${totalChogiao} + ${totalChonhap} = ${slton_expected}`);
  console.log(`Actual slton in DB: ${sanpham.TonKho?.slton}`);
  
  if (Math.abs(slton_expected - Number(sanpham.TonKho?.slton || 0)) > 0.01) {
    console.log(`🚩 DISCREPANCY DETECTED! Difference: ${slton_expected - Number(sanpham.TonKho?.slton || 0)}`);
  } else {
    console.log(`✅ slton matches pending orders.`);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

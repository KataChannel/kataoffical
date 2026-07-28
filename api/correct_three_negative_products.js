const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
const products = [
  { id: '90459b30-c43f-4400-9002-6ec9152e605f', name: 'Bó xôi (Nhà Lồng)', baselineVal: 0.3 },
  { id: 'c141a516-e5aa-4771-9431-f7f0ae25f26c', name: 'Cải thìa', baselineVal: 0.0 },
  { id: '5c77222b-3f1b-4f31-830a-3f04111cf8f9', name: 'Thì là', baselineVal: 0.0 }
];

async function main() {
  console.log("=== Stock Correction Tool ===");

  for (const prod of products) {
    console.log(`\nProduct: ${prod.name} (${prod.id})`);
    
    // 1. Fetch current status
    const tk = await prisma.tonKho.findUnique({ where: { sanphamId: prod.id } });
    const sk = await prisma.sanphamKho.findUnique({
      where: {
        sanphamId_khoId: {
          sanphamId: prod.id,
          khoId: KHO_TONG_ID
        }
      }
    });

    console.log(`Current TonKho: slton=${tk?.slton}, sltontt=${tk?.sltontt}`);
    console.log(`Current SanphamKho (KHO_TONG): ${sk?.soluong}`);

    // 2. Perform correction: set KHO_TONG and TonKho values to baselineVal since no post-baseline sales/deductions occurred
    console.log(`Updating KHO_TONG to ${prod.baselineVal}...`);
    await prisma.sanphamKho.upsert({
      where: {
        sanphamId_khoId: {
          sanphamId: prod.id,
          khoId: KHO_TONG_ID
        }
      },
      update: { soluong: prod.baselineVal },
      create: {
        id: crypto.randomUUID ? crypto.randomUUID() : 'temp-' + Date.now(),
        sanphamId: prod.id,
        khoId: KHO_TONG_ID,
        soluong: prod.baselineVal
      }
    });

    console.log(`Updating TonKho to ${prod.baselineVal}...`);
    await prisma.tonKho.update({
      where: { sanphamId: prod.id },
      data: {
        slton: prod.baselineVal,
        sltontt: prod.baselineVal
      }
    });
  }

  console.log("\nCorrection complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

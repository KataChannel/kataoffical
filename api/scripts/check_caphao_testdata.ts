import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata?schema=public'
    }
  }
});

const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258'; // KHO - HCM

async function main() {
  console.log('=== INSPECTING CÀ PHÁO (I100036) IN TESTDATA ===\n');

  const sp = await prisma.sanpham.findFirst({
    where: { masp: 'I100036' },
    include: {
      TonKho: true,
      SanphamKho: { where: { khoId } }
    }
  });

  if (!sp) {
    console.log('❌ Product I100036 not found in testdata.');
    await prisma.$disconnect();
    return;
  }

  console.log(`Product: ${sp.title} (${sp.masp})`);
  console.log(`  TonKho: slton=${sp.TonKho?.slton}, sltontt=${sp.TonKho?.sltontt}`);
  console.log(`  SanphamKho (HCM): soluong=${sp.SanphamKho[0]?.soluong}`);

  await prisma.$disconnect();
}

main().catch(console.error);

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public'
    }
  }
});

async function main() {
  console.log('=== CHECKING CÀ PHÁO TIMESTAMPS ===\n');

  const sp = await prisma.sanpham.findFirst({
    where: { masp: 'I100036' },
    include: {
      TonKho: true,
      SanphamKho: {
        include: {
          kho: true
        }
      }
    }
  });

  if (!sp) {
    console.log('Product not found');
    await prisma.$disconnect();
    return;
  }

  console.log(`Product: ${sp.title} (${sp.masp})`);
  console.log('TonKho:');
  if (sp.TonKho) {
    console.log(`  slton:     ${sp.TonKho.slton}`);
    console.log(`  sltontt:   ${sp.TonKho.sltontt}`);
    console.log(`  createdAt: ${sp.TonKho.createdAt.toISOString()}`);
    console.log(`  updatedAt: ${sp.TonKho.updatedAt.toISOString()}`);
  } else {
    console.log('  None');
  }

  console.log('SanphamKho entries:');
  sp.SanphamKho.forEach(sk => {
    console.log(`  - Kho: ${sk.kho?.name || sk.khoId}`);
    console.log(`    soluong:   ${sk.soluong}`);
    console.log(`    createdAt: ${sk.createdAt.toISOString()}`);
    console.log(`    updatedAt: ${sk.updatedAt.toISOString()}`);
  });

  await prisma.$disconnect();
}

main().catch(console.error);

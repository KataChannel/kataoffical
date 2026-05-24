const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

async function main() {
  const sessionId = 'd1d3b0cd-08e4-4bae-af6d-6afa729b78cd';
  
  // Fetch details with high discrepancy (absolute value)
  const details = await prisma.chotkhodetail.findMany({
    where: {
      chotkhoId: sessionId
    },
    include: {
      sanpham: true
    }
  });

  console.log(`Total details in session: ${details.length}`);
  
  // Sort by absolute chenhlech descending
  const sorted = [...details].sort((a, b) => Math.abs(Number(b.chenhlech)) - Math.abs(Number(a.chenhlech)));

  console.log('\nTop 30 products by absolute chênh lệch (discrepancy):');
  sorted.slice(0, 30).forEach((d, i) => {
    console.log(`${i+1}: ${d.sanpham.masp} | ${d.sanpham.title.padEnd(25)} | HT: ${String(d.sltonhethong).padEnd(8)} | TT: ${String(d.sltonthucte).padEnd(8)} | Huy: ${String(d.slhuy).padEnd(8)} | Lệch: ${String(d.chenhlech).padEnd(8)} | Ghi chú: ${d.ghichu}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());

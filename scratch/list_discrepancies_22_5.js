const { PrismaClient } = require('/home/kata/Coding/rausachfinal/api/node_modules/@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    postgres: {
      url: "postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal?schema=public"
    }
  }
});

const fs = require('fs');

async function main() {
  const sessionId = 'd1d3b0cd-08e4-4bae-af6d-6afa729b78cd';
  const details = await prisma.chotkhodetail.findMany({
    where: {
      chotkhoId: sessionId,
      OR: [
        { chenhlech: { not: 0 } },
        { slhuy: { not: 0 } }
      ]
    },
    include: {
      sanpham: true
    },
    orderBy: {
      chenhlech: 'asc'
    }
  });

  let output = `Total details with discrepancy/damage for session ${sessionId}: ${details.length}\n`;
  details.forEach((d, idx) => {
    output += `${String(idx+1).padStart(3)}: ${d.sanpham.masp} | ${d.sanpham.title.padEnd(30)} | HT: ${d.sltonhethong.toString().padEnd(8)} | TT: ${d.sltonthucte.toString().padEnd(8)} | Huy: ${d.slhuy.toString().padEnd(8)} | Lệch: ${d.chenhlech.toString().padEnd(8)} | Ghi chú: "${d.ghichu || ''}"\n`;
  });

  fs.writeFileSync('/home/kata/Coding/rausachfinal/scratch/discrepancies_22_5.txt', output);
  console.log('Successfully wrote discrepancies to scratch/discrepancies_22_5.txt');
}

main().catch(console.error).finally(() => prisma.$disconnect());

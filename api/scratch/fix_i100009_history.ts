import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function main() {
  const targetSpId = '3dd7ce1a-320c-4a64-92b3-91eef614a4a3'; // Product: I100009 (Bắp non tươi)
  const chotkhoId = '689a553d-6d4d-4985-bf56-fb050e2fcec6'; // Chotkho session of June 15th

  console.log(`🚀 Starting historical correction for product ID: ${targetSpId} in chotkho ID: ${chotkhoId}`);

  // Update Chotkhodetail record
  const result = await prisma.chotkhodetail.updateMany({
    where: {
      sanphamId: targetSpId,
      chotkhoId: chotkhoId
    },
    data: {
      sltonhethong: new Decimal(0),
      sltonthucte: new Decimal(0),
      chenhlech: new Decimal(0),
      ghichu: 'Tự động đưa qua (không có trong Excel - Auto-carried) | Đã sửa đổi lịch sử từ 21.6 -> 0'
    }
  });

  console.log(`✅ Updated Chotkhodetail count: ${result.count}`);
  console.log('🎉 Historical correction completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

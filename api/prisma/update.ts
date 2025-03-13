import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updateCustomers = await prisma.banggia.updateMany({
    data: { type: 'bansi' }, // Hoặc true tùy vào nhu cầu
  });

  console.log(`✅ Đã cập nhật ${updateCustomers.count} khách hàng!`);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

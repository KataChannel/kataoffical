import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting duplicate voucher fix...');

  const voucherMaphieu = 'PN-TGNCC-XW00008-20260603_070000';
  const chotkhoDetailId = '0cfa28e0-51a5-440c-8a2a-07d9f363500c';

  // 1. Find the voucher
  const voucher = await prisma.phieuKho.findUnique({
    where: { maphieu: voucherMaphieu },
    include: { sanpham: true }
  });

  if (!voucher) {
    console.log(`❌ Voucher ${voucherMaphieu} not found!`);
    return;
  }

  console.log(`Found voucher ${voucher.maphieu} (ID: ${voucher.id}) with ${voucher.sanpham.length} items.`);

  // 2. Delete voucher items and voucher
  console.log('Deleting PhieuKhoSanpham items...');
  const deleteItemsCount = await prisma.phieuKhoSanpham.deleteMany({
    where: { phieuKhoId: voucher.id }
  });
  console.log(`Deleted ${deleteItemsCount.count} items.`);

  console.log('Deleting PhieuKho parent...');
  await prisma.phieuKho.delete({
    where: { id: voucher.id }
  });
  console.log('Voucher deleted successfully.');

  // 3. Adjust today's chốt kho details
  console.log('Adjusting today\'s Chotkhodetail for Bó xôi...');
  const updatedDetail = await prisma.chotkhodetail.update({
    where: { id: chotkhoDetailId },
    data: {
      sltonhethong: '2.5',
      chenhlech: '25.0',
      ghichu: 'Điều chỉnh chốt kho sau khi loại bỏ phiếu nhập trùng TGNCC-XW00008'
    }
  });

  console.log('Updated Chotkhodetail:', updatedDetail);

  // 4. Verify current stock levels
  const productId = '90459b30-c43f-4400-9002-6ec9152e605f';
  const tonKho = await prisma.tonKho.findUnique({
    where: { sanphamId: productId }
  });
  const sanphamKho = await prisma.sanphamKho.findFirst({
    where: {
      sanphamId: productId,
      khoId: '4cc01811-61f5-4bdc-83de-a493764e9258'
    }
  });

  console.log('Current Stock levels (after fix):');
  console.log(`- TonKho.slton: ${tonKho?.slton}`);
  console.log(`- SanphamKho.soluong: ${sanphamKho?.soluong}`);
}

main()
  .catch(err => {
    console.error('Error running fix script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

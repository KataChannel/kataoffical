import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting stock and chốt kho adjustments for all 4 products...');

  // 1. Bó xôi (I100018): Not in Excel -> final stock was inflated. Reduce stock by 25, set chotkho values to 2.5
  const productIdBoXoi = '90459b30-c43f-4400-9002-6ec9152e605f';
  console.log('\n--- Adjusting Bó xôi (I100018) ---');
  await prisma.tonKho.update({
    where: { sanphamId: productIdBoXoi },
    data: { slton: '2.5', sltontt: '2.5' }
  });
  await prisma.sanphamKho.updateMany({
    where: { sanphamId: productIdBoXoi, khoId: '4cc01811-61f5-4bdc-83de-a493764e9258' },
    data: { soluong: '2.5' }
  });
  await prisma.chotkhodetail.update({
    where: { id: '0cfa28e0-51a5-440c-8a2a-07d9f363500c' },
    data: {
      sltonhethong: '2.5',
      sltonthucte: '2.5',
      chenhlech: '0.0',
      ghichu: 'Điều chỉnh chốt kho tự động (không có trong Excel) sau khi loại bỏ phiếu nhập trùng TGNCC-XW00008'
    }
  });
  console.log('Bó xôi adjusted successfully.');

  // 2. Cần tây (I100057): Not in Excel -> final stock was inflated. Reduce stock by 10, set chotkho values to 1.0
  const productIdCanTay = 'e6bbb751-959a-4d57-a3a1-a263d2516008';
  console.log('\n--- Adjusting Cần tây (I100057) ---');
  await prisma.tonKho.update({
    where: { sanphamId: productIdCanTay },
    data: { slton: '1.0', sltontt: '1.0' }
  });
  await prisma.sanphamKho.updateMany({
    where: { sanphamId: productIdCanTay, khoId: '4cc01811-61f5-4bdc-83de-a493764e9258' },
    data: { soluong: '1.0' }
  });
  await prisma.chotkhodetail.update({
    where: { id: 'de166339-2fce-4173-a2cb-cb9fe3ed8bb4' },
    data: {
      sltonhethong: '1.0',
      sltonthucte: '1.0',
      chenhlech: '0.0',
      ghichu: 'Điều chỉnh chốt kho tự động (không có trong Excel) sau khi loại bỏ phiếu nhập trùng TGNCC-XW00008'
    }
  });
  console.log('Cần tây adjusted successfully.');

  // 3. Xà lách carol (I100204): In Excel (counted as 6.5) -> stock correct, adjust chotkho detail discrepancy
  console.log('\n--- Adjusting Xà lách carol (I100204) ---');
  await prisma.chotkhodetail.update({
    where: { id: '1d77b623-dcdc-44b0-afc6-db7cca7e3ccc' },
    data: {
      sltonhethong: '9.5',
      chenhlech: '3.0',
      ghichu: 'Điều chỉnh giảm từ Excel (sửa chênh lệch do loại bỏ phiếu nhập trùng TGNCC-XW00008)'
    }
  });
  console.log('Xà lách carol chốt kho detail adjusted successfully.');

  // 4. Tần ô (I100217): In Excel (counted as 1.0) -> stock correct, adjust chotkho detail discrepancy
  console.log('\n--- Adjusting Tần ô (I100217) ---');
  await prisma.chotkhodetail.update({
    where: { id: 'e00fbbac-3ff6-4c02-8ba2-8eee96d9e61f' },
    data: {
      sltonhethong: '12.9',
      chenhlech: '11.9',
      ghichu: 'Điều chỉnh giảm từ Excel (sửa chênh lệch do loại bỏ phiếu nhập trùng TGNCC-XW00008)'
    }
  });
  console.log('Tần ô chốt kho detail adjusted successfully.');

  console.log('\nAll stock adjustments and chốt kho details corrected successfully!');
}

main()
  .catch(err => {
    console.error('Error running correction script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting stock and chốt kho adjustments for the other 4 affected orders...');

  // 1. Vouchers to delete
  const voucherMaphieus = [
    'PN-TGNCC-XV00059-20260603_070000',
    'PN-TGNCC-XX00018-20260603_070000',
    'PN-TGNCC-XY00004-20260603_070001',
    'PN-TGNCC-XZ00029-20260603_070003'
  ];

  for (const maphieu of voucherMaphieus) {
    const voucher = await prisma.phieuKho.findUnique({
      where: { maphieu },
      include: { sanpham: true }
    });

    if (voucher) {
      console.log(`Found voucher ${maphieu} (ID: ${voucher.id}), deleting related PhieuKhoSanpham items...`);
      await prisma.phieuKhoSanpham.deleteMany({
        where: { phieuKhoId: voucher.id }
      });
      console.log('Deleting PhieuKho parent...');
      await prisma.phieuKho.delete({
        where: { id: voucher.id }
      });
      console.log(`Voucher ${maphieu} deleted successfully.`);
    } else {
      console.log(`⚠️ Voucher ${maphieu} not found or already deleted.`);
    }
  }

  // 2. Adjust products NOT in today's Excel (Tắc trái, Chanh Dây) - both stock and chốt kho values
  // A. Tắc trái (I100216 - ID: 59b483e0-0ae7-43d1-83c3-fdf952ca6f59) - Reduce stock by 30
  console.log('\n--- Adjusting Tắc trái (I100216) ---');
  await prisma.tonKho.update({
    where: { sanphamId: '59b483e0-0ae7-43d1-83c3-fdf952ca6f59' },
    data: { slton: '1.7', sltontt: '1.7' }
  });
  await prisma.sanphamKho.updateMany({
    where: { sanphamId: '59b483e0-0ae7-43d1-83c3-fdf952ca6f59', khoId: '4cc01811-61f5-4bdc-83de-a493764e9258' },
    data: { soluong: '1.7' }
  });
  await prisma.chotkhodetail.update({
    where: { id: '2bb08811-621a-4869-9c4f-92273496ab0f' },
    data: {
      sltonhethong: '1.7',
      sltonthucte: '1.7',
      chenhlech: '0.0',
      ghichu: 'Điều chỉnh chốt kho tự động (không có trong Excel) sau khi loại bỏ phiếu nhập trùng ngày cũ'
    }
  });

  // B. Chanh Dây (I100474 - ID: 87514fa2-86c3-4cf4-8863-d682c0e1156d) - Reduce stock by 10
  console.log('\n--- Adjusting Chanh Dây (I100474) ---');
  await prisma.tonKho.update({
    where: { sanphamId: '87514fa2-86c3-4cf4-8863-d682c0e1156d' },
    data: { slton: '-1.4', sltontt: '-1.4' }
  });
  await prisma.sanphamKho.updateMany({
    where: { sanphamId: '87514fa2-86c3-4cf4-8863-d682c0e1156d', khoId: '4cc01811-61f5-4bdc-83de-a493764e9258' },
    data: { soluong: '-1.4' }
  });
  await prisma.chotkhodetail.update({
    where: { id: '3caf243f-b054-46df-b98c-e4cf1a8b6e9c' },
    data: {
      sltonhethong: '-1.4',
      sltonthucte: '-1.4',
      chenhlech: '0.0',
      ghichu: 'Điều chỉnh chốt kho tự động (không có trong Excel) sau khi loại bỏ phiếu nhập trùng ngày cũ'
    }
  });

  // 3. Adjust Chotkhodetail records for products counted in Excel
  // A. Chanh vàng (I100062)
  console.log('\n--- Adjusting Chanh vàng (I100062) ---');
  await prisma.chotkhodetail.update({
    where: { id: 'c2464e00-ea05-4f8b-a81f-942dd4c437e9' },
    data: {
      sltonhethong: '7.17',
      chenhlech: '-0.33',
      ghichu: 'Điều chỉnh giảm từ Excel (sửa chênh lệch do loại bỏ phiếu nhập trùng ngày cũ)'
    }
  });

  // B. Hành tím bắc lột (I100730)
  console.log('\n--- Adjusting Hành tím bắc lột (I100730) ---');
  await prisma.chotkhodetail.update({
    where: { id: '7606211a-b24e-43e1-ac86-9a7bf840ca05' },
    data: {
      sltonhethong: '-54.8',
      chenhlech: '-56.3',
      ghichu: 'Điều chỉnh tăng từ Excel (sửa chênh lệch do loại bỏ phiếu nhập trùng ngày cũ)'
    }
  });

  // C. Măng tây xanh (I100144)
  console.log('\n--- Adjusting Măng tây xanh (I100144) ---');
  await prisma.chotkhodetail.update({
    where: { id: 'c15d3d0f-92cf-448a-96cb-3a194940b96f' },
    data: {
      sltonhethong: '0.5',
      chenhlech: '-12.0',
      ghichu: 'Điều chỉnh giảm từ Excel (sửa chênh lệch do loại bỏ phiếu nhập trùng ngày cũ)'
    }
  });

  // D. Măng tây xanh (lớn) (I100645)
  console.log('\n--- Adjusting Măng tây xanh (lớn) (I100645) ---');
  await prisma.chotkhodetail.update({
    where: { id: '21fd0e1a-6fd0-452f-9f74-fdf5d6519d3b' },
    data: {
      sltonhethong: '2.5',
      chenhlech: '-2.5',
      ghichu: 'Điều chỉnh giảm từ Excel (sửa chênh lệch do loại bỏ phiếu nhập trùng ngày cũ)'
    }
  });

  // E. Măng tây trung (I101266)
  console.log('\n--- Adjusting Măng tây trung (I101266) ---');
  await prisma.chotkhodetail.update({
    where: { id: 'ce60a589-52b1-4c26-9694-8f7dc14fd63e' },
    data: {
      sltonhethong: '4.5',
      chenhlech: '-5.5',
      ghichu: 'Điều chỉnh tăng từ Excel (sửa chênh lệch do loại bỏ phiếu nhập trùng ngày cũ)'
    }
  });

  // F. Thanh long ruột trắng (I100507)
  console.log('\n--- Adjusting Thanh long ruột trắng (I100507) ---');
  await prisma.chotkhodetail.update({
    where: { id: '484c810e-190d-4004-a099-8d2266000435' },
    data: {
      sltonhethong: '17.0',
      chenhlech: '-2.5',
      ghichu: 'Điều chỉnh giảm từ Excel (sửa chênh lệch do loại bỏ phiếu nhập trùng ngày cũ)'
    }
  });

  console.log('\nStock and chốt kho detail updates for all other affected orders completed successfully!');
}

main()
  .catch(err => {
    console.error('Error running correction script v3:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

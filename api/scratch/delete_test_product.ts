import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const productId = '98c93c06-ed9f-4753-82f9-c70af8ab19db';

async function main() {
  console.log(`Bắt đầu xóa sản phẩm test với ID: ${productId}`);

  const product = await prisma.sanpham.findUnique({
    where: { id: productId },
  });

  if (!product) {
    console.log('Không tìm thấy sản phẩm hoặc sản phẩm đã được xóa trước đó.');
    return;
  }

  console.log(`Đã tìm thấy sản phẩm: ${product.title} (${product.masp})`);

  await prisma.$transaction(async (tx) => {
    // 1. Ngắt kết nối với nhà cung cấp
    await tx.sanpham.update({
      where: { id: productId },
      data: { Nhacungcap: { set: [] } },
    });

    // 2. Xóa các bản ghi liên quan trong Donhangsanpham
    const dhsp = await tx.donhangsanpham.deleteMany({
      where: { idSP: productId },
    });
    console.log(`- Đã xóa ${dhsp.count} liên kết Donhangsanpham`);

    // 3. Xóa các bản ghi liên quan trong Dathangsanpham
    const dtsp = await tx.dathangsanpham.deleteMany({
      where: { idSP: productId },
    });
    console.log(`- Đã xóa ${dtsp.count} liên kết Dathangsanpham`);

    // 4. Xóa các bản ghi liên quan trong Banggiasanpham
    const bgsp = await tx.banggiasanpham.deleteMany({
      where: { sanphamId: productId },
    });
    console.log(`- Đã xóa ${bgsp.count} liên kết Banggiasanpham`);

    // 5. Xóa các bản ghi liên quan trong PhieuKhoSanpham
    const pksp = await tx.phieuKhoSanpham.deleteMany({
      where: { sanphamId: productId },
    });
    console.log(`- Đã xóa ${pksp.count} liên kết PhieuKhoSanpham`);

    // 6. Xóa các bản ghi liên quan trong SanphamKho
    const spk = await tx.sanphamKho.deleteMany({
      where: { sanphamId: productId },
    });
    console.log(`- Đã xóa ${spk.count} liên kết SanphamKho`);

    // 7. Xóa các bản ghi liên quan trong Chotkhodetail
    const ckd = await tx.chotkhodetail.deleteMany({
      where: { sanphamId: productId },
    });
    console.log(`- Đã xóa ${ckd.count} liên kết Chotkhodetail`);

    // 8. Xóa các bản ghi liên quan trong TonKho
    const tk = await tx.tonKho.deleteMany({
      where: { sanphamId: productId },
    });
    console.log(`- Đã xóa ${tk.count} liên kết TonKho`);

    // 9. Xóa sản phẩm chính
    await tx.sanpham.delete({
      where: { id: productId },
    });
    console.log(`- Đã xóa thành công sản phẩm test.`);
  });
}

main()
  .catch((e) => {
    console.error('Lỗi khi xóa sản phẩm test:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

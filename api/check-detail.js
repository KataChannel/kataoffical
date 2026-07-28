const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDetail() {
  const donhang = await prisma.donhang.findFirst({
    where: { madonhang: 'TG-AA14390' },
    include: {
      banggia: true,
      khachhang: { include: { banggia: true } },
      sanpham: {
        include: {
          sanpham: { select: { title: true, masp: true } }
        }
      }
    }
  });
  
  if (!donhang) {
    console.log('❌ Không tìm thấy đơn hàng');
    await prisma.$disconnect();
    return;
  }
  
  console.log('\n📋 ĐƠN HÀNG:', donhang.madonhang);
  console.log('👤 KHÁCH HÀNG:', donhang.khachhang?.name);
  console.log('\n💰 BẢNG GIÁ ĐANG DÙNG:');
  console.log('   ID:', donhang.banggiaId);
  console.log('   Tên:', donhang.banggia?.title);
  console.log('\n💰 BẢNG GIÁ MẶC ĐỊNH KH:');
  console.log('   ID:', donhang.khachhang?.banggiaId);
  console.log('   Tên:', donhang.khachhang?.banggia?.title);
  
  console.log('\n📦 DANH SÁCH SẢN PHẨM:');
  console.log('Tổng số sản phẩm:', donhang.sanpham.length);
  
  // Tìm sản phẩm có ghi chú chứa thông tin bảng giá
  const spCoGhiChuBangGia = donhang.sanpham.filter(sp => 
    sp.ghichu && (
      sp.ghichu.includes('Bảng giá') || 
      sp.ghichu.includes('banggia') ||
      sp.ghichu.includes('Price')
    )
  );
  
  if (spCoGhiChuBangGia.length > 0) {
    console.log('\n⚠️ CÓ', spCoGhiChuBangGia.length, 'SẢN PHẨM CÓ GHI CHÚ BẢNG GIÁ:');
    spCoGhiChuBangGia.forEach((sp, idx) => {
      console.log(`\n${idx+1}. ${sp.sanpham?.title || 'N/A'}`);
      console.log('   Mã SP:', sp.sanpham?.masp);
      console.log('   Giá bán:', sp.giaban);
      console.log('   Ghi chú:', sp.ghichu);
    });
  } else {
    console.log('\n✅ KHÔNG có sản phẩm nào có ghi chú về bảng giá');
  }
  
  // Hiển thị 5 sản phẩm đầu để xem pattern
  console.log('\n📊 5 SẢN PHẨM ĐẦU TIÊN:');
  donhang.sanpham.slice(0, 5).forEach((sp, idx) => {
    console.log(`\n${idx+1}. ${sp.sanpham?.title || 'N/A'}`);
    console.log('   Giá:', sp.giaban);
    console.log('   SL đặt:', sp.sldat);
    console.log('   Ghi chú:', sp.ghichu || '(trống)');
  });
  
  await prisma.$disconnect();
}

checkDetail().catch(console.error);

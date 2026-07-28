const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDonhang() {
  const donhang = await prisma.donhang.findFirst({
    where: { madonhang: 'TG-AA14390' },
    include: {
      banggia: { select: { id: true, title: true } },
      khachhang: { 
        select: { 
          id: true, 
          name: true, 
          banggiaId: true,
          banggia: { select: { id: true, title: true } }
        } 
      },
      sanpham: {
        select: {
          id: true,
          idSP: true,
          giaban: true,
          sldat: true,
          ghichu: true
        },
        take: 10
      }
    }
  });
  
  if (!donhang) {
    console.log('❌ Không tìm thấy đơn hàng TG-AA14390');
    await prisma.$disconnect();
    return;
  }
  
  console.log('\n=== THÔNG TIN ĐƠN HÀNG ===');
  console.log('Mã đơn hàng:', donhang.madonhang);
  console.log('Khách hàng:', donhang.khachhang?.name);
  console.log('\n=== BẢNG GIÁ TRONG ĐƠN HÀNG ===');
  console.log('banggiaId:', donhang.banggiaId);
  console.log('Tên bảng giá:', donhang.banggia?.title || 'N/A');
  console.log('\n=== BẢNG GIÁ MẶC ĐỊNH CỦA KHÁCH HÀNG ===');
  console.log('banggiaId khách hàng:', donhang.khachhang?.banggiaId);
  console.log('Tên bảng giá:', donhang.khachhang?.banggia?.title || 'N/A');
  console.log('\n=== KẾT LUẬN ===');
  if (donhang.banggiaId === donhang.khachhang?.banggiaId) {
    console.log('✅ Đơn hàng dùng bảng giá mặc định của khách hàng');
  } else {
    console.log('⚠️ Đơn hàng dùng bảng giá KHÁC với mặc định của khách hàng');
    console.log('   Đã SelectBanggia thủ công hoặc khách hàng đổi bảng giá sau khi tạo đơn');
  }
  console.log('\n=== MẪU SẢN PHẨM (10 sản phẩm đầu) ===');
  donhang.sanpham?.forEach((sp, idx) => {
    console.log(`${idx+1}. ID: ${sp.idSP}, Giá: ${sp.giaban}, SL: ${sp.sldat}, Ghi chú: ${sp.ghichu || 'N/A'}`);
  });
  
  await prisma.$disconnect();
}

checkDonhang().catch(console.error);

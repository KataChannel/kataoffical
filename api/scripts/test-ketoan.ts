/**
 * Test end-to-end KetoanService trên DB LOCAL (không boot Nest, truyền PrismaClient).
 * Chạy: DATABASE_URL="postgresql://.../testdata" npx ts-node --transpile-only scripts/test-ketoan.ts
 */
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { KetoanService } from '../src/ketoan/ketoan.service';

const prisma = new PrismaClient();
const svc = new KetoanService(prisma as any);

async function butToanCanDoi(soCT: string) {
  const bt = await prisma.butToan.findUnique({ where: { soCT }, include: { chiTiet: true } });
  const no = bt!.chiTiet.filter((c) => c.tkNo).reduce((s, c) => s + Number(c.soTien), 0);
  const co = bt!.chiTiet.filter((c) => c.tkCo).reduce((s, c) => s + Number(c.soTien), 0);
  return { soCT, tongNo: no, tongCo: co, canDoi: no === co, dong: bt!.chiTiet.map((c) => `${c.tkNo ? 'N' + c.tkNo : ''}${c.tkCo ? 'C' + c.tkCo : ''}=${Number(c.soTien)}`) };
}

(async () => {
  const kh = await prisma.khachhang.findUnique({ where: { makh: 'TG-KS00001' } });
  if (!kh) throw new Error('Không thấy KH test');
  console.log('KH:', kh.makh, kh.name, '| thoihanno=', kh.thoihanno);

  console.log('\n--- Công nợ ban đầu (chỉ có đầu kỳ) ---');
  console.log(await svc.congNoRongKhachHang(kh.id));

  // 1) Ghi nhận bán hàng: lấy 1 đơn danhan của KH này
  const dh = await prisma.donhang.findFirst({
    where: { khachhangId: kh.id, status: 'danhan' },
    orderBy: { ngaygiao: 'desc' },
  });
  if (!dh) { console.log('KH này chưa có đơn danhan để test ghi nhận bán hàng.'); }
  else {
    console.log('\n--- Ghi nhận bán hàng đơn', dh.madonhang, '---');
    const r1: any = await svc.ghiNhanBanHang(dh.id);
    console.log('Kết quả:', r1.skipped ? r1 : { phaiThu: r1.phaiThu, doanhThu: r1.doanhThu, vat: r1.vat, soCT: r1.butToan.soCT });
    if (!r1.skipped) console.log('Cân đối bút toán:', await butToanCanDoi(r1.butToan.soCT));
    // chạy lại -> phải idempotent
    const r1b: any = await svc.ghiNhanBanHang(dh.id);
    console.log('Ghi nhận lần 2 (kỳ vọng skipped):', r1b.skipped ? 'SKIPPED ✓' : 'BỊ GHI LẠI ✗');
  }

  console.log('\n--- Công nợ sau ghi nhận bán hàng ---');
  const cn2 = await svc.congNoRongKhachHang(kh.id);
  console.log(cn2);

  // 2) Lập phiếu thu 1 phần
  const thu = Math.min(1500000, Math.max(0, cn2.soDuCuoiKy));
  if (thu > 0) {
    console.log('\n--- Lập phiếu THU', thu, '---');
    const r2: any = await svc.taoPhieuThuChi({
      loai: 'THU', sotien: thu, hinhthuc: 'CHUYENKHOAN', nghiepvu: 'THU_KH',
      khachhangId: kh.id, ghichu: 'Test thu tiền', userId: null as any,
    });
    console.log('Phiếu:', r2.phieu.maphieu, '| Bút toán:', r2.butToan.soCT);
    console.log('Cân đối bút toán:', await butToanCanDoi(r2.butToan.soCT));
  }

  console.log('\n--- Công nợ sau khi thu tiền ---');
  console.log(await svc.congNoRongKhachHang(kh.id));

  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });

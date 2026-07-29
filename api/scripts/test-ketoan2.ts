/**
 * Test đường GHI NHẬN BÁN HÀNG (VAT + không VAT) trên DB LOCAL.
 * Chạy: DATABASE_URL="postgresql://.../testdata" npx ts-node --transpile-only scripts/test-ketoan2.ts
 */
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { KetoanService } from '../src/ketoan/ketoan.service';

const prisma = new PrismaClient();
const svc = new KetoanService(prisma as any);

async function canDoi(soCT: string) {
  const bt = await prisma.butToan.findUnique({ where: { soCT }, include: { chiTiet: true } });
  const no = bt!.chiTiet.filter((c) => c.tkNo).reduce((s, c) => s + Number(c.soTien), 0);
  const co = bt!.chiTiet.filter((c) => c.tkCo).reduce((s, c) => s + Number(c.soTien), 0);
  return { soCT, tongNo: no, tongCo: co, canDoi: no === co, dong: bt!.chiTiet.map((c) => `${c.tkNo ? 'N' + c.tkNo : ''}${c.tkCo ? 'C' + c.tkCo : ''}=${Number(c.soTien)}`) };
}

async function testDon(where: any, nhan: string) {
  const dh = await prisma.donhang.findFirst({
    where: { status: 'danhan', khachhangId: { not: null }, tongtien: { gt: 0 }, ...where },
    orderBy: { ngaygiao: 'desc' },
  });
  if (!dh) { console.log(`(không tìm thấy đơn ${nhan})`); return; }
  console.log(`\n===== ${nhan}: đơn ${dh.madonhang} | isshowvat=${dh.isshowvat} | tongtien=${Number(dh.tongtien)} tongvat=${Number(dh.tongvat)} =====`);
  const r: any = await svc.ghiNhanBanHang(dh.id);
  if (r.skipped) { console.log('  (đã ghi trước đó — skipped)'); }
  else {
    console.log('  phaiThu=%d doanhThu=%d vat=%d', r.phaiThu, r.doanhThu, r.vat);
    console.log('  bút toán:', await canDoi(r.butToan.soCT));
  }
  console.log('  công nợ ròng KH:', await svc.congNoRongKhachHang(dh.khachhangId!));
}

(async () => {
  await testDon({ isshowvat: true, tongvat: { gt: 0 } }, 'CÓ VAT (kỳ vọng N131/C511/C3331)');
  await testDon({ isshowvat: false }, 'KHÔNG VAT (kỳ vọng N131/C511, phaiThu=Σ slnhan×giaban)');
  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });

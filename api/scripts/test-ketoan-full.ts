/**
 * Test AP (nhập mua) + khóa sổ + hóa đơn điện tử (mock) trên DB LOCAL.
 * Chạy: DATABASE_URL="postgresql://.../testdata" npx ts-node --transpile-only scripts/test-ketoan-full.ts
 */
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { KetoanService } from '../src/ketoan/ketoan.service';
import { MockHoaDonProvider } from '../src/ketoan/hoadon-provider';

const prisma = new PrismaClient();
const svc = new KetoanService(prisma as any, new MockHoaDonProvider());
const vnd = (n: number) => Math.round(n).toLocaleString('vi-VN');

async function canDoi(soCT: string) {
  const bt = await prisma.butToan.findUnique({ where: { soCT }, include: { chiTiet: true } });
  const no = bt!.chiTiet.filter((c) => c.tkNo).reduce((s, c) => s + Number(c.soTien), 0);
  const co = bt!.chiTiet.filter((c) => c.tkCo).reduce((s, c) => s + Number(c.soTien), 0);
  return { canDoi: no === co, dong: bt!.chiTiet.map((c) => `${c.tkNo ? 'N' + c.tkNo : 'C' + c.tkCo}=${Number(c.soTien)}`) };
}

(async () => {
  // ---- 1) AP: ghi nhận nhập mua ----
  const dt = await prisma.dathang.findFirst({ where: { status: 'danhan', nhacungcapId: { not: null } }, orderBy: { ngaynhan: 'desc' } });
  if (dt) {
    console.log('===== AP: nhập mua', dt.madncc, '=====');
    const r: any = await svc.ghiNhanNhapMua(dt.id);
    console.log(r.skipped ? '  (đã ghi)' : `  tienHang=${vnd(r.tienHang)} | ${JSON.stringify(await canDoi(r.butToan.soCT))}`);
  }
  const ncc = await svc.baoCaoCongNoNCC({ limit: 5 });
  console.log('Top 5 công nợ NCC:');
  console.table(ncc.map((r) => ({ mancc: r.mancc, ten: (r.name || '').slice(0, 18), dauKy: vnd(r.soDuDauKy), tang: vnd(r.phatSinhTang), giam: vnd(r.phatSinhGiam), cuoiKy: vnd(r.soDuCuoiKy) })));

  // ---- 2) Khóa sổ ----
  console.log('\n===== KHÓA SỔ tháng 6/2026 =====');
  await svc.khoaSo(2026, 6, 'test');
  try { await svc.kiemTraKhoaSo('2026-06-15'); console.log('  ✗ đáng lẽ phải chặn 15/06'); }
  catch (e: any) { console.log('  ✓ chặn sửa 15/06:', e.message); }
  await svc.kiemTraKhoaSo('2026-07-15'); console.log('  ✓ cho phép 15/07 (kỳ chưa khóa)');
  await svc.moKhoaSo(2026, 6);
  await svc.kiemTraKhoaSo('2026-06-15'); console.log('  ✓ sau mở khóa: 15/06 cho phép lại');

  // ---- 3) Hóa đơn điện tử (mock) ----
  const dh = await prisma.donhang.findFirst({ where: { status: 'danhan', isshowvat: true, tongvat: { gt: 0 } }, orderBy: { ngaygiao: 'desc' } });
  if (dh) {
    console.log('\n===== HĐĐT: phát hành cho', dh.madonhang, '=====');
    const r: any = await svc.phatHanhHoaDon(dh.id);
    const hd = r.hoaDon;
    console.log(`  Số HĐ: ${hd.kyHieu}-${hd.soHoaDon} | mã CQT: ${hd.maCQT} | tiềnHàng=${vnd(Number(hd.tienHang))} thuế=${vnd(Number(hd.tienThue))} (${hd.thueSuat}%)`);
    const r2: any = await svc.phatHanhHoaDon(dh.id);
    console.log('  Phát hành lần 2:', r2.skipped ? 'SKIPPED ✓ (không trùng)' : '✗ bị phát hành lại');
    const bk = await svc.bangKeHoaDonBanRa({});
    console.log(`  Bảng kê bán ra: ${bk.soHoaDon} hóa đơn, tiền hàng ${vnd(bk.tienHang)}, thuế ${vnd(bk.tienThue)}`);
  }

  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });

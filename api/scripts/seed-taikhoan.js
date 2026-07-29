/**
 * Seed danh mục hệ thống tài khoản cốt lõi (Thông tư 133). Idempotent (upsert theo `so`).
 * Chạy (LOCAL):  DATABASE_URL="postgresql://.../testdata" node scripts/seed-taikhoan.js
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ACCOUNTS = [
  { so: '111', ten: 'Tiền mặt', loai: 'TAISAN' },
  { so: '112', ten: 'Tiền gửi ngân hàng', loai: 'TAISAN' },
  { so: '131', ten: 'Phải thu của khách hàng', loai: 'TAISAN', congNoChiTiet: true },
  { so: '133', ten: 'Thuế GTGT được khấu trừ', loai: 'TAISAN' },
  { so: '156', ten: 'Hàng hóa', loai: 'TAISAN' },
  { so: '331', ten: 'Phải trả cho người bán', loai: 'NOPHAITRA', congNoChiTiet: true },
  { so: '3331', ten: 'Thuế GTGT phải nộp', loai: 'NOPHAITRA' },
  { so: '511', ten: 'Doanh thu bán hàng và cung cấp dịch vụ', loai: 'DOANHTHU' },
  { so: '632', ten: 'Giá vốn hàng bán', loai: 'CHIPHI' },
];

(async () => {
  for (const a of ACCOUNTS) {
    await prisma.taiKhoan.upsert({
      where: { so: a.so },
      create: { so: a.so, ten: a.ten, loai: a.loai, congNoChiTiet: !!a.congNoChiTiet },
      update: { ten: a.ten, loai: a.loai, congNoChiTiet: !!a.congNoChiTiet },
    });
  }
  const rows = await prisma.taiKhoan.findMany({ orderBy: { so: 'asc' } });
  console.log('✓ Seeded', rows.length, 'tài khoản:');
  console.table(rows.map((r) => ({ so: r.so, ten: r.ten, loai: r.loai, congNoChiTiet: r.congNoChiTiet })));
  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });

/**
 * Import SỐ DƯ ĐẦU KỲ công nợ từ file Excel (template Template_CongNo_DauKy.xlsx)
 * -> ghi vào bảng CongNoDauKy (idempotent theo đối tượng). Báo cáo dòng lỗi.
 *
 * Chạy (LOCAL):
 *   DATABASE_URL="postgresql://.../testdata" node scripts/import-congno-dauky.js [file.xlsx]
 */
const path = require('path');
const ExcelJS = require('exceljs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const FILE = process.argv[2] || path.resolve(__dirname, '../../Template_CongNo_DauKy.xlsx');

const cellText = (c) => {
  if (c == null) return '';
  if (typeof c === 'object' && c.text != null) return String(c.text).trim();
  return String(c).trim();
};
const cellNum = (c) => {
  if (c == null || c === '') return 0;
  if (typeof c === 'object' && c.result != null) return Number(c.result);
  const n = Number(String(c).replace(/[^\d.-]/g, ''));
  return isNaN(n) ? 0 : n;
};
const cellDate = (c) => {
  if (c instanceof Date) return c;
  if (!c) return null;
  const d = new Date(c);
  return isNaN(d.getTime()) ? null : d;
};

async function importSheet(ws, loai) {
  const res = { ok: 0, errors: [] };
  if (!ws) return res;
  for (let r = 3; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    const ma = cellText(row.getCell(1).value);
    if (!ma) continue; // bỏ dòng trống
    const mst = cellText(row.getCell(3).value);
    const sodu = cellNum(row.getCell(4).value);
    const ngay = cellDate(row.getCell(5).value);
    const ghichu = cellText(row.getCell(6).value);

    const partner =
      loai === 'KH'
        ? await prisma.khachhang.findUnique({ where: { makh: ma } })
        : await prisma.nhacungcap.findUnique({ where: { mancc: ma } });
    if (!partner) { res.errors.push({ row: r, ma, reason: 'Mã không tồn tại trong hệ thống' }); continue; }
    if (!ngay) { res.errors.push({ row: r, ma, reason: 'Ngày chốt số dư trống/không hợp lệ' }); continue; }

    const key = `${loai}:${partner.id}`;
    const data =
      loai === 'KH'
        ? { doiTuongLoai: 'KH', doiTuongKey: key, khachhangId: partner.id, tk: '131', soDuNo: sodu, soDuCo: 0, ngayChot: ngay, ghichu }
        : { doiTuongLoai: 'NCC', doiTuongKey: key, nhacungcapId: partner.id, tk: '331', soDuNo: 0, soDuCo: sodu, ngayChot: ngay, ghichu };

    await prisma.congNoDauKy.upsert({
      where: { doiTuongKey: key },
      create: data,
      update: { soDuNo: data.soDuNo, soDuCo: data.soDuCo, ngayChot: ngay, ghichu, tk: data.tk },
    });

    // Bổ sung MST nếu template có điền và đối tượng đang trống
    if (mst && !partner.mst) {
      if (loai === 'KH') await prisma.khachhang.update({ where: { id: partner.id }, data: { mst } });
      else await prisma.nhacungcap.update({ where: { id: partner.id }, data: { mst } });
    }
    res.ok++;
  }
  return res;
}

(async () => {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(FILE);
  const kh = await importSheet(wb.getWorksheet('CongNo_KhachHang'), 'KH');
  const ncc = await importSheet(wb.getWorksheet('CongNo_NCC'), 'NCC');
  console.log('===== KẾT QUẢ IMPORT SỐ DƯ ĐẦU KỲ =====');
  console.log('File:', FILE);
  console.log(`Khách hàng: nạp ${kh.ok} dòng, lỗi ${kh.errors.length}`);
  kh.errors.forEach((e) => console.log(`  - dòng ${e.row} [${e.ma}]: ${e.reason}`));
  console.log(`Nhà cung cấp: nạp ${ncc.ok} dòng, lỗi ${ncc.errors.length}`);
  ncc.errors.forEach((e) => console.log(`  - dòng ${e.row} [${e.ma}]: ${e.reason}`));
  await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });

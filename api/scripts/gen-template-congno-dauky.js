/**
 * Sinh template Excel để nhập SỐ DƯ ĐẦU KỲ công nợ (Khách hàng + Nhà cung cấp).
 * Người dùng đổ dữ liệu vào 2 sheet -> import vào bảng CongNoDauKy (Phase 1).
 *
 * Chạy:  node scripts/gen-template-congno-dauky.js [đường_dẫn_output.xlsx]
 * Mặc định xuất ra: ../Template_CongNo_DauKy.xlsx (thư mục gốc repo kataoffical)
 */
const path = require('path');
const ExcelJS = require('exceljs');

const OUT =
  process.argv[2] ||
  path.resolve(__dirname, '../../Template_CongNo_DauKy.xlsx');

// ---- Định nghĩa cột dùng chung cho 2 sheet ----------------------------------
function partnerColumns(maHeader, tenHeader, soDuHeader) {
  return [
    { header: maHeader, key: 'ma', width: 18, required: true },
    { header: tenHeader, key: 'ten', width: 34 },
    { header: 'MST', key: 'mst', width: 16 },
    { header: soDuHeader, key: 'sodu', width: 20, required: true, money: true },
    { header: 'Ngày chốt số dư', key: 'ngaychot', width: 16, required: true, date: true },
    { header: 'Ghi chú', key: 'ghichu', width: 30 },
  ];
}

const HEADER_FILL_REQ = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2E7D32' } }; // xanh đậm = bắt buộc
const HEADER_FILL_OPT = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9E9E9E' } }; // xám = tuỳ chọn
const EXAMPLE_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF3CD' } };     // vàng nhạt = dòng ví dụ

function buildPartnerSheet(wb, sheetName, cols, exampleRow, note) {
  const ws = wb.addWorksheet(sheetName, {
    views: [{ state: 'frozen', ySplit: 2 }],
  });

  // Dòng 1: ghi chú toàn sheet
  ws.mergeCells(1, 1, 1, cols.length);
  const noteCell = ws.getCell(1, 1);
  noteCell.value = note;
  noteCell.font = { italic: true, color: { argb: 'FF7A0000' }, size: 11 };
  noteCell.alignment = { vertical: 'middle', wrapText: true };
  ws.getRow(1).height = 34;

  // Dòng 2: header
  const header = ws.getRow(2);
  cols.forEach((c, i) => {
    const cell = header.getCell(i + 1);
    cell.value = c.required ? `${c.header} *` : c.header;
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    cell.fill = c.required ? HEADER_FILL_REQ : HEADER_FILL_OPT;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = { bottom: { style: 'thin' }, right: { style: 'hair' } };
    ws.getColumn(i + 1).width = c.width;
  });
  header.height = 26;

  // Dòng 3: ví dụ (tô vàng, người dùng xoá đi rồi nhập thật)
  const ex = ws.getRow(3);
  cols.forEach((c, i) => {
    const cell = ex.getCell(i + 1);
    cell.value = exampleRow[c.key];
    cell.fill = EXAMPLE_FILL;
    if (c.money) cell.numFmt = '#,##0';
    if (c.date) cell.numFmt = 'dd/mm/yyyy';
    cell.alignment = { vertical: 'middle' };
  });

  // Định dạng sẵn + data validation cho ~2000 dòng nhập liệu
  cols.forEach((c, i) => {
    const colLetter = ws.getColumn(i + 1).letter;
    for (let r = 4; r <= 2003; r++) {
      const cell = ws.getCell(`${colLetter}${r}`);
      if (c.money) {
        cell.numFmt = '#,##0';
        cell.dataValidation = {
          type: 'decimal',
          operator: 'greaterThanOrEqual',
          formulae: [0],
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: 'Số tiền không hợp lệ',
          error: 'Số dư phải là số >= 0 (không nhập dấu phẩy/chữ).',
        };
      }
      if (c.date) {
        cell.numFmt = 'dd/mm/yyyy';
        cell.dataValidation = {
          type: 'date',
          operator: 'greaterThan',
          formulae: [new Date(2020, 0, 1)],
          allowBlank: true,
          showErrorMessage: true,
          errorTitle: 'Ngày không hợp lệ',
          error: 'Nhập ngày dạng dd/mm/yyyy.',
        };
      }
    }
  });

  return ws;
}

function buildGuideSheet(wb) {
  const ws = wb.addWorksheet('HuongDan');
  ws.getColumn(1).width = 4;
  ws.getColumn(2).width = 110;
  const lines = [
    ['', 'HƯỚNG DẪN NHẬP SỐ DƯ ĐẦU KỲ CÔNG NỢ', true],
    ['', '', false],
    ['1.', 'File gồm 2 sheet cần nhập: "CongNo_KhachHang" (công nợ phải thu) và "CongNo_NCC" (công nợ phải trả).', false],
    ['2.', 'Cột có dấu * (nền xanh) là BẮT BUỘC. Cột nền xám là tuỳ chọn.', false],
    ['3.', 'Mã KH / Mã NCC phải KHỚP mã đang có trong hệ thống (makh / mancc). Dòng nào sai mã sẽ bị báo lỗi khi import, các dòng đúng vẫn được nạp.', false],
    ['4.', 'Dòng màu vàng (dòng 3) chỉ là VÍ DỤ — hãy xoá đi trước khi nhập dữ liệu thật.', false],
    ['5.', 'Số dư đầu kỳ = số tiền đối tượng còn nợ tại "Ngày chốt số dư" (thường là ngày bắt đầu dùng hệ thống - go-live). Nhập số dương, không kèm "đ" hay dấu phẩy.', false],
    ['6.', 'KH: nhập vào cột "Số dư đầu kỳ (Nợ)" — số khách CÒN NỢ mình. NCC: nhập "Số dư đầu kỳ (Có)" — số mình CÒN NỢ nhà cung cấp.', false],
    ['7.', 'MST: nếu điền, hệ thống sẽ tự bổ sung mã số thuế cho đối tượng nếu đang trống (phục vụ xuất hoá đơn).', false],
    ['8.', 'Ngày chốt số dư nên GIỐNG NHAU cho tất cả các dòng (cùng một ngày go-live).', false],
    ['9.', 'Import lại nhiều lần được (idempotent theo đối tượng) — lần sau ghi đè số dư của đúng đối tượng đó.', false],
  ];
  lines.forEach((l, idx) => {
    const row = ws.getRow(idx + 1);
    row.getCell(1).value = l[0];
    row.getCell(2).value = l[1];
    row.getCell(2).alignment = { wrapText: true, vertical: 'top' };
    if (l[2]) {
      row.getCell(2).font = { bold: true, size: 14, color: { argb: 'FF2E7D32' } };
    }
  });
  return ws;
}

async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Rau Sach - Ke toan';
  wb.created = new Date();

  buildGuideSheet(wb);

  buildPartnerSheet(
    wb,
    'CongNo_KhachHang',
    partnerColumns('Mã KH (makh)', 'Tên khách hàng', 'Số dư đầu kỳ (Nợ)'),
    { ma: 'KH000123', ten: 'Cty TNHH Bếp Ăn ABC', mst: '0312345678', sodu: 12500000, ngaychot: new Date(2026, 6, 1), ghichu: 'Nợ tồn đến 30/06' },
    'Công nợ PHẢI THU khách hàng (TK 131). Xoá dòng ví dụ (vàng) trước khi nhập. Cột có * là bắt buộc.'
  );

  buildPartnerSheet(
    wb,
    'CongNo_NCC',
    partnerColumns('Mã NCC (mancc)', 'Tên nhà cung cấp', 'Số dư đầu kỳ (Có)'),
    { ma: 'NCC00045', ten: 'Vườn rau Đà Lạt', mst: '5801122334', sodu: 8300000, ngaychot: new Date(2026, 6, 1), ghichu: 'Còn nợ tiền hàng T6' },
    'Công nợ PHẢI TRẢ nhà cung cấp (TK 331). Xoá dòng ví dụ (vàng) trước khi nhập. Cột có * là bắt buộc.'
  );

  await wb.xlsx.writeFile(OUT);
  console.log('✓ Đã tạo template:', OUT);
}

main().catch((e) => {
  console.error('✗ Lỗi tạo template:', e);
  process.exit(1);
});

import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { KetoanService } from './ketoan.service';

@Controller('ketoan')
@UseGuards(JwtAuthGuard)
export class KetoanController {
  constructor(private readonly ketoan: KetoanService) {}

  // ---- Phiếu thu/chi + ghi nhận ----
  @Post('phieu-thu-chi')
  taoPhieuThuChi(@Body() dto: any) {
    return this.ketoan.taoPhieuThuChi(dto);
  }

  @Get('phieu-thu-chi')
  danhSachPhieuThuChi(
    @Query('loai') loai?: 'THU' | 'CHI',
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ketoan.danhSachPhieuThuChi({ loai, tuNgay, denNgay, limit: limit ? Number(limit) : undefined });
  }

  /** Xoá phiếu thu/chi nhầm (đảo bút toán + khôi phục công nợ). */
  @Delete('phieu-thu-chi/:id')
  xoaPhieuThuChi(@Param('id') id: string) {
    return this.ketoan.xoaPhieuThuChi(id);
  }

  @Post('ghi-nhan-ban-hang/:donhangId')
  ghiNhanBanHang(@Param('donhangId') donhangId: string) {
    return this.ketoan.ghiNhanBanHang(donhangId);
  }

  @Post('ghi-nhan-nhap-mua/:dathangId')
  ghiNhanNhapMua(@Param('dathangId') dathangId: string) {
    return this.ketoan.ghiNhanNhapMua(dathangId);
  }

  // ---- Công nợ khách hàng (AR) ----
  @Get('cong-no-khach-hang/:khachhangId')
  congNoKhachHang(@Param('khachhangId') khachhangId: string, @Query('tuNgay') tuNgay?: string) {
    return this.ketoan.congNoRongKhachHang(khachhangId, tuNgay);
  }

  @Get('bao-cao-cong-no')
  baoCaoCongNo(@Query('tuNgay') tuNgay?: string, @Query('limit') limit?: string) {
    return this.ketoan.baoCaoCongNoTongHop({ tuNgay, limit: limit ? Number(limit) : undefined });
  }

  @Get('tuoi-no')
  tuoiNo(@Query('asOf') asOf?: string, @Query('limit') limit?: string) {
    return this.ketoan.baoCaoTuoiNo({ asOf, limit: limit ? Number(limit) : undefined });
  }

  @Get('doi-chieu/:khachhangId')
  doiChieu(@Param('khachhangId') khachhangId: string) {
    return this.ketoan.chiTietCongNoKhachHang(khachhangId);
  }

  // ---- Go-live (mốc bắt đầu) + khai báo đầu kỳ/thời hạn ----
  @Get('go-live')
  layGoLive() {
    return this.ketoan.layGoLive();
  }

  @Post('go-live')
  datGoLive(@Body() dto: { ngay: string }) {
    return this.ketoan.datGoLive(dto?.ngay);
  }

  /** Tải template khai báo go-live (đã liệt kê khách active có phát sinh). */
  @Get('khai-bao-go-live/template')
  async templateGoLive(@Res() res: any) {
    const { buffer, filename } = await this.ketoan.templateKhaiBaoGoLive();
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    });
    res.end(buffer);
  }

  @Post('khai-bao-go-live/import')
  importGoLive(@Body() dto: { rows: any[]; ngayChot?: string }) {
    return this.ketoan.importKhaiBaoGoLive(dto?.rows || [], dto?.ngayChot);
  }

  // ---- Công nợ nhà cung cấp (AP) ----
  @Get('bao-cao-cong-no-ncc')
  baoCaoCongNoNCC(@Query('limit') limit?: string) {
    return this.ketoan.baoCaoCongNoNCC({ limit: limit ? Number(limit) : undefined });
  }

  // ---- Khóa sổ ----
  @Post('khoa-so')
  khoaSo(@Body() dto: { nam: number; thang: number; lockedBy?: string }) {
    return this.ketoan.khoaSo(dto.nam, dto.thang, dto.lockedBy || 'system');
  }

  @Post('mo-khoa-so')
  moKhoaSo(@Body() dto: { nam: number; thang: number }) {
    return this.ketoan.moKhoaSo(dto.nam, dto.thang);
  }

  // ---- Hóa đơn điện tử + thuế ----
  @Post('phat-hanh-hoa-don/:donhangId')
  phatHanhHoaDon(@Param('donhangId') donhangId: string) {
    return this.ketoan.phatHanhHoaDon(donhangId);
  }

  @Get('bang-ke-ban-ra')
  bangKeBanRa(@Query('tuNgay') tuNgay?: string, @Query('denNgay') denNgay?: string) {
    return this.ketoan.bangKeHoaDonBanRa({ tuNgay, denNgay });
  }

  @Get('bang-ke-mua-vao')
  bangKeMuaVao(@Query('tuNgay') tuNgay?: string, @Query('denNgay') denNgay?: string) {
    return this.ketoan.bangKeHoaDonMuaVao({ tuNgay, denNgay });
  }

  // ---- Nhóm khách hàng (chốt/thu chung) ----
  @Get('nhom')
  danhSachNhom() {
    return this.ketoan.danhSachNhom();
  }

  @Post('nhom/:id/chot-chung')
  capNhatChotChungNhom(@Param('id') id: string, @Body() dto: { chotChung: boolean }) {
    return this.ketoan.capNhatChotChungNhom(id, !!dto.chotChung);
  }

  @Get('nhom/:id/cong-no')
  congNoNhom(@Param('id') id: string, @Query('tuNgay') tuNgay?: string) {
    return this.ketoan.congNoNhom(id, tuNgay);
  }

  /** Thành viên (chi nhánh) của nhóm — để bung ra chọn nhiều khi tạo biên bản. */
  @Get('nhom/:id/thanh-vien')
  thanhVienNhom(@Param('id') id: string) {
    return this.ketoan.thanhVienNhom(id);
  }

  // ---- Chốt / đối chiếu công nợ ----
  @Post('chot-cong-no/tao')
  taoBienBanChot(@Body() dto: { khachhangId?: string; nhomId?: string; khachhangIds?: string[]; tuNgay: string; denNgay: string; nguoiChot?: string; force?: boolean }) {
    return this.ketoan.taoBienBanChot(dto);
  }

  /** Tạo biên bản cho NHIỀU khách: sheetMode 'chung' (1 BB gộp) | 'tach' (mỗi KH 1 BB). */
  @Post('chot-cong-no/tao-nhieu')
  taoBienBanChotNhieu(@Body() dto: { khachhangIds: string[]; tuNgay: string; denNgay: string; sheetMode?: 'chung' | 'tach'; nguoiChot?: string }) {
    return this.ketoan.taoBienBanChotNhieu(dto);
  }

  @Post('chot-cong-no/:id/chot')
  chotCongNo(@Param('id') id: string, @Body() dto: { soChot: number; lyDo?: string; nguoiChot?: string }) {
    return this.ketoan.chotCongNo(id, dto.soChot, dto.lyDo, dto.nguoiChot);
  }

  /** Xoá biên bản NHÁP (dọn nháp/rỗng/trùng). */
  @Delete('chot-cong-no/:id')
  xoaBienBanNhap(@Param('id') id: string) {
    return this.ketoan.xoaBienBanNhap(id);
  }

  /** Huỷ biên bản ĐÃ CHỐT (đảo bút toán + giảm trừ, giữ để truy vết). */
  @Post('chot-cong-no/:id/huy')
  huyBienBanChot(@Param('id') id: string, @Body() dto: { lyDo?: string; nguoiHuy?: string }) {
    return this.ketoan.huyBienBanChot(id, dto?.lyDo, dto?.nguoiHuy);
  }

  @Get('chot-cong-no')
  danhSachChot(
    @Query('khachhangId') khachhangId?: string,
    @Query('nhomId') nhomId?: string,
    @Query('trangThai') trangThai?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ketoan.danhSachBienBanChot({ khachhangId, nhomId, trangThai, limit: limit ? Number(limit) : undefined });
  }

  @Get('chot-cong-no/:id/chi-tiet')
  chiTietChot(@Param('id') id: string) {
    return this.ketoan.chiTietBienBan(id);
  }

  /** Xuất Excel biên bản đối chiếu (tải về gửi khách). */
  @Get('chot-cong-no/:id/export')
  async exportChot(@Param('id') id: string, @Res() res: any) {
    const { buffer, filename } = await this.ketoan.xuatExcelBienBan(id);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    });
    res.end(buffer);
  }

  /** Xuất NHIỀU biên bản vào 1 file Excel (mỗi biên bản 1 sheet — "tách sheet"). */
  @Post('chot-cong-no/export-nhieu')
  async exportChotNhieu(@Body() dto: { ids: string[] }, @Res() res: any) {
    const { buffer, filename } = await this.ketoan.xuatExcelNhieu(dto?.ids || []);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    });
    res.end(buffer);
  }

  /** Nhập lại file khách đã sửa (mỗi dòng: madonhang + soChot). */
  @Post('chot-cong-no/:id/import')
  importChot(@Param('id') id: string, @Body() dto: { dong: any[] }) {
    return this.ketoan.importChot(id, dto.dong || []);
  }

  @Post('cai-dat-chu-ky-chot')
  caiDatChuKyChot(@Body() dto: { khachhangId: string; chuKyChotCongNo: number | null }) {
    return this.ketoan.caiDatChuKyChot(dto.khachhangId, dto.chuKyChotCongNo);
  }

  @Get('nhac-chot')
  nhacChot(@Query('asOf') asOf?: string, @Query('soNgayCanhBao') soNgayCanhBao?: string) {
    return this.ketoan.nhacChotCongNo({ asOf, soNgayCanhBao: soNgayCanhBao ? Number(soNgayCanhBao) : undefined });
  }

  // ---- Quy đổi giá vốn ----
  @Post('quy-doi/:sanphamId')
  capNhatQuyDoi(@Param('sanphamId') sanphamId: string, @Body() dto: any) {
    return this.ketoan.capNhatQuyDoi(sanphamId, dto);
  }

  @Get('gia-von/:sanphamId')
  giaVonSanPham(@Param('sanphamId') sanphamId: string, @Query('tu') tu?: string, @Query('den') den?: string) {
    return this.ketoan.giaVonSanPham(sanphamId, tu, den);
  }

  @Get('bang-gia-von')
  bangGiaVon(@Query('tu') tu?: string, @Query('den') den?: string, @Query('chiBienThe') chiBienThe?: string) {
    return this.ketoan.bangGiaVonQuyDoi({ tu, den, chiBienThe: chiBienThe === 'true' });
  }
}

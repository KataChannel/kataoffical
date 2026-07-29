import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { KetoanService } from '../ketoan.service';
import { GraphqlService } from '../../../shared/services/graphql.service';

@Component({
  selector: 'app-chotcongno',
  standalone: true,
  templateUrl: './chotcongno.component.html',
  imports: [CommonModule, FormsModule, RouterLink, MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
})
export class ChotcongnoComponent implements OnInit {
  private _ketoan = inject(KetoanService);
  private _gql = inject(GraphqlService);
  private _snack = inject(MatSnackBar);

  isLoading = signal(false);
  isSaving = signal(false);
  khachhangs = signal<any[]>([]);
  ChotList = this._ketoan.ChotList;
  NhacChot = this._ketoan.NhacChot;
  chuKyForm: any = { khachhangId: '', soNgay: 15 };
  makhToId: Record<string, string> = {};

  // Tìm kiếm khách cho các dropdown (1000+ khách)
  khachSearch = '';
  chuKySearch = '';
  cnSearch = '';
  nhomSearch = '';
  flagSearch = '';
  locKhach(q: string): any[] {
    const s = (q || '').trim().toLowerCase();
    // Ẩn khách lẻ (trả tiền mặt, không cần biên bản đối chiếu) — ai cần vẫn dùng nhóm "KHÁCH LẺ" ở chế độ Nhóm.
    const list = this.khachhangs().filter((k: any) => k.loaikh !== 'khachle');
    const f = s ? list.filter((k: any) => (k.makh || '').toLowerCase().includes(s) || (k.name || '').toLowerCase().includes(s)) : list;
    return f.slice(0, 300);
  }

  /** Lọc nhóm theo tên (171 nhóm) cho dropdown tạo biên bản. */
  locNhom(q: string): any[] {
    const s = (q || '').trim().toLowerCase();
    const list = this.nhomList();
    const f = s ? list.filter((n: any) => (n.name || '').toLowerCase().includes(s)) : list;
    return f.slice(0, 300);
  }

  /** Lọc nhóm cho panel bật/tắt cờ chốt chung. */
  locFlagNhom(q: string): any[] {
    const s = (q || '').trim().toLowerCase();
    const list = this.nhomList();
    return s ? list.filter((n: any) => (n.name || '').toLowerCase().includes(s)) : list;
  }

  form: any = { mode: 'khach', khachhangId: '', nhomId: '', khachhangIds: [] as string[], sheetMode: 'tach', khachTam: '', tuNgay: '', denNgay: new Date().toISOString().slice(0, 10) };
  nhomList = signal<any[]>([]);
  bienBansTach = signal<any[]>([]); // các biên bản vừa tạo ở chế độ "tách sheet"

  /** Đổi "Chốt theo" -> dọn lựa chọn cũ để tránh dính chip/nhóm của mode trước. */
  onDoiMode() {
    this.form.khachhangIds = [];
    this.form.khachTam = '';
    this.form.nhomId = '';
    this.form.khachhangId = '';
    this.bienBansTach.set([]);
    this.bienBan.set(null);
  }

  /** Thêm khách đang chọn vào danh sách chung/tách sheet. */
  themKhachChon() {
    const id = this.form.khachTam;
    if (!id) return;
    if (!this.form.khachhangIds.includes(id)) this.form.khachhangIds = [...this.form.khachhangIds, id];
    this.form.khachTam = '';
  }
  xoaKhachChon(id: string) {
    this.form.khachhangIds = this.form.khachhangIds.filter((x: string) => x !== id);
  }
  tenKhachChon(id: string): string {
    const k = this.khMap[id];
    return k ? `${k.makh} - ${k.name}` : id;
  }

  /** Chọn 1 nhóm -> bung TẤT CẢ chi nhánh ra danh sách chip (bỏ khách lẻ & mã đại diện TG-HT) để bỏ bớt CN không cần chốt. */
  async onChonNhom() {
    if (!this.form.nhomId) { this.form.khachhangIds = []; return; }
    try {
      const members: any[] = (await this._ketoan.thanhVienNhom(this.form.nhomId) as any) || [];
      members.forEach((m: any) => { if (!this.khMap[m.id]) this.khMap[m.id] = m; });
      const keep = members.filter((m: any) => m.loaikh !== 'khachle' && !String(m.makh || '').startsWith('TG-HT'));
      this.form.khachhangIds = keep.map((m: any) => m.id);
      const bo = members.length - keep.length;
      this._snack.open(`Đã bung ${keep.length} chi nhánh` + (bo ? ` (ẩn ${bo} khách lẻ/đại diện)` : '') + ' — bỏ bớt CN không cần rồi bấm Tạo', 'Đóng', { duration: 3500, panelClass: ['snackbar-success'] });
    } catch (e: any) {
      this._snack.open('Lỗi tải thành viên nhóm: ' + this.extractErr(e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] });
    }
  }

  /** Nhãn nhóm kèm số thành viên + cờ chốt chung. */
  nhomLabel(n: any): string {
    return `${n.name} (${n.soThanhVien ?? 0} KH)` + (n.chotChung ? ' • chốt chung' : ' • chốt riêng');
  }
  bienBan = signal<any>(null);   // biên bản nháp vừa tạo
  doiChieu = signal<any>(null);  // chi tiết đối chiếu
  soChot: number | null = null;
  lyDo = '';

  cols = ['soBienBan', 'khach', 'ky', 'soHeThong', 'soChot', 'chenhLech', 'trangThai', 'thaoTac'];
  labels: Record<string, string> = {
    soBienBan: 'Số BB', khach: 'Khách', ky: 'Kỳ', soHeThong: 'Số hệ thống',
    soChot: 'Số chốt', chenhLech: 'Chênh lệch', trangThai: 'Trạng thái', thaoTac: '',
  };

  khMap: Record<string, any> = {};

  async ngOnInit() {
    try {
      const res = await this._gql.findAll('khachhang', { select: { id: true, name: true, makh: true, loaikh: true }, aggressiveCache: true });
      const list = res?.data || [];
      this.khachhangs.set(list);
      list.forEach((k: any) => { this.khMap[k.id] = k; this.makhToId[k.makh] = k.id; });
    } catch { /* optional */ }
    await this.reloadList();
    try { await this._ketoan.loadNhacChot(7); } catch { /* optional */ }
    try { this.nhomList.set((await this._ketoan.loadNhom() as any) || []); } catch { /* optional */ }
  }

  /** Bật/tắt cờ "chốt chung" cho nhóm (nhóm được quản lý ở màn Nhóm khách hàng). */
  async toggleChotChung(n: any) {
    try {
      await this._ketoan.capNhatChotChungNhom(n.id, !n.chotChung);
      this.nhomList.set((await this._ketoan.loadNhom() as any) || []);
      this._snack.open('Đã cập nhật cờ chốt chung', 'Đóng', { duration: 2500, panelClass: ['snackbar-success'] });
    } catch (e: any) {
      this._snack.open('Lỗi cập nhật: ' + (e?.message || e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] });
    }
  }

  /** Cài chu kỳ chốt (số ngày) cho khách. */
  async luuChuKy() {
    if (!this.chuKyForm.khachhangId || !this.chuKyForm.soNgay) {
      this._snack.open('Chọn khách + số ngày chu kỳ', 'Đóng', { duration: 3000, panelClass: ['snackbar-warning'] });
      return;
    }
    try {
      await this._ketoan.caiChuKyChot(this.chuKyForm.khachhangId, Number(this.chuKyForm.soNgay));
      this._snack.open('Đã lưu chu kỳ chốt', 'Đóng', { duration: 2500, panelClass: ['snackbar-success'] });
      await this._ketoan.loadNhacChot(7);
    } catch (e: any) {
      this._snack.open('Lỗi: ' + (e?.message || e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] });
    }
  }

  /** Bấm 1 dòng nhắc -> nạp sẵn form tạo biên bản cho khách đó rồi cuộn tới form. */
  chonTuNhac(row: any) {
    const id = this.makhToId[row.makh];
    if (!id) {
      this._snack.open(`Không tìm thấy khách ${row.makh} trong danh sách`, 'Đóng', { duration: 3500, panelClass: ['snackbar-warning'] });
      return;
    }
    this.form.mode = 'khach';            // đảm bảo ô chọn khách hiển thị
    this.khachSearch = row.makh;         // lọc để option của khách này chắc chắn có trong dropdown
    this.form.khachhangId = id;
    this.form.tuNgay = (row.mocGanNhat || '').slice(0, 10);
    this.form.denNgay = new Date().toISOString().slice(0, 10);
    // cuộn tới form "Tạo biên bản" (nằm DƯỚI bảng nhắc), không cuộn lên top
    setTimeout(() => document.getElementById('form-tao-bienban')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
    this._snack.open(`Đã nạp form chốt cho ${row.makh} - ${row.name}`, 'Đóng', { duration: 2500, panelClass: ['snackbar-success'] });
  }

  badgeClass(tt: string): string {
    if (tt === 'QUA_HAN') return 'bg-red-100 text-red-700';
    if (tt === 'TOI_HAN') return 'bg-orange-100 text-orange-700';
    if (tt === 'SAP_TOI') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-600';
  }

  nhanTrangThai(tt: string): string {
    return tt === 'QUA_HAN' ? 'Quá hạn' : tt === 'TOI_HAN' ? 'Tới hạn' : tt === 'SAP_TOI' ? 'Sắp tới' : 'Còn hạn';
  }

  async reloadList() {
    this.isLoading.set(true);
    try { await this._ketoan.loadChotList({ limit: 300 }); }
    finally { this.isLoading.set(false); }
  }

  /** Trích message gọn từ lỗi fetch (body là JSON của NestJS). */
  private extractErr(e: any): string {
    const raw = e?.message || String(e);
    try { const j = JSON.parse(raw); return j?.message || raw; } catch { return raw; }
  }

  async taoBienBan(force = false) {
    const m = this.form.mode;
    // 'nhom' và 'nhieu' đều dùng danh sách chip khachhangIds (nhóm được bung ra để bỏ bớt CN).
    const dungChip = m === 'nhom' || m === 'nhieu';
    const thieuDoiTuong = m === 'khach' ? !this.form.khachhangId : this.form.khachhangIds.length === 0;
    if (!this.form.tuNgay || !this.form.denNgay || thieuDoiTuong) {
      this._snack.open(m === 'khach' ? 'Chọn đối tượng + từ ngày + đến ngày' : m === 'nhom' ? 'Chọn nhóm (bung chi nhánh) + từ ngày + đến ngày' : 'Thêm ít nhất 1 khách + từ ngày + đến ngày', 'Đóng', { duration: 3000, panelClass: ['snackbar-warning'] });
      return;
    }
    this.isSaving.set(true);
    try {
      if (dungChip) {
        const res: any = await this._ketoan.taoBienBanChotNhieu(this.form.khachhangIds, this.form.tuNgay, this.form.denNgay, this.form.sheetMode);
        const bbs = res?.bienBans || [];
        if (this.form.sheetMode === 'chung') { this.bienBan.set(bbs[0] || null); this.bienBansTach.set([]); }
        else { this.bienBansTach.set(bbs); this.bienBan.set(null); }
        const nLoi = (res?.loi || []).length;
        this._snack.open(`Đã tạo ${bbs.length} biên bản (${this.form.sheetMode === 'chung' ? 'chung sheet' : 'tách sheet'})` + (nLoi ? ` — ${nLoi} khách lỗi` : ''), 'Đóng', { duration: 3500, panelClass: ['snackbar-success'] });
        this.lyDo = '';
        await this.reloadList();
        return;
      }
      const bb: any = await this._ketoan.taoBienBanChot(this.form.khachhangId, this.form.tuNgay, this.form.denNgay, force);
      this.bienBan.set(bb);
      this.bienBansTach.set([]);
      this.lyDo = '';
    } catch (e: any) {
      const msg = this.extractErr(e);
      if (msg.startsWith('TRUNG:')) {          // trùng đối tượng+kỳ -> hỏi lại rồi tạo đè
        this.isSaving.set(false);
        if (confirm(msg.replace(/^TRUNG:\s*/, '') + '\n\nBấm OK để vẫn tạo biên bản mới.')) await this.taoBienBan(true);
        return;
      }
      this._snack.open('Lỗi tạo biên bản: ' + msg, 'Đóng', { duration: 5000, panelClass: ['snackbar-error'] });
    } finally { this.isSaving.set(false); }
  }

  // ---- Vòng đời biên bản: xoá nháp / huỷ đã chốt ----
  async xoaBienBanRow(r: any) {
    if (!confirm(`Xoá biên bản NHÁP ${r.soBienBan}? (không thể hoàn tác)`)) return;
    try {
      await this._ketoan.xoaBienBan(r.id);
      this._snack.open('Đã xoá ' + r.soBienBan, 'Đóng', { duration: 2500, panelClass: ['snackbar-success'] });
      await this.reloadList();
    } catch (e: any) {
      this._snack.open('Lỗi xoá: ' + this.extractErr(e), 'Đóng', { duration: 5000, panelClass: ['snackbar-error'] });
    }
  }

  async huyBienBanRow(r: any) {
    const lyDo = prompt(`Huỷ biên bản ĐÃ CHỐT ${r.soBienBan}?\nSẽ ĐẢO bút toán giảm trừ + phục hồi công nợ.\nNhập lý do huỷ:`);
    if (lyDo === null) return; // bấm Cancel
    try {
      await this._ketoan.huyBienBan(r.id, lyDo || undefined);
      this._snack.open('Đã huỷ ' + r.soBienBan, 'Đóng', { duration: 2500, panelClass: ['snackbar-success'] });
      await this.reloadList();
    } catch (e: any) {
      this._snack.open('Lỗi huỷ: ' + this.extractErr(e), 'Đóng', { duration: 5000, panelClass: ['snackbar-error'] });
    }
  }

  // ---- Lọc lịch sử chốt ----
  filterText = '';
  filterTrangThai = '';
  chotFiltered(): any[] {
    const s = this.filterText.trim().toLowerCase();
    const tt = this.filterTrangThai;
    return this.ChotList().filter((r: any) => {
      if (tt && r.trangThai !== tt) return false;
      if (!s) return true;
      const dt = (this.tenDoiTuong(r) || '').toLowerCase();
      return (r.soBienBan || '').toLowerCase().includes(s) || dt.includes(s);
    });
  }

  nhanTrangThaiBB(tt: string): string {
    return tt === 'DA_CHOT' ? 'Đã chốt' : tt === 'HUY' ? 'Đã huỷ' : 'Nháp';
  }
  classTrangThaiBB(tt: string): string {
    return tt === 'DA_CHOT' ? 'text-green-600' : tt === 'HUY' ? 'text-red-500 line-through' : 'text-gray-500';
  }

  thanhTienChot(ct: any): number {
    return Number(ct.soLuongChot || 0) * Number(ct.donGia || 0);
  }
  /** Dòng món này có phải món ĐẦU của đơn không (để chỉ hiện mã đơn 1 lần). */
  dauDon(list: any[], i: number): boolean {
    return i === 0 || list[i - 1]?.madonhang !== list[i]?.madonhang;
  }
  /** Số ĐƠN thực (mã đơn khác nhau) trong biên bản. */
  soDon(): number {
    return new Set((this.bienBan()?.chiTiet || []).map((c: any) => c.madonhang)).size;
  }
  tongSoChot(): number {
    return (this.bienBan()?.chiTiet || []).reduce((s: number, c: any) => s + this.thanhTienChot(c), 0);
  }
  chenhLechTong(): number {
    const bb = this.bienBan();
    return bb ? Number(bb.soHeThong) - this.tongSoChot() : 0;
  }

  async xuatExcel() {
    const bb = this.bienBan(); if (!bb) return;
    let dt = '';
    if (bb.khachhangId) dt = this.tenKhach(bb.khachhangId);
    else if (bb.nhomId) { const n = this.nhomList().find((x) => x.id === bb.nhomId); dt = n ? `Nhom-${n.name}` : 'Nhom'; }
    const ten = `${bb.soBienBan}-${dt}`.replace(/\s*-\s*/g, '-').replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim() + '.xlsx';
    try { await this._ketoan.exportBienBan(bb.id, ten); }
    catch (e: any) { this._snack.open('Lỗi xuất Excel: ' + (e?.message || e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] }); }
  }

  /** Xuất 1 file Excel gồm N biên bản (tách sheet) vừa tạo. */
  async xuatExcelTach() {
    const list = this.bienBansTach(); if (!list.length) return;
    try { await this._ketoan.exportBienBanNhieu(list.map((b: any) => b.id), `DoiChieu_${list.length}KH.xlsx`); }
    catch (e: any) { this._snack.open('Lỗi xuất Excel: ' + (e?.message || e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] }); }
  }
  dongPanelTach() { this.bienBansTach.set([]); }

  /** Upload file khách đã sửa -> đọc cột Mã đơn (B) + Số chốt (E) -> nhập lại. */
  async onUploadFile(event: any) {
    const bb = this.bienBan(); if (!bb) return;
    const file = event.target.files?.[0]; if (!file) return;
    this.isSaving.set(true);
    try {
      const buf = await file.arrayBuffer();
      const XLSX: any = await import('xlsx');
      const wb = XLSX.read(buf, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const dong: any[] = [];
      let lastMadon = '';
      for (const r of rows) {
        const ma = r?.[1]; const masp = r?.[3]; const sl = r?.[9]; // B=mã đơn, D=mã SP, J=SL chốt
        if (ma != null && String(ma).trim() !== '') lastMadon = String(ma).trim(); // dòng gộp bỏ trống -> kế thừa
        if (lastMadon && masp && sl != null && String(sl) !== '' && !isNaN(Number(sl))) {
          dong.push({ madonhang: lastMadon, masp: String(masp).trim(), soLuongChot: Number(sl) });
        }
      }
      const res: any = await this._ketoan.importChotFile(bb.id, dong);
      const dc: any = await this._ketoan.chiTietBienBan(bb.id);
      this.bienBan.set(dc.bienBan);
      this._snack.open(`Đã nhập ${res.updated} đơn từ file`, 'Đóng', { duration: 3000, panelClass: ['snackbar-success'] });
    } catch (e: any) {
      this._snack.open('Lỗi nhập file: ' + (e?.message || e), 'Đóng', { duration: 5000, panelClass: ['snackbar-error'] });
    } finally { this.isSaving.set(false); event.target.value = ''; }
  }

  /** Lưu chi tiết chỉnh tay (các ô số chốt trên bảng). */
  async luuChiTiet() {
    const bb = this.bienBan(); if (!bb) return;
    this.isSaving.set(true);
    try {
      const dong = (bb.chiTiet || []).map((c: any) => ({ madonhang: c.madonhang, masp: c.masp, soLuongChot: Number(c.soLuongChot) }));
      await this._ketoan.importChotFile(bb.id, dong);
      const dc: any = await this._ketoan.chiTietBienBan(bb.id);
      this.bienBan.set(dc.bienBan);
      this._snack.open('Đã lưu chi tiết', 'Đóng', { duration: 2500, panelClass: ['snackbar-success'] });
    } catch (e: any) {
      this._snack.open('Lỗi lưu: ' + (e?.message || e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] });
    } finally { this.isSaving.set(false); }
  }

  async chot() {
    const bb = this.bienBan(); if (!bb) return;
    this.isSaving.set(true);
    try {
      await this._ketoan.chotCongNo(bb.id, undefined, this.lyDo);
      this._snack.open('Đã chốt công nợ ' + bb.soBienBan, 'Đóng', { duration: 3000, panelClass: ['snackbar-success'] });
      this.huyBienBan();
      await this.reloadList();
    } catch (e: any) {
      this._snack.open('Lỗi chốt: ' + (e?.message || e), 'Đóng', { duration: 5000, panelClass: ['snackbar-error'] });
    } finally { this.isSaving.set(false); }
  }

  huyBienBan() {
    this.bienBan.set(null); this.doiChieu.set(null); this.soChot = null; this.lyDo = '';
  }

  tenKhach(id: string): string {
    const k = this.khMap[id];
    return k ? `${k.makh} - ${k.name}` : id;
  }

  /** Nhãn đối tượng của biên bản: khách (chốt riêng) hoặc nhóm (chốt chung). */
  tenDoiTuong(bb: any): string {
    if (!bb) return '';
    if (bb.khachhangId) return this.tenKhach(bb.khachhangId);
    if (bb.nhomId) { const n = this.nhomList().find((x) => x.id === bb.nhomId); return n ? `Nhóm: ${n.name}` : 'Nhóm'; }
    return 'Nhiều khách';
  }
}

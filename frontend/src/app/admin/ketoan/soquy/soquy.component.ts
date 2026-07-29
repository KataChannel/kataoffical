import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KetoanService } from '../ketoan.service';
import { GraphqlService } from '../../../shared/services/graphql.service';

@Component({
  selector: 'app-soquy',
  standalone: true,
  templateUrl: './soquy.component.html',
  imports: [CommonModule, FormsModule, MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
})
export class SoquyComponent implements OnInit {
  private _ketoan = inject(KetoanService);
  private _gql = inject(GraphqlService);
  private _snack = inject(MatSnackBar);

  isLoading = signal(false);
  isSaving = signal(false);
  showForm = signal(false);

  filter: { loai?: string; tuNgay?: string; denNgay?: string } = {};
  SoQuy = this._ketoan.SoQuy;
  cols = ['maphieu', 'loai', 'ngay', 'doiTuong', 'nghiepvu', 'hinhthuc', 'sotien', 'ghichu', 'thaoTac'];
  labels: Record<string, string> = {
    maphieu: 'Số phiếu', loai: 'Loại', ngay: 'Ngày', doiTuong: 'Đối tượng',
    nghiepvu: 'Nghiệp vụ', hinhthuc: 'Hình thức', sotien: 'Số tiền', ghichu: 'Ghi chú', thaoTac: '',
  };

  khachhangs = signal<any[]>([]);
  nhomList = signal<any[]>([]);
  khachSearch = '';
  nhomSearch = '';
  form: any = { loai: 'THU', hinhthuc: 'CHUYENKHOAN', nghiepvu: 'THU_KH', sotien: null, doiTuong: 'khach', khachhangId: '', nhomId: '', ghichu: '' };

  locKhach(q: string): any[] {
    const s = (q || '').trim().toLowerCase();
    const list = this.khachhangs();
    const f = s ? list.filter((k: any) => (k.makh || '').toLowerCase().includes(s) || (k.name || '').toLowerCase().includes(s)) : list;
    return f.slice(0, 300);
  }

  locNhom(q: string): any[] {
    const s = (q || '').trim().toLowerCase();
    const list = this.nhomList();
    const f = s ? list.filter((n: any) => (n.name || '').toLowerCase().includes(s)) : list;
    return f.slice(0, 300);
  }

  // Công nợ hiện tại của khách đang chọn (hiển thị khi lập phiếu thu)
  congNoKhach = signal<number | null>(null);
  loadingCongNo = signal(false);

  async onChonKhach() {
    this.congNoKhach.set(null);
    const id = this.form.khachhangId;
    if (!id) return;
    this.loadingCongNo.set(true);
    try {
      const r: any = await this._ketoan.congNoKhach(id);
      this.congNoKhach.set(Number(r?.soDuCuoiKy ?? 0));
    } catch { this.congNoKhach.set(null); }
    finally { this.loadingCongNo.set(false); }
  }

  thuHet() {
    const cn = this.congNoKhach();
    if (cn != null && cn > 0) this.form.sotien = Math.round(cn);
  }

  /** Số dư còn lại sau khi nhập số tiền thu (xem trước). */
  conLai(): number | null {
    const cn = this.congNoKhach();
    if (cn == null) return null;
    return cn - Number(this.form.sotien || 0);
  }

  async ngOnInit() {
    await this.reload();
    try {
      const res = await this._gql.findAll('khachhang', { select: { id: true, name: true, makh: true }, aggressiveCache: true });
      this.khachhangs.set(res?.data || []);
    } catch { /* dropdown optional */ }
    try { this.nhomList.set((await this._ketoan.loadNhom() as any) || []); } catch { /* nhóm optional */ }
  }

  async reload() {
    this.isLoading.set(true);
    try {
      await this._ketoan.loadSoQuy({ ...this.filter, limit: 300 });
    } catch (e: any) {
      this._snack.open('Lỗi tải sổ quỹ: ' + (e?.message || e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] });
    } finally {
      this.isLoading.set(false);
    }
  }

  async luuPhieu() {
    if (!this.form.sotien || this.form.sotien <= 0) {
      this._snack.open('Nhập số tiền hợp lệ', 'Đóng', { duration: 3000, panelClass: ['snackbar-warning'] });
      return;
    }
    this.isSaving.set(true);
    try {
      const dto: any = {
        loai: this.form.loai, sotien: Number(this.form.sotien),
        hinhthuc: this.form.hinhthuc, nghiepvu: this.form.nghiepvu, ghichu: this.form.ghichu,
      };
      if (this.form.loai === 'THU') {
        if (this.form.doiTuong === 'nhom') dto.nhomId = this.form.nhomId || undefined;
        else dto.khachhangId = this.form.khachhangId || undefined;
      }
      const conLai = this.form.loai === 'THU' && this.form.doiTuong === 'khach' ? this.conLai() : null;
      const r = await this._ketoan.taoPhieuThuChi(dto);
      const msg = 'Đã lập phiếu ' + (r?.phieu?.maphieu || '') + (conLai != null ? ` · Công nợ còn lại: ${Math.round(conLai).toLocaleString('vi-VN')}` : '');
      this._snack.open(msg, 'Đóng', { duration: 4000, panelClass: ['snackbar-success'] });
      this.showForm.set(false);
      this.form.sotien = null; this.form.ghichu = '';
      this.congNoKhach.set(null);
      await this.reload();
    } catch (e: any) {
      this._snack.open('Lỗi lập phiếu: ' + (e?.message || e), 'Đóng', { duration: 5000, panelClass: ['snackbar-error'] });
    } finally {
      this.isSaving.set(false);
    }
  }

  async xoaPhieuRow(r: any) {
    if (!confirm(`Xoá phiếu ${r.maphieu}? Sẽ đảo bút toán và khôi phục công nợ. Không thể hoàn tác.`)) return;
    try {
      await this._ketoan.xoaPhieu(r.id);
      this._snack.open('Đã xoá phiếu ' + r.maphieu, 'Đóng', { duration: 2500, panelClass: ['snackbar-success'] });
      await this.reload();
    } catch (e: any) {
      const raw = e?.message || String(e);
      let m = raw; try { m = JSON.parse(raw)?.message || raw; } catch { /* keep */ }
      this._snack.open('Lỗi xoá: ' + m, 'Đóng', { duration: 5000, panelClass: ['snackbar-error'] });
    }
  }
}

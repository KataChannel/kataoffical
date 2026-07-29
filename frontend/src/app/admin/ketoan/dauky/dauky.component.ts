import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KetoanService } from '../ketoan.service';

@Component({
  selector: 'app-dauky',
  standalone: true,
  templateUrl: './dauky.component.html',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
})
export class DaukyComponent implements OnInit {
  private _ketoan = inject(KetoanService);
  private _snack = inject(MatSnackBar);

  goLive = signal<string>('');
  goLiveInput = '';
  isBusy = signal(false);
  ketQua = signal<any>(null); // kết quả import

  async ngOnInit() {
    try {
      const r: any = await this._ketoan.layGoLive();
      this.goLive.set(r?.goLive || '');
      this.goLiveInput = r?.goLive || '';
    } catch { /* optional */ }
  }

  async luuGoLive() {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(this.goLiveInput)) {
      this._snack.open('Chọn ngày go-live hợp lệ', 'Đóng', { duration: 3000, panelClass: ['snackbar-warning'] });
      return;
    }
    this.isBusy.set(true);
    try {
      const r: any = await this._ketoan.datGoLive(this.goLiveInput);
      this.goLive.set(r.goLive);
      this._snack.open('Đã lưu go-live ' + r.goLive, 'Đóng', { duration: 3000, panelClass: ['snackbar-success'] });
    } catch (e: any) {
      this._snack.open('Lỗi: ' + this.msg(e), 'Đóng', { duration: 5000, panelClass: ['snackbar-error'] });
    } finally { this.isBusy.set(false); }
  }

  async taiTemplate() {
    try { await this._ketoan.taiTemplateGoLive(); }
    catch (e: any) { this._snack.open('Lỗi tải template: ' + this.msg(e), 'Đóng', { duration: 5000, panelClass: ['snackbar-error'] }); }
  }

  /** Đọc file khai báo (xlsx) -> gửi import. Cột: A=Mã KH, D=MST, E=Số dư, F=Thời hạn, G=Chu kỳ, H=Hạn mức. Dữ liệu từ dòng 5. */
  async onUpload(event: any) {
    const file = event.target.files?.[0]; if (!file) return;
    this.isBusy.set(true); this.ketQua.set(null);
    try {
      const buf = await file.arrayBuffer();
      const XLSX: any = await import('xlsx');
      const wb = XLSX.read(buf, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const grid: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const rows: any[] = [];
      for (let i = 4; i < grid.length; i++) { // bỏ 4 dòng đầu (tiêu đề + header)
        const g = grid[i]; if (!g) continue;
        const makh = (g[0] ?? '').toString().trim();
        if (!makh) continue;
        rows.push({
          makh,
          mst: g[3] != null && String(g[3]).trim() !== '' ? String(g[3]).trim() : undefined,
          soDuNo: this.n(g[4]),
          thoihanno: this.n(g[5]),
          chuKyChot: this.n(g[6]),
          hanmucno: this.n(g[7]),
        });
      }
      if (!rows.length) { this._snack.open('File không có dòng dữ liệu', 'Đóng', { duration: 3000, panelClass: ['snackbar-warning'] }); return; }
      const res: any = await this._ketoan.importGoLive(rows);
      this.ketQua.set(res);
      this._snack.open(`Import xong: cập nhật ${res.capNhatKhach} khách, ${res.dauKy} số dư đầu kỳ`, 'Đóng', { duration: 4000, panelClass: ['snackbar-success'] });
    } catch (e: any) {
      this._snack.open('Lỗi import: ' + this.msg(e), 'Đóng', { duration: 6000, panelClass: ['snackbar-error'] });
    } finally { this.isBusy.set(false); event.target.value = ''; }
  }

  private n(v: any): number | undefined {
    if (v == null || v === '' || isNaN(Number(v))) return undefined;
    return Number(v);
  }
  private msg(e: any): string {
    const raw = e?.message || String(e);
    try { return JSON.parse(raw)?.message || raw; } catch { return raw; }
  }
}

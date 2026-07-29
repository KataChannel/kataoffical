import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { KetoanService } from '../ketoan.service';

@Component({
  selector: 'app-congno-kh',
  standalone: true,
  templateUrl: './congno-kh.component.html',
  imports: [CommonModule, FormsModule, RouterLink, MatTableModule, MatTabsModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
})
export class CongnoKhComponent implements OnInit {
  private _ketoan = inject(KetoanService);
  private _snack = inject(MatSnackBar);

  isLoading = signal(false);
  asOf = new Date().toISOString().slice(0, 10);

  CongNoKH = this._ketoan.CongNoKH;
  TuoiNo = this._ketoan.TuoiNo;
  CongNoNCC = this._ketoan.CongNoNCC;

  colTongHop = ['makh', 'name', 'soDuDauKy', 'phatSinhNo', 'phatSinhCo', 'soDuCuoiKy', 'canhBao'];
  colTuoiNo = ['makh', 'name', 'tongNo', 'trongHan', 'quaHan_1_30', 'quaHan_31_60', 'quaHan_tren60'];
  colNCC = ['mancc', 'name', 'soDuDauKy', 'phatSinhTang', 'phatSinhGiam', 'soDuCuoiKy'];

  labels: Record<string, string> = {
    makh: 'Mã KH', mancc: 'Mã NCC', name: 'Tên',
    soDuDauKy: 'Dư đầu kỳ', phatSinhNo: 'PS Nợ', phatSinhCo: 'PS Có', soDuCuoiKy: 'Dư cuối kỳ',
    canhBao: 'Cảnh báo',
    tongNo: 'Tổng nợ', trongHan: 'Trong hạn', quaHan_1_30: 'Quá 1-30', quaHan_31_60: 'Quá 31-60', quaHan_tren60: 'Quá >60',
    phatSinhTang: 'PS tăng', phatSinhGiam: 'PS giảm',
  };

  async ngOnInit() {
    await this.reload();
  }

  async reload() {
    this.isLoading.set(true);
    try {
      await Promise.all([
        this._ketoan.loadCongNoKH(200),
        this._ketoan.loadTuoiNo(this.asOf, 200),
        this._ketoan.loadCongNoNCC(200),
      ]);
    } catch (e: any) {
      this._snack.open('Lỗi tải công nợ: ' + (e?.message || e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] });
    } finally {
      this.isLoading.set(false);
    }
  }
}

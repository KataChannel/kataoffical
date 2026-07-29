import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KetoanService } from '../ketoan.service';
import { GraphqlService } from '../../../shared/services/graphql.service';

@Component({
  selector: 'app-quydoi',
  standalone: true,
  templateUrl: './quydoi.component.html',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
})
export class QuydoiComponent implements OnInit {
  private _ketoan = inject(KetoanService);
  private _gql = inject(GraphqlService);
  private _snack = inject(MatSnackBar);

  isLoading = signal(false);
  sanphams = signal<any[]>([]);
  search = '';
  chiBienThe = false;
  giaVonMap: Record<string, any> = {};

  filtered = computed(() => {
    const q = this.search.trim().toLowerCase();
    let list = this.sanphams();
    if (this.chiBienThe) list = list.filter((s) => s.sanphamGocId);
    if (q) list = list.filter((s) => (s.masp || '').toLowerCase().includes(q) || (s.title || '').toLowerCase().includes(q));
    return list.slice(0, 100);
  });

  async ngOnInit() {
    this.isLoading.set(true);
    try {
      const res: any = await this._gql.findAll('sanpham', {
        select: { id: true, masp: true, title: true, dvt: true, giagoc: true, sanphamGocId: true, heSoQuyDoi: true, haoHutQuyDoi: true },
        aggressiveCache: true,
      });
      const list = (res?.data || []).map((s: any) => ({ ...s, _haoHutPct: Math.round((Number(s.haoHutQuyDoi) || 0) * 100) }));
      this.sanphams.set(list);
    } catch (e: any) {
      this._snack.open('Lỗi tải sản phẩm: ' + (e?.message || e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] });
    } finally {
      this.isLoading.set(false);
    }
  }

  async luu(sp: any) {
    try {
      await this._ketoan.capNhatQuyDoi(sp.id, {
        sanphamGocId: sp.sanphamGocId || null,
        heSoQuyDoi: Number(sp.heSoQuyDoi) || 1,
        haoHutQuyDoi: (Number(sp._haoHutPct) || 0) / 100,
      });
      this._snack.open('Đã lưu quy đổi ' + sp.masp, 'Đóng', { duration: 2500, panelClass: ['snackbar-success'] });
      await this.tinh(sp);
    } catch (e: any) {
      this._snack.open('Lỗi lưu: ' + (e?.message || e), 'Đóng', { duration: 4000, panelClass: ['snackbar-error'] });
    }
  }

  async tinh(sp: any) {
    try {
      this.giaVonMap[sp.id] = await this._ketoan.giaVonSanPham(sp.id);
    } catch (e: any) {
      this._snack.open('Lỗi tính: ' + (e?.message || e), 'Đóng', { duration: 3000, panelClass: ['snackbar-error'] });
    }
  }

  tenSp(id: string): string {
    const s = this.sanphams().find((x) => x.id === id);
    return s ? `${s.masp} - ${s.title}` : '';
  }
}

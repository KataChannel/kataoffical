import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

export interface ReconciliationItem {
  sanphamId: string;
  masp: string;
  title: string;
  dvt: string;
  sltonhethong: number;
  sltonthucte: number;
  slhuy: number;
  chenhlech: number;
  slDieuChinh: number; // User adjusted value, default to sltonthucte
  ghichuDieuChinh: string; // User adjustment notes
}

@Component({
  selector: 'app-reconciliation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule
  ],
  template: `
    <div class="reconciliation-dialog bg-white text-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-2xl p-6 max-w-4xl">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="bg-indigo-50 p-2.5 rounded-lg text-indigo-600 flex items-center justify-center">
            <mat-icon class="scale-110">warehouse</mat-icon>
          </div>
          <div>
            <h2 class="text-xl font-bold m-0 tracking-tight text-slate-900">ĐỐI SOÁT & ĐIỀU CHỈNH CHÊNH LỆCH CHỐT KHO</h2>
            <p class="text-xs text-slate-500 m-0 mt-1">Điều chỉnh số liệu tồn kho cho các sản phẩm lệch Baseline</p>
          </div>
        </div>
        <button (click)="onCancel()" class="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="dialog-content py-4 max-h-[60vh] overflow-y-auto">
        <!-- Warning Alert Banner -->
        <div class="mb-4 p-3.5 bg-amber-50 border border-amber-200/80 rounded-lg flex items-start gap-3">
          <mat-icon class="text-amber-600 mt-0.5">warning</mat-icon>
          <div class="text-xs text-amber-900 leading-relaxed font-medium">
            Hệ thống phát hiện có <strong>{{ items.length }} sản phẩm</strong> có chênh lệch giữa Tồn Hệ Thống (Baseline) và Tồn Thực Tế. 
            Vui lòng xem xét cột <strong>Điều Chỉnh</strong> (mặc định bằng Tồn Thực Tế) và cập nhật số liệu chính xác để chốt phiên.
          </div>
        </div>

        <!-- Table Container -->
        <div class="overflow-hidden border border-slate-200 rounded-lg bg-white shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th class="p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Mã SP</th>
                <th class="p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Tên Sản Phẩm</th>
                <th class="p-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">ĐVT</th>
                <th class="p-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">SL Hệ Thống</th>
                <th class="p-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">SL Thực Tế</th>
                <th class="p-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Lệch</th>
                <th class="p-3 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center w-28">Điều Chỉnh</th>
                <th class="p-3 text-xs font-semibold uppercase tracking-wider text-slate-500 w-44">Ghi Chú</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of items; let idx = index" class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td class="p-3 text-xs font-mono text-slate-500">
                  <span class="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-semibold">{{ item.masp }}</span>
                </td>
                <td class="p-3 text-sm font-semibold text-slate-800">{{ item.title }}</td>
                <td class="p-3 text-sm text-slate-500 text-center">{{ item.dvt || '-' }}</td>
                <td class="p-3 text-sm text-slate-600 text-right font-mono">{{ item.sltonhethong | number:'1.0-3' }}</td>
                <td class="p-3 text-sm text-slate-600 text-right font-mono">{{ item.sltonthucte | number:'1.0-3' }}</td>
                <td class="p-3 text-sm text-right font-mono font-bold">
                  <span [ngClass]="item.chenhlech > 0 ? 'text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded' : (item.chenhlech < 0 ? 'text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded' : 'text-slate-500 bg-slate-50 px-2 py-0.5 rounded')">
                    {{ item.chenhlech | number:'1.0-3' }}
                  </span>
                </td>
                <td class="p-2">
                  <input 
                    type="number" 
                    [(ngModel)]="item.slDieuChinh" 
                    (ngModelChange)="onAdjustmentChange(item)"
                    class="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-md text-sm text-emerald-700 font-bold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-center font-mono shadow-sm">
                </td>
                <td class="p-2">
                  <input 
                    type="text" 
                    [(ngModel)]="item.ghichuDieuChinh" 
                    placeholder="Lý do điều chỉnh..."
                    class="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400 shadow-sm">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button (click)="onCancel()" class="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-all">
          Hủy bỏ
        </button>
        <button 
          (click)="onConfirm()"
          class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2 rounded-lg shadow-md hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5 active:scale-95">
          <mat-icon class="scale-90 !m-0">check_circle</mat-icon>
          Xác Nhận & Điều Chỉnh
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: transparent;
    }
    .reconciliation-dialog {
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08);
      backdrop-filter: blur(8px);
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
  `]
})
export class ReconciliationDialogComponent implements OnInit {
  items: ReconciliationItem[] = [];

  constructor(
    private dialogRef: MatDialogRef<ReconciliationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: ReconciliationItem[] }
  ) {
    if (data?.items) {
      this.items = data.items.map(item => ({
        ...item,
        slDieuChinh: item.slDieuChinh !== undefined ? item.slDieuChinh : item.sltonthucte,
        ghichuDieuChinh: item.ghichuDieuChinh || ''
      }));
    }
  }

  ngOnInit(): void { }

  onAdjustmentChange(item: ReconciliationItem) {
    const sltonhethong = Number(item.sltonhethong) || 0;
    const slDieuChinh = Number(item.slDieuChinh) || 0;
    const slhuy = Number(item.slhuy) || 0;
    item.chenhlech = sltonhethong - slDieuChinh - slhuy;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(this.items);
  }
}

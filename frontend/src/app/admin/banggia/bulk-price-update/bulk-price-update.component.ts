import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PriceHistoryService } from '../price-history.service';
import * as XLSX from 'xlsx';

interface PriceUpdateRow {
  sanphamId: string;
  sanphamTitle: string;
  currentPrice: number;
  newPrice: number;
  change: number;
  changePercent: number;
  reason: string;
  status: 'pending' | 'success' | 'error';
  error?: string;
}

interface BulkUpdateSummary {
  total: number;
  success: number;
  failed: number;
  totalChange: number;
}

@Component({
  selector: 'app-bulk-price-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './bulk-price-update.component.html',
  styleUrls: ['./bulk-price-update.component.scss']
})
export class BulkPriceUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  
  // Signals
  loading = signal(false);
  previewing = signal(false);
  processing = signal(false);
  
  // Data
  priceUpdates = signal<PriceUpdateRow[]>([]);
  displayedColumns: string[] = ['sanphamTitle', 'currentPrice', 'newPrice', 'change', 'changePercent', 'reason', 'status', 'actions'];
  
  banggiaList = signal<any[]>([]);
  selectedBanggiaId = signal<string>('');
  
  summary = signal<BulkUpdateSummary>({
    total: 0,
    success: 0,
    failed: 0,
    totalChange: 0
  });

  constructor(
    private fb: FormBuilder,
    private priceService: PriceHistoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadBanggiaList();
  }

  initForm() {
    this.updateForm = this.fb.group({
      banggiaId: ['', Validators.required],
      updateType: ['manual', Validators.required],
      percentChange: [0],
      fixedAmount: [0],
      reason: ['', Validators.required]
    });
  }

  async loadBanggiaList() {
    // TODO: Replace with actual API call
    this.banggiaList.set([
      { id: 'bg-1', title: 'Bảng giá bán lẻ' },
      { id: 'bg-2', title: 'Bảng giá bán sỉ' },
      { id: 'bg-3', title: 'Bảng giá khách VIP' }
    ]);
  }

  // Excel Import
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        this.processExcelData(jsonData);
      } catch (error) {
        this.snackBar.open('Lỗi đọc file Excel', 'Đóng', { duration: 3000 });
      }
    };
    reader.readAsArrayBuffer(file);
  }

  processExcelData(data: any[]) {
    const updates: PriceUpdateRow[] = data.map((row: any) => ({
      sanphamId: row['Mã sản phẩm'] || row['sanphamId'] || '',
      sanphamTitle: row['Tên sản phẩm'] || row['sanphamTitle'] || '',
      currentPrice: parseFloat(row['Giá hiện tại'] || row['currentPrice'] || 0),
      newPrice: parseFloat(row['Giá mới'] || row['newPrice'] || 0),
      change: 0,
      changePercent: 0,
      reason: row['Lý do'] || row['reason'] || this.updateForm.value.reason || '',
      status: 'pending'
    }));

    // Calculate changes
    updates.forEach(update => {
      update.change = update.newPrice - update.currentPrice;
      update.changePercent = update.currentPrice > 0 
        ? (update.change / update.currentPrice) * 100 
        : 0;
    });

    this.priceUpdates.set(updates);
    this.calculateSummary();
    this.snackBar.open(`Đã tải ${updates.length} sản phẩm từ Excel`, 'Đóng', { duration: 3000 });
  }

  // Download Excel Template
  downloadTemplate() {
    const template = [
      {
        'Mã sản phẩm': 'SP001',
        'Tên sản phẩm': 'Ví dụ sản phẩm',
        'Giá hiện tại': 10000,
        'Giá mới': 12000,
        'Lý do': 'Tăng giá theo thị trường'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cập nhật giá');
    XLSX.writeFile(wb, 'mau-cap-nhat-gia.xlsx');
  }

  // Manual Add Row
  addManualRow() {
    const newRow: PriceUpdateRow = {
      sanphamId: '',
      sanphamTitle: '',
      currentPrice: 0,
      newPrice: 0,
      change: 0,
      changePercent: 0,
      reason: this.updateForm.value.reason || '',
      status: 'pending'
    };

    this.priceUpdates.update(updates => [...updates, newRow]);
  }

  // Remove Row
  removeRow(index: number) {
    this.priceUpdates.update(updates => updates.filter((_, i) => i !== index));
    this.calculateSummary();
  }

  // Apply Bulk Change (% or fixed amount)
  applyBulkChange() {
    const { updateType, percentChange, fixedAmount } = this.updateForm.value;
    
    this.priceUpdates.update(updates => {
      return updates.map(update => {
        if (updateType === 'percent') {
          update.newPrice = update.currentPrice * (1 + percentChange / 100);
        } else if (updateType === 'fixed') {
          update.newPrice = update.currentPrice + fixedAmount;
        }
        
        update.change = update.newPrice - update.currentPrice;
        update.changePercent = update.currentPrice > 0 
          ? (update.change / update.currentPrice) * 100 
          : 0;
        
        return update;
      });
    });

    this.calculateSummary();
  }

  // Preview Changes
  async previewChanges() {
    if (this.priceUpdates().length === 0) {
      this.snackBar.open('Chưa có dữ liệu để xem trước', 'Đóng', { duration: 3000 });
      return;
    }

    this.previewing.set(true);
    this.calculateSummary();

    // Show preview in dialog or expand view
    this.snackBar.open('Xem trước thay đổi', 'Đóng', { duration: 2000 });
    
    setTimeout(() => {
      this.previewing.set(false);
    }, 100);
  }

  // Apply Changes
  async applyChanges() {
    if (!this.updateForm.valid) {
      this.snackBar.open('Vui lòng điền đầy đủ thông tin', 'Đóng', { duration: 3000 });
      return;
    }

    if (this.priceUpdates().length === 0) {
      this.snackBar.open('Chưa có dữ liệu để cập nhật', 'Đóng', { duration: 3000 });
      return;
    }

    const confirmed = confirm(`Bạn có chắc chắn muốn cập nhật ${this.priceUpdates().length} sản phẩm?`);
    if (!confirmed) return;

    this.processing.set(true);

    try {
      const banggiaId = this.updateForm.value.banggiaId;
      const reason = this.updateForm.value.reason;

      for (let i = 0; i < this.priceUpdates().length; i++) {
        const update = this.priceUpdates()[i];
        
        try {
          // Call bulk update API
          await this.priceService.bulkUpdatePrices({
            updates: [{
              banggiaId,
              sanphamId: update.sanphamId,
              newPrice: update.newPrice,
              reason: update.reason || reason
            }],
            userId: 'current-user' // TODO: Get from auth service
          });

          // Update status
          this.priceUpdates.update(updates => {
            updates[i].status = 'success';
            return [...updates];
          });

          this.summary.update(s => ({
            ...s,
            success: s.success + 1
          }));

        } catch (error: any) {
          this.priceUpdates.update(updates => {
            updates[i].status = 'error';
            updates[i].error = error.message || 'Lỗi không xác định';
            return [...updates];
          });

          this.summary.update(s => ({
            ...s,
            failed: s.failed + 1
          }));
        }
      }

      this.snackBar.open(
        `Hoàn thành! Thành công: ${this.summary().success}, Thất bại: ${this.summary().failed}`,
        'Đóng',
        { duration: 5000 }
      );

    } catch (error: any) {
      this.snackBar.open(`Lỗi: ${error.message}`, 'Đóng', { duration: 5000 });
    } finally {
      this.processing.set(false);
    }
  }

  // Calculate Summary
  calculateSummary() {
    const updates = this.priceUpdates();
    const summary: BulkUpdateSummary = {
      total: updates.length,
      success: updates.filter(u => u.status === 'success').length,
      failed: updates.filter(u => u.status === 'error').length,
      totalChange: updates.reduce((sum, u) => sum + u.change, 0)
    };
    
    this.summary.set(summary);
  }

  // Format currency
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }

  // Clear all
  clearAll() {
    this.priceUpdates.set([]);
    this.summary.set({ total: 0, success: 0, failed: 0, totalChange: 0 });
  }
}

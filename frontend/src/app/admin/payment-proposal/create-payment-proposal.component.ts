import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DathangService } from '../dathang/dathang.service';
import { PaymentProposalService } from './payment-proposal.service';

@Component({
  selector: 'app-create-payment-proposal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './create-payment-proposal.component.html',
  styleUrls: ['./create-payment-proposal.component.scss']
})
export class CreatePaymentProposalComponent implements OnInit {
  _PaymentProposalService = inject(PaymentProposalService);
  _DathangService = inject(DathangService);
  _router = inject(Router);
  _route = inject(ActivatedRoute);
  _snackBar = inject(MatSnackBar);

  loading = signal<boolean>(false);
  
  proposalData = {
    maDeXuat: 'PP-' + Date.now().toString().slice(-6),
    description: '',
    items: [] as any[]
  };

  selectedPOs = signal<any[]>([]);

  constructor() {}

  ngOnInit() {
    // We expect PO IDs to be passed either via service or query params
    // For simplicity, let's assume we use a state service or just list the selected ones from DathangService if stored
    const storedPOs = localStorage.getItem('selected_pos_for_proposal');
    if (storedPOs) {
      this.selectedPOs.set(JSON.parse(storedPOs));
      this.prepareItems();
    } else {
      this._snackBar.open('Không có đơn hàng nào được chọn', 'Đóng', { duration: 3000, panelClass: ["snackbar-success"] });
      this._router.navigate(['/admin/congnoncc']);
    }
  }

  prepareItems() {
    const grouped = new Map<string, any>();
    
    this.selectedPOs().forEach(po => {
      const supplierId = po.nhacungcapId || po.nhacungcap?.id;
      if (!supplierId) return;
      
      if (!grouped.has(supplierId)) {
        grouped.set(supplierId, {
          supplierId: supplierId,
          supplierName: po.nhacungcap?.name || po.name,
          amount: 0,
          purchaseOrderIds: [],
          pos: []
        });
      }
      
      const group = grouped.get(supplierId);
      group.amount += Number(po.tongtien || 0);
      group.purchaseOrderIds.push(po.id);
      group.pos.push(po);
    });
    
    this.proposalData.items = Array.from(grouped.values());
  }

  calculateTotal() {
    return this.proposalData.items.reduce((sum, item) => sum + item.amount, 0);
  }

  async submit() {
    if (!this.proposalData.maDeXuat) {
      this._snackBar.open('Vui lòng nhập mã đề xuất', 'Đóng', { duration: 2000, panelClass: ["snackbar-warning"] });
      return;
    }

    try {
      this.loading.set(true);
      const payload = {
        maDeXuat: this.proposalData.maDeXuat,
        description: this.proposalData.description,
        items: this.proposalData.items.map(item => ({
          supplierId: item.supplierId,
          amount: item.amount,
          purchaseOrderIds: item.purchaseOrderIds
        }))
      };

      await this._PaymentProposalService.create(payload);
      this._snackBar.open('Tạo đề xuất thanh toán thành công', 'Đóng', { duration: 2000, panelClass: ["snackbar-success"] });
      localStorage.removeItem('selected_pos_for_proposal');
      this._router.navigate(['/admin/payment-proposal']);
    } catch (err: any) {
      this._snackBar.open(err.message || 'Lỗi khi tạo đề xuất', 'Đóng', { duration: 3000, panelClass: ["snackbar-error"] });
    } finally {
      this.loading.set(false);
    }
  }

  goBack() {
    this._router.navigate(['/admin/congnoncc']);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }
}

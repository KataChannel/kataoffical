import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { PaymentProposalService } from '../payment-proposal.service';

@Component({
  selector: 'app-list-payment-proposal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule
  ],
  templateUrl: './list-payment-proposal.component.html',
  styleUrls: ['./list-payment-proposal.component.scss']
})
export class ListPaymentProposalComponent implements OnInit {
  _PaymentProposalService = inject(PaymentProposalService);
  _UserService = inject(UserService);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);

  loading = signal<boolean>(false);
  canCreate = this._UserService.hasPermission('payment-proposal.create');
  
  filters = signal<any>({
    status: '',
    tuNgay: '',
    denNgay: ''
  });

  displayedColumns: string[] = ['maDeXuat', 'ngayLap', 'totalAmount', 'status', 'description', 'actions'];

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      this.loading.set(true);
      await this._PaymentProposalService.findAll(this.filters());
    } catch (err: any) {
      console.error('Error loading data:', err);
      this._snackBar.open('Lỗi khi tải dữ liệu đề xuất', 'Đóng', { duration: 3000, panelClass: ["snackbar-error"] });
    } finally {
      this.loading.set(false);
    }
  }

  viewDetail(id: string) {
    this._router.navigate(['/admin/payment-proposal', id]);
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'MOI': return 'Mới';
      case 'KHONG_DUYET': return 'Không duyệt';
      case 'CHO_THANH_TOAN': return 'Chờ thanh toán';
      case 'DA_THANH_TOAN': return 'Đã thanh toán';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'MOI': return 'bg-blue-100 text-blue-800';
      case 'KHONG_DUYET': return 'bg-red-100 text-red-800';
      case 'CHO_THANH_TOAN': return 'bg-yellow-100 text-yellow-800';
      case 'DA_THANH_TOAN': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }
}

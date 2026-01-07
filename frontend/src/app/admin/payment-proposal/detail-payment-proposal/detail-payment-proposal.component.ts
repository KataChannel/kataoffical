import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { PaymentProposalService } from '../payment-proposal.service';

@Component({
  selector: 'app-detail-payment-proposal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './detail-payment-proposal.component.html',
  styleUrls: ['./detail-payment-proposal.component.scss']
})
export class DetailPaymentProposalComponent implements OnInit {
  _PaymentProposalService = inject(PaymentProposalService);
  _UserService = inject(UserService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);

  loading = signal<boolean>(false);
  proposalId = signal<string | null>(null);
  comment = signal<string>('');
  canReview = this._UserService.hasPermission('payment-proposal.review');

  constructor() {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      if (params['id']) {
        this.proposalId.set(params['id']);
        this.loadDetail();
      }
    });
  }

  async loadDetail() {
    if (!this.proposalId()) return;
    try {
      this.loading.set(true);
      await this._PaymentProposalService.findOne(this.proposalId()!);
    } catch (err: any) {
      this._snackBar.open('Lỗi khi tải chi tiết đề xuất', 'Đóng', { duration: 3000, panelClass: ["snackbar-error"] });
      this._router.navigate(['/admin/payment-proposal']);
    } finally {
      this.loading.set(false);
    }
  }

  async approve() {
    if (!confirm('Bạn có chắc chắn muốn duyệt đề xuất này?')) return;
    try {
      await this._PaymentProposalService.review(this.proposalId()!, {
        status: 'CHO_THANH_TOAN',
        comment: this.comment()
      });
      this._snackBar.open('Đã duyệt đề xuất', 'Đóng', { duration: 2000, panelClass: ["snackbar-success"] });
    } catch (err: any) {
      this._snackBar.open(err.message || 'Lỗi khi duyệt đề xuất', 'Đóng', { duration: 3000, panelClass: ["snackbar-error"] });
    }
  }

  async reject() {
    if (!this.comment()) {
      this._snackBar.open('Vui lòng nhập lý do không duyệt vào ô ghi chú', 'Đóng', { duration: 3000, panelClass: ["snackbar-warning"] });
      return;
    }
    if (!confirm('Bạn có chắc chắn muốn không duyệt đề xuất này?')) return;
    try {
      await this._PaymentProposalService.review(this.proposalId()!, {
        status: 'KHONG_DUYET',
        comment: this.comment()
      });
      this._snackBar.open('Đã từ chối đề xuất', 'Đóng', { duration: 2000, panelClass: ["snackbar-success"] });
    } catch (err: any) {
      this._snackBar.open(err.message || 'Lỗi khi từ chối đề xuất', 'Đóng', { duration: 3000, panelClass: ["snackbar-error"] });
    }
  }

  goBack() {
    this._router.navigate(['/admin/payment-proposal']);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
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
}

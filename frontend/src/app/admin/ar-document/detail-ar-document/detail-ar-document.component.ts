import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ARDocumentService } from '../ar-document.service';

@Component({
  selector: 'app-detail-ar-document',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    @if (arService.DetailARDocument(); as doc) {
      <div class="p-6">
        <div class="flex flex-row justify-between items-center mb-6">
          <div class="flex flex-row items-center space-x-2">
            <button mat-icon-button routerLink="/admin/ar-document"><mat-icon>arrow_back</mat-icon></button>
            <h1 class="text-2xl font-bold">Chứng từ: {{doc.maChungTu}}</h1>
          </div>
          @if (doc.status === 'MOI') {
            <div class="flex space-x-2">
              <button mat-flat-button color="primary" (click)="review('CHO_THU_TIEN')">Duyệt & Chờ thu tiền</button>
              <button mat-stroked-button color="warn" (click)="review('KHONG_DUYET')">Không duyệt</button>
            </div>
          }
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Thông tin master -->
          <div class="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div>
              <div class="text-sm text-gray-500">Trạng thái:</div>
              <span class="px-2 py-1 rounded text-xs font-bold uppercase"
                   [ngClass]="{
                     'bg-gray-100 text-gray-600': doc.status === 'MOI',
                     'bg-blue-100 text-blue-600': doc.status === 'CHO_THU_TIEN',
                     'bg-green-100 text-green-600': doc.status === 'DA_THU_TIEN',
                     'bg-red-100 text-red-600': doc.status === 'KHONG_DUYET'
                   }">
                {{doc.status}}
              </span>
            </div>
            <div>
              <div class="text-sm text-gray-500">Ngày lập:</div>
              <div class="font-medium">{{doc.ngayLap | date:'dd/MM/yyyy HH:mm'}}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Tổng doanh số (CN Tạm):</div>
              <div class="text-2xl font-bold text-blue-600">{{doc.totalAmount | number}}</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Đã thanh toán:</div>
              <div class="text-2xl font-bold text-green-600">{{totalPaid | number}}</div>
            </div>
            <div class="pt-2 border-t">
              <div class="text-sm text-gray-500">Còn lại:</div>
              <div class="text-2xl font-bold text-red-600">{{remainingBalance | number}}</div>
            </div>
            @if (doc.description) {
              <div>
                <div class="text-sm text-gray-500">Ghi chú:</div>
                <div class="text-gray-700 italic border-l-4 pl-2 text-sm">{{doc.description}}</div>
              </div>
            }
          </div>
          <!-- Chi tiết các khoản thu (Items) -->
          <div class="lg:col-span-2 space-y-6">
            @for (item of doc.items; track item) {
              <div class="bg-white p-6 rounded-lg shadow-sm border">
                <div class="flex justify-between items-center mb-4 pb-2 border-b">
                  <div>
                    <div class="text-sm text-gray-500 uppercase">Khách hàng</div>
                    <div class="font-bold text-lg">{{item.customer?.name || item.customerId}}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-gray-500">Số tiền</div>
                    <div class="font-bold text-green-600">{{item.amount | number}}</div>
                    @if (doc.status === 'CHO_THU_TIEN' && !item.receiptVoucher) {
                      <button mat-flat-button color="accent" size="small" class="mt-2"
                        [routerLink]="['/admin/phieuthuchi/new']"
                            [queryParams]="{
                                loai: 'THU',
                                doiTuong: 'KHACHHANG',
                                doiTuongId: item.customerId,
                                amount: item.amount,
                                arDocumentItemId: item.id,
                                maChungTu: doc.maChungTu
                            }">
                        <mat-icon>payments</mat-icon> Thu tiền
                      </button>
                    }
                  </div>
                </div>
                <h3 class="text-sm font-semibold mb-2">Chi tiết đơn hàng trong giai đoạn:</h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="bg-gray-50 text-left">
                        <th class="p-2 border-b">Mã đơn</th>
                        <th class="p-2 border-b">Ngày giao</th>
                        <th class="p-2 border-b">Trạng thái (Status)</th>
                        <th class="p-2 border-b text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (so of item.salesOrders; track so) {
                        <tr class="border-b hover:bg-gray-50">
                          <td class="p-2"><a class="text-blue-600 font-medium whitespace-nowrap" [routerLink]="['/admin/donhang', so.salesOrder.id]">{{so.salesOrder.madonhang}}</a></td>
                          <td class="p-2 whitespace-nowrap">{{so.salesOrder.ngaygiao | date:'dd/MM/yyyy'}}</td>
                          <td class="p-2">
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ring-1 ring-inset"
                               [ngClass]="{
                                 'bg-gray-50 text-gray-600 ring-gray-200': so.salesOrder.soStatus === 'MOI',
                                 'bg-blue-50 text-blue-600 ring-blue-200': so.salesOrder.soStatus === 'DA_DOI_CHIEU',
                                 'bg-green-50 text-green-600 ring-green-200': so.salesOrder.soStatus === 'DA_THU_TIEN',
                                 'bg-yellow-50 text-yellow-600 ring-yellow-200': so.salesOrder.soStatus === 'CHO_THU_TIEN'
                               }">
                              {{getStatusLabel(so.salesOrder.soStatus)}}
                            </span>
                          </td>
                          <td class="p-2 text-right font-medium">{{so.salesOrder.tongtien | number}}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
                <!-- Thông tin phiếu thu nếu có -->
                @if (item.receiptVoucher) {
                  <div class="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100 flex justify-between items-center">
                    <div>
                      <div class="text-xs text-emerald-600 font-bold uppercase">Đã thu tiền</div>
                      <div class="text-sm font-medium">Phiếu số: {{item.receiptVoucher.maPhieu}}</div>
                    </div>
                    <div class="text-right">
                      <div class="text-xs text-emerald-600">Ngày thu</div>
                      <div class="text-sm">{{item.receiptVoucher.ngay | date:'dd/MM/yyyy'}}</div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    }
    `
})
export class DetailARDocumentComponent implements OnInit {
  arService = inject(ARDocumentService);
  route = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.arService.findOne(id);
    });
  }

  get totalPaid() {
    const doc = this.arService.DetailARDocument();
    if (!doc) return 0;
    return doc.items.reduce((sum: number, item: any) => {
      return sum + (item.receiptVoucher ? Number(item.amount) : 0);
    }, 0);
  }

  get remainingBalance() {
    const doc = this.arService.DetailARDocument();
    if (!doc) return 0;
    return Number(doc.totalAmount) - this.totalPaid;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'MOI': return 'Đã Nhận (Mới)';
      case 'DA_GIAO_THUC_TE': return 'Đã Nhận Thực Tế';
      case 'DA_DOI_CHIEU': return 'Đã Đối Chiếu (Verified)';
      case 'CHO_THU_TIEN': return 'Chờ Thu Tiền';
      case 'DA_THU_TIEN': return 'Đã Thanh Toán (Paid)';
      default: return status || 'N/A';
    }
  }

  async review(status: string) {
    const docId = this.arService.DetailARDocument().id;
    try {
      await this.arService.review(docId, { status });
      this.snackBar.open('Đã duyệt chứng từ', '', { duration: 2000 });
      this.arService.findOne(docId);
    } catch (error: any) {
      this.snackBar.open(error.message || 'Lỗi khi duyệt', '', { duration: 3000 });
    }
  }
}

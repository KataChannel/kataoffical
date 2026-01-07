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
    <div class="p-6" *ngIf="arService.DetailARDocument() as doc">
      <div class="flex flex-row justify-between items-center mb-6">
        <div class="flex flex-row items-center space-x-2">
           <button mat-icon-button routerLink="/admin/ar-document"><mat-icon>arrow_back</mat-icon></button>
           <h1 class="text-2xl font-bold">Chứng từ: {{doc.maChungTu}}</h1>
        </div>
        
        <div class="flex space-x-2" *ngIf="doc.status === 'MOI'">
          <button mat-flat-button color="primary" (click)="review('CHO_THU_TIEN')">Duyệt & Chờ thu tiền</button>
          <button mat-stroked-button color="warn" (click)="review('KHONG_DUYET')">Không duyệt</button>
        </div>
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
             <div class="text-sm text-gray-500">Tổng tiền:</div>
             <div class="text-2xl font-bold text-green-600">{{doc.totalAmount | number}}</div>
           </div>

           <div *ngIf="doc.description">
             <div class="text-sm text-gray-500">Ghi chú:</div>
             <div class="text-gray-700 italic border-l-4 pl-2">{{doc.description}}</div>
           </div>
        </div>

        <!-- Chi tiết các khoản thu (Items) -->
        <div class="lg:col-span-2 space-y-6">
           <div *ngFor="let item of doc.items" class="bg-white p-6 rounded-lg shadow-sm border">
              <div class="flex justify-between items-center mb-4 pb-2 border-b">
                 <div>
                    <div class="text-sm text-gray-500 uppercase">Khách hàng</div>
                    <div class="font-bold text-lg">{{item.customer?.name || item.customerId}}</div>
                 </div>
                 <div class="text-right">
                    <div class="text-sm text-gray-500">Số tiền</div>
                    <div class="font-bold text-green-600">{{item.amount | number}}</div>
                    <button mat-flat-button color="accent" size="small" class="mt-2"
                            *ngIf="doc.status === 'CHO_THU_TIEN' && !item.receiptVoucher"
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
                 </div>
              </div>

              <h3 class="text-sm font-semibold mb-2">Đơn hàng liên quan:</h3>
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-gray-50 text-left">
                    <th class="p-2">Mã đơn</th>
                    <th class="p-2">Trạng thái SO</th>
                    <th class="p-2 text-right">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let so of item.salesOrders" class="border-b">
                    <td class="p-2"><a class="text-blue-600" [routerLink]="['/admin/donhang', so.salesOrder.id]">{{so.salesOrder.madonhang}}</a></td>
                    <td class="p-2">{{so.salesOrder.soStatus}}</td>
                    <td class="p-2 text-right font-medium">{{so.salesOrder.tongtien | number}}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Thông tin phiếu thu nếu có -->
              <div *ngIf="item.receiptVoucher" class="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100 flex justify-between items-center">
                 <div>
                   <div class="text-xs text-emerald-600 font-bold uppercase">Đã thu tiền</div>
                   <div class="text-sm font-medium">Phiếu số: {{item.receiptVoucher.maPhieu}}</div>
                 </div>
                 <div class="text-right">
                   <div class="text-xs text-emerald-600">Ngày thu</div>
                   <div class="text-sm">{{item.receiptVoucher.ngay | date:'dd/MM/yyyy'}}</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
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

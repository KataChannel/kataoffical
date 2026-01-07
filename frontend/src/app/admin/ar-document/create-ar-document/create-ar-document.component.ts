import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import moment from 'moment';
import { GraphqlService } from '../../../shared/services/graphql.service';
import { DonhangService } from '../../donhang/donhang.service';
import { ARDocumentService } from '../ar-document.service';

@Component({
  selector: 'app-create-ar-document',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    RouterModule
  ],
  template: `
    <div class="p-6">
      <div class="flex flex-row items-center space-x-2 mb-6">
          <button mat-icon-button routerLink="/admin/ar-document"><mat-icon>arrow_back</mat-icon></button>
          <h1 class="text-2xl font-bold">Tạo Chứng từ Công nợ mới</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Bước 1: Chọn Khách hàng & Mã chứng từ -->
        <div class="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border space-y-4 h-fit">
          <h2 class="text-lg font-bold border-b pb-2 mb-4">Thông tin chung</h2>
          
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Mã chứng từ</mat-label>
            <input matInput [(ngModel)]="maChungTu" placeholder="Ví dụ: AR-2024-001">
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Khách hàng</mat-label>
            <mat-select [(ngModel)]="selectedCustomerId" (selectionChange)="onCustomerChange()">
              <mat-option *ngFor="let kh of listKhachhang" [value]="kh.id">
                {{kh.name}} ({{kh.makh}})
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Ghi chú</mat-label>
            <textarea matInput [(ngModel)]="description" rows="3"></textarea>
          </mat-form-field>

          <div class="pt-4">
             <div class="text-sm text-gray-500 mb-2">Tổng tiền đề xuất:</div>
             <div class="text-2xl font-bold text-green-600">{{calculateTotal() | number}}</div>
          </div>

          <button mat-flat-button color="primary" class="w-full mt-6" 
                  [disabled]="selectedSOIds.size === 0 || !maChungTu"
                  (click)="submit()">
            <mat-icon>save</mat-icon> Lưu & Gửi duyệt
          </button>
        </div>

        <!-- Bước 2: Chọn Đơn hàng (Đã đối chiếu) -->
        <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border h-fit min-h-[500px]">
          <h2 class="text-lg font-bold border-b pb-2 mb-4">Danh sách Đơn hàng (Đã đối chiếu)</h2>
          
          <div *ngIf="!selectedCustomerId" class="flex flex-col items-center justify-center p-20 text-gray-400">
            <mat-icon class="text-5xl mb-2">person_search</mat-icon>
            <p>Vui lòng chọn khách hàng để xem danh sách đơn hàng</p>
          </div>

          <div *ngIf="selectedCustomerId && listAvailableOrders.length === 0" class="flex flex-col items-center justify-center p-20 text-gray-400">
            <mat-icon class="text-5xl mb-2">inventory_2</mat-icon>
            <p>Không có đơn hàng nào cần thu tiền cho khách hàng này (phải là đơn 'DA_DOI_CHIEU')</p>
          </div>

          <table mat-table [dataSource]="listAvailableOrders" *ngIf="selectedCustomerId && listAvailableOrders.length > 0" class="w-full">
            <ng-container matColumnDef="select">
              <th mat-header-cell *matHeaderCellDef>
                <mat-checkbox (change)="$event ? masterToggle() : null"
                              [checked]="selectedSOIds.size === listAvailableOrders.length"
                              [indeterminate]="selectedSOIds.size > 0 && selectedSOIds.size < listAvailableOrders.length">
                </mat-checkbox>
              </th>
              <td mat-cell *matCellDef="let row">
                <mat-checkbox (click)="$event.stopPropagation()"
                              (change)="$event ? toggleSO(row.id) : null"
                              [checked]="selectedSOIds.has(row.id)">
                </mat-checkbox>
              </td>
            </ng-container>

            <ng-container matColumnDef="madonhang">
              <th mat-header-cell *matHeaderCellDef> Mã đơn </th>
              <td mat-cell *matCellDef="let row"> {{row.madonhang}} </td>
            </ng-container>

            <ng-container matColumnDef="ngaygiao">
              <th mat-header-cell *matHeaderCellDef> Ngày giao </th>
              <td mat-cell *matCellDef="let row"> {{row.ngaygiao | date:'dd/MM/yyyy'}} </td>
            </ng-container>

            <ng-container matColumnDef="tongtien">
              <th mat-header-cell *matHeaderCellDef class="text-right"> Thành tiền </th>
              <td mat-cell *matCellDef="let row" class="text-right"> {{row.tongtien | number}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="['select', 'madonhang', 'ngaygiao', 'tongtien']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['select', 'madonhang', 'ngaygiao', 'tongtien']" (click)="toggleSO(row.id)"></tr>
          </table>
        </div>
      </div>
    </div>
  `
})
export class CreateARDocumentComponent implements OnInit {
  arService = inject(ARDocumentService);
  donhangService = inject(DonhangService);
  graphqlService = inject(GraphqlService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  listKhachhang: any[] = [];
  listAvailableOrders: any[] = [];
  
  selectedCustomerId: string = '';
  maChungTu: string = `AR-${moment().format('YYYYMMDD-HHmm')}`;
  description: string = '';
  selectedSOIds = new Set<string>();

  async ngOnInit() {
    this.loadKhachhang();
  }

  async loadKhachhang() {
    const res = await this.graphqlService.findAll('khachhang', { 
        take: 1000, 
        select: { id: true, name: true, makh: true } 
    });
    this.listKhachhang = res.data;
  }

  async onCustomerChange() {
    this.selectedSOIds.clear();
    this.listAvailableOrders = [];
    
    if (!this.selectedCustomerId) return;

    // Tìm các đơn hàng của khách hàng này có soStatus = 'DA_DOI_CHIEU'
    // Lưu ý: Backend filter search có thể dùng soStatus
    const res = await this.donhangService.searchDonhang({
      khachhangId: this.selectedCustomerId,
      soStatus: 'DA_DOI_CHIEU',
      pageSize: 1000
    });
    
    if (res && res.data) {
      this.listAvailableOrders = res.data;
    }
  }

  toggleSO(id: string) {
    if (this.selectedSOIds.has(id)) {
      this.selectedSOIds.delete(id);
    } else {
      this.selectedSOIds.add(id);
    }
  }

  masterToggle() {
    if (this.selectedSOIds.size === this.listAvailableOrders.length) {
      this.selectedSOIds.clear();
    } else {
      this.listAvailableOrders.forEach(o => this.selectedSOIds.add(o.id));
    }
  }

  calculateTotal() {
    return this.listAvailableOrders
      .filter(o => this.selectedSOIds.has(o.id))
      .reduce((sum, o) => sum + (o.tongtien || 0), 0);
  }

  async submit() {
    try {
      const payload = {
        maChungTu: this.maChungTu,
        description: this.description,
        items: [
          {
            customerId: this.selectedCustomerId,
            amount: this.calculateTotal(),
            salesOrderIds: Array.from(this.selectedSOIds)
          }
        ]
      };

      await this.arService.create(payload);
      this.snackBar.open('Tạo chứng từ công nợ thành công', '', { duration: 2000 });
      this.router.navigate(['/admin/ar-document']);
    } catch (error: any) {
      this.snackBar.open(error.message || 'Lỗi khi tạo chứng từ', '', { duration: 3000 });
    }
  }
}

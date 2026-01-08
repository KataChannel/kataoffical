import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import moment from 'moment';
import { GraphqlService } from '../../../shared/services/graphql.service';
import { ThanhtoanService } from '../thanhtoan.service';

@Component({
  selector: 'app-create-thanhtoan-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="flex flex-col h-full max-h-[90vh] sm:max-h-[85vh]">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b sm:px-6">
        <div>
          <h2 class="text-lg font-semibold tracking-tight text-slate-900">Tạo Thanh Toán Công Nợ</h2>
          <p class="text-sm text-slate-500">Phân bổ thanh toán cho các đơn hàng</p>
        </div>
        <button mat-icon-button (click)="close()" class="text-slate-500 hover:text-slate-700">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    
      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
    
        <!-- Section 1: Thông tin chung -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Khách Hàng</label>
            <mat-form-field appearance="outline" class="w-full custom-mat-field" subscriptSizing="dynamic">
              <mat-select [(ngModel)]="selectedCustomer" (selectionChange)="onCustomerChange($event.value)" [disabled]="isSubmitting()" placeholder="Chọn khách hàng">
                <mat-option>
                  <input matInput placeholder="Tìm kiếm tên, mã..." (keyup)="filterCustomers($event)" (click)="$event.stopPropagation()" class="p-2 w-full">
                </mat-option>
                @for (kh of filteredCustomers; track kh.id) {
                  <mat-option [value]="kh.id">
                    <span class="font-medium">{{kh.name}}</span>
                    <span class="text-xs text-slate-500 ml-2">({{kh.makh}})</span>
                  </mat-option>
                }
              </mat-select>
              <mat-icon matSuffix class="text-slate-400">person_search</mat-icon>
            </mat-form-field>
          </div>
    
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Ngày Thanh Toán</label>
            <mat-form-field appearance="outline" class="w-full custom-mat-field" subscriptSizing="dynamic">
              <input matInput [matDatepicker]="picker" [(ngModel)]="ngayThanhToan" placeholder="DD/MM/YYYY">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </div>
        </div>
    
        <!-- Section 2: Chi tiết thanh toán - Card Style -->
        <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-12">
    
            <div class="sm:col-span-5 space-y-1">
              <label class="text-sm font-medium text-slate-700">Tổng Tiền Thu</label>
              <div class="relative">
                <input
                  type="text"
                  class="w-full h-11 pl-3 pr-10 text-right font-bold text-lg rounded-md border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  [ngModel]="totalPaymentAmount | number:'1.0-0'"
                  (ngModelChange)="updateTotalAmount($event)"
                  placeholder="0"
                  >
                <span class="absolute right-3 top-2.5 text-slate-500 font-medium">₫</span>
              </div>
            </div>
    
            <div class="sm:col-span-4 space-y-1">
              <label class="text-sm font-medium text-slate-700">Phương Thức</label>
              <mat-form-field appearance="outline" class="w-full custom-mat-field" subscriptSizing="dynamic">
                <mat-select [(ngModel)]="paymentMethod">
                  <mat-option value="TIEN_MAT">💵 Tiền mặt</mat-option>
                  <mat-option value="CHUYEN_KHOAN">🏦 Chuyển khoản</mat-option>
                  <mat-option value="THE">💳 Thẻ</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
    
            <div class="sm:col-span-3 flex items-end pb-1">
              <mat-checkbox [(ngModel)]="isAutoAllocate" (change)="autoAllocate()" color="primary" class="font-medium text-slate-700">
                Tự động phân bổ
              </mat-checkbox>
            </div>
          </div>
    
          <div class="mt-4 space-y-1">
            <label class="text-sm font-medium text-slate-700">Ghi Chú</label>
            <input
              type="text"
              class="w-full h-10 px-3 rounded-md border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
              [(ngModel)]="commonNote"
              placeholder="Nhập ghi chú cho đợt thanh toán này..."
              >
          </div>
        </div>
    
        <!-- Section 3: Danh sách đơn hàng -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-slate-900">Danh Sách Đơn Nợ</h3>
            <span class="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full text-slate-600">
              {{orders.length}} đơn
            </span>
          </div>
    
          <div class="border rounded-lg overflow-hidden bg-white relative min-h-[200px]">
            <!-- Loading State -->
            @if (isLoadingOrders) {
              <div class="absolute inset-0 bg-white/80 z-10 flex items-center justify-center backdrop-blur-sm">
                <div class="flex flex-col items-center gap-2">
                  <mat-spinner diameter="30"></mat-spinner>
                  <span class="text-sm text-slate-500">Đang tải đơn hàng...</span>
                </div>
              </div>
            }
    
            <!-- Empty State -->
            @if (!isLoadingOrders && orders.length === 0) {
              <div class="flex flex-col items-center justify-center py-10 text-slate-400">
                <mat-icon class="text-4xl w-10 h-10 mb-2">assignment_late</mat-icon>
                <p>{{ selectedCustomer ? 'Khách hàng này không có đơn nợ' : 'Vui lòng chọn khách hàng' }}</p>
              </div>
            }
    
            <!-- Desktop Table -->
            <div class="hidden sm:block overflow-auto max-h-[400px]">
              <table mat-table [dataSource]="dataSource" class="w-full">
                <!-- Select Column -->
                <ng-container matColumnDef="select">
                  <th mat-header-cell *matHeaderCellDef class="w-10">
                    <mat-checkbox (change)="$event ? toggleAllRows() : null"
                      [checked]="selection.hasValue() && isAllSelected()"
                      [indeterminate]="selection.hasValue() && !isAllSelected()"
                      color="primary">
                    </mat-checkbox>
                  </th>
                  <td mat-cell *matCellDef="let row">
                    <mat-checkbox (click)="$event.stopPropagation()"
                      (change)="$event ? selection.toggle(row) : null"
                      [checked]="selection.isSelected(row)"
                      color="primary">
                    </mat-checkbox>
                  </td>
                </ng-container>
    
                <ng-container matColumnDef="ngaygiao">
                  <th mat-header-cell *matHeaderCellDef> Ngày </th>
                  <td mat-cell *matCellDef="let element" class="whitespace-nowrap">
                    <span class="text-slate-600 font-medium">{{element.ngaygiao | date:'dd/MM/yy'}}</span>
                  </td>
                </ng-container>
    
                <ng-container matColumnDef="madonhang">
                  <th mat-header-cell *matHeaderCellDef> Mã Đơn </th>
                  <td mat-cell *matCellDef="let element">
                    <span class="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">{{element.madonhang}}</span>
                  </td>
                </ng-container>
    
                <ng-container matColumnDef="tongtien">
                  <th mat-header-cell *matHeaderCellDef class="text-right"> Tổng Tiền </th>
                  <td mat-cell *matCellDef="let element" class="text-right text-slate-500">
                    {{element.tongtien | number:'1.0-0'}}
                  </td>
                </ng-container>
    
                <ng-container matColumnDef="dathanhtoan">
                  <th mat-header-cell *matHeaderCellDef class="text-right"> Đã Trả </th>
                  <td mat-cell *matCellDef="let element" class="text-right text-green-600">
                    {{element.dathanhtoan | number:'1.0-0'}}
                  </td>
                </ng-container>
    
                <ng-container matColumnDef="conlai">
                  <th mat-header-cell *matHeaderCellDef class="text-right"> Còn Lại </th>
                  <td mat-cell *matCellDef="let element" class="text-right font-medium text-red-600">
                    {{element.remaining | number:'1.0-0'}}
                  </td>
                </ng-container>
    
                <ng-container matColumnDef="thanhtoan">
                  <th mat-header-cell *matHeaderCellDef class="w-40"> Phân Bổ </th>
                  <td mat-cell *matCellDef="let element">
                    <input type="text"
                      class="w-full text-right p-2 text-sm border-b border-slate-200 focus:border-primary outline-none bg-transparent font-medium text-blue-700"
                      [ngModel]="element.allocation | number:'1.0-0'"
                      (ngModelChange)="updateRowAllocation(element, $event)"
                      placeholder="0">
                  </td>
                </ng-container>
    
                <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true" class="bg-slate-50 h-10"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                  class="hover:bg-slate-50 h-12 transition-colors border-b last:border-0"
                [class.bg-blue-50]="row.allocation > 0"></tr>
              </table>
            </div>
    
            <!-- Mobile List (Cards) -->
            <div class="sm:hidden max-h-[400px] overflow-y-auto p-2 space-y-2 bg-slate-50">
              @for (item of orders; track item) {
                <div
                  class="bg-white p-3 rounded-lg shadow-sm border border-slate-200"
                  [class.ring-1]="item.allocation > 0"
                  [class.ring-blue-500]="item.allocation > 0">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <span class="font-mono text-xs font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 block mb-1 w-fit">{{item.madonhang}}</span>
                      <span class="text-xs text-slate-500">{{item.ngaygiao | date:'dd/MM/yyyy'}}</span>
                    </div>
                    <div class="text-right">
                      <div class="text-xs text-slate-500">Nợ: <span class="text-red-600 font-medium">{{item.remaining | number:'1.0-0'}}</span></div>
                      <div class="text-xs text-slate-400">Tổng: {{item.tongtien | number:'1.0-0'}}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                    <label class="text-xs font-medium text-slate-700 whitespace-nowrap">Thanh toán:</label>
                    <input type="text"
                      class="flex-1 text-right text-sm font-bold text-blue-700 p-1.5 rounded bg-blue-50/50 border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                      [ngModel]="item.allocation | number:'1.0-0'"
                      (ngModelChange)="updateRowAllocation(item, $event)"
                      placeholder="0">
                  </div>
                </div>
              }
            </div>
    
          </div>
        </div>
    
      </div>
    
      <!-- Footer -->
      <div class="border-t bg-slate-50 p-4 sm:px-6 z-10">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm w-full sm:w-auto">
            <div class="flex justify-between w-full sm:w-auto sm:block">
              <span class="text-slate-500">Đã chọn:</span>
              <span class="font-medium ml-1">{{getSelectedCount()}} đơn</span>
            </div>
            <div class="flex justify-between w-full sm:w-auto sm:block">
              <span class="text-slate-500">Đã phân bổ:</span>
              <span class="font-bold text-blue-600 ml-1 text-base">{{totalAllocated | number:'1.0-0'}}</span>
              <span class="text-slate-400 mx-1">/</span>
              <span class="font-medium text-slate-600">{{totalPaymentAmount | number:'1.0-0'}}</span>
            </div>
          </div>
    
          <div class="flex gap-3 w-full sm:w-auto">
            <button mat-stroked-button color="warn" class="flex-1 sm:flex-none" (click)="close()">Huỷ</button>
            <button mat-flat-button color="primary" class="flex-1 sm:flex-none"
              [disabled]="isSubmitting() || totalAllocated === 0"
              (click)="submit()">
              @if (!isSubmitting()) {
                <span>Lưu Thanh Toán</span>
              }
              @if (isSubmitting()) {
                <div class="flex items-center gap-2">
                  <mat-spinner diameter="18" class="text-white-important"></mat-spinner>
                  <span>Đang lưu...</span>
                </div>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
    `,
  styles: [`
    ::ng-deep .custom-mat-field .mat-mdc-text-field-wrapper {
      background-color: white !important;
      border-radius: 0.5rem;
    }
    ::ng-deep .custom-mat-field .mat-mdc-form-field-flex {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      align-items: center !important;
      height: 44px;
    }
    ::ng-deep .custom-mat-field .mat-mdc-form-field-infix {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      min-height: 44px;
    }
    /* Hide number input arrows */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    
    ::ng-deep .text-white-important circle {
      stroke: white !important;
    }
  `]
})
export class CreateThanhToanDialogComponent implements OnInit {
  selectedCustomer: string = '';
  customers: any[] = [];
  filteredCustomers: any[] = [];
  
  ngayThanhToan: Date = new Date();
  totalPaymentAmount: number = 0;
  paymentMethod: string = 'TIEN_MAT';
  commonNote: string = '';
  isAutoAllocate: boolean = true;
  isLoadingOrders: boolean = false;
  
  orders: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['ngaygiao', 'madonhang', 'tongtien', 'dathanhtoan', 'conlai', 'thanhtoan'];
  selection: any = {
    hasValue: () => false,
    isSelected: () => false,
    toggle: () => {},
    clear: () => {}
  };

  isSubmitting = signal(false);

  constructor(
    private graphqlService: GraphqlService,
    private thanhtoanService: ThanhtoanService,
    private dialogRef: MatDialogRef<CreateThanhToanDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    await this.loadCustomers();
    if (this.data?.khachhangId) {
       this.selectedCustomer = this.data.khachhangId;
       await this.onCustomerChange(this.selectedCustomer);
    }
  }

  async loadCustomers() {
    try {
      const result = await this.graphqlService.findAll('khachhang', {
        take: 1000,
        orderBy: { name: 'asc' },
        select: { id: true, name: true, makh: true }
      });
      this.customers = result.data;
      this.filteredCustomers = result.data;
    } catch (e) {
      console.error('Error loading customers', e);
    }
  }

  filterCustomers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCustomers = this.customers.filter(c => 
      c.name.toLowerCase().includes(filterValue) || 
      c.makh.toLowerCase().includes(filterValue)
    );
  }

  updateTotalAmount(value: any) {
    // Convert formatted string back to number
    const numValue = Number(value.toString().replace(/,/g, '').replace(/\./g, ''));
    if (!isNaN(numValue)) {
      this.totalPaymentAmount = numValue;
      this.autoAllocate();
    }
  }

  updateRowAllocation(row: any, value: any) {
    // Convert formatted string back to number
    const numValue = Number(value.toString().replace(/,/g, '').replace(/\./g, ''));
    if (!isNaN(numValue)) {
      this.onAllocationChange(row, numValue);
    }
  }

  async onCustomerChange(khachhangId: string) {
    if (!khachhangId) return;
    this.isLoadingOrders = true;
    try {
      const result = await this.graphqlService.findMany('donhang', {
        where: { 
           khachhangId: khachhangId,
           status: { notIn: ['huy', 'hoanthanh'] }
        },
        orderBy: { ngaygiao: 'asc' },
        select: {
          id: true,
          madonhang: true,
          ngaygiao: true,
          tongtien: true,
          ThanhToan: {
             select: {
                soTien: true,
                trangThai: true
             }
          }
        }
      });

      this.orders = result.map((order: any) => {
         const paid = order.ThanhToan
            ?.filter((t: any) => t.trangThai === 'DA_THANH_TOAN')
            .reduce((sum: number, t: any) => sum + Number(t.soTien), 0) || 0;
         
         const total = Number(order.tongtien);
         const remaining = total - paid;
         
         if (remaining > 1) {
            return {
               id: order.id,
               madonhang: order.madonhang,
               ngaygiao: order.ngaygiao,
               tongtien: total,
               dathanhtoan: paid,
               remaining: remaining,
               allocation: 0
            };
         }
         return null;
      }).filter((o: any) => o !== null);

      this.dataSource.data = this.orders;
      
    } catch (e) {
       console.error('Error loading orders', e);
       this.snackBar.open('Lỗi khi tải danh sách đơn nợ', 'Đóng', { duration: 3000, horizontalPosition: "end", verticalPosition: "top", panelClass: ["snackbar-error"] });
    } finally {
       this.isLoadingOrders = false;
    }
  }

  onAllocationChange(element: any, value: number) {
     let val = value;
     if (val < 0) val = 0;
     if (val > element.remaining) val = element.remaining;
     
     element.allocation = val;
     
     if (!this.isAutoAllocate) {
        // Recalculate total alloc
        const allocated = this.orders.reduce((sum, o) => sum + (o.allocation || 0), 0);
        // We generally separate "Total Payment Input" and "Allocated".
        // If user manually changes row, we don't necessarily change totalAmount immediately
        // BUT for better UX, if auto-allocate is OFF, maybe we should summing up?
        // Let's keep totalPaymentAmount as the driver.
     }
  }

  autoAllocate() {
    if (!this.isAutoAllocate) return;
    
    let remainingMoney = this.totalPaymentAmount;
    
    this.orders.forEach(order => {
       if (remainingMoney <= 0) {
          order.allocation = 0;
       } else {
          const toPay = Math.min(order.remaining, remainingMoney);
          order.allocation = toPay;
          remainingMoney -= toPay;
       }
    });
  }
  
  get totalAllocated() {
     return this.orders.reduce((sum, o) => sum + (Number(o.allocation) || 0), 0);
  }

  getSelectedCount() {
    return this.orders.filter(o => o.allocation > 0).length;
  }

  isAllSelected() { return false; }
  toggleAllRows() {}
  
  close() {
    this.dialogRef.close();
  }

  async submit() {
     if (this.totalAllocated <= 0) {
        this.snackBar.open('Vui lòng phân bổ số tiền', 'Đóng', { duration: 3000, horizontalPosition: "end", verticalPosition: "top", panelClass: ["snackbar-warning"] });
        return;
     }

     this.isSubmitting.set(true);

     const items = this.orders
        .filter(o => o.allocation > 0)
        .map(o => ({
           donhangId: o.id,
           soTien: o.allocation,
           ghichu: this.commonNote
        }));

     const payload: any = {
        items,
        loai: 'KHONG_HOA_DON',
        phuongThuc: this.paymentMethod as any,
        ghichu: this.commonNote,
        ngayThanhToan: moment(this.ngayThanhToan).format('YYYY-MM-DD')
     };

     this.thanhtoanService.createBulk(payload).subscribe({
        next: (res) => {
           this.snackBar.open(`Đã tạo thanh toán cho ${ res.count} đơn hàng`, 'Đóng', { duration: 3000, panelClass: ["snackbar-success"] });
           this.dialogRef.close(true);
        },
        error: (err) => {
           console.error('Error creating payments', err);
           this.snackBar.open('Lỗi khi tạo thanh toán', 'Đóng', { duration: 3000, horizontalPosition: "end", verticalPosition: "top", panelClass: ["snackbar-error"] });
           this.isSubmitting.set(false);
        }
     });
  }
}

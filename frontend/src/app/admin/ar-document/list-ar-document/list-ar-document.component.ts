import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import moment from 'moment';
import { ARDocumentService } from '../ar-document.service';

@Component({
  selector: 'app-list-ar-document',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    RouterModule
  ],
  template: `
    <div class="p-6">
      <div class="flex flex-row justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Quản lý Chứng từ Công nợ (Phải thu Customer)</h1>
        <button mat-flat-button color="primary" routerLink="create">
          <mat-icon>add</mat-icon> Tạo chứng từ mới
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border">
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Trạng thái</mat-label>
          <mat-select [(ngModel)]="filters.status" (selectionChange)="loadData()">
            <mat-option value="">Tất cả</mat-option>
            <mat-option value="MOI">Mới tạo</mat-option>
            <mat-option value="CHO_THU_TIEN">Chờ thu tiền</mat-option>
            <mat-option value="DA_THU_TIEN">Đã thu tiền</mat-option>
            <mat-option value="KHONG_DUYET">Không duyệt</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Từ ngày</mat-label>
          <input matInput [matDatepicker]="picker1" [(ngModel)]="filters.tuNgay" (dateChange)="loadData()">
          <mat-datepicker-toggle matIconSuffix [for]="picker1"></mat-datepicker-toggle>
          <mat-datepicker #picker1></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Đến ngày</mat-label>
          <input matInput [matDatepicker]="picker2" [(ngModel)]="filters.denNgay" (dateChange)="loadData()">
          <mat-datepicker-toggle matIconSuffix [for]="picker2"></mat-datepicker-toggle>
          <mat-datepicker #picker2></mat-datepicker>
        </mat-form-field>
        
        <div class="flex items-center">
            <button mat-stroked-button (click)="resetFilters()">Reset</button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table mat-table [dataSource]="arService.ListARDocuments()" class="w-full">
          <!-- Mã chứng từ -->
          <ng-container matColumnDef="maChungTu">
            <th mat-header-cell *matHeaderCellDef> Mã chứng từ </th>
            <td mat-cell *matCellDef="let row" class="font-medium text-blue-600"> 
               <a [routerLink]="[row.id]">{{row.maChungTu}}</a>
            </td>
          </ng-container>

          <!-- Ngày lập -->
          <ng-container matColumnDef="ngayLap">
            <th mat-header-cell *matHeaderCellDef> Ngày lập </th>
            <td mat-cell *matCellDef="let row"> {{row.ngayLap | date:'dd/MM/yyyy'}} </td>
          </ng-container>

          <!-- Tổng tiền -->
          <ng-container matColumnDef="totalAmount">
            <th mat-header-cell *matHeaderCellDef class="text-right"> Tổng tiền </th>
            <td mat-cell *matCellDef="let row" class="text-right font-bold text-green-600"> {{row.totalAmount | number}} </td>
          </ng-container>

          <!-- Trạng thái -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef> Trạng thái </th>
            <td mat-cell *matCellDef="let row"> 
               <span class="px-2 py-1 rounded text-xs font-bold uppercase"
                     [ngClass]="{
                       'bg-gray-100 text-gray-600': row.status === 'MOI',
                       'bg-blue-100 text-blue-600': row.status === 'CHO_THU_TIEN',
                       'bg-green-100 text-green-600': row.status === 'DA_THU_TIEN',
                       'bg-red-100 text-red-600': row.status === 'KHONG_DUYET'
                     }">
                 {{row.status}}
               </span>
            </td>
          </ng-container>

          <!-- Thao tác -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Thao tác </th>
            <td mat-cell *matCellDef="let row">
              <button mat-icon-button color="primary" [routerLink]="[row.id]">
                <mat-icon>visibility</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell p-8 text-center" colspan="5">
              Không tìm thấy chứng từ nào
            </td>
          </tr>
        </table>
      </div>
    </div>
  `
})
export class ListARDocumentComponent implements OnInit {
  arService = inject(ARDocumentService);
  snackBar = inject(MatSnackBar);

  filters = {
    status: '',
    tuNgay: null,
    denNgay: null
  };

  displayedColumns: string[] = ['maChungTu', 'ngayLap', 'totalAmount', 'status', 'actions'];

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      const params = {
        ...this.filters,
        tuNgay: this.filters.tuNgay ? moment(this.filters.tuNgay).toISOString() : undefined,
        denNgay: this.filters.denNgay ? moment(this.filters.denNgay).toISOString() : undefined
      };
      await this.arService.findAll(params);
    } catch (error) {
      this.snackBar.open('Lỗi khi tải dữ liệu', '', { duration: 3000 });
    }
  }

  resetFilters() {
    this.filters = {
      status: '',
      tuNgay: null,
      denNgay: null
    };
    this.loadData();
  }
}

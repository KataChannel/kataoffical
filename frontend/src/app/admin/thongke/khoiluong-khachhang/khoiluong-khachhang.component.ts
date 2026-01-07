import { Component, OnInit, signal, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { ThongkeKhoiluongService, KhoiluongSanpham } from '../thongke-khoiluong.service';
import { GraphqlService } from '../../../shared/services/graphql.service';
import { TimezoneService } from '../../../shared/services/timezone.service';
import moment from 'moment';
import { writeExcelFile } from '../../../shared/utils/exceldrive.utils';

@Component({
  selector: 'app-khoiluong-khachhang',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  template: `
    <div class="min-h-screen bg-slate-50/50 p-6">
      <div class="max-w-7xl mx-auto space-y-6">
        
        <!-- Header - Shadcn Style -->
        <div class="space-y-1">
          <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
            Thống Kê Khối Lượng Sản Phẩm
          </h1>
          <p class="text-sm text-slate-500">
            Thống kê tổng khối lượng sản phẩm đã bán cho khách hàng theo khoảng thời gian
          </p>
        </div>

        <!-- Filter Card - Shadcn Style -->
        <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              
              <!-- Chọn khách hàng -->
              <div class="md:col-span-4">
                <label class="text-sm font-medium text-slate-700 mb-1.5 block">Khách hàng</label>
                <div class="relative">
                  <input
                    type="text"
                    #khachhangInput
                    [(ngModel)]="searchKhachhang"
                    (input)="filterKhachhang()"
                    (focus)="onFocusKhachhang()"
                    [matAutocomplete]="autoKhachhang"
                    #trigger="matAutocompleteTrigger"
                    placeholder="Tìm kiếm khách hàng..."
                    class="w-full h-10 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                           placeholder:text-slate-400 transition-all"
                  />
                  <mat-autocomplete
                    #autoKhachhang="matAutocomplete"
                    (optionSelected)="onKhachhangSelected($event)"
                    [displayWith]="displayKhachhang"
                    class="shadcn-autocomplete"
                  >
                    @for (kh of filteredKhachhang(); track kh.id) {
                      <mat-option [value]="kh" class="!py-2">
                        <div class="flex flex-col">
                          <span class="text-sm font-medium text-slate-900">{{ kh.name }}</span>
                          <span class="text-xs text-slate-500">{{ kh.makh }} • {{ kh.loaikh === 'khachsi' ? 'Khách sỉ' : 'Khách lẻ' }}</span>
                        </div>
                      </mat-option>
                    }
                    @empty {
                      <mat-option disabled class="!py-2 !text-slate-400">
                        Không tìm thấy khách hàng
                      </mat-option>
                    }
                  </mat-autocomplete>
                </div>
              </div>

              <!-- Từ ngày -->
              <div class="md:col-span-2">
                <label class="text-sm font-medium text-slate-700 mb-1.5 block">Từ ngày</label>
                <div class="relative">
                  <input
                    [matDatepicker]="pickerBatdau"
                    [(ngModel)]="batdau"
                    placeholder="dd/mm/yyyy"
                    class="w-full h-10 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                           placeholder:text-slate-400 transition-all"
                  />
                  <mat-datepicker-toggle [for]="pickerBatdau" class="absolute right-1 top-1/2 -translate-y-1/2 scale-75 opacity-60">
                  </mat-datepicker-toggle>
                  <mat-datepicker #pickerBatdau></mat-datepicker>
                </div>
              </div>

              <!-- Đến ngày -->
              <div class="md:col-span-2">
                <label class="text-sm font-medium text-slate-700 mb-1.5 block">Đến ngày</label>
                <div class="relative">
                  <input
                    [matDatepicker]="pickerKetthuc"
                    [(ngModel)]="ketthuc"
                    placeholder="dd/mm/yyyy"
                    class="w-full h-10 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                           placeholder:text-slate-400 transition-all"
                  />
                  <mat-datepicker-toggle [for]="pickerKetthuc" class="absolute right-1 top-1/2 -translate-y-1/2 scale-75 opacity-60">
                  </mat-datepicker-toggle>
                  <mat-datepicker #pickerKetthuc></mat-datepicker>
                </div>
              </div>

              <!-- Quick Date -->
              <div class="md:col-span-2">
                <label class="text-sm font-medium text-slate-700 mb-1.5 block">Chọn nhanh</label>
                <button
                  [matMenuTriggerFor]="quickDateMenu"
                  class="w-full h-10 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white
                         hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <span class="text-slate-600">Khoảng thời gian</span>
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <mat-menu #quickDateMenu="matMenu" class="shadcn-menu">
                  <button mat-menu-item (click)="setToday()" class="!text-sm">Hôm nay</button>
                  <button mat-menu-item (click)="setYesterday()" class="!text-sm">Hôm qua</button>
                  <button mat-menu-item (click)="setThisWeek()" class="!text-sm">Tuần này</button>
                  <button mat-menu-item (click)="setLastWeek()" class="!text-sm">Tuần trước</button>
                  <button mat-menu-item (click)="setThisMonth()" class="!text-sm">Tháng này</button>
                  <button mat-menu-item (click)="setLastMonth()" class="!text-sm">Tháng trước</button>
                  <button mat-menu-item (click)="setThisQuarter()" class="!text-sm">Quý này</button>
                  <button mat-menu-item (click)="setThisYear()" class="!text-sm">Năm nay</button>
                </mat-menu>
              </div>

              <!-- Nút thống kê -->
              <div class="md:col-span-2">
                <label class="text-sm font-medium text-slate-700 mb-1.5 block opacity-0">Action</label>
                <button
                  (click)="thongke()"
                  [disabled]="!selectedKhachhang || isLoading()"
                  class="w-full h-10 px-4 text-sm font-medium text-white bg-slate-900 rounded-lg
                         hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors flex items-center justify-center gap-2"
                >
                  @if (isLoading()) {
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang tải...</span>
                  } @else {
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    <span>Thống kê</span>
                  }
                </button>
              </div>
            </div>

            <!-- Selected Customer Badge -->
            @if (selectedKhachhang) {
              <div class="flex items-center gap-2 p-3 rounded-lg bg-slate-100 border border-slate-200">
                <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-slate-900">{{ selectedKhachhang.name }}</p>
                  <p class="text-xs text-slate-500">{{ selectedKhachhang.makh }}</p>
                </div>
                <button
                  (click)="clearKhachhang()"
                  class="p-1.5 rounded-md hover:bg-slate-200 transition-colors"
                >
                  <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            }
          </div>
        </div>

        <!-- Result Section -->
        @if (result()) {
          <!-- Stats Cards - Shadcn Style -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Tổng đơn hàng -->
            <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-lg bg-blue-50">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-slate-500">Tổng đơn hàng</p>
                  <p class="text-2xl font-semibold text-slate-900">{{ result()!.tongDonhang | number }}</p>
                </div>
              </div>
            </div>

            <!-- Tổng sản phẩm -->
            <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-lg bg-emerald-50">
                  <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-slate-500">Tổng sản phẩm</p>
                  <p class="text-2xl font-semibold text-slate-900">{{ result()!.tongSanpham | number }}</p>
                </div>
              </div>
            </div>

            <!-- Tổng giá trị -->
            <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-lg bg-violet-50">
                  <svg class="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-slate-500">Tổng giá trị</p>
                  <p class="text-2xl font-semibold text-slate-900">{{ result()!.tongGiaTri | number:'1.0-0' }}đ</p>
                </div>
              </div>
            </div>

            <!-- Khoảng thời gian -->
            <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-lg bg-amber-50">
                  <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-slate-500">Khoảng thời gian</p>
                  <p class="text-lg font-semibold text-slate-900">{{ result()!.batdau }} - {{ result()!.ketthuc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Data Table Card -->
          <div class="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <!-- Table Header -->
            <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Chi tiết khối lượng sản phẩm</h2>
                <p class="text-sm text-slate-500">Danh sách sản phẩm đã mua trong khoảng thời gian</p>
              </div>
              <div class="flex items-center gap-3">
                <!-- Search -->
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input
                    type="text"
                    [(ngModel)]="searchText"
                    (input)="applyFilter()"
                    placeholder="Tìm kiếm sản phẩm..."
                    class="w-64 h-9 pl-9 pr-3 text-sm border border-slate-200 rounded-lg bg-white
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                           placeholder:text-slate-400 transition-all"
                  />
                </div>
                <!-- Export Button -->
                <button
                  (click)="exportExcel()"
                  [disabled]="!result() || result()!.chiTietSanpham.length === 0"
                  class="h-9 px-4 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg
                         hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Export Excel
                </button>
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table mat-table [dataSource]="dataSource" matSort class="w-full">
                <!-- STT Column -->
                <ng-container matColumnDef="stt">
                  <th mat-header-cell *matHeaderCellDef class="!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4">STT</th>
                  <td mat-cell *matCellDef="let row; let i = index" class="!py-3 !px-4 text-sm text-slate-600">{{ i + 1 }}</td>
                </ng-container>

                <!-- Mã SP Column -->
                <ng-container matColumnDef="masp">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header class="!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4">Mã SP</th>
                  <td mat-cell *matCellDef="let row" class="!py-3 !px-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800">
                      {{ row.masp }}
                    </span>
                  </td>
                </ng-container>

                <!-- Tên SP Column -->
                <ng-container matColumnDef="title">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header class="!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4 !min-w-[200px]">Tên sản phẩm</th>
                  <td mat-cell *matCellDef="let row" class="!py-3 !px-4">
                    <span class="text-sm font-medium text-slate-900 line-clamp-2" [matTooltip]="row.title">{{ row.title }}</span>
                  </td>
                </ng-container>

                <!-- ĐVT Column -->
                <ng-container matColumnDef="dvt">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header class="!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4">ĐVT</th>
                  <td mat-cell *matCellDef="let row" class="!py-3 !px-4 text-sm text-slate-600">{{ row.dvt }}</td>
                </ng-container>

                <!-- Giá Sản Phẩm Column (Giá từ đơn hàng mới nhất) -->
                <ng-container matColumnDef="giaSanpham">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header class="!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4 !text-right">Giá SP</th>
                  <td mat-cell *matCellDef="let row" class="!py-3 !px-4 text-right">
                    <span class="text-sm font-semibold text-amber-600">{{ row.giaSanpham | number:'1.0-0' }}đ</span>
                  </td>
                </ng-container>

                <!-- Tổng Khối Lượng Column (SL Nhận cộng dồn) -->
                <ng-container matColumnDef="tongSoluongNhan">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header class="!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4 !text-right">Tổng Khối Lượng</th>
                  <td mat-cell *matCellDef="let row" class="!py-3 !px-4 text-right">
                    <span class="text-sm font-semibold text-violet-600">{{ row.tongSoluongNhan | number:'1.0-2' }}</span>
                  </td>
                </ng-container>

                <!-- Giá trị Column -->
                <ng-container matColumnDef="tongGiaTri">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header class="!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4 !text-right">Giá trị</th>
                  <td mat-cell *matCellDef="let row" class="!py-3 !px-4 text-right">
                    <span class="text-sm font-semibold text-emerald-600">{{ row.tongGiaTri | number:'1.0-0' }}đ</span>
                  </td>
                </ng-container>

                <!-- Số lần mua Column -->
                <ng-container matColumnDef="soLanMua">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header class="!bg-slate-50 !text-slate-600 !text-xs !font-medium !uppercase tracking-wider !py-3 !px-4 !text-center">Số lần mua</th>
                  <td mat-cell *matCellDef="let row" class="!py-3 !px-4 text-center">
                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold bg-slate-900 text-white">
                      {{ row.soLanMua }}
                    </span>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns" class="hover:bg-slate-50 transition-colors"></tr>

                <!-- No Data Row -->
                <tr class="mat-row" *matNoDataRow>
                  <td class="mat-cell !py-12 text-center text-slate-500" [attr.colspan]="displayedColumns.length">
                    <div class="flex flex-col items-center gap-2">
                      <svg class="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <p class="text-sm">Không tìm thấy dữ liệu</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Pagination -->
            <div class="border-t border-slate-200">
              <mat-paginator
                [pageSizeOptions]="[10, 25, 50, 100]"
                [pageSize]="25"
                showFirstLastButtons
                class="!border-0"
              ></mat-paginator>
            </div>
          </div>

          <!-- Summary Footer -->
          <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div class="grid grid-cols-2 gap-4 text-center">
              <div class="p-3 rounded-lg bg-violet-50">
                <p class="text-xs text-violet-600 mb-1">Tổng Khối Lượng (SL Nhận)</p>
                <p class="text-lg font-bold text-violet-700">{{ getTotalNhan() | number:'1.0-2' }}</p>
              </div>
              <div class="p-3 rounded-lg bg-emerald-50">
                <p class="text-xs text-emerald-600 mb-1">Tổng Giá Trị</p>
                <p class="text-lg font-bold text-emerald-700">{{ getTotalGiaTri() | number:'1.0-0' }}đ</p>
              </div>
            </div>
          </div>
        }

        <!-- Empty State -->
        @if (!result() && !isLoading() && !error()) {
          <div class="rounded-xl border border-slate-200 bg-white p-12 shadow-sm">
            <div class="flex flex-col items-center text-center">
              <div class="p-4 rounded-full bg-slate-100 mb-4">
                <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-slate-900 mb-1">Chưa có dữ liệu thống kê</h3>
              <p class="text-sm text-slate-500 max-w-sm">
                Vui lòng chọn khách hàng và khoảng thời gian để xem thống kê khối lượng sản phẩm
              </p>
            </div>
          </div>
        }

        <!-- Error State -->
        @if (error()) {
          <div class="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <div class="flex items-start gap-4">
              <div class="p-2 rounded-full bg-red-100">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-sm font-semibold text-red-800 mb-1">Có lỗi xảy ra</h3>
                <p class="text-sm text-red-600">{{ error() }}</p>
              </div>
              <button
                (click)="thongke()"
                class="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        }

        <!-- Loading Overlay -->
        @if (isLoading()) {
          <div class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="rounded-xl bg-white p-6 shadow-xl flex flex-col items-center gap-4">
              <svg class="animate-spin h-8 w-8 text-slate-900" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-sm font-medium text-slate-700">Đang tải dữ liệu thống kê...</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    /* Override Material table styles for Shadcn look */
    ::ng-deep .mat-mdc-table {
      background: transparent !important;
    }
    
    ::ng-deep .mat-mdc-header-row {
      background: transparent !important;
    }
    
    ::ng-deep .mat-mdc-row:hover {
      background-color: rgb(248 250 252) !important;
    }
    
    ::ng-deep .mat-mdc-paginator {
      background: transparent !important;
    }
    
    /* Shadcn-like autocomplete dropdown */
    ::ng-deep .mat-mdc-autocomplete-panel {
      border-radius: 0.5rem !important;
      border: 1px solid rgb(226 232 240) !important;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
    }
    
    ::ng-deep .mat-mdc-option {
      font-size: 0.875rem !important;
    }
    
    ::ng-deep .mat-mdc-menu-panel {
      border-radius: 0.5rem !important;
      border: 1px solid rgb(226 232 240) !important;
    }
    
    ::ng-deep .mat-mdc-menu-item {
      font-size: 0.875rem !important;
      min-height: 36px !important;
    }
  `]
})
export class KhoiluongKhachhangComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('trigger') autocompleteTrigger!: MatAutocompleteTrigger;
  @ViewChild('khachhangInput') khachhangInput!: ElementRef<HTMLInputElement>;

  // Data
  listKhachhang = signal<any[]>([]);
  filteredKhachhang = signal<any[]>([]);
  selectedKhachhang: any = null;
  searchKhachhang = '';
  
  // Date range
  batdau: Date = new Date();
  ketthuc: Date = new Date();
  
  // Search
  searchText = '';
  
  // Table - Columns: STT, Mã SP, Tên SP, ĐVT, Giá SP, Tổng Khối Lượng
  displayedColumns = ['stt', 'masp', 'title', 'dvt', 'giaSanpham', 'tongSoluongNhan'];
  dataSource = new MatTableDataSource<KhoiluongSanpham>([]);

  // Service signals
  result!: ReturnType<ThongkeKhoiluongService['result']['asReadonly']>;
  isLoading!: ReturnType<ThongkeKhoiluongService['isLoading']['asReadonly']>;
  error!: ReturnType<ThongkeKhoiluongService['error']['asReadonly']>;

  constructor(
    private thongkeService: ThongkeKhoiluongService,
    private graphqlService: GraphqlService,
    private timezoneService: TimezoneService,
    private snackBar: MatSnackBar
  ) {
    // Initialize signals from service
    this.result = this.thongkeService.result;
    this.isLoading = this.thongkeService.isLoading;
    this.error = this.thongkeService.error;
    
    // Set default date range to this month
    this.setThisMonth();
  }

  async ngOnInit() {
    // Load danh sách khách hàng bằng GraphQL
    console.log('🔄 Loading khách hàng...');
    try {
      const response = await this.graphqlService.findAll('khachhang', {
        enableParallelFetch: true,
        take: 999999,
        aggressiveCache: true,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          makh: true,
          name: true,
          tenfile: true,
          loaikh: true,
          diachi: true,
          sdt: true,
          isActive: true,
        },
      });
      console.log('📦 Khách hàng loaded:', response.data?.length, response.data);
      if (response.data && response.data.length > 0) {
        this.listKhachhang.set(response.data.filter((kh: any) => kh.isActive !== false));
        this.filteredKhachhang.set(this.listKhachhang());
      }
      console.log('✅ filteredKhachhang:', this.filteredKhachhang().length);
    } catch (error) {
      console.error('❌ Error loading khách hàng:', error);
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Filter khách hàng
  filterKhachhang() {
    const search = this.searchKhachhang.toLowerCase().trim();
    if (!search) {
      this.filteredKhachhang.set(this.listKhachhang());
      return;
    }
    
    const filtered = this.listKhachhang().filter(kh => 
      (kh.name?.toLowerCase().includes(search)) ||
      (kh.makh?.toLowerCase().includes(search)) ||
      (kh.tenfile?.toLowerCase().includes(search))
    );
    this.filteredKhachhang.set(filtered);
  }

  // Focus khách hàng - hiển thị tất cả options khi focus
  onFocusKhachhang() {
    console.log('🔍 Focus vào input khách hàng');
    console.log('📋 listKhachhang:', this.listKhachhang().length);
    // Hiển thị tất cả khách hàng khi focus
    this.filteredKhachhang.set(this.listKhachhang());
    console.log('📋 filteredKhachhang set:', this.filteredKhachhang().length);
    // Mở panel autocomplete
    setTimeout(() => {
      console.log('⏰ Trigger openPanel, autocompleteTrigger:', !!this.autocompleteTrigger);
      if (this.autocompleteTrigger) {
        this.autocompleteTrigger.openPanel();
      }
    }, 150);
  }

  // Select khách hàng
  onKhachhangSelected(event: any) {
    this.selectedKhachhang = event.option.value;
    this.searchKhachhang = this.selectedKhachhang.name;
  }

  // Display function for autocomplete
  displayKhachhang(kh: any): string {
    return kh?.name || '';
  }

  // Clear selected khách hàng
  clearKhachhang() {
    this.selectedKhachhang = null;
    this.searchKhachhang = '';
    this.thongkeService.reset();
    this.dataSource.data = [];
  }

  // Thống kê
  async thongke() {
    if (!this.selectedKhachhang) {
      this.snackBar.open('Vui lòng chọn khách hàng', 'Đóng', { duration: 3000, panelClass: ["snackbar-warning"] });
      return;
    }

    if (!this.batdau || !this.ketthuc) {
      this.snackBar.open('Vui lòng chọn khoảng thời gian', 'Đóng', { duration: 3000, panelClass: ["snackbar-warning"] });
      return;
    }

    if (this.batdau > this.ketthuc) {
      this.snackBar.open('Ngày bắt đầu không thể sau ngày kết thúc', 'Đóng', { duration: 3000, panelClass: ["snackbar-error"] });
      return;
    }

    console.log('📊 Bắt đầu thống kê với params:', {
      khachhangId: this.selectedKhachhang.id,
      batdau: this.batdau,
      ketthuc: this.ketthuc
    });

    const result = await this.thongkeService.thongkeKhoiluongByKhachhang(
      this.selectedKhachhang.id,
      this.batdau,
      this.ketthuc
    );

    console.log('📊 Kết quả thống kê:', result);

    if (result) {
      this.dataSource.data = result.chiTietSanpham;
      this.snackBar.open(`Thống kê thành công: ${result.tongSanpham} sản phẩm, ${result.tongDonhang} đơn hàng`, 'OK', {
        panelClass: 'snackbar-success',
        duration: 3000 });
    }
  }

  // Apply filter
  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  // Export Excel
  exportExcel() {
    const result = this.result();
    if (!result || result.chiTietSanpham.length === 0) {
      this.snackBar.open('Không có dữ liệu để xuất', 'Đóng', { 
        panelClass: 'snackbar-error',
        duration: 3000 });
      return;
    }

    const exportData = this.thongkeService.exportToExcel(result);
    const headers = {
      STT: 'STT',
      'Mã SP': 'Mã SP',
      'Tên sản phẩm': 'Tên sản phẩm',
      'ĐVT': 'ĐVT',
      'Giá SP (VNĐ)': 'Giá SP (VNĐ)',
      'Tổng Khối Lượng': 'Tổng Khối Lượng',
      'Giá trị (VNĐ)': 'Giá trị (VNĐ)',
      'Số lần mua': 'Số lần mua'
    };

    const fileName = `ThongKe_KhoiLuong_${result.makh}_${moment(this.batdau).format('DDMMYYYY')}_${moment(this.ketthuc).format('DDMMYYYY')}`;
    
    writeExcelFile(exportData, fileName, Object.values(headers), headers);
    this.snackBar.open('Xuất Excel thành công!', 'OK', { duration: 3000, panelClass: ["snackbar-success"] });
  }

  // Quick date selections
  setToday() {
    this.batdau = new Date();
    this.ketthuc = new Date();
  }

  setYesterday() {
    const yesterday = moment().subtract(1, 'day');
    this.batdau = yesterday.toDate();
    this.ketthuc = yesterday.toDate();
  }

  setThisWeek() {
    this.batdau = moment().startOf('week').toDate();
    this.ketthuc = moment().endOf('week').toDate();
  }

  setLastWeek() {
    this.batdau = moment().subtract(1, 'week').startOf('week').toDate();
    this.ketthuc = moment().subtract(1, 'week').endOf('week').toDate();
  }

  setThisMonth() {
    this.batdau = moment().startOf('month').toDate();
    this.ketthuc = moment().endOf('month').toDate();
  }

  setLastMonth() {
    this.batdau = moment().subtract(1, 'month').startOf('month').toDate();
    this.ketthuc = moment().subtract(1, 'month').endOf('month').toDate();
  }

  setThisQuarter() {
    this.batdau = moment().startOf('quarter').toDate();
    this.ketthuc = moment().endOf('quarter').toDate();
  }

  setThisYear() {
    this.batdau = moment().startOf('year').toDate();
    this.ketthuc = moment().endOf('year').toDate();
  }

  // Totals
  getTotalDat(): number {
    const result = this.result();
    return result ? result.chiTietSanpham.reduce((sum, sp) => sum + sp.tongSoluongDat, 0) : 0;
  }

  getTotalGiao(): number {
    const result = this.result();
    return result ? result.chiTietSanpham.reduce((sum, sp) => sum + sp.tongSoluongGiao, 0) : 0;
  }

  getTotalNhan(): number {
    const result = this.result();
    return result ? result.chiTietSanpham.reduce((sum, sp) => sum + sp.tongSoluongNhan, 0) : 0;
  }

  getTotalGiaTri(): number {
    const result = this.result();
    return result ? result.chiTietSanpham.reduce((sum, sp) => sum + sp.tongGiaTri, 0) : 0;
  }
}

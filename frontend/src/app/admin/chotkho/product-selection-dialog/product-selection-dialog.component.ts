import { Component, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';

import { ChotkhoService, KhoInterface, SanphamInterface } from '../chotkho.service';

export interface ProductSelectionData {
  selectedWarehouseId?: string;
}

export interface ProductSelectionResult {
  warehouse: KhoInterface;
  selectedProducts: SanphamInterface[];
}

@Component({
  selector: 'app-product-selection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="product-selection-dialog">
      <h2 mat-dialog-title>Chọn Sản Phẩm Kiểm Kho</h2>
      
      <mat-dialog-content class="dialog-content">
        <!-- Warehouse Selection -->
        <div class="warehouse-section">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Chọn Kho</mat-label>
            <mat-select 
              [(value)]="selectedWarehouseId" 
              (selectionChange)="onWarehouseChange()"
              [disabled]="isLoadingWarehouses()">
              <mat-option *ngFor="let warehouse of warehouses()" [value]="warehouse.id">
                {{ warehouse.name }} - {{ warehouse.diachi }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <!-- Search Products -->
        <div class="search-section" *ngIf="selectedWarehouseId">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Tìm kiếm sản phẩm</mat-label>
            <input 
              matInput 
              [(ngModel)]="searchTerm" 
              (input)="onSearchChange()"
              placeholder="Tìm theo mã hoặc tên sản phẩm...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
        </div>

        <!-- Loading Spinner -->
        <div class="loading-section" *ngIf="isLoadingProducts()">
          <mat-spinner diameter="40"></mat-spinner>
          <p>Đang tải danh sách sản phẩm...</p>
        </div>

        <!-- Products Table -->
        <div class="products-section" *ngIf="!isLoadingProducts() && filteredProducts().length > 0">
          <table mat-table [dataSource]="filteredProducts()" class="products-table">
            <!-- Checkbox Column -->
            <ng-container matColumnDef="select">
              <th mat-header-cell *matHeaderCellDef>
                <mat-checkbox 
                  (change)="toggleAllSelection($event.checked)"
                  [checked]="selection.hasValue() && isAllSelected()"
                  [indeterminate]="selection.hasValue() && !isAllSelected()">
                </mat-checkbox>
              </th>
              <td mat-cell *matCellDef="let product">
                <mat-checkbox 
                  (click)="$event.stopPropagation()"
                  (change)="toggleSelection(product)"
                  [checked]="selection.isSelected(product)">
                </mat-checkbox>
              </td>
            </ng-container>

            <!-- Product Code Column -->
            <ng-container matColumnDef="masp">
              <th mat-header-cell *matHeaderCellDef>Mã SP</th>
              <td mat-cell *matCellDef="let product">{{ product.masp }}</td>
            </ng-container>

            <!-- Product Name Column -->
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Tên Sản Phẩm</th>
              <td mat-cell *matCellDef="let product">{{ product.title }}</td>
            </ng-container>

            <!-- Unit Column -->
            <ng-container matColumnDef="dvt">
              <th mat-header-cell *matHeaderCellDef>Đơn Vị</th>
              <td mat-cell *matCellDef="let product">{{ product.dvt || '-' }}</td>
            </ng-container>

            <!-- Stock Quantity Column -->
            <ng-container matColumnDef="tonkho">
              <th mat-header-cell *matHeaderCellDef>Tồn Kho</th>
              <td mat-cell *matCellDef="let product">
                <span class="stock-info">
                  <strong>{{ product.tonkho?.slton || 0 }}</strong>
                  <br>
                  <small class="text-muted">Thực tế: {{ product.tonkho?.sltinhthucte || 0 }}</small>
                </span>
              </td>
            </ng-container>

            <!-- Price Column -->
            <ng-container matColumnDef="dongia">
              <th mat-header-cell *matHeaderCellDef>Đơn Giá</th>
              <td mat-cell *matCellDef="let product">
                {{ (product.dongia || 0) | currency:'VND':'symbol':'1.0-0' }}
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr 
              mat-row 
              *matRowDef="let product; columns: displayedColumns;"
              (click)="toggleSelection(product)"
              [class.selected]="selection.isSelected(product)">
            </tr>
          </table>
        </div>

        <!-- No Products Message -->
        <div class="no-products" *ngIf="!isLoadingProducts() && selectedWarehouseId && filteredProducts().length === 0">
          <mat-icon>inventory_2</mat-icon>
          <p>{{ products().length === 0 ? 'Không có sản phẩm nào trong kho này.' : 'Không tìm thấy sản phẩm phù hợp.' }}</p>
        </div>

        <!-- Selection Summary -->
        <div class="selection-summary" *ngIf="selection.hasValue()">
          <mat-icon>shopping_cart</mat-icon>
          <span>Đã chọn {{ selection.selected.length }} sản phẩm</span>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Hủy</button>
        <button 
          mat-raised-button 
          color="primary" 
          (click)="onConfirm()"
          [disabled]="!canConfirm()">
          Xác Nhận ({{ selection.selected.length }})
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./product-selection-dialog.component.scss']
})
export class ProductSelectionDialogComponent implements OnInit {
  warehouses: WritableSignal<KhoInterface[]> = signal([]);
  products: WritableSignal<SanphamInterface[]> = signal([]);
  filteredProducts: WritableSignal<SanphamInterface[]> = signal([]);
  isLoadingWarehouses: WritableSignal<boolean> = signal(false);
  isLoadingProducts: WritableSignal<boolean> = signal(false);
  
  selectedWarehouseId: string = '';
  searchTerm: string = '';
  selection = new SelectionModel<SanphamInterface>(true, []);
  
  displayedColumns: string[] = ['select', 'masp', 'title', 'dvt', 'tonkho', 'dongia'];

  constructor(
    private chotkhoService: ChotkhoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProductSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSelectionData
  ) {
    if (data?.selectedWarehouseId) {
      this.selectedWarehouseId = data.selectedWarehouseId;
    }
  }

  async ngOnInit() {
    await this.loadWarehouses();
    if (this.selectedWarehouseId) {
      await this.loadProducts();
    }
  }

  async loadWarehouses() {
    try {
      this.isLoadingWarehouses.set(true);
      const warehouses = await this.chotkhoService.getAllWarehouses();
      this.warehouses.set(warehouses);
    } catch (error) {
      console.error('Error loading warehouses:', error);
      this.snackBar.open('Lỗi khi tải danh sách kho', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoadingWarehouses.set(false);
    }
  }

  async onWarehouseChange() {
    if (this.selectedWarehouseId) {
      this.selection.clear();
      await this.loadProducts();
    } else {
      this.products.set([]);
      this.filteredProducts.set([]);
    }
  }

  async loadProducts() {
    if (!this.selectedWarehouseId) return;

    try {
      this.isLoadingProducts.set(true);
      const products = await this.chotkhoService.getProductsByWarehouse(this.selectedWarehouseId);
      this.products.set(products);
      this.filteredProducts.set(products);
    } catch (error) {
      console.error('Error loading products:', error);
      this.snackBar.open('Lỗi khi tải danh sách sản phẩm', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoadingProducts.set(false);
    }
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredProducts.set(this.products());
      return;
    }

    const filtered = this.products().filter(product =>
      product.masp.toLowerCase().includes(term) ||
      product.title.toLowerCase().includes(term)
    );
    this.filteredProducts.set(filtered);
  }

  toggleSelection(product: SanphamInterface) {
    this.selection.toggle(product);
  }

  toggleAllSelection(selectAll: boolean) {
    if (selectAll) {
      this.selection.select(...this.filteredProducts());
    } else {
      this.selection.clear();
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredProducts().length;
    return numSelected === numRows && numRows > 0;
  }

  canConfirm(): boolean {
    return !!this.selectedWarehouseId && this.selection.hasValue();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (!this.canConfirm()) return;

    const selectedWarehouse = this.warehouses().find(w => w.id === this.selectedWarehouseId);
    if (!selectedWarehouse) {
      this.snackBar.open('Không tìm thấy thông tin kho', 'Đóng', { duration: 3000 });
      return;
    }

    const result: ProductSelectionResult = {
      warehouse: selectedWarehouse,
      selectedProducts: [...this.selection.selected]
    };

    this.dialogRef.close(result);
  }
}
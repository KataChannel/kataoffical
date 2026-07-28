// Demo component minh họa cách sử dụng Import Confirmation Dialog
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportConfirmationDialogComponent, ImportConfirmationData } from './import-confirmation-dialog.component';

// Service utility mẫu
class DemoImportValidationService {
  static checkDuplicates(newData: any[], existingData: any[], keyField: string): any[] {
    const existingKeys = new Set(existingData.map(item => item[keyField]));
    return newData.filter(item => existingKeys.has(item[keyField]));
  }

  static prepareData(data: any[], existingData: any[], keyField: string, overwrite: boolean) {
    if (overwrite) {
      return data; // Trả về tất cả để ghi đè
    } else {
      // Chỉ trả về dữ liệu mới (không trùng lặp)
      const existingKeys = new Set(existingData.map(item => item[keyField]));
      return data.filter(item => !existingKeys.has(item[keyField]));
    }
  }
}

@Component({
  selector: 'app-demo-import',
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">Demo Import với xác nhận ghi đè</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Demo 1: Không có trùng lặp -->
        <div class="border p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Scenario 1: Không có trùng lặp</h3>
          <button (click)="demoNoConflict()" 
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Import 5 sản phẩm mới
          </button>
        </div>

        <!-- Demo 2: Có trùng lặp -->
        <div class="border p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Scenario 2: Có trùng lặp</h3>
          <button (click)="demoWithConflict()" 
                  class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Import với 3 mục trùng lặp
          </button>
        </div>

        <!-- Demo 3: Khách hàng -->
        <div class="border p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Scenario 3: Import khách hàng</h3>
          <button (click)="demoCustomerImport()" 
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Import khách hàng
          </button>
        </div>

        <!-- Demo 4: Nhà cung cấp -->
        <div class="border p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Scenario 4: Import nhà cung cấp</h3>
          <button (click)="demoSupplierImport()" 
                  class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Import nhà cung cấp
          </button>
        </div>
      </div>

      <!-- Data hiển thị -->
      <div class="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 class="font-semibold mb-2">Dữ liệu hiện tại:</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Sản phẩm ({{ existingProducts.length }}):</strong>
            <ul class="list-disc list-inside">
              <li *ngFor="let item of existingProducts.slice(0,3)">{{ item.masp }} - {{ item.title }}</li>
              <li *ngIf="existingProducts.length > 3">... và {{ existingProducts.length - 3 }} mục khác</li>
            </ul>
          </div>
          <div>
            <strong>Khách hàng ({{ existingCustomers.length }}):</strong>
            <ul class="list-disc list-inside">
              <li *ngFor="let item of existingCustomers.slice(0,3)">{{ item.makh }} - {{ item.name }}</li>
              <li *ngIf="existingCustomers.length > 3">... và {{ existingCustomers.length - 3 }} mục khác</li>
            </ul>
          </div>
          <div>
            <strong>Nhà cung cấp ({{ existingSuppliers.length }}):</strong>
            <ul class="list-disc list-inside">
              <li *ngFor="let item of existingSuppliers.slice(0,3)">{{ item.mancc }} - {{ item.name }}</li>
              <li *ngIf="existingSuppliers.length > 3">... và {{ existingSuppliers.length - 3 }} mục khác</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: []
})
export class DemoImportComponent {
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  // Dữ liệu mẫu
  existingProducts = [
    { masp: 'SP001', title: 'Sản phẩm 1' },
    { masp: 'SP002', title: 'Sản phẩm 2' },
    { masp: 'SP003', title: 'Sản phẩm 3' },
  ];

  existingCustomers = [
    { makh: 'KH001', name: 'Khách hàng A' },
    { makh: 'KH002', name: 'Khách hàng B' },
  ];

  existingSuppliers = [
    { mancc: 'NCC001', name: 'Nhà cung cấp X' },
    { mancc: 'NCC002', name: 'Nhà cung cấp Y' },
  ];

  // Demo 1: Không có trùng lặp
  async demoNoConflict() {
    const newProducts = [
      { masp: 'SP004', title: 'Sản phẩm 4' },
      { masp: 'SP005', title: 'Sản phẩm 5' },
      { masp: 'SP006', title: 'Sản phẩm 6' },
      { masp: 'SP007', title: 'Sản phẩm 7' },
      { masp: 'SP008', title: 'Sản phẩm 8' },
    ];

    const duplicates = DemoImportValidationService.checkDuplicates(newProducts, this.existingProducts, 'masp');
    const result = await this.showImportConfirmDialog('Sản Phẩm', this.existingProducts.length, newProducts.length, duplicates);
    
    if (result.confirmed) {
      const finalData = DemoImportValidationService.prepareData(newProducts, this.existingProducts, 'masp', result.overwrite);
      this.simulateImport('sản phẩm', finalData, result.overwrite);
      
      // Cập nhật dữ liệu demo
      if (result.overwrite) {
        this.existingProducts = [...this.existingProducts, ...finalData];
      } else {
        this.existingProducts.push(...finalData);
      }
    }
  }

  // Demo 2: Có trùng lặp
  async demoWithConflict() {
    const newProducts = [
      { masp: 'SP001', title: 'Sản phẩm 1 - Cập nhật' }, // Trùng
      { masp: 'SP002', title: 'Sản phẩm 2 - Cập nhật' }, // Trùng  
      { masp: 'SP003', title: 'Sản phẩm 3 - Cập nhật' }, // Trùng
      { masp: 'SP009', title: 'Sản phẩm 9' }, // Mới
      { masp: 'SP010', title: 'Sản phẩm 10' }, // Mới
    ];

    const duplicates = DemoImportValidationService.checkDuplicates(newProducts, this.existingProducts, 'masp');
    const result = await this.showImportConfirmDialog('Sản Phẩm', this.existingProducts.length, newProducts.length, duplicates);
    
    if (result.confirmed) {
      const finalData = DemoImportValidationService.prepareData(newProducts, this.existingProducts, 'masp', result.overwrite);
      this.simulateImport('sản phẩm', finalData, result.overwrite);
      
      // Cập nhật dữ liệu demo
      if (result.overwrite) {
        // Ghi đè: cập nhật và thêm mới
        newProducts.forEach(newItem => {
          const existingIndex = this.existingProducts.findIndex(item => item.masp === newItem.masp);
          if (existingIndex >= 0) {
            this.existingProducts[existingIndex] = newItem;
          } else {
            this.existingProducts.push(newItem);
          }
        });
      } else {
        // Chỉ thêm mới
        this.existingProducts.push(...finalData);
      }
    }
  }

  // Demo 3: Khách hàng
  async demoCustomerImport() {
    const newCustomers = [
      { makh: 'KH001', name: 'Khách hàng A - Cập nhật' }, // Trùng
      { makh: 'KH003', name: 'Khách hàng C' }, // Mới
      { makh: 'KH004', name: 'Khách hàng D' }, // Mới
    ];

    const duplicates = DemoImportValidationService.checkDuplicates(newCustomers, this.existingCustomers, 'makh');
    const result = await this.showImportConfirmDialog('Khách Hàng', this.existingCustomers.length, newCustomers.length, duplicates);
    
    if (result.confirmed) {
      const finalData = DemoImportValidationService.prepareData(newCustomers, this.existingCustomers, 'makh', result.overwrite);
      this.simulateImport('khách hàng', finalData, result.overwrite);
      
      // Cập nhật dữ liệu demo
      if (result.overwrite) {
        newCustomers.forEach(newItem => {
          const existingIndex = this.existingCustomers.findIndex(item => item.makh === newItem.makh);
          if (existingIndex >= 0) {
            this.existingCustomers[existingIndex] = newItem;
          } else {
            this.existingCustomers.push(newItem);
          }
        });
      } else {
        this.existingCustomers.push(...finalData);
      }
    }
  }

  // Demo 4: Nhà cung cấp
  async demoSupplierImport() {
    const newSuppliers = [
      { mancc: 'NCC003', name: 'Nhà cung cấp Z' }, // Mới
      { mancc: 'NCC004', name: 'Nhà cung cấp T' }, // Mới
    ];

    const duplicates = DemoImportValidationService.checkDuplicates(newSuppliers, this.existingSuppliers, 'mancc');
    const result = await this.showImportConfirmDialog('Nhà Cung Cấp', this.existingSuppliers.length, newSuppliers.length, duplicates);
    
    if (result.confirmed) {
      const finalData = DemoImportValidationService.prepareData(newSuppliers, this.existingSuppliers, 'mancc', result.overwrite);
      this.simulateImport('nhà cung cấp', finalData, result.overwrite);
      
      this.existingSuppliers.push(...finalData);
    }
  }

  // Method hiển thị dialog xác nhận
  private async showImportConfirmDialog(dataType: string, existingCount: number, newCount: number, duplicateItems: any[]): Promise<{confirmed: boolean, overwrite: boolean}> {
    return new Promise((resolve) => {
      const dialogData: ImportConfirmationData = {
        dataType,
        existingCount,
        newCount,
        duplicateItems,
        isOverwrite: false
      };

      const dialogRef = this._dialog.open(ImportConfirmationDialogComponent, {
        width: '500px',
        data: dialogData,
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        resolve(result || { confirmed: false, overwrite: false });
      });
    });
  }

  // Mô phỏng quá trình import
  private simulateImport(dataType: string, data: any[], overwrite: boolean) {
    const action = overwrite ? 'ghi đè' : 'thêm mới';
    const message = `Import thành công ${data.length} ${dataType} (${action})!`;
    
    this._snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
  }
}

const fs = require('fs');
const path = require('path');

// --- Helper Functions ---
function toPascalCase(str) {
  if (!str) return '';
  return str.replace(/(^\w|-\w)/g, (clearAndUpper) => clearAndUpper.replace(/-/, '').toUpperCase());
}

function toCamelCase(str) {
  if (!str) return '';
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// --- Get Feature Name from Arguments ---
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Lỗi: Vui lòng cung cấp tên feature. Ví dụ: node generateFeature.js sanpham');
  process.exit(1); // Exit with error code
}
const featureName = args[0].toLowerCase(); // e.g., 'sanpham'
const pascalCaseName = toPascalCase(featureName); // e.g., 'Sanpham'
const camelCaseName = toCamelCase(featureName); // e.g., 'sanpham'
const basePath = path.join('.', '', '', featureName); // Adjust base path if needed

console.log(`Đang tạo feature: ${pascalCaseName} tại ${basePath}...`);

// --- File Contents ---

// Helper to replace placeholders
const replacePlaceholders = (content) => {
    return content
        .replace(/Sanpham/g, pascalCaseName) // PascalCase e.g., SanphamService, DetailSanphamComponent
        .replace(/sanpham/g, featureName)   // lowercase e.g., app-listsanpham, /admin/sanpham
        .replace(/listsanpham/g, `list${featureName}`) // e.g. listsanpham
        .replace(/detailsanpham/g, `detail${featureName}`) // e.g. detailsanpham
        // Add more replacements if needed for camelCase variables, etc.
};

const detailHtmlContent = replacePlaceholders(`
<div class="flex flex-row justify-between items-center space-x-2 p-2">
  <button mat-icon-button color="primary" (click)="goBack()">
    <mat-icon>arrow_back</mat-icon>
  </button>
  <div class="font-bold">{{ Detail${pascalCaseName}()?.title || 'Không có dữ liệu' }}</div>
  <div class="flex flex-row space-x-2 items-center">
    <mat-slide-toggle [(ngModel)]="Detail${pascalCaseName}().isActive" [disabled]="!isEdit()">{{Detail${pascalCaseName}().isActive?'Hiển Thị':'Ẩn'}}</mat-slide-toggle>
    <button mat-icon-button color="primary" *ngIf="isEdit()" (click)="handle${pascalCaseName}Action()">
      <mat-icon>save</mat-icon>
    </button>
    <button mat-icon-button color="primary" *ngIf="!isEdit()" (click)="toggleEdit()">
      <mat-icon>edit</mat-icon>
    </button>
    </div>
</div>

<div class="relative flex flex-col w-full p-4 overflow-auto">
  <ng-container *ngIf="isDelete()">
    <div class="flex flex-col space-y-4 items-center justify-center">
      <div class="font-bold text-2xl">Bạn chắc chắn muốn xoá không?</div>
      <div class="flex flex-row space-x-2 items-center justify-center">
        <button mat-flat-button color="primary" (click)="DeleteData()">Đồng Ý</button>
        <button mat-flat-button color="warn" (click)="toggleDelete()">Huỷ Bỏ</button>
      </div>
    </div>
  </ng-container>

  <ng-container *ngIf="!isDelete()">
    <div class="w-full flex flex-col space-y-2">
      <mat-form-field appearance="outline">
        <mat-label>Tiêu Đề</mat-label>
        <input matInput [(ngModel)]="Detail${pascalCaseName}().title" [disabled]="!isEdit()" placeholder="Vui lòng nhập Tiêu Đề"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Mã Sản Phẩm</mat-label>
        <input matInput [(ngModel)]="Detail${pascalCaseName}().masp" [disabled]="true" placeholder="Vui lòng nhập Mã Sản Phẩm"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Giá Gốc</mat-label>
        <input matInput type="number" [(ngModel)]="Detail${pascalCaseName}().giagoc" [disabled]="!isEdit()" placeholder="Vui lòng nhập Giá Gốc"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Đơn Vị Tính</mat-label>
        <input matInput [(ngModel)]="Detail${pascalCaseName}().dvt" [disabled]="!isEdit()" placeholder="Vui lòng nhập Đơn Vị Tính"/>
      </mat-form-field>
      <div class="flex flex-row space-x-2">
        <mat-form-field appearance="outline">
          <mat-label>Số Lượng</mat-label>
          <input matInput type="number" [(ngModel)]="Detail${pascalCaseName}().soluong" [disabled]="!isEdit()" placeholder="Vui lòng nhập Số Lượng"/>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Số Lượng Kho</mat-label>
          <input matInput type="number" [(ngModel)]="Detail${pascalCaseName}().soluongkho" [disabled]="!isEdit()" placeholder="Vui lòng nhập Số Lượng Kho"/>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Hao Hụt %</mat-label>
          <input matInput type="number" [(ngModel)]="Detail${pascalCaseName}().haohut" [disabled]="!isEdit()" placeholder="Vui lòng nhập Hao Hụt"/>
        </mat-form-field>
      </div>
      <mat-form-field appearance="outline">
            <mat-label>Ghi Chú</mat-label>
            <textarea matInput [(ngModel)]="Detail${pascalCaseName}().ghichu" [disabled]="!isEdit()" placeholder="Vui lòng nhập Ghi Chú"></textarea>
      </mat-form-field>
    </div>
  </ng-container>
</div>
`);

const detailScssContent = `
/* Add specific styles for Detail${pascalCaseName}Component here */
`;

const detailTsContent = replacePlaceholders(`
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { List${pascalCaseName}Component } from '../list${featureName}/list${featureName}.component'; // Adjusted path
import { ${pascalCaseName}Service } from '../${featureName}.service'; // Adjusted path
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils'; // Check this path

@Component({
  selector: 'app-detail${featureName}', // Use kebab-case selector
  standalone: true, // Assuming standalone components
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  templateUrl: './detail${featureName}.component.html',
  styleUrls: ['./detail${featureName}.component.scss'] // Corrected property name
})
export class Detail${pascalCaseName}Component {
  _List${pascalCaseName}Component: List${pascalCaseName}Component = inject(List${pascalCaseName}Component);
  _${pascalCaseName}Service: ${pascalCaseName}Service = inject(${pascalCaseName}Service);
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _snackBar: MatSnackBar = inject(MatSnackBar);

  Detail${pascalCaseName}: any = this._${pascalCaseName}Service.Detail${pascalCaseName};
  isEdit = signal(false);
  isDelete = signal(false);
  ${camelCaseName}Id: any = this._${pascalCaseName}Service.${camelCaseName}Id;

  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._${pascalCaseName}Service.set${pascalCaseName}Id(id);
    });

    effect(async () => {
      const id = this._${pascalCaseName}Service.${camelCaseName}Id();
      if (!id) {
        // Navigate back to list view if no ID
        this._router.navigate(['/admin/${featureName}']); // Use featureName
        // Attempt to close drawer safely
        try {
            this._List${pascalCaseName}Component.drawer?.close();
        } catch (e) {
            console.warn("Could not close drawer, maybe component not fully initialized or drawer doesn't exist.");
        }
        return;
      }

      if (id === 'new') {
        this.Detail${pascalCaseName}.set({}); // Initialize as empty object for creation
        this.isEdit.set(true); // Start in edit mode for new items
        this._router.navigate(['/admin/${featureName}', 'new']); // Use featureName
         try {
            this._List${pascalCaseName}Component.drawer?.open();
         } catch (e) {
             console.warn("Could not open drawer.");
         }
      } else {
        await this._${pascalCaseName}Service.get${pascalCaseName}By({ id: id });
         try {
            this._List${pascalCaseName}Component.drawer?.open();
         } catch (e) {
            console.warn("Could not open drawer.");
         }
        this.isEdit.set(false); // Start in view mode for existing items
        this._router.navigate(['/admin/${featureName}', id]); // Use featureName
      }
    });
  }

  async handle${pascalCaseName}Action() {
    if (this.${camelCaseName}Id() === 'new') {
      await this.create${pascalCaseName}();
    } else {
      await this.update${pascalCaseName}();
    }
  }

  private async create${pascalCaseName}() {
    try {
      const newItem = {
          ...this.Detail${pascalCaseName}(),
          id: GenId(), // Assuming GenId creates a unique ID
          masp: GenId(5).toUpperCase(), // Generate masp if needed
          slug: convertToSlug(this.Detail${pascalCaseName}().title || ''), // Generate slug
          isActive: this.Detail${pascalCaseName}().isActive === undefined ? true : this.Detail${pascalCaseName}().isActive, // Default isActive to true
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
      };
      this.Detail${pascalCaseName}.set(newItem); // Update signal before saving
      await this._${pascalCaseName}Service.Create${pascalCaseName}(newItem);
      this._snackBar.open('Tạo Mới Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.set(false); // Exit edit mode after save
      // Update the route without reloading the component, just changing the URL
      this._router.navigate(['/admin/${featureName}', newItem.id], { replaceUrl: true });
    } catch (error) {
      console.error('Lỗi khi tạo ${featureName}:', error);
      this._snackBar.open('Lỗi khi tạo mới', 'Đóng', { duration: 3000 });
    }
  }

  private async update${pascalCaseName}() {
    try {
        const currentData = this.Detail${pascalCaseName}();
        const updatedData = {
            ...currentData,
            slug: convertToSlug(currentData.title || ''),
            updatedAt: new Date().toISOString()
        };
      await this._${pascalCaseName}Service.update${pascalCaseName}(updatedData);
      this._snackBar.open('Cập Nhật Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.isEdit.set(false); // Exit edit mode after save
    } catch (error) {
      console.error('Lỗi khi cập nhật ${featureName}:', error);
      this._snackBar.open('Lỗi khi cập nhật', 'Đóng', { duration: 3000 });
    }
  }

  async DeleteData() {
    try {
      await this._${pascalCaseName}Service.Delete${pascalCaseName}(this.Detail${pascalCaseName}());
      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      this.goBack(); // Navigate back after deletion
    } catch (error) {
      console.error('Lỗi khi xóa ${featureName}:', error);
      this._snackBar.open('Lỗi khi xóa', 'Đóng', { duration: 3000 });
    }
  }

  goBack() {
    this._router.navigate(['/admin/${featureName}']); // Use featureName
    try {
        this._List${pascalCaseName}Component.drawer?.close();
    } catch(e) {
        console.warn("Could not close drawer.");
    }
    this.isEdit.set(false); // Reset edit state
    this.isDelete.set(false); // Reset delete state
    this._${pascalCaseName}Service.set${pascalCaseName}Id(null); // Clear the ID
  }

  trackByFn(index: number, item: any): any {
    return item.id; // Or another unique identifier
  }

  toggleEdit() {
    this.isEdit.update(value => !value);
  }

  toggleDelete() {
    this.isDelete.update(value => !value);
  }

  // Optional: Auto-generate slug when title changes (if needed)
  // FillSlug(){
  //   this.Detail${pascalCaseName}.update((v:any)=>{
  //     if (v && typeof v.title === 'string') {
  //        v.slug = convertToSlug(v.title);
  //     }
  //     return v;
  //   })
  // }
}
`);

const listHtmlContent = replacePlaceholders(`
<mat-drawer-container class="w-full h-full" autosize>
  <mat-drawer #drawer class="flex flex-col lg:!w-1/2 !w-full h-full" [position]="'end'" mode="over">
    <router-outlet></router-outlet>
  </mat-drawer>

  <div class="flex flex-col space-y-2 h-screen-16 w-full p-2"> <div *ngIf="!isSearch"
         class="border p-1 cursor-pointer w-full relative flex lg:flex-row lg:space-y-0 space-y-2 flex-col lg:space-x-2 justify-between items-center bg-white rounded-lg">
      <div class="w-full flex flex-row space-x-2 items-center flex-wrap"> <button matTooltip="Thêm mới" (click)="create()" color="primary" mat-icon-button>
          <mat-icon>add_circle</mat-icon>
        </button>
        <button matTooltip="Ẩn hiện cột" mat-icon-button color="primary" [matMenuTriggerFor]="menuColumns"
                aria-label="Column visibility menu">
          <mat-icon>tune</mat-icon>
        </button>
        <mat-menu #menuColumns="matMenu">
          <div class="p-4">
            <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
              <input (input)="doFilterColumns($event)" (click)="$event.stopPropagation()" matInput
                     placeholder="Tìm Cột" />
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>
          </div>
          <div class="flex flex-col max-h-80 overflow-auto">
            @for (item of FilterColumns; track item.key) {
            <button mat-menu-item (click)="toggleColumn(item);$event.stopPropagation()">
              <mat-icon>{{item.isShow ? 'check_box' : 'check_box_outline_blank'}}</mat-icon>
              <span>{{item.value}}</span>
            </button>
            }
          </div>
        </mat-menu>
        <button matTooltip="Tìm Kiếm" color="primary" (click)="isSearch = !isSearch" mat-icon-button>
          <mat-icon>search</mat-icon>
        </button>
        <button matTooltip="Tải file excel Mẫu" (click)="ExportExcel(List${pascalCaseName}(),'${pascalCaseName}')" color="primary"
                mat-icon-button>
          <mat-icon>file_download</mat-icon>
        </button>
        <button matTooltip="Tải lên file excel" (click)="uploadfile.click()" color="primary" mat-icon-button>
          <mat-icon>file_upload</mat-icon>
        </button>
        <input class="hidden" (change)="ImporExcel($event)" type="file" #uploadfile accept=".xlsx, .xls"> <button matTooltip="Tải dữ liệu từ drive" (click)="OpenLoadDrive(LoadDriveDialog)" color="primary" mat-icon-button>
          <mat-icon>cloud_download</mat-icon>
        </button>
        <span class="lg:flex hidden whitespace-nowrap p-2 rounded-lg bg-slate-200">
           {{this.totalItems}} {{ pascalCaseName }}
        </span>
        <button *ngIf="EditList.length > 0" matTooltip="Xoá {{EditList.length}} mục" (click)="openDeleteDialog(DeleteDialog)"
                color="warn" mat-icon-button>
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </div>

    <div *ngIf="isSearch" class="border p-1 py-2 w-full flex flex-row space-x-2 items-center bg-white rounded-lg">
      <div class="flex items-center flex-grow">
        <div class="relative w-full">
          <div class="absolute text-blue-600 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <mat-icon>search</mat-icon>
          </div>
          <input type="text" #searchInput (keyup)="applyFilter($event)" placeholder="Vui lòng Tìm Kiếm" class="w-full border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"/>
        </div>
        <button mat-icon-button color="warn" (click)="clearSearch()"><mat-icon>cancel</mat-icon></button>
      </div>
    </div>

    <div class="border rounded-lg w-full h-full overflow-auto relative"> <table class="w-full" mat-table [dataSource]="dataSource" matSort (matSortChange)="announceSortChange($event)">
        @for (column of displayedColumns(); track column) {
          <ng-container [matColumnDef]="column">
             <th mat-header-cell *matHeaderCellDef mat-sort-header [sortActionDescription]="'Sort by ' + ColumnName[column]" class="whitespace-nowrap sticky top-0 bg-white z-10"> <div class="flex items-center">
                   <span class="max-w-40 line-clamp-1 me-1"> {{ ColumnName[column] }}
                   </span>
                   </div>
             </th>

            <td mat-cell *matCellDef="let row; let idx = index" class="whitespace-nowrap">
              @switch (column) {
                @case ('select') {
                  <mat-checkbox (click)="$event.stopPropagation()"
                                (change)="$event ? AddToEdit(row) : null"
                                [checked]="CheckItemInEdit(row)"
                                [aria-label]="'Select row ' + (idx + 1)">
                  </mat-checkbox>
                }
                @case ('masp') {
                  <span (click)="goToDetail(row);" class="max-w-40 line-clamp-1 font-bold text-blue-600 hover:underline cursor-pointer">
                    {{ row[column] }}
                  </span>
                }
                @case ('STT') {
                  <span class="max-w-40 line-clamp-1">
                     {{ (paginator?.pageIndex ?? 0) * (paginator?.pageSize ?? 0) + idx + 1 }}
                  </span>
                }
                 @case ('giagoc') {
                    <span class="max-w-40 line-clamp-1">
                        {{ row[column] | number }}
                    </span>
                 }
                @case ('createdAt') {
                  <span class="max-w-40 line-clamp-1">
                    {{ row[column] | date:'dd/MM/yyyy HH:mm' }} </span>
                }
                 @case ('updatedAt') {
                  <span class="max-w-40 line-clamp-1">
                    {{ row[column] | date:'dd/MM/yyyy HH:mm' }}
                  </span>
                }
                @case ('haohut') {
                  <span class="max-w-40 line-clamp-1">
                    {{ row[column] }}%
                  </span>
                }
                @case ('isActive') {
                  @if (row[column]) {
                      <mat-icon class="text-green-500" matTooltip="Hiển thị">check_circle</mat-icon>
                    } @else {
                      <mat-icon class="text-red-500" matTooltip="Đã ẩn">cancel</mat-icon>
                    }
                  }
                @default {
                  <span class="max-w-40 line-clamp-1" [matTooltip]="row[column]"> {{ row[column] }}
                  </span>
                }
              }
            </td>
          </ng-container>
        } @else {
            <ng-container matColumnDef="loading">
                <td mat-footer-cell *matFooterCellDef [attr.colspan]="displayedColumns().length" class="p-4 text-center">
                    Đang tải dữ liệu...
                </td>
            </ng-container>
             <tr mat-footer-row *matFooterRowDef="['loading']" class="bg-gray-100"></tr>
        }

        <tr mat-header-row *matHeaderRowDef="displayedColumns(); sticky: true"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns();"
            class="hover:bg-slate-100 cursor-pointer {{CheckItemInEdit(row)?'!bg-blue-100':''}}" (click)="goToDetail(row)"> </tr>
        <tr class="mat-row" *matNoDataRow>
           <td class="mat-cell p-4 text-center" [attr.colspan]="displayedColumns().length">
                {{ isLoading() ? 'Đang tải...' : 'Không tìm thấy dữ liệu' }}
           </td>
        </tr>
      </table>
    </div>

    <mat-paginator [length]="totalItems"
                    [pageSize]="pageSize"
                    [pageSizeOptions]="pageSizeOptions"
                    (page)="handlePageEvent($event)"
                    aria-label="Select page">
     </mat-paginator>
  </div>
</mat-drawer-container>

<ng-template #DeleteDialog>
  <h2 mat-dialog-title>Xác Nhận Xóa</h2>
  <mat-dialog-content>
    Bạn chắc chắn muốn xoá {{ EditList.length }} mục đã chọn không?
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close="false">Huỷ Bỏ</button>
    <button mat-flat-button color="warn" mat-dialog-close="true" cdkFocusInitial>Đồng Ý</button>
  </mat-dialog-actions>
</ng-template>

<ng-template #LoadDriveDialog>
   <h2 mat-dialog-title>Tải Dữ Liệu Từ Google Sheet</h2>
   <mat-dialog-content class="min-w-[80vw] min-h-[80vh] flex flex-col"> <div class="flex flex-row space-x-2 items-center mb-4">
            <mat-form-field appearance="outline" class="flex-grow" subscriptSizing="dynamic">
                <mat-label>Sheet ID</mat-label>
                <input matInput [(ngModel)]="IdSheet" [ngModelOptions]="{ standalone: true }" placeholder="Nhập ID của Google Sheet" />
            </mat-form-field>
            <mat-form-field appearance="outline" class="flex-grow" subscriptSizing="dynamic">
                <mat-label>Sheet Name</mat-label>
                <input matInput [(ngModel)]="SheetName" [ngModelOptions]="{ standalone: true }" placeholder="Nhập tên trang tính (Sheet Name)" />
             </mat-form-field>
             <button (click)="LoadDrive()" matTooltip="Tải Dữ Liệu" color="primary" mat-icon-button [disabled]="isLoadingDrive">
                 <mat-icon>refresh</mat-icon>
             </button>
         </div>
         <div class="relative flex-grow w-full overflow-auto border rounded-md">
            <div *ngIf="isLoadingDrive" class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <mat-progress-spinner mode="indeterminate" diameter="50"></mat-progress-spinner>
            </div>
             <app-ktable *ngIf="ImportItem.length > 0"
                         [ListItem]="ImportItem"
                         [ColumnName]="ImportColumnName"
                         [displayedColumns]="ImportDisplayedColumns">
             </app-ktable>
              <div *ngIf="!isLoadingDrive && ImportItem.length === 0 && driveDataLoaded" class="p-4 text-center text-gray-500">
                  Không có dữ liệu hoặc chưa tải.
              </div>
         </div>
     </mat-dialog-content>
     <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close="false">Huỷ Bỏ</button>
         <button mat-flat-button color="primary" (click)="DoImportData(ImportItem)" [disabled]="ImportItem.length === 0 || isLoadingDrive" mat-dialog-close="import">
            Nhập Dữ Liệu
         </button>
     </mat-dialog-actions>
</ng-template>
`);

const listScssContent = `
/* General styles for the list view */
mat-drawer-container {
  background-color: #f4f7fa; /* Light background for the container */
}

/* Style for sticky header */
.mat-mdc-table .mat-mdc-header-row {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white; /* Ensure header has a background */
}

/* Adjust cell padding for better spacing */
.mat-mdc-table .mat-mdc-cell,
.mat-mdc-table .mat-mdc-header-cell {
  padding: 8px 12px; /* Adjust padding as needed */
}

/* Ensure paginator stays at the bottom */
mat-paginator {
    position: sticky;
    bottom: 0;
    background: white; /* Give paginator a background */
    z-index: 10;
    border-top: 1px solid #e0e0e0; /* Add a top border */
}

/* Highlight selected row */
.mat-mdc-row.selected-row {
    background-color: #e3f2fd; /* Light blue background for selected */
}
`;

const listTsContent = replacePlaceholders(`
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, signal, TemplateRef, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, DatePipe } from '@angular/common'; // Import DatePipe
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Import CheckboxModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import ProgressSpinnerModule
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ${pascalCaseName}Service } from '../${featureName}.service'; // Adjusted path
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils'; // Check path
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils'; // Check path
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service'; // Check path
import { environment } from '../../../../environments/environment'; // Check path
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component'; // Check path
import { KtableComponent } from '../../../shared/common/ktable/ktable.component'; // Check path
import { LiveAnnouncer } from '@angular/cdk/a11y'; // For sort change announcements

// Assuming a type/interface for your data
import { ${pascalCaseName} } from '../${featureName}.type'; // Assuming you have this type definition

@Component({
  selector: 'app-list${featureName}', // Use kebab-case selector
  templateUrl: './list${featureName}.component.html',
  styleUrls: ['./list${featureName}.component.scss'], // Corrected property name
  standalone: true, // Assuming standalone components
  imports: [
    CommonModule, // Includes DatePipe now
    FormsModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule, // Add CheckboxModule
    MatProgressSpinnerModule, // Add ProgressSpinnerModule
    SearchfilterComponent, // If used
    KtableComponent // If used
  ],
  providers: [DatePipe], // Provide DatePipe if not using CommonModule or if needed explicitly
  changeDetection: ChangeDetectionStrategy.OnPush // Use OnPush for better performance
})
export class List${pascalCaseName}Component implements OnInit, AfterViewInit, OnDestroy {
  // --- Injected Services ---
  private _${camelCaseName}Service: ${pascalCaseName}Service = inject(${pascalCaseName}Service);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _googleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _liveAnnouncer: LiveAnnouncer = inject(LiveAnnouncer);

  // --- View Children ---
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  // --- Signals and State ---
  isLoading = signal(true); // Loading indicator for initial data fetch
  isSearch = signal(false);
  isLoadingDrive = signal(false);
  driveDataLoaded = signal(false); // Track if drive data load was attempted

  List${pascalCaseName} = this._${camelCaseName}Service.List${pascalCaseName}; // Signal from service
  dataSource = new MatTableDataSource<${pascalCaseName}>([]); // Initialize with empty array and type
  EditList = signal<${pascalCaseName}[]>([]); // List of items selected for deletion

  // --- Table Columns ---
   initialColumns: { key: keyof ${pascalCaseName} | 'select' | 'STT' , value: string, isShow: boolean }[] = [
    { key: 'select', value: 'Chọn', isShow: true }, // Selection column
    { key: 'STT', value: 'STT', isShow: true }, // Row number column
    { key: 'title', value: 'Tên Sản Phẩm', isShow: true },
    { key: 'masp', value: 'Mã Sản Phẩm', isShow: true },
    { key: 'giagoc', value: 'Giá Gốc', isShow: true },
    { key: 'dvt', value: 'ĐVT', isShow: true },
    { key: 'soluong', value: 'SL', isShow: false }, // Initially hidden
    { key: 'soluongkho', value: 'SL Kho', isShow: false }, // Initially hidden
    { key: 'haohut', value: 'Hao Hụt', isShow: false }, // Initially hidden
    { key: 'ghichu', value: 'Ghi Chú', isShow: false }, // Initially hidden
    { key: 'isActive', value: 'Trạng thái', isShow: true },
    { key: 'createdAt', value: 'Ngày Tạo', isShow: true },
    { key: 'updatedAt', value: 'Ngày Cập Nhật', isShow: false } // Initially hidden
  ];
  FilterColumns = signal(this.loadColumnFilters()); // Load saved filters or use initial
  Columns = computed(() => this.FilterColumns().map(c => ({ ...c }))); // Full list for filtering the menu
  displayedColumns = computed(() => this.FilterColumns().filter(c => c.isShow).map(c => c.key));
  ColumnName = computed(() => {
      const nameMap: { [key: string]: string } = {};
      this.FilterColumns().forEach(col => {
          if(col.isShow) {
              nameMap[col.key] = col.value;
          }
      });
      return nameMap;
  });

  // --- Paginator ---
  totalItems = 0;
  pageSize = 10;
  currentPage = 0; // MatPaginator uses 0-based index
  pageSizeOptions = [5, 10, 25, 100];

  // --- Google Drive Import ---
  IdSheet: string = environment.GIdSheet || '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk'; // Default or from environment
  SheetName: string = environment.GSheetName || '${pascalCaseName}Import'; // Default or from environment
  ImportItem = signal<any[]>([]); // Data loaded from Drive/Excel
  ImportColumnName = signal<{ [key: string]: string }>({});
  ImportDisplayedColumns = signal<string[]>([]);

  // --- Filtering and Search ---
  private filterSubject = new Subject<string>();
  private destroy$ = new Subject<void>(); // For unsubscribing

  constructor() {
    // Effect to update table data when service data changes
    effect(() => {
      this.isLoading.set(true); // Show loading when data changes
      const data = this.List${pascalCaseName}();
      this.dataSource.data = data;
      this.totalItems = data.length;
      // Apply current filter if any (needed after data refresh)
      if (this.dataSource.filter) {
         this.dataSource.filter = this.dataSource.filter;
      }
      this.isLoading.set(false); // Hide loading after data is set
    });

     // Debounce search input
    this.filterSubject.pipe(
      debounceTime(300), // Wait 300ms after last keypress
      distinctUntilChanged(), // Only emit if value changed
      takeUntil(this.destroy$) // Unsubscribe on component destroy
    ).subscribe(filterValue => {
       this.applyDataSourceFilter(filterValue);
    });
  }

  ngOnInit(): Promise<void> {
    this.setupDrawer();
    return this.refreshData(); // Initial data load
  }

  ngAfterViewInit(): void {
    // Connect paginator and sort to the data source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Signal completion
    this.destroy$.complete(); // Complete the subject
    // Potentially disconnect socket or clean up other resources if needed
    // this._${camelCaseName}Service.disconnectSocket(); // Example if service has disconnect
  }

  // --- Data Handling ---
  async refreshData(): Promise<void> {
    this.isLoading.set(true);
    try {
      await this._${camelCaseName}Service.getAll${pascalCaseName}(); // Fetch latest data
       this._${camelCaseName}Service.listen${pascalCaseName}Updates(); // Start listening after initial fetch
    } catch (error) {
       console.error("Error fetching data:", error);
       this._snackBar.open('Lỗi tải dữ liệu', 'Đóng', { duration: 3000 });
    } finally {
       this.isLoading.set(false);
    }
  }

  // --- Table Operations ---
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.filterSubject.next(filterValue.trim().toLowerCase()); // Push to debounce subject
   }

  applyDataSourceFilter(filterValue: string) {
       this.dataSource.filter = filterValue;
       if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage(); // Go to first page on filter
       }
   }

  clearSearch() {
     if (this.searchInput) {
        this.searchInput.nativeElement.value = '';
     }
     this.applyDataSourceFilter(''); // Clear filter
     this.isSearch.set(false); // Hide search bar
  }

  // --- Column Visibility ---
  toggleColumn(item: any): void {
    this.FilterColumns.update(columns => {
        const index = columns.findIndex(c => c.key === item.key);
        if (index > -1) {
            columns[index].isShow = !columns[index].isShow;
        }
        return [...columns]; // Return new array to trigger computed signals
    });
    this.saveColumnFilters(); // Save preference
  }

  doFilterColumns(event: any): void {
     const query = (event.target as HTMLInputElement).value.toLowerCase();
     const filtered = this.initialColumns.filter(col =>
        col.value.toLowerCase().includes(query)
     );
     // We are filtering the 'FilterColumns' signal used in the template directly
     // Update the signal that the template loops through for the menu
      this.FilterColumns.set(
        this.initialColumns.map(initialCol => {
            const currentFiltered = this.FilterColumns().find(fc => fc.key === initialCol.key);
            return {
                ...initialCol,
                // Preserve the current isShow status
                isShow: currentFiltered ? currentFiltered.isShow : initialCol.isShow,
                // Filter visibility in the menu itself
                _isHiddenInMenu: !initialCol.value.toLowerCase().includes(query)
            };
        }).filter(col => !col._isHiddenInMenu) // Filter out those marked as hidden
      );
  }

  loadColumnFilters(): { key: string, value: string, isShow: boolean }[] {
      const saved = localStorage.getItem('${pascalCaseName}ColFilter');
      if (saved) {
          try {
              // Basic validation: check if it's an array and items have key, value, isShow
             const parsed = JSON.parse(saved);
             if (Array.isArray(parsed) && parsed.every(item => 'key' in item && 'value' in item && 'isShow' in item)) {
                 // Merge saved filters with initial config to handle added/removed columns
                 const merged = this.initialColumns.map(initialCol => {
                     const savedCol = parsed.find(sc => sc.key === initialCol.key);
                     return savedCol ? { ...initialCol, isShow: savedCol.isShow } : initialCol;
                 });
                 return merged;
             }
          } catch (e) {
              console.error("Error parsing saved column filters:", e);
              localStorage.removeItem('${pascalCaseName}ColFilter'); // Clear invalid data
          }
      }
      return this.initialColumns.map(c => ({ ...c })); // Return a copy of initial if no valid saved data
   }

  saveColumnFilters(): void {
      localStorage.setItem('${pascalCaseName}ColFilter', JSON.stringify(this.FilterColumns()));
  }

  // --- Sorting ---
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to announce specific column names.
    if (sortState.direction) {
      this._liveAnnouncer.announce(\`Sorted \${sortState.direction}ending\`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
     // Note: MatTableDataSource handles sorting automatically if MatSort is connected.
     // No need to manually sort dataSource.data here unless doing server-side sorting.
  }

  // --- Pagination ---
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    // Note: MatTableDataSource handles pagination automatically if MatPaginator is connected.
    // No need to manually slice data here unless doing server-side pagination.
  }

  // --- CRUD Operations ---
  create(): void {
    this.EditList.set([]); // Clear selection when creating new
    this._router.navigate(['admin/${featureName}', 'new']); // Navigate to detail route with 'new'
    this.drawer.open();
  }

  goToDetail(item: ${pascalCaseName}): void {
    // Don't clear EditList here, allow multi-select maybe? Or clear based on UX choice.
    // this.EditList.set([]); // Optional: Clear selection when viewing details
    this._router.navigate(['admin/${featureName}', item.id]); // Navigate to detail route with ID
    this.drawer.open();
  }

   // --- Selection for Deletion ---
    AddToEdit(item: ${pascalCaseName}): void {
      this.EditList.update(currentList => {
        const index = currentList.findIndex((v: any) => v.id === item.id);
        if (index > -1) {
          // Item exists, remove it
          return currentList.filter((v, i) => i !== index);
        } else {
          // Item doesn't exist, add it
          return [...currentList, item];
        }
      });
    }

    CheckItemInEdit(item: ${pascalCaseName}): boolean {
      return this.EditList().some((v: any) => v.id === item.id);
    }

    // Master toggle for selecting all/none visible rows
    masterToggle(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        if (checkbox.checked) {
            this.EditList.set([...this.dataSource.filteredData]); // Select all filtered items
        } else {
            this.EditList.set([]); // Deselect all
        }
    }

    isAllSelected(): boolean {
        const numSelected = this.EditList().length;
        const numRows = this.dataSource.filteredData.length;
        return numSelected === numRows && numRows > 0;
    }

    isSomeSelected(): boolean {
        return this.EditList().length > 0 && !this.isAllSelected();
    }


  // --- Deletion ---
  openDeleteDialog(templateRef: TemplateRef<any>): void {
    if (this.EditList().length === 0) return; // Don't open if nothing selected

    const dialogRef = this._dialog.open(templateRef);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") { // Check for string "true" from template
        this.deleteSelectedItems();
      }
    });
  }

  async deleteSelectedItems(): Promise<void> {
    const itemsToDelete = this.EditList();
    if (itemsToDelete.length === 0) return;

    this.isLoading.set(true); // Show loading indicator
    try {
      // Use Promise.all to delete items concurrently (if backend supports it)
      await Promise.all(itemsToDelete.map(item => this._${camelCaseName}Service.Delete${pascalCaseName}(item)));

      this.EditList.set([]); // Clear selection after successful deletion
      this._snackBar.open(\`Đã xóa \${itemsToDelete.length} mục thành công\`, '', {
        duration: 2000,
        panelClass: ['snackbar-success'] // Use custom class for success styling
      });
      // No need to call refreshData if the service updates the signal via websocket/other means
      // If not using real-time updates, uncomment the line below:
      // await this.refreshData();
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      this._snackBar.open('Đã xảy ra lỗi khi xóa', 'Đóng', { duration: 3000 });
    } finally {
      this.isLoading.set(false); // Hide loading indicator
    }
  }

  // --- Excel Import/Export ---
  async ImporExcel(event: any): Promise<void> {
     const file = (event.target as HTMLInputElement).files?.[0];
     if (!file) return;
     this.isLoading.set(true);
     try {
        const data = await readExcelFile(file);
        if (data && data.length > 0) {
            await this.DoImportData(data); // Process and import data
            this._snackBar.open(\`Đã nhập \${data.length} dòng từ Excel\`, '', { duration: 2000, panelClass: ['snackbar-success'] });
        } else {
             this._snackBar.open('File Excel trống hoặc không hợp lệ', 'Đóng', { duration: 3000 });
        }
     } catch (error) {
        console.error("Error importing Excel:", error);
        this._snackBar.open('Lỗi nhập Excel', 'Đóng', { duration: 3000 });
     } finally {
         this.isLoading.set(false);
         (event.target as HTMLInputElement).value = ''; // Reset file input
     }
   }

  ExportExcel(data: ${pascalCaseName}[], title: string): void {
    if (!data || data.length === 0) {
        this._snackBar.open('Không có dữ liệu để xuất', '', { duration: 2000 });
        return;
    }
    const dataToExport = data.map(v => ({
      // Select and map fields you want to export
      title: v.title,
      masp: v.masp,
      giagoc: v.giagoc,
      dvt: v.dvt,
      soluong: v.soluong,
      soluongkho: v.soluongkho,
      haohut: v.haohut,
      ghichu: v.ghichu,
      isActive: v.isActive ? 'Hiển thị' : 'Ẩn', // Example transformation
      createdAt: v.createdAt ? new Date(v.createdAt).toLocaleDateString('vi-VN') : '', // Format date
      updatedAt: v.updatedAt ? new Date(v.updatedAt).toLocaleDateString('vi-VN') : ''
    }));
    writeExcelFile(dataToExport, \`\${title}_\${new Date().toISOString().slice(0, 10)}\`); // Add date to filename
  }

  // --- Google Drive Import ---
  OpenLoadDrive(templateRef: TemplateRef<any>) {
    this.IdSheet = environment.GIdSheet || this.IdSheet; // Ensure latest value from env
    this.SheetName = environment.GSheetName || this.SheetName;
    this.ImportItem.set([]); // Clear previous import data
    this.isLoadingDrive.set(false);
    this.driveDataLoaded.set(false);

    const dialogRef = this._dialog.open(templateRef, {
        width: '90vw', // Set width
        height: '90vh', // Set height
        maxWidth: '1200px', // Optional max width
        disableClose: true // Prevent closing by clicking outside or Escape
    });

    dialogRef.afterClosed().subscribe(result => {
      // The import logic is now handled by the button inside the dialog
       if (result === 'import') {
           // Optionally show a final confirmation after import from dialog
           // this._snackBar.open('Đang xử lý dữ liệu nhập...', '', { duration: 1500 });
       } else {
           // Reset state if dialog is cancelled
           this.ImportItem.set([]);
           this.ImportColumnName.set({});
           this.ImportDisplayedColumns.set([]);
       }
    });
  }

  async LoadDrive() {
    if (!this.IdSheet || !this.SheetName) {
        this._snackBar.open('Vui lòng nhập Sheet ID và Sheet Name', 'Đóng', { duration: 3000 });
        return;
    }
    this.isLoadingDrive.set(true);
    this.driveDataLoaded.set(true); // Mark that loading was attempted
    this.ImportItem.set([]); // Clear previous data

    const driveInfo = {
        IdSheet: this.IdSheet,
        SheetName: this.SheetName,
        ApiKey: environment.GSApiKey, // Ensure API key is in environment
    };

    try {
        const result: any = await this._googleSheetService.getDrive(driveInfo);
        if (result?.values && result.values.length > 1) { // Check if data exists
            const headers = result.values[0]; // Row 0: Keys/IDs
            const displayNames = result.values[1]; // Row 1: Display Names
            this.ImportColumnName.set(Object.fromEntries(headers.map((key: any, i: any) => [key, displayNames[i] || key])));
            this.ImportDisplayedColumns.set(headers);
            const dataRows = result.values.slice(2); // Data starts from row 2
            this.ImportItem.set(ConvertDriveData(dataRows, headers)); // Convert raw data
            if(this.ImportItem().length === 0){
                this._snackBar.open('Không tìm thấy dữ liệu trong Sheet', '', { duration: 2000 });
            }
        } else {
            this._snackBar.open('Sheet không hợp lệ hoặc không có dữ liệu (cần ít nhất 3 dòng: key, display name, data)', 'Đóng', { duration: 4000 });
            this.ImportColumnName.set({});
            this.ImportDisplayedColumns.set([]);
        }
    } catch (error) {
        console.error("Error loading from Google Drive:", error);
        this._snackBar.open('Lỗi tải dữ liệu từ Google Drive', 'Đóng', { duration: 3000 });
        this.ImportColumnName.set({});
        this.ImportDisplayedColumns.set([]);
    } finally {
        this.isLoadingDrive.set(false);
    }
}


 async DoImportData(dataToImport: any[]) {
     if (!dataToImport || dataToImport.length === 0) {
         this._snackBar.open('Không có dữ liệu để nhập', '', { duration: 2000 });
         return;
     }

     this.isLoading.set(true); // Use main loading indicator for processing

     // --- Data Transformation and Validation ---
     const transformedData = dataToImport.map((v: any) => ({
         // Trim strings and provide defaults, ensure correct types
         id: v.id?.toString().trim() || GenId(), // Use existing ID or generate new
         title: v.title?.toString().trim() || 'Chưa có tên',
         masp: v.masp?.toString().trim().toUpperCase() || GenId(5).toUpperCase(), // Ensure unique masp
         giagoc: Number(v.giagoc) || 0,
         dvt: v.dvt?.toString().trim() || 'Cái',
         soluong: Number(v.soluong) || 0,
         soluongkho: Number(v.soluongkho) || 0,
         haohut: Number(v.haohut) || 0,
         ghichu: v.ghichu?.toString().trim() || '',
         isActive: v.isActive === 'false' || v.isActive === false || v.isActive === 0 ? false : true, // Handle boolean conversion
         slug: convertToSlug(v.title?.toString().trim() || ''), // Generate slug
         // Keep existing createdAt if available, otherwise set new
         createdAt: v.createdAt || new Date().toISOString(),
         updatedAt: new Date().toISOString() // Always set updatedAt to now
     })).filter(item => item.title !== 'Chưa có tên' && item.masp); // Basic validation: must have title and masp

      // --- Check for Duplicate 'masp' within the import data ---
      const maspCounts = transformedData.reduce((acc, item) => {
         acc[item.masp] = (acc[item.masp] || 0) + 1;
         return acc;
     }, {} as { [key: string]: number });

     const duplicatesInImport = Object.entries(maspCounts)
         .filter(([_, count]) => count > 1)
         .map(([masp]) => masp);

     if (duplicatesInImport.length > 0) {
         this._snackBar.open(\`Lỗi: Mã sản phẩm bị trùng lặp trong file nhập: \${duplicatesInImport.join(', ')}\`, 'Đóng', { duration: 5000 });
         this.isLoading.set(false);
         return; // Stop import if duplicates found within the file
     }

     // --- Prepare for Upsert (Update or Insert) ---
     const existing${pascalCaseName} = this.List${pascalCaseName}(); // Get current data from service signal
     const existingMaspMap = new Map(existing${pascalCaseName}.map((item: ${pascalCaseName}) => [item.masp, item]));

     const itemsToCreate: ${pascalCaseName}[] = [];
     const itemsToUpdate: ${pascalCaseName}[] = [];

     transformedData.forEach((importItem: any) => {
         const existingItem = existingMaspMap.get(importItem.masp);
         if (existingItem) {
             // Prepare update: merge existing with import, keeping existing ID and createdAt
             itemsToUpdate.push({
                 ...existingItem, // Start with existing data (includes id, createdAt)
                 ...importItem, // Override with imported data (title, prices, etc.)
                 id: existingItem.id, // Ensure original ID is kept
                 createdAt: existingItem.createdAt, // Ensure original createdAt is kept
                 updatedAt: new Date().toISOString() // Set new update timestamp
             });
         } else {
             // Prepare create: use generated ID and set createdAt/updatedAt
             itemsToCreate.push({
                 ...importItem,
                 id: GenId(), // Ensure a new ID is generated
                 createdAt: new Date().toISOString(),
                 updatedAt: new Date().toISOString()
             });
         }
     });

     // --- Execute Batch Operations ---
     try {
         let createdCount = 0;
         let updatedCount = 0;

         if (itemsToCreate.length > 0) {
             // Assuming service has a batch create method
             // await this._${camelCaseName}Service.CreateBatch${pascalCaseName}(itemsToCreate);
             // Fallback to individual creates if no batch method
             await Promise.all(itemsToCreate.map(item => this._${camelCaseName}Service.Create${pascalCaseName}(item)));
             createdCount = itemsToCreate.length;
         }
         if (itemsToUpdate.length > 0) {
              // Assuming service has a batch update method
             // await this._${camelCaseName}Service.UpdateBatch${pascalCaseName}(itemsToUpdate);
             // Fallback to individual updates
             await Promise.all(itemsToUpdate.map(item => this._${camelCaseName}Service.update${pascalCaseName}(item)));
             updatedCount = itemsToUpdate.length;
         }

         // Optional: Deactivate items present in DB but not in the import file
         // const importMasps = new Set(transformedData.map((item: any) => item.masp));
         // const itemsToDeactivate = existing${pascalCaseName}.filter(
         //     existing => !importMasps.has(existing.masp) && existing.isActive
         // );
         // if (itemsToDeactivate.length > 0) {
         //     await Promise.all(
         //         itemsToDeactivate.map(item => this._${camelCaseName}Service.update${pascalCaseName}({ ...item, isActive: false }))
         //     );
         // }

          this._snackBar.open(\`Nhập thành công: \${createdCount} mới, \${updatedCount} cập nhật.\`, '', {
              duration: 3000,
              panelClass: ['snackbar-success']
          });

         // Data should refresh automatically via effect/websocket if service handles it.
         // If not, manually trigger refresh:
         // await this.refreshData();

         // Clear import dialog data after successful import
         this.ImportItem.set([]);
         this.ImportColumnName.set({});
         this.ImportDisplayedColumns.set([]);

     } catch (error) {
         console.error('Lỗi khi nhập dữ liệu:', error);
         this._snackBar.open('Đã xảy ra lỗi trong quá trình nhập dữ liệu.', 'Đóng', { duration: 4000 });
     } finally {
         this.isLoading.set(false);
     }
 }


  // --- Drawer Setup ---
  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small]) // Observe mobile breakpoints
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.drawer.mode = result.matches ? 'over' : 'side'; // 'over' on small screens, 'side' otherwise
        if(!result.matches) {
           // If not on small screen, ensure drawer is closed if no item is selected
           // This depends on your desired UX for desktop
           // if (!this._${camelCaseName}Service.${camelCaseName}Id()) {
           //    this.drawer.close();
           // }
        } else {
             this.drawer.close(); // Always close drawer initially on mobile
        }
      });
  }
}
`);

const serviceContent = replacePlaceholders(`
import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'; // Check path
import { StorageService } from '../../shared/utils/storage.service'; // Check path
import { io, Socket } from 'socket.io-client';
import { openDB, IDBPDatabase } from 'idb';
import { ErrorLogService } from '../../shared/services/errorlog.service'; // Check path
import { ${pascalCaseName} } from './${featureName}.type'; // Import the type

@Injectable({
  providedIn: 'root'
})
export class ${pascalCaseName}Service {
  private _storageService: StorageService = inject(StorageService);
  private _router: Router = inject(Router);
  private _errorLogService: ErrorLogService = inject(ErrorLogService);

  // --- Signals ---
  List${pascalCaseName} = signal<${pascalCaseName}[]>([]);
  Detail${pascalCaseName} = signal<Partial<${pascalCaseName}>>({}); // Use Partial for potentially incomplete detail object
  ${camelCaseName}Id = signal<string | null>(null);

  // --- IndexedDB ---
  private dbName = '${pascalCaseName}DB';
  private storeName = '${featureName}s'; // e.g., 'sanphams'
  private dbPromise: Promise<IDBPDatabase<any>> | null = null;

  // --- WebSocket ---
  private socket: Socket | null = null;
  private readonly SOCKET_EVENT = '${featureName}-updated'; // e.g., 'sanpham-updated'
  private readonly CACHE_KEY = this.storeName; // e.g., 'sanphams'
  private readonly LAST_UPDATED_KEY = \`\${this.storeName}_updatedAt\`; // e.g., 'sanphams_updatedAt'

  constructor() {
    this.initDB().then(() => {
        console.log(\`IndexedDB '\${this.dbName}' initialized for ${pascalCaseName}.\`);
        // Optionally load initial data from cache after DB init
        // this.loadFromCache();
    }).catch(error => {
        this._errorLogService.logError(\`IndexedDB \${this.dbName} init failed\`, error);
    });
     // Initialize socket connection (consider doing this on demand or after login)
     this.connectSocket();
  }

   // --- Public Methods ---

  set${pascalCaseName}Id(id: string | null) {
    this.${camelCaseName}Id.set(id);
     // When ID changes, try to load the detail from the current list signal
     if (id && id !== 'new') {
         const item = this.List${pascalCaseName}().find(p => p.id === id);
         this.Detail${pascalCaseName}.set(item ? { ...item } : {}); // Set detail or empty if not found in list
     } else if (id === 'new') {
         this.Detail${pascalCaseName}.set({}); // Clear detail for new item
     }
   }

  async Create${pascalCaseName}(dulieu: Omit<${pascalCaseName}, 'id' | 'createdAt' | 'updatedAt'>): Promise<${pascalCaseName} | null> {
     // Add default fields before sending to backend
     const newItem: ${pascalCaseName} = {
       ...dulieu,
       id: GenId(), // Let backend generate ID ideally, or frontend if necessary
       masp: dulieu.masp || GenId(5).toUpperCase(), // Ensure masp is generated if missing
       isActive: dulieu.isActive === undefined ? true : dulieu.isActive,
       slug: dulieu.slug || convertToSlug(dulieu.title || ''),
       createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString(),
     };

     try {
       const response = await this.fetchApi('', 'POST', newItem);
       const createdItem = await response.json();

       // Optimistic update (optional but improves UX)
       this.List${pascalCaseName}.update(list => [...list, createdItem]);
       await this.saveToCache(this.List${pascalCaseName}()); // Update cache
       this.set${pascalCaseName}Id(createdItem.id); // Set the ID of the newly created item

       return createdItem;
     } catch (error) {
       this._errorLogService.logError(\`Failed to Create${pascalCaseName}\`, error);
       return null; // Indicate failure
     }
   }

  async getAll${pascalCaseName}(): Promise<${pascalCaseName}[]> {
     const db = await this.initDB();
     const cachedData = await db.getAll(this.storeName);
     const updatedAtCache = this._storageService.getItem(this.LAST_UPDATED_KEY) || '0';
     const cacheExpiryTime = 5 * 60 * 1000; // 5 minutes TTL

     // Use cache if available and not expired
     if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < cacheExpiryTime) {
         console.log(\`Using cached data for \${this.storeName}\`);
         this.List${pascalCaseName}.set(cachedData);
         return cachedData;
     }

     // Fetch from network
     this.List${pascalCaseName}.set(cachedData); // Temporarily set cached data while fetching
     console.log(\`Workspaceing fresh data for \${this.storeName}\`);

     try {
         // Check last updated timestamp from server (optional optimization)
        // const lastUpdatedResponse = await this.fetchApi('/last-updated', 'GET');
        // const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        // if (updatedAtServer && updatedAtServer <= updatedAtCache && cachedData.length > 0) {
        //     console.log(\`Cache for \${this.storeName} is still fresh.\`);
        //     this.List${pascalCaseName}.set(cachedData); // Ensure signal is set correctly
        //     return cachedData;
        // }

         // Fetch full data list
         const response = await this.fetchApi('', 'GET');
         const data = await response.json();

         await this.saveToCache(data);
         // Use the server's last update time if available, otherwise use current time
         this._storageService.setItem(this.LAST_UPDATED_KEY, /*updatedAtServer ||*/ new Date().toISOString());
         this.List${pascalCaseName}.set(data); // Update signal with fresh data
         return data;
     } catch (error) {
         this._errorLogService.logError(\`Failed to getAll${pascalCaseName}\`, error);
         // Fallback to cached data if fetch fails but cache exists
         if (cachedData.length > 0) {
             console.warn(\`Workspace failed for \${this.storeName}, using possibly stale cache.\`);
             this.List${pascalCaseName}.set(cachedData);
             return cachedData;
         }
         this.List${pascalCaseName}.set([]); // Set to empty if fetch fails and no cache
         return []; // Return empty array on failure
     }
  }

  async get${pascalCaseName}By(param: { [key: string]: any }): Promise<${pascalCaseName} | null> {
     // 1. Try getting from the current List signal (fastest)
     if (param.id) {
         const itemFromList = this.List${pascalCaseName}().find(p => p.id === param.id);
         if (itemFromList) {
             this.Detail${pascalCaseName}.set({ ...itemFromList });
             return itemFromList;
         }
     }

     // 2. Try getting from IndexedDB cache
     if (param.id) {
         try {
             const db = await this.initDB();
             const itemFromCache = await db.get(this.storeName, param.id);
             if (itemFromCache) {
                  console.log(\`Found \${this.storeName} with id \${param.id} in cache.\`);
                  this.Detail${pascalCaseName}.set({ ...itemFromCache });
                  // Optionally update the main list if this item wasn't there
                  // this.List${pascalCaseName}.update(list => list.some(p => p.id === itemFromCache.id) ? list : [...list, itemFromCache]);
                  return itemFromCache;
             }
         } catch (dbError) {
             this._errorLogService.logError(\`Failed to get \${this.storeName} from cache\`, dbError);
         }
     }


     // 3. Fetch from API as a last resort or if cache miss
     console.log(\`Workspaceing \${this.storeName} by params from API: \`, param);
     try {
        // Assuming a 'findby' endpoint that accepts POST with params
        const response = await this.fetchApi('/findby', 'POST', param);
        const data = await response.json();
        if (data) { // Assuming findby returns a single object or null/undefined
           this.Detail${pascalCaseName}.set(data);
            // Optionally update the main list signal and cache
            // await this.updateListAndCacheWithSingleItem(data);
           return data;
        } else {
             this.Detail${pascalCaseName}.set({}); // Clear detail if not found
            return null;
        }
     } catch (error) {
       this._errorLogService.logError(\`Failed to get${pascalCaseName}By\`, error);
        this.Detail${pascalCaseName}.set({}); // Clear detail on error
       return null;
     }
   }

  async update${pascalCaseName}(dulieu: Partial<${pascalCaseName}> & { id: string }): Promise<${pascalCaseName} | null> {
      if (!dulieu.id) {
         this._errorLogService.logError('Update failed: ID is missing', dulieu);
         return null;
      }
      // Ensure updatedAt is set
      const dataToUpdate = { ...dulieu, updatedAt: new Date().toISOString() };

      try {
          const response = await this.fetchApi(\`/\${dulieu.id}\`, 'PATCH', dataToUpdate);
          const updatedItem = await response.json();

          // Optimistic update
          this.List${pascalCaseName}.update(list =>
              list.map(item => (item.id === updatedItem.id ? updatedItem : item))
          );
          if (this.${camelCaseName}Id() === updatedItem.id) {
              this.Detail${pascalCaseName}.set({ ...updatedItem }); // Update detail if it's the current one
          }
          await this.saveToCache(this.List${pascalCaseName}()); // Update cache

          return updatedItem;
      } catch (error) {
          this._errorLogService.logError(\`Failed to update${pascalCaseName}\`, error);
          // Consider reverting optimistic update here if needed
          return null;
      }
  }

  async Delete${pascalCaseName}(itemToDelete: { id: string }): Promise<boolean> {
      if (!itemToDelete.id) {
          this._errorLogService.logError('Delete failed: ID is missing', itemToDelete);
         return false;
      }
      try {
          await this.fetchApi(\`/\${itemToDelete.id}\`, 'DELETE');

          // Optimistic update
          this.List${pascalCaseName}.update(list => list.filter(item => item.id !== itemToDelete.id));
          if (this.${camelCaseName}Id() === itemToDelete.id) {
             this.set${pascalCaseName}Id(null); // Clear ID and detail if the deleted item was being viewed
             this.Detail${pascalCaseName}.set({});
          }
          await this.saveToCache(this.List${pascalCaseName}()); // Update cache

          return true; // Indicate success
      } catch (error) {
          this._errorLogService.logError(\`Failed to Delete${pascalCaseName}\`, error);
          // Consider reverting optimistic update here
          return false; // Indicate failure
      }
  }

   // --- WebSocket Logic ---
    connectSocket() {
        // Prevent multiple connections
        if (this.socket?.connected) {
            return;
        }
        const token = this._storageService.getItem('token'); // Get auth token if needed
        this.socket = io(environment.APIURL, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
            timeout: 10000, // Increased timeout
             auth: { token } // Send token for authentication if backend requires
        });

        this.socket.on('connect', () => {
            console.log(\`Socket connected for ${pascalCaseName} updates: \${this.socket?.id}\`);
        });

        this.socket.on(this.SOCKET_EVENT, (data: { action: string, payload: any }) => {
            console.log(\`🔄 Received '\${this.SOCKET_EVENT}' event: \`, data);
             // Invalidate cache by removing the last updated timestamp
            this._storageService.removeItem(this.LAST_UPDATED_KEY);
             // Refetch all data to ensure consistency
             // Add a small delay to avoid potential race conditions if updates are rapid
            setTimeout(() => this.getAll${pascalCaseName}(), 500);
        });

        this.socket.on('disconnect', (reason) => {
            console.warn(\`Socket disconnected for ${pascalCaseName}: \${reason}\`);
            // Handle disconnection, maybe schedule reconnection attempts
        });

        this.socket.on('connect_error', (error) => {
            console.error(\`Socket connection error for ${pascalCaseName}: \`, error);
             this._errorLogService.logError('Socket Connection Error', error);
            // Handle connection errors, e.g., auth issues
        });
    }

    disconnectSocket() {
        this.socket?.disconnect();
        this.socket = null;
        console.log(\`Socket disconnected for ${pascalCaseName} manually.\`);
    }

    // Listen for updates (called from component)
    listen${pascalCaseName}Updates() {
        // Ensure socket is connected before trying to listen
        if (!this.socket || !this.socket.connected) {
            console.warn("Socket not connected, attempting to connect before listening.");
            this.connectSocket(); // Try to connect if not already
        }
        // The actual listening logic is in connectSocket() via socket.on(this.SOCKET_EVENT, ...)
        // This method might just be a placeholder or ensure connection is active.
    }


  // --- IndexedDB Logic ---
  private async initDB(): Promise<IDBPDatabase<any>> {
     if (this.dbPromise) {
         return this.dbPromise;
     }
     this.dbPromise = openDB(this.dbName, 1, { // Version 1
       upgrade: (db, oldVersion, newVersion, transaction) => {
         console.log(\`Upgrading IndexedDB '\${this.dbName}' from version \${oldVersion} to \${newVersion}\`);
         if (!db.objectStoreNames.contains(this.storeName)) {
           const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
           // Add indexes if needed for querying cache directly
           // store.createIndex('masp', 'masp', { unique: true });
           // store.createIndex('title', 'title', { unique: false });
           console.log(\`Object store '\${this.storeName}' created.\`);
         }
          // Handle other upgrade logic if versions change later
       },
     });
     return this.dbPromise;
   }

  private async saveToCache(data: ${pascalCaseName}[]) {
     try {
         const db = await this.initDB();
         const tx = db.transaction(this.storeName, 'readwrite');
         const store = tx.objectStore(this.storeName);
         await store.clear(); // Clear old data before saving new batch
         await Promise.all(data.map(item => store.put(item))); // Batch put
         await tx.done;
          console.log(\`Saved \${data.length} items to \${this.storeName} cache.\`);
     } catch (error) {
         this._errorLogService.logError(\`Failed to save \${this.storeName} to cache\`, error);
     }
   }

    private async loadFromCache(): Promise<void> {
        try {
            const db = await this.initDB();
            const cachedData = await db.getAll(this.storeName);
            if (cachedData.length > 0) {
                this.List${pascalCaseName}.set(cachedData);
                 console.log(\`Loaded \${cachedData.length} items from \${this.storeName} cache on init.\`);
            }
        } catch (error) {
            this._errorLogService.logError(\`Failed to load \${this.storeName} from cache on init\`, error);
        }
    }

    // Helper to update list and cache after getting/creating/updating a single item
    private async updateListAndCacheWithSingleItem(item: ${pascalCaseName}) {
        let updated = false;
        this.List${pascalCaseName}.update(list => {
            const index = list.findIndex(p => p.id === item.id);
            if (index > -1) {
                 list[index] = item; // Update existing
                 updated = true;
                 return [...list];
            } else {
                updated = true;
                return [...list, item]; // Add new
            }
        });
        if(updated) {
            await this.saveToCache(this.List${pascalCaseName}()); // Update cache if list changed
        }
    }

  // --- API Fetch Helper ---
  private async fetchApi(endpoint: string, method: string, body?: any): Promise<Response> {
     const url = \`\${environment.APIURL}/${featureName}\${endpoint}\`; // e.g., /sanpham/1 or /sanpham/findby
     const token = this._storageService.getItem('token');
     const options: RequestInit = {
       method: method,
       headers: {
         'Content-Type': 'application/json',
         // Conditionally add Authorization header if token exists
         ...(token && { 'Authorization': \`Bearer \${token}\` })
       },
       body: body ? JSON.stringify(body) : undefined,
     };

     const response = await fetch(url, options);

     if (!response.ok) {
       // Handle specific HTTP error statuses
       await this.handleError(response); // Throws an error or redirects
     }

     return response; // Return the raw response for further processing
   }

  // --- Error Handling ---
  private async handleError(response: Response) {
     let message = \`Lỗi không xác định (HTTP \${response.status})\`;
     let errorPayload = null;
     try {
       // Try to parse error response from backend
       errorPayload = await response.json();
       message = errorPayload?.message || errorPayload?.error || message;
     } catch (e) {
       // Ignore parsing error if response body is not JSON or empty
     }

     console.error(\`API Error (\${response.status}): \${message}\`, errorPayload);

     switch (response.status) {
       case 401: // Unauthorized
         message = 'Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.';
         this._storageService.removeItem('token'); // Clear invalid token
         this._router.navigate(['/login'], { queryParams: { returnUrl: this._router.url } }); // Redirect to login
         break;
       case 403: // Forbidden
         message = 'Bạn không có quyền thực hiện hành động này.';
          // Optionally navigate to an 'access-denied' page or show a global message
          // this._router.navigate(['/access-denied']);
         break;
       case 404: // Not Found
            // Often handled by the specific function (e.g., getById returns null)
            // Log it but maybe don't redirect globally
            console.warn(\`Resource not found (\${response.url})\`);
            message = 'Không tìm thấy tài nguyên được yêu cầu.';
            // Don't throw for 404 here, let the caller handle null/empty results
           return; // Allow function to return normally (e.g., null)
       case 500: // Internal Server Error
         message = 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau hoặc liên hệ quản trị viên.';
         // Navigate to a generic error page or show a severe error message
         // this._router.navigate(['/error']);
         break;
       // Add other cases as needed (400 Bad Request, 409 Conflict, etc.)
     }

      // Log the error more formally
      this._errorLogService.logError(\`API Error: \${message}\`, {
          status: response.status,
          url: response.url,
          payload: errorPayload
      });

      // Throw an error to be caught by the calling function
      const error = new Error(message) as any;
      error.status = response.status;
      error.payload = errorPayload;
      throw error;
   }
}

// Helper functions (consider moving to a shared utils file)
function GenId(length = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function convertToSlug(str: string): string {
    if (!str) return '';
    return str
        .toLowerCase()
        .trim()
        .normalize('NFD') // separate accent from letter
        .replace(/[\\u0300-\\u036f]/g, '') // remove all separated accents
        .replace(/đ/g, 'd') // convert đ to d
        .replace(/[^\\w\\s-]/g, '') // remove non-alphanumeric characters except spaces and hyphens
        .replace(/\\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-') // remove consecutive hyphens
        .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
}


`);

const typeContent = replacePlaceholders(`
// Define the main interface for a ${pascalCaseName} object
export interface ${pascalCaseName} {
  id: string; // Unique identifier
  title: string; // Tên Sản Phẩm
  masp: string; // Mã Sản Phẩm (unique likely)
  slug?: string; // URL-friendly identifier
  giagoc: number; // Giá Gốc
  dvt: string; // Đơn Vị Tính
  soluong?: number; // Số lượng (optional based on usage)
  soluongkho?: number; // Số lượng kho (optional based on usage)
  haohut?: number; // Hao hụt % (optional based on usage)
  ghichu?: string; // Ghi Chú (optional)
  isActive: boolean; // Status (e.g., for display)
  createdAt: string; // ISO date string for creation time
  updatedAt: string; // ISO date string for last update time

  // Add any other relevant fields below
  // Example: categoryId?: string;
  // Example: imageUrl?: string;
}

// You can also define related types or enums here if needed
// export enum ${pascalCaseName}Status {
//   Active = 'active',
//   Inactive = 'inactive',
//   Discontinued = 'discontinued'
// }

// Type for the structure returned by the /last-updated endpoint (if used)
// export interface LastUpdatedResponse {
//     updatedAt: string;
// }
`);

// Placeholder for a simple routing module or main module file
const routingModuleContent = replacePlaceholders(`
import { Routes } from '@angular/router';

// Lazy load components for better performance
export const ${pascalCaseName.toUpperCase()}_ROUTES: Routes = [
  {
    path: '', // Base path for the feature (e.g., /admin/sanpham)
    loadComponent: () =>
        import('./list${featureName}/list${featureName}.component').then(m => m.List${pascalCaseName}Component),
    children: [
         {
            path: ':id', // Detail route (e.g., /admin/sanpham/123 or /admin/sanpham/new)
            loadComponent: () =>
                import('./detail${featureName}/detail${featureName}.component').then(m => m.Detail${pascalCaseName}Component),
         }
         // Add other child routes for this feature if needed
         // { path: 'settings', loadComponent: ... }
    ]
  },
   // Redirect base path to list view (optional)
   // { path: '', redirectTo: 'list', pathMatch: 'full' }
];
`);


// --- File Generation Logic ---
const filesToGenerate = [
  // Detail Component
  { path: path.join(basePath, `detail${featureName}`, `detail${featureName}.component.html`), content: detailHtmlContent },
  { path: path.join(basePath, `detail${featureName}`, `detail${featureName}.component.scss`), content: detailScssContent },
  { path: path.join(basePath, `detail${featureName}`, `detail${featureName}.component.ts`), content: detailTsContent },
  // List Component
  { path: path.join(basePath, `list${featureName}`, `list${featureName}.component.html`), content: listHtmlContent },
  { path: path.join(basePath, `list${featureName}`, `list${featureName}.component.scss`), content: listScssContent },
  { path: path.join(basePath, `list${featureName}`, `list${featureName}.component.ts`), content: listTsContent },
  // Service
  { path: path.join(basePath, `${featureName}.service.ts`), content: serviceContent },
  // Type Definition
  { path: path.join(basePath, `${featureName}.type.ts`), content: typeContent },
   // Routing Module (Example)
   { path: path.join(basePath, `${featureName}.routes.ts`), content: routingModuleContent },
];

filesToGenerate.forEach(file => {
  const dir = path.dirname(file.path);
  try {
    // Create directory recursively if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`   Thư mục đã tạo: ${dir}`);
    }
    // Write the file content
    fs.writeFileSync(file.path, file.content.trim()); // Use trim() to remove leading/trailing whitespace
    console.log(`   File đã tạo: ${file.path}`);
  } catch (err) {
    console.error(`Lỗi khi tạo file ${file.path}:`, err);
  }
});

console.log(`\nHoàn tất tạo feature ${pascalCaseName}!`);
console.log("Đừng quên cập nhật routing chính của ứng dụng để sử dụng các route mới được tạo (ví dụ: trong app.routes.ts).");
console.log("Kiểm tra lại các đường dẫn import '../../../shared/...' trong các file vừa tạo.");
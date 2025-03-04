import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

async function generateFile(filePath, content) {
    try {
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content.trim());
      console.log(chalk.green(`Created: ${filePath}`));
    } catch (error) {
      console.error(chalk.red(`Error creating ${filePath}:`), error.message);
    }
  }
  
  // Generate all files
 export async function generateAngularFiles({ name, outputDir }) {
   const Viethoa = name.charAt(0).toUpperCase() + name.slice(1);
   const Vietthuong = name.toLowerCase().replace(/\s+/g, '-');
  
 const componentListHTMLContent = 
`<mat-drawer-container class="w-full h-full" autosize>
    <mat-drawer #drawer class="flex flex-col lg:!w-1/2 !w-full h-full" [position]="'end'" mode="over">
        <router-outlet></router-outlet>
    </mat-drawer>
    <div class="flex flex-col space-y-2 h-screen-12 w-full p-2">
        <div class="cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center p-2 bg-white rounded-lg">
            <div class="flex flex-row space-x-2 items-center">
                <button matTooltip="Thêm mới" (click)="create()" color="primary" mat-icon-button>
                    <mat-icon>add_circle</mat-icon>
                </button>
                <button matTooltip="Ẩn hiện cột" mat-icon-button color="primary" [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
                    <mat-icon>tune</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                    <div class="p-4">
                        <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                            <input (input)="doFilterColumns($event)" (click)="$event.stopPropagation()" matInput placeholder="Tìm Kiếm" />
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
                <button matTooltip="Bộ Lọc" color="primary" class="{{isFilter ? '!bg-slate-200' : ''}}" (click)="isFilter = !isFilter" mat-icon-button>
                    <mat-icon>filter_list</mat-icon>
                </button>
                <button matTooltip="Tải file excel Mẫu" (click)="ExportExcel(Listsanpham(),'Sanpham')" color="primary" mat-icon-button>
                    <mat-icon>file_download</mat-icon>
                </button>
                <button matTooltip="Tải lên file excel" (click)="uploadfile.click()" color="primary" mat-icon-button>
                    <mat-icon>file_upload</mat-icon>
                </button>
                <input class="hidden" (change)="ImporExcel($event)" type="file" #uploadfile>
                <button matTooltip="Tải dữ liệu từ drive" (click)="LoadDrive()" color="primary" mat-icon-button>
                    <mat-icon>cloud_download</mat-icon>
                </button>
                <span class="lg:flex hidden whitespace-nowrap p-2 rounded-lg bg-slate-200">
                    {{CountItem}} Nhà Cung Cấp
                </span>
            </div>
        </div>
        <div *ngIf="isFilter" class="w-full grid grid-cols-2 gap-2 lg:flex lg:flex-row lg:space-x-2 items-center">
            <mat-form-field *ngFor="let column of displayedColumns" appearance="outline" subscriptSizing="dynamic">
                <mat-label>{{ ColumnName[column] }}</mat-label>
                <input matInput (keyup)="applyFilter()" [(ngModel)]="filterValues[column]" [ngModelOptions]="{ standalone: true }" placeholder="Vui lòng Nhập {{ column }}" />
            </mat-form-field>
        </div>
        <div class="w-full overflow-auto">
            <table class="!border w-full cursor-pointer" mat-table [dataSource]="dataSource" matSort>
                @for (column of displayedColumns; track column) {
                <ng-container [matColumnDef]="column">
                    <th class="whitespace-nowrap" mat-header-cell *matHeaderCellDef mat-sort-header>
                        <span class="max-w-40 line-clamp-4 me-4">
                            {{ ColumnName[column] }}
                        </span>
                             <span class="z-10 material-symbols-outlined text-gray-500" [matMenuTriggerFor]="menu" #menuTrigger="matMenuTrigger">
                                 filter_alt
                             </span>
                                    <mat-menu  #menu="matMenu">
                                        <div (click)="$event.stopPropagation()"  class="cursor-pointer flex flex-col space-y-4 p-3">                                        
                                        <div class="relative w-full">
                                            <input type="text"
                                                placeholder="Tìm Kiếm..." (keyup)="doFilterHederColumn($event,column)"
                                                class="block w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <span class="material-symbols-outlined text-gray-500">search</span>
                                            </div>
                                        </div>
                                        <div class="flex flex-row space-x-2 items-center justify-between">
                                            <div class="flex flex-row space-x-2 items-center">
                                                <span class="text-xs text-blue-600 underline" (click)="ChosenAll(FilterHederColumn(dataSource.filteredData,column))">Chọn Tất Cả {{FilterHederColumn(dataSource.filteredData,column).length||0}}</span>
                                                <span class="text-xs text-blue-600 underline" (click)="EmptyFiter()">Xoá</span>
                                            </div>
   
                                            <span class="text-xs text-blue-600 underline" (click)="ResetFilter()">Reset</span>
                                        </div>
                                        <div class="w-full flex flex-col space-y-2 max-h-44 overflow-auto">
                                            @for (item of FilterHederColumn(dataSource.filteredData,column); track $index) {
                                                <div (click)="ChosenItem(item)" class="flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100">
                                                   <span *ngIf="CheckItem(item)" class="material-symbols-outlined text-blue-600">check</span>
                                                    {{item[column]||'Trống'}}
                                                </div>
                                            }
                                        </div>
                                        <div class="flex flex-row space-x-2 items-end justify-end">
                                            <button mat-flat-button color="warn" (click)="menuTrigger.closeMenu()">Đóng</button>
                                            <button mat-flat-button color="primary" (click)="ApplyFilterColum(menuTrigger)" >Áp Dụng</button>
                                        </div>
                                        </div>
                                    </mat-menu>
                    </th>
                    <td mat-cell *matCellDef="let row; let idx = index">
                        @switch (column) {
                        @case ('STT') {
                        <span class="max-w-40 line-clamp-4">
                            {{ idx + 1 }}
                        </span>
                        }
                        @case ('createdAt') {
                        <span class="max-w-40 line-clamp-4">
                            {{ row[column]|date:'dd/MM/yyyy'}}
                        </span>
                        }
                        @case ('isActive') {
                        <span class="max-w-40 line-clamp-4">
                            @if (row[column]) {
                            <mat-icon class="text-green-500">check_circle</mat-icon>
                            }
                            @else {
                            <mat-icon class="text-red-500">cancel</mat-icon>
                            }
                        </span>
                        }
                        @case ('updatedAt') {
                        <span class="max-w-40 line-clamp-4">
                            {{ row[column]|date:'dd/MM/yyyy'}}
                        </span>
                        }
                        @default {
                        <span class="max-w-40 line-clamp-4">
                            {{ row[column] }}
                        </span>
                        }
                        }
                    </td>
                </ng-container>
                }
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-slate-100 {{sanphamId()==row.id?'!bg-slate-200':''}}" (click)="goToDetail(row);"></tr>
                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell p-4" colspan="4">Không tìm thấy</td>
                </tr>
            </table>
            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
        </div>
    </div>
</mat-drawer-container>`;
    
const componentListContent = 
`import { AfterViewInit, Component, computed, effect, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SanphamService } from '../sanpham.service';
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
@Component({
  selector: 'app-listsanpham',
  templateUrl: './listsanpham.component.html',
  styleUrls: ['./listsanpham.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatTooltipModule
  ],
})
export class ListSanphamComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'name',
    'mancc',
    'diachi',
    'email',
    'sdt',
    'ghichu',
    'isActive',
    'createdAt',
    'updatedAt',
  ];
  ColumnName: any = {
    name: 'Tên Nhà Cung Cấp',
    mancc: 'Mã Nhà Cung Cấp',
    diachi: 'Địa Chỉ',
    email: 'Email',
    sdt: 'Số Điện Thoại',
    ghichu: 'Ghi Chú',
    isActive: 'Trạng Thái',
    createdAt:'Ngày Tạo',
    updatedAt:'Ngày Cập Nhật'
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('SanphamColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _SanphamService: SanphamService = inject(SanphamService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  Listsanpham:any = this._SanphamService.ListSanpham;
  dataSource = new MatTableDataSource([]);
  sanphamId:any = this._SanphamService.sanphamId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  constructor() {
    this.displayedColumns.forEach(column => {
      this.filterValues[column] = '';
    });
  }
  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach(column => {
        if (filterObject[column]) {
          const value = data[column] ? data[column].toString().toLowerCase() : '';
          isMatch = isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }
  applyFilter() {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  async ngOnInit(): Promise<void> {    
    await this._SanphamService.getAllSanpham();
    this.CountItem = this.Listsanpham().length;
    this.dataSource = new MatTableDataSource(this.Listsanpham());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
    this.initializeColumns();
    this.setupDrawer();
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }
  async refresh() {
   await this._SanphamService.getAllSanpham();
  }
  private initializeColumns(): void {
    this.Columns = Object.keys(this.ColumnName).map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: true,
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem('SanphamColFilter',JSON.stringify(this.FilterColumns)
      );
    }
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
  }

  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = 'over';
          this.paginator.hidePageSize = true;
        } else {
          this.drawer.mode = 'side';
        }
      });
  }
  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }
  FilterHederColumn(list:any,column:any)
  {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList
  }
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listsanpham().filter((v: any) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
    const query = event.target.value.toLowerCase();
    console.log(query,column);
    console.log(this.dataSource.filteredData);   
  }
  ListFilter:any[] =[]
  ChosenItem(item:any)
  {
    if(this.ListFilter.includes(item.id))
    {
      this.ListFilter = this.ListFilter.filter((v) => v !== item.id);
    }
    else{
      this.ListFilter.push(item.id);
    }
    console.log(this.ListFilter);
    
  }
  ChosenAll(list:any)
  {
    list.forEach((v:any) => {
      if(this.ListFilter.includes(v.id))
        {
          this.ListFilter = this.ListFilter.filter((v) => v !== v.id);
        }
        else{
          this.ListFilter.push(v.id);
        }
    });
  }
  ResetFilter()
  {
    this.ListFilter = this.Listsanpham().map((v:any) => v.id);
    this.dataSource.data = this.Listsanpham();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter()
  {
    this.ListFilter = [];
  }
  CheckItem(item:any)
  {
    return this.ListFilter.includes(item.id);
  }
  ApplyFilterColum(menu:any)
  {    
    this.dataSource.data = this.Listsanpham().filter((v: any) => this.ListFilter.includes(v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.data);
    menu.closeMenu();
    
  }
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('SanphamColFilter',JSON.stringify(this.FilterColumns)
    );
  }
  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
  }
  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/sanpham', 0]);
  }
  goToDetail(item: any): void {
     this._SanphamService.setSanphamId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/sanpham', item.id]);
  }
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'NCCImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
   const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
   const data = ConvertDriveData(result.values);
   console.log(data);
   this.DoImportData(data);
    // const updatePromises = data.map(async (v: any) => {
    //   const item = this._KhachhangsService
    //     .ListKhachhang()
    //     .find((v1) => v1.MaKH === v.MaKH);
    //   if (item) {
    //     const item1 = { ...item, ...v };
    //     console.log(item1);

    //     await this._KhachhangsService.updateOneKhachhang(item1);
    //   }
    // });
    // Promise.all(updatePromises).then(() => {
    //   this._snackBar.open('Cập Nhật Thành Công', '', {
    //     duration: 1000,
    //     horizontalPosition: 'end',
    //     verticalPosition: 'top',
    //     panelClass: ['snackbar-success'],
    //   });
    //   //  window.location.reload();
    // });
  }
  DoImportData(data:any)
  {
    console.log(data);
    
    const transformedData = data.map((v: any) => ({
      name: v.name?.trim()||'',
      mancc: v.mancc?.trim()||'',
      sdt: v.sdt?.trim()||'',
      diachi: v.diachi?.trim()||'',
      ghichu: v.ghichu?.trim()||'',
   }));
   // Filter out duplicate mancc values
   const uniqueData = transformedData.filter((value:any, index:any, self:any) => 
      index === self.findIndex((t:any) => (
        t.mancc === value.mancc
      ))
   )
    const listId2 = uniqueData.map((v: any) => v.mancc);
    const listId1 = this._SanphamService.ListSanpham().map((v: any) => v.mancc);
    const listId3 = listId2.filter((item:any) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map(async (v: any) => {
        const item = this._SanphamService.ListSanpham().find((v1) => v1.mancc === v.mancc);
        if (item) {
          const item1 = { ...item, ...v };
          await this._SanphamService.updateSanpham(item1);
        }
        else{
          await this._SanphamService.CreateSanpham(v);
        }
      });
     const disableItem = listId3.map(async (v: any) => {
        const item = this._SanphamService.ListSanpham().find((v1) => v1.mancc === v);
        item.isActive = false;
        await this._SanphamService.updateSanpham(item);
      });
      Promise.all([...createuppdateitem, ...disableItem]).then(() => {
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
       // window.location.reload();
      });
  }
  async ImporExcel(event: any) {
  const data = await readExcelFile(event)
  this.DoImportData(data);
  }   
  ExportExcel(data:any,title:any) {
    writeExcelFile(data,title);
  }
}`;
const componentListCssContent = ``;
const componentDetailHTMLContent = `
<div class="flex flex-row justify-between items-center space-x-2 p-2">
  <button mat-icon-button color="primary" (click)="goBack()">
    <mat-icon>arrow_back</mat-icon>
  </button>
  <div class="font-bold">{{ DetailSanpham()?.title || 'Không có dữ liệu' }}</div>
  <div class="flex flex-row space-x-2 items-center">
    <mat-slide-toggle [(ngModel)]="DetailSanpham().isActive" [disabled]="!isEdit()">{{DetailSanpham().isActive?'Hiển Thị':'Ẩn'}}</mat-slide-toggle>
    <button mat-icon-button color="primary" *ngIf="isEdit()" (click)="handleSanphamAction()">
      <mat-icon>save</mat-icon>
    </button>
    <button mat-icon-button color="primary" *ngIf="!isEdit()" (click)="toggleEdit()">
      <mat-icon>edit</mat-icon>
    </button>
    <button mat-icon-button color="warn" (click)="toggleDelete()">
      <mat-icon>delete</mat-icon>
    </button>
  </div>
</div>

<div class="relative flex flex-col w-full p-4 overflow-auto">
  <!-- Xác nhận Xóa -->
  <ng-container *ngIf="isDelete()">
    <div class="flex flex-col space-y-4 items-center justify-center">
      <div class="font-bold text-2xl">Bạn chắc chắn muốn xoá không?</div>
      <div class="flex flex-row space-x-2 items-center justify-center">
        <button mat-flat-button color="primary" (click)="DeleteData()">Đồng Ý</button>
        <button mat-flat-button color="warn" (click)="toggleDelete()">Huỷ Bỏ</button>
      </div>
    </div>
  </ng-container>

  <!-- Chi tiết Sanpham -->
  <ng-container *ngIf="!isDelete()">
    <!-- <div *ngIf="!isEdit()" class="flex flex-col space-y-2 justify-center items-center border p-4 rounded-lg">
      <div class="font-bold p-2 rounded-lg border">{{ DetailSanpham()?.Nhacungcap?.Title }}</div>
      <div>{{ DetailSanpham()?.CreateAt | date: 'dd/MM/yyyy' }}</div>
      <table class="min-w-full divide-y divide-gray-200 border">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản Phẩm</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số Lượng</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ghi Chú</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let item of DetailSanpham()?.Sanpham; let i = index; trackBy: trackByFn">
            <td class="px-6 py-4 text-sm text-gray-500">{{ i + 1 }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ GetInfoSanpham(item.idSP)?.Title }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ item.Soluong }} {{ GetInfoSanpham(item.idSP)?.dvt }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ item.Ghichu }}</td>
          </tr>
        </tbody>
      </table>
    </div>
 -->
    <ng-container>

      <mat-form-field appearance="outline">
        <mat-label>Tiêu Đề</mat-label>
        <input matInput [(ngModel)]="DetailSanpham().title" (input)="FillSlug()" [disabled]="!isEdit()" placeholder="Vui lòng nhập Tiêu Đề"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Mã Sản Phẩm</mat-label>
        <input matInput [(ngModel)]="DetailSanpham().masp" [disabled]="!isEdit()" placeholder="Vui lòng nhập Mã Sản Phẩm"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Giá Gốc</mat-label>
        <input matInput type="number" [(ngModel)]="DetailSanpham().giagoc" [disabled]="!isEdit()" placeholder="Vui lòng nhập Giá Gốc"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Đơn Vị Tính</mat-label>
        <input matInput [(ngModel)]="DetailSanpham().dvt" [disabled]="!isEdit()" placeholder="Vui lòng nhập Mã Sản Phẩm"/>
      </mat-form-field>
      <div class="flex flex-row space-x-2">
        <mat-form-field appearance="outline">
          <mat-label>Số Lượng</mat-label>
          <input matInput type="number" [(ngModel)]="DetailSanpham().soluong" [disabled]="!isEdit()" placeholder="Vui lòng nhập Mã Sản Phẩm"/>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Số Lượng Kho</mat-label>
          <input matInput type="number" [(ngModel)]="DetailSanpham().soluongkho" [disabled]="!isEdit()" placeholder="Vui lòng nhập Mã Sản Phẩm"/>
        </mat-form-field>
      </div>
 

<!--       
      <mat-form-field appearance="outline">
        <mat-label>Nhà Cung Cấp</mat-label>
        <mat-select [(ngModel)]="Detail.idNCC" (selectionChange)="SelectNhacungcap($event)">
          <mat-option *ngFor="let item of FilterNhacungcap" [value]="item.id">
            {{ item.MaNCC }} - {{ item.Title }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <div class="grid grid-cols-3 gap-2">
        <ng-container *ngFor="let item of Detail?.Sanpham; let idx = index; trackBy: trackByFn">
          <mat-form-field appearance="outline">
            <mat-label>Sản Phẩm</mat-label>
            <mat-select [(ngModel)]="item.idSP" (selectionChange)="SelectSanpham($event)">
              <mat-option *ngFor="let sp of FilterSanpham" [value]="sp.id">
                {{ sp.Title }} [Tồn: {{ sp.Soluong }}{{ sp.dvt }}]
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Số Lượng</mat-label>
            <input matInput [(ngModel)]="item.Soluong" (change)="onChangeSoluong(item, $event)" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Ghi Chú</mat-label>
            <input matInput [(ngModel)]="item.Ghichu" placeholder="Nhập ghi chú" />
          </mat-form-field>
        </ng-container>
      </div>

      <button mat-flat-button color="primary" (click)="addSanpham()">
        <mat-icon>add</mat-icon> Thêm Sản Phẩm
      </button> -->
    </ng-container>

  </ng-container>
</div>`;
const componentDetailContent = `import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ListSanphamComponent } from '../listsanpham/listsanpham.component';
import { SanphamService } from '../sanpham.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailsanpham',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatDialogModule,
      CommonModule,
      MatSlideToggleModule
    ],
    templateUrl: './detailsanpham.component.html',
    styleUrl: './detailsanpham.component.scss'
  })
  export class DetailSanphamComponent {
    _ListsanphamComponent:ListSanphamComponent = inject(ListSanphamComponent)
    _SanphamService:SanphamService = inject(SanphamService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._SanphamService.setSanphamId(id);
      });
  
      effect(async () => {
        const id = this._SanphamService.sanphamId();
      
        if (!id){
          this._router.navigate(['/admin/sanpham']);
          this._ListsanphamComponent.drawer.close();
        }
        if(id === '0'){
          this.DetailSanpham.set({ title: GenId(8, false), slug: GenId(8, false) });
          this._ListsanphamComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/sanpham', "0"]);
        }
        else{
            await this._SanphamService.getSanphamByid(id);
            this._ListsanphamComponent.drawer.open();
            this._router.navigate(['/admin/sanpham', id]);
        }
      });
    }
    DetailSanpham: any = this._SanphamService.DetailSanpham;
    isEdit = signal(false);
    isDelete = signal(false);  
    sanphamId:any = this._SanphamService.sanphamId
    async ngOnInit() {       
    }
    async handleSanphamAction() {
      if (this.sanphamId() === '0') {
        await this.createSanpham();
      }
      else {
        await this.updateSanpham();
      }
    }
    private async createSanpham() {
      try {
        await this._SanphamService.CreateSanpham(this.DetailSanpham());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo sanpham:', error);
      }
    }

    private async updateSanpham() {
      try {
        await this._SanphamService.updateSanpham(this.DetailSanpham());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật sanpham:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._SanphamService.DeleteSanpham(this.DetailSanpham());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/sanpham']);
      } catch (error) {
        console.error('Lỗi khi xóa sanpham:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/sanpham'])
      this._ListsanphamComponent.drawer.close();
    }
    trackByFn(index: number, item: any): any {
      return item.id;
    }
    toggleEdit() {
      this.isEdit.update(value => !value);
    }
    
    toggleDelete() {
      this.isDelete.update(value => !value);
    }
    FillSlug(){
      this.DetailSanpham.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }`;
const componentDetailCssContent = ``;
const componentServiceContent = `
import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
  ) { }
  ListSanpham = signal<any[]>([]);
  DetailSanpham = signal<any>({});
  sanphamId = signal<string | null>(null);
  setSanphamId(id: string | null) {
    this.sanphamId.set(id);
  }
  // getListSanpham(): Signal<any[]> {    
  //   return this.ListSanpham;
  // }
  // getDetailSanpham(): Signal<any | null> {
  //   return this.DetailSanpham;
  // }
  async CreateSanpham(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(\`\${environment.APIURL}/sanpham\`, options);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 403) {
            const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 500) {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          }
        }
        this.getAllSanpham()
        this.sanphamId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }

  async getAllSanpham() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(\`\${environment.APIURL}/sanpham\`, options);
      if (!response.ok) {
        if (response.status === 401) {
          const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 403) {
          const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 500) {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        } else {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        }
      }
      const data = await response.json();           
      this.ListSanpham.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async getSanphamByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(\`\${environment.APIURL}/sanpham/findid/\${id}\`, options);      
      if (!response.ok) {
        if (response.status === 401) {
          const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 403) {
          const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 500) {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        }
      }
      const data = await response.json();      
      this.DetailSanpham.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateSanpham(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(\`\${environment.APIURL}/sanpham/\${dulieu.id}\`, options);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 403) {
            const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 500) {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          }
        }
        this.getAllSanpham()
        this.getSanphamByid(dulieu.id)
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteSanpham(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(\`\${environment.APIURL}/sanpham/\${item.id}\`, options);
          if (!response.ok) {
            if (response.status === 401) {
              const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else if (response.status === 403) {
              const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else if (response.status === 500) {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            }
          }
          this.getAllSanpham()
      } catch (error) {
          return console.error(error);
      }
  }
}`;
const componentTypeContent = ``;
const componentMockdataContent = `export const List${Viethoa}:any[]=[]`;







  const componentListHTMLFile = path.join(outputDir, `${Vietthuong}/list${Vietthuong}/list${Vietthuong}.component.html`);
  const componentListFile = path.join(outputDir, `${Vietthuong}/list${Vietthuong}/list${Vietthuong}.component.ts`);
  const componentListCssFile = path.join(outputDir, `${Vietthuong}/list${Vietthuong}/list${Vietthuong}.component.scss`);

  const componentDetailHTMLFile = path.join(outputDir, `${Vietthuong}/detail${Vietthuong}/detail${Vietthuong}.component.html`);
  const componentDetailFile = path.join(outputDir, `${Vietthuong}/detail${Vietthuong}/detail${Vietthuong}.component.ts`);
  const componentDetailCssFile = path.join(outputDir, `${Vietthuong}/detail${Vietthuong}/detail${Vietthuong}.component.scss`);
  const componentServiceFile = path.join(outputDir, `${Vietthuong}/${Vietthuong}.service.ts`);
  const componentTypeFile = path.join(outputDir, `${Vietthuong}/${Vietthuong}.type.ts`);
  const componentMockdataFile = path.join(outputDir, `${Vietthuong}/${Vietthuong}.ts`);

  await generateFile(componentListHTMLFile, componentListHTMLContent);
  await generateFile(componentListFile, componentListContent);
  await generateFile(componentListCssFile, componentListCssContent);

  await generateFile(componentDetailHTMLFile, componentDetailHTMLContent);
  await generateFile(componentDetailFile, componentDetailContent);
  await generateFile(componentDetailCssFile, componentDetailCssContent);

  await generateFile(componentServiceFile, componentServiceContent);
  await generateFile(componentTypeFile, componentTypeContent);
  await generateFile(componentMockdataFile, componentMockdataContent);
}


// Main function


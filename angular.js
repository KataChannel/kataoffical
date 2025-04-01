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
    <div class="flex flex-col space-y-2 h-screen-16 w-full p-2">
        <div *ngIf="!isSearch"
            class="border p-1 cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center bg-white rounded-lg">
            <div class="w-full flex flex-row space-x-2 items-center">
                <button matTooltip="Thêm mới" (click)="create()" color="primary" mat-icon-button>
                    <mat-icon>add_circle</mat-icon>
                </button>
                <button matTooltip="Ẩn hiện cột" mat-icon-button color="primary" [matMenuTriggerFor]="menu"
                    aria-label="Example icon-button with a menu">
                    <mat-icon>tune</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                    <div class="p-4">
                        <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                            <input (input)="doFilterColumns($event)" (click)="$event.stopPropagation()" matInput
                                placeholder="Tìm Kiếm" />
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
                <button matTooltip="Tải file excel Mẫu" (click)="ExportExcel(Listsanpham(),'Sanpham')" color="primary"
                    mat-icon-button>
                    <mat-icon>file_download</mat-icon>
                </button>
                <button matTooltip="Tải lên file excel" (click)="uploadfile.click()" color="primary" mat-icon-button>
                    <mat-icon>file_upload</mat-icon>
                </button>
                <input class="hidden" (change)="ImporExcel($event)" type="file" #uploadfile>
                <button matTooltip="Tải dữ liệu từ drive" (click)="OpenLoadDrive(LoadDriveDialog)" color="primary" mat-icon-button>
                    <mat-icon>cloud_download</mat-icon>
                </button>
                <span class="lg:flex hidden whitespace-nowrap p-2 rounded-lg bg-slate-200">
                    {{this.Listsanpham().length}} Sản Phẩm
                </span>
                <button *ngIf="EditList.length > 0" matTooltip="Xoá" (click)="openDeleteDialog(DeleteDialog)"
                    color="warn" mat-icon-button>
                    <mat-icon>delete</mat-icon>
                </button>
            </div>
        </div>
        <div *ngIf="isSearch" class="border p-1 py-2 w-full flex flex-row space-x-2 items-center">
            <div class="flex items-center">   
                <div class="relative w-full">
                    <div class="absolute text-blue-600 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <mat-icon>search</mat-icon>
                    </div>
                    <input type="text" (keyup)="applyFilter($event)" placeholder="Vui lòng Tìm Kiếm" class="w-full max-w-2xl border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"/>
                </div>
                <button mat-icon-button color="warn" (click)="isSearch=!isSearch"><mat-icon>cancel</mat-icon></button>
            </div>
            
        </div>
        <div class="border rounded-lg w-full h-full overflow-auto">
            <table class="!border w-full cursor-pointer" mat-table [dataSource]="dataSource" matSort>
                @for (column of displayedColumns; track column) {
                <ng-container [matColumnDef]="column">
                    <th class="whitespace-nowrap" mat-header-cell *matHeaderCellDef mat-sort-header>
                        <span class="max-w-40 line-clamp-4 me-4">
                            {{ ColumnName[column] }}
                        </span>
                        <app-searchfilter [icon]="'filter_alt'" [ListItem]="this.Listsanpham()"
                            [ListFilter]="ListFilter" [filterItem]="FilterHederColumn(dataSource.filteredData,column)"
                            (OutFilter)="onOutFilter($event)"></app-searchfilter>

                    </th>
                    <td mat-cell *matCellDef="let row; let idx = index">
                        @switch (column) {
                        @case ('masp') {
                        <span (click)="goToDetail(row);" class="max-w-40 line-clamp-4 font-bold text-blue-600">
                            {{ row[column] }}
                        </span>
                        }
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
                        @case ('haohut') {
                        <span class="max-w-40 line-clamp-4">
                            {{ row[column]}}%
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
                <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                    class="hover:bg-slate-100 {{CheckItemInEdit(row)?'!bg-slate-200':''}}" (click)="AddToEdit(row);">
                </tr>
                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell p-4" colspan="4">Không tìm thấy</td>
                </tr>
            </table>
        </div>
        <div class="cursor-pointer border rounded-lg px-3 p-1 flex flex-row space-x-2 items-center justify-between">
            <div
                class="w-full flex lg:p-0 p-2 lg:flex-row lg:space-x-2 lg:items-center lg:justify-between flex-col justify-center">
                <span class="w-full text-center">Đang Xem <strong>{{ (currentPage - 1) * pageSize + 1 }}</strong> -
                    <strong>{{ currentPage * pageSize > totalItems ? totalItems : currentPage * pageSize }}</strong>
                    trong số {{ totalItems }} mục, {{ currentPage }}/{{totalPages}} Trang</span>
                <div class="w-full flex flex-row space-x-2 items-center lg:justify-end justify-center">
                    <span class="font-bold text-blue-600" [matMenuTriggerFor]="menu" #menuHienthi="matMenuTrigger">Hiện
                        Thị : {{pageSize}} mục</span>
                    <mat-menu #menu="matMenu">
                        <div class="w-full flex flex-col space-y-2 p-4" (click)="$event.stopPropagation()">
                            <span>Số Lượng</span>
                            <mat-form-field appearance="outline" subscriptSizing="dynamic">
                                <input matInput [(ngModel)]="pageSize" [ngModelOptions]="{ standalone: true }"
                                    placeholder="Vui lòng Nhập Số Lượng" />
                            </mat-form-field>
                            <button mat-flat-button color="primary" (click)="onPageSizeChange(pageSize,menuHienthi)">Áp
                                Dụng</button>
                        </div>
                    </mat-menu>
                    <div class="pagination-controls">
                        <button mat-icon-button color="primary" [disabled]="currentPage === 1"
                            (click)="onPreviousPage()">
                            <mat-icon>keyboard_arrow_left</mat-icon>
                        </button>
                        <button mat-icon-button color="primary" [disabled]="currentPage === totalPages"
                            (click)="onNextPage()">
                            <mat-icon>keyboard_arrow_right</mat-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</mat-drawer-container>

<ng-template #DeleteDialog>
    <mat-dialog-content>
        <div class="flex flex-col space-y-8 items-center justify-center">
            <div class="font-bold">Xác Nhận</div>
            <div>Bạn chắc chắn muốn xoá không?</div>
            <div class="flex flex-row space-x-2 items-center justify-center">
                <button mat-flat-button color="primary" mat-dialog-close="true">Đồng Ý</button>
                <button mat-flat-button color="warn" mat-dialog-close="false">Huỷ Bỏ</button>
            </div>
        </div>
    </mat-dialog-content>
</ng-template>


<ng-template #LoadDriveDialog>
    <mat-dialog-content class="!w-screen !h-screen !max-h-screen !relative !flex flex-col space-y-8 items-center justify-center">
            <div class="relative flex flex-row space-x-2 items-center">
                <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                     <mat-label>IdSheet</mat-label>
                    <input matInput [(ngModel)]="IdSheet"  [ngModelOptions]="{ standalone: true }" placeholder="Vui lòng Nhập IdSheet" />
                </mat-form-field> 
                <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
                     <mat-label>SheetName</mat-label>
                    <input matInput [(ngModel)]="SheetName"  [ngModelOptions]="{ standalone: true }" placeholder="Vui lòng Nhập SheetName" />
                </mat-form-field> 
                <button (click)="LoadDrive()" matTooltip="Load Dữ Liệu" color="primary" mat-icon-button>
                    <mat-icon>refresh</mat-icon>
                </button>
            </div>
            <div class="relative h-full w-full overflow-auto">
                <app-ktable [ListItem]="ImportIteam" [ColumnName]="ImportColumnName" [displayedColumns]="ImportdisplayedColumns"></app-ktable>          
            </div>

            <div class="relative flex flex-row space-x-2 items-center justify-center">
                <button mat-flat-button color="primary" mat-dialog-close="true">Đồng Ý</button>
                <button mat-flat-button color="warn" mat-dialog-close="false">Huỷ Bỏ</button>
            </div>
    </mat-dialog-content>
</ng-template>`;
    
const componentListContent = 
`import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, TemplateRef, ViewChild } from '@angular/core';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { env } from 'process';
import { environment } from '../../../../environments/environment.development';
import { KtableComponent } from '../../../shared/common/ktable/ktable.component';
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
    MatTooltipModule,
    MatDialogModule,
    SearchfilterComponent,
    KtableComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSanphamComponent {
  displayedColumns: string[] = [];
  ColumnName: any = {
    title: 'Tên Sản Phẩm',
    masp: 'Mã Sản Phẩm',
    giagoc: 'Giá Gốc',
    dvt: 'Đơn Vị Tính',
    soluong: 'SL',
    soluongkho: 'SL Kho',
    haohut: 'Hao Hụt',
    ghichu: 'Ghi Chú',
    createdAt: 'Ngày Tạo'
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('SanphamColFilter') || '[]'
  );
  Columns: any[] = [];
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  private _SanphamService: SanphamService = inject(SanphamService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  Listsanpham:any = this._SanphamService.ListSanpham;
  EditList:any=[];
  dataSource = new MatTableDataSource([]);
  sanphamId:any = this._SanphamService.sanphamId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  isSearch: boolean = false;
  constructor() {
    effect(() => {
      this.dataSource.data = this.Listsanpham();
      console.log(this.Listsanpham());
      
      this.totalItems = this.Listsanpham().length;
      this.calculateTotalPages();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async ngOnInit(): Promise<void> {    
    this._SanphamService.listenSanphamUpdates();
    await this._SanphamService.getAllSanpham();
    this.displayedColumns = Object.keys(this.ColumnName)
    console.log(this.displayedColumns);
    this.updateDisplayData();
    this.dataSource = new MatTableDataSource(this.Listsanpham());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
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
  @memoize()
  FilterHederColumn(list:any,column:any)
  {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList
  }
  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listsanpham().filter((v: any) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
    const query = event.target.value.toLowerCase();  
  }
  ListFilter:any[] =[]
  ChosenItem(item:any,column:any)
  {
    const CheckItem = this.dataSource.filteredData.filter((v:any)=>v[column]===item[column]);
    const CheckItem1 = this.ListFilter.filter((v:any)=>v[column]===item[column]);
    if(CheckItem1.length>0)
    {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    }
    else{
      this.ListFilter = [...this.ListFilter,...CheckItem];
    }
  }
  ChosenAll(list:any)
  {
    list.forEach((v:any) => {
      const CheckItem = this.ListFilter.find((v1)=>v1.id===v.id)?true:false;
      if(CheckItem)
        {
          this.ListFilter = this.ListFilter.filter((v) => v.id !== v.id);
        }
        else{
          this.ListFilter.push(v);
        }
    });
  }
  ResetFilter()
  {
    this.ListFilter = this.Listsanpham();
    // this.dataSource.data = this.Listsanpham();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  EmptyFiter()
  {
    this.ListFilter = [];
  }
  CheckItem(item:any)
  {
    return this.ListFilter.find((v)=>v.id===item.id)?true:false;
  }
  ApplyFilterColum(menu:any)
  {    
    this.dataSource.data = this.Listsanpham().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  onOutFilter(event:any)
  {    
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this._router.navigate(['admin/sanpham', 'new']);
  }
  openDeleteDialog(teamplate: TemplateRef<any>) {
      const dialogDeleteRef = this._dialog.open(teamplate, {
        hasBackdrop: true,
        disableClose: true,
      });
      dialogDeleteRef.afterClosed().subscribe((result) => {
        if (result=="true") {
          this.DeleteListItem();
        }
      });
  }
  DeleteListItem(): void {
    this.EditList.forEach((item: any) => {
      this._SanphamService.DeleteSanpham(item);
    });
    this.EditList = [];
    this._snackBar.open('Xóa Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });


  }
  AddToEdit(item: any): void {
    const existingItem = this.EditList.find((v: any) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v: any) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }
  CheckItemInEdit(item: any): boolean {
    return this.EditList.some((v: any) => v.id === item.id);
  }
  goToDetail(item: any): void {
    this.drawer.open();
    this._SanphamService.setSanphamId(item.id);
    this._router.navigate(['admin/sanpham', item.id]);
  }
  OpenLoadDrive(teamplate: TemplateRef<any>)
  {
    const dialogDeleteRef = this._dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result=="true") {
      }
    });
  }
  IdSheet:any='15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk'
  SheetName:any= 'SPImport'
  ImportIteam:any=[]
  ImportColumnName:any = {}
  ImportdisplayedColumns:any[] = []
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: this.IdSheet,
      SheetName: this.SheetName,
      ApiKey: environment.GSApiKey,
    };
   const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
   this.ImportIteam = ConvertDriveData(result.values);
  //  console.log(result.values[0]);
  //  console.log(result.values[1]);
   this.ImportColumnName = Object.fromEntries(result.values[0].map((key:any, i:any) => [key, result.values[1][i]]));
   this.ImportdisplayedColumns = result.values[0]
  //  console.log(this.ImportColumnName);
  //  console.log(this.ImportdisplayedColumns);
  //  console.log(this.ImportIteam);
   
  //  this.DoImportData(data);
  }

  async DoImportData(data: any) {
    const transformedData = data.map((v: any) => ({
      title: v.title?.trim() || '',
      masp: v.masp?.trim() || '',
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt?.trim() || '',
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      haohut: Number(v.haohut) || 0,
      ghichu: v.ghichu?.trim() || '',
    }));

    // Filter out duplicate masp values
    const uniqueData = Array.from(new Map(transformedData.map((item:any) => [item.masp, item])).values());
    const existingSanpham = this._SanphamService.ListSanpham();
    const existingMasp  = existingSanpham.map((v: any) => v.masp);
    const newMasp = uniqueData.map((v: any) => v.masp).filter((item: any) => !existingMasp.includes(item));

    await Promise.all(uniqueData.map(async (v: any) => {
      const existingItem = existingSanpham.find((v1: any) => v1.masp === v.masp);
      if (existingItem) {
        const updatedItem = { ...existingItem, ...v };
        await this._SanphamService.updateSanpham(updatedItem);
      } else {
        await this._SanphamService.CreateSanpham(v);
      }
    }));
    await Promise.all(existingSanpham
      .filter(sp => !uniqueData.some((item:any) => item.masp === sp.masp))
      .map(sp => this._SanphamService.updateSanpham({ ...sp, isActive: false }))
    );

    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }
  
  async ImporExcel(event: any) {
  const data = await readExcelFile(event)
  this.DoImportData(data);
  }   
  ExportExcel(data:any,title:any) {
    const dulieu = data.map((v: any) => ({
      title: v.title,
      masp: v.masp,
      giagoc: v.giagoc,
      dvt: v.dvt,
      soluong: v.soluong,
      soluongkho: v.soluongkho,
      haohut: v.haohut,
      ghichu: v.ghichu,
    }));
    writeExcelFile(dulieu,title);
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
  }






calculateTotalPages() {
  this.totalPages = Math.ceil(this.totalItems / this.pageSize);
}

onPageSizeChange(size: number,menuHienthi:any) {
  if(size>this.Listsanpham().length){
    this.pageSize = this.Listsanpham().length;
    this._snackBar.open(\`Số lượng tối đa \${this.Listsanpham().length}\`, '', {
      duration: 1000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['snackbar-success'],
    });
  }
  else {
    this.pageSize = size;
  }
  this.currentPage = 1; // Reset to first page when changing page size
  this.calculateTotalPages();
  this.updateDisplayData();
  menuHienthi.closeMenu();
}

onPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateDisplayData();
  }
}

onNextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updateDisplayData();
  }
}

updateDisplayData() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  const pageData = this.Listsanpham().slice(startIndex, endIndex);
  this.dataSource.data = pageData;
  }
}




function memoize() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const cache = new Map();

    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      return result;
    };

    return descriptor;
  };
}

function Debounce(delay: number = 300) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    let timeoutId: any;

    descriptor.value = function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };

    return descriptor;
  };
}`;
const componentListCssContent = ``;
const componentDetailHTMLContent = `<div class="flex flex-row justify-between items-center space-x-2 p-2">
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
    <!-- <button mat-icon-button color="warn" (click)="toggleDelete()">
      <mat-icon>delete</mat-icon>
    </button> -->
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
        <input matInput [(ngModel)]="DetailSanpham().title" [disabled]="!isEdit()" placeholder="Vui lòng nhập Tiêu Đề"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Mã Sản Phẩm</mat-label>
        <input matInput [(ngModel)]="DetailSanpham().masp" [disabled]="true" placeholder="Vui lòng nhập Mã Sản Phẩm"/>
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
        <mat-form-field appearance="outline">
          <mat-label>Hao Hụt %</mat-label>
          <input matInput type="number" [(ngModel)]="DetailSanpham().haohut" [disabled]="!isEdit()" placeholder="Vui lòng nhập haohut"/>
        </mat-form-field>
      </div>
    </div>
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
        if(id === 'new'){
          this.DetailSanpham.set({});
          this._ListsanphamComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/sanpham', "new"]);
        }
        else{
            await this._SanphamService.getSanphamBy({id:id});
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
      if (this.sanphamId() === 'new') {
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
const componentServiceContent = `import { Inject, Injectable, signal,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { io } from 'socket.io-client';
import { openDB } from 'idb';
import { ErrorLogService } from '../../shared/services/errorlog.service';
@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
    private _ErrorLogService: ErrorLogService,
  ) { }
  ListSanpham = signal<any[]>([]);
  DetailSanpham = signal<any>({});
  sanphamId = signal<string | null>(null);
  setSanphamId(id: string | null) {
    this.sanphamId.set(id);
  }
    private socket = io(\`\${environment.APIURL}\`,{
    transports: ['websocket'],
    reconnectionAttempts: 5,
    timeout: 5000,
  });
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
          this.handleError(response.status);
        }
        this.getAllSanpham()
        this.sanphamId.set(data.id)
    } catch (error) {
        this._ErrorLogService.logError('Failed to CreateSanpham', error);
        return console.error(error);
    }
  }

  async getAllSanpham() {
    const db = await this.initDB();
    const cachedData = await db.getAll('sanphams');
    const updatedAtCache = this._StorageService.getItem('sanphams_updatedAt') || '0';
    // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
    if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
      this.ListSanpham.set(cachedData);
      return cachedData;
    }
    try {
      // Gọi API chỉ để lấy \`updatedAt\` mới nhất
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this._StorageService.getItem('token')}\`
        },
      };
      const lastUpdatedResponse = await fetch(\`\${environment.APIURL}/sanpham/last-updated\`, options);
      if (!lastUpdatedResponse.ok) {
        this.handleError(lastUpdatedResponse.status);
        return cachedData;
      }    
      const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
      //Nếu cache vẫn mới, không cần tải lại dữ liệu
      if (updatedAtServer <= updatedAtCache) {
        this.ListSanpham.set(cachedData);
        return cachedData;
      }
      console.log(updatedAtServer, updatedAtCache); 
      //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
      const response = await fetch(\`\${environment.APIURL}/sanpham\`, options);
      if (!response.ok) {
        this.handleError(response.status);
        return cachedData;
      }
      const data = await response.json();
      await this.saveSanphams(data);
      this._StorageService.setItem('sanphams_updatedAt', updatedAtServer);
      this.ListSanpham.set(data);
      return data;
    } catch (error) {
      this._ErrorLogService.logError('Failed to create getAllSanpham', error);
      console.error(error);
      return cachedData;
    }
  }


  //Lắng nghe cập nhật từ WebSocket
  listenSanphamUpdates() {
    this.socket.on('sanpham-updated', async () => {
      console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
      this._StorageService.removeItem('sanphams_updatedAt');
      await this.getAllSanpham();
    });
  }
  //Khởi tạo IndexedDB
  private async initDB() {
    return await openDB('SanphamDB', 1, {
      upgrade(db) {
        db.createObjectStore('sanphams', { keyPath: 'id' });
      },
    });
  }
  // Lưu vào IndexedDB
  private async saveSanphams(data: any[]) {
    const db = await this.initDB();
    const tx = db.transaction('sanphams', 'readwrite');
    const store = tx.objectStore('sanphams');
    await store.clear(); // Xóa dữ liệu cũ
    data.forEach(item => store.put(item));
    await tx.done;
  }

  async getSanphamBy(param: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this._StorageService.getItem('token')}\`
        },
        body: JSON.stringify(param),
      };
      const response = await fetch(\`\${environment.APIURL}/sanpham/findby\`, options);      
      if (!response.ok) {
        this.handleError(response.status);
      }
      const data = await response.json();      
      this.DetailSanpham.set(data)
    } catch (error) {
      this._ErrorLogService.logError('Failed to getSanphamBy', error);
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
          this.handleError(response.status);
        }
        this.getAllSanpham()
        this.getSanphamBy({id:data.id})
    } catch (error) {
      this._ErrorLogService.logError('Failed to updateSanpham', error);
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
            this.handleError(response.status);
          }
          this.getAllSanpham()
      } catch (error) {
        this._ErrorLogService.logError('Failed to DeleteSanpham', error);
          return console.error(error);
      }
  }
  private handleError(status: number) {
    let message = 'Lỗi không xác định';
    switch (status) {
      case 401:
        message = 'Vui lòng đăng nhập lại';
        break;
      case 403:
        message = 'Bạn không có quyền truy cập';
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
        break;
    }
    const result = JSON.stringify({ code: status, title: message });
    this.router.navigate(['/errorserver'], { queryParams: { data: result } });
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


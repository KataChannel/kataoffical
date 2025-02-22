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
    const pascalCaseName = name.charAt(0).toUpperCase() + name.slice(1);
   const dasherizedName = name.toLowerCase().replace(/\s+/g, '-');
  
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
                <button matTooltip="Tải file excel Mẫu" (click)="writeExcelFile()" color="primary" mat-icon-button>
                    <mat-icon>file_download</mat-icon>
                </button>
                <button matTooltip="Tải lên file excel" (click)="uploadfile.click()" color="primary" mat-icon-button>
                    <mat-icon>file_upload</mat-icon>
                </button>
                <input class="hidden" (change)="readExcelFile($event)" type="file" #uploadfile>
                <button matTooltip="Tải dữ liệu từ drive" (click)="LoadDrive()" color="primary" mat-icon-button>
                    <mat-icon>cloud_download</mat-icon>
                </button>
                <span class="lg:flex hidden whitespace-nowrap p-2 rounded-lg bg-slate-200">
                    {{CountItem}} Đơn hàng
                </span>
            </div>
        </div>
        <div *ngIf="isFilter" class="w-full grid grid-cols-2 gap-2 lg:flex lg:flex-row lg:space-x-2 items-center">
            <mat-form-field *ngFor="let column of displayedColumns" appearance="outline" subscriptSizing="dynamic">
                <mat-label>{{ column }}</mat-label>
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
                    </th>
                    <td mat-cell *matCellDef="let row; let idx = index">
                        @switch (column) {
                        @case ('Sanpham') {
                        <span class="max-w-40 line-clamp-4">
                            {{ row[column].length }}
                        </span>
                        }
                        @case ('idNCC') {
                        <span class="max-w-40 line-clamp-4">
                            {{ GetNhacungcap(row[column])?.Title }}
                            {{ GetNhacungcap(row[column])?.email }}
                            {{ GetNhacungcap(row[column])?.SDT }}
                        </span>
                        }
                        @case ('STT') {
                        <span class="max-w-40 line-clamp-4">
                            {{ idx + 1 }}
                        </span>
                        }
                        @case ('CreateAt') {
                        <span class="max-w-40 line-clamp-4">
                            {{ row[column] | date: 'dd/MM/yyyy' }}
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
                <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="goToDetail(row);"></tr>
                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell p-4" colspan="4">Không tìm thấy</td>
                </tr>
            </table>
            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
        </div>
    </div>
</mat-drawer-container>`;
    
const componentListContent = `
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Forms, ListDathangncc } from './listdathangncc';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DonnccsService } from './listdathangncc.service';
import { NhacungcapsService } from '../../nhacungcap/listnhacungcap/listnhacungcap.service';
@Component({
  selector: 'app-listdathangncc',
  templateUrl: './listdathangncc.component.html',
  styleUrls: ['./listdathangncc.component.scss'],
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
export class ListDathangnccComponent {
  Detail: any = {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'STT',
    'MaDH',
    'idNCC',
    'Sanpham',
    'CreateAt',
  ];
  ColumnName: any = {
    STT: 'STT',
    MaDH: 'Mã Đơn hàng',
    idNCC: 'Nhà Cung Cấp',
    Sanpham: 'Sản Phẩm',
    CreateAt: 'Ngày Tạo',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('dathangncc_FilterColumns') || '[]'
  );
  Columns: any[] = [];
  Listdathangncc: any[] = [];
  ListNhacungcap: any[] = [];
  isFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _nhacungcapsService: NhacungcapsService = inject(NhacungcapsService);
  private _DonnccsService: DonnccsService = inject(DonnccsService);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _router: Router
  ) {
    this.displayedColumns.forEach(column => {
      this.filterValues[column] = '';
    });
  }
  createFilter(): (data: any, filter: string) => boolean {    
    return (data, filter) => {
      const filterObject = JSON.parse(filter); // Chuyển đổi filter từ string sang object
      let isMatch = true;
      console.log(data, filter);
      // Kiểm tra từng điều kiện lọc
      this.displayedColumns.forEach(column => {
        if (filterObject[column]) {
          isMatch = isMatch && data[column].toString().toLowerCase().includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }

  // Hàm áp dụng bộ lọc
  applyFilter() {
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  async ngOnInit(): Promise<void> {
    await this._DonnccsService.getAllDonncc();
    this.Listdathangncc = this._DonnccsService.ListDonncc();
    this.CountItem = this.Listdathangncc.length;
    const ids = this.Listdathangncc.map(v =>v.idNCC);
    console.log(ids);
    this._nhacungcapsService.Findlistid(ids).then((data:any)=>{
      if(data){this.ListNhacungcap = data} 
    })
    console.log(this.Listdathangncc);
    this.initializeColumns();
    this.setupDataSource();
    this.setupDrawer();
  }
  GetNhacungcap(id: any): any {
    return this.ListNhacungcap.find((v) => v.id === id);
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
      localStorage.setItem(
        'dathangncc_FilterColumns',
        JSON.stringify(this.FilterColumns)
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

  private setupDataSource(): void {
    this.dataSource = new MatTableDataSource(this.Listdathangncc);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
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
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    this.setupDataSource();
    localStorage.setItem(
      'dathangncc_FilterColumns',
      JSON.stringify(this.FilterColumns)
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
    this._router.navigate(['admin/dathangncc', 0]);
  }
  goToDetail(item: any): void {
    this.drawer.open();
    this.Detail = item;
    this._router.navigate(['admin/dathangncc', item.id]);
  }
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'Khachhangimport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
    // const result: any = await this._DonhangsService.getDrive(DriveInfo);
    // const data = ConvertDriveData(result.values);
    // console.log(data);
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
  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(jsonData);
      // const transformedData = jsonData.map((v: any) => ({
      //   Title: v.Title.trim(),
      //   MaSP: v.MaSP.trim(),
      //   giagoc: Number(v.giagoc),
      //   dvt: v.dvt,
      // }));
      // const updatePromises = jsonData.map(async (v: any) => {
      //   const item = this._KhachhangsService
      //     .ListKhachhang()
      //     .find((v1) => v1.MaKH === v.MaKH);
      //   if (item) {
      //     const item1 = { ...item, ...v };
      //     //await this._KhachhangsService.updateOneKhachhang(item1);
      //   }
      // });
    //   Promise.all(updatePromises).then(() => {
    //     this._snackBar.open('Cập Nhật Thành Công', '', {
    //       duration: 1000,
    //       horizontalPosition: 'end',
    //       verticalPosition: 'top',
    //       panelClass: ['snackbar-success'],
    //     });
    //     window.location.reload();
    //   });
    // };
    // fileReader.readAsArrayBuffer(file);
  }
  }   
  writeExcelFile() {
    // this._KhachhangsService.ListKhachhang();
    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
    //   this._KhachhangsService.ListKhachhang()
    // );
    // const workbook: XLSX.WorkBook = {
    //   Sheets: { Sheet1: worksheet },
    //   SheetNames: ['Sheet1'],
    // };
    // const excelBuffer: any = XLSX.write(workbook, {
    //   bookType: 'xlsx',
    //   type: 'array',
    // });
    // this.saveAsExcelFile(
    //   excelBuffer,
    //   'danhsachkhachhang_' + moment().format('DD_MM_YYYY')
    // );
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    // const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    // const url: string = window.URL.createObjectURL(data);
    // const link: HTMLAnchorElement = document.createElement('a');
    // link.href = url;
    // link.download = \`\${fileName}.xlsx\`\;
    // link.click();
    // window.URL.revokeObjectURL(url);
    // link.remove();
  }
}`;
const componentListCssContent = ``;
const componentDetailHTMLContent = `
<div class="flex flex-row justify-between items-center space-x-2 p-2">
  <button mat-icon-button color="primary" (click)="goBack()">
      <mat-icon>arrow_back</mat-icon>
  </button>
  <div class="font-bold">{{Detail?.MaDH||'Không có dữ liệu'}}</div>
  <div class="flex flex-row space-x-2 items-center">
    @if(isEdit==true){
      <button mat-icon-button color="primary" (click)="SaveData()">
          <mat-icon>save</mat-icon>
      </button>
    }
    @else{
      <button mat-icon-button color="primary" (click)="isEdit=true">
          <mat-icon>edit</mat-icon>

      </button>
    }
      <button mat-icon-button color="warn" (click)="isDelete=true">
          <mat-icon>delete</mat-icon>
      </button>
  </div>
</div>
<div class="relative flex flex-col w-full p-4 overflow-auto">
  @if(isDelete==true){
    <div class="flex flex-col space-y-4 items-center justify-center">
      <div class="font-bold text-2xl">Bạn chắc chắn muốn xoá không?</div>
      <div class="flex flex-row space-x-2 items-center justify-center">
        <button mat-flat-button color="primary" (click)="DeleteData()">
          Đồng Ý
        </button>
        <button mat-flat-button color="warn" (click)="isDelete=false">
          Huỷ Bỏ
        </button>
      </div>
    </div>
  }
  @else {
    <div *ngIf="!isEdit" class="flex flex-col space-y-2 justify-center items-center border p-4 rounded-lg">
        <div class="font-bold p-2 rounded-lg border">{{Detail?.Nhacungcap?.Title}}</div>
        <div>{{Detail?.CreateAt|date:'dd/MM/yyyy'}}</div>
        <table class="min-w-full divide-y divide-gray-200 border">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sản Phẩm
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số Lượng
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ghi Chú
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let item of Detail.Sanpham; let i = index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ i + 1 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ GetInfoSanpham(item.idSP)?.Title }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.Soluong }}   {{ GetInfoSanpham(item.idSP)?.dvt }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.Ghichu }}
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    <div *ngIf="isEdit" class="flex flex-col space-y-2">
      <mat-form-field appearance="outline" subscriptSizing="dynamic">
        <mat-label>Nhà Cung Cấp</mat-label>
        <mat-select [disabled]="!isEdit" [(ngModel)]="Detail.idNCC" [ngModelOptions]="{ standalone: true }"
          (selectionChange)="SelectNhacungcap($event)">
          <div class="w-full flex flex-col px-4">
            <div class="flex flex-row space-x-2 items-center">
              <mat-form-field appearance="outline" class="w-full p-2" subscriptSizing="dynamic">
                <input matInput (input)="DoFindNhacungcap($event)" placeholder="Tìm Kiếm" />
              </mat-form-field>
              <button mat-icon-button color="primary" (click)="CreateNCC()">
                <mat-icon>add_circle</mat-icon>
              </button>
            </div>
            <div class="overflow-y-auto max-h-44">
              @for (item of FilterNhacungcap; track item.id) {
              <mat-option [value]="item.id">{{item.MaNCC}} - {{item.Title}}</mat-option>
              }
            </div>
          </div>
        </mat-select>
      </mat-form-field>
      <div class="grid grid-cols-3 gap-2">
      @for (item of Detail.Sanpham; track item.id; let idx = $index) {
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Sản Phẩm</mat-label>
          <mat-select [disabled]="!isEdit"  [(ngModel)]="Detail.Sanpham[idx].idSP" [ngModelOptions]="{ standalone: true }"
            (selectionChange)="SelectSanpham($event)">
            <div class="w-full flex flex-col px-4">
              <div class="flex flex-row space-x-2 items-center">
                <mat-form-field appearance="outline" class="w-full p-2" subscriptSizing="dynamic">
                  <input matInput (input)="DoFindSanpham($event)" placeholder="Tìm Kiếm" />
                </mat-form-field>
                <button mat-icon-button color="primary">
                  <mat-icon>add_circle</mat-icon>
                </button>
              </div>
              <div class="overflow-y-auto max-h-44">
                @for (item of FilterSanpham; track item.id) {
                <mat-option [value]="item.id">{{item.Title}} [Tồn : {{item.Soluong}}{{item.dvt}}]</mat-option>
                }
              </div>
            </div>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
          <mat-label>Số Lượng</mat-label>
          <input matInput [disabled]="!isEdit" [(ngModel)]="item.Soluong" (change)="onChangeSoluong(item,$event)"  [ngModelOptions]="{ standalone: true }" placeholder="Vui lòng Nhập Số Điện Thoại" />
      </mat-form-field> 
        <mat-form-field appearance="outline" class="w-full" subscriptSizing="dynamic">
          <mat-label>Ghi Chú</mat-label>
          <input matInput [disabled]="!isEdit" [(ngModel)]="Detail.Sanpham[idx].Ghichu"  [ngModelOptions]="{ standalone: true }" placeholder="Vui lòng Nhập Ghi Chú" />
      </mat-form-field> 
      }
    </div>
     <div>
      <button [disabled]="!isEdit" mat-flat-button color="primary" (click)="Detail.Sanpham.push({idSP:'',Soluong:0,Ghichu:''})">
        <span>Thêm</span>
        <mat-icon>add</mat-icon>
      </button>
     </div>

      </div>

    <!-- @for (item of Detail?.Forms; track item.id; let idx = $index) {
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>{{item.Title}}</mat-label>
        <input matInput [(ngModel)]="Detail?.Data[item.value]" [disabled]="!isEdit" [ngModelOptions]="{standalone: true}" [placeholder]="item.Title">
      </mat-form-field>
    }
    @empty {
      <span class="p-2 text-center">There are no items.</span>
     } -->
  }
</div>
`;
const componentDetailContent = `
import { Component, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Forms, ListDathangncc } from '../listdathangncc';
import { ListDathangnccComponent } from '../listdathangncc.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DonnccsService } from '../listdathangncc.service';
import { randomUUID } from 'crypto';
import { GenId, genMaDonhang } from '../../../../shared/shared.utils';
import { MatSelectModule } from '@angular/material/select';
import { SanphamService } from '../../../main-admin/sanpham/sanpham.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NhacungcapsService } from '../../../nhacungcap/listnhacungcap/listnhacungcap.service';
  @Component({
    selector: 'app-detaildathangncc',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatDialogModule,
      CommonModule
    ],
    templateUrl: './detaildathangncc.component.html',
    styleUrl: './detaildathangncc.component.scss'
  })
  export class DetailDathangnccComponent {
    _ListdathangnccComponent:ListDathangnccComponent = inject(ListDathangnccComponent)
    _NhacungcapsService:NhacungcapsService = inject(NhacungcapsService)
    _DonnccsService:DonnccsService = inject(DonnccsService)
    _SanphamService:SanphamService = inject(SanphamService)
    _router:ActivatedRoute = inject(ActivatedRoute)
    _route:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){}
    Detail:any={Sanpham:[]}
    Nhacungcap:any={}
    isEdit:boolean=false
    isDelete:boolean=false
    idDathangncc:any
    FilterNhacungcap:any[]=[]
    ListNhacungcap:any[]=[]
    FilterSanpham:any[]=[]
    ListSanpham:any[]=[]
    ngOnInit(): void {
      this._router.paramMap.subscribe(async (data: any) => {
        this.idDathangncc = data.get('id')
        this.isEdit = this.idDathangncc === '0';   
        if(!this.idDathangncc){
          this._route.navigate(['/admin/dathangncc'])
        }
        else{
          this._ListdathangnccComponent.drawer.open();
          this._NhacungcapsService.getAllNhacungcap().then((data:any)=>{
            this.FilterNhacungcap = this.ListNhacungcap = data
          })
          this._SanphamService.getAllSanpham().then((data:any)=>{
            this.FilterSanpham = this.ListSanpham = data
          })
          if(this.idDathangncc !== '0'){
            this._DonnccsService.getDonnccByid(this.idDathangncc).then((data:any)=>{
              if(data){
                this.Detail = data
                this.Detail.Nhacungcap = this.ListNhacungcap.find(v => v.id === this.Detail.idNCC)
                console.log(data);
                
              }
            })
          } else {
            this.Detail={Sanpham:[]}
            this.Detail.MaDH = GenId(8,false) 
          }
        }
      });   
    }
    SaveData()
    {
      if(this.idDathangncc=='0')
      {
        this._DonnccsService.CreateDonncc(this.Detail).then((data:any)=>{
          this._snackBar.open('Tạo Mới Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
          this._route.navigate(['/admin/dathangncc', data.id]);
        })
      }
      else
      {
        this._DonnccsService.updateOneDonncc(this.Detail).then((data:any)=>{
          this._snackBar.open('Cập Nhật Thành Công', '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-success'],
          });
         this.isEdit = false
        })
      } 
    }
    DeleteData()
    {
      this._DonnccsService.DeleteDonncc(this.Detail).then((data:any)=>{
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
        this._route.navigate(['/admin/dathangncc'])
      })
    }
    goBack(){
      this._route.navigate(['/admin/dathangncc'])
      this._ListdathangnccComponent.drawer.close();
    }
    DoFindNhacungcap(event:any){
        const query = event.target.value.toLowerCase();
        this.FilterNhacungcap = this.ListNhacungcap.filter(v => v.Title.toLowerCase().includes(query)||v.MaNCC.toLowerCase().includes(query));      
      }
    SelectNhacungcap(event:any){     
        const selectedNhacungcap = this.ListNhacungcap.find(v => v.id === event.value);      
        if (selectedNhacungcap) {
          this.Detail.Nhacungcap = {
            ...this.Detail.Nhacungcap,
            TenKH: selectedNhacungcap.TenKH,
            SDT: selectedNhacungcap.SDT,
            Diachi: selectedNhacungcap.Diachi
          };
          this.Detail.idBanggia = selectedNhacungcap.idBanggia
        }
      }
    DoFindSanpham(event:any){
        const query = event.target.value.toLowerCase();
        this.FilterSanpham = this.ListSanpham.filter(v => v.Title.toLowerCase().includes(query));      
      }
    SelectSanpham(event:any){           
        // const selectedSanpham = this.ListSanpham.find(v => v.id === event.value);      
        // if (selectedSanpham) {
        //   this.Detail.Nhacungcap = {
        //     ...this.Detail.Nhacungcap,
        //     TenKH: selectedSanpham.TenKH,
        //     SDT: selectedNhacungcap.SDT,
        //     Diachi: selectedNhacungcap.Diachi
        //   };
        //   this.Detail.idBanggia = selectedNhacungcap.idBanggia
        // }
      }
    onChangeSoluong(item:any,event:any){
        this.Detail.Soluong = event.target.value
        this.Detail.Thanhtien = this.Detail.Soluong * this.Detail.Dongia
      }
    dialog = inject(MatDialog);
    dialogRef:any
    OpenDialogAddNhacungcap(TemplateRef:TemplateRef<any>) {
     this.dialogRef = this.dialog.open(TemplateRef);
    }
    CreateNCC(){
      this._route.navigate(['admin/nhacungcap', 0]);
    }
    GetInfoSanpham(id:any){      
      return this.ListSanpham.find(v => v.id ===id)
    }
  }`;
const componentDetailCssContent = ``;
const componentServiceContent = `
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DonnccsService {
  private isBrowser: boolean;
  constructor(
    private _StorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ListDonncc = signal<any[]>([]);
  Donncc = signal<any>({});
  async CreateDonncc(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(\`\${environment.APIURL}/donncc\`\, options);
        if (!response.ok) {
          throw new Error(\`\HTTP error! status: \${response.status}\`\);
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
        this.getAllDonncc()
        return data;
    } catch (error) {
        return console.error(error);
    }
  }

  async getAllDonncc() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(\`\${environment.APIURL}/donncc\`\, options);
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
      this.ListDonncc.set(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchDonncc(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(\`\${environment.APIURL}/setting/search\`,options);
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
          this.Donncc.set(data.items)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getDonnccByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(\`\${environment.APIURL}/donncc/findid/\${id}\`, options);
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
      this.Donncc.set(data)
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async updateOneDonncc(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(\`\${environment.APIURL}/donncc/\${dulieu.id}\`, options);
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
        this.getAllDonncc()
        return data;
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteDonncc(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(\`\${environment.APIURL}/donncc/\${item.id}\`, options);
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
          this.getAllDonncc()
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}
  `;
const componentTypeContent = ``;
const componentMockdataContent = `export const List${pascalCaseName}:any[]=[]`;







  const componentListHTMLFile = path.join(outputDir, `${dasherizedName}/list${dasherizedName}/list${dasherizedName}.component.html`);
  const componentListFile = path.join(outputDir, `${dasherizedName}/list${dasherizedName}/list${dasherizedName}.component.ts`);
  const componentListCssFile = path.join(outputDir, `${dasherizedName}/list${dasherizedName}/list${dasherizedName}.component.scss`);

  const componentDetailHTMLFile = path.join(outputDir, `${dasherizedName}/detail${dasherizedName}/detail${dasherizedName}.component.html`);
  const componentDetailFile = path.join(outputDir, `${dasherizedName}/detail${dasherizedName}/detail${dasherizedName}.component.ts`);
  const componentDetailCssFile = path.join(outputDir, `${dasherizedName}/detail${dasherizedName}/detail${dasherizedName}.component.scss`);
  const componentServiceFile = path.join(outputDir, `${dasherizedName}/${dasherizedName}.service.ts`);
  const componentTypeFile = path.join(outputDir, `${dasherizedName}/${dasherizedName}.type.ts`);
  const componentMockdataFile = path.join(outputDir, `${dasherizedName}/${dasherizedName}.ts`);

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


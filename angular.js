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
                    {{CountItem}} Menu
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
            <table class="!border w-full cursor-pointer" mat-table [dataSource]="dataSource()" matSort>
                @for (column of displayedColumns; track column) {
                <ng-container [matColumnDef]="column">
                    <th class="whitespace-nowrap" mat-header-cell *matHeaderCellDef mat-sort-header>
                        <span class="max-w-40 line-clamp-4 me-4">
                            {{ ColumnName[column] }}
                        </span>
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
                <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-slate-100 {{menuId()==row.id?'!bg-slate-200':''}}" (click)="goToDetail(row);"></tr>
                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell p-4" colspan="4">Không tìm thấy</td>
                </tr>
            </table>
            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
        </div>
    </div>
</mat-drawer-container>`;
    
const componentListContent = `import { AfterViewInit, Component, computed, effect, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { MenuService } from '../menu.service';
import moment from 'moment';
@Component({
  selector: 'app-listmenu',
  templateUrl: './listmenu.component.html',
  styleUrls: ['./listmenu.component.scss'],
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
export class ListMenuComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'STT',
    'title',
    'slug',
    'parent',
    'order',
    'isActive',
    'createdAt',
    'updatedAt',
  ];
  ColumnName: any = {
    STT: 'STT',
    title: 'Tiêu Đề',
    slug: 'Đường Dẫn',
    parent: 'Menu Cha',
    order: 'Thứ Tự',
    isActive: 'Trạng Thái',
    createdAt:'Ngày Tạo',
    updatedAt:'Ngày Cập Nhật'
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('MenuColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _MenuService: MenuService = inject(MenuService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _router: Router = inject(Router);
  Listmenu:any = this._MenuService.ListMenu;
  dataSource = computed(() => {
    const ds = new MatTableDataSource(this.Listmenu());
    ds.filterPredicate = this.createFilter();
    ds.paginator = this.paginator;
    ds.sort = this.sort;
    return ds;
  });
  menuId:any = this._MenuService.menuId;
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
    this.dataSource().filter = JSON.stringify(this.filterValues);
  }
  async ngOnInit(): Promise<void> {    
    await this._MenuService.getAllMenu();
    this.CountItem = this.Listmenu().length;
    this.initializeColumns();
    this.setupDrawer();
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }
  async refresh() {
   await this._MenuService.getAllMenu();
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
      localStorage.setItem('MenuColFilter',JSON.stringify(this.FilterColumns)
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
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('MenuColFilter',JSON.stringify(this.FilterColumns)
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
    this._router.navigate(['admin/menu', 0]);
  }
  goToDetail(item: any): void {
     this._MenuService.setMenuId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/menu', item.id]);
  }
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
    // link.download = \`\${fileName}.xlsx\`;
    // link.click();
    // window.URL.revokeObjectURL(url);
    // link.remove();
  }
}`;
const componentListCssContent = ``;
const componentDetailHTMLContent = `<div class="flex flex-row justify-between items-center space-x-2 p-2">
  <button mat-icon-button color="primary" (click)="goBack()">
    <mat-icon>arrow_back</mat-icon>
  </button>
  <div class="font-bold">{{ DetailMenu()?.title || 'Không có dữ liệu' }}</div>
  <div class="flex flex-row space-x-2 items-center">
    <button mat-icon-button color="primary" *ngIf="isEdit()" (click)="handleMenuAction()">
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

  <!-- Chi tiết Menu -->
  <ng-container *ngIf="!isDelete()">
    <!-- <div *ngIf="!isEdit()" class="flex flex-col space-y-2 justify-center items-center border p-4 rounded-lg">
      <div class="font-bold p-2 rounded-lg border">{{ DetailMenu()?.Nhacungcap?.Title }}</div>
      <div>{{ DetailMenu()?.CreateAt | date: 'dd/MM/yyyy' }}</div>
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
          <tr *ngFor="let item of DetailMenu()?.Sanpham; let i = index; trackBy: trackByFn">
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
        <input matInput [(ngModel)]="DetailMenu().title" (input)="FillSlug()" [disabled]="!isEdit()" placeholder="Vui lòng nhập Tiêu Đề"/>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Slug</mat-label>
        <input matInput [(ngModel)]="DetailMenu().slug" [disabled]="!isEdit()" placeholder="Vui lòng nhập Slug"/>
      </mat-form-field>

      <mat-slide-toggle [(ngModel)]="DetailMenu().isActive" [disabled]="!isEdit()">{{DetailMenu().isActive?'Hiển Thị':'Ẩn'}}</mat-slide-toggle>

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
</div>
`;
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
import { ListMenuComponent } from '../listmenu/listmenu.component';
import { MenuService } from '../menu.service';
import { convertToSlug, GenId } from '../../../../shared/utils/shared.utils';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
  @Component({
    selector: 'app-detailmenu',
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
    templateUrl: './detailmenu.component.html',
    styleUrl: './detailmenu.component.scss'
  })
  export class DetailMenuComponent {
    _ListmenuComponent:ListMenuComponent = inject(ListMenuComponent)
    _MenuService:MenuService = inject(MenuService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._MenuService.setMenuId(id);
      });
  
      effect(async () => {
        const id = this._MenuService.menuId();
      
        if (!id){
          this._router.navigate(['/admin/menu']);
          this._ListmenuComponent.drawer.close();
        }
        if(id === '0'){
          this.DetailMenu.set({ title: GenId(8, false), slug: GenId(8, false) });
          this._ListmenuComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/menu', "0"]);
        }
        else{
            await this._MenuService.getMenuByid(id);
            this._ListmenuComponent.drawer.open();
            this._router.navigate(['/admin/menu', id]);
        }
      });
    }
    DetailMenu: any = this._MenuService.DetailMenu;
    isEdit = signal(false);
    isDelete = signal(false);  
    menuId:any = this._MenuService.menuId
    async ngOnInit() {       
    }
    async handleMenuAction() {
      if (this.menuId() === '0') {
        await this.createMenu();
      }
      else {
        await this.updateMenu();
      }
    }
    private async createMenu() {
      try {
        await this._MenuService.CreateMenu({ title: GenId(8,false), slug: GenId(8,false) });
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo menu:', error);
      }
    }

    private async updateMenu() {
      try {
        await this._MenuService.updateMenu(this.DetailMenu());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật menu:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._MenuService.DeleteMenu(this.DetailMenu());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/menu']);
      } catch (error) {
        console.error('Lỗi khi xóa menu:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/menu'])
      this._ListmenuComponent.drawer.close();
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
      this.DetailMenu.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }`;
const componentDetailCssContent = ``;
const componentServiceContent = `import { Inject, Injectable, signal,Signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../shared/utils/storage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private _StorageService: StorageService,
    private router: Router,
  ) { }
  ListMenu = signal<any[]>([]);
  DetailMenu = signal<any>({});
  menuId = signal<string | null>(null);
  setMenuId(id: string | null) {
    this.menuId.set(id);
  }
  // getListMenu(): Signal<any[]> {    
  //   return this.ListMenu;
  // }
  // getDetailMenu(): Signal<any | null> {
  //   return this.DetailMenu;
  // }
  async CreateMenu(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(\`\${environment.APIURL}/menu\`, options);
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
        this.getAllMenu()
        this.menuId.set(data.id)
    } catch (error) {
        return console.error(error);
    }
  }

  async getAllMenu() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(\`\${environment.APIURL}/menu\`, options);
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
      this.ListMenu.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async getMenuByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(\`\${environment.APIURL}/menu/findid/\${id}\`, options);      
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
      this.DetailMenu.set(data)
    } catch (error) {
      return console.error(error);
    }
  }
  async updateMenu(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(\`\${environment.APIURL}/menu/\${dulieu.id}\`, options);
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
        this.getAllMenu()
        this.getMenuByid(dulieu.id)
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteMenu(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(\`\${environment.APIURL}/menu/\${item.id}\`, options);
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
          this.getAllMenu()
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


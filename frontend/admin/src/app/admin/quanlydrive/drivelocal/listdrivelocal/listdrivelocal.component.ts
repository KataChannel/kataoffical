import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { KtableComponent } from '../../../../shared/common/ktable/ktable.component';
import { SearchfilterComponent } from '../../../../shared/common/searchfilter/searchfilter.component';
import { GoogleSheetService } from '../../../../shared/googlesheets/googlesheets.service';
import { readExcelFile, writeExcelFile } from '../../../../shared/utils/exceldrive.utils';
import { ConvertDriveData } from '../../../../shared/utils/shared.utils';
import { QuanlydriveService } from '../../quanlydrive.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';  
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
  @Component({
    selector: 'app-listdrivelocal',
    templateUrl: './listdrivelocal.component.html',
    styleUrls: ['./listdrivelocal.component.scss'],
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
      // SearchfilterComponent,
      KtableComponent,
      MatProgressBarModule,
      ScrollingModule,
      MatProgressSpinnerModule,
      MatDatepickerModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ListDrivelocalComponent {
    displayedColumns: string[] = [];
    ColumnName: any = {
      name: 'Tên',
      path: 'Đường Dẫn',
      size: 'Dung Lượng',
      type: 'Loại',
      modifiedTime: 'Ngày Tạo Drive',
      createdTime:'Ngày Cập Nhật Drive',
    };
    FilterColumns: any[] = JSON.parse(
      localStorage.getItem('DrivelocalColFilter') || '[]'
    );
    Columns: any[] = [];
    totalItems = 0;
    totalPages = 1;
    params:any ={
        name: "",
        type: "",
        mimeType: "",
        parentId: "",
        size: { min: 0, max: 100 },
        modifiedTime: { 
          from: new Date(), 
          to: new Date() 
        },
        // modifiedTime: new Date("2024-01-01T00:00:00Z"),
        page: 1,
        pageSize: 100
    }
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
    private _DrivelocalService: QuanlydriveService = inject(QuanlydriveService);
    private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
    private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
    private _router: Router = inject(Router);
    private _dialog: MatDialog = inject(MatDialog);
    EditList:any=[];
    dataSource = new MatTableDataSource([]);
    drivelocalId:any = this._DrivelocalService.quanlydriveId;
    _snackBar: MatSnackBar = inject(MatSnackBar);
    CountItem: any = 0;
    isSearch: boolean = false;
    constructor() {
      effect(async () => {
        this.SearchItems = await this._DrivelocalService.SearchQuanlydriveBy(this.params);
        this.dataSource.data = this.SearchItems.data;
        this.totalItems = this.SearchItems.data.length; // Update totalItems with the length of ListItem
        this.progress = this._DrivelocalService.progress;
        this.totalRecords = this._DrivelocalService.totalRecords;
      });
    }
  progress = signal<any>(0);
  totalRecords = signal<any>(0);
  status = 'Idle';
  ListItem:any = [];
  SearchItems:any = {
     data: [],
      pagination: {
          total: 0,
          page:0
      }
  };
  currentPage = 1;
  pageSize = 10; // Có thể lấy từ localStorage hoặc cấu hình
  async syncRecords(){
    await this._DrivelocalService.syncRecords();
    }
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    async ngOnInit(): Promise<void> {    
      this._DrivelocalService.listenQuanlydriveUpdates();
      this.SearchItems = await this._DrivelocalService.SearchQuanlydriveBy(this.params);
      this.displayedColumns = Object.keys(this.ColumnName)
      // this.updateDisplayData();
      this.dataSource = new MatTableDataSource(this.SearchItems.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
    }

    isLoading = signal<boolean>(false);

    async DoTimKiem(isReset?: boolean) {
      this.SearchItems.pagination.page = 0     
      this.isLoading.set(true);
        if (isReset) {
          this.params.pageSize = 100;
          this.params.page = 1;
        }
        this.SearchItems = await this._DrivelocalService.SearchQuanlydriveBy(this.params);      
        this.dataSource.data = this.SearchItems.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.SearchItems.pagination.page > 0){
          this.isLoading.set(false);
        }

    }

    titleMB(item:any){
      const OneMB = 1048576
      const OneGB = 1024*OneMB
      if(Number(item)>OneGB)
      {
        return (Number(item) / OneGB).toFixed(2) + ' GB';
      }
      else {
        return `${(Number(item) / OneMB).toFixed(2)} MB`;
      }
    }
    getPath(item:any){
     return item.replace(/\/\*\//g, '<span class="text-red-600 font-bold"> / </span>'); // Fixed syntax error
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
        localStorage.setItem('DrivelocalColFilter',JSON.stringify(this.FilterColumns)
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
      this.dataSource.filteredData = this.SearchItems.data.filter((v: any) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
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
      this.ListFilter = this.SearchItems.data;
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
      this.dataSource.data = this.SearchItems.data.filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
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
      localStorage.setItem('DrivelocalColFilter',JSON.stringify(this.FilterColumns)
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
      this._router.navigate(['admin/drivelocal', 'new']);
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
      const itemCount = this.EditList.length;
      if (itemCount === 0) {
        this._snackBar.open('Không có mục nào được chọn để xóa', '', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning']
        });
        return;
      }

      let processedCount = 0;
      const deletePromises = this.EditList.map(async (item: any) => {
        item.isDelete = true;
        await this._DrivelocalService.updateQuanlydrive(item);
        processedCount++;
        return true;
      });

      Promise.all(deletePromises)
        .then(() => {
          this._snackBar.open(`Đã xóa thành công ${itemCount} mục`, '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.EditList = []; // Reset selection
          this.DoTimKiem(true); // Reload with fresh data
        })
        .catch(error => {
          console.error('Error during deletion:', error);
          this._snackBar.open('Có lỗi xảy ra khi xóa dữ liệu', '', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
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
      this._DrivelocalService.setQuanlydriveId(item.id);
      this._router.navigate(['admin/drivelocal', item.id]);
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
  
  onPageSizeChange(menuHienthi:any) {
    if(this.params.pageSize > this.SearchItems.pagination.total){
      this.params.pageSize  = this.SearchItems.pagination.total;
      this._snackBar.open(`Số lượng tối đa ${this.SearchItems.pagination.total}`, '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
    }
    this.params.page = 1; // Reset to first page when changing page size
    this.DoTimKiem();
    menuHienthi.closeMenu();
  }
  
  onPreviousPage() {
    if (this.params.page > 1) {
      this.params.page = this.params.page - 1;
      this.DoTimKiem();
    }
  }
  
  onNextPage() {
    if (this.params.page < this.SearchItems.pagination.totalPages) {
      this.params.page = this.params.page + 1;
      this.DoTimKiem();
    }
  }
  
  updateDisplayData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageData = this.SearchItems.data.slice(startIndex, endIndex);
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
  }
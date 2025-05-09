import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, TemplateRef, ViewChild } from '@angular/core';
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
  import { UserguideService } from '../userguide.service';
  import { MatMenuModule } from '@angular/material/menu';
  import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
  import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
  import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
  import { MatDialog, MatDialogModule } from '@angular/material/dialog';
  import { environment } from '../../../../environments/environment.development';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
  @Component({
    selector: 'app-listuserguide',
    templateUrl: './listuserguide.component.html',
    styleUrls: ['./listuserguide.component.scss'],
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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ListUserguideComponent {
    displayedColumns: string[] = [];
    ColumnName: any = {
      title: 'Tiêu Đề',
      codeId: 'Mã',
      time: 'Thời Gian',
      description: 'Mô Tả',
      order: 'Thứ Tự',
      createdAt: 'Ngày Tạo',
      updatedAt: 'Ngày Cập Nhật',
    };
    FilterColumns: any[] = JSON.parse(
      localStorage.getItem('UserguideColFilter') || '[]'
    );
    Columns: any[] = [];
    totalItems = 0;
    pageSize = 10;
    currentPage = 1;
    totalPages = 1;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
    private _UserguideService: UserguideService = inject(UserguideService);
    private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
    private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
    private _router: Router = inject(Router);
    private _dialog: MatDialog = inject(MatDialog);
    Listuserguide:any = this._UserguideService.ListUserguide;
    EditList:any=[];
    dataSource = new MatTableDataSource([]);
    userguideId:any = this._UserguideService.userguideId;
    _snackBar: MatSnackBar = inject(MatSnackBar);
    CountItem: any = 0;
    isSearch: boolean = false;
    constructor() {
      effect(() => {
        this.dataSource.data = this.Listuserguide();
        console.log(this.Listuserguide());
        
        this.totalItems = this.Listuserguide().length;
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
      this._UserguideService.listenUserguideUpdates();
      await this._UserguideService.getAllUserguide();
      this.displayedColumns = Object.keys(this.ColumnName)
      console.log(this.displayedColumns);
      this.updateDisplayData();
      this.dataSource = new MatTableDataSource(this.Listuserguide());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
    }
    async refresh() {
     await this._UserguideService.getAllUserguide();
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
        localStorage.setItem('UserguideColFilter',JSON.stringify(this.FilterColumns)
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
      this.dataSource.filteredData = this.Listuserguide().filter((v: any) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
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
      this.ListFilter = this.Listuserguide();
      // this.dataSource.data = this.Listuserguide();
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
      this.dataSource.data = this.Listuserguide().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
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
      localStorage.setItem('UserguideColFilter',JSON.stringify(this.FilterColumns)
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
      this._router.navigate(['admin/userguide', 'new']);
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
        this._UserguideService.DeleteUserguide(item);
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
      this._UserguideService.setUserguideId(item.id);
      this._router.navigate(['admin/userguide', item.id]);
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
      const existingUserguide = this._UserguideService.ListUserguide();
      const existingMasp  = existingUserguide.map((v: any) => v.masp);
      const newMasp = uniqueData.map((v: any) => v.masp).filter((item: any) => !existingMasp.includes(item));
  
      await Promise.all(uniqueData.map(async (v: any) => {
        const existingItem = existingUserguide.find((v1: any) => v1.masp === v.masp);
        if (existingItem) {
          const updatedItem = { ...existingItem, ...v };
          await this._UserguideService.updateUserguide(updatedItem);
        } else {
          await this._UserguideService.CreateUserguide(v);
        }
      }));
      await Promise.all(existingUserguide
        .filter(sp => !uniqueData.some((item:any) => item.masp === sp.masp))
        .map(sp => this._UserguideService.updateUserguide({ ...sp, isActive: false }))
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
    if(size>this.Listuserguide().length){
      this.pageSize = this.Listuserguide().length;
      this._snackBar.open(`Số lượng tối đa ${this.Listuserguide().length}`, '', {
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
    const pageData = this.Listuserguide().slice(startIndex, endIndex);
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
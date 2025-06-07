import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, signal, TemplateRef, ViewChild } from '@angular/core';
 import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
  import { MatSort, MatSortModule } from '@angular/material/sort';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { MatInputModule } from '@angular/material/input';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
  import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
  import { Router, RouterOutlet } from '@angular/router';
  import { MatIconModule } from '@angular/material/icon';
  import { MatButtonModule } from '@angular/material/button';
  import { MatSelectModule } from '@angular/material/select';
  import { CommonModule } from '@angular/common';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { FormsModule } from '@angular/forms';
  import { MatTooltipModule } from '@angular/material/tooltip';
  import { MatMenuModule } from '@angular/material/menu';
  import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'kata-table',
  imports: [
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    displayedColumns: string[] = [];
    ColumnWidth: any = {};
    @Input() ColumnName: any = {};
    FilterColumns: any[] = JSON.parse(
      localStorage.getItem('SettingColumnFilter') || '[]'
    );
    Columns: any[] = [];
    @Input() Pagination: any = {
      totalItems: 0,
      pageSize: 10,
      currentPage: 1,
      totalPages: 1,
    };
    @Input() Listsetting: any = signal<any[]>([]);
    @Input() EditList: any = signal<any[]>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    private _router: Router = inject(Router);
    private _dialog: MatDialog = inject(MatDialog);

    dataSource = new MatTableDataSource([]);
    _snackBar: MatSnackBar = inject(MatSnackBar);
    CountItem: any = 0;
    isSearch: boolean = false;
    constructor() {
      effect(() => {
        this.dataSource.data = this.Listsetting();
        this.Pagination.totalItems = this.Listsetting().length;
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
      this.displayedColumns = Object.keys(this.ColumnName)
      this.updateDisplayData();
      this.dataSource = new MatTableDataSource(this.Listsetting());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeColumns();
    }
    async refresh() {
      this.Listsetting = signal<any[]>([]);
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
        localStorage.setItem('SettingColFilter',JSON.stringify(this.FilterColumns)
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
  
    toggleColumn(item: any): void {
      const column = this.FilterColumns.find((v) => v.key === item.key);
      if (column) {
        column.isShow = !column.isShow;
        this.updateDisplayedColumns();
      }
    }
    goToDetail(item: any): void {
      this._router.navigate([`/detail/${item.id}`]);
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
      this.dataSource.filteredData = this.Listsetting().filter((v: any) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
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
      this.ListFilter = this.Listsetting();
      // this.dataSource.data = this.Listsetting();
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
      this.dataSource.data = this.Listsetting().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
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
      localStorage.setItem('SettingColFilter',JSON.stringify(this.FilterColumns)
      );
    }
    doFilterColumns(event: any): void {
      const query = event.target.value.toLowerCase();
      this.FilterColumns = this.Columns.filter((v) =>
        v.value.toLowerCase().includes(query)
      );
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
    trackByFn(index: number, item: any): any {
      return item.id; // Use a unique identifier
    }


  calculateTotalPages() {
    this.Pagination.totalPages = Math.ceil(this.Pagination.totalItems / this.Pagination.pageSize);
  }

  onPageSizeChange(size: number, menuHienthi: any) {
    if (size > this.Listsetting().length) {
      this.Pagination.pageSize = this.Listsetting().length;
      this._snackBar.open(`Số lượng tối đa ${this.Listsetting().length}`, '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
    }
    else {
      this.Pagination.pageSize = size;
    }
    this.Pagination.currentPage = 1; // Reset to first page when changing page size
    this.calculateTotalPages();
    this.updateDisplayData();
    menuHienthi.closeMenu();
  }
  
  onPreviousPage() {
    if (this.Pagination.currentPage > 1) {
      this.Pagination.currentPage--;
      this.updateDisplayData();
    }
  }
  
  onNextPage() {
    if (this.Pagination.currentPage < this.Pagination.totalPages) {
      this.Pagination.currentPage++;
      this.updateDisplayData();
    }
  }
  
  updateDisplayData() {
    const startIndex = (this.Pagination.currentPage - 1) * this.Pagination.pageSize;
    const endIndex = startIndex + this.Pagination.pageSize;
    const pageData = this.Listsetting().slice(startIndex, endIndex);
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
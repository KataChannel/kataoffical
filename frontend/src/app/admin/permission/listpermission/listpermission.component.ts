import { ChangeDetectionStrategy, Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-listpermission',
  templateUrl: './listpermission.component.html',
  styleUrls: ['./listpermission.component.scss'],
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
    SearchfilterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPermissionComponent implements OnInit {
  
  displayedColumns: string[] = ['stt', 'codeId', 'name', 'group', 'description', 'status', 'createdAt'];
  readonly AllColumn: string[] = ['stt', 'codeId', 'name', 'group', 'description', 'status', 'order', 'createdAt', 'updatedAt'];
  readonly ColumnName: Record<string, string> = {
    stt: '#',
    codeId: 'Code',
    name: 'Tiêu Đề',
    group: 'Nhóm',
    description: 'Mô Tả',
    status: 'Trạng Thái',
    order: 'Thứ Tự',
    createdAt: 'Ngày Tạo',
    updatedAt: 'Ngày Cập Nhật'
  };

  FilterColumns: { key: string; value: string; isShow: boolean }[] = [];
  dataSource = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer') drawer!: MatDrawer;

  // Services
  constructor(
    private permissionService: PermissionService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // State - initialized after constructor
  Listpermission!: () => any[];
  ListFilter: any[] = [];
  EditList: any[] = [];
  
  // Pagination
  page = signal(1);
  pageSize = signal(50);
  total = signal(0);
  totalPages = signal(1);

  ngOnInit(): void {
    // Initialize signals after service is available
    this.Listpermission = this.permissionService.ListPermission;
    
    this.initializeColumns();
    this.loadPermissions();
  }

  initializeColumns(): void {
    this.FilterColumns = this.AllColumn.map(column => ({
      key: column,
      value: this.ColumnName[column],
      isShow: this.displayedColumns.includes(column)
    }));
  }

  async loadPermissions(): Promise<void> {
    try {
      await this.permissionService.getAllPermission(this.pageSize(), true);
      this.dataSource.data = this.Listpermission();
      this.total.set(this.dataSource.data.length);
      this.updatePagination();
    } catch (error: any) {
      this.snackBar.open('Lỗi khi tải dữ liệu: ' + error.message, 'Đóng', { duration: 3000 });
    }
  }

  updatePagination(): void {
    const totalItems = this.dataSource.data.length;
    this.total.set(totalItems);
    this.totalPages.set(Math.ceil(totalItems / this.pageSize()));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.page.set(1);
    this.updatePagination();
  }

  onPageSizeChange(newSize: number, menu?: any): void {
    this.pageSize.set(newSize);
    this.page.set(1);
    this.updatePagination();
    if (menu) {
      menu.closeMenu();
    }
  }

  onNextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.set(this.page() + 1);
    }
  }

  onPreviousPage(): void {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
    }
  }

  doFilterColumns(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.FilterColumns = this.AllColumn.map(column => ({
      key: column,
      value: this.ColumnName[column],
      isShow: this.displayedColumns.includes(column)
    })).filter(column => 
      column.value.toLowerCase().includes(filterValue)
    );
  }

  toggleColumn(column: { key: string; value: string; isShow: boolean }): void {
    column.isShow = !column.isShow;
  }

  updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns
      .filter(column => column.isShow)
      .map(column => column.key);
  }

  FilterHederColumn(data: any[], field: string): any[] {
    const uniqueValues = [...new Set(data.map(item => item[field]))];
    return uniqueValues.filter(value => value !== null && value !== undefined);
  }

  onOutFilter(filterData: any): void {
    this.ListFilter = filterData;
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredData = [...this.Listpermission()];
    
    this.ListFilter.forEach(filter => {
      if (filter.values && filter.values.length > 0) {
        filteredData = filteredData.filter(item => 
          filter.values.includes(item[filter.field])
        );
      }
    });

    this.dataSource.data = filteredData;
    this.page.set(1);
    this.updatePagination();
  }

  create(): void {
    this.router.navigate(['/admin/permission/new'], { relativeTo: null });
  }

  goToDetail(permission: any): void {
    this.router.navigate(['/admin/permission', permission.id], { relativeTo: null });
  }

  AddToEdit(permission: any): void {
    const index = this.EditList.findIndex(item => item.id === permission.id);
    if (index > -1) {
      this.EditList.splice(index, 1);
    } else {
      this.EditList.push(permission);
    }
  }

  CheckSelect(permission: any): boolean {
    return this.EditList.some(item => item.id === permission.id);
  }

  CheckItemInEdit(permission: any): boolean {
    return this.EditList.some(item => item.id === permission.id);
  }

  openDeleteDialog(template: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(template);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSelectedPermissions();
      }
    });
  }

  async deleteSelectedPermissions(): Promise<void> {
    try {
      for (const permission of this.EditList) {
        await this.permissionService.DeletePermission(permission.id);
      }
      
      this.snackBar.open(`Đã xóa ${this.EditList.length} permission thành công`, 'Đóng', { duration: 3000 });
      this.EditList = [];
      await this.loadPermissions();
    } catch (error: any) {
      this.snackBar.open('Lỗi khi xóa permission: ' + error.message, 'Đóng', { duration: 3000 });
    }
  }
}

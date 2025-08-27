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
import { RoleService } from '../role.service';

@Component({
  selector: 'app-listrole',
  templateUrl: './listrole.component.html',
  styleUrls: ['./listrole.component.scss'],
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
export class ListRoleComponent implements OnInit {
  
  displayedColumns: string[] = ['stt', 'name', 'description', 'createdAt', 'updatedAt'];
  readonly AllColumn: string[] = ['stt', 'name', 'description', 'createdAt', 'updatedAt'];
  readonly ColumnName: Record<string, string> = {
    stt: '#',
    name: 'Tên Role',
    description: 'Mô Tả',
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
    private roleService: RoleService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // State - initialized after constructor
  Listrole!: () => any[];
  ListFilter: any[] = [];
  EditList: any[] = [];
  
  // Pagination
  page = signal(1);
  pageSize = signal(50);
  total = signal(0);
  totalPages = signal(1);

  ngOnInit(): void {
    // Initialize signals after service is available
    this.Listrole = this.roleService.ListRole;
    
    this.initializeColumns();
    this.loadRoles();
  }

  initializeColumns(): void {
    this.FilterColumns = this.AllColumn.map(column => ({
      key: column,
      value: this.ColumnName[column],
      isShow: this.displayedColumns.includes(column)
    }));
  }

  async loadRoles(): Promise<void> {
    try {
      await this.roleService.getAllRole();
      this.dataSource.data = this.Listrole();
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
    let filteredData = [...this.Listrole()];
    
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
    this.router.navigate(['/admin/nhomuser/add'], { relativeTo: null });
  }

  goToDetail(role: any): void {
    this.router.navigate(['/admin/nhomuser', role.id], { relativeTo: null });
  }

  AddToEdit(role: any): void {
    const index = this.EditList.findIndex(item => item.id === role.id);
    if (index > -1) {
      this.EditList.splice(index, 1);
    } else {
      this.EditList.push(role);
    }
  }

  CheckSelect(role: any): boolean {
    return this.EditList.some(item => item.id === role.id);
  }

  CheckItemInEdit(role: any): boolean {
    return this.EditList.some(item => item.id === role.id);
  }

  openDeleteDialog(template: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(template);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSelectedRoles();
      }
    });
  }

  async deleteSelectedRoles(): Promise<void> {
    try {
      for (const role of this.EditList) {
        await this.roleService.DeleteRole(role.id);
      }
      
      this.snackBar.open(`Đã xóa ${this.EditList.length} role thành công`, 'Đóng', { duration: 3000 });
      this.EditList = [];
      await this.loadRoles();
    } catch (error: any) {
      this.snackBar.open('Lỗi khi xóa role: ' + error.message, 'Đóng', { duration: 3000 });
    }
  }
}

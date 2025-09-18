import { ChangeDetectionStrategy, Component, OnInit, signal, TemplateRef, ViewChild, effect, AfterViewInit, inject } from '@angular/core';
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
import { UserGraphQLService, User } from '../user-graphql.service';
import { DrawerService } from '../shared/drawer.service';
import { GraphqlService } from '../../../shared/services/graphql.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss'],
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
export class ListUserComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['stt', 'email', 'profile.name', 'SDT', 'isActive', 'roles', 'createdAt'];
  readonly AllColumn: string[] = ['stt', 'email', 'profile.name', 'SDT', 'isActive', 'roles', 'createdAt'];
  readonly ColumnName: Record<string, string> = {
    stt: '#',
    email: 'Email',
    'profile.name': 'Họ và tên',
    SDT: 'Số điện thoại',
    isActive: 'Trạng thái',
    roles: 'Vai trò',
    createdAt: 'Ngày tạo'
  };

  FilterColumns: { key: string; value: string; isShow: boolean }[] = [];
  dataSource = new MatTableDataSource<User>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer') drawer!: MatDrawer;

  // Services
  constructor(
    private userGraphQLService: UserGraphQLService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private drawerService: DrawerService
  ) {
    //   effect(() => {
    //   if (this.drawer) {
    //     if (this.drawerService.isOpen()) {
    //       this.drawer.open();
    //     } else {
    //       this.drawer.close();
    //     }
    //   }
    // });
  }
  private _GraphqlService: GraphqlService = inject(GraphqlService);
  // State - initialized after constructor
  Listuser!: () => User[];
  isLoading!: () => boolean;
  ListFilter: any[] = [];
  EditList: User[] = [];
  
  // Pagination
  page = signal(1);
  pageSize = signal(50);
  total = signal(0);
  totalPages = signal(1);

  ngOnInit(): void {
    // Initialize signals after service is available
    this.Listuser = this.userGraphQLService.allUsers;
    this.isLoading = this.userGraphQLService.isLoading;
    
    this.initializeColumns();
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    // React to drawer service state changes after view init
    // effect(() => {
    //   if (this.drawer) {
    //     if (this.drawerService.isOpen()) {
    //       this.drawer.open();
    //     } else {
    //       this.drawer.close();
    //     }
    //   }
    // });
  }

  initializeColumns(): void {
    this.FilterColumns = this.AllColumn.map(column => ({
      key: column,
      value: this.ColumnName[column],
      isShow: this.displayedColumns.includes(column)
    }));
  }

  async loadUsers(): Promise<void> {
    try {
      const users = await this.userGraphQLService.loadAllUsers();
      this.dataSource.data = users;
      this.total.set(users.length);
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

  FilterHederColumn(data: User[], field: string): any[] {
    const uniqueValues = [...new Set(data.map(item => (item as any)[field]))];
    return uniqueValues.filter(value => value !== null && value !== undefined);
  }

  onOutFilter(filterData: any): void {
    this.ListFilter = filterData;
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredData = [...this.Listuser()];
    
    this.ListFilter.forEach(filter => {
      if (filter.values && filter.values.length > 0) {
        filteredData = filteredData.filter(item => 
          filter.values.includes((item as any)[filter.field])
        );
      }
    });

    this.dataSource.data = filteredData;
    this.page.set(1);
    this.updatePagination();
  }

  create(): void {
    this.router.navigate(['/admin/user/new'], { relativeTo: null });
  }

  goToDetail(user: User): void {
    // Set selected user and open drawer
      this.router.navigate(['/admin/user/'+user.id], { relativeTo: null });
  }

  AddToEdit(user: User): void {
    const index = this.EditList.findIndex(item => item.id === user.id);
    if (index > -1) {
      this.EditList.splice(index, 1);
    } else {
      this.EditList.push(user);
    }
  }

  CheckSelect(user: User): boolean {
    return this.EditList.some(item => item.id === user.id);
  }

  CheckItemInEdit(user: User): boolean {
    return this.EditList.some(item => item.id === user.id);
  }

  openDeleteDialog(template: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(template);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSelectedUsers();
      }
    });
  }

  async deleteSelectedUsers(): Promise<void> {
    try {
      for (const user of this.EditList) {
        await this.userGraphQLService.deleteUser(user.id);
      }
      
      this.snackBar.open(`Đã xóa ${this.EditList.length} user thành công`, 'Đóng', { duration: 3000 });
      this.EditList = [];
      await this.loadUsers();
    } catch (error: any) {
      this.snackBar.open('Lỗi khi xóa user: ' + error.message, 'Đóng', { duration: 3000 });
    }
  }
  async ExportUser() {
     const ListUser =  await this._GraphqlService.findAll('User',
      {
        aggressiveCache: true,
        take: 10000,
        enableParallelFetch:true,
        select:{
          id:true,
          email:true,
          SDT:true,
          roles:{
            select:{
              role:{select:
                { 
                  name:true,
                  permissions:{
                    select:{
                      permission:{
                        select:{name:true}
                      }
                    }
                  }

                }
            },
            }
          }
            
        }
      }
     );
     console.log(ListUser);
     const exportListUser = ListUser.data.map((user:any)=>{
      return {
        email:user.email,
        SDT:user.SDT,
        roles:user.roles.map((roleUser:any)=>roleUser.role.name).join(', '),
        permissions: user.roles.flatMap((roleUser:any)=>
          roleUser.role.permissions.map((permissionRole:any)=>permissionRole.permission.name)
        ).join(', ')
      }
     })
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.json_to_sheet(exportListUser);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'users-export.xlsx');
  }
}

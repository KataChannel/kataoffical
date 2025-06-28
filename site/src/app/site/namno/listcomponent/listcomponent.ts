import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild, effect, inject, signal, WritableSignal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';

import { TableComponent } from './table';
import { ToolbarComponent } from './toolbar';
import { PaginationComponent } from './pagination';
import { ServiceInterface } from './service.interface';

@Component({
  selector: 'app-listcomponent',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatDialogModule,
    TableComponent,
    ToolbarComponent,
    PaginationComponent
],
  templateUrl: './listcomponent.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponentComponent {
  @Input({ required: true }) componentService!: ServiceInterface;
  @Input() columnConfig: Record<string, string> = {
    stt: '#',
    codeId: 'Code',
    title: 'Tiêu Đề',
    description: 'Mô Tả',
    status: 'Trạng Thái',
    order: 'Thứ Tự',
    createdAt: 'Ngày Tạo',
  };
  @Input() storageKey: string = 'ComponentColFilter';

  displayedColumns: string[] = [];
  ColumnName: Record<string, string> = {};
  FilterColumns: any[] = [];
  Columns: any[] = [];
  ListFilter: any[] = [];
  page:any = this.componentService.page
  totalPages:any = this.componentService.totalPages
  total:any = this.componentService.total
  pageSize:any = this.componentService.pageSize
  @ViewChild('drawer', { static: true }) drawer!: any;

  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  dataSource = new MatTableDataSource(this.componentService.ListComponent());
  EditList: any[] = [];
  isSearch = signal<boolean>(false);
  searchParam: any = {};

  constructor() {
    effect(() => {
      this.dataSource.data = this.componentService.ListComponent();
    });
  }

  async ngOnInit(): Promise<void> {
    await this.componentService.getAllComponent(this.searchParam, true);
    this.componentService.listenComponentUpdates();
    this.initializeColumns();
    this.setupDrawer();
  }

  private initializeColumns(): void {
    this.ColumnName = this.columnConfig;
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = JSON.parse(localStorage.getItem(this.storageKey) || '[]').length
      ? JSON.parse(localStorage.getItem(this.storageKey)!)
      : this.Columns;
    localStorage.setItem(this.storageKey, JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter((col: any) => col.isShow).map((col: any) => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc: any, { key, value, isShow }: any) =>
      isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
  }

  private setupDrawer(): void {
    this._breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.drawer.mode = result.matches ? 'over' : 'over';
      });
  }

  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) {
      await this.componentService.SearchBy(this.searchParam);
      return;
    }
    this.searchParam.title = filterValue;
    await this.componentService.SearchBy(this.searchParam);
  }

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }

  updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item: any) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj: any, item: any) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem(this.storageKey, JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/component', 'new']);
  }

  openDeleteDialog(template: TemplateRef<any>) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.DeleteListItem();
      }
    });
  }

  DeleteListItem(): void {
    this.EditList.forEach((item: any) => {
      this.componentService.DeleteComponent(item);
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

  goToDetail(item: any): void {
    this.drawer.open();
    this.componentService.setComponentId(item.id);
    this.componentService.getComponentBy({ id: item.id, isOne: true });
    this._router.navigate(['admin/component', item.id]);
  }

  onOutFilter(event: any) {
    this.dataSource.data = event;
  }

  onPageSizeChange(size: number): void {
    (this.componentService.pageSize as WritableSignal<number>).set(size);
    (this.componentService.page as WritableSignal<number>).set(1);
    this.componentService.getAllComponent(this.searchParam, true);
  }

  onPreviousPage(): void {
    if (this.componentService.page() > 1) {
      (this.componentService.page as WritableSignal<number>).set(this.componentService.page() - 1);
      this.componentService.getAllComponent(this.searchParam, true);
    }
  }

  onNextPage(): void {
    if (this.componentService.page() < this.componentService.totalPages()) {
      (this.componentService.page as WritableSignal<number>).set(this.componentService.page() + 1);
      this.componentService.getAllComponent(this.searchParam, true);
    }
  }
}
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

import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuanlydriveService } from '../quanlydrive.service';
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, flattenData, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import {MatBadgeModule} from '@angular/material/badge';
import { StorageService } from '../../../shared/utils/storage.service';
@Component({
  selector: 'app-listquanlydrive',
  templateUrl: './listquanlydrive.component.html',
  styleUrls: ['./listquanlydrive.component.scss'],
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
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatTreeModule,
    MatBadgeModule
],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListQuanlydriveComponent {

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      node: node,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  dataTreeSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: any) => node.expandable;
  //pagination
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  driveId:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _QuanlydriveService: QuanlydriveService = inject(QuanlydriveService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _StorageService: StorageService = inject(StorageService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  Listquanlydrive:any = this._QuanlydriveService.ListQuanlydrive;
  EditList:any=[];
  dataSource = new MatTableDataSource([]);
  quanlydriveId:any = this._QuanlydriveService.quanlydriveId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  isSearch: boolean = false;
  ListTimkiem:any = [];
  constructor() {
    effect(() => {
      this.dataSource.data = this.Listquanlydrive();
      this.dataTreeSource.data = this.Listquanlydrive();
      this.totalItems = this.Listquanlydrive().length;
      this.calculateTotalPages();
    });
  }
  applyFilter(event: Event) {
    const ListItem = this.Listquanlydrive();
    console.log(flattenData(ListItem))
    this.ListTimkiem = flattenData(ListItem).map((v:any) => {
        const item = flattenData(v.permissions).map((v1:any) => {
          return {
            ...v1,
            name: v.name,
          }
        })
        return item
    }).flat();
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListTimkiem = this.ListTimkiem.filter((v:any) => {
      return v.emailAddress?.toLowerCase().includes(filterValue.toLowerCase())
    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async deleteItem(item: any): Promise<void> {
  await this._QuanlydriveService.DeleteUserDrive(item).then((data) => {
    console.log(data);  
     if(data.statusCode===204||data.statusCode===404)
     {
      this._QuanlydriveService.DeleteQuanlydrive(item);
      this._snackBar.open('Xóa Thành Công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
     }
    });
  }

  async ngOnInit(): Promise<void> {   
    this._StorageService.getItem('driveId')?this.driveId = this._StorageService.getItem('driveId'):this.driveId = null; 
    this.updateDisplayData();
    this._QuanlydriveService.listenQuanlydriveUpdates();
    await this._QuanlydriveService.getAllQuanlydrive();
    this.dataTreeSource.data = this.Listquanlydrive();
    this.treeControl.collapseAll();
    console.log(this.dataTreeSource.data);
    this.setupDrawer();
  }
  async LoadDulieu(driveId:any){
    this._StorageService.setItem('driveId',driveId);
    this._QuanlydriveService.listenQuanlydriveUpdates();
    const ListItem = await this._QuanlydriveService.getAllQuanlydrive(driveId,true);

    // flattenData(ListItem).forEach((v:any,k:any) => {
    //     console.log(v);
    //     setTimeout(() => {
    //      // this.LoadDulieu(v.googleId);
    //       this.LoadPermission(v);
    //     }, k*100);
    // });
    this.dataTreeSource.data = this.Listquanlydrive();
  }
  async LoadSyncDrive(driveId:any){
    await this._QuanlydriveService.getAllQuanlydrive(driveId,true);
    this.dataTreeSource.data = this.Listquanlydrive();
  }
  LoadFolder(item:any){
    console.log(item);
    if(item.type==="folder")
    {
    this._QuanlydriveService.QuanlydriveQueryfolder(item);
    }
  }
  LoadPermission(item:any){
    this._QuanlydriveService.ListUsersFolder(item);
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
    this.ListFilter = this.Listquanlydrive();
    this.dataSource.data = this.Listquanlydrive();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.dataSource.data = this.Listquanlydrive().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/quanlydrive', 'new']);
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
      this._QuanlydriveService.DeleteQuanlydrive(item);
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
    this._QuanlydriveService.setQuanlydriveId(item.id);
    this._router.navigate(['admin/quanlydrive', item.id]);
  }
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'SPImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
   const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
   const data = ConvertDriveData(result.values);
   this.DoImportData(data);
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
    const existingQuanlydrive = this._QuanlydriveService.ListQuanlydrive();
    const existingMasp  = existingQuanlydrive.map((v: any) => v.masp);
    const newMasp = uniqueData.map((v: any) => v.masp).filter((item: any) => !existingMasp.includes(item));

    await Promise.all(uniqueData.map(async (v: any) => {
      const existingItem = existingQuanlydrive.find((v1: any) => v1.masp === v.masp);
      if (existingItem) {
        const updatedItem = { ...existingItem, ...v };
        await this._QuanlydriveService.updateQuanlydrive(updatedItem);
      } else {
        await this._QuanlydriveService.CreateQuanlydrive(v);
      }
    }));
    await Promise.all(existingQuanlydrive
      .filter(sp => !uniqueData.some((item:any) => item.masp === sp.masp))
      .map(sp => this._QuanlydriveService.updateQuanlydrive({ ...sp, isActive: false }))
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
  if(size>this.Listquanlydrive().length){
    this.pageSize = this.Listquanlydrive().length;
    this._snackBar.open(`Số lượng tối đa ${this.Listquanlydrive().length}`, '', {
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
  const pageData = this.Listquanlydrive().slice(startIndex, endIndex);
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

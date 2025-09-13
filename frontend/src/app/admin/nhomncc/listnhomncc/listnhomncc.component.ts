import { AfterViewInit, Component, computed, effect, inject, ViewChild } from '@angular/core';
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
import { NhomnccService } from '../nhomncc.service';
import { MatMenuModule } from '@angular/material/menu';
import { readExcelFile, readExcelFileNoWorkerArray, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { GraphqlService } from '../../../shared/services/graphql.service';
@Component({
  selector: 'app-listnhomncc',
  templateUrl: './listnhomncc.component.html',
  styleUrls: ['./listnhomncc.component.scss'],
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
export class ListNhomnccComponent {
  Detail: any = {};
  displayedColumns: string[] = [
    'name',
    'description',
    'createdAt',
    'updatedAt',
  ];

  ColumnName: any = {
    name: 'Nhóm Khách hàng',
    description: 'Mô Tả',
    createdAt:'Ngày Tạo',
    updatedAt:'Ngày Cập Nhật'
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('NhomnccColFilter') || '[]'
  );
  Columns: any[] = [];
  isFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  filterValues: { [key: string]: string } = {};
  private _NhomnccService: NhomnccService = inject(NhomnccService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _GraphqlService: GraphqlService = inject(GraphqlService);
  private _router: Router = inject(Router);
  Listnhomncc:any = this._NhomnccService.ListNhomncc;
  dataSource = new MatTableDataSource([]);
  nhomnccId:any = this._NhomnccService.nhomnccId;
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
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  async ngOnInit(): Promise<void> {    
    await this.getAllNhomncc();
    this.CountItem = this.Listnhomncc().length;
    this.dataSource = new MatTableDataSource(this.Listnhomncc());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
    this.initializeColumns();
    this.setupDrawer();
    this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
    this.paginator._intl.nextPageLabel = 'Tiếp Theo';
    this.paginator._intl.previousPageLabel = 'Về Trước';
    this.paginator._intl.firstPageLabel = 'Trang Đầu';
    this.paginator._intl.lastPageLabel = 'Trang Cuối';
  }
  async refresh() {
   await this._NhomnccService.getAllNhomncc();
  }
  async getAllNhomncc(){
   const Nhomnccs = await this._GraphqlService.findAll('nhomncc',{
        select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true
        }
    });
    this._NhomnccService.ListNhomncc.set(Nhomnccs.data);
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
      localStorage.setItem('NhomnccColFilter',JSON.stringify(this.FilterColumns)
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
  FilterHederColumn(list:any,column:any)
  {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList
  }
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listnhomncc().filter((v: any) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
    const query = event.target.value.toLowerCase();
    console.log(query,column);
    console.log(this.dataSource.filteredData);   
  }
  ListFilter:any[] =[]
  ChosenItem(item:any)
  {
    if(this.ListFilter.includes(item.id))
    {
      this.ListFilter = this.ListFilter.filter((v) => v !== item.id);
    }
    else{
      this.ListFilter.push(item.id);
    }
    console.log(this.ListFilter);
    
  }
  ChosenAll(list:any)
  {
    list.forEach((v:any) => {
      if(this.ListFilter.includes(v.id))
        {
          this.ListFilter = this.ListFilter.filter((v) => v !== v.id);
        }
        else{
          this.ListFilter.push(v.id);
        }
    });
  }
  ResetFilter()
  {
    this.ListFilter = this.Listnhomncc().map((v:any) => v.id);
    this.dataSource.data = this.Listnhomncc();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter()
  {
    this.ListFilter = [];
  }
  CheckItem(item:any)
  {
    return this.ListFilter.includes(item.id);
  }
  ApplyFilterColum(menu:any)
  {    
    this.dataSource.data = this.Listnhomncc().filter((v: any) => this.ListFilter.includes(v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource.data);
    menu.closeMenu();
    
  }
  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('NhomnccColFilter',JSON.stringify(this.FilterColumns)
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
    this._router.navigate(['admin/nhomncc', 'new']);
  }
  goToDetail(item: any): void {
     this._NhomnccService.setNhomnccId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/nhomncc', item.id]);
  }
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'NCCImport',
      ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
    };
   const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
   const data = ConvertDriveData(result.values);
   console.log(data);
   this.DoImportData(data);
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
  DoImportData(data:any)
  {
    console.log(data);
    
    const transformedData = data.map((v: any) => ({
      name: v.name?.trim()||'',
      mancc: v.mancc?.trim()||'',
      sdt: v.sdt?.trim()||'',
      diachi: v.diachi?.trim()||'',
      ghichu: v.ghichu?.trim()||'',
   }));
   // Filter out duplicate mancc values
   const uniqueData = transformedData.filter((value:any, index:any, self:any) => 
      index === self.findIndex((t:any) => (
        t.mancc === value.mancc
      ))
   )
    const listId2 = uniqueData.map((v: any) => v.mancc);
    const listId1 = this._NhomnccService.ListNhomncc().map((v: any) => v.mancc);
    const listId3 = listId2.filter((item:any) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map(async (v: any) => {
        const item = this._NhomnccService.ListNhomncc().find((v1) => v1.mancc === v.mancc);
        if (item) {
          const item1 = { ...item, ...v };
          await this._NhomnccService.updateNhomncc(item1);
        }
        else{
          await this._NhomnccService.CreateNhomncc(v);
        }
      });
     const disableItem = listId3.map(async (v: any) => {
        const item = this._NhomnccService.ListNhomncc().find((v1) => v1.mancc === v);
        item.isActive = false;
        await this._NhomnccService.updateNhomncc(item);
      });
      Promise.all([...createuppdateitem, ...disableItem]).then(() => {
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
       // window.location.reload();
      });
  }


    convertFlatToGroup(data: any) {
    if (!data || data.length === 0) {
      return [];
    }
    // Extract keys representing price boards (excluding mancc, name)
    const boardKeys = Object.keys(data[0]).filter(
      (key) => !['description', 'name'].includes(key)
    );
    data.forEach((v: any) => {
      v.khachhang = [];
      for (const key of boardKeys) {
        if (v[key] !== undefined && v[key] !== null && v[key] !== '') {
          v.khachhang.push(v[key]);
        }
        delete v[key];
      }
    });
    return data;
  }
  async ImporExcel(event: any) {
    const data = await readExcelFileNoWorkerArray(event)
    console.log(event);
    
    console.log(data);
    
    const nhomnccs = this.convertFlatToGroup(data);
    console.log(nhomnccs);
    const Khachhangs = await this._GraphqlService.findAll('khachhang',{
        select: {
          id: true,
          name: true,
          makh:true
        },
        take: 99999,
        aggressiveCache: true,
        enableParallelFetch: true,
      });
      const ListNCCSP = nhomnccs
        .filter((supplier: any) => supplier?.khachhang?.length > 0)
        .map((supplier: any) => ({
          ...supplier,
          khachhang: supplier?.khachhang?.map((makh: any) =>
            Khachhangs.data.find((kh) => kh?.makh === makh)?.id
          ).filter((id: any) => id !== undefined), // Remove undefined IDs
        }));
      console.log('ListNCCSP for import:', ListNCCSP);
      
      // Process and import data using GraphQL
      await this.processImportData(ListNCCSP);
  }

  /**
   * Process and import nhomncc data using GraphQL
   */
  async processImportData(ListNCCSP: any[]) {
    try {
      const importPromises = ListNCCSP.map(async (nhom: any) => {
        try {
          // Check if nhomncc already exists by name
          const existingNhom = this.Listnhomncc().find((existing: any) => 
            existing.name === nhom.name
          );

          const nhomData = {
            name: nhom.name,
            description: nhom.description || '',
            khachhang: {
              connect: nhom.khachhang.map((id: string) => ({ id }))
            }
          };

          if (existingNhom) {
            // Update existing nhomncc
            console.log(`Updating existing nhomncc: ${nhom.name}`);
            await this._GraphqlService.updateOne('nhomncc', { id: existingNhom.id }, nhomData);
          } else {
            // Create new nhomncc
            console.log(`Creating new nhomncc: ${nhom.name}`);
            await this._GraphqlService.createOne('nhomncc', nhomData);
          }
        } catch (error: any) {
          console.error(`Error processing nhomncc "${nhom.name}":`, error);
          
          // Handle specific errors
          if (error.message?.includes('Unique constraint failed') && error.message?.includes('name')) {
            this._snackBar.open(`Tên nhóm "${nhom.name}" đã tồn tại, bỏ qua.`, '', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-warning'],
            });
          } else {
            this._snackBar.open(`Lỗi xử lý nhóm "${nhom.name}": ${error.message}`, '', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
          }
        }
      });

      // Wait for all imports to complete
      await Promise.all(importPromises);

      // Refresh data after import
      await this.refresh();

      this._snackBar.open(`Import hoàn tất! Đã xử lý ${ListNCCSP.length} nhóm khách hàng.`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 300);

    } catch (error: any) {
      console.error('Import error:', error);
      this._snackBar.open(`Lỗi import: ${error.message}`, '', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }

  /**
   * Test method with sample data - for development/testing purposes
   */
  async testImportWithSampleData() {
    const sampleData = [
      {
        "name": "Nhóm 2",
        "description": "Mô tả",
        "khachhang": [
          "0032fc11-b99f-4ab6-a10b-9bfdb32f61b5",
          "003c52fc-4e54-4d58-92e2-a7bf3b847e2c",
          "008fc6fb-4834-4c72-9f80-7281db4b09db",
          "011c521e-8b2e-4ba1-a9dc-4a819321444d"
        ]
      },
      {
        "name": "Nhóm 4",
        "description": "Mô Tả 2",
        "khachhang": [
          "0032fc11-b99f-4ab6-a10b-9bfdb32f61b5",
          "008fc6fb-4834-4c72-9f80-7281db4b09db",
          "01cc2b3e-a279-4fb7-8e78-7073cf7d8d8b",
          "02f57b49-2734-4d92-988a-2fac2a5fbbfa",
          "036b2dd7-8026-45ae-b388-e643f3546df8",
          "036ded8c-a9ab-4d0b-b18a-daa0c04aaea8"
        ]
      }
    ];

    console.log('Testing import with sample data:', sampleData);
    await this.processImportData(sampleData);
  }  

  async ExportExcel(data:any,title:any) {
    console.log(data);
    const Khachhangs = await this._GraphqlService.findAll('khachhang',{
        select: {
          id: true,
          name: true,
          makh:true
        },
        take: 99999,
        aggressiveCache: true,
        enableParallelFetch: true,
      });
    const dynamicKeys = Khachhangs.data.reduce(
        (acc: Record<string, string>, v: any) => {
          if (v && v.makh) {
            acc[v.makh] = '';
          }
          return acc;
        },
        {}
      );
    const formattedData = data.map((nhom: any) => {
      const formattedItem: any = {
        name: nhom.name ||'',
        description: nhom.description ||''
      };
      let i = 1;
      for (const makh of Object.keys(dynamicKeys)) {
          const productExists = nhom.khachhang?.some(
            (v: any) => v.makh === makh
          );
          if (productExists) {
            formattedItem[i] = makh;
            i++;
          }
        }

      return formattedItem;
    });
    writeExcelFile(formattedData,title);
  }
}
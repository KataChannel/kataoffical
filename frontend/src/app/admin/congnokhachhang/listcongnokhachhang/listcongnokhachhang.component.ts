import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import {
  readExcelFile,
  writeExcelFile,
} from '../../../shared/utils/exceldrive.utils';
import {
  ConvertDriveData,
  convertToSlug,
  GenId,
} from '../../../shared/utils/shared.utils';
import * as XLSX from 'xlsx-js-style'; 
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import moment from 'moment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { DonhangService } from '../../donhang/donhang.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { GraphqlService } from '../../../shared/services/graphql.service';
@Component({
  selector: 'app-listcongnokhachhang',
  templateUrl: './listcongnokhachhang.component.html',
  styleUrls: ['./listcongnokhachhang.component.scss'],
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
    MatDatepickerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  // providers: [provideNativeDateAdapter()],
})
export class ListcongnokhachhangComponent {
  Detail: any = {};
  
  // Loading states
  isLoading = false;
  isSearching = false;
  isExporting = false;
  isShowKH = true;
  displayedColumns: string[] = [
    'ngaygiao',
    'madonhang',
    'makh',
    'name',
    'soluong',
    'tong',
    'tongvat',
    'tongtien',
  ];
  ColumnName: any = {
    ngaygiao: 'Ngày Giao',
    madonhang: 'Mã Đơn Hàng',
    makh: 'Mã Khách Hàng',
    name: 'Tên Khách Hàng',
    soluong: 'Số Lượng',
    tong: 'Tổng',
    tongvat: 'Tổng VAT',
    tongtien: 'Tổng Tiền',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('CongnoColFilter') || '[]'
  );
  exampleExport:any={}
  Columns: any[] = [];
  isFilter: boolean = false;
  Trangthaidon:any = TrangThaiDon;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('ConfirmDongboDialog') confirmDongboDialog!: TemplateRef<any>;
  filterValues: { [key: string]: string } = {};
  private _DonhangService: DonhangService = inject(DonhangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _GraphqlService: GraphqlService = inject(GraphqlService);
  private _router: Router = inject(Router);
  Listdonhang: any = this._DonhangService.ListDonhang;
  ListKhachhang:any =[];
  filterListKhachhang:any = [];
  ListNhomKhachhang:any =[];
  filterListNhomKhachhang:any = [];
  SelectedKhachhang: any[] = []; // Array to store selected customers
  SelectedNhomKhachhang: any[] = []; // Array to store selected customers
  ListCongno:any = [];
  dataSource = new MatTableDataSource([]);
  donhangId: any = this._DonhangService.donhangId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  SearchParams: any = {
    Batdau: moment().toDate(),
    Ketthuc: moment().toDate(),
    Type: 'donsi',
    Status:['danhan','hoanthanh'],
    khachhangIds: [], // Array of selected customer IDs
  };
  ListDate: any[] = [
    { id: 1, Title: '1 Ngày', value: 'day' },
    { id: 2, Title: '1 Tuần', value: 'week' },
    { id: 3, Title: '1 Tháng', value: 'month' },
    { id: 4, Title: '1 Năm', value: 'year' },
  ];
  Chonthoigian: any = 'day';
  isSearch: boolean = false;
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = '';
    });
  }

  // Display function for customer names in chips
  getCustomerName(customer: any): string {
    return typeof customer === 'string' ? customer : (customer.name || customer.makh || 'Unknown');
  }

  // Display function for customer group names in chips
  getNhomKhachhangName(nhom: any): string {
    return typeof nhom === 'string' ? nhom : (nhom.name || nhom.manhom || 'Unknown');
  }

  onSelectionChange(event: MatSelectChange): void {
     this.ngOnInit();
  }
  onDateChange(event: any): void {
    // this.ngOnInit()
  }
  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach((column) => {
        if (filterObject[column]) {
          const value = data[column]
            ? data[column].toString().toLowerCase()
            : '';
          isMatch =
            isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }
  @Debounce(300)
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filterValue', filterValue);
    this.SearchParams = {
      ...this.SearchParams,
      query: filterValue
    };
   this.loadData(this.SearchParams);
  }

  async ngOnInit(): Promise<void> {
    this.initializeColumns();
    this.setupDrawer();
    this.loadData(this.SearchParams);
  }
  async doSearch(){
    this.isSearching = true;
    try {
      await this.loadData(this.SearchParams); 
      // console.log(this.SearchParams);
      
      // // Create a Map to track unique customers
      // const uniqueCustomers = new Map();
      // this.Listdonhang().forEach((v: any) => {
      //   const makh = v.makhachhang;
      //   const tenkh = v.tenkhachhang;
      //   if (makh && !uniqueCustomers.has(makh)) {
      //   uniqueCustomers.set(makh, tenkh);
      //   }
      // });
      // // Convert Map to array
      // this.ListKhachhang = this.filterListKhachhang = Array.from(uniqueCustomers.values());
      // console.log('ListKhachhang', this.ListKhachhang);
    } finally {
      this.isSearching = false;
    }
  }
ListExport:any =[]
onKhachhangChange(event: MatAutocompleteSelectedEvent){
  // Use the chips autocomplete method for consistency
  this.onCustomerSelected(event);
}
onNhomKhachhangChange(event: MatAutocompleteSelectedEvent){
  // Use the chips autocomplete method for consistency
  this.onNhomKhachhangSelected(event);
}

// Method to handle customer group selection from chips autocomplete
onNhomKhachhangSelected(event: MatAutocompleteSelectedEvent): void {
  const selectedValue = event.option.value; // This is now a string (name)
  
  // Find the full object from the list to store it
  const fullObject = this.ListNhomKhachhang.find((item: any) => 
    (typeof item === 'string' ? item : item.name) === selectedValue
  );
  
  const objectToAdd = fullObject || selectedValue;
  
  // Check if customer group is already selected (avoid duplicates)
  const isAlreadySelected = this.SelectedNhomKhachhang.some(nhomKH => 
    (typeof nhomKH === 'string' ? nhomKH : nhomKH.name) === selectedValue
  );
  
  if (!isAlreadySelected) {
    this.SelectedNhomKhachhang.push(objectToAdd);
    // You can add nhomKhachhangIds to SearchParams if needed
    // this.SearchParams.nhomKhachhangIds = this.SelectedNhomKhachhang.map(nhomKH => 
    //   typeof nhomKH === 'string' ? nhomKH : nhomKH.id || nhomKH.name
    // );
    
    // Add corresponding customers from the selected customer group
    this.addCustomersFromGroup(fullObject);
    
    // Refresh the filter lists to exclude newly selected items
    this.refreshNhomKhachhangFilter();
    this.refreshCustomerFilter();
  }
  
  // Clear the input after selection
  setTimeout(() => {
    const inputs = document.querySelectorAll('input[matautocomplete]');
    inputs.forEach((input: any) => {
      if (input.placeholder.includes('nhóm khách hàng') || input.placeholder.includes('Thêm nhóm khách hàng')) {
        input.value = '';
      }
    });
  }, 100);
}

@Debounce(100)
doFilterKhachhang(event: Event){
  const query = (event.target as HTMLInputElement).value.toLowerCase();
  console.log('query', query);
  
  // Get list of already selected customer names
  const selectedNames = this.SelectedKhachhang.map(customer => 
    typeof customer === 'string' ? customer : customer.name
  );
  
  // Filter out already selected customers
  let availableCustomers = this.ListKhachhang.filter((item: any) => {
    const itemName = typeof item === 'string' ? item : item.name;
    return !selectedNames.includes(itemName);
  });
  
  if(!query) {
    this.filterListKhachhang = availableCustomers;
    return;
  }
  this.filterListKhachhang = availableCustomers.filter((item: any) =>
    item?.name?.toLowerCase().includes(query) || removeVietnameseAccents(item?.name).toLowerCase().includes(removeVietnameseAccents(query))
    || item?.makh?.toLowerCase().includes(query) || removeVietnameseAccents(item?.makh).toLowerCase().includes(removeVietnameseAccents(query))
  );
}

@Debounce(100)
doFilterNhomKhachhang(event: Event){
  const query = (event.target as HTMLInputElement).value.toLowerCase();
  console.log('query', query);
  
  // Get list of already selected customer group names
  const selectedNames = this.SelectedNhomKhachhang.map(nhomKH => 
    typeof nhomKH === 'string' ? nhomKH : nhomKH.name
  );
  
  // Filter out already selected customer groups
  let availableGroups = this.ListNhomKhachhang.filter((item: any) => {
    const itemName = typeof item === 'string' ? item : item.name;
    return !selectedNames.includes(itemName);
  });
  
  if(!query) {
    this.filterListNhomKhachhang = availableGroups;
    return;
  }
  
  this.filterListNhomKhachhang = availableGroups.filter((item: any) => {
    const name = typeof item === 'string' ? item : item.name || '';
    const description = typeof item !== 'string' ? item.description || '' : '';
    return name.toLowerCase().includes(query) || 
           removeVietnameseAccents(name).toLowerCase().includes(removeVietnameseAccents(query)) ||
           description.toLowerCase().includes(query) ||
           removeVietnameseAccents(description).toLowerCase().includes(removeVietnameseAccents(query));
  });
}

// Method to handle customer selection from chips autocomplete
onCustomerSelected(event: MatAutocompleteSelectedEvent): void {
  const selectedValue = event.option.value; // This is now a string (name)
  
  // Find the full object from the list to store it
  const fullObject = this.ListKhachhang.find((item: any) => 
    (typeof item === 'string' ? item : item.name) === selectedValue
  );
  
  const objectToAdd = fullObject || selectedValue;
  
  // Check if customer is already selected (avoid duplicates)
  const isAlreadySelected = this.SelectedKhachhang.some(customer => 
    (typeof customer === 'string' ? customer : customer.name) === selectedValue
  );
  
  if (!isAlreadySelected) {
    this.SelectedKhachhang.push(objectToAdd);
    this.SearchParams.khachhangIds = this.SelectedKhachhang.map(customer => 
      typeof customer === 'string' ? customer : customer.id
    );
    
    // Refresh the filter list to exclude the newly selected customer
    this.refreshCustomerFilter();
  }
  
  // Clear the input after selection
  setTimeout(() => {
    const inputs = document.querySelectorAll('input[matautocomplete]');
    inputs.forEach((input: any) => {
      if (input.placeholder.includes('khách hàng') || input.placeholder.includes('Thêm khách hàng')) {
        input.value = '';
      }
    });
  }, 100);
}

// Method to remove selected customer
removeSelectedCustomer(customer: any): void {
  const index = this.SelectedKhachhang.findIndex(item => 
    (typeof item === 'string' ? item : item.name) === (typeof customer === 'string' ? customer : customer.name)
  );
  if (index >= 0) {
    this.SelectedKhachhang.splice(index, 1);
    this.SearchParams.khachhangIds = this.SelectedKhachhang.map(customer => 
      typeof customer === 'string' ? customer : customer.id
    );
    
    // Refresh the filter list to include the removed customer
    this.refreshCustomerFilter();
  }
}
removeSelectedNhomkhachhang(nhomKH: any): void {
  const index = this.SelectedNhomKhachhang.findIndex(item => 
    (typeof item === 'string' ? item : item.name) === (typeof nhomKH === 'string' ? nhomKH : nhomKH.name)
  );
  if (index >= 0) {
    // Remove corresponding customers from the group before removing the group
    this.removeCustomersFromGroup(nhomKH);
    
    this.SelectedNhomKhachhang.splice(index, 1);
    // Update SearchParams if you have nhomKhachhangIds
    // this.SearchParams.nhomKhachhangIds = this.SelectedNhomKhachhang.map(nhomKH => 
    //   typeof nhomKH === 'string' ? nhomKH : nhomKH.id || nhomKH.name
    // );
    
    // Refresh the filter lists to include removed items
    this.refreshNhomKhachhangFilter();
    this.refreshCustomerFilter();
  }
}

// Method to clear all selected customers
clearAllSelectedCustomers(): void {
  this.SelectedKhachhang = [];
  this.SearchParams.khachhangIds = [];
  
  // Refresh the filter list to show all customers again
  this.refreshCustomerFilter();
}
clearAllSelectedNhomKhachhang(): void {
  // Remove all customers from selected groups before clearing groups
  this.SelectedNhomKhachhang.forEach(nhomKH => {
    this.removeCustomersFromGroup(nhomKH);
  });
  
  this.SelectedNhomKhachhang = [];
  // this.SearchParams.khachhangIds = [];
  
  // Refresh the filter lists to show all items again
  this.refreshNhomKhachhangFilter();
  this.refreshCustomerFilter();
}

// Helper methods to refresh filter lists
private refreshCustomerFilter(): void {
  const selectedNames = this.SelectedKhachhang.map(customer => 
    typeof customer === 'string' ? customer : customer.name
  );
  
  this.filterListKhachhang = this.ListKhachhang.filter((item: any) => {
    const itemName = typeof item === 'string' ? item : item.name;
    return !selectedNames.includes(itemName);
  });
}

private refreshNhomKhachhangFilter(): void {
  const selectedNames = this.SelectedNhomKhachhang.map(nhomKH => 
    typeof nhomKH === 'string' ? nhomKH : nhomKH.name
  );
  
  this.filterListNhomKhachhang = this.ListNhomKhachhang.filter((item: any) => {
    const itemName = typeof item === 'string' ? item : item.name;
    return !selectedNames.includes(itemName);
  });
}

// Helper method to add customers from a selected customer group
private addCustomersFromGroup(nhomKhachhang: any): void {
  if (!nhomKhachhang || typeof nhomKhachhang === 'string') return;
  
  // Get customers from the customer group
  const customersInGroup = nhomKhachhang.khachhang || [];
  
  customersInGroup.forEach((customer: any) => {
    // Check if customer is not already selected
    const isAlreadySelected = this.SelectedKhachhang.some(selectedCustomer => 
      (typeof selectedCustomer === 'string' ? selectedCustomer : selectedCustomer.name) === customer.name
    );
    
    if (!isAlreadySelected) {
      this.SelectedKhachhang.push(customer);
    }
  });
  
  // Update SearchParams
  this.SearchParams.khachhangIds = this.SelectedKhachhang.map(customer => 
    typeof customer === 'string' ? customer : customer.id
  );
}

// Helper method to remove customers from a deselected customer group
private removeCustomersFromGroup(nhomKhachhang: any): void {
  if (!nhomKhachhang || typeof nhomKhachhang === 'string') return;
  
  // Get customers from the customer group
  const customersInGroup = nhomKhachhang.khachhang || [];
  
  customersInGroup.forEach((customer: any) => {
    const index = this.SelectedKhachhang.findIndex(selectedCustomer => 
      (typeof selectedCustomer === 'string' ? selectedCustomer : selectedCustomer.name) === customer.name
    );
    
    if (index >= 0) {
      this.SelectedKhachhang.splice(index, 1);
    }
  });
  
  // Update SearchParams
  this.SearchParams.khachhangIds = this.SelectedKhachhang.map(customer => 
    typeof customer === 'string' ? customer : customer.id
  );
}

  async loadData(query:any): Promise<void> {
    this.isLoading = true;
    try {
      await this._DonhangService.searchCongno(query);
      // console.log(this.Listdonhang());      
      this.CountItem = this.Listdonhang().length||0;
      // Nhóm dữ liệu theo khách hàng để tính tổng tiền sau thuế
      const customerTotals = new Map();
      // Tính tổng tiền sau thuế cho từng khách hàng
      this.ListCongno = this.Listdonhang()
      console.log('this.ListCongno', this.ListCongno);
      
      this.dataSource = new MatTableDataSource(this.ListCongno);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
      // this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
      // this.paginator._intl.nextPageLabel = 'Tiếp Theo';
      // this.paginator._intl.previousPageLabel = 'Về Trước';
      // this.paginator._intl.firstPageLabel = 'Trang Đầu';
      // this.paginator._intl.lastPageLabel = 'Trang Cuối';

      const Khachhangs = await this._GraphqlService.findAll('khachhang', {
        aggressiveCache: true,
        enableStreaming: true,
        select: {
          id: true,
          name: true,
          makh:true,
        },
      });
      this.ListKhachhang = this.filterListKhachhang = Khachhangs.data

      const NhomKhachhangs = await this._GraphqlService.findAll('nhomkhachhang', {
        aggressiveCache: true,
        enableStreaming: true,
        select: {
          id: true,
          name: true,
          description:true,
          khachhang:{select:{
            id:true,
            name:true,
            makh:true
            }}
        },
      });
      this.ListNhomKhachhang = this.filterListNhomKhachhang = NhomKhachhangs.data
      // console.log(this.filterListKhachhang);
      // console.log(this.filterListNhomKhachhang);
      

    } finally {
      this.isLoading = false;
    }
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
      localStorage.setItem(
        'CongnoColFilter',
        JSON.stringify(this.FilterColumns)
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

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map(
      (item) => item.key
    );
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem(
      'CongnoColFilter',
      JSON.stringify(this.FilterColumns)
    );
  }
  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) =>
      v.value.toLowerCase().includes(query)
    );
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
    this.dataSource.filteredData = this.Listdonhang().filter((v: any) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
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
    this.ListFilter = this.Listdonhang();
    this.dataSource.data = this.Listdonhang();
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

    this.dataSource.data = this.Listdonhang().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }


  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/congnokhachhang', 0]);
  }
  goToDetail(item: any): void {
    this._DonhangService.setDonhangId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/congnokhachhang', item.id]);
  }
  ToggleAll(): void {
    if (this.editDonhang.length === this.dataSource.filteredData.length) {
      this.editDonhang = [];
    } else {
      this.editDonhang = [...this.dataSource.filteredData];
    }
  }

  editDonhang: any[] = [];
  toggleDonhang(item: any): void {
    const index = this.editDonhang.findIndex((v) => v.id === item.id);
    if (index !== -1) {
      this.editDonhang.splice(index, 1);
    } else {
      this.editDonhang.push(item);
    }
  }
  TinhTong(items: any, fieldTong: any) {
    return (items?.reduce((sum: any, item: any) => sum + (item[fieldTong] || 0), 0) ||0);
  }
  dialog = inject(MatDialog);
  dialogCreateRef: any;
  Phieuchia:any[] = [];
  openCreateDialog(teamplate: TemplateRef<any>) {
    this.Phieuchia = this.editDonhang.map((v: any) => ({
      makh: v.khachhang?.makh,
      name: v.khachhang?.name,
      madonhang:v.madonhang,
      ngaygiao:v.ngaygiao,
      sanpham: v.sanpham.map((v1: any) => ({
        masp:v1.masp,
        title: v1.title,
        dvt: v1.dvt,
        slgiao: v1.slgiao,
        giaban: v1.giaban,
        ttgiao: v1.ttgiao,
      })),
    }));
    console.log(this.Phieuchia);
    this.dialogCreateRef = this.dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true,
    });
  }
  async openPreviewExport(teamplate: TemplateRef<any>) {
    if (this.editDonhang.length > 0) {
      const ListExport:any = await this.ChuyendoiExport(this.editDonhang);
      this.exampleExport = this.convertFlatData(ListExport[0]||{});
      console.log('exampleExport',this.exampleExport);
      
      this.dialogCreateRef = this.dialog.open(teamplate, {
        hasBackdrop: true,
        disableClose: true,
      });
    } else {
      this._snackBar.open('Vui lòng chọn ít nhất một khách hàng', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning']
      });
    }
  }
  convertFlatData(data:any) {
    // ✅ BUGFIX: Filter out products with slnhan = 0 (not actually received)
    return data?.sanpham
      ?.filter((item:any) => Number(item.slnhan) > 0) // Skip unreceived products
      ?.map((item:any) => ({
        "madonhang": data.madonhang,
        "ngaygiao": data.ngaygiao,
        "masp": item.sanpham.masp,
        "tensp": item.sanpham.title,
        "dvt": item.sanpham.dvt,
        "slnhan": item.slnhan,
        "giaban": item.giaban,
        "ttnhan": item.ttnhan,
        "makh": data.khachhang.makh,
        "tenkh": data.khachhang.name,
        "diachi": data.khachhang.diachi||'',
        "email": data.khachhang.email||'',
        "ghichu": item.ghichu||'',
    }));
  }

  async ChuyendoiExport(item:any){
   const Donhangs =  await this._GraphqlService.findAll('donhang',
    {
      aggressiveCache: true,
      enableStreaming: true,
      where:{
        id:{in:item.map((v:any)=>v.id)},
        ngaygiao:{gte:moment(this.SearchParams.Batdau).startOf('day').toDate(),lte:moment(this.SearchParams.Ketthuc).endOf('day').toDate()},
        status:{in:this.SearchParams.Status},
        // khachhangId:{in:this.SearchParams.khachhangIds.length>0?this.SearchParams.khachhangIds:undefined}
      },
      select: {
        id: true,
        madonhang: true,
        ngaygiao: true,
        sanpham:{
          select:{
            slnhan:true,
            ttnhan:true,
            giaban:true,
            ghichu:true,
            sanpham:{
              select:{
                masp:true,
                title:true,
                dvt:true,
            }
            }
        }},
        khachhang:{
          select:{
            makh:true,
            name:true,
            diachi:true,
            email:true,
          }
        }
      }        
    })
    return Donhangs.data;
  }

  BackStatus()
  {
    this.editDonhang.forEach((v:any) => {
        v.status = 'dadat';
        this._DonhangService.updateDonhang(v);
    });
    this.ngOnInit();
  }


  Hoanthanh()
  {
    this.editDonhang.forEach((v:any) => {
        v.status = 'hoanthanh';
        this._DonhangService.updateDonhang(v);
    });
  }
  getUniqueProducts(): string[] {
    const products = new Set<string>();
    this.Phieuchia.forEach(kh => kh.sanpham.forEach((sp:any) => products.add(sp.title)));
    return Array.from(products);
  }

  getProductQuantity(product: string, makh: string): number | string {
    const customer = this.Phieuchia.find(kh => kh.makh === makh);
    const item = customer?.sanpham.find((sp:any) => sp.title === product);
    return item ? item.slgiao : '';
  }
  getDvtForProduct(product: string) {
    const uniqueProducts = Array.from(
      new Map(this.Phieuchia.flatMap(c => c.sanpham.map((sp:any) => ({ ...sp, makh: c.makh, name: c.name })))
          .map(p => [p.title, p])
      ).values()
  );
    const item = uniqueProducts.find((sp:any) => sp.title === product);
    return item ? item.dvt : '';
  }
  
  CheckItemInDonhang(item: any): boolean {
    return this.editDonhang.findIndex((v) => v.id === item.id) !== -1;
  }
  DeleteDonhang(): void {}
  async LoadDrive() {
    const DriveInfo = {
      IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
      SheetName: 'SPImport',
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
  DoImportData(data: any) {
    console.log(data);
    const transformedData = data.map((v: any) => ({
      title: v.title?.trim() || '',
      masp: v.masp?.trim() || '',
      slug: `${convertToSlug(v?.title?.trim() || '')}_${GenId(5, false)}`,
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt || '',
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      ghichu: v.ghichu || '',
      order: Number(v.order) || 0,
    }));
    // Filter out duplicate masp values
    const uniqueData = transformedData.filter(
      (value: any, index: any, self: any) =>
        index === self.findIndex((t: any) => t.masp === value.masp)
    );
    const listId2 = uniqueData.map((v: any) => v.masp);
    const listId1 = this._DonhangService.ListDonhang().map((v: any) => v.masp);
    const listId3 = listId2.filter((item: any) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map(async (v: any) => {
      const item = this._DonhangService
        .ListDonhang()
        .find((v1) => v1.masp === v.masp);
      if (item) {
        const item1 = { ...item, ...v };
        await this._DonhangService.updateDonhang(item1);
      } else {
        await this._DonhangService.CreateDonhang(v);
      }
    });
    const disableItem = listId3.map(async (v: any) => {
      const item = this._DonhangService
        .ListDonhang()
        .find((v1) => v1.masp === v);
      item.isActive = false;
      await this._DonhangService.updateDonhang(item);
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
  async ImporExcel(event: any) {
    const data = await readExcelFile(event);
    this.DoImportData(data);
  }  
  async ExportExcel(data: any, title: any) {
    this.isExporting = true;   
    
    // Prepare search parameters for server export
    if (this.editDonhang.length > 0) {
      this.SearchParams.ids = this.editDonhang.map((v: any) => v.id);
    } else {
      this.SearchParams.ids = data.map((v: any) => v.id);
    }

    try {
      // First try: Server-based export (original functionality)
      console.log('Attempting server-based Excel export...');
      await this._DonhangService.downloadCongno(this.SearchParams);
      
      // If server export succeeds, show success message
      this._snackBar.open('Xuất file Excel từ server thành công!', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
      
      // Clear selected orders
      this.editDonhang = [];
      
    } catch (serverError) {
      console.warn('Server export failed, falling back to client-side export:', serverError);
      
      try {
        // Fallback: Client-side export with table format
        console.log('Attempting client-side Excel export with table format...');
        
        // Prepare data for client-side export
        let exportData: any[] = [];
        
        if (this.editDonhang.length > 0) {
          // Use selected orders
          const selectedOrders = await this.ChuyendoiExport(this.editDonhang);
          exportData = selectedOrders.flatMap((order: any) => this.convertFlatData(order));
        } else {
          // Use all current data
          const allOrders = await this.ChuyendoiExport(data);
          exportData = allOrders.flatMap((order: any) => this.convertFlatData(order));
        }

        // Generate Excel file with exporttable format
        await this.generateExcelWithTableFormat(exportData, title);
        
        // Show success message for client-side export
        this._snackBar.open('Xuất file Excel (định dạng bảng) thành công!', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        
        // Clear selected orders
        this.editDonhang = [];
        
      } catch (clientError) {
        console.error('Client-side export also failed:', clientError);
        
        // Final fallback: Use the old ExportExcelFallback method
        console.log('Attempting final fallback export...');
        await this.ExportExcelFallback(data, title);
      }
    } finally {
      this.isExporting = false;
    }
  }

  // New method for client-side table format export
  async ExportExcelTableFormat(data: any, title: any) {
    this.isExporting = true;   
    
    try {
      console.log('Exporting Excel with table format...');
      
      // Prepare data for client-side export
      let exportData: any[] = [];
      
      if (this.editDonhang.length > 0) {
        // Use selected orders
        const selectedOrders = await this.ChuyendoiExport(this.editDonhang);
        exportData = selectedOrders.flatMap((order: any) => this.convertFlatData(order));
      } else {
        // Use all current data
        const allOrders = await this.ChuyendoiExport(data);
        exportData = allOrders.flatMap((order: any) => this.convertFlatData(order));
      }

      // Generate Excel file with exporttable format
      await this.generateExcelWithTableFormat(exportData, title);
      
      // Clear selected orders
      this.editDonhang = [];
      
      // Show success message
      this._snackBar.open('Xuất file Excel (định dạng bảng) thành công!', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
      
    } catch (error) {
      console.error('Error exporting Excel with table format:', error);
      
      // Show error message
      this._snackBar.open('Lỗi khi xuất file Excel (định dạng bảng)!', 'Đóng', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    } finally {
      this.isExporting = false;
    }
  }

  /**
   * Fallback method for Excel export using client-side generation
   */
  private async ExportExcelFallback(data: any, title: any) {
    try {
      const columns = [
        'Ngày',
        'Mã Khách Hàng',
        'Tên Khách Hàng',
        'Mã Đơn Hàng',
        'Mã Hàng',
        'Tên Hàng',
        'ĐVT',
        'Số Lượng', 
        'Đơn Giá',
        'Thành Tiền Trước VAT',
        'VAT',
        'Đơn Giá VAT',
        'Thành Tiền Sau VAT',
        'Ghi Chú',  
        'Tổng Tiền Sau Thuế',
      ];

      // Nhóm dữ liệu theo mã khách hàng và tính tổng tiền sau thuế
      let groupedData: any[] = [];
      if(data.length>0){
        groupedData = this.groupDataByCustomer(data);
      }
      else {
        groupedData = this.groupDataByCustomer(this.ListCongno);
      }
      this.writeExcelFileWithMergedCells(groupedData, title, columns);
    } catch (error) {
      console.error('Error in fallback Excel export:', error);
    }
  }

  private groupDataByCustomer(data: any[]): any[] {
    // Tạo map để nhóm theo mã khách hàng
    const customerGroups = new Map();
    
    data.forEach(item => {
      const makh = item.makhachhang;
      if (!customerGroups.has(makh)) {
        customerGroups.set(makh, []);
      }
      customerGroups.get(makh).push(item);
    });

    // Tính tổng tiền sau thuế cho từng khách hàng và chuẩn bị dữ liệu
    const result: any[] = [];
    
    customerGroups.forEach((items, makh) => {
      const totalAmount = items.reduce((sum: number, item: any) => 
        sum + (item.thanhtiensauvat || 0), 0
      );
      
      items.forEach((item: any, index: number) => {
        result.push({
          ...item,
          tongtiensauthue: index === 0 ? totalAmount : null // Chỉ hiển thị tổng ở dòng đầu tiên
        });
      });
    });

    return result;
  }

  private writeExcelFileWithMergedCells(data: any[], title: string, columns: string[]): void {    
    // Tạo dữ liệu cho worksheet
    const worksheetData = data.map(item => ({
      'Ngày': moment(item.ngaygiao).format('DD/MM/YYYY'),
      'Mã Khách Hàng': item.makhachhang,
      'Tên Khách Hàng': item.tenkhachhang,
      'Mã Đơn Hàng': item.madonhang,
      'Mã Hàng': item.mahang,
      'Tên Hàng': item.tenhang,
      'ĐVT': item.dvt,
      'Số Lượng': item.soluong,
      'Đơn Giá': item.dongia,
      'Thành Tiền Trước VAT': item.thanhtientruocvat,
      'VAT': item.vat,
      'Đơn Giá VAT': item.dongiavathoadon,
      'Thành Tiền Sau VAT': item.thanhtiensauvat,
      'Ghi Chú': item.ghichu,
      'Tổng Tiền Sau Thuế': item.tongtiensauthue
    }));

    // Tạo worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
    // Tạo merge ranges cho cột "Tổng Tiền Sau Thuế"
    const mergeRanges = this.createMergeRanges(data);
    
    // Áp dụng merge ranges
    if (mergeRanges.length > 0) {
      worksheet['!merges'] = mergeRanges;
    }

    // Tạo workbook và thêm worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'CongNo');

    // Xuất file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, `${title}_${moment().format('DD_MM_YYYY')}`);
  }

  private createMergeRanges(data: any[]): any[] {
    const mergeRanges: any[] = [];
    const customerGroups = new Map();
    
    // Nhóm theo mã khách hàng và lưu vị trí dòng
    data.forEach((item, index) => {
      const makh = item.makhachhang;
      if (!customerGroups.has(makh)) {
        customerGroups.set(makh, { start: index + 1, count: 0 }); // +1 vì có header
      }
      customerGroups.get(makh).count++;
    });

    // Tạo merge ranges cho cột "Tổng Tiền Sau Thuế" (cột thứ 15, index 14)
    const totalColumnIndex = 14; // Cột "Tổng Tiền Sau Thuế"
    
    customerGroups.forEach((group) => {
      if (group.count > 1) {
        mergeRanges.push({
          s: { r: group.start, c: totalColumnIndex }, // start row, column
          e: { r: group.start + group.count - 1, c: totalColumnIndex } // end row, column
        });
      }
    });

    return mergeRanges;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  // Generate Excel with the same format as exporttable - Multiple sheets by customer
  private async generateExcelWithTableFormat(exportData: any[], title: string): Promise<void> {
    try {
      // Create workbook
      const workbook = XLSX.utils.book_new();
      
      // Group data by customer (makh and tenkh)
      const customerGroups = new Map<string, any[]>();
      
      exportData.forEach(item => {
        const makh = item.makh || 'Unknown';
        const tenkh = item.tenkh || item.tenkhachhang || 'Unknown Customer';
        const key = `${makh}_${tenkh}`;
        
        if (!customerGroups.has(key)) {
          customerGroups.set(key, []);
        }
        customerGroups.get(key)!.push(item);
      });
      
      // If no customer groups, create a single sheet with all data
      if (customerGroups.size === 0) {
        await this.createCustomerSheet(workbook, exportData, 'All Customers', exportData[0] || {});
      } else {
        // Track used sheet names to prevent duplicates
        const usedSheetNames = new Set<string>();
        
        // Create a sheet for each customer group
        customerGroups.forEach((customerData, key) => {
          const customerInfo = customerData[0] || {};
          const customerName = customerInfo.tenkh || customerInfo.tenkhachhang || 'Unknown Customer';
          
          // Clean sheet name (Excel has restrictions on sheet names)
          let sanitizedSheetName = this.sanitizeSheetName(customerName);
          
          // Ensure unique sheet name
          let uniqueSheetName = sanitizedSheetName;
          let counter = 1;
          while (usedSheetNames.has(uniqueSheetName)) {
            // If name would exceed 31 chars with suffix, truncate first
            const suffix = `_${counter}`;
            const maxBaseLength = 31 - suffix.length;
            const baseName = sanitizedSheetName.substring(0, maxBaseLength);
            uniqueSheetName = `${baseName}${suffix}`;
            counter++;
          }
          
          usedSheetNames.add(uniqueSheetName);
          
          this.createCustomerSheet(workbook, customerData, uniqueSheetName, customerInfo);
        });
      }
      
      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, `${title}_${moment().format('DD_MM_YYYY')}`);
      
    } catch (error) {
      console.error('Error generating Excel with table format:', error);
      throw error;
    }
  }

  // Helper method to create a worksheet for each customer
  private createCustomerSheet(workbook: any, customerData: any[], sheetName: string, customerInfo: any): void {
    // Create worksheet data with company header and customer info matching the HTML table structure
    const worksheetData: any[][] = [
      // Row 1: Logo section (colspan 4) + Company info section (colspan 7)
      ['LOGO', '', '', '', 'CÔNG TY TNHH NÔNG SẢN THỰC PHẨM TRẦN GIA', '', '', '', '', '', ''],
      ['', '', '', '', 'HTX: Ấp Lộc Tiến, Xã Mỹ Lộc, Huyện Cần Giuộc, Tỉnh Long An', '', '', '', '', '', ''],
      ['', '', '', '', 'VP: Tòa nhà An Phú Plaza, 117-119 Lý Chính Thắng, P.7. Q.3,', '', '', '', '', '', ''],
      ['', '', '', '', 'TP.HCM Kho sơ chế: 30 Kha Vạn Cân, P. Hiệp Bình Chánh,', '', '', '', '', '', ''],
      ['', '', '', '', 'TP.Thủ Đức, TP.HCM Kho Đà Lạt: 69 Trần Thủ Độ,', '', '', '', '', '', ''],
      ['', '', '', '', 'TT Liên Nghĩa, Huyện Đức Trọng, Tỉnh Lâm Đồng.', '', '', '', '', '', ''],
      ['', '', '', '', 'Website: rausachtrangia.com - Hotline: 090.245.8081', '', '', '', '', '', ''],
      
      // Report title row
      ['CHI TIẾT ĐỐI CHIẾU CÔNG NỢ', '', '', '', '', '', '', '', '', '', ''],
      
      // Date range row
      [`Từ Ngày ${moment(this.SearchParams.Batdau).format('DD/MM/YYYY')} : - Đến Ngày : ${moment(this.SearchParams.Ketthuc).format('DD/MM/YYYY')}`, '', '', '', '', '', '', '', '', '', ''],

      // Customer info rows
      [`Tên Khách Hàng : ${customerInfo.tenkh || customerInfo.tenkhachhang || ''}`, '', '', '', '', '', '', '', '', '', ''],
      [`Địa Chỉ : ${customerInfo.diachi || ''}`, '', '', '', '', '', '', '', '', '', ''],
      [`Người Liên hệ : ${customerInfo.lienhe || ''}`, '', '', '', `Email : ${customerInfo.email || ''}`, '', '', '', '', '', ''],
      
      // Empty row (spacing like in HTML)
      ['', '', '', '', '', '', '', '', '', '', ''],
      
      // Table headers with exact same text as HTML
      ['NGÀY GIAO', 'MÃ KHÁCH HÀNG', 'TÊN KHÁCH HÀNG', 'MÃ ĐƠN HÀNG', 'MÃ HÀNG', 'TÊN HÀNG', 'ĐVT', 'SỐ LƯỢNG', 'ĐƠN GIÁ', 'THÀNH TIỀN', 'GHI CHÚ']
    ];
    
    // Add data rows for this customer
    customerData.sort((a, b) => (a.tensp || '').localeCompare(b.tensp || ''));
    customerData.forEach(item => {
      worksheetData.push([
        moment(item.ngaygiao).format('DD/MM/YYYY') || '',
        item.makh || '',
        item.tenkh || item.tenkhachhang || '',
        item.madonhang || '',
        item.masp || '',
        item.tensp || '',
        item.dvt || '',
        Number(item.slnhan) || 0,
        Number(item.giaban) || 0,
        Number(item.ttnhan) || 0,
        item.ghichu || ''
      ]);
    });
    
    // Calculate totals for this customer
    const totalQuantity = customerData.reduce((sum, item) => sum + (Number(item.slnhan) || 0), 0);
    const totalAmount = customerData.reduce((sum, item) => sum + (Number(item.ttnhan) || 0), 0);
    
    // Add summary row
    worksheetData.push([
      '', '', '', '', '', 'TỔNG CỘNG:', '', totalQuantity, '', totalAmount, ''
    ]);
    
    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Add company logo image
    // this.addLogoToWorksheet(worksheet, workbook);
    
    // Set column widths
    const columnWidths = [
      { wch: 12 }, // NGÀY GIAO
      { wch: 15 }, // MÃ KHÁCH HÀNG
      { wch: 25 }, // TÊN KHÁCH HÀNG
      { wch: 15 }, // MÃ ĐƠN HÀNG
      { wch: 12 }, // MÃ HÀNG
      { wch: 30 }, // TÊN HÀNG
      { wch: 8 },  // ĐVT
      { wch: 12 }, // SỐ LƯỢNG
      { wch: 15 }, // ĐƠN GIÁ
      { wch: 15 }, // THÀNH TIỀN
      { wch: 20 }  // GHI CHÚ
    ];
    worksheet['!cols'] = columnWidths;
    
    // Add merges for header sections matching the HTML table structure
    const merges = [
      // Logo section (rows 0-6, cols 0-3)
      { s: { r: 0, c: 0 }, e: { r: 6, c: 3 } }, // Logo area
      
      // Company info section (rows 0-6, cols 4-10)
      { s: { r: 0, c: 4 }, e: { r: 0, c: 10 } }, // Company name
      { s: { r: 1, c: 4 }, e: { r: 1, c: 10 } }, // HTX address
      { s: { r: 2, c: 4 }, e: { r: 2, c: 10 } }, // VP address line 1
      { s: { r: 3, c: 4 }, e: { r: 3, c: 10 } }, // VP address line 2
      { s: { r: 4, c: 4 }, e: { r: 4, c: 10 } }, // Kho address line 1
      { s: { r: 5, c: 4 }, e: { r: 5, c: 10 } }, // Kho address line 2
      { s: { r: 6, c: 4 }, e: { r: 6, c: 10 } }, // Website and hotline
      
      // Report title
      { s: { r: 7, c: 0 }, e: { r: 7, c: 10 } }, // Report title
      
      // Date range
      { s: { r: 8, c: 0 }, e: { r: 8, c: 10 } }, // Date range
      
      // Customer info
      { s: { r: 9, c: 0 }, e: { r: 9, c: 10 } }, // Customer name
      { s: { r: 10, c: 0 }, e: { r: 10, c: 10 } }, // Customer address
      
      // Contact person and email row (matching HTML: colspan 4 and colspan 7)
      { s: { r: 11, c: 0 }, e: { r: 11, c: 3 } }, // Contact person (colspan 4)
      { s: { r: 11, c: 4 }, e: { r: 11, c: 10 } }, // Email (colspan 7)
      
      // Empty row
      { s: { r: 12, c: 0 }, e: { r: 12, c: 10 } } // Empty spacing row
    ];
    worksheet['!merges'] = merges;
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  }

  // Helper method to sanitize sheet names for Excel compatibility
  private sanitizeSheetName(name: string): string {
    // Excel sheet names cannot contain these characters: / \ ? * [ ]
    // Also limit to 31 characters but preserve Vietnamese characters
    let sanitized = name
      .replace(/[\/\\?*\[\]]/g, '_')
      .trim();
    
    // Limit to 31 characters (Excel limit)
    if (sanitized.length > 31) {
      sanitized = sanitized.substring(0, 31);
    }
    
    // Ensure it's not empty
    if (!sanitized || sanitized.length === 0) {
      sanitized = 'Customer';
    }
    
    return sanitized;
  }

  // Method to add company logo to Excel worksheet
  private async addLogoToWorksheet(worksheet: any, workbook: any): Promise<void> {
    try {
      // Try to load the actual company logo
      const logoUrl = '/images/logo.svg';
      const logoBase64 = await this.loadImageAsBase64(logoUrl);
      
      if (logoBase64) {
        // For now, we'll style the logo cell since xlsx-js-style has limited image support
        // In a full implementation, you might want to use a server-side solution for images
        console.log('Logo loaded successfully for Excel');
      }
      
      // Style the logo cell to make it look professional
      const logoCell = worksheet['A1'];
      if (logoCell) {
        logoCell.s = {
          font: { 
            bold: true, 
            size: 12, 
            color: { rgb: "2E5A87" },
            name: "Arial"
          },
          alignment: { 
            horizontal: "center", 
            vertical: "center" 
          },
          fill: {
            fgColor: { rgb: "F8F9FA" }
          },
          border: {
            top: { style: "thin", color: { rgb: "D1D5DB" } },
            bottom: { style: "thin", color: { rgb: "D1D5DB" } },
            left: { style: "thin", color: { rgb: "D1D5DB" } },
            right: { style: "thin", color: { rgb: "D1D5DB" } }
          }
        };
        
        // Change the logo cell content to company name styled nicely
        logoCell.v = 'CÔNG TY TRẦN GIA';
        logoCell.t = 's';
      }
      
    } catch (error) {
      console.warn('Could not load/add logo to Excel file:', error);
      // Gracefully continue with styled text instead of logo
      const logoCell = worksheet['A1'];
      if (logoCell) {
        logoCell.v = 'LOGO';
        logoCell.s = {
          font: { bold: true, size: 10 },
          alignment: { horizontal: "center", vertical: "center" },
          fill: { fgColor: { rgb: "E5E7EB" } }
        };
      }
    }
  }

  // Method to load image as base64
  private async loadImageAsBase64(imageUrl: string): Promise<string | null> {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to load image');
      
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn('Failed to load image:', error);
      return null;
    }
  }

  printContent()
  {
    const element = document.getElementById('printContent');
    if (!element) return;

    html2canvas(element, { scale: 2 }).then(canvas => {
      const imageData = canvas.toDataURL('image/png');

      // Mở cửa sổ mới và in ảnh
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      printWindow.document.write(`
        <html>
          <head>
            <title>Phiếu Chia Hàng ${moment().format("DD/MM/YYYY")}</title>
          </head>
          <body style="text-align: center;">
            <img src="${imageData}" style="max-width: 100%;"/>
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() { window.close(); };
              };
            </script>
          </body>
        </html>
      `);

      printWindow.document.close();
    });
  }
  
  /**
   * Đồng bộ giá và VAT cho các đơn hàng đã chọn
   */
  async DongboVat() {
    this.openDongboDialog();
  }

  /**
   * Mở dialog xác nhận đồng bộ
   */
  openDongboDialog() {
    if (this.editDonhang.length === 0) {
      this._snackBar.open('Không có đơn hàng nào để đồng bộ', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    const dialogRef = this.dialog.open(this.confirmDongboDialog, {
      hasBackdrop: true,
      disableClose: true,
      width: '600px',
      maxWidth: '90vw'
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.executeDongboVat();
      }
    });
  }

  /**
   * Thực thi đồng bộ giá và VAT
   */
  async executeDongboVat() {
    this.isLoading = true;
    
    // Hiển thị progress snackbar
    let progressSnackbar = this._snackBar.open(
      `Đang đồng bộ giá và VAT cho ${this.editDonhang.length} đơn hàng...`, 
      'Đang xử lý', 
      {
        duration: 0, // Không tự động đóng
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      }
    );

    try {
      // Bước 1: Đồng bộ giá từ bảng giá
      const priceResult = await this._DonhangService.DongboGia(this.editDonhang);

      if (!priceResult || priceResult.status !== 'success') {
        throw new Error(priceResult?.message || 'Lỗi đồng bộ giá');
      }

      // Bước 2: Tính VAT cho các đơn hàng đã cập nhật giá
      let vatUpdatedCount = 0;
      let vatErrorCount = 0;
      const vatErrors: string[] = [];

      // Lấy lại dữ liệu đơn hàng mới nhất sau khi đồng bộ giá
      await this.loadData(this.SearchParams);

      // Xử lý VAT cho từng đơn hàng trong editDonhang
      for (const order of this.editDonhang) {
        try {
          // Tìm đơn hàng đã được cập nhật giá
          const updatedOrder: any = this.dataSource.data.find((o: any) => o.id === order.id);
          const tongtien = Number(updatedOrder?.tongtien || order.tongtien) || 0;
          const vatRate = Number(updatedOrder?.vat || order.vat) || 0.05; // Mặc định 5% nếu không có
          const tongvat = tongtien * vatRate;

          // Cập nhật VAT qua GraphQL
          await this._GraphqlService.updateOne('donhang', 
            { id: order.id }, 
            { 
              tongvat: Math.round(tongvat * 100) / 100, // Làm tròn 2 chữ số thập phân
              vat: vatRate 
            }
          );

          // Cập nhật trong danh sách local
          order.tongvat = Math.round(tongvat * 100) / 100;
          order.tongtien = tongtien;
          vatUpdatedCount++;

        } catch (error: any) {
          console.error(`Error updating VAT for order ${order.madonhang}:`, error);
          vatErrorCount++;
          vatErrors.push(`${order.madonhang}: ${error.message || 'Lỗi không xác định'}`);
        }
      }

      // Đóng progress snackbar
      progressSnackbar.dismiss();

      // Hiển thị kết quả tổng hợp
      if (priceResult.updatedCount > 0 || vatUpdatedCount > 0) {
        let message = `✅ Đồng bộ hoàn tất!\n`;
        
        // Thông tin đồng bộ giá
        if (priceResult.updatedCount !== undefined) {
          const priceSuccessRate = Math.round((priceResult.updatedCount / priceResult.totalProcessed) * 100);
          message += `📊 Giá: ${priceResult.updatedCount}/${priceResult.totalProcessed} đơn hàng (${priceSuccessRate}%)\n`;
          
          if (priceResult.errorCount > 0) {
            message += `⚠️ Lỗi giá: ${priceResult.errorCount} đơn hàng\n`;
          }
        }

        // Thông tin đồng bộ VAT
        const vatSuccessRate = Math.round((vatUpdatedCount / this.editDonhang.length) * 100);
        message += `💰 VAT: ${vatUpdatedCount}/${this.editDonhang.length} đơn hàng (${vatSuccessRate}%)`;
        
        if (vatErrorCount > 0) {
          message += `\n⚠️ Lỗi VAT: ${vatErrorCount} đơn hàng`;
          console.warn('VAT sync errors:', vatErrors);
        }

        this._snackBar.open(message, '✅ Thành công', {
          duration: 8000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        // Refresh data để đồng bộ với server
        await this.loadData(this.SearchParams);
        
        // Clear selection sau khi hoàn thành
        this.editDonhang = [];
      } else {
        this._snackBar.open('❌ Không có đơn hàng nào được cập nhật', 'Đóng', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }

    } catch (error: any) {
      console.error('Error syncing prices and VAT:', error);
      
      // Đóng progress snackbar nếu còn mở
      progressSnackbar.dismiss();
      
      let errorMessage = 'Lỗi khi đồng bộ giá và VAT';
      
      // Xử lý các loại lỗi phổ biến
      if (error?.error?.message) {
        errorMessage = error.error.message;
        if (error.error.message.includes('Transaction already closed')) {
          errorMessage = '⏱️ Thao tác mất quá nhiều thời gian. Vui lòng thử lại với ít đơn hàng hơn.';
        }
      } else if (error?.message) {
        errorMessage = error.message;
        if (error.message.includes('timeout')) {
          errorMessage = '⏱️ Hết thời gian chờ. Hệ thống đang xử lý quá nhiều đơn hàng cùng lúc.';
        }
      }

      this._snackBar.open(`❌ ${errorMessage}`, 'Đóng', {
        duration: 6000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoading = false;
    }
  }
  
  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
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
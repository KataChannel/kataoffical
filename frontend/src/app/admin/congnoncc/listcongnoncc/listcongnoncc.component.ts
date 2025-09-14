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
import moment from 'moment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { DathangService } from '../../dathang/dathang.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { TrangThaiDon } from '../../../shared/utils/trangthai';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { GraphqlService } from '../../../shared/services/graphql.service';
@Component({
  selector: 'app-listcongnoncc',
  templateUrl: './listcongnoncc.component.html',
  styleUrls: ['./listcongnoncc.component.scss'],
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
export class ListcongnonccComponent {
  Detail: any = {};
  
  // Loading states
  isLoading = false;
  isSearching = false;
  isExporting = false;
  isShowKH = true;
  displayedColumns: string[] = [
    'ngaygiao',
    'madathang',
    'mancc',
    'name',
    'soluong',
    'tong',
    'tongvat',
    'tongtien',
  ];
  ColumnName: any = {
    ngaygiao: 'Ngày Giao',
    madathang: 'Mã Đơn Hàng',
    mancc: 'Mã Nhà Cung Cấp',
    name: 'Tên Nhà Cung Cấp',
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
  filterValues: { [key: string]: string } = {};
  private _DathangService: DathangService = inject(DathangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _GraphqlService: GraphqlService = inject(GraphqlService);
  private _router: Router = inject(Router);
  Listdathang: any = this._DathangService.ListDathang;
  ListCongnoncc:any =[];
  filterListCongnoncc:any = [];
  ListNhomCongnoncc:any =[];
  filterListNhomCongnoncc:any = [];
  SelectedCongnoncc: any[] = []; // Array to store selected customers
  SelectedNhomCongnoncc: any[] = []; // Array to store selected customers
  ListCongno:any = [];
  dataSource = new MatTableDataSource([]);
  dathangId: any = this._DathangService.dathangId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  SearchParams: any = {
    Batdau: moment().toDate(),
    Ketthuc: moment().toDate(),
    Status:['danhan','hoanthanh'],
    congnonccIds: [], // Array of selected supplier IDs
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
    return typeof customer === 'string' ? customer : (customer.name || customer.mancc || 'Unknown');
  }

  // Display function for customer group names in chips
  getNhomCongnonccName(nhom: any): string {
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
      // this.Listdathang().forEach((v: any) => {
      //   const mancc = v.macongnoncc;
      //   const tenkh = v.tencongnoncc;
      //   if (mancc && !uniqueCustomers.has(mancc)) {
      //   uniqueCustomers.set(mancc, tenkh);
      //   }
      // });
      // // Convert Map to array
      // this.ListCongnoncc = this.filterListCongnoncc = Array.from(uniqueCustomers.values());
      // console.log('ListCongnoncc', this.ListCongnoncc);
    } finally {
      this.isSearching = false;
    }
  }
ListExport:any =[]
onCongnonccChange(event: MatAutocompleteSelectedEvent){
  // Use the chips autocomplete method for consistency
  this.onCustomerSelected(event);
}
onNhomCongnonccChange(event: MatAutocompleteSelectedEvent){
  // Use the chips autocomplete method for consistency
  this.onNhomCongnonccSelected(event);
}

// Method to handle customer group selection from chips autocomplete
onNhomCongnonccSelected(event: MatAutocompleteSelectedEvent): void {
  const selectedValue = event.option.value; // This is now a string (name)
  
  // Find the full object from the list to store it
  const fullObject = this.ListNhomCongnoncc.find((item: any) => 
    (typeof item === 'string' ? item : item.name) === selectedValue
  );
  
  const objectToAdd = fullObject || selectedValue;
  
  // Check if customer group is already selected (avoid duplicates)
  const isAlreadySelected = this.SelectedNhomCongnoncc.some(nhomKH => 
    (typeof nhomKH === 'string' ? nhomKH : nhomKH.name) === selectedValue
  );
  
  if (!isAlreadySelected) {
    this.SelectedNhomCongnoncc.push(objectToAdd);
    // You can add nhomCongnonccIds to SearchParams if needed
    // this.SearchParams.nhomCongnonccIds = this.SelectedNhomCongnoncc.map(nhomKH => 
    //   typeof nhomKH === 'string' ? nhomKH : nhomKH.id || nhomKH.name
    // );
    
    // Add corresponding customers from the selected customer group
    this.addCustomersFromGroup(fullObject);
    
    // Refresh the filter lists to exclude newly selected items
    this.refreshNhomCongnonccFilter();
    this.refreshCustomerFilter();
  }
  
  // Clear the input after selection
  setTimeout(() => {
    const inputs = document.querySelectorAll('input[matautocomplete]');
    inputs.forEach((input: any) => {
      if (input.placeholder.includes('nhóm nhà cung cấp') || input.placeholder.includes('Thêm nhóm nhà cung cấp')) {
        input.value = '';
      }
    });
  }, 100);
}

@Debounce(100)
doFilterCongnoncc(event: Event){
  const query = (event.target as HTMLInputElement).value.toLowerCase();
  console.log('query', query);
  
  // Get list of already selected customer names
  const selectedNames = this.SelectedCongnoncc.map(customer => 
    typeof customer === 'string' ? customer : customer.name
  );
  
  // Filter out already selected customers
  let availableCustomers = this.ListCongnoncc.filter((item: any) => {
    const itemName = typeof item === 'string' ? item : item.name;
    return !selectedNames.includes(itemName);
  });
  
  if(!query) {
    this.filterListCongnoncc = availableCustomers;
    return;
  }
  this.filterListCongnoncc = availableCustomers.filter((item: any) =>
    item?.name?.toLowerCase().includes(query) || removeVietnameseAccents(item?.name).toLowerCase().includes(removeVietnameseAccents(query))
    || item?.mancc?.toLowerCase().includes(query) || removeVietnameseAccents(item?.mancc).toLowerCase().includes(removeVietnameseAccents(query))
  );
}

@Debounce(100)
doFilterNhomCongnoncc(event: Event){
  const query = (event.target as HTMLInputElement).value.toLowerCase();
  console.log('query', query);
  
  // Get list of already selected customer group names
  const selectedNames = this.SelectedNhomCongnoncc.map(nhomKH => 
    typeof nhomKH === 'string' ? nhomKH : nhomKH.name
  );
  
  // Filter out already selected customer groups
  let availableGroups = this.ListNhomCongnoncc.filter((item: any) => {
    const itemName = typeof item === 'string' ? item : item.name;
    return !selectedNames.includes(itemName);
  });
  
  if(!query) {
    this.filterListNhomCongnoncc = availableGroups;
    return;
  }
  
  this.filterListNhomCongnoncc = availableGroups.filter((item: any) => {
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
  const fullObject = this.ListCongnoncc.find((item: any) => 
    (typeof item === 'string' ? item : item.name) === selectedValue
  );
  
  const objectToAdd = fullObject || selectedValue;
  
  // Check if customer is already selected (avoid duplicates)
  const isAlreadySelected = this.SelectedCongnoncc.some(customer => 
    (typeof customer === 'string' ? customer : customer.name) === selectedValue
  );
  
  if (!isAlreadySelected) {
    this.SelectedCongnoncc.push(objectToAdd);
    this.SearchParams.congnonccIds = this.SelectedCongnoncc.map(customer => 
      typeof customer === 'string' ? customer : customer.id
    );
    
    // Refresh the filter list to exclude the newly selected customer
    this.refreshCustomerFilter();
  }
  
  // Clear the input after selection
  setTimeout(() => {
    const inputs = document.querySelectorAll('input[matautocomplete]');
    inputs.forEach((input: any) => {
      if (input.placeholder.includes('nhà cung cấp') || input.placeholder.includes('Thêm nhà cung cấp')) {
        input.value = '';
      }
    });
  }, 100);
}

// Method to remove selected customer
removeSelectedCustomer(customer: any): void {
  const index = this.SelectedCongnoncc.findIndex(item => 
    (typeof item === 'string' ? item : item.name) === (typeof customer === 'string' ? customer : customer.name)
  );
  if (index >= 0) {
    this.SelectedCongnoncc.splice(index, 1);
    this.SearchParams.congnonccIds = this.SelectedCongnoncc.map(customer => 
      typeof customer === 'string' ? customer : customer.id
    );
    
    // Refresh the filter list to include the removed customer
    this.refreshCustomerFilter();
  }
}
removeSelectedNhomcongnoncc(nhomKH: any): void {
  const index = this.SelectedNhomCongnoncc.findIndex(item => 
    (typeof item === 'string' ? item : item.name) === (typeof nhomKH === 'string' ? nhomKH : nhomKH.name)
  );
  if (index >= 0) {
    // Remove corresponding customers from the group before removing the group
    this.removeCustomersFromGroup(nhomKH);
    
    this.SelectedNhomCongnoncc.splice(index, 1);
    // Update SearchParams if you have nhomCongnonccIds
    // this.SearchParams.nhomCongnonccIds = this.SelectedNhomCongnoncc.map(nhomKH => 
    //   typeof nhomKH === 'string' ? nhomKH : nhomKH.id || nhomKH.name
    // );
    
    // Refresh the filter lists to include removed items
    this.refreshNhomCongnonccFilter();
    this.refreshCustomerFilter();
  }
}

// Method to clear all selected customers
clearAllSelectedCustomers(): void {
  this.SelectedCongnoncc = [];
  this.SearchParams.congnonccIds = [];
  
  // Refresh the filter list to show all customers again
  this.refreshCustomerFilter();
}
clearAllSelectedNhomCongnoncc(): void {
  // Remove all customers from selected groups before clearing groups
  this.SelectedNhomCongnoncc.forEach(nhomKH => {
    this.removeCustomersFromGroup(nhomKH);
  });
  
  this.SelectedNhomCongnoncc = [];
  // this.SearchParams.congnonccIds = [];
  
  // Refresh the filter lists to show all items again
  this.refreshNhomCongnonccFilter();
  this.refreshCustomerFilter();
}

// Helper methods to refresh filter lists
private refreshCustomerFilter(): void {
  const selectedNames = this.SelectedCongnoncc.map(customer => 
    typeof customer === 'string' ? customer : customer.name
  );
  
  this.filterListCongnoncc = this.ListCongnoncc.filter((item: any) => {
    const itemName = typeof item === 'string' ? item : item.name;
    return !selectedNames.includes(itemName);
  });
}

private refreshNhomCongnonccFilter(): void {
  const selectedNames = this.SelectedNhomCongnoncc.map(nhomKH => 
    typeof nhomKH === 'string' ? nhomKH : nhomKH.name
  );
  
  this.filterListNhomCongnoncc = this.ListNhomCongnoncc.filter((item: any) => {
    const itemName = typeof item === 'string' ? item : item.name;
    return !selectedNames.includes(itemName);
  });
}

// Helper method to add customers from a selected customer group
private addCustomersFromGroup(nhomCongnoncc: any): void {
  if (!nhomCongnoncc || typeof nhomCongnoncc === 'string') return;
  
  // Get customers from the customer group
  const customersInGroup = nhomCongnoncc.congnoncc || [];
  
  customersInGroup.forEach((customer: any) => {
    // Check if customer is not already selected
    const isAlreadySelected = this.SelectedCongnoncc.some(selectedCustomer => 
      (typeof selectedCustomer === 'string' ? selectedCustomer : selectedCustomer.name) === customer.name
    );
    
    if (!isAlreadySelected) {
      this.SelectedCongnoncc.push(customer);
    }
  });
  
  // Update SearchParams
  this.SearchParams.congnonccIds = this.SelectedCongnoncc.map(customer => 
    typeof customer === 'string' ? customer : customer.id
  );
}

// Helper method to remove customers from a deselected customer group
private removeCustomersFromGroup(nhomCongnoncc: any): void {
  if (!nhomCongnoncc || typeof nhomCongnoncc === 'string') return;
  
  // Get customers from the customer group
  const customersInGroup = nhomCongnoncc.congnoncc || [];
  
  customersInGroup.forEach((customer: any) => {
    const index = this.SelectedCongnoncc.findIndex(selectedCustomer => 
      (typeof selectedCustomer === 'string' ? selectedCustomer : selectedCustomer.name) === customer.name
    );
    
    if (index >= 0) {
      this.SelectedCongnoncc.splice(index, 1);
    }
  });
  
  // Update SearchParams
  this.SearchParams.congnonccIds = this.SelectedCongnoncc.map(customer => 
    typeof customer === 'string' ? customer : customer.id
  );
}

  async loadData(query:any): Promise<void> {
    this.isLoading = true;
    try {
      // await this._DathangService.searchCongno(query);
      this.SearchCongno();
      // console.log(this.Listdathang());      
      this.CountItem = this.Listdathang().length||0;
      // Nhóm dữ liệu theo nhà cung cấp để tính tổng tiền sau thuế
      const supplierTotals = new Map();
      // Tính tổng tiền sau thuế cho từng nhà cung cấp
      this.ListCongno = this.Listdathang()
      console.log(this.ListCongno);
      
      this.dataSource = new MatTableDataSource(this.ListCongno);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
      // this.paginator._intl.itemsPerPageLabel = 'Số lượng 1 trang';
      // this.paginator._intl.nextPageLabel = 'Tiếp Theo';
      // this.paginator._intl.previousPageLabel = 'Về Trước';
      // this.paginator._intl.firstPageLabel = 'Trang Đầu';
      // this.paginator._intl.lastPageLabel = 'Trang Cuối';

      const Congnonccs = await this._GraphqlService.findAll('nhacungcap', {
        aggressiveCache: true,
        enableStreaming: true,
        select: {
          id: true,
          name: true,
          mancc:true,
        },
      });
      this.ListCongnoncc = this.filterListCongnoncc = Congnonccs.data

      const NhomCongnonccs = await this._GraphqlService.findAll('nhomncc', {
        aggressiveCache: true,
        enableStreaming: true,
        select: {
          id: true,
          name: true,
          description:true,
          nhacungcap:{select:{
            id:true,
            name:true,
            mancc:true
            }}
        },
      });
      this.ListNhomCongnoncc = this.filterListNhomCongnoncc = NhomCongnonccs.data
      // console.log(this.filterListCongnoncc);
      // console.log(this.filterListNhomCongnoncc);
  
    } finally {
      this.isLoading = false;
    }
  }
  async SearchCongno(){
    const Dathangs = await this._GraphqlService.findAll('dathang', {
      where: {
        ...(this.SearchParams.congnonccIds.length > 0 && {
          nhacungcapId: { in: this.SearchParams.congnonccIds }
        }),
        ngaynhan: {
          gte: moment(this.SearchParams.Batdau).startOf('day').toDate(),
          lte: moment(this.SearchParams.Ketthuc).endOf('day').toDate()
        },
        // status: { in: this.SearchParams.Status }
      }
    });
    // console.log(Dathangs);
    this._DathangService.ListDathang.update(() => Dathangs.data);
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
    this.dataSource.filteredData = this.Listdathang().filter((v: any) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase())||v[column].toLowerCase().includes(event.target.value.toLowerCase()));  
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
    this.ListFilter = this.Listdathang();
    this.dataSource.data = this.Listdathang();
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

    this.dataSource.data = this.Listdathang().filter((v: any) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }


  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/congnocongnoncc', 0]);
  }
  goToDetail(item: any): void {
    this._DathangService.setDathangId(item.id);
    this.drawer.open();
    this._router.navigate(['admin/congnocongnoncc', item.id]);
  }
  ToggleAll(): void {
    if (this.editDathang.length === this.dataSource.filteredData.length) {
      this.editDathang = [];
    } else {
      this.editDathang = [...this.dataSource.filteredData];
    }
  }

  editDathang: any[] = [];
  toggleDathang(item: any): void {
    const index = this.editDathang.findIndex((v) => v.id === item.id);
    if (index !== -1) {
      this.editDathang.splice(index, 1);
    } else {
      this.editDathang.push(item);
    }
  }
  TinhTong(items: any, fieldTong: any) {
    return (items?.reduce((sum: any, item: any) => sum + (item[fieldTong] || 0), 0) ||0);
  }
  dialog = inject(MatDialog);
  dialogCreateRef: any;
  Phieuchia:any[] = [];
  openCreateDialog(teamplate: TemplateRef<any>) {
    this.Phieuchia = this.editDathang.map((v: any) => ({
      mancc: v.congnoncc?.mancc,
      name: v.congnoncc?.name,
      madathang:v.madathang,
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
    if (this.editDathang.length > 0) {
      const ListExport:any = await this.ChuyendoiExport(this.editDathang);
      this.exampleExport = this.convertFlatData(ListExport[0]||{});
      console.log('exampleExport',this.exampleExport);
      
      this.dialogCreateRef = this.dialog.open(teamplate, {
        hasBackdrop: true,
        disableClose: true,
      });
    } else {
      this._snackBar.open('Vui lòng chọn ít nhất một nhà cung cấp', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning']
      });
    }
  }
  convertFlatData(data:any) {
    return data?.sanpham?.map((item:any) => ({
        "madathang": data.madathang,
        "ngaygiao": data.ngaygiao,
        "masp": item.sanpham.masp,
        "tensp": item.sanpham.title,
        "dvt": item.sanpham.dvt,
        "slnhan": item.slnhan,
        "giaban": item.giaban,
        "ttnhan": item.ttnhan,
        "mancc": data.congnoncc.mancc,
        "tenkh": data.congnoncc.name,
        "diachi": data.congnoncc.diachi||'',
        "email": data.congnoncc.email||'',
        "ghichu": item.ghichu||'',
    }));
  }

  async ChuyendoiExport(item:any){
   const Dathangs =  await this._GraphqlService.findAll('dathang',
    {
      aggressiveCache: true,
      enableStreaming: true,
      where:{
        id:{in:item.map((v:any)=>v.id)},
        ngaygiao:{gte:moment(this.SearchParams.Batdau).startOf('day').toDate(),lte:moment(this.SearchParams.Ketthuc).endOf('day').toDate()},
        status:{in:this.SearchParams.Status},
        // congnonccId:{in:this.SearchParams.congnonccIds.length>0?this.SearchParams.congnonccIds:undefined}
      },
      select: {
        id: true,
        madathang: true,
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
        congnoncc:{
          select:{
            mancc:true,
            name:true,
            diachi:true,
            email:true,
          }
        }
      }        
    })
    return Dathangs.data;
  }

  BackStatus()
  {
    this.editDathang.forEach((v:any) => {
        v.status = 'dadat';
        this._DathangService.updateDathang(v);
    });
    this.ngOnInit();
  }


  Hoanthanh()
  {
    this.editDathang.forEach((v:any) => {
        v.status = 'hoanthanh';
        this._DathangService.updateDathang(v);
    });
  }
  getUniqueProducts(): string[] {
    const products = new Set<string>();
    this.Phieuchia.forEach(kh => kh.sanpham.forEach((sp:any) => products.add(sp.title)));
    return Array.from(products);
  }

  getProductQuantity(product: string, mancc: string): number | string {
    const customer = this.Phieuchia.find(kh => kh.mancc === mancc);
    const item = customer?.sanpham.find((sp:any) => sp.title === product);
    return item ? item.slgiao : '';
  }
  getDvtForProduct(product: string) {
    const uniqueProducts = Array.from(
      new Map(this.Phieuchia.flatMap(c => c.sanpham.map((sp:any) => ({ ...sp, mancc: c.mancc, name: c.name })))
          .map(p => [p.title, p])
      ).values()
  );
    const item = uniqueProducts.find((sp:any) => sp.title === product);
    return item ? item.dvt : '';
  }
  
  CheckItemInDathang(item: any): boolean {
    return this.editDathang.findIndex((v) => v.id === item.id) !== -1;
  }
  DeleteDathang(): void {}
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
    //   const item = this._CongnonccsService
    //     .ListCongnoncc()
    //     .find((v1) => v1.Mancc === v.Mancc);
    //   if (item) {
    //     const item1 = { ...item, ...v };
    //     console.log(item1);

    //     await this._CongnonccsService.updateOneCongnoncc(item1);
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
    const listId1 = this._DathangService.ListDathang().map((v: any) => v.masp);
    const listId3 = listId2.filter((item: any) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map(async (v: any) => {
      const item = this._DathangService
        .ListDathang()
        .find((v1) => v1.masp === v.masp);
      if (item) {
        const item1 = { ...item, ...v };
        await this._DathangService.updateDathang(item1);
      } else {
        await this._DathangService.CreateDathang(v);
      }
    });
    const disableItem = listId3.map(async (v: any) => {
      const item = this._DathangService
        .ListDathang()
        .find((v1) => v1.masp === v);
      item.isActive = false;
      await this._DathangService.updateDathang(item);
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
    if (this.editDathang.length > 0) {
      this.SearchParams.ids = this.editDathang.map((v: any) => v.id);
    } else {
      this.SearchParams.ids = data.map((v: any) => v.id);
    }

    try {
      // First try: Server-based export (original functionality)
      console.log('Attempting server-based Excel export...');
      // await this._DathangService.downloadCongno(this.SearchParams);
      
      // If server export succeeds, show success message
      this._snackBar.open('Xuất file Excel từ server thành công!', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
      
      // Clear selected orders
      this.editDathang = [];
      
    } catch (serverError) {
      console.warn('Server export failed, falling back to client-side export:', serverError);
      
      try {
        // Fallback: Client-side export with table format
        console.log('Attempting client-side Excel export with table format...');
        
        // Prepare data for client-side export
        let exportData: any[] = [];
        
        if (this.editDathang.length > 0) {
          // Use selected orders
          const selectedOrders = await this.ChuyendoiExport(this.editDathang);
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
        this.editDathang = [];
        
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
      
      if (this.editDathang.length > 0) {
        // Use selected orders
        const selectedOrders = await this.ChuyendoiExport(this.editDathang);
        exportData = selectedOrders.flatMap((order: any) => this.convertFlatData(order));
      } else {
        // Use all current data
        const allOrders = await this.ChuyendoiExport(data);
        exportData = allOrders.flatMap((order: any) => this.convertFlatData(order));
      }

      // Generate Excel file with exporttable format
      await this.generateExcelWithTableFormat(exportData, title);
      
      // Clear selected orders
      this.editDathang = [];
      
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
        'Mã Nhà Cung Cấp',
        'Tên Nhà Cung Cấp',
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

      // Nhóm dữ liệu theo mã nhà cung cấp và tính tổng tiền sau thuế
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
    // Tạo map để nhóm theo mã nhà cung cấp
    const customerGroups = new Map();
    
    data.forEach(item => {
      const mancc = item.macongnoncc;
      if (!customerGroups.has(mancc)) {
        customerGroups.set(mancc, []);
      }
      customerGroups.get(mancc).push(item);
    });

    // Tính tổng tiền sau thuế cho từng nhà cung cấp và chuẩn bị dữ liệu
    const result: any[] = [];
    
    customerGroups.forEach((items, mancc) => {
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
      'Mã Nhà Cung Cấp': item.macongnoncc,
      'Tên Nhà Cung Cấp': item.tencongnoncc,
      'Mã Đơn Hàng': item.madathang,
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
    
    // Nhóm theo mã nhà cung cấp và lưu vị trí dòng
    data.forEach((item, index) => {
      const mancc = item.macongnoncc;
      if (!customerGroups.has(mancc)) {
        customerGroups.set(mancc, { start: index + 1, count: 0 }); // +1 vì có header
      }
      customerGroups.get(mancc).count++;
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
      
      // Group data by customer (mancc and tenkh)
      const customerGroups = new Map<string, any[]>();
      
      exportData.forEach(item => {
        const mancc = item.mancc || 'Unknown';
        const tenkh = item.tenkh || item.tencongnoncc || 'Unknown Customer';
        const key = `${mancc}_${tenkh}`;
        
        if (!customerGroups.has(key)) {
          customerGroups.set(key, []);
        }
        customerGroups.get(key)!.push(item);
      });
      
      // If no customer groups, create a single sheet with all data
      if (customerGroups.size === 0) {
        await this.createCustomerSheet(workbook, exportData, 'All Customers', exportData[0] || {});
      } else {
        // Create a sheet for each customer group
        customerGroups.forEach((customerData, key) => {
          const customerInfo = customerData[0] || {};
          const customerName = customerInfo.tenkh || customerInfo.tencongnoncc || 'Unknown Customer';
          
          // Clean sheet name (Excel has restrictions on sheet names)
          const sanitizedSheetName = this.sanitizeSheetName(customerName);
          
          this.createCustomerSheet(workbook, customerData, sanitizedSheetName, customerInfo);
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
      [`Tên Nhà Cung Cấp : ${customerInfo.tenkh || customerInfo.tencongnoncc || ''}`, '', '', '', '', '', '', '', '', '', ''],
      [`Địa Chỉ : ${customerInfo.diachi || ''}`, '', '', '', '', '', '', '', '', '', ''],
      [`Người Liên hệ : ${customerInfo.lienhe || ''}`, '', '', '', `Email : ${customerInfo.email || ''}`, '', '', '', '', '', ''],
      
      // Empty row (spacing like in HTML)
      ['', '', '', '', '', '', '', '', '', '', ''],
      
      // Table headers with exact same text as HTML
      ['NGÀY GIAO', 'MÃ NHÀ CUNG CẤP', 'TÊN NHÀ CUNG CẤP', 'MÃ ĐƠN HÀNG', 'MÃ HÀNG', 'TÊN HÀNG', 'ĐVT', 'SỐ LƯỢNG', 'ĐƠN GIÁ', 'THÀNH TIỀN', 'GHI CHÚ']
    ];
    
    // Add data rows for this customer
    customerData.forEach(item => {
      worksheetData.push([
        moment(item.ngaygiao).format('DD/MM/YYYY') || '',
        item.mancc || '',
        item.tenkh || item.tencongnoncc || '',
        item.madathang || '',
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
    this.addLogoToWorksheet(worksheet, workbook);
    
    // Set column widths
    const columnWidths = [
      { wch: 12 }, // NGÀY GIAO
      { wch: 15 }, // MÃ NHÀ CUNG CẤP
      { wch: 25 }, // TÊN NHÀ CUNG CẤP
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
      const logoUrl = '/images/logo-full.png';
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
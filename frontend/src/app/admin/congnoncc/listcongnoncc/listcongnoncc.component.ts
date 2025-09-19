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
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
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
    MatChipsModule,
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
    'ngaynhan',
    'madncc',
    'mancc',
    'name',
    'soluong',
    'tongtien',
  ];
  ColumnName: any = {
    ngaynhan: 'Ngày Nhận',
    madncc: 'Mã Đơn Nhà Cung Cấp',
    mancc: 'Mã Nhà Cung Cấp',
    name: 'Tên Nhà Cung Cấp',
    soluong: 'Số Lượng',
    tongtien: 'Tổng',
  };
  FilterColumns: any[] = JSON.parse(
    localStorage.getItem('CongnonccColFilter') || '[]'
  );
  exampleExport: any = {};
  Columns: any[] = [];
  isFilter: boolean = false;
  Trangthaidon: any = TrangThaiDon;
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
  ListCongnoncc: any = [];
  filterListCongnoncc: any = [];
  ListNhomCongnoncc: any = [];
  filterListNhomCongnoncc: any = [];
  SelectedCongnoncc: any[] = []; // Array to store selected customers
  SelectedNhomCongnoncc: any[] = []; // Array to store selected customers
  ListCongno: any = [];
  dataSource = new MatTableDataSource([]);
  dathangId: any = this._DathangService.dathangId;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  CountItem: any = 0;
  SearchParams: any = {
    Batdau: moment().toDate(),
    Ketthuc: moment().toDate(),
    Status: ['danhan', 'hoanthanh'],
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
    return typeof customer === 'string'
      ? customer
      : customer.name || customer.mancc || 'Unknown';
  }

  // Display function for customer group names in chips
  getNhomCongnonccName(nhom: any): string {
    return typeof nhom === 'string'
      ? nhom
      : nhom.name || nhom.manhom || 'Unknown';
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
      query: filterValue,
    };
    this.loadData(this.SearchParams);
  }

  async ngOnInit(): Promise<void> {
    this.initializeColumns();
    this.setupDrawer();
    this.loadData(this.SearchParams);
  }
  async doSearch() {
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
  ListExport: any = [];
  onCongnonccChange(event: MatAutocompleteSelectedEvent) {
    // Use the chips autocomplete method for consistency
    this.onCustomerSelected(event);
  }
  onNhomCongnonccChange(event: MatAutocompleteSelectedEvent) {
    // Use the chips autocomplete method for consistency
    this.onNhomCongnonccSelected(event);
  }

  // Method to handle customer group selection from chips autocomplete
  onNhomCongnonccSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value; // This is now a string (name)

    // Find the full object from the list to store it
    const fullObject = this.ListNhomCongnoncc.find(
      (item: any) =>
        (typeof item === 'string' ? item : item.name) === selectedValue
    );

    const objectToAdd = fullObject || selectedValue;

    // Check if customer group is already selected (avoid duplicates)
    const isAlreadySelected = this.SelectedNhomCongnoncc.some(
      (nhomKH) =>
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
        if (
          input.placeholder.includes('nhóm nhà cung cấp') ||
          input.placeholder.includes('Thêm nhóm nhà cung cấp')
        ) {
          input.value = '';
        }
      });
    }, 100);
  }

  @Debounce(100)
  doFilterCongnoncc(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('query', query);

    // Get list of already selected customer names
    const selectedNames = this.SelectedCongnoncc.map((customer) =>
      typeof customer === 'string' ? customer : customer.name
    );

    // Filter out already selected customers
    let availableCustomers = this.ListCongnoncc.filter((item: any) => {
      const itemName = typeof item === 'string' ? item : item.name;
      return !selectedNames.includes(itemName);
    });

    if (!query) {
      this.filterListCongnoncc = availableCustomers;
      return;
    }
    this.filterListCongnoncc = availableCustomers.filter(
      (item: any) =>
        item?.name?.toLowerCase().includes(query) ||
        removeVietnameseAccents(item?.name)
          .toLowerCase()
          .includes(removeVietnameseAccents(query)) ||
        item?.mancc?.toLowerCase().includes(query) ||
        removeVietnameseAccents(item?.mancc)
          .toLowerCase()
          .includes(removeVietnameseAccents(query))
    );
  }

  @Debounce(100)
  doFilterNhomCongnoncc(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('query', query);

    // Get list of already selected customer group names
    const selectedNames = this.SelectedNhomCongnoncc.map((nhomKH) =>
      typeof nhomKH === 'string' ? nhomKH : nhomKH.name
    );

    // Filter out already selected customer groups
    let availableGroups = this.ListNhomCongnoncc.filter((item: any) => {
      const itemName = typeof item === 'string' ? item : item.name;
      return !selectedNames.includes(itemName);
    });

    if (!query) {
      this.filterListNhomCongnoncc = availableGroups;
      return;
    }

    this.filterListNhomCongnoncc = availableGroups.filter((item: any) => {
      const name = typeof item === 'string' ? item : item.name || '';
      const description =
        typeof item !== 'string' ? item.description || '' : '';
      return (
        name.toLowerCase().includes(query) ||
        removeVietnameseAccents(name)
          .toLowerCase()
          .includes(removeVietnameseAccents(query)) ||
        description.toLowerCase().includes(query) ||
        removeVietnameseAccents(description)
          .toLowerCase()
          .includes(removeVietnameseAccents(query))
      );
    });
  }

  // Method to handle customer selection from chips autocomplete
  onCustomerSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedValue = event.option.value; // This is now a string (name)

    // Find the full object from the list to store it
    const fullObject = this.ListCongnoncc.find(
      (item: any) =>
        (typeof item === 'string' ? item : item.name) === selectedValue
    );

    const objectToAdd = fullObject || selectedValue;

    // Check if customer is already selected (avoid duplicates)
    const isAlreadySelected = this.SelectedCongnoncc.some(
      (customer) =>
        (typeof customer === 'string' ? customer : customer.name) ===
        selectedValue
    );

    if (!isAlreadySelected) {
      this.SelectedCongnoncc.push(objectToAdd);
      this.SearchParams.congnonccIds = this.SelectedCongnoncc.map((customer) =>
        typeof customer === 'string' ? customer : customer.id
      );

      // Refresh the filter list to exclude the newly selected customer
      this.refreshCustomerFilter();
    }

    // Clear the input after selection
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[matautocomplete]');
      inputs.forEach((input: any) => {
        if (
          input.placeholder.includes('nhà cung cấp') ||
          input.placeholder.includes('Thêm nhà cung cấp')
        ) {
          input.value = '';
        }
      });
    }, 100);
  }

  // Method to remove selected customer
  removeSelectedCustomer(customer: any): void {
    const index = this.SelectedCongnoncc.findIndex(
      (item) =>
        (typeof item === 'string' ? item : item.name) ===
        (typeof customer === 'string' ? customer : customer.name)
    );
    if (index >= 0) {
      this.SelectedCongnoncc.splice(index, 1);
      this.SearchParams.congnonccIds = this.SelectedCongnoncc.map((customer) =>
        typeof customer === 'string' ? customer : customer.id
      );

      // Refresh the filter list to include the removed customer
      this.refreshCustomerFilter();
    }
  }
  removeSelectedNhomcongnoncc(nhomKH: any): void {
    const index = this.SelectedNhomCongnoncc.findIndex(
      (item) =>
        (typeof item === 'string' ? item : item.name) ===
        (typeof nhomKH === 'string' ? nhomKH : nhomKH.name)
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
    this.SelectedNhomCongnoncc.forEach((nhomKH) => {
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
    const selectedNames = this.SelectedCongnoncc.map((customer) =>
      typeof customer === 'string' ? customer : customer.name
    );

    this.filterListCongnoncc = this.ListCongnoncc.filter((item: any) => {
      const itemName = typeof item === 'string' ? item : item.name;
      return !selectedNames.includes(itemName);
    });
  }

  private refreshNhomCongnonccFilter(): void {
    const selectedNames = this.SelectedNhomCongnoncc.map((nhomKH) =>
      typeof nhomKH === 'string' ? nhomKH : nhomKH.name
    );

    this.filterListNhomCongnoncc = this.ListNhomCongnoncc.filter(
      (item: any) => {
        const itemName = typeof item === 'string' ? item : item.name;
        return !selectedNames.includes(itemName);
      }
    );
  }

  // Helper method to add customers from a selected customer group
  private addCustomersFromGroup(nhomCongnoncc: any): void {
    if (!nhomCongnoncc || typeof nhomCongnoncc === 'string') return;

    // Get customers from the customer group
    const customersInGroup = nhomCongnoncc.congnoncc || [];

    customersInGroup.forEach((customer: any) => {
      // Check if customer is not already selected
      const isAlreadySelected = this.SelectedCongnoncc.some(
        (selectedCustomer) =>
          (typeof selectedCustomer === 'string'
            ? selectedCustomer
            : selectedCustomer.name) === customer.name
      );

      if (!isAlreadySelected) {
        this.SelectedCongnoncc.push(customer);
      }
    });

    // Update SearchParams
    this.SearchParams.congnonccIds = this.SelectedCongnoncc.map((customer) =>
      typeof customer === 'string' ? customer : customer.id
    );
  }

  // Helper method to remove customers from a deselected customer group
  private removeCustomersFromGroup(nhomCongnoncc: any): void {
    if (!nhomCongnoncc || typeof nhomCongnoncc === 'string') return;

    // Get customers from the customer group
    const customersInGroup = nhomCongnoncc.congnoncc || [];

    customersInGroup.forEach((customer: any) => {
      const index = this.SelectedCongnoncc.findIndex(
        (selectedCustomer) =>
          (typeof selectedCustomer === 'string'
            ? selectedCustomer
            : selectedCustomer.name) === customer.name
      );

      if (index >= 0) {
        this.SelectedCongnoncc.splice(index, 1);
      }
    });

    // Update SearchParams
    this.SearchParams.congnonccIds = this.SelectedCongnoncc.map((customer) =>
      typeof customer === 'string' ? customer : customer.id
    );
  }

  async loadData(query: any): Promise<void> {
    this.isLoading = true;
    try {
      // await this._DathangService.searchCongno(query);
      this.SearchCongno();
      // console.log(this.Listdathang());
      this.CountItem = this.Listdathang().length || 0;
      // Nhóm dữ liệu theo nhà cung cấp để tính tổng tiền sau thuế
      const supplierTotals = new Map();
      // Tính tổng tiền sau thuế cho từng nhà cung cấp
      this.ListCongno = this.Listdathang();
      // console.log(this.ListCongno);

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
          mancc: true,
        },
      });
      this.ListCongnoncc = this.filterListCongnoncc = Congnonccs.data;

      const NhomCongnonccs = await this._GraphqlService.findAll('nhomncc', {
        aggressiveCache: true,
        enableStreaming: true,
        select: {
          id: true,
          name: true,
          description: true,
          nhacungcap: {
            select: {
              id: true,
              name: true,
              mancc: true,
            },
          },
        },
      });
      this.ListNhomCongnoncc = this.filterListNhomCongnoncc =
        NhomCongnonccs.data;
      // console.log(this.filterListCongnoncc);
      // console.log(this.filterListNhomCongnoncc);
    } finally {
      this.isLoading = false;
    }
  }
  async SearchCongno() {
    const Dathangs = await this._GraphqlService.findAll('dathang', {
      where: {
        ...(this.SearchParams.congnonccIds.length > 0 && {
          nhacungcapId: { in: this.SearchParams.congnonccIds },
        }),
        ngaynhan: {
          gte: moment(this.SearchParams.Batdau).startOf('day').toDate(),
          lte: moment(this.SearchParams.Ketthuc).endOf('day').toDate(),
        },
        // status: { in: this.SearchParams.Status }
      },
      select: {
        id: true,
        ngaynhan: true,
        madncc: true,
        nhacungcap: {
          select: {
            id: true,
            name: true,
            mancc: true,
          },
        },
        sanpham: {
          select: {
            sanpham: {
              select: {
                id: true,
                title: true,
                masp: true,
                dvt: true,
              },
            },
            sldat: true,
            slgiao: true,
            slnhan: true,
            gianhap: true,
          },
        },
      },
    });
    this._DathangService.ListDathang.update(() =>
      Dathangs.data.map((v: any) => ({
        ...v,
        name: v.nhacungcap?.name || '',
        mancc: v.nhacungcap?.mancc || '',
        soluong: Number(
          v.sanpham.reduce(
            (total: any, item: any) => total + (Number(item.slnhan) || 0),
            0
          )
        ),
        tongtien: Number(
          v.sanpham.reduce(
            (total: any, item: any) =>
              total + (Number(item.slnhan) * Number(item.gianhap) || 0),
            0
          )
        ),
      }))
    );
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
        'CongnonccColFilter',
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
      'CongnonccColFilter',
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
  FilterHederColumn(list: any, column: any) {
    const uniqueList = list.filter(
      (obj: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }
  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listdathang().filter(
      (v: any) =>
        removeVietnameseAccents(v[column]).includes(
          event.target.value.toLowerCase()
        ) || v[column].toLowerCase().includes(event.target.value.toLowerCase())
    );
    const query = event.target.value.toLowerCase();
  }
  ListFilter: any[] = [];
  ChosenItem(item: any, column: any) {
    const CheckItem = this.dataSource.filteredData.filter(
      (v: any) => v[column] === item[column]
    );
    const CheckItem1 = this.ListFilter.filter(
      (v: any) => v[column] === item[column]
    );
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter(
        (v) => v[column] !== item[column]
      );
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }
  ChosenAll(list: any) {
    list.forEach((v: any) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id)
        ? true
        : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v) => v.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    this.ListFilter = this.Listdathang();
    this.dataSource.data = this.Listdathang();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu: any) {
    this.dataSource.data = this.Listdathang().filter((v: any) =>
      this.ListFilter.some((v1) => v1.id === v.id)
    );
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
    return (
      items?.reduce((sum: any, item: any) => sum + (item[fieldTong] || 0), 0) ||
      0
    );
  }
  dialog = inject(MatDialog);
  dialogCreateRef: any;
  Phieuchia: any[] = [];
  openCreateDialog(teamplate: TemplateRef<any>) {
    this.Phieuchia = this.editDathang.map((v: any) => ({
      mancc: v.congnoncc?.mancc,
      name: v.congnoncc?.name,
      madathang: v.madathang,
      ngaynhan: v.ngaynhan,
      sanpham: v.sanpham.map((v1: any) => ({
        masp: v1.masp,
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

      this.exampleExport = this.convertFlatData(this.editDathang[0] || {});
      console.log(this.editDathang);

      console.log('exampleExport', this.exampleExport);

      this.dialogCreateRef = this.dialog.open(teamplate, {
        hasBackdrop: true,
        disableClose: true,
      });
    } else {
      this._snackBar.open('Vui lòng chọn ít nhất một nhà cung cấp', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      });
    }
  }
  convertFlatData(data: any) {
    return data?.sanpham?.map((item: any) => ({
      madncc: data.madncc || '',
      ngaynhan: data.ngaynhan || '',
      masp: item.sanpham?.masp || '',
      tensp: item.sanpham?.title || '',
      dvt: item.sanpham?.dvt || '',
      sldat: Number(item.sldat) || 0,
      slnhan: Number(item.slnhan) || 0,
      slconlai: (Number(item.sldat) || 0) - (Number(item.slnhan) || 0),
      gianhap: Number(item.gianhap) || 0,
      thanhtien: (Number(item.slnhan) || 0) * (Number(item.gianhap) || 0),
      mancc: data.nhacungcap?.mancc || data.congnoncc?.mancc || '',
      name: data.nhacungcap?.name || data.congnoncc?.name || '',
    }));
  }


  BackStatus() {
    this.editDathang.forEach((v: any) => {
      v.status = 'dadat';
      this._DathangService.updateDathang(v);
    });
    this.ngOnInit();
  }

  Hoanthanh() {
    this.editDathang.forEach((v: any) => {
      v.status = 'hoanthanh';
      this._DathangService.updateDathang(v);
    });
  }
  getUniqueProducts(): string[] {
    const products = new Set<string>();
    this.Phieuchia.forEach((kh) =>
      kh.sanpham.forEach((sp: any) => products.add(sp.title))
    );
    return Array.from(products);
  }

  getProductQuantity(product: string, mancc: string): number | string {
    const customer = this.Phieuchia.find((kh) => kh.mancc === mancc);
    const item = customer?.sanpham.find((sp: any) => sp.title === product);
    return item ? item.slgiao : '';
  }
  getDvtForProduct(product: string) {
    const uniqueProducts = Array.from(
      new Map(
        this.Phieuchia.flatMap((c) =>
          c.sanpham.map((sp: any) => ({ ...sp, mancc: c.mancc, name: c.name }))
        ).map((p) => [p.title, p])
      ).values()
    );
    const item = uniqueProducts.find((sp: any) => sp.title === product);
    return item ? item.dvt : '';
  }

  CheckItemInDathang(item: any): boolean {
    return this.editDathang.findIndex((v) => v.id === item.id) !== -1;
  }
  DeleteDathang(): void {}
  DoImportData(data: any) {
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
        .find((v1: any) => v1.masp === v.masp);
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
        .find((v1: any) => v1.masp === v);
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
        panelClass: ['snackbar-success'],
      });

      // Clear selected orders
      this.editDathang = [];
    } catch (serverError) {
      console.warn(
        'Server export failed, falling back to client-side export:',
        serverError
      );

      try {
        // Fallback: Client-side export with table format
        console.log('Attempting client-side Excel export with table format...');

        // Prepare data for client-side export
        let exportData: any[] = [];

        if (this.editDathang.length > 0) {
          // Use selected orders
          exportData = this.editDathang.flatMap((order: any) => {
            console.log(order);
            return this.convertFlatData(order);
          });
        } else {
          // Use all current data
          exportData = data.flatMap((order: any) => {
            console.log(order);
            return this.convertFlatData(order);
          });
        }

        // Generate Excel file with exporttable format
        await this.generateExcelWithTableFormat(exportData, title);

        // Show success message for client-side export
        this._snackBar.open(
          'Xuất file Excel (định dạng bảng) thành công!',
          'Đóng',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          }
        );

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
        exportData = this.editDathang.flatMap((order: any) => {   
          const result = this.convertFlatData(order);
          return result
        });
        console.log(exportData);    
      } else {
        // Use all current data
        exportData = data.flatMap((order: any) => {
          console.log(order);
          return this.convertFlatData(order);
        });
      }

      // Generate Excel file with exporttable format
      await this.generateExcelWithTableFormat(exportData, title);

      // Clear selected orders
      this.editDathang = [];

      // Show success message
      this._snackBar.open(
        'Xuất file Excel (định dạng bảng) thành công!',
        'Đóng',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        }
      );
    } catch (error) {
      console.error('Error exporting Excel with table format:', error);

      // Show error message
      this._snackBar.open('Lỗi khi xuất file Excel (định dạng bảng)!', 'Đóng', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
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
      if (data.length > 0) {
        groupedData = this.groupDataByCustomer(data);
      } else {
        groupedData = this.groupDataByCustomer(this.ListCongno);
      }
      await this.generateExcelWithSingleSheet(this.ListCongno, title);
    } catch (error) {
      console.error('Error in fallback Excel export:', error);
    }
  }

  private groupDataByCustomer(data: any[]): any[] {
    // Tạo map để nhóm theo mã nhà cung cấp
    const customerGroups = new Map();

    data.forEach((item) => {
      const mancc = item.macongnoncc;
      if (!customerGroups.has(mancc)) {
        customerGroups.set(mancc, []);
      }
      customerGroups.get(mancc).push(item);
    });

    // Tính tổng tiền sau thuế cho từng nhà cung cấp và chuẩn bị dữ liệu
    const result: any[] = [];

    customerGroups.forEach((items, mancc) => {
      const totalAmount = items.reduce(
        (sum: number, item: any) => sum + (item.thanhtiensauvat || 0),
        0
      );

      items.forEach((item: any, index: number) => {
        result.push({
          ...item,
          tongtiensauthue: index === 0 ? totalAmount : null, // Chỉ hiển thị tổng ở dòng đầu tiên
        });
      });
    });

    return result;
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
          e: { r: group.start + group.count - 1, c: totalColumnIndex }, // end row, column
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

  // Generate Excel with single sheet format
  private async generateExcelWithTableFormat(exportData: any[], title: string): Promise<void> {
    try {
      // Create workbook
      const workbook = XLSX.utils.book_new();

      // Tính tổng tiền theo mã đơn hàng
      const orderTotals = new Map();
      exportData.forEach((item) => {
        const madncc = item.madncc || '';
        if (!orderTotals.has(madncc)) {
          orderTotals.set(madncc, 0);
        }
        orderTotals.set(madncc, orderTotals.get(madncc) + (Number(item.thanhtien) || 0));
      });

      // Create single worksheet data with company header
      const worksheetData: any[][] = [
        // Table headers
        [
          'NGÀY NHẬN',
          'MÃ ĐƠN HÀNG',
          'MÃ NCC',
          'TÊN NCC',
          'MÃ HÀNG',
          'TÊN HÀNG',
          'ĐVT',
          'SỐ LƯỢNG ĐẶT',
          'SỐ LƯỢNG NHẬN',
          'SỐ LƯỢNG CÒN LẠI',
          'GIÁ NHẬP',
          'THÀNH TIỀN',
          'TỔNG TIỀN ĐƠN HÀNG'
        ],
      ];

      // Nhóm dữ liệu theo mã đơn hàng để hiển thị tổng tiền chỉ ở dòng đầu tiên
      const groupedData = new Map();
      exportData.forEach((item) => {
        const madncc = item.madncc || '';
        if (!groupedData.has(madncc)) {
          groupedData.set(madncc, []);
        }
        groupedData.get(madncc).push(item);
      });

      // Add all data rows với tổng tiền chỉ hiển thị ở dòng đầu tiên của mỗi đơn hàng
      groupedData.forEach((items, madncc) => {
        const orderTotal = orderTotals.get(madncc);
        items.forEach((item: any, index: number) => {
          worksheetData.push([
            moment(item.ngaynhan).format('DD/MM/YYYY') || '',
            item.madncc || '',
            item.mancc || '',
            item.name || '',
            item.masp || '',
            item.tensp || '',
            item.dvt || '',
            Number(item.sldat) || 0,
            Number(item.slnhan) || 0,
            Number(item.slconlai) || 0,
            Number(item.gianhap) || 0,
            Number(item.thanhtien) || 0,
            index === 0 ? orderTotal : '', // Chỉ hiển thị tổng ở dòng đầu tiên
          ]);
        });
      });

      // Add summary row
      const totalSldat = exportData.reduce((sum, item) => sum + (Number(item.sldat) || 0), 0);
      const totalSlnhan = exportData.reduce((sum, item) => sum + (Number(item.slnhan) || 0), 0);
      const totalSlconlai = exportData.reduce((sum, item) => sum + (Number(item.slconlai) || 0), 0);
      const totalThanhtien = exportData.reduce((sum, item) => sum + (Number(item.thanhtien) || 0), 0);
      const grandTotal = Array.from(orderTotals.values()).reduce((sum, total) => sum + total, 0);

      // worksheetData.push([
      //   '',
      //   '',
      //   '',
      //   '',
      //   'TỔNG CỘNG:',
      //   '',
      //   '',
      //   totalSldat,
      //   totalSlnhan,
      //   totalSlconlai,
      //   '',
      //   totalThanhtien,
      //   grandTotal,
      // ]);

      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Set column widths
      const columnWidths = [
        { wch: 12 }, // NGÀY NHẬN
        { wch: 15 }, // MÃ ĐƠN HÀNG
        { wch: 12 }, // MÃ NCC
        { wch: 25 }, // TÊN NCC
        { wch: 12 }, // MÃ HÀNG
        { wch: 30 }, // TÊN HÀNG
        { wch: 8 },  // ĐVT
        { wch: 12 }, // SỐ LƯỢNG ĐẶT
        { wch: 12 }, // SỐ LƯỢNG NHẬN
        { wch: 12 }, // SỐ LƯỢNG CÒN LẠI
        { wch: 12 }, // GIÁ NHẬP
        { wch: 15 }, // THÀNH TIỀN
        { wch: 18 }, // TỔNG TIỀN ĐƠN HÀNG
      ];
      worksheet['!cols'] = columnWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Công Nợ NCC');

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, `${title}_${moment().format('DD_MM_YYYY')}`);
      
    } catch (error) {
      console.error('Error generating Excel with single sheet format:', error);
      throw error;
    }
  }


  // Helper method to create a worksheet for each customer


  printContent() {
    const element = document.getElementById('printContent');
    if (!element) return;

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');

      // Mở cửa sổ mới và in ảnh
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      printWindow.document.write(`
        <html>
          <head>
            <title>Phiếu Chia Hàng ${moment().format('DD/MM/YYYY')}</title>
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

  private async generateExcelWithSingleSheet(data: any[], title: string): Promise<void> {
    try {
      const workbook = XLSX.utils.book_new();
      
      // Convert data trước khi export
      const exportData = this.convertFlatData(data);
      
      // Tạo worksheet data
      const wsData = [];
      
      // Header công ty (3 hàng đầu)
      wsData.push(['CÔNG TY TNHH RAU SẠCH TRĂNG GIÁ']);
      wsData.push(['ĐC: Tiểu Khu 7, TT. Nga Sơn, H. Nga Sơn, T. Thanh Hóa']);
      wsData.push([`${title} - ${moment().format('DD/MM/YYYY HH:mm:ss')}`]);
      wsData.push([]); // Hàng trống
      
      // Header của bảng dữ liệu
      const headers = [
        'Mã ĐNCC',
        'Ngày nhận', 
        'Mã SP',
        'Tên SP',
        'ĐVT',
        'SL đặt',
        'SL nhận',
        'SL còn lại',
        'Giá nhập',
        'Thành tiền',
        'Mã NCC',
        'Tên NCC'
      ];
      wsData.push(headers);
      
      // Dữ liệu
      exportData.forEach((item: any) => {
        wsData.push([
          item.madncc || '',
          item.ngaynhan || '',
          item.masp || '',
          item.tensp || '',
          item.dvt || '',
          item.sldat || 0,
          item.slnhan || 0,
          item.slconlai || 0,
          item.gianhap || 0,
          item.thanhtien || 0,
          item.mancc || '',
          item.name || ''
        ]);
      });
      
      // Tạo worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(wsData);
      
      // Styling cho worksheet
      const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
      
      // Merge cells cho header công ty
      worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }, // Tên công ty
        { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } }, // Địa chỉ
        { s: { r: 2, c: 0 }, e: { r: 2, c: headers.length - 1 } }  // Tiêu đề + ngày
      ];
      
      // Auto width cho các cột
      const colWidths = [];
      for (let c = 0; c <= range.e.c; c++) {
        let maxWidth = 10;
        for (let r = 0; r <= range.e.r; r++) {
          const cellAddress = XLSX.utils.encode_cell({ r, c });
          const cell = worksheet[cellAddress];
          if (cell && cell.v) {
            const cellLength = cell.v.toString().length;
            maxWidth = Math.max(maxWidth, cellLength + 2);
          }
        }
        colWidths.push({ wch: Math.min(maxWidth, 30) });
      }
      worksheet['!cols'] = colWidths;
      
      // Thêm worksheet vào workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Công nợ NCC');
      
      // Export file
      const fileName = `${title}_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
    } catch (error) {
      console.error('Error generating single sheet Excel:', error);
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

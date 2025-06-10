import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { environment } from '../../../../../environments/environment.development';
import { AffiliatelinkService } from '../../../../admin/affiliatelink/affiliatelink.service';
import { SearchfilterComponent } from '../../../../shared/common/searchfilter/searchfilter.component';
import { GoogleSheetService } from '../../../../shared/googlesheets/googlesheets.service';
import { memoize, Debounce } from '../../../../shared/utils/decorators';
import { readExcelFile, writeExcelFile } from '../../../../shared/utils/exceldrive.utils';
import { ConvertDriveData } from '../../../../shared/utils/shared.utils';
import { LandingpageService } from '../../../../admin/landingpage/landingpage.service';
import { UserService } from '../../../../admin/user/user.service';


@Component({
  selector: 'app-listaffiliatelink',
  templateUrl: './listaffiliatelink.component.html',
  styleUrls: ['./listaffiliatelink.component.scss'],
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
    // SearchfilterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAffiliatelinkComponent implements OnInit {
  displayedColumns: string[] = [];
  ColumnName: any = {
    stt: '#',
    campaignName: 'Tiêu Đề',
    landingPage: 'Ladi',
    description: 'Mô Tả',
    utmSource: 'Nguồn',
    utmMedium: 'Phương Tiện',
    utmCampaign: 'Chiến Dịch',
    utmTerm: 'Thuật Ngữ',
    utmContent: 'Nội Dung',
    action: 'Hành Động',
  };  
  FilterColumns: any[] = JSON.parse(localStorage.getItem('AffiliatelinkColFilterCTV') || '[]');
  Columns: any[] = [];
  Detail: any = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _AffiliatelinkService: AffiliatelinkService = inject(AffiliatelinkService);
  private _LandingpageService: LandingpageService = inject(LandingpageService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  Listaffiliatelink = this._AffiliatelinkService.ListAffiliatelink;
  ListLandingpage = this._LandingpageService.ListLandingpage;
  page = this._AffiliatelinkService.page;
  pageCount = this._AffiliatelinkService.pageCount;
  total = this._AffiliatelinkService.total;
  pageSize = this._AffiliatelinkService.pageSize;
  affiliatelinkId = this._AffiliatelinkService.affiliatelinkId;
  dataSource:any = new MatTableDataSource([]);
  EditList: any[] = [];
  isSearch = signal<boolean>(false);
  _UserService:UserService = inject(UserService);
  _snackbar:MatSnackBar = inject(MatSnackBar);
  profile:any = signal<any>({});
  constructor() {
    effect(async () => {
      await this._AffiliatelinkService.getAllAffiliatelink(this.pageSize(), true);
      await this._LandingpageService.getAllLandingpage();
      this.dataSource.data = this.Listaffiliatelink();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }
    });
  }

  async ngOnInit(): Promise<void> {
     this._UserService.getProfile().then(data => {
        if(data){
          this.profile.set(data);
        }
      });
    this._AffiliatelinkService.listenAffiliatelinkUpdates();
    await this._LandingpageService.getAllLandingpage();
    await this._AffiliatelinkService.getAllAffiliatelink(this.pageSize(),true);
    this.displayedColumns = Object.keys(this.ColumnName);
    this.dataSource = new MatTableDataSource(this.Listaffiliatelink());
    this.dataSource.sort = this.sort;
    this.initializeColumns();
    this.setupDrawer();
  }
  private initializeColumns(): void {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem('AffiliatelinkColFilterCTV', JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter(col => col.isShow).map(col => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => 
      isShow ? { ...acc, [key]: value } : acc, {} as Record<string, string>);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  @Debounce(300)
  async ApplyfilterLadi(event: any) {
    const filterValue = event.target.value;
    await this._LandingpageService.getLandingpageBy({title: filterValue});
    if(filterValue=== '') {
      await this._LandingpageService.getAllLandingpage();
    }
  }

  async getUpdatedCodeIds() {
    await this._AffiliatelinkService.getUpdatedCodeIds();
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

  toggleColumn(item: any): void {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }

  @memoize()
  FilterHederColumn(list: any, column: any) {
    const uniqueList = list.filter((obj: any, index: number, self: any) => 
      index === self.findIndex((t: any) => t[column] === obj[column])
    );
    return uniqueList;
  }

  @Debounce(300)
  doFilterHederColumn(event: any, column: any): void {
    this.dataSource.filteredData = this.Listaffiliatelink().filter((v: any) => 
      v[column].toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  openCreateDialog(template: TemplateRef<any>) {
    const dialogCreateRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogCreateRef.afterClosed().subscribe(async (result) => {
      if (result === "true") {
         await this._AffiliatelinkService.CreateAffiliatelink(this.Detail);
        this._snackBar.open('Thêm Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.Detail = {};
      }
    });
  }
  ListFilter: any[] = [];
  ChosenItem(item: any, column: any) {
    const CheckItem = this.dataSource.filteredData.filter((v: any) => v[column] === item[column]);
    const CheckItem1 = this.ListFilter.filter((v: any) => v[column] === item[column]);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }

  ChosenAll(list: any) {
    list.forEach((v: any) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id) ? true : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v1) => v1.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }

  ResetFilter() {
    this.ListFilter = this.Listaffiliatelink();
  }

  EmptyFiter() {
    this.ListFilter = [];
  }

  CheckItem(item: any) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }

  ApplyFilterColum(menu: any) {
    this.dataSource.data = this.Listaffiliatelink().filter((v: any) => 
      this.ListFilter.some((v1) => v1.id === v.id)
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }

  onOutFilter(event: any) {
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private updateDisplayedColumns(): void {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);
    localStorage.setItem('AffiliatelinkColFilterCTV', JSON.stringify(this.FilterColumns));
  }

  doFilterColumns(event: any): void {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }

  create(): void {
    this.drawer.open();
    this._router.navigate(['admin/affiliatelink', 'new']);
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
      this._AffiliatelinkService.DeleteAffiliatelink(item);
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
    this._AffiliatelinkService.setAffiliatelinkId(item.id);
    this._router.navigate(['admin/affiliatelink', item.id]);
  }

  OpenLoadDrive(template: TemplateRef<any>) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        // Handle action if needed
      }
    });
  }

  IdSheet: any = '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk';
  SheetName: any = 'SPImport';
  ImportIteam: any[] = [];
  ImportColumnName: any = {};
  ImportdisplayedColumns: any[] = [];

  async LoadDrive() {
    const DriveInfo = {
      IdSheet: this.IdSheet,
      SheetName: this.SheetName,
      ApiKey: environment.GSApiKey,
    };
    const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
    this.ImportIteam = ConvertDriveData(result.values);
    this.ImportColumnName = Object.fromEntries(result.values[0].map((key: any, i: any) => [key, result.values[1][i]]));
    this.ImportdisplayedColumns = result.values[0];
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

    const uniqueData = Array.from(new Map(transformedData.map((item: any) => [item.masp, item])).values());
    const existingAffiliatelink = this._AffiliatelinkService.ListAffiliatelink();
    const existingMasp = existingAffiliatelink.map((v: any) => v.masp);
    const newMasp = uniqueData.map((v: any) => v.masp).filter((item: any) => !existingMasp.includes(item));

    await Promise.all(uniqueData.map(async (v: any) => {
      const existingItem = existingAffiliatelink.find((v1: any) => v1.masp === v.masp);
      if (existingItem) {
        const updatedItem = { ...existingItem, ...v };
        await this._AffiliatelinkService.updateAffiliatelink(updatedItem);
      } else {
        await this._AffiliatelinkService.CreateAffiliatelink(v);
      }
    }));
    await Promise.all(existingAffiliatelink
      .filter(sp => !uniqueData.some((item: any) => item.masp === sp.masp))
      .map(sp => this._AffiliatelinkService.updateAffiliatelink({ ...sp, isActive: false }))
    );

    this._snackBar.open('Cập Nhật Thành Công', '', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  async ImporExcel(event: any) {
    const data = await readExcelFile(event);
    this.DoImportData(data);
  }

  ExportExcel(data: any, title: any) {
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
    writeExcelFile(dulieu, title);
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  onPageSizeChange(size: number, menuHienthi: any) {
    if (size > this.total()) {
      this._snackBar.open(`Số lượng tối đa ${this.total()}`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      size = this.total();
    }
    this._AffiliatelinkService.page.set(1);
    this._AffiliatelinkService.getAllAffiliatelink(size, true);
    menuHienthi.closeMenu();
  }
  onPreviousPage(){
    if (this.page() > 1) {
      this._AffiliatelinkService.page.set(this.page() - 1);
      this._AffiliatelinkService.getAllAffiliatelink(this.pageSize(), true);
    }
  }

  onNextPage(){
    if (this.page() < this.pageCount()) {
      this._AffiliatelinkService.page.set(this.page() + 1);
      this._AffiliatelinkService.getAllAffiliatelink(this.pageSize(), true);
    }
  }


  // getUrl(item:any){
  //     // const result = `/ladictv/${item?.landingPage?.slug}?ref=${this.profile()?.inviteCode}${item?.codeId?'&codeId='+item?.codeId:''}${item?.utmSource?'&utm_source='+item?.utmSource:''}${item?.utmMedium?'&utm_medium='+item?.utmMedium:''}${item?.utmCampaign?'&utm_campaign='+item?.utmCampaign:''}${item?.utmTerm?'&utm_term='+item?.utmTerm:''}${item?.utmContent?'&utm_content='+item?.utmContent:''}`;
  //     const result = `/ladictv/${item?.landingPage?.slug}?ref=${this.profile()?.inviteCode}${item?.codeId?'&codeId='+item?.codeId:''}`;
  //     return result;
  //   }
    getUrl(item:any){

      if(item.landingPage?.contentHtml){
        return item.landingPage?.contentHtml
      }
      const result = `/ladictv/${item?.landingPage?.slug}?ref=${this.profile()?.inviteCode}${item?.codeId?'&codeId='+item?.codeId:''}`;
      return result;
    }


  private encode(str: string): string {
    return encodeURIComponent(str);
  }
  getCoppyLink(url: string) {
    const fullUrl = window.location.origin + url;
    console.log(fullUrl);
    navigator.clipboard.writeText(fullUrl).then(() => {
      this._snackbar.open('Đã Coppy', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
    }).catch(err => {
      this._snackbar.open('Coppy Lỗi', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-error'],
      });
    });
  }
  share(platform: string, url: string, title?: string, description?: string, image?: string): void {    
    url = url+ '?ref=' + this.profile()?.inviteCode;
    let shareUrl: string;
    switch (platform.toLowerCase()) {
      case 'facebook':
        url = url+'&sharePlatform=facebook';
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${this.encode(url)}&quote=${this.encode(title || '')}`;
        break;
      case 'twitter':
        url = url+'&sharePlatform=twitter';
        shareUrl = `https://twitter.com/intent/tweet?url=${this.encode(url)}&text=${this.encode(title || '')}`;
        break;
      case 'linkedin':
        url = url+'&sharePlatform=linkedin';
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${this.encode(url)}`;
        break;
      case 'pinterest':
        url = url+'&sharePlatform=pinterest';
        shareUrl = `https://pinterest.com/pin/create/button/?url=${this.encode(url)}&media=${this.encode(image || '')}&description=${this.encode(description || '')}`;
        break;
      case 'whatsapp':
        url = url+'&sharePlatform=whatsapp';
        shareUrl = `https://api.whatsapp.com/send?text=${this.encode(`${title} ${url}`)}`;
        break;
      case 'email':
        url = url+'&sharePlatform=email';
        shareUrl = `mailto:?subject=${this.encode(title || '')}&body=${this.encode(description || '')}%0A${this.encode(url)}`;
        break;  
      default:
        console.warn(`Share platform "${platform}" is not supported.`);
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}
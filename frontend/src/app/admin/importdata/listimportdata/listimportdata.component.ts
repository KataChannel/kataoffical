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
import { ImportdataService } from '../importdata.service';
import { MatMenuModule } from '@angular/material/menu';
import { excelSerialDateToJSDate, readExcelFile, readExcelFileNoWorker, writeExcelFile, writeExcelFileSheets } from '../../../shared/utils/exceldrive.utils';
import { ConvertDriveData, convertToSlug, GenId } from '../../../shared/utils/shared.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { environment } from '../../../../environments/environment.development';
import { memoize, Debounce } from '../../../shared/utils/decorators';
import { BanggiaService } from '../../banggia/banggia.service';
import { DathangService } from '../../dathang/dathang.service';
import { DonhangService } from '../../donhang/donhang.service';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import moment from 'moment';

@Component({
  selector: 'app-listimportdata',
  templateUrl: './listimportdata.component.html',
  styleUrls: ['./listimportdata.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListImportdataComponent implements OnInit {
  displayedColumns: string[] = [];
  ColumnName: any = {
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
  FilterColumns: any[] = JSON.parse(localStorage.getItem('ImportdataColFilter') || '[]');
  Columns: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  private _BanggiaService: BanggiaService = inject(BanggiaService);
  private _SanphamService: SanphamService = inject(SanphamService);
  private _KhachhangService: KhachhangService = inject(KhachhangService);
  private _NhacungcapService: NhacungcapService = inject(NhacungcapService);
  private _DonhangService: DonhangService = inject(DonhangService);
  private _DathangService: DathangService = inject(DathangService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListImportdata = signal<any[]>([
    {id:1,title:'Sản Phẩm',value:'sanpham',status:true},
    {id:2,title:'Khách Hàng',value:'khachhang',status:true},
    {id:3,title:'Nhà Cung Cấp',value:'nhacungcap',status:true},
    {id:4,title:'Bảng Giá',value:'banggia',status:true},
    {id:5,title:'Đơn Hàng',value:'donhang',status:true},
    {id:6,title:'Đặt Hàng',value:'dathang',status:true},
    {id:7,title:'Bảng Giá Khách Hàng',value:'banggiakhachhang',status:true},
    {id:8,title:'Bảng Giá Sản Phẩm',value:'banggiasanpham',status:true},
    {id:9,title:'Bảng Giá Nhà Cung Cấp',value:'banggianhacungcap',status:true},
    {id:10,title:'Bảng Giá Đơn Hàng',value:'banggiadonhang',status:true},
    {id:11,title:'Bảng Giá Đặt Hàng',value:'banggiadathang',status:true},
    {id:12,title:'Bảng Giá Đơn Hàng Khách Hàng',value:'banggiadonhangkhachhang',status:true},
    {id:13,title:'Bảng Giá Đặt Hàng Khách Hàng',value:'banggiadathangkhachhang',status:true},
    {id:14,title:'Bảng Giá Đơn Hàng Nhà Cung Cấp',value:'banggiadonhangnhacungcap',status:true},
    {id:15,title:'Bảng Giá Đặt Hàng Nhà Cung Cấp',value:'banggiadathangnhacungcap',status:true},
  ]);
  ListEdit = signal<any[]>([]);
  TitleExport = "export";
  constructor() {
    effect(() => {
      this.ListImportdata.set
    });
  }

  async ngOnInit(): Promise<void> {

  }

  applyFilter(event: Event) {

  }



toggleAll() {
    const allSelected = this.ListEdit().length === this.ListImportdata().length;
    if (allSelected) {
      this.ListEdit.set([]);
      this.TitleExport = "export";
    } else {
      this.ListEdit.set(this.ListImportdata());
      this.TitleExport = "export_all";
    }
  }
toggleItem(item: any) {
    const index = this.ListEdit().findIndex((i) => i.id === item.id);
    if (index === -1) {
      this.TitleExport += '_'+item.value
      this.ListEdit.update((prev) => [...prev, item]);
    } else {  
      this.TitleExport = this.TitleExport.replace('_'+item.value, '')
      this.ListEdit.update((prev) => prev.filter((i) => i.id !== item.id));
    }
    console.log(item);
    console.log(this.ListEdit());
    
  }
  CheckItem(item: any) {
    const index = this.ListEdit().findIndex((i) => i.id === item.id);
    if (index === -1) {
     return false;
    } else {
     return true;
    }
  }
async ExportExcel(title:any) {
    await this._SanphamService.getAllSanpham();
    const rawListSP = this._SanphamService.ListSanpham();
    const ListSP = Array.isArray(rawListSP) && rawListSP.length
      ? rawListSP.map((item: any) => ({
          masp: item.masp,
          subtitle: item.subtitle,
          title: item.title,
          title2: item.title2,
          giaban: item.giaban,
          giagoc: item.giagoc,
          dvt: item.dvt,
          haohut: item.haohut,
          ghichu: item.ghichu,
        }))
      : [{
          masp: '',
          subtitle: '',
          title: '',
          title2: '',
          giaban: '',
          giagoc: '',
          dvt: '',
          haohut: '',
          ghichu: '',
        }];
    await this._KhachhangService.getAllKhachhang();
    const rawListKH = this._KhachhangService.ListKhachhang();
    const ListKH = Array.isArray(rawListKH) && rawListKH.length
      ? rawListKH.map((v: any) => ({
          name: v.name?.trim() || '',
          makh: v.makh?.trim() || '',
          namenn: v.namenn?.trim() || '',
          diachi: v.diachi?.trim() || '',
          quan: v.quan?.trim() || '',
          email: v.email?.trim() || '',
          sdt: v.sdt?.toString().trim() || '',
          mst: v.mst?.toString().trim() || '',
          gionhanhang: v.gionhanhang?.toString().trim() || '',
          loaikh: v.loaikh?.toString().trim() || 'khachsi',
          hiengia: v.hiengia ||true,
          ghichu: v.ghichu?.toString().trim() || ''
        })) : [{
          name: '',
          makh: '',
          namenn: '',
          diachi: '',
          quan: '',
          email: '',
          sdt: '',
          mst: '',
          gionhanhang: '',
          loaikh: 'khachsi',
          hiengia: true,
          ghichu: ''
        }];

    await this._NhacungcapService.getAllNhacungcap()
    const rawListNCC = this._NhacungcapService.ListNhacungcap()
    const ListNCC = Array.isArray(rawListNCC) && rawListNCC.length
      ? rawListNCC.map((v: any) => ({
          name: v.name?.trim() || '',
          mancc: v.mancc?.trim() || '',
          diachi: v.diachi?.trim() || '',
          email: v.email?.trim() || '',
          sdt: v.sdt?.toString().trim() || '',
          ghichu: v.ghichu?.toString().trim() || '',
        }))
      : [
          {
            name: '',
            mancc: '',
            diachi: '',
            email: '',
            sdt: '',
            ghichu: '',
          }
        ];

    await this._BanggiaService.getAllBanggia();
    const rawListBG = this._BanggiaService.ListBanggia();
    const ListBG = Array.isArray(rawListBG) && rawListBG.length
      ? rawListBG.map((v: any) => ({
          title: v.title?.trim() || '',
          mabanggia: v.mabanggia?.trim() || '',
          type: v.type?.trim() || '',
          batdau: v.batdau?.trim() || '',
          ketthuc: v.ketthuc?.trim() || '',
          ghichu: v.ghichu?.trim() || '',
          status: v.status?.trim() || ''
        }))
      : [{
          title: '',
          mabanggia: '',
          type: '',
          batdau: '',
          ketthuc: '',
          ghichu: '',
          status: ''
        }];
    await this._DonhangService.getAllDonhang();
    const rawListDH = this._DonhangService.ListDonhang();
    const ListDH = Array.isArray(rawListDH) && rawListDH.length
      ? rawListDH.map((v: any) => ({
          madonhang: v.madonhang?.trim() || '',
          makh: v.makh?.trim() || '',
          mancc: v.mancc?.trim() || '',
          masp: v.masp?.trim() || '',
          soluong: v.soluong?.trim() || '',
          giaban: v.giaban?.trim() || '',
          ghichu: v.ghichu?.trim() || '',
        }))
      : [{
          madonhang: '',
          makh: '',
          mancc: '',
          masp: '',
          soluong: '',
          giaban: '',
          ghichu: ''
        }];

    await this._DathangService.getAllDathang();
    const rawListDathang = this._DathangService.ListDathang();
    const ListDathang = Array.isArray(rawListDathang) && rawListDathang.length
      ? rawListDathang.map((v: any) => ({
          madathang: v.madathang?.trim() || '',
          makh: v.makh?.trim() || '',
          mancc: v.mancc?.trim() || '',
          masp: v.masp?.trim() || '',
          soluong: v.soluong?.trim() || '',
          giaban: v.giaban?.trim() || '',
          ghichu: v.ghichu?.trim() || ''
        }))
      : [{
          madathang: '',
          makh: '',
          mancc: '',
          masp: '',
          soluong: '',
          giaban: '',
          ghichu: ''
        }];   

    const ListBGSP =this.convertBGSPToExport(rawListBG, rawListSP);



    // const ListSPBG = (data.SPBG || []).map((v: any) => ({
    //   idSP: v.idSP?.trim() || '',
    //   ghichu: v.ghichu?.trim() || '',
    //   sldat: parseFloat((v.sldat ?? 0).toFixed(2)),
    //   slgiao: parseFloat((v.slgiao ?? 0).toFixed(2)),
    //   slnhan: parseFloat((v.slnhan ?? 0).toFixed(2)),
    // }));
    // const ListBGKH = (data.BGKH || []).map((v: any) => ({
    //   mabanggia: v.mabanggia?.trim() || '',
    //   name: v.name?.trim() || '',
    //   makh: v.makh?.trim() || '',
    // }));

    // rawListSPBG = this._BanggiaService.ListSPBG();
    
    // const ListSPBG = Array.isArray(rawListSPBG) && rawListSPBG.length
    //   ? rawListSPBG.map((v: any) => ({
    //       madathang: v.madathang?.trim() || '',
    //       makh: v.makh?.trim() || '',
    //       mancc: v.mancc?.trim() || '',
    //       masp: v.masp?.trim() || '',
    //       soluong: v.soluong?.trim() || '',
    //       giaban: v.giaban?.trim() || '',
    //       ghichu: v.ghichu?.trim() || ''
    //     }))
    //   : [{
    //       madathang: '',
    //       makh: '',
    //       mancc: '',
    //       masp: '',
    //       soluong: '',
    //       giaban: '',
    //       ghichu: ''
    //     }];







      const Exportdata: any = {};
      if (this.ListEdit().some((item: any) => item.value === 'sanpham')) {
        Exportdata['sanpham'] = { data: ListSP };
      }
      if (this.ListEdit().some((item: any) => item.value === 'khachhang')) {
        Exportdata['khachhang'] = { data: ListKH };
      }
      if (this.ListEdit().some((item: any) => item.value === 'nhacungcap')) {
        Exportdata['nhacungcap'] = { data: ListNCC };
      }
      if (this.ListEdit().some((item: any) => item.value === 'banggia')) {
        Exportdata['banggia'] = { data: ListBG };
      }
      if (this.ListEdit().some((item: any) => item.value === 'donhang')) {
        Exportdata['donhang'] = { data: ListDH };
      }
      if (this.ListEdit().some((item: any) => item.value === 'dathang')) {
        Exportdata['dathang'] = { data: ListDathang };
      }
      if (this.ListEdit().some((item: any) => item.value === 'banggiasanpham')) {
        Exportdata['banggiasanpham'] = { data: ListBGSP };
      }
      writeExcelFileSheets(Exportdata, title);
}

convertBGSPToExport(listbanggia: any, listsp: any) {
  const pricingTables = new Set(listbanggia.map((item: any) => item.mabanggia));
  return listsp.map((product: any) => ({
    masp: product.masp,
    title: product.title,
    giaban: product.giaban.toString(),
    ...Array.from(pricingTables).reduce((acc: Record<string, string>, table:any) => {
      acc[table] = product.giaban.toString();
      return acc;
    }, {} as Record<string, string>)
  }));
}
convertBGSPToImport(
  data: Array<{ masp: string; title: string; giagoc: any; [key: string]: any }>
): Array<{
  mabanggia: string;
  title: string;
  sanpham: Array<{ masp: string; title: string; giagoc: any }>;
}> {
  if (!data || data.length === 0) {
    return [];
  }

  // Extract keys representing price boards (excluding masp, title, giagoc)
  const boardKeys = Object.keys(data[0]).filter(
    (key) => !['masp', 'title', 'giagoc'].includes(key)
  );

  // For each board key, create an object with a list of products
  const data1 = boardKeys.map((boardKey) => ({
    mabanggia: boardKey,
    title: `Bảng giá ${boardKey.replace('BG', '')}`,
    sanpham: data.map((sp) => ({
      masp: sp.masp,
      title: sp.title,
      giagoc: sp.giagoc,
      giaban: sp[boardKey] || 0,
    })),
  }));
  return data1;
}

  async ImportExcel(event: any) {
    const data = await readExcelFileNoWorker(event);
    this.DoImportData(data);
  }

  async DoImportData(data:any)
  {
    if(data.sanpham && data.sanpham.length > 0 && this.ListEdit().some((item: any) => item.value === 'sanpham'))
    {
      const ListSP = (data.sanpham || []).map((v: any) => ({
        masp: v.masp,
        subtitle: v.subtitle,
        title: v.title,
        title2: v.title2,
        giaban: v.giaban,
        giagoc: v.giagoc,
        dvt: v.dvt,
        haohut: v.haohut,
        ghichu: v.ghichu,
      })).filter((v: any) => v.masp !== undefined && v.masp !== null && v.masp !== '');
      await this._SanphamService.ImportSanpham(ListSP);
    }
    if(data.khachhang && data.khachhang.length > 0 && this.ListEdit().some((item: any) => item.value === 'khachhang'))
    {
      const ListKH = (data.khachhang || []).map((v: any) => ({
        name: v.name,
        makh: v.makh,
        namenn: v.namenn,
        diachi: v.diachi,
        quan: v.quan,
        email: v.email,
        sdt: v.sdt.toString(),
        mst: v.mst.toString(),
        gionhanhang: v.gionhanhang.toString(),
        loaikh: v.loaikh,
        ghichu: v.ghichu
      })).filter((v: any) => v.makh !== undefined && v.makh !== null && v.makh !== '');
      await this._KhachhangService.ImportKhachhang(ListKH);
    }

    if(data.nhacungcap && data.nhacungcap.length > 0 && this.ListEdit().some((item: any) => item.value === 'nhacungcap'))
    {
      const ListNCC = (data.nhacungcap || []).map((v: any) => ({
        name: v.name,
        mancc: v.mancc,
        diachi: v.diachi,
        email: v.email,
        sdt: v.sdt,
        ghichu: v.ghichu
      })).filter((v: any) => v.mancc !== undefined && v.mancc !== null && v.mancc !== '');
      await this._NhacungcapService.ImportNhacungcap(ListNCC);
    }
    if(data.banggia && data.banggia.length > 0 && this.ListEdit().some((item: any) => item.value === 'banggia'))
    {
      const ListBG = (data.banggia || []).map((v: any) => ({
        title:'Bảng Giá '+v.mabanggia,
        mabanggia: v.mabanggia,
        type: v.type,
        batdau: moment(excelSerialDateToJSDate(v.batdau)).toDate(),
        ketthuc: moment(excelSerialDateToJSDate(v.ketthuc)).toDate(),
        ghichu: v.ghichu,
        status: v.status
      })).filter((v: any) => v.mabanggia !== undefined && v.mabanggia !== null && v.mabanggia !== '');
      await this._BanggiaService.ImportBanggia(ListBG);
    }
    if(data.donhang && data.donhang.length > 0 && this.ListEdit().some((item: any) => item.value === 'donhang'))
    {
      const ListDH = (data.donhang || []).map((v: any) => ({
        ngay: v.ngay,
        makh: v.makh,
        mabangia: v.mabangia,
        masp: v.masp,
        sldat: v.sldat,
        slgiao: v.slgiao,
        slnhan: v.slnhan,
        ghichu: v.ghichu,
      })).filter((v: any) => 
        v.makh !== undefined && v.makh !== null && v.makh !== '' && 
        v.masp !== undefined && v.masp !== null && v.masp !== ''
      );
       await this._DonhangService.ImportDonhang(ListDH);
    }

    if(data.banggiasanpham && data.banggiasanpham.length > 0 && this.ListEdit().some((item: any) => item.value === 'banggiasanpham'))
    {
       const ListBGSP = this.convertBGSPToImport(data.banggiasanpham);
       await this._BanggiaService.importSPBG(ListBGSP);
    }




    // if(data.dathang && data.dathang.length > 0)
    // {
    //   const ListDH = (data.dathang || []).map((v: any) => ({
    //     madathang: v.madathang,
    //     makh: v.makh,
    //     mancc: v.mancc,
    //     masp: v.masp,
    //     soluong: v.soluong,
    //     giaban: v.giaban,
    //     ghichu: v.ghichu
    //   })).filter((v: any) => v.madathang !== undefined && v.madathang !== null && v.madathang !== '');
    //   this._DathangService.ImportDathang(ListDH);
    // }

    // if (!data.SPBG || !data.BG || !data.BGKH) {
    //   this._snackBar.open('SPBG hoặc BG hoặc BGKH không tồn tại', '', {
    //     duration: 3000,
    //     horizontalPosition: "end",
    //     verticalPosition: "top",
    //     panelClass: ['snackbar-error'],
    //   });
    //   return;
    // }
    // const ListBG = (data.BG || []).map((v: any) => ({
    //   id: v.mabanggia,
    //   mabanggia: v.mabanggia,
    //   type: v.type,
    //   batdau: moment(excelSerialDateToJSDate(v.batdau)).toDate(),
    //   ketthuc: moment(excelSerialDateToJSDate(v.ketthuc)).toDate(),
    //   ghichu: v.ghichu,
    //   status: v.status,
    // })).filter((v: any) => v.mabanggia !== undefined && v.mabanggia !== null && v.mabanggia !== '');
    // this._BanggiaService.importBanggia(ListBG);
    // const ListData = this.convertDataToData1(data.SPBG);
    // this._BanggiaService.importSPBG(ListData);
    // const BGKH = (data.BGKH || []).map((v: any) => ({
    //     mabanggia: v.mabanggia,
    //     name: v.name,
    //     makh: v.makh,
    //   }));
    // this._BanggiaService.importBGKH(BGKH);
    // this._snackBar.open('Import Thành Công', '', {
    //   duration: 1000,
    //   horizontalPosition: "end",
    //   verticalPosition: "top",
    //   panelClass: ['snackbar-success'],
    // });
  }


  trackByFn(index: number, item: any): any {
    return item.id;
  }

}
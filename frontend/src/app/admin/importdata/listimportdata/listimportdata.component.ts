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
import { PhieukhoService } from '../../phieukho/phieukho.service';
import { KhoService } from '../../kho/kho.service';

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
  private _PhieukhoService: PhieukhoService = inject(PhieukhoService);
  private _KhoService: KhoService = inject(KhoService);
  private _ImportdataService: ImportdataService = inject(ImportdataService);
  private _breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private _GoogleSheetService: GoogleSheetService = inject(GoogleSheetService);
  private _router: Router = inject(Router);
  private _dialog: MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  ListImportType = signal<any[]>([
    {id:1,title:'Sản Phẩm',value:'sanpham',status:true},
    {id:2,title:'Khách Hàng',value:'khachhang',status:true},
    {id:3,title:'Nhà Cung Cấp',value:'nhacungcap',status:true},
    {id:4,title:'Bảng Giá',value:'banggia',status:true},
    {id:5,title:'Đơn Hàng',value:'donhang',status:true},
    {id:6,title:'Đặt Hàng',value:'dathang',status:true},
    {id:7,title:'Bảng Giá Khách Hàng',value:'banggiakhachhang',status:true},
    {id:8,title:'Bảng Giá Sản Phẩm',value:'banggiasanpham',status:true},
    {id:9,title:'Nhà Cung Cấp Sản Phẩm',value:'nhacungcapsanpham',status:true},
    {id:10,title:'Xuất Nhập Tồn',value:'xuatnhapton',status:true},
  ]);
  ListEdit = signal<any[]>([]);
  ListImportdata: any = this._ImportdataService.ListImportdata;
  TitleExport = "export";
  rawListSP: any[] = [];
  rawListKH: any[] = [];
  rawListNCC: any[] = [];
  rawListBG: any[] = [];
  rawListDH: any[] = [];
  rawListDathang: any[] = [];
  rawListTonkho: any[] = [];
  constructor() {
    effect(async () => {
    await this._ImportdataService.getAllImportdata(100, true);
    await this._SanphamService.getAllSanpham();
    this.rawListSP = this._SanphamService.ListSanpham();
    await this._KhachhangService.getAllKhachhang(9999,true);
    this.rawListKH = this._KhachhangService.ListKhachhang();
    await this._NhacungcapService.getAllNhacungcap();
    this.rawListNCC = this._NhacungcapService.ListNhacungcap();
    await this._BanggiaService.getAllBanggia();
    this.rawListBG = this._BanggiaService.ListBanggia();
    await this._DonhangService.getAllDonhang();
    this.rawListDH = this._DonhangService.ListDonhang();
    await this._DathangService.getAllDathang();
    this.rawListDathang = this._DathangService.ListDathang();
    await this._KhoService.getTonKho('1', '1000').then((res: any) => {
      this.rawListTonkho = res.data;
    });
  });
}

  async ngOnInit(): Promise<void> {
    await this._ImportdataService.getAllImportdata(100, true);
    await this._SanphamService.getAllSanpham();
    this.rawListSP = this._SanphamService.ListSanpham();
    await this._KhachhangService.getAllKhachhang();
    this.rawListKH = this._KhachhangService.ListKhachhang();
    await this._NhacungcapService.getAllNhacungcap()
    this.rawListNCC = this._NhacungcapService.ListNhacungcap()
    await this._BanggiaService.getAllBanggia();
    this.rawListBG = this._BanggiaService.ListBanggia();
    await this._DonhangService.getAllDonhang();
    this.rawListDH = this._DonhangService.ListDonhang();
    await this._DathangService.getAllDathang();
    this.rawListDathang = this._DathangService.ListDathang();
    await this._KhoService.getTonKho('1', '1000').then((res: any) => {
      this.rawListTonkho = res.data;
    }); 
  }

  applyFilter(event: Event) {
    
  }



toggleAll() {
    const allSelected = this.ListEdit().length === this.ListImportType().length;
    if (allSelected) {
      this.ListEdit.set([]);
      this.TitleExport = "export";
    } else {
      this.ListEdit.set(this.ListImportType());
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

    const ListSP = Array.isArray(this.rawListSP) && this.rawListSP.length
      ? this.rawListSP.map((item: any) => ({
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
    const ListKH = Array.isArray(this.rawListKH) && this.rawListKH.length
      ? this.rawListKH.map((v: any) => ({
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

    const ListNCC = Array.isArray(this.rawListNCC) && this.rawListNCC.length>0
      ? this.rawListNCC.map((v: any) => ({
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

    const ListBG = Array.isArray(this.rawListBG) && this.rawListBG.length>0
      ? this.rawListBG.map((v: any) => ({
          title: v.title?.trim() || '',
          mabanggia: v.mabanggia?.trim() || '',
          type: v.type?.trim() || '',
          batdau: moment(v.batdau).format('DD/MM/YYYY') || '',
          ketthuc: moment(v.ketthuc).format('DD/MM/YYYY') || '',
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

    // Flatten donhang items from nested 'sanpham'
    const ListDH = Array.isArray(this.rawListDH) && this.rawListDH.length>0
      ? this.rawListDH.flatMap((record: any) => {
          if (!Array.isArray(record.sanpham)) return [];
          return record.sanpham.map((sp: any) => ({
            ngaygiao: moment(record.ngaygiao).format('DD/MM/YYYY'),
            makh: record.khachhang?.makh,
            name: record.khachhang?.name,
            mabanggia: record.khachhang?.banggia?.[0]?.mabanggia,
            masp: sp.masp,
            tensp: sp.title,
            sldat: sp.sldat,
            slgiao: sp.slgiao,
            slnhan: sp.slnhan,
            ghichu: sp.ghichu
          }));
        })
      : [
          {
            ngaygiao: moment().format('DD/MM/YYYY'),
            makh: '',
            mabanggia: '',
            masp: '',
            tensp: '',
            sldat: 0,
            slgiao: 0,
            slnhan: 0,
            ghichu: ''
          }
      ];
    const ListDathang = Array.isArray(this.rawListDathang) && this.rawListDathang.length>0
      ? this.rawListDathang.flatMap((record: any) => {
          if (!Array.isArray(record.sanpham)) return [];
          return record.sanpham.map((sp: any) => ({
            ngaynhan: moment(record.ngaynhan).format('DD/MM/YYYY'),
            mancc: record.nhacungcap?.mancc,
            name: record.nhacungcap?.name,
            mabanggia: record.banggia?.[0]?.mabanggia,
            masp: sp.masp,
            tensp: sp.title,
            sldat: Number(sp.sldat) || 0,
            slgiao: Number(sp.slgiao) || 0,
            slnhan: Number(sp.slnhan) || 0,
            ghichu: sp.ghichu
          }));
        })
      : [{
          ngaynhan: moment().format('DD/MM/YYYY'),
          mancc: '',
          name: '',
          mabanggia: '',
          masp: '',
          tensp: '',
          sldat: 0,
          slgiao: 0,
          slnhan: 0,
          ghichu: ''
        }];

    const ListBGSP =this.convertBGSPToExport(this.rawListBG, this.rawListSP);
        
    const ListBGKH:any[] =this.rawListKH.map((v: any) => {
            const result: any = {
            makh: v.makh || '',
            name: v.name || '',
            mabanggia: v.banggia?.mabanggia || '',
           };   
      return result;
    });


    const dynamicKeys = this.rawListSP.reduce((acc: Record<string, string>, v: any) => {
      if (v && v.masp) {
      acc[v.masp] = '';
      }
      return acc;
    }, {});
    // Build ListNCCSP dynamically using rawListNCC and up to 5 product codes from dynamicKeys.
    const ListNCCSP: any[] = this.rawListNCC.map((supplier: any) => {
      const result: any = {
      mancc: supplier.mancc || '',
      name: supplier.name || '',
      };
      let i =1
      for (const masp of Object.keys(dynamicKeys)) {
        const productExists = supplier.Sanpham?.some((sp: any) => sp.masp === masp);
        if(productExists){
          result[i] = masp;
        i++;
        }

      }
       return result;
    });

    const ListTonkho = this.rawListTonkho.map((v: any) => ({
      masp: v.masp,
      title: v.title,
      dvt: v.dvt,
      slton: v.slton,
    }));



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
      if (this.ListEdit().some((item: any) => item.value === 'banggiakhachhang')) {
        Exportdata['banggiakhachhang'] = { data: ListBGKH };
      }
      if (this.ListEdit().some((item: any) => item.value === 'nhacungcapsanpham')) {
        Exportdata['nhacungcapsanpham'] = { data: ListNCCSP };
      }     
      if (this.ListEdit().some((item: any) => item.value === 'xuatnhapton')) {
        Exportdata['xuatnhapton'] = { data: ListTonkho };
      } 
      if(Object.keys(Exportdata).length === 0)
      {
        this._snackBar.open('Không có dữ liệu để xuất', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
        return;
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


// convertBGKHToImport(data: any){ 
//   if (!data || data.length === 0) {
//     return [];
//   }
//   // Extract keys representing price boards (excluding makh, name)
//   const boardKeys = Object.keys(data[0]).filter(
//     (key) => !['makh', 'name'].includes(key)
//   );
//   data.forEach((v:any) => {
//     v.banggia = [];
//     for (const key of boardKeys) {
//       if (v[key] !== undefined && v[key] !== null && v[key] !== '') {
//         v.banggia.push(v[key]);
//       }
//       delete v[key];
//     }
//   });
//   return data;
// }

convertNCCSPToImport(data: any){ 
  if (!data || data.length === 0) {
    return [];
  }
  // Extract keys representing price boards (excluding mancc, name)
  const boardKeys = Object.keys(data[0]).filter(
    (key) => !['mancc', 'name'].includes(key)
  );
  data.forEach((v:any) => {
    v.Sanpham = [];
    for (const key of boardKeys) {
      if (v[key] !== undefined && v[key] !== null && v[key] !== '') {
        v.Sanpham.push(v[key]);
      }
      delete v[key];
    }
  });
  return data;
}

  async ImportExcel(event: any) {
    const data = await readExcelFileNoWorker(event);
    this.DoImportData(data);
  }

  async DoImportData(data:any)
  {

    if(Object.keys(this.ListEdit()).length === 0) 
    {
      this._snackBar.open('Chưa Chọn Loại Dữ Liệu', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
      return;
    }
    if(Object.keys(data).length === 0) 
    {
      this._snackBar.open('Không có dữ liệu để nhập', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success'],
      });
      return;
    }

    if(data.sanpham && data.sanpham.length > 0 && this.ListEdit().some((item: any) => item.value === 'sanpham'))
    {
      const ListSP = (data.sanpham || []).map((v: any) => ({
        masp: v.masp,
        subtitle: v.subtitle.toString(),
        title: v.title,
        title2: v.title2,
        giaban: Number(v.giaban)||Number(v.giagoc)||0,
        giagoc: Number(v.giagoc)||0,
        dvt: v.dvt,
        haohut: Number(v.haohut)||0,
        ghichu: v.ghichu,
      })).filter((v: any) => v.masp !== undefined && v.masp !== null && v.masp !== '');
      const importSnackbar = this._snackBar.open('Đang import Sản phẩm...', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-warning']
      });
      await this._SanphamService.ImportSanpham(ListSP);
      importSnackbar.dismiss();
      this._snackBar.open('Import Sản phẩm thành công!', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success']
      });
    }
    if(data.khachhang && data.khachhang.length > 0 && this.ListEdit().some((item: any) => item.value === 'khachhang'))
    {
      const ListKH = (data.khachhang || []).map((v: any) => ({
        name: v.name.toString(),
        makh: v.makh,
        namenn: v.namenn.toString(),
        diachi: v.diachi,
        quan: v.quan,
        email: v.email,
        sdt: v.sdt.toString(),
        mst: v.mst.toString(),
        gionhanhang: v.gionhanhang.toString(),
        loaikh: v.loaikh,
        ghichu: v.ghichu
      })).filter((v: any) => v.makh !== undefined && v.makh !== null && v.makh !== '');

      const importSnackbar = this._snackBar.open('Đang import Khách hàng...', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-warning']
      });
        await this._KhachhangService.ImportKhachhang(ListKH);
      importSnackbar.dismiss();
      this._snackBar.open('Import Khách hàng thành công!', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success']
      });
    }

    if(data.nhacungcap && data.nhacungcap.length > 0 && this.ListEdit().some((item: any) => item.value === 'nhacungcap'))
    {
      const ListNCC = (data.nhacungcap || []).map((v: any) => ({
        name: v.name,
        mancc: v.mancc,
        diachi: v.diachi,
        email: v.email,
        sdt: v.sdt.toString(),
        ghichu: v.ghichu
      })).filter((v: any) => v.mancc !== undefined && v.mancc !== null && v.mancc !== '');
      const importSnackbar = this._snackBar.open('Đang import Nhà cung cấp...', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-warning']
      });
      await this._NhacungcapService.ImportNhacungcap(ListNCC);
      importSnackbar.dismiss();
      this._snackBar.open('Import Nhà cung cấp thành công!', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success']
      });
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
      const importSnackbar = this._snackBar.open('Đang import Bảng giá...', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-warning']
      });
      await this._BanggiaService.ImportBanggia(ListBG);
      importSnackbar.dismiss();
      this._snackBar.open('Import Bảng giá thành công!', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success']
      });
    }
    if(data.donhang && data.donhang.length > 0 && this.ListEdit().some((item: any) => item.value === 'donhang'))
    {
      const ListDH = (data.donhang || []).map((v: any) => ({
        ngay: v.ngay,
        makh: v.makh,
        mabangia: v.mabangia,
        masp: v.masp,
        sldat: Number(v.sldat),
        slgiao: Number(v.slgiao),
        slnhan: Number(v.slnhan),
        ghichu: v.ghichu,
      })).filter((v: any) => 
        v.makh !== undefined && v.makh !== null && v.makh !== '' && 
        v.masp !== undefined && v.masp !== null && v.masp !== ''
      );
      const importSnackbar = this._snackBar.open('Đang import Đơn hàng...', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-warning']
      });
       await this._DonhangService.ImportDonhang(ListDH);
      importSnackbar.dismiss();
      this._snackBar.open('Import Đơn hàng thành công!', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success']
      });
    }

    if (
      data.banggiasanpham &&
      data.banggiasanpham.length > 0 &&
      this.ListEdit().some((item: any) => item.value === 'banggiasanpham')
    ) {
      const listBGSP = this.convertBGSPToImport(data.banggiasanpham);
      const giabanList = listBGSP.find((item) => item.mabanggia === 'giaban');
      if (!giabanList) {
        // Optionally handle missing 'giaban' list
        return;
      }
      const fixedListBGSP = listBGSP.map((banggia) => {
        if (banggia.mabanggia === 'giaban') {
          return banggia;
        }

        const fixedSanpham = banggia.sanpham.map((sp:any) => {
          if (sp.giaban === '0') {
            const match:any = giabanList.sanpham.find(
              (giabanSp) => giabanSp.masp === sp.masp
            );
            return {
              ...sp,
              giaban: match ? match.giaban : sp.giaban,
            };
          }
          return sp;
        });
        return { ...banggia, sanpham: fixedSanpham };
      });
      await this._BanggiaService.importSPBG(fixedListBGSP);
    }
    if(data.banggiakhachhang && data.banggiakhachhang.length > 0 && this.ListEdit().some((item: any) => item.value === 'banggiakhachhang'))
    {
      console.log('Importing banggiakhachhang data:', data.banggiakhachhang);
      
        const ListBGKH = (data.banggiakhachhang || []).map((v: any) => ({
        makh: v.makh,
        name: v.name,
        mabanggia: v.mabanggia,
      })).filter((v:any)=>v.mabanggia!== undefined && v.mabanggia !== null && v.mabanggia !== '')
       console.log('Importing ListBGKH data:', ListBGKH);
        await this._KhachhangService.ImportKhachhang(ListBGKH);
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
    }
    if(data.nhacungcapsanpham && data.nhacungcapsanpham.length > 0 && this.ListEdit().some((item: any) => item.value === 'nhacungcapsanpham'))
    {
      const convertedSuppliers = this.convertNCCSPToImport(data.nhacungcapsanpham);
      console.log(convertedSuppliers);
      
      const ListNCCSP = convertedSuppliers
        .filter((supplier:any) => supplier?.Sanpham?.length > 0)
        .map((supplier:any) => ({
          ...supplier,
          Sanpham: supplier?.Sanpham?.map((spId:any) =>
        this.rawListSP.find(product => product?.masp === spId)
          )
        }));
      const importSnackbar = this._snackBar.open('Đang import Nhà cung cấp sản phẩm...', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-warning']
      });
      await this._NhacungcapService.ImportNhacungcap(ListNCCSP);
      importSnackbar.dismiss();
      this._snackBar.open('Import Nhà cung cấp sản phẩm thành công!', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-success']
      });
    }
    if(data.xuatnhapton && data.xuatnhapton.length > 0 && this.ListEdit().some((item: any) => item.value === 'xuatnhapton'))
    {

    const phieuNhapDetails: any[] = [];
    const phieuXuatDetails: any[] = [];
    data.xuatnhapton.forEach((v: any) => {
      const exitItem = this.rawListTonkho.find((item: any) => item.masp === v.masp);
      if (exitItem) {
        if (v.slton > exitItem.slton) {
          // Tính chênh lệch cho phiếu nhập
          phieuNhapDetails.push({
          sanphamId:this.rawListSP.find((item:any)=>item.masp===v.masp).id, 
          soluong: v.slton - exitItem.slton,
          // thêm các trường cần thiết
          });
        } else if (v.slton < exitItem.slton) {
          // Tính chênh lệch cho phiếu xuất
          phieuXuatDetails.push({
          sanphamId:this.rawListSP.find((item:any)=>item.masp===v.masp).id,
          soluong: exitItem.slton - v.slton,
          // thêm các trường cần thiết
          });
        }
      }
    });

    if (phieuNhapDetails.length > 0) {
      // Tạo phiếu nhập một lần với danh sách chi tiết
      this._PhieukhoService.CreatePhieukho(
        {
        title:`Điều Chỉnh Kho Ngày ${moment().format('DD/MM/YYYY ')}`, 
        type:'nhap',
        sanpham: phieuNhapDetails, 
        ghichu: `Cập nhật tồn kho lúc ${moment().format('HH:mm:ss DD/MM/YYYY ')}`,
        ngay: moment()
      });
    }
    if (phieuXuatDetails.length > 0) {
      // Tạo phiếu xuất một lần với danh sách chi tiết
      this._PhieukhoService.CreatePhieukho(
        {
        title:`Điều Chỉnh Kho Ngày ${moment().format('DD/MM/YYYY ')}`, 
        type:'xuat',
        sanpham: phieuXuatDetails, 
        ghichu: `Cập nhật tồn kho lúc ${moment().format('HH:mm:ss DD/MM/YYYY ')}`,
        ngay: moment()
      });
    }
    if (phieuNhapDetails.length === 0 && phieuXuatDetails.length === 0) {
            this._snackBar.open('Kho không thay đổi', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success'],
        });
    }
     }


    if(data.dathang && this.ListEdit().some((item: any) => item.value === 'dathang'))
    {
        const ListDH = (data.dathang || [])
          .filter((v: any) => v.mancc && v.masp)
          .map((v: any) => ({
            ngaynhan: moment(excelSerialDateToJSDate(v.ngaynhan)).toDate(),
            mancc: v.mancc,
            mabanggia: v.mabanggia,
            masp: v.masp,
            sldat: Number(v.sldat),
            slgiao: Number(v.slgiao),
            slnhan: Number(v.slnhan),
            ghichu: v.ghichu,
          }));
          console.log(ListDH);
          
        const importSnackbar = this._snackBar.open('Đang import Đặt hàng...', '', {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-warning']
        });
        await this._DathangService.ImportDathang(ListDH);
        importSnackbar.dismiss();
        this._snackBar.open('Import Đặt hàng thành công!', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success']
        });
    }
    if(data.donhang && this.ListEdit().some((item: any) => item.value === 'donhang'))
    {
        const ListDH = (data.donhang || [])
        .filter((v: any) => v.makh && v.masp)
        .map((v: any) => ({
          ngaygiao: moment(excelSerialDateToJSDate(v.ngaygiao)).toDate(),
          makh: v.makh,
          mabanggia: v.mabanggia,
          masp: v.masp,
          sldat: Number(v.sldat),
          slgiao: Number(v.slgiao),
          slnhan: Number(v.slnhan),
          ghichu: v.ghichu,
        }))
        const importSnackbar = this._snackBar.open('Đang import Đơn hàng...', '', {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-warning']
        });
        await this._DonhangService.ImportDonhang(ListDH);
        importSnackbar.dismiss();
        this._snackBar.open('Import Đơn hàng thành công!', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-success']
        });
    }
  }
  trackByFn(index: number, item: any): any {
    return item.id;
  }

}
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ListBanggiaComponent } from '../listbanggia/listbanggia.component';
import { BanggiaService } from '../banggia.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ConvertDriveData, GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { SanphamService } from '../../sanpham/sanpham.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { readExcelFile, writeExcelFile } from '../../../shared/utils/exceldrive.utils';
import { GoogleSheetService } from '../../../shared/googlesheets/googlesheets.service';
  @Component({
    selector: 'app-detailbanggia',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatDialogModule,
      CommonModule,
      MatSlideToggleModule,
      MatDatepickerModule,
      MatSortModule,
      MatPaginatorModule,
      MatTableModule
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './detailbanggia.component.html',
    styleUrl: './detailbanggia.component.scss',
  })
  export class DetailBanggiaComponent implements AfterViewInit {
    _ListbanggiaComponent:ListBanggiaComponent = inject(ListBanggiaComponent)
    _BanggiaService:BanggiaService = inject(BanggiaService)
    _SanphamService:SanphamService = inject(SanphamService)
    _GoogleSheetService:GoogleSheetService = inject(GoogleSheetService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = [
      'STT',
      'title',
      'masp',
      'dvt',
      'giagoc',
      'giaban',
    ];
    ColumnName: any = {
      STT: 'STT',
      title: 'Tiêu Đề',
      masp: 'Mã SP',
      dvt: 'Đơn Vị Tính',
      giagoc: 'Giá Gốc',
      giaban: 'Giá Bán',
    };
    dataSource = signal(new MatTableDataSource<any>([]));
    CountItem = computed(() => this.dataSource().data.length);
    filterSanpham:any[]=[];
    constructor(){
      this._route.paramMap.subscribe(async (params) => {
        const id = params.get('id');
        this._BanggiaService.setBanggiaId(id);
        await this._SanphamService.getAllSanpham(); 
        this.filterSanpham = this._SanphamService.ListSanpham();
      });
  
      effect(async () => {      
        const id = this._BanggiaService.banggiaId();
        if (!id){
          this._router.navigate(['/admin/banggia']);
          this._ListbanggiaComponent.drawer.close();
        }
        if(id === '0'){
          this.DetailBanggia.set({ 
            title: GenId(8, false),   
            type:'bansi',   
            batdau: moment().startOf('month').toDate(),
            ketthuc: moment().endOf('month').toDate()
          });
          this._ListbanggiaComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/banggia', "0"]);
        }
        else{
            await this._BanggiaService.getBanggiaByid(id);
            this.dataSource().data = this.DetailBanggia().sanpham;
            this._ListbanggiaComponent.drawer.open();
            this._router.navigate(['/admin/banggia', id]);
        }
      });
    }
    DetailBanggia: any = this._BanggiaService.DetailBanggia;
    isEdit = signal(false);
    isDelete = signal(false);  
    banggiaId:any = this._BanggiaService.banggiaId
    ngAfterViewInit() {
      setTimeout(() => {
        if (this.paginator) {
          this.dataSource().paginator = this.paginator;
          this.dataSource().sort = this.sort;
        }
      }, 300);

    }
    async handleBanggiaAction() {
      this.DetailBanggia.update((v:any)=>{
        v.sanpham?.forEach((item:any) => {
          item.sanphamId = item.id;
        });
        return v;
      })
      if (this.banggiaId() === '0') {
        await this.createBanggia();
      }
      else {
        await this.updateBanggia();
      }
    }
    private async createBanggia() {      
      try {

        await this._BanggiaService.CreateBanggia(this.DetailBanggia());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo banggia:', error);
      }
    }

    private async updateBanggia() {
      try {
        await this._BanggiaService.updateBanggia(this.DetailBanggia());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật banggia:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._BanggiaService.DeleteBanggia(this.DetailBanggia());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/banggia']);
      } catch (error) {
        console.error('Lỗi khi xóa banggia:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/banggia'])
      this._ListbanggiaComponent.drawer.close();
    }
    trackByFn(index: number, item: any): any {
      return item.id;
    }
    toggleEdit() {
      this.isEdit.update(value => !value);
    }
    
    toggleDelete() {
      this.isDelete.update(value => !value);
    }
    FillSlug(){
      this.DetailBanggia.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
    
    updateValue(event: Event, index: number | null, element: any, field: keyof any, type: 'number' | 'string') {
      const newValue = type === 'number' 
      ? Number((event.target as HTMLElement).innerText.trim().replace(/[^0-9]/g, '')) || 0 
      : (event.target as HTMLElement).innerText.trim();

      this.DetailBanggia.update((v: any) => {
      if (index !== null) {
        v.sanpham[index][field] = newValue;
      } else {
        v[field] = newValue;
      }
      return v;
      });

      console.log(element, field, newValue);
      console.log('Dữ liệu đã cập nhật:', this.DetailBanggia());
    }


      async LoadDrive() {
        const DriveInfo = {
          IdSheet: '15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk',
          SheetName: 'BGImport',
          ApiKey: 'AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao',
        };
       const result: any = await this._GoogleSheetService.getDrive(DriveInfo);
       const data = ConvertDriveData(result.values);
       this.DetailBanggia.update((v:any)=>{
        const listdata = data.map((item:any) => {
          item.masp = item.masp?.trim()||'';
          item.giaban = Number(item.giaban)||0;
          const item1 = this._SanphamService.ListSanpham().find((v1) => v1.masp === item.masp);
          if (item1) {
            return { ...item1, ...item };
          }
          return item;
        });
        v.sanpham = listdata
        this.reloadfilter();
        return v;
      })       
      this.dataSource().data = this.DetailBanggia().sanpham;
      this.dataSource().paginator = this.paginator;
      this.dataSource().sort = this.sort;

      }
      AddSanpham(){
    
      }
      reloadfilter(){
        this.filterSanpham = this._SanphamService.ListSanpham().filter((v:any) => !this.DetailBanggia().sanpham.some((v2:any) => v2.id === v.id));
      }
      SelectSanpham(event:any){
        const value = event.value;
        const item = this._SanphamService.ListSanpham().find((v) => v.id === value);
        this.DetailBanggia.update((v:any)=>{
          if(!v.sanpham){
            v.sanpham = [];
            v.sanpham.push(item);
          }
          else{
              v.sanpham.push(item);
          }
          this.reloadfilter();
          return v;
        })
        this.dataSource().data = this.DetailBanggia().sanpham;
        this.dataSource().paginator = this.paginator;
        this.dataSource().sort = this.sort;
      }
      RemoveSanpham(item:any){
        this.DetailBanggia.update((v:any)=>{
          v.sanpham = v.sanpham.filter((v1:any) => v1.id !== item.id);
          this.reloadfilter();
          return v;
        })
        this.dataSource().data = this.DetailBanggia().sanpham;
        this.dataSource().paginator = this.paginator;
        this.dataSource().sort = this.sort;
      }
      DoFindSanpham(event:any){
        const value = event.target.value;
        this.filterSanpham = this._SanphamService.ListSanpham().filter((v) => v.title.toLowerCase().includes(value.toLowerCase()));
      }
  }
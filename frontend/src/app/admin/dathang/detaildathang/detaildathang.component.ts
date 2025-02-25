import { Component, effect, inject, signal } from '@angular/core';
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
import { ListDathangComponent } from '../listdathang/listdathang.component';
import { DathangService } from '../dathang.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { SanphamService } from '../../sanpham/sanpham.service';
  @Component({
    selector: 'app-detaildathang',
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
      MatDatepickerModule
    ],
    providers:[provideNativeDateAdapter()],
    templateUrl: './detaildathang.component.html',
    styleUrl: './detaildathang.component.scss'
  })
  export class DetailDathangComponent {
    _ListdathangComponent:ListDathangComponent = inject(ListDathangComponent)
    _DathangService:DathangService = inject(DathangService)
    _NhacungcapService:NhacungcapService = inject(NhacungcapService)
    _SanphamService:SanphamService = inject(SanphamService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    filterNCC:any[]= []
    filterSP:any[]= []
    constructor(){
      this._route.paramMap.subscribe(async (params) => {
        const id = params.get('id');
        this._DathangService.setDathangId(id);
        await this._NhacungcapService.getAllNhacungcap();
        await this._SanphamService.getAllSanpham();
        this.filterNCC = this._NhacungcapService.ListNhacungcap();
        this.filterSP = this._SanphamService.ListSanpham();
      });
  
      effect(async () => {
        const id = this._DathangService.dathangId();
      
        if (!id){
          this._router.navigate(['/admin/dathang']);
          this._ListdathangComponent.drawer.close();
        }
        if(id === '0'){
          this.DetailDathang.set({ title: GenId(8, false), madncc: GenId(8, false),ngaynhan: new Date() ,sanpham:[]});
          this._ListdathangComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/dathang', "0"]);
        }
        else{
            await this._DathangService.getDathangByid(id);
            this._ListdathangComponent.drawer.open();
            this._router.navigate(['/admin/dathang', id]);
        }
      });
    }
    
    DetailDathang: any = this._DathangService.DetailDathang;
    isEdit = signal(false);
    isDelete = signal(false);  
    dathangId:any = this._DathangService.dathangId
    async ngOnInit() {       
    }
    onChangeSoluong(item:any,event:any){

    }
    DoFindSanpham(event:any){
        const query = event.target.value.toLowerCase();
         this.filterSP = this._SanphamService.ListSanpham().filter(v => v.title.toLowerCase().includes(query));      
    }
    DoFindNCC(event:any){
        const query = event.target.value.toLowerCase();
         this.filterNCC = this._NhacungcapService.ListNhacungcap().filter(v => v.name.toLowerCase().includes(query));      
    }
    
    SelectNCC(event: any) {
        const selectedKhachhang = this._NhacungcapService.ListNhacungcap().find(
          (v: any) => v.id === event.value
        );
        console.log(selectedKhachhang);
        if (selectedKhachhang) {
          this.DetailDathang.update((v: any) => {
            const khachhang = {
              nhacungcapId: selectedKhachhang.id,
              name: selectedKhachhang.name,
              diachi: selectedKhachhang.diachi,
              sdt: selectedKhachhang.sdt,
              ghichu: selectedKhachhang.ghichu,
            };
            v.khachhangId = selectedKhachhang.id;
            v.khachhang = khachhang;
            return v;
          });
        }
        console.log(this.DetailDathang());
      }
    async handleDathangAction() {
      if (this.dathangId() === '0') {
        await this.createDathang();
      }
      else {
        await this.updateDathang();
      }
    }
    private async createDathang() {
      try {
        await this._DathangService.CreateDathang(this.DetailDathang());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo dathang:', error);
      }
    }

    private async updateDathang() {
      try {
        await this._DathangService.updateDathang(this.DetailDathang());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật dathang:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._DathangService.DeleteDathang(this.DetailDathang());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/dathang']);
      } catch (error) {
        console.error('Lỗi khi xóa dathang:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/dathang'])
      this._ListdathangComponent.drawer.close();
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
      this.DetailDathang.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
    AddSanpham(){
      this.DetailDathang.update((v:any)=>{
        v.sanpham.push({id:GenId(8,false),idSP:'',sldat:0})
        return v;
      })
      console.log(this.DetailDathang());
      
    }
  }
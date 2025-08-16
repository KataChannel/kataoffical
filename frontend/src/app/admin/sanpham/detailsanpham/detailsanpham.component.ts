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
import { SanphamService } from '../sanpham.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { MatMenuModule } from '@angular/material/menu';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
import { ListSanphamComponent } from '../listsanpham/listsanpham.component';
  @Component({
    selector: 'app-detailsanpham',
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
      MatMenuModule
    ],
    templateUrl: './detailsanpham.component.html',
    styleUrl: './detailsanpham.component.scss'
  })
  export class DetailSanphamComponent {
    _ListsanphamComponent:ListSanphamComponent = inject(ListSanphamComponent)
    _SanphamService:SanphamService = inject(SanphamService)
    _NhacungcapService:NhacungcapService = inject(NhacungcapService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    ListNCC:any =[]
    ChosenListNCC:any =[]
    FilterListNCC:any =[]
    DetailSanpham: any = this._SanphamService.DetailSanpham;
    isEdit = signal(false);
    isDelete = signal(false);  
    sanphamId:any = this._SanphamService.sanphamId
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._SanphamService.setSanphamId(id);
      });
  
      effect(async () => {  
        const id = this._SanphamService.sanphamId();
        await this._NhacungcapService.getAllNhacungcap();
        this.ListNCC = this.FilterListNCC = this._NhacungcapService.ListNhacungcap();
        if (!id){
          this._router.navigate(['/admin/sanpham']);
          this._ListsanphamComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailSanpham.set({});
          this._ListsanphamComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/sanpham', 'new']);
          this.ChosenListNCC = this.DetailSanpham().Nhacungcap||[];
        }
        else{
            await this._SanphamService.getSanphamByid(id);
            this._ListsanphamComponent.drawer.open();
            this._router.navigate(['/admin/sanpham', id]);
            this.ChosenListNCC = this.DetailSanpham().Nhacungcap||[];
            this.DetailSanpham.update((v:any)=>{
                v.soluong = Number(parseFloat(v.soluong).toFixed(3))
                return v
            })
        }
      });
    }
    async ngOnInit() {       
    }
    async handleSanphamAction() {
      if (this.sanphamId() === 'new') {
        await this.createSanpham();
      }
      else {
        await this.updateSanpham();
      }
    }
    private async createSanpham() {
      try {
        await this._SanphamService.CreateSanpham(this.DetailSanpham());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo sanpham:', error);
      }
    }

    private async updateSanpham() {
      try {
        await this._SanphamService.updateSanpham(this.DetailSanpham());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật sanpham:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._SanphamService.DeleteSanpham(this.DetailSanpham());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/sanpham']);
      } catch (error) {
        console.error('Lỗi khi xóa sanpham:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/sanpham'])
      this._ListsanphamComponent.drawer.close();
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
      this.DetailSanpham.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }

    doSearch(event: any) {
      this.FilterListNCC = this.ListNCC.filter((v: any) => removeVietnameseAccents(v.name).includes(event.target.value.toLowerCase())||v.name.toLowerCase().includes(event.target.value.toLowerCase())); 
    }
    ChosenAll() {
      this.FilterListNCC.forEach((item: any) => {
      const isItemChosen = this.ChosenListNCC.some((chosenItem:any) => chosenItem.id === item.id);
      if (isItemChosen) {
        this.ChosenListNCC = this.ChosenListNCC.filter((chosenItem:any) => chosenItem.id !== item.id);
      } else {
        this.ChosenListNCC = [...this.ChosenListNCC, item];
      }
      });
    }
    EmptyFiter() {
      this.ChosenListNCC = [];
    }
    ResetFilter(){
      this.ChosenListNCC = this.ListNCC;
    }
    ChosenItem(item: any) {
      const isItemInFilterList = this.ChosenListNCC.some((v: any) => v.id === item.id);
      if (isItemInFilterList) {
      this.ChosenListNCC = this.ChosenListNCC.filter((v: any) => v.id !== item.id);
      } else {
      const itemToAdd = this.ListNCC.find((v: any) => v.id === item.id);
      if (itemToAdd) {
        this.ChosenListNCC = [...this.ChosenListNCC, itemToAdd];
      }
      }
    }
    CheckItem(item: any): boolean {
      return this.ChosenListNCC.some((v: any) => v.id === item.id);
    }
    ApplyFilterColum(menu:any){
        this.DetailSanpham.update((v:any)=>{
          v.Nhacungcap = this.ChosenListNCC
          return v;
        })
        menu.closeMenu();
    }
  }
import { ChangeDetectionStrategy, Component, effect, inject, signal, ViewEncapsulation } from '@angular/core';
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
import { ListNhacungcapComponent } from '../listnhacungcap/listnhacungcap.component';
import { NhacungcapService } from '../nhacungcap.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { MatMenuModule } from '@angular/material/menu';
import { SanphamService } from '../../sanpham/sanpham.service';
import { removeVietnameseAccents } from '../../../shared/utils/texttransfer.utils';
  @Component({
    selector: 'app-detailnhacungcap',
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
    templateUrl: './detailnhacungcap.component.html',
    styleUrl: './detailnhacungcap.component.scss',
    changeDetection:ChangeDetectionStrategy.OnPush,
  })
  export class DetailNhacungcapComponent {
    _ListnhacungcapComponent:ListNhacungcapComponent = inject(ListNhacungcapComponent)
    _NhacungcapService:NhacungcapService = inject(NhacungcapService)
    _SanphamService:SanphamService = inject(SanphamService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._NhacungcapService.setNhacungcapId(id);
      });
  
      effect(async () => {
        const id = this._NhacungcapService.nhacungcapId();
        await this._SanphamService.getAllSanpham();
        this.ListSanpham = this.FilterSanpham = this._SanphamService.ListSanpham();
        if (!id){
          this._router.navigate(['/admin/nhacungcap']);
          this._ListnhacungcapComponent.drawer.close();
        }
        if(id === '0'){
          this.DetailNhacungcap.set(
            {Sanpham: [], isActive: true });
          this._ListnhacungcapComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/nhacungcap', "0"]);
        }
        else{
            await this._NhacungcapService.getNhacungcapByid(id);
            this.ChosenListSanpham = this.DetailNhacungcap()?.Sanpham||[];
            this._ListnhacungcapComponent.drawer.open();
            this._router.navigate(['/admin/nhacungcap', id]);
        }
      });
    }
    DetailNhacungcap: any = this._NhacungcapService.DetailNhacungcap;
    isEdit = signal(false);
    isDelete = signal(false);  
    nhacungcapId:any = this._NhacungcapService.nhacungcapId
    async ngOnInit() {     
      const id = this.nhacungcapId();
      await this._NhacungcapService.getNhacungcapByid(id);
      this.ChosenListSanpham = this.DetailNhacungcap()?.Sanpham||[];
    }
    async handleNhacungcapAction() {
      if (this.nhacungcapId() === '0') {
        await this.createNhacungcap();
      }
      else {
        await this.updateNhacungcap();
      }
    }
    private async createNhacungcap() {
      try {
        await this._NhacungcapService.CreateNhacungcap(this.DetailNhacungcap());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo nhacungcap:', error);
      }
    }

    private async updateNhacungcap() {
      try {
        await this._NhacungcapService.updateNhacungcap(this.DetailNhacungcap());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật nhacungcap:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._NhacungcapService.DeleteNhacungcap(this.DetailNhacungcap());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/nhacungcap']);
      } catch (error) {
        console.error('Lỗi khi xóa nhacungcap:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/nhacungcap'])
      this._ListnhacungcapComponent.drawer.close();
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
      this.DetailNhacungcap.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }

    ListSanpham:any=[]
    FilterSanpham:any =[]
    ChosenListSanpham:any =[]
        doSearch(event: any) {
          this.FilterSanpham = this.ListSanpham.filter((v: any) => removeVietnameseAccents(v.title).includes(event.target.value.toLowerCase())||v.title.toLowerCase().includes(event.target.value.toLowerCase())); 
        }
        ChosenAll() {
          this.FilterSanpham.forEach((item: any) => {
          const isItemChosen = this.ChosenListSanpham.some((chosenItem:any) => chosenItem.id === item.id);
          if (isItemChosen) {
            this.ChosenListSanpham = this.ChosenListSanpham.filter((chosenItem:any) => chosenItem.id !== item.id);
          } else {
            this.ChosenListSanpham = [...this.ChosenListSanpham, item];
          }
          });
        }
        EmptyFiter() {
         this.ChosenListSanpham = [];
        }
        ResetFilter(){
         this.ChosenListSanpham = this.ListSanpham;
        }
        ChosenItem(item: any) {
          const isItemInFilterList = this.ChosenListSanpham.some((v: any) => v.id === item.id);
          if (isItemInFilterList) {
          this.ChosenListSanpham = this.ChosenListSanpham.filter((v: any) => v.id !== item.id);
          } else {
          const itemToAdd = this.ListSanpham.find((v: any) => v.id === item.id);
          if (itemToAdd) {
            this.ChosenListSanpham = [...this.ChosenListSanpham, itemToAdd];
          }
          }
        }
        CheckItem(item: any) {
         return this.ChosenListSanpham.some((v: any) => v.id === item.id);
        }
        ApplyFilterColum(menu:any){
            this.DetailNhacungcap.update((v:any)=>{
              v.Sanpham = this.ChosenListSanpham
              return v;
            })
            menu.closeMenu();
        }
  }
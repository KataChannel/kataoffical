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
import { ListDonhangComponent } from '../listdonhang/listdonhang.component';
import { DonhangService } from '../donhang.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { convertToSlug } from '../../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detaildonhang',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatIconModule,
      MatButtonModule,
      MatSelectModule,
      MatDialogModule,
      CommonModule,
      MatSlideToggleModule
    ],
    templateUrl: './detaildonhang.component.html',
    styleUrl: './detaildonhang.component.scss'
  })
  export class DetailDonhangComponent {
    _ListDonhangComponent:ListDonhangComponent = inject(ListDonhangComponent)
    _DonhangService:DonhangService = inject(DonhangService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._DonhangService.setDonhangId(id);
      });
  
      effect(async () => {
        const id = this._DonhangService.donhangId();
        if (!id){
          this._router.navigate(['/donhang']);
          this._ListDonhangComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailDonhang.set({});
          this._ListDonhangComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/donhang', "new"]);
        }
        else{
            await this._DonhangService.getDonhangBy({id:id,isOne:true});
            this._ListDonhangComponent.drawer.open();
            this._router.navigate(['/donhang', id]);
        }
      });
    }
    DetailDonhang: any = this._DonhangService.DetailDonhang;
    isEdit = signal(false);
    isDelete = signal(false);  
    donhangId:any = this._DonhangService.donhangId
    async ngOnInit() {       
    }
    async handleDonhangAction() {
      if (this.donhangId() === 'new') {
        await this.createDonhang();
      }
      else {
        await this.updateDonhang();
      }
    }
    private async createDonhang() {
      try {
        await this._DonhangService.CreateDonhang(this.DetailDonhang());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo donhang:', error);
      }
    }

    private async updateDonhang() {
      try {
        await this._DonhangService.updateDonhang(this.DetailDonhang());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật donhang:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._DonhangService.DeleteDonhang(this.DetailDonhang());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/donhang']);
      } catch (error) {
        console.error('Lỗi khi xóa donhang:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/donhang'])
      this._ListDonhangComponent.drawer.close();
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
      this.DetailDonhang.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }
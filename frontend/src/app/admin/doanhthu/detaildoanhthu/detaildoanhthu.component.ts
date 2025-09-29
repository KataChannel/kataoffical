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
import { ListDoanhthuComponent } from '../listdoanhthu/listdoanhthu.component';
import { DoanhthuService } from '../doanhthu.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detaildoanhthu',
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
    templateUrl: './detaildoanhthu.component.html',
    styleUrl: './detaildoanhthu.component.scss'
  })
  export class DetailDoanhthuComponent {
    _ListDoanhthuComponent:ListDoanhthuComponent = inject(ListDoanhthuComponent)
    _DoanhthuService:DoanhthuService = inject(DoanhthuService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._DoanhthuService.setDoanhthuId(id);
      });
  
      effect(async () => {
        const id = this._DoanhthuService.doanhthuId();
        if (!id){
          this._router.navigate(['/admin/doanhthu']);
          this._ListDoanhthuComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailDoanhthu.set({});
          this._ListDoanhthuComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/doanhthu', "new"]);
        }
        else{
            await this._DoanhthuService.getDoanhthuBy({id:id,isOne:true});
            this._ListDoanhthuComponent.drawer.open();
            this._router.navigate(['/admin/doanhthu', id]);
        }
      });
    }
    DetailDoanhthu: any = this._DoanhthuService.DetailDoanhthu;
    isEdit = signal(false);
    isDelete = signal(false);  
    doanhthuId:any = this._DoanhthuService.doanhthuId
    async ngOnInit() {       
    }
    async handleDoanhthuAction() {
      if (this.doanhthuId() === 'new') {
        await this.createDoanhthu();
      }
      else {
        await this.updateDoanhthu();
      }
    }
    private async createDoanhthu() {
      try {
        await this._DoanhthuService.CreateDoanhthu(this.DetailDoanhthu());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo doanhthu:', error);
      }
    }

    private async updateDoanhthu() {
      try {
        await this._DoanhthuService.updateDoanhthu(this.DetailDoanhthu());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật doanhthu:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._DoanhthuService.DeleteDoanhthu(this.DetailDoanhthu());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/doanhthu']);
      } catch (error) {
        console.error('Lỗi khi xóa doanhthu:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/doanhthu'])
      this._ListDoanhthuComponent.drawer.close();
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
      this.DetailDoanhthu.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }
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
import { ListXuatnhaptonComponent } from '../listxuatnhapton/listxuatnhapton.component';
import { XuatnhaptonService } from '../xuatnhapton.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailxuatnhapton',
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
    templateUrl: './detailxuatnhapton.component.html',
    styleUrl: './detailxuatnhapton.component.scss'
  })
  export class DetailXuatnhaptonComponent {
    _ListXuatnhaptonComponent:ListXuatnhaptonComponent = inject(ListXuatnhaptonComponent)
    _XuatnhaptonService:XuatnhaptonService = inject(XuatnhaptonService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._XuatnhaptonService.setXuatnhaptonId(id);
      });
  
      effect(async () => {
        const id = this._XuatnhaptonService.xuatnhaptonId();
        if (!id){
          this._router.navigate(['/admin/xuatnhapton']);
          this._ListXuatnhaptonComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailXuatnhapton.set({});
          this._ListXuatnhaptonComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/xuatnhapton', "new"]);
        }
        else{
            await this._XuatnhaptonService.getXuatnhaptonBy({id:id,isOne:true});
            this._ListXuatnhaptonComponent.drawer.open();
            this._router.navigate(['/admin/xuatnhapton', id]);
        }
      });
    }
    DetailXuatnhapton: any = this._XuatnhaptonService.DetailXuatnhapton;
    isEdit = signal(false);
    isDelete = signal(false);  
    xuatnhaptonId:any = this._XuatnhaptonService.xuatnhaptonId
    async ngOnInit() {       
    }
    async handleXuatnhaptonAction() {
      if (this.xuatnhaptonId() === 'new') {
        await this.createXuatnhapton();
      }
      else {
        await this.updateXuatnhapton();
      }
    }
    private async createXuatnhapton() {
      try {
        await this._XuatnhaptonService.CreateXuatnhapton(this.DetailXuatnhapton());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo xuatnhapton:', error);
      }
    }

    private async updateXuatnhapton() {
      try {
        await this._XuatnhaptonService.updateXuatnhapton(this.DetailXuatnhapton());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật xuatnhapton:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._XuatnhaptonService.DeleteXuatnhapton(this.DetailXuatnhapton());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/xuatnhapton']);
      } catch (error) {
        console.error('Lỗi khi xóa xuatnhapton:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/xuatnhapton'])
      this._ListXuatnhaptonComponent.drawer.close();
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
      this.DetailXuatnhapton.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }
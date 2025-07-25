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
import { ListChotkhoComponent } from '../listchotkho/listchotkho';
import { ChotkhoService } from '../chotkho.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailchotkho',
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
    templateUrl: './detailchotkho.html',
    styleUrl: './detailchotkho.scss'
  })
  export class DetailChotkhoComponent {
    _ListChotkhoComponent:ListChotkhoComponent = inject(ListChotkhoComponent)
    _ChotkhoService:ChotkhoService = inject(ChotkhoService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._ChotkhoService.setChotkhoId(id);
      });
  
      effect(async () => {
        const id = this._ChotkhoService.chotkhoId();
        if (!id){
          this._router.navigate(['/admin/chotkho']);
          this._ListChotkhoComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailChotkho.set({});
          this._ListChotkhoComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/chotkho', "new"]);
        }
        else{
            await this._ChotkhoService.getChotkhoBy({id:id,isOne:true});
            this._ListChotkhoComponent.drawer.open();
            this._router.navigate(['/admin/chotkho', id]);
        }
      });
    }
    DetailChotkho: any = this._ChotkhoService.DetailChotkho;
    isEdit = signal(false);
    isDelete = signal(false);  
    chotkhoId:any = this._ChotkhoService.chotkhoId
    async ngOnInit() {       
    }
    async handleChotkhoAction() {
      if (this.chotkhoId() === 'new') {
        await this.createChotkho();
      }
      else {
        await this.updateChotkho();
      }
    }
    private async createChotkho() {
      try {
        await this._ChotkhoService.CreateChotkho(this.DetailChotkho());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo chotkho:', error);
      }
    }

    private async updateChotkho() {
      try {
        await this._ChotkhoService.updateChotkho(this.DetailChotkho());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật chotkho:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._ChotkhoService.DeleteChotkho(this.DetailChotkho());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/chotkho']);
      } catch (error) {
        console.error('Lỗi khi xóa chotkho:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/chotkho'])
      this._ListChotkhoComponent.drawer.close();
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
      this.DetailChotkho.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }
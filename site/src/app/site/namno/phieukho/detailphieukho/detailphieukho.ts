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

import { ListPhieukhoComponent } from '../listphieukho/listphieukho';
import { PhieukhoService } from '../phieukho.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { convertToSlug } from '../../../../shared/utils/shared.utils';

@Component({
    selector: 'app-detailphieukho',
    imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule
],
    templateUrl: './detailphieukho.html',
    styleUrl: './detailphieukho.scss'
  })
  export class DetailPhieukhoComponent {
    _ListPhieukhoComponent:ListPhieukhoComponent = inject(ListPhieukhoComponent)
    _PhieukhoService:PhieukhoService = inject(PhieukhoService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._PhieukhoService.setPhieukhoId(id);
      });
  
      effect(async () => {
        const id = this._PhieukhoService.phieukhoId();
        if (!id){
          this._router.navigate(['phieukho']);
          this._ListPhieukhoComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailPhieukho.set({});
          this._ListPhieukhoComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['phieukho', "new"]);
        }
        else{
            await this._PhieukhoService.getPhieukhoBy({id:id,isOne:true});
            this._ListPhieukhoComponent.drawer.open();
            this._router.navigate(['phieukho', id]);
        }
      });
    }
    DetailPhieukho: any = this._PhieukhoService.DetailPhieukho;
    isEdit = signal(false);
    isDelete = signal(false);  
    phieukhoId:any = this._PhieukhoService.phieukhoId
    async ngOnInit() {       
    }
    async handlePhieukhoAction() {
      if (this.phieukhoId() === 'new') {
        await this.createPhieukho();
      }
      else {
        await this.updatePhieukho();
      }
    }
    private async createPhieukho() {
      try {
        await this._PhieukhoService.CreatePhieukho(this.DetailPhieukho());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo phieukho:', error);
      }
    }

    private async updatePhieukho() {
      try {
        await this._PhieukhoService.updatePhieukho(this.DetailPhieukho());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật phieukho:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._PhieukhoService.DeletePhieukho(this.DetailPhieukho());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['phieukho']);
      } catch (error) {
        console.error('Lỗi khi xóa phieukho:', error);
      }
    }
    goBack(){
      this._router.navigate(['phieukho'])
      this._ListPhieukhoComponent.drawer.close();
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
      this.DetailPhieukho.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }
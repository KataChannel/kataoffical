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

import { ListAuditlogComponent } from '../listauditlog/listauditlog.component';
import { AuditlogService } from '../auditlog.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailauditlog',
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
    templateUrl: './detailauditlog.component.html',
    styleUrl: './detailauditlog.component.scss'
  })
  export class DetailAuditlogComponent {
    _ListAuditlogComponent:ListAuditlogComponent = inject(ListAuditlogComponent)
    _AuditlogService:AuditlogService = inject(AuditlogService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._AuditlogService.setAuditlogId(id);
      });
  
      effect(async () => {
        const id = this._AuditlogService.auditlogId();
        if (!id){
          this._router.navigate(['/admin/auditlog']);
          this._ListAuditlogComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailAuditlog.set({});
          this._ListAuditlogComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/auditlog', "new"]);
        }
        else{
            await this._AuditlogService.getAuditlogBy({id:id,isOne:true});
            this._ListAuditlogComponent.drawer.open();
            this._router.navigate(['/admin/auditlog', id]);
        }
      });
    }
    DetailAuditlog: any = this._AuditlogService.DetailAuditlog;
    isEdit = signal(false);
    isDelete = signal(false);  
    auditlogId:any = this._AuditlogService.auditlogId
    async ngOnInit() {       
    }
    async handleAuditlogAction() {
      if (this.auditlogId() === 'new') {
        await this.createAuditlog();
      }
      else {
        await this.updateAuditlog();
      }
    }
    private async createAuditlog() {
      try {
        await this._AuditlogService.CreateAuditlog(this.DetailAuditlog());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo auditlog:', error);
      }
    }

    private async updateAuditlog() {
      try {
        await this._AuditlogService.updateAuditlog(this.DetailAuditlog());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật auditlog:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._AuditlogService.DeleteAuditlog(this.DetailAuditlog());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/auditlog']);
      } catch (error) {
        console.error('Lỗi khi xóa auditlog:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/auditlog'])
      this._ListAuditlogComponent.drawer.close();
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
      this.DetailAuditlog.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }
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
import { ListResourceComponent } from '../listresource/listresource.component';
import { ResourceService } from '../resource.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { UploadresourceComponent } from '../../../shared/common/uploadresource/uploadresource.component';
import { environment } from '../../../../environments/environment.development';
  @Component({
    selector: 'app-detailresource',
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
    ],
    templateUrl: './detailresource.component.html',
    styleUrls: ['./detailresource.component.scss']
  })
  export class DetailResourceComponent {
    _ListResourceComponent:ListResourceComponent = inject(ListResourceComponent)
    _ResourceService:ResourceService = inject(ResourceService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._ResourceService.setResourceId(id);
      });
  
      effect(async () => {
        const id = this._ResourceService.resourceId();
        if (!id){
          this._router.navigate(['/admin/resource']);
          this._ListResourceComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailResource.set({});
          this._ListResourceComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/resource', "new"]);
        }
        else{
            await this._ResourceService.getResourceBy({id:id,isOne:true});
            this._ListResourceComponent.drawer.open();
            this._router.navigate(['/admin/resource', id]);
        }
      });
    }
    DetailResource: any = this._ResourceService.DetailResource;
    isEdit = signal(false);
    isDelete = signal(false);  
    resourceId:any = this._ResourceService.resourceId
    // uploadUrl: string = `https://api.kataoffical.online/minio/upload`;
    uploadUrl: string = `${environment.APIURL}/minio/upload`;
    category: string = 'default';
    group: string = 'default';
    async ngOnInit() {
    }
    async handleResourceAction() {
      if (this.resourceId() === 'new') {
        await this.createResource();
      }
      else {
        await this.updateResource();
      }
    }
    private async createResource() {
      try {
        await this._ResourceService.CreateResource(this.DetailResource());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo resource:', error);
      }
    }

    private async updateResource() {
      try {
        await this._ResourceService.updateResource(this.DetailResource());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật resource:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._ResourceService.DeleteResource(this.DetailResource());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/resource']);
      } catch (error) {
        console.error('Lỗi khi xóa resource:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/resource'])
      this._ListResourceComponent.drawer.close();
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
      this.DetailResource.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }

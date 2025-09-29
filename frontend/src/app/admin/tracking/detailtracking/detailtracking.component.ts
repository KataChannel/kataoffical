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
import { ListTrackingComponent } from '../listtracking/listtracking.component';
import { TrackingService } from '../tracking.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
  @Component({
    selector: 'app-detailtracking',
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
    templateUrl: './detailtracking.component.html',
    styleUrl: './detailtracking.component.scss'
  })
  export class DetailTrackingComponent {
    _ListTrackingComponent:ListTrackingComponent = inject(ListTrackingComponent)
    _TrackingService:TrackingService = inject(TrackingService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._TrackingService.setTrackingId(id);
      });
  
      effect(async () => {
        const id = this._TrackingService.trackingId();
        if (!id){
          this._router.navigate(['/admin/tracking']);
          this._ListTrackingComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailTracking.set({});
          this._ListTrackingComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/tracking', "new"]);
        }
        else{
            await this._TrackingService.getTrackingBy({id:id});
            this._ListTrackingComponent.drawer.open();
            this._router.navigate(['/admin/tracking', id]);
        }
      });
    }
    DetailTracking: any = this._TrackingService.DetailTracking;
    isEdit = signal(false);
    isDelete = signal(false);  
    trackingId:any = this._TrackingService.trackingId
    async ngOnInit() {       
    }
    async handleTrackingAction() {
      if (this.trackingId() === 'new') {
        await this.createTracking();
      }
      else {
        await this.updateTracking();
      }
    }
    private async createTracking() {
      try {
        await this._TrackingService.CreateTracking(this.DetailTracking());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo tracking:', error);
      }
    }

    private async updateTracking() {
      try {
        await this._TrackingService.updateTracking(this.DetailTracking());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật tracking:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._TrackingService.DeleteTracking(this.DetailTracking());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/tracking']);
      } catch (error) {
        console.error('Lỗi khi xóa tracking:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/tracking'])
      this._ListTrackingComponent.drawer.close();
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
      this.DetailTracking.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }
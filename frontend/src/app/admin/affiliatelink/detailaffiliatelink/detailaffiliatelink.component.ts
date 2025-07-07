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
import { ListAffiliatelinkComponent } from '../listaffiliatelink/listaffiliatelink.component';
import { AffiliatelinkService } from '../affiliatelink.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GenId, convertToSlug } from '../../../shared/utils/shared.utils';
import { SearchfilterComponent } from '../../../shared/common/searchfilter/searchfilter.component';
import { LandingpageService } from '../../landingpage/landingpage.service';
import { UserService } from '../../user/user.service';
  @Component({
    selector: 'app-detailaffiliatelink',
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
      SearchfilterComponent
    ],
    templateUrl: './detailaffiliatelink.component.html',
    styleUrl: './detailaffiliatelink.component.scss'
  })
  export class DetailAffiliatelinkComponent {
    _ListAffiliatelinkComponent:ListAffiliatelinkComponent = inject(ListAffiliatelinkComponent)
    _AffiliatelinkService:AffiliatelinkService = inject(AffiliatelinkService)
    _LandingpageService:LandingpageService = inject(LandingpageService)
    _UserService:UserService = inject(UserService)
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)
    _snackBar:MatSnackBar = inject(MatSnackBar)
    constructor(){
      this._route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this._AffiliatelinkService.setAffiliatelinkId(id);
      });
  
      effect(async () => {
        const id = this._AffiliatelinkService.affiliatelinkId();
        await this._LandingpageService.getAllLandingpage();
        this.filterItem = this._LandingpageService.ListLandingpage();
        await this._UserService.getProfile();
        if (!id){
          this._router.navigate(['/admin/affiliatelink']);
          this._ListAffiliatelinkComponent.drawer.close();
        }
        if(id === 'new'){
          this.DetailAffiliatelink.set({createdById: this._UserService.profile().id});
          this._ListAffiliatelinkComponent.drawer.open();
          this.isEdit.update(value => !value);
          this._router.navigate(['/admin/affiliatelink', "new"]);
        }
        else{
            await this._AffiliatelinkService.getAffiliatelinkBy({id:id});  
            this.ListFilter =this._AffiliatelinkService.DetailAffiliatelink().landingPage;
            this._ListAffiliatelinkComponent.drawer.open();
            this._router.navigate(['/admin/affiliatelink', id]);
        }
      });
    }
    DetailAffiliatelink: any = this._AffiliatelinkService.DetailAffiliatelink;
    isEdit = signal(false);
    isDelete = signal(false);  
    affiliatelinkId:any = this._AffiliatelinkService.affiliatelinkId
    ListLandingpage:any = this._LandingpageService.ListLandingpage;
    ListFilter:any =[]
    filterItem :any =[]
    async ngOnInit() {       
      this.ListLandingpage = await this._LandingpageService.getAllLandingpage();
    }
    onOutFilter(event: any) {
      console.log(event);
      
      this.DetailAffiliatelink.update((v:any)=>{
        v.landingPageId = event[0].id;
        return v;
      })  
      console.log(this.DetailAffiliatelink());
    }
    async handleAffiliatelinkAction() {
      if (this.affiliatelinkId() === 'new') {
        await this.createAffiliatelink();
      }
      else {
        await this.updateAffiliatelink();
      }
    }
    private async createAffiliatelink() {
      try {
        await this._AffiliatelinkService.CreateAffiliatelink(this.DetailAffiliatelink());
        this._snackBar.open('Tạo Mới Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi tạo affiliatelink:', error);
      }
    }

    private async updateAffiliatelink() {
      try {
        await this._AffiliatelinkService.updateAffiliatelink(this.DetailAffiliatelink());
        this._snackBar.open('Cập Nhật Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.isEdit.update(value => !value);
      } catch (error) {
        console.error('Lỗi khi cập nhật affiliatelink:', error);
      }
    }
    async DeleteData()
    {
      try {
        await this._AffiliatelinkService.DeleteAffiliatelink(this.DetailAffiliatelink());
  
        this._snackBar.open('Xóa Thành Công', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
  
        this._router.navigate(['/admin/affiliatelink']);
      } catch (error) {
        console.error('Lỗi khi xóa affiliatelink:', error);
      }
    }
    goBack(){
      this._router.navigate(['/admin/affiliatelink'])
      this._ListAffiliatelinkComponent.drawer.close();
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
      this.DetailAffiliatelink.update((v:any)=>{
        v.slug = convertToSlug(v.title);
        return v;
      })
    }
  }
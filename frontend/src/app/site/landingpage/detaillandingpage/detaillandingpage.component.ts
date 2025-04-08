import { CommonModule } from "@angular/common"
import { inject, effect, Component, TemplateRef } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { AffiliatelinkService } from "../../../admin/affiliatelink/affiliatelink.service"
import { LandingpageService } from "../../../admin/landingpage/landingpage.service"
import { UserService } from "../../../admin/user/user.service"
import { ActivatedRoute, Router } from "@angular/router"
import { DomSanitizer } from "@angular/platform-browser"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"
import { StorageService } from "../../../shared/utils/storage.service"
@Component({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  selector: 'app-detaillandingpage',
  templateUrl: './detaillandingpage.component.html',
  styleUrls: ['./detaillandingpage.component.scss']
})
export class DetaillandingpageComponent {
    private _LandingpageService:LandingpageService = inject(LandingpageService)
    private _AffiliatelinkService:AffiliatelinkService = inject(AffiliatelinkService)
    private _UserService:UserService = inject(UserService)
    private _StorageService:StorageService = inject(StorageService)
    private sanitizer:DomSanitizer = inject(DomSanitizer)
    DetailLandingpage:any = this._LandingpageService.DetailLandingpage
    LinkAffiliate:any = this._AffiliatelinkService.ListAffiliatelink
    Profile:any
    SafeUrl:any
    affiliateCode:any
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)    
    private _dialog: MatDialog = inject(MatDialog);
    private _snackBar: MatSnackBar = inject(MatSnackBar);
    constructor() {
  
      effect(async () => {
        if(this._StorageService.getItem('token')) {
        await this._UserService.getProfile()
        this.Profile = this._UserService.profile()
        }
        this._route.paramMap.subscribe(async (params) => {
          const slug = params.get('slug');
          await this._LandingpageService.getLandingpageBy({slug:slug});
          this.SafeUrl = this.SecurityTrustUrl(this.DetailLandingpage().contentHtml) 
        });
        // Check for ref parameter in URL
        this._route.queryParamMap.subscribe(params => {
          const ref = params.get('ref');
          if (ref) {
            this.affiliateCode = ref
            console.log('Affiliate ref code:', this.affiliateCode);
            this._AffiliatelinkService.Tracking(this.affiliateCode);
          }
        });
      });
    }
    ngOnInit(): void {
      this._AffiliatelinkService.listenAffiliatelinkUpdates()
    }
    // ngAfterViewInit(): void {
    //   this.getView() 
    // }
    // getView(){
    //   this._AffiliatelinkService.Tracking();
    // }
    getAffiliateLink(item:any) {
      console.log(item);
      const affiliateLink = this.LinkAffiliate().find((v:any)=> v.landingPageId == item.id);
      console.log('affiliateLink',affiliateLink);
      const link = affiliateLink ? affiliateLink?.landingPage?.slug+'/?ref='+affiliateLink.codeId : null;
      return link
    }
    SecurityTrustUrl(url:any){
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  
    async CreateAffiliateLink(item:any) {
      console.log(item);
      this.Profile.id
      const data ={
        landingPageId: item.id,
        createdById: this.Profile.id,
      }
     await this._AffiliatelinkService.CreateAffiliatelink(data)
     await this._AffiliatelinkService.getAffiliateListBy({createdById: this.Profile.id});
     console.log(this._AffiliatelinkService.ListAffiliatelink());
     
    }
    CopyLinkAffiliate(link:any) {

    }
    SharedAffiliate(link:any) {

    }
    onRegister() {
      
    }
    openDangkyDialog(teamplate: TemplateRef<any>) {
      if(this.Profile) {
        this._snackBar.open('Bạn đang là thành viên', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-warning'],
        });
        return
      }
           const dialogDeleteRef = this._dialog.open(teamplate, {
             hasBackdrop: true,
             disableClose: false,
           });
           dialogDeleteRef.afterClosed().subscribe((result) => {
             if (result=="true") {
              this.onRegister()
             }
           });
    
    }
    loginGoogle() {
      this._UserService.loginWithGoogle();
    }
    User:any={}
    async Dangky() {
      this.User.affiliateCode = this.affiliateCode
      if(
        this.User.phone &&
        this.User.phone !== '' &&
        this.User.password &&
        this.User.password !== ''
      ) {
        try {
          this._UserService.register(this.User).then((data: any) => {
            console.log(data);
  
            if (data && data.statusCode == 201) {
              this._snackBar.open('Đăng ký thành công', '', {
                duration: 1000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['snackbar-success'],
              });
              setTimeout(() => {
                this._dialog.closeAll();
                this._router.navigate(['/welcome']);
              }, 1000);
            } 
            
            // else {
            //   this._snackBar.open('Thông Tin Đăng Nhập Chưa Đúng', '', {
            //     duration: 1000,
            //     horizontalPosition: 'end',
            //     verticalPosition: 'top',
            //     panelClass: ['snackbar-warning'],
            //   });
            // }
          });
        } catch (error) {
          console.error('Login error:', error);
        }
      } else {
        //this._NotifierService.notify('error',"Vui lòng điền đủ thông tin")
        this._snackBar.open('Vui lòng điền đủ thông tin', '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    }
}

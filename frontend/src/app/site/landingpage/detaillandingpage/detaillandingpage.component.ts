import { CommonModule } from "@angular/common"
import { inject, effect, Component } from "@angular/core"
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
@Component({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  selector: 'app-detaillandingpage',
  templateUrl: './detaillandingpage.component.html',
  styleUrls: ['./detaillandingpage.component.scss']
})
export class DetaillandingpageComponent {
    private _LandingpageService:LandingpageService = inject(LandingpageService)
    private _AffiliatelinkService:AffiliatelinkService = inject(AffiliatelinkService)
    private _UserService:UserService = inject(UserService)
    private sanitizer:DomSanitizer = inject(DomSanitizer)
    DetailLandingpage:any = this._LandingpageService.DetailLandingpage
    LinkAffiliate:any = this._AffiliatelinkService.ListAffiliatelink
    Profile:any
    _route:ActivatedRoute = inject(ActivatedRoute)
    _router:Router = inject(Router)    
    constructor() {
  
      effect(async () => {
        await this._UserService.getProfile()
        this.Profile = this._UserService.profile()
        this._route.paramMap.subscribe(async (params) => {
          const slug = params.get('slug');
          await this._LandingpageService.getLandingpageBy({slug:slug});
          console.log(this.DetailLandingpage());
        });
        // Check for ref parameter in URL
        this._route.queryParamMap.subscribe(params => {
          const ref = params.get('ref');
          if (ref) {
            console.log('Affiliate ref code:', ref);
            this._AffiliatelinkService.Tracking(ref);
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
}

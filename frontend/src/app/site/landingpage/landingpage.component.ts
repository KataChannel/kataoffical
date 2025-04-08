import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { LandingpageService } from '../../admin/landingpage/landingpage.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../admin/user/user.service';
import { AffiliatelinkService } from '../../admin/affiliatelink/affiliatelink.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-landingpage',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent {
    private _LandingpageService:LandingpageService = inject(LandingpageService)
    private _AffiliatelinkService:AffiliatelinkService = inject(AffiliatelinkService)
    private _UserService:UserService = inject(UserService)
    private _clipboard:Clipboard = inject(Clipboard)
    private _MatSnackBar:MatSnackBar = inject(MatSnackBar)
    ListLandingpage:any = this._LandingpageService.ListLandingpage
    LinkAffiliate:any = this._AffiliatelinkService.ListAffiliatelink
    Profile:any
    constructor() {
      effect(async () => {
        await this._LandingpageService.getAllLandingpage()
        await this._UserService.getProfile()
        this.Profile = this._UserService.profile()
        await this._AffiliatelinkService.getAffiliateListBy({createdById: this.Profile.id});
      });
    }
    ngOnInit(): void {
       this._AffiliatelinkService.listenAffiliatelinkUpdates()
    }

    getAffiliateLink(item:any) {
      const affiliateLink = this.LinkAffiliate().find((v:any)=> v.landingPageId == item.id);
      console.log('affiliateLink',affiliateLink);
      const link = affiliateLink ? affiliateLink?.landingPage?.slug+'/?ref='+affiliateLink.codeId : null;
      return link
    }
    async CreateAffiliateLink(item:any) {
      this.Profile.id
      const data ={
        landingPageId: item.id,
        createdById: this.Profile.id,
      }
     await this._AffiliatelinkService.CreateAffiliatelink(data)
     await this._AffiliatelinkService.getAffiliateListBy({createdById: this.Profile.id});
     console.log(this._AffiliatelinkService.ListAffiliatelink());
     
    }
    CopyLinkAffiliate(item:any) {
      const domain = window.location.origin;
      const link = `${domain}/landingpage/${this.getAffiliateLink(item)}`;
      this._clipboard.copy(link);
      this._MatSnackBar.open('Đã copy liên kết', 'Đóng', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
    }
    SharedAffiliate(item:any) {
      window.open(`/landingpage/${this.getAffiliateLink(item)}`, '_blank');
    }
}

import { Component, effect, inject } from '@angular/core';
import { AffiliatelinkService } from '../../admin/affiliatelink/affiliatelink.service';
import { LandingpageService } from '../../admin/landingpage/landingpage.service';
import { UserService } from '../../admin/user/user.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-welcome',
  imports: [MatCardModule,CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
    private _LandingpageService:LandingpageService = inject(LandingpageService)
    private _AffiliatelinkService:AffiliatelinkService = inject(AffiliatelinkService)
    private _UserService:UserService = inject(UserService)
    DetailLandingpage:any = this._LandingpageService.DetailLandingpage
    Profile:any
    constructor() {
         effect(async () => {
           await this._UserService.getProfile()
           this.Profile = this._UserService.profile()
         });
       }
       getAffiliateLink(item:any) {
        const link = item ? item?.landingPage?.slug+'/?ref='+item.codeId : null;
        return link
      }  
}

import { Component, inject, Sanitizer, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingpageService } from '../../../../admin/landingpage/landingpage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrackingService } from '../../../../admin/tracking/tracking.service';
import { StorageService } from '../../../../shared/utils/storage.service';
import { AffiliatelinkService } from '../../../../admin/affiliatelink/affiliatelink.service';
import { UserService } from '../../../../admin/user/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-detailladictv',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
  ],
  templateUrl: './detailladictv.component.html',
  styleUrl: './detailladictv.component.scss',
})
export class DetailladictvComponent {
  _LandingpageService: LandingpageService = inject(LandingpageService);
  _AffiliatelinkService: AffiliatelinkService = inject(AffiliatelinkService);
  _TrackingService: TrackingService = inject(TrackingService);
 _UserService:UserService = inject(UserService);
  _StorageService: StorageService = inject(StorageService);
  ladipage = signal<any>({});
  _sanitizer: DomSanitizer = inject(DomSanitizer);
  refCode:any = this._StorageService.getItem('refCode') || undefined;
  ref: any = undefined;
  constructor(private route: ActivatedRoute) {
    const urlParams = new URLSearchParams(window.location.search);
    if (!this.refCode) {
      this.ref = urlParams.get('ref') || undefined;
    } else {
      this.ref = this.refCode;
    }
    this.route.paramMap.subscribe(async (params) => {
      const slug = params.get('slug');
      if (slug) {
        await this._LandingpageService.getLandingpageBy({ slug, isOne: true });
        this.ladipage = this._LandingpageService.DetailLandingpage;
        console.log(this.ladipage());
        
      }
     const codeID =  urlParams.get('codeId')
     let affiliateLinkId:any= null;
     if(codeID){
        await this._AffiliatelinkService.getAffiliatelinkBy({ codeId: codeID,isOne:true })
        affiliateLinkId = this._AffiliatelinkService.affiliatelinkId();
     }
     await this._UserService.getProfile()

      this.logLadiPageView({
        eventType: 'page_view',
        pageUrl: window.location.href,
        pageType: 'LadiCTV',
        pageIdentifier: slug,
        refCode: this.ref,
        referrer: this._UserService.profile().id || undefined,
        affiliateLinkId: affiliateLinkId || null,
      });

    });
  }

  ngOnInit(): void {
    console.log(this.ladipage());
  }
  TrustUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnDestroy(): void {}

  logLadiPageView(data: any): void {
    this._TrackingService.CreateTracking(data);
  }

  getTextStyles(textNode: any) {
    const styles: any = {};
    if (textNode.marks) {
      textNode.marks.forEach((mark: any) => {
        if (mark.type === 'bold') {
          styles['font-weight'] = 'bold';
        }
        if (mark.type === 'italic') {
          styles['font-style'] = 'italic';
        }
        if (mark.type === 'textColor') {
          styles['color'] = mark.attrs.color;
        }
      });
    }
    return styles;
  }

  // Chuyển hướng khi nhấn nút
  navigateTo(url: string) {
    window.open(url, '_blank');
  }

  // Sanitize URL để tránh lỗi bảo mật
  sanitizeUrl(url: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

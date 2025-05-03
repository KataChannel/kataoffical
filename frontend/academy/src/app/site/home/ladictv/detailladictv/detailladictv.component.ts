import { Component, inject, Sanitizer, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingpageService } from '../../../../admin/landingpage/landingpage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TrackingService } from '../../../../admin/tracking/tracking.service';
import { StorageService } from '../../../../shared/utils/storage.service';

@Component({
  selector: 'app-detailladictv',
  imports: [],
  templateUrl: './detailladictv.component.html',
  styleUrl: './detailladictv.component.scss',
})
export class DetailladictvComponent {
  _LandingpageService: LandingpageService = inject(LandingpageService);
  _TrackingService: TrackingService = inject(TrackingService);
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
        await this._LandingpageService.getLandingpageBy({ slug });
        this.ladipage = this._LandingpageService.DetailLandingpage;
      }
      this.logLadiPageView({
        eventType: 'page_view',
        pageUrl: window.location.href,
        pageType: 'LadiCTV',
        pageIdentifier: slug,
        refCode: this.ref,
        referrer: document.referrer || undefined,
      });
    });
  }

  ngOnInit(): void {}
  TrustUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnDestroy(): void {}

  logLadiPageView(data: any): void {
    this._TrackingService.CreateTracking(data);
  }
}

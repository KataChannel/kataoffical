import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../admin/user/user.service';
import { LandingpageService } from '../../../admin/landingpage/landingpage.service';
import { MatMenuModule } from '@angular/material/menu';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
  
  @Component({
    selector: 'app-ladictv',
    imports: [
      CommonModule, 
      FormsModule, 
      RouterModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatMenuModule,
      MatSnackBarModule
    ], // Import các module cần thiết vào đây 
    templateUrl: './ladictv.component.html',
    styleUrls: ['./ladictv.component.scss'],
  })
  export class LadictvComponent implements OnInit {
    _UserService:UserService = inject(UserService);
    _LandingpageService:LandingpageService = inject(LandingpageService);
    _snackbar:MatSnackBar = inject(MatSnackBar);
    Listladipage = signal<any[]>([]);
    Filerladi:any=[];
    profile:any = signal<any>({});
    isShowUTM:any=[]
    constructor() {
        effect(async() => {
         await this._LandingpageService.getAllLandingpage()
         this.Listladipage = this._LandingpageService.ListLandingpage;
         this.Filerladi = [...this.Listladipage()];         
        })
    }
    ngOnInit(): void {
      this._UserService.getProfile().then(data => {
        if(data){
          this.profile.set(data);
        }
      });
    }
    applyFilters(event:any): void {      
      const query = (event.target as HTMLInputElement).value;
      this.Filerladi = this.Listladipage().filter(item => item.title.toLowerCase().includes(query));
    }
    getUrl(item:any){
      const result = `/ladictv/${item?.slug}?ref=${this.profile()?.inviteCode}`;
      return result;
    }


  private encode(str: string): string {
    return encodeURIComponent(str);
  }
  getCoppyLink(url: string) {
    const fullUrl = window.location.origin + url;
    console.log(fullUrl);
    navigator.clipboard.writeText(fullUrl).then(() => {
      this._snackbar.open('Đã Coppy', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
    }).catch(err => {
      this._snackbar.open('Coppy Lỗi', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-error'],
      });
    });
  }
  share(platform: string, url: string, title?: string, description?: string, image?: string): void {
    url = window.location.origin + url;
    let shareUrl: string;
    switch (platform.toLowerCase()) {
      case 'facebook':
        url = url+'&sharePlatform=facebook';
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${this.encode(url)}&quote=${this.encode(title || '')}`;
        break;
      case 'twitter':
        url = url+'&sharePlatform=twitter';
        shareUrl = `https://twitter.com/intent/tweet?url=${this.encode(url)}&text=${this.encode(title || '')}`;
        break;
      case 'linkedin':
        url = url+'&sharePlatform=linkedin';
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${this.encode(url)}`;
        break;
      case 'pinterest':
        url = url+'&sharePlatform=pinterest';
        shareUrl = `https://pinterest.com/pin/create/button/?url=${this.encode(url)}&media=${this.encode(image || '')}&description=${this.encode(description || '')}`;
        break;
      case 'whatsapp':
        url = url+'&sharePlatform=whatsapp';
        shareUrl = `https://api.whatsapp.com/send?text=${this.encode(`${title} ${url}`)}`;
        break;
      case 'email':
        url = url+'&sharePlatform=email';
        shareUrl = `mailto:?subject=${this.encode(title || '')}&body=${this.encode(description || '')}%0A${this.encode(url)}`;
        break;  
      default:
        console.warn(`Share platform "${platform}" is not supported.`);
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }


  } 
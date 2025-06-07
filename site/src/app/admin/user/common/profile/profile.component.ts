import { MatDatepickerModule } from '@angular/material/datepicker';

import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserService } from '../../../../admin/user/user.service';
import { UploadService } from '../../../../shared/uploadfile/uploadfile.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NgxFileDropModule,
    MatSidenavModule,
    RouterLink
],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isMenuOpen: boolean = false;
  profileImageUrl: string = 'avatar.png'; // Default image
  constructor(
    private sanitizer: DomSanitizer,
  ) {
    effect(async () => {

    });
   }
  isLoading:boolean = false;
  profile = signal<any>({});
  isEditAvatar:boolean=false
  public files: NgxFileDropEntry[] = [];
  _UserService:UserService = inject(UserService)
  _uploadService:UploadService = inject(UploadService)
  ProfileMenus:any[]=[
    {id:1,title:'Tin Mới',link:'newsfeed',icon:'rss_feed'},
    {id:2,title:'Sự Kiện',link:'socialpage',icon:'notifications'},
    {id:4,title:'Hoạt Động',link:'activity',icon:'receipt_long'},
    {id:4,title:'Album Ảnh',link:'gallery',icon:'image'},
  ]
  async ngOnInit() {
   await this._UserService.getProfile()
   this.profile = this._UserService.profile
  }
  getTrustUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  public handlePaste(event: ClipboardEvent) {
    this.isLoading = true;
    const clipboardItems = event.clipboardData?.items;
    if (clipboardItems) {
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            // Here you can upload the pasted screenshot
            console.log('Pasted image:', blob);
            const file = new File([blob], `${this.profile().email.split("@")[0]}_${(new Date().getTime())}.png`, {
              type: blob.type,
            });
            this._uploadService.uploadDriver(file).then((res: any) => {
              console.log(res);
              this.profile().Avatar = res.fileId
              this.isLoading = false;
              this.isEditAvatar =false
              this._UserService.updateUser(this.profile())
            });
          }
        }
      }
    }
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.isLoading = true;
    this.files = files;
    for (const droppedFile of files) {
      // Check if the file is a folder or a file
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can process the file, such as uploading it
          this._uploadService.uploadDriver(file).then((res: any) => {
            console.log(res);
            this.profile().Avatar = res.fileId
            this.isLoading = false;
            this.isEditAvatar =false
            this._UserService.updateUser(this.profile())
          });
        });
      }
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  openImageUploader() {
    // Implement image upload logic here
  }
}

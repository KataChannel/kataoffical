import { Component, inject, signal } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../admin/user/user.service';
import { DynamicformComponent } from '../../../../../shared/common/dynamicform/dynamicform.component';
import { UploadService } from '../../../../../shared/uploadfile/uploadfile.service';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-general',
  imports: [
    NgxFileDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
  isLoading:boolean = false;
  account: any = {};
  isEditAvatar:boolean=false
  public files: NgxFileDropEntry[] = [];
  profile = signal<any>({})
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;
  user: any = {
    oldpass: '',
    newpass: '',
    confirmnewpass: ''
  };
  _UserService:UserService = inject(UserService)
  _uploadService:UploadService = inject(UploadService)
  _snackBar:MatSnackBar = inject(MatSnackBar)
  Detail:any={}
  constructor(
    private sanitizer: DomSanitizer,
  ) { 

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
            const file = new File([blob], `${this.account.email.split("@")[0]}_${(new Date().getTime())}.png`, {
              type: blob.type,
            });
            this._uploadService.uploadDriver(file).then((res: any) => {
              console.log(res);
              this.account.Avatar = res.fileId
              this.isLoading = false;
              this.isEditAvatar =false
              this._UserService.updateUser(this.account)
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
            this.account.Avatar = res.fileId
            this.isLoading = false;
            this.isEditAvatar =false
            this._UserService.updateUser(this.account)
          });
        });
      }
    }
  }
  ChangePass()
  {
    console.log(this.user);
    
    if(this.user.oldpass==''||this.user.newpass==''||this.user.confirmnewpass=='')
    {
  this._snackBar.open('Vui lòng điền đủ thông tin', '', {
    duration: 1000,
    horizontalPosition: "end",
    verticalPosition: "top",
    panelClass: ['snackbar-error'],
  });
    }
    else if(this.user.newpass!=this.user.confirmnewpass)
    {
      this._snackBar.open('Xác Nhận Mật Khẩu Mới Không Giống Nhau', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
      });
    }
    else{
        const data = {
          id:this._UserService.profile().id,
          oldpass:this.user.oldpass,
          newpass:this.user.newpass,
        }
        this._UserService.changepass(data).then((data)=>{
        
          if(data.statusCode===200)
          {
            this._snackBar.open(data.message, '', {
              duration: 1000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['snackbar-success'],
            });
            this.user = {
              oldpass: '',
              newpass: '',
              confirmnewpass: ''
            };
          }
         else {          
          this._snackBar.open(data.message, '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
         }
        })
    }
  }
}

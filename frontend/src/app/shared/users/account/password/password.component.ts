import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../../../../admin/adminmain/listuser/listuser.services';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PasswordComponent implements OnInit {
  user: any = {
    oldpass: '',
    newpass: '',
    confirmnewpass: ''
  };
  profile = signal<any>({})
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;
  _UsersService:UsersService = inject(UsersService)
  constructor() { }

  async ngOnInit() {

    await this._UsersService.getProfile()
    console.log(this._UsersService.profile());
    
  }
  ChangePass()
  {
    console.log(this.user);
    
    if(this.user.oldpass==''||this.user.newpass==''||this.user.confirmnewpass=='')
    {
  //    this._NotifierService.notify('error',"Vui lòng điền đủ thông tin")
    }
    else if(this.user.newpass!=this.user.confirmnewpass)
    {
    //  this._NotifierService.notify('error',"Xác Nhận Mật Khẩu Mới Không Giống Nhau")
    }
    else{
        const data = {
          id:this._UsersService.profile().id,
          oldpass:this.user.oldpass,
          newpass:this.user.newpass,
        }
        this._UsersService.changepass(data).then((data)=>{
          if(data[0]==200)
          {
          //  this._NotifierService.notify('success',data[1])
            this.user = {
              oldpass: '',
              newpass: '',
              confirmnewpass: ''
            };
          }
         else {          
         // this._NotifierService.notify('error',data[1])
         }
        })
    }
  }
}

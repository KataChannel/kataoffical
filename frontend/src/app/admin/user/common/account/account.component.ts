import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../../admin/user/user.service';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }
   profile = signal<any>({});
  _UserService:UserService = inject(UserService)
  async ngOnInit() {
   await this._UserService.getProfile()
   this.profile = this._UserService.profile
   console.log( this.profile);
  }
  AccountMenus:any[]=[
    {id:1,title:'Tài Khoản',link:'general',icon:'account_circle'},
    {id:2,title:'Thông Báo',link:'notifications',icon:'notifications'},
    {id:4,title:'Thanh Toán',link:'billing',icon:'receipt'},
    {id:3,title:'Bảo Mật',link:'security',icon:'lock'},
  ]
  Update()
  {
    this._UserService.updateUser(this.profile()).then(()=>{
     // this._NotifierService.notify('success',"Cập nhật thành công")
    })
  }

}

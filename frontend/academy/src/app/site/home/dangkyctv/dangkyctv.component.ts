import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../admin/user/user.service';
import { StorageService } from '../../../shared/utils/storage.service';

@Component({
  selector: 'app-dangkyctv',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './dangkyctv.component.html',
  styleUrls: ['./dangkyctv.component.scss']
})
export class DangkyctvComponent {
  _UserService: UserService = inject(UserService);
  isRegister: boolean = false;
  Dangky:any={
    affiliateCode:'',
  }
  constructor() {}
  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      this.Dangky.affiliateCode = ref
    }
  }

  async onDangky(){
    const res = await this._UserService.register(this.Dangky)
    console.log(res);
    if (res.statusCode==201) {
      this.isRegister = true;
      // alert('Đăng ký thành công!');
      // window.location.href = '/';
    } else {
      
    }

  }
}
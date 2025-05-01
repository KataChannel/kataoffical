import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../admin/user/user.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-taikhoanctv',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './taikhoanctv.component.html',
  styleUrl: './taikhoanctv.component.scss'
})
export class TaikhoanctvComponent {
  _UserService:UserService = inject(UserService);
  profile:any = signal<any>({});
  inviteLink:any = '';
  constructor() {}
  ngOnInit(): void {
    this._UserService.getProfile().then((res: any) => {
      console.log(res);
      this.profile.set(res);

      const domain = window.location.origin;
      this.inviteLink = `${domain}/dangkyctv?ref=${this.profile().phone}`;
    });
  }
  logout() {    
    console.log('logout');
    this._UserService.logout().then((res: any) => {
      if (res) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  }
}

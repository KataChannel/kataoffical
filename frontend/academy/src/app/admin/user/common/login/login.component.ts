import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Component,
  inject,
  OnInit,
  Inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import * as Auth from 'firebase/auth';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Config } from './login';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../admin/user/user.service';
import { StorageService } from '../../../../shared/utils/storage.service';
import { UserAdminService } from '../../useradmin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  tokenadmin: any;
  gotonew: any = 'translate-x-0';
  _UserService: UserAdminService = inject(UserAdminService);
  _StorageService: StorageService = inject(StorageService);
  Config: any = Config;
  order1: any = 'order-1';
  order2: any = 'order-2';
  rightpanel: any = 'transform-x-0';
  leftpanel: any = 'transform-x-0';
  // _spinner: NgxSpinnerService = inject(NgxSpinnerService);
  // _NotifierService: NotifierService = inject(NotifierService);
  User: any = {};
  constructor(
    private auth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.tokenadmin = localStorage.getItem('tokenadmin') || null;
    }
  }
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent): void {
    if (event.origin !== 'http://localhost:4300') return;
    // console.log('Got this message from parent: ' + JSON.stringify(event.data));
  }
  SlidingForm() {
    if (this.order1 == 'order-1') {
      this.rightpanel = 'opacity-0';
      this.leftpanel = 'opacity-0';
    } else {
      this.rightpanel = 'opacity-100';
      this.leftpanel = 'opacity-100';
    }
    setTimeout(() => {
      this.order1 == 'order-1'
        ? (this.order1 = 'order-2')
        : (this.order1 = 'order-1'),
        this.order2 == 'order-1'
          ? (this.order2 = 'order-2')
          : (this.order2 = 'order-1');
      this.rightpanel = 'opacity-100';
      this.leftpanel = 'opacity-100';
    }, 200);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tokenadmin = params['tokenadmin'];
      if (tokenadmin) {
        this.validatetokenadmin(tokenadmin); // Validate the tokenadmin
      } else {
        this.router.navigate(['/admin/profile']);
      }
    });
  }
  validatetokenadmin(tokenadmin: string) {
    // Decode the tokenadmin (if it's a JWT)
    try {
      const payload = JSON.parse(atob(tokenadmin.split('.')[1])); // Decode the payload
      // Check if the tokenadmin is expired (if it has an `exp` field)
      if (payload.exp && payload.exp < Date.now() / 1000) {
      } else {
        this._StorageService.setItem('tokenadmin', tokenadmin); // Store the tokenadmin
        this._UserService.getProfile().then((res: any) => {
          if (res) {
            if (res.permissions > 0) {
              console.log(res);
              window.location.reload(); // Reload the page
            } else {
              this.router.navigate([
                '/404',
                {
                  queryParams: {
                    data: {
                      code: 403,
                      title: 'Bạn không có quyền truy cập liên hệ admin',
                    },
                  },
                },
              ]);
            }
          }
        });
      }
    } catch (error) {}
  }
  async Dangnhap() {
    //console.log(this.User);
    if (
      this.User.SDT &&
      this.User.SDT !== '' &&
      this.User.password &&
      this.User.password !== ''
    ) {
      try {
        this._UserService.login(this.User).then((data: any) => {
          console.log(data);
          if (data&&data[0]) {
            setTimeout(() => {
              window.location.reload();
            }, 100);
          } else {
            this._snackBar.open('Thông Tin Đăng Nhập Chưa Đúng', '', {
              duration: 1000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-warning'],
            });
          }
        });
      } catch (error) {
        console.error('Login error:', error);
      }
    } else {
      //this._NotifierService.notify('error',"Vui lòng điền đủ thông tin")
      this._snackBar.open('Vui lòng điền đủ thông tin', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
  async loginWithGoogle() {
    const GoogleAuthProvider = new Auth.GoogleAuthProvider();
    try {
      const result = await this.auth.signInWithPopup(GoogleAuthProvider);
      console.log('Logged in:', result);

      console.log('Logged in:', result.user);
      console.log('Logged in:', result.user?.providerData[0]);
      this._UserService
        .LoginByGoogle(result.user?.providerData[0])
        .then((data: any) => {
          if (data[0]) {
            //  console.log(data);
            //this.postMessage(data[1]);
            if (isPlatformBrowser(this.platformId)) {
              // this.postMessage(data[1]);
              // setTimeout(() => {
              //   window.location.reload();
              // }, 0);
            }
          }
        });
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Login error:', error);
    }
  }

  loginGoogle() {
    this._UserService.loginWithGoogle();
  }

  loginFacebook() {
    this._UserService.loginWithFacebook();
  }

  loginZalo() {
    this._UserService.loginWithZalo();
  }
}

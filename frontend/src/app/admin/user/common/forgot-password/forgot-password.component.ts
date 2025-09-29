import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordData: any = {
    email: '',
    phone: ''
  };
  
  isLoading = false;
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  constructor() { }

  ngOnInit(): void {
  }

  async onSubmit() {
    if ((!this.forgotPasswordData.email && !this.forgotPasswordData.phone) ||
        (this.forgotPasswordData.email === '' && this.forgotPasswordData.phone === '')) {
      this._snackBar.open('Vui lòng nhập email hoặc số điện thoại', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    this.isLoading = true;

    try {
      const result = await this._userService.forgotPassword(this.forgotPasswordData);
      
      if (result.success) {
        let message = 'Yêu cầu đặt lại mật khẩu đã được xử lý!';
        
        if (result.data?.emailSent) {
          message = `Link đặt lại mật khẩu đã được gửi đến ${result.data.email}`;
        } else if (result.data?.resetToken) {
          message = 'Token đặt lại mật khẩu đã được tạo. Vui lòng kiểm tra email hoặc liên hệ hỗ trợ.';
          // Store reset token for development (remove in production)
          localStorage.setItem('resetToken', result.data.resetToken);
        }

        this._snackBar.open(message, '', {
          duration: 8000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        // Navigate back to login after success
        setTimeout(() => {
          this.router.navigate(['/loginctv']);
        }, 3000);
      } else {
        this._snackBar.open(result.message || 'Có lỗi xảy ra', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      this._snackBar.open('Có lỗi xảy ra, vui lòng thử lại', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    } finally {
      this.isLoading = false;
    }
  }
}

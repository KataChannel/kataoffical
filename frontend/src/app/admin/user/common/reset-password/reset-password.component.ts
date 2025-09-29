import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordData: any = {
    newPassword: '',
    confirmPassword: ''
  };
  
  resetToken: string = '';
  isLoading = false;
  hideNewPassword = true;
  hideConfirmPassword = true;
  
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    // Get token from URL query params
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'];
      if (!this.resetToken) {
        // Try to get from localStorage (for development)
        this.resetToken = localStorage.getItem('resetToken') || '';
        if (!this.resetToken) {
          this._snackBar.open('Token không hợp lệ', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
          this.router.navigate(['/loginctv']);
        }
      }
    });
  }

  async onSubmit() {
    // Validate passwords
    if (!this.resetPasswordData.newPassword || !this.resetPasswordData.confirmPassword) {
      this._snackBar.open('Vui lòng nhập đầy đủ thông tin', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    if (this.resetPasswordData.newPassword !== this.resetPasswordData.confirmPassword) {
      this._snackBar.open('Mật khẩu xác nhận không khớp', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    if (this.resetPasswordData.newPassword.length < 6) {
      this._snackBar.open('Mật khẩu phải có ít nhất 6 ký tự', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      return;
    }

    this.isLoading = true;

    try {
      const result = await this._userService.resetPassword(this.resetToken, this.resetPasswordData.newPassword);
      
      if (result.success) {
        this._snackBar.open('Mật khẩu đã được đặt lại thành công!', '', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });

        // Clear token from localStorage
        localStorage.removeItem('resetToken');

        // Navigate to login after success
        setTimeout(() => {
          this.router.navigate(['/loginctv']);
        }, 2000);
      } else {
        this._snackBar.open(result.message || 'Có lỗi xảy ra', '', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    } catch (error) {
      console.error('Reset password error:', error);
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

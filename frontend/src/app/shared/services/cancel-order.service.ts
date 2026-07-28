import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CancelReasonDialogComponent } from '../components/cancel-reason-dialog.component';
import { DonhangService } from '../../admin/donhang/donhang.service';
import { DathangService } from '../../admin/dathang/dathang.service';

/**
 * Service để xử lý việc hủy đơn hàng với dialog và snackbar
 */
@Injectable({
  providedIn: 'root'
})
export class CancelOrderService {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private donhangService = inject(DonhangService);
  private dathangService = inject(DathangService);

  /**
   * Hủy đơn hàng bán (Donhang)
   * @param order Đơn hàng cần hủy
   * @returns Promise<boolean> true nếu hủy thành công, false nếu không
   */
  async cancelDonhang(order: any): Promise<boolean> {
    // Validate order status
    if (order.status === 'huy') {
      this.snackBar.open('❌ Đơn hàng đã được hủy trước đó', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return false;
    }

    // Open dialog to get cancellation reason
    const dialogRef = this.dialog.open(CancelReasonDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        orderType: 'donhang',
        orderId: order.id,
        orderCode: order.code || order.madonhang,
        currentStatus: order.status
      }
    });

    const lydohuy = await dialogRef.afterClosed().toPromise();

    if (!lydohuy) {
      // User cancelled the dialog
      return false;
    }

    // Show loading snackbar
    const loadingSnack = this.snackBar.open('⏳ Đang xử lý hủy đơn hàng...', '', {
      duration: 0,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

    try {
      const result = await this.donhangService.cancelDonhang(order.id, lydohuy);

      loadingSnack.dismiss();

      this.snackBar.open(`✅ ${result.message}`, 'Đóng', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

      return true;
    } catch (error: any) {
      loadingSnack.dismiss();

      this.snackBar.open(`❌ Lỗi khi hủy đơn hàng: ${error.message}`, 'Đóng', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      return false;
    }
  }

  /**
   * Hủy đơn đặt hàng (Dathang)
   * @param order Đơn đặt hàng cần hủy
   * @returns Promise<boolean> true nếu hủy thành công, false nếu không
   */
  async cancelDathang(order: any): Promise<boolean> {
    // Validate order status
    if (order.status === 'huy') {
      this.snackBar.open('❌ Đơn đặt hàng đã được hủy trước đó', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
      return false;
    }

    // Open dialog to get cancellation reason
    const dialogRef = this.dialog.open(CancelReasonDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        orderType: 'dathang',
        orderId: order.id,
        orderCode: order.code || order.madathang,
        currentStatus: order.status
      }
    });

    const lydohuy = await dialogRef.afterClosed().toPromise();

    if (!lydohuy) {
      // User cancelled the dialog
      return false;
    }

    // Show loading snackbar
    const loadingSnack = this.snackBar.open('⏳ Đang xử lý hủy đơn đặt hàng...', '', {
      duration: 0,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-warning']
    });

    try {
      const result = await this.dathangService.cancelDathang(order.id, lydohuy);

      loadingSnack.dismiss();

      this.snackBar.open(`✅ ${result.message}`, 'Đóng', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

      return true;
    } catch (error: any) {
      loadingSnack.dismiss();

      this.snackBar.open(`❌ Lỗi khi hủy đơn đặt hàng: ${error.message}`, 'Đóng', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      return false;
    }
  }

  /**
   * Kiểm tra xem đơn hàng có thể hủy hay không
   * @param order Đơn hàng cần kiểm tra
   * @returns true nếu có thể hủy, false nếu không
   */
  canCancelOrder(order: any): boolean {
    return order.status !== 'huy';
  }

  /**
   * Lấy tooltip message cho nút hủy
   * @param order Đơn hàng cần kiểm tra
   * @returns Tooltip message
   */
  getCancelButtonTooltip(order: any): string {
    if (order.status === 'huy') {
      return 'Đơn hàng đã được hủy';
    }
    return 'Hủy đơn hàng';
  }
}

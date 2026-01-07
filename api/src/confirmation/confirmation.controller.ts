import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfirmationService } from './confirmation.service';

@Controller('confirm')
export class ConfirmationController {
  constructor(private readonly confirmationService: ConfirmationService) {}

  // Public endpoint - Lấy thông tin đơn hàng từ token
  @Get(':token')
  async getDonhangByToken(@Param('token') token: string) {
    return this.confirmationService.getDonhangByToken(token);
  }

  // Public endpoint - Xác nhận lần 1
  @Post(':token/xac-nhan-lan-1')
  async xacNhanLan1(
    @Param('token') token: string,
    @Body('ghiChuKH') ghiChuKH?: string,
  ) {
    return this.confirmationService.xacNhanLan1(token, ghiChuKH);
  }

  // Public endpoint - Xác nhận lần 2
  @Post(':token/xac-nhan-lan-2')
  async xacNhanLan2(
    @Param('token') token: string,
    @Body('ghiChuKH') ghiChuKH?: string,
  ) {
    return this.confirmationService.xacNhanLan2(token, ghiChuKH);
  }

  // Public endpoint - Từ chối đơn hàng
  @Post(':token/tu-choi')
  async tuChoi(
    @Param('token') token: string,
    @Body('ghiChuKH') ghiChuKH?: string,
  ) {
    return this.confirmationService.tuChoi(token, ghiChuKH);
  }

  // Public endpoint - Cập nhật ghi chú
  @Post(':token/ghi-chu')
  async updateGhiChuKH(
    @Param('token') token: string,
    @Body('ghiChuKH') ghiChuKH: string,
  ) {
    return this.confirmationService.updateGhiChuKH(token, ghiChuKH);
  }
}

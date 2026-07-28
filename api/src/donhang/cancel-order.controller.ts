import { Controller, Post, Get, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CancelOrderService, CancelOrderDto } from './cancel-order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class CancelOrderController {
  constructor(private readonly cancelOrderService: CancelOrderService) {}

  /**
   * POST /orders/donhang/:id/cancel
   * Hủy đơn hàng (Donhang)
   */
  @Post('donhang/:id/cancel')
  async cancelDonhang(
    @Param('id') orderId: string,
    @Body('lydohuy') lydohuy: string,
    @Request() req: any
  ) {
    const dto: CancelOrderDto = {
      orderId,
      lydohuy,
      userId: req.user?.id
    };

    return await this.cancelOrderService.cancelDonhang(dto);
  }

  /**
   * POST /orders/dathang/:id/cancel
   * Hủy đơn đặt hàng (Dathang)
   */
  @Post('dathang/:id/cancel')
  async cancelDathang(
    @Param('id') orderId: string,
    @Body('lydohuy') lydohuy: string,
    @Request() req: any
  ) {
    const dto: CancelOrderDto = {
      orderId,
      lydohuy,
      userId: req.user?.id
    };

    return await this.cancelOrderService.cancelDathang(dto);
  }

  /**
   * GET /orders/donhang/canceled
   * Lấy danh sách đơn hàng đã hủy
   */
  @Get('donhang/canceled')
  async getCanceledDonhang(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return await this.cancelOrderService.getCanceledOrders('donhang', {
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    });
  }

  /**
   * GET /orders/dathang/canceled
   * Lấy danh sách đơn đặt hàng đã hủy
   */
  @Get('dathang/canceled')
  async getCanceledDathang(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return await this.cancelOrderService.getCanceledOrders('dathang', {
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    });
  }
}

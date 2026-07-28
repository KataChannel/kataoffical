import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DonhangService } from './donhang.service';
import { PriceHistoryService } from './price-history.service';
import {
  UpdateProductPriceDto,
  BulkUpdatePriceDto,
  GetPriceHistoryDto,
  GetDonhangPriceAuditDto,
} from './dto/price-management.dto';

@ApiTags('Price Management')
@Controller('donhang/price')
// @UseGuards(JwtAuthGuard) // Uncomment when authentication is needed
export class DonhangPriceController {
  constructor(
    private readonly donhangService: DonhangService,
    private readonly priceHistoryService: PriceHistoryService,
  ) {}

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật giá sản phẩm trong đơn hàng' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Đơn hàng hoặc sản phẩm không tồn tại' })
  async updateProductPrice(
    @Body() dto: UpdateProductPriceDto,
    @Req() req: any,
  ) {
    // Extract user info from request if authenticated
    if (req.user) {
      dto.changedBy = req.user.id;
      dto.changedByEmail = req.user.email;
    }
    
    // Extract IP and User Agent
    dto.ipAddress = req.ip || req.connection.remoteAddress;
    dto.userAgent = req.headers['user-agent'];

    return await this.donhangService.updateProductPrice(dto);
  }

  @Get(':donhangId/audit')
  @ApiOperation({ summary: 'Lấy lịch sử thay đổi giá của đơn hàng' })
  @ApiResponse({ status: 200, description: 'Trả về lịch sử audit' })
  async getDonhangPriceAudit(@Param('donhangId') donhangId: string) {
    return await this.priceHistoryService.getDonhangPriceAudit({ 
      donhangId,
      limit: 100 
    });
  }

  @Get(':donhangId/verify')
  @ApiOperation({ summary: 'Xác minh giá đơn hàng so với bảng giá hiện tại' })
  @ApiResponse({ status: 200, description: 'Trả về kết quả xác minh' })
  async verifyOrderPrices(@Param('donhangId') donhangId: string) {
    return await this.donhangService.verifyOrderPrices(donhangId);
  }

  @Get('audit/product/:sanphamId')
  @ApiOperation({ summary: 'Lấy lịch sử giá của sản phẩm trong tất cả đơn hàng' })
  async getProductPriceAudit(
    @Param('sanphamId') sanphamId: string,
    @Query('limit') limit?: number,
  ) {
    return await this.priceHistoryService.getDonhangPriceAudit({ 
      sanphamId,
      limit: limit || 50 
    });
  }

  @Get('banggia/:banggiaId/history')
  @ApiOperation({ summary: 'Lấy lịch sử thay đổi giá trong bảng giá' })
  async getBanggiaPriceHistory(
    @Param('banggiaId') banggiaId: string,
    @Query() dto: GetPriceHistoryDto,
  ) {
    dto.banggiaId = banggiaId;
    return await this.priceHistoryService.getBanggiaPriceHistory(dto);
  }

  @Get('banggia/:banggiaId/product/:sanphamId/comparison')
  @ApiOperation({ summary: 'So sánh giá hiện tại vs lịch sử' })
  async getPriceComparison(
    @Param('banggiaId') banggiaId: string,
    @Param('sanphamId') sanphamId: string,
  ) {
    return await this.priceHistoryService.getPriceComparison(sanphamId, banggiaId);
  }

  @Get('product/:sanphamId/statistics')
  @ApiOperation({ summary: 'Thống kê biến động giá sản phẩm' })
  async getPriceStatistics(
    @Param('sanphamId') sanphamId: string,
    @Query('days') days?: number,
  ) {
    return await this.priceHistoryService.getPriceStatistics(
      sanphamId, 
      days || 30
    );
  }
}

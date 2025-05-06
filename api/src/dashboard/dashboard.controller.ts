import { Controller, Get, Post, Body, Param, Patch, Delete, UsePipes, ValidationPipe, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto, UpdateDashboardDto, ReorderDashboardDto, FindByDto } from './dto/dashboard.dto';
import { SummaryQueryDto } from './dto/summary-query.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get('summary') // GET /dashboard/summary?preset=month hoặc ?startDate=...&endDate=...
  getSummary(@Query() query: SummaryQueryDto) {
    return this.dashboardService.getSummary(query);
  }
  @Get('top-products') // GET /dashboard/top-products?limit=5&preset=week
  getTopSellingProducts(
      @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
      @Query() query: SummaryQueryDto
  ) {
    return this.dashboardService.getTopSellingProducts(limit, query);
  }

  @Get('low-stock') // GET /dashboard/low-stock
  getLowStockProducts() {
      // Có thể thêm tham số query để tùy chỉnh ngưỡng
      return this.dashboardService.getLowStockProducts();
  }

  @Get('recent-orders') // GET /dashboard/recent-orders?limit=10
  getRecentOrders(
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
      return this.dashboardService.getRecentOrders(limit);
  }
  @Get('sales-trend') // GET /dashboard/sales-trend?preset=month
  getSalesTrend(@Query() query: SummaryQueryDto) {
      return this.dashboardService.getSalesTrend(query);
  }
  @Get('doanhthu') // GET /dashboard/sales-trend?preset=month
  getDoanhthu(@Query() query: SummaryQueryDto) {
      return this.dashboardService.getDoanhthu(query);
  }

}
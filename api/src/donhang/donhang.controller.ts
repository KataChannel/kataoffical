import { Controller, Get, Post, Body, Param, Patch, Delete, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DonhangService } from './donhang.service';
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';
import { DonhangCronService } from './donhang-cron.service';
import { Cache, CacheInvalidate } from '../common/cache.interceptor';
import { SmartCache } from '../common/smart-cache.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('donhang')
export class DonhangController {
  constructor(
    private readonly donhangService: DonhangService,
    private readonly donhangCronService: DonhangCronService,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
  @SmartCache({
    invalidate: ['donhang', 'khachhang'],
    get: { ttl: 600, keyPrefix: 'donhang' },
    updateCache: true
  })
  create(@Body() createDonhangDto: any) {
    return this.donhangService.create(createDonhangDto);
  }

  @Post('importold')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Import Donhang Cu', action: AuditAction.CREATE, includeResponse: true})
  @CacheInvalidate(['donhang:*'])
  ImportDonhangOld(@Body() data: any) {
    return this.donhangService.ImportDonhangOld(data);
  }
  
  @Post('importold/confirmed')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Import Donhang Cu Confirmed', action: AuditAction.CREATE, includeResponse: true})
  @CacheInvalidate(['donhang:*'])
  ImportDonhangOldConfirmed(@Body() data: { pendingOrders: any[], userChoice: 'proceed' | 'skip' }) {
    return this.donhangService.ImportDonhangOldConfirmed(data.pendingOrders, data.userChoice);
  }

  @Post('import')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Import Donhang', action: AuditAction.CREATE, includeResponse: true})
  @CacheInvalidate(['donhang:*'])
  ImportDonhang(@Body() data: any) {
    return this.donhangService.ImportDonhang(data);
  }
  @Post('search')
  async search(@Body() params: any) {
    return this.donhangService.search(params);
  }
  @Post('congnokhachhang')
  @Cache(60) // Cache for 60 seconds
  async congnokhachhang(@Body() params: any) {
    return this.donhangService.congnokhachhang(params);
  }
  @Post('downloadcongnokhachhang')
  async downloadcongnokhachhang(@Body() params: any, @Res() res: Response) {
    try {
      const result = await this.donhangService.downloadcongnokhachhang(params);
      
      res.setHeader('Content-Type', result.contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
      res.setHeader('Content-Length', result.buffer.length);
      
      return res.end(result.buffer);
    } catch (error) {
      console.error('Error downloading congno:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi khi tải file công nợ',
        error: error.message
      });
    }
  }
  @Post('phieuchuyen')
  async phieuchuyen(@Body() params: any) {
    return this.donhangService.phieuchuyen(params);
  }
  @Post('dongbogia')
  async dongbogia(@Body() params: any) {
    return this.donhangService.dongbogia(params);
  }
  @Post('getchogiao')
  async getchogiao(@Body() params: any) {
    return this.donhangService.getchogiao(params);
  }
  @Post('phieugiao')
  async phieugiao(@Body() params: any) {
    const result = await this.donhangService.phieugiao(params);
    return result;
  }
  @Post('searchfield')
  async searchfield(@Body() searchParams: Record<string, any>) {
    return this.donhangService.searchfield(searchParams);
  }
  // @Get()
  // findAll() {
  //   return this.donhangService.findAll();
  // }
  @Get('findbysanpham/:id')
  findByProductId(@Param('id') id: string) {
    console.log(id);
    
    return this.donhangService.findByProductId(id);
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.donhangService.findOne(id);
  }
  @Patch('phieugiao/:id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Update Phieugiao', action: AuditAction.UPDATE, includeResponse: true})
  async updatePhieugiao(@Param('id') id: string, @Body() updateDonhangDto: any) {
    const result = await  this.donhangService.updatePhieugiao(id, updateDonhangDto);
    return result;
  }
  @Patch('bulk')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Update bulk Donhang', action: AuditAction.UPDATE, includeResponse: true})
  @CacheInvalidate(['donhang', 'khachhang'])
  updateBulk(@Body() data: any[]) {
    return this.donhangService.updateBulk(data,'danhan');
  }
  
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Update Donhang', action: AuditAction.UPDATE, includeResponse: true})
  @SmartCache({
    invalidate: ['donhang', 'khachhang'],
    get: { ttl: 600, keyPrefix: 'donhang' },
    updateCache: true
  })
  update(@Param('id') id: string, @Body() updateDonhangDto: any) {
    return this.donhangService.update(id, updateDonhangDto);
  }

  @Delete('bulk')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Delete Donhang', action: AuditAction.DELETE, includeResponse: true})
  @CacheInvalidate(['donhang', 'khachhang'])
  async removeBulk(@Body() ids: any[]) {
      return await this.donhangService.removeBulk(ids);
  }
  
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Delete Donhang', action: AuditAction.DELETE, includeResponse: true})
  @CacheInvalidate(['donhang', 'khachhang'])
  remove(@Param('id') id: string) {
    return this.donhangService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { donhangIds: string[] }) {
    return this.donhangService.reorderDonHangs(body.donhangIds);
  }
  @Post(':id/dagiao')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
  async dagiao(@Param('id') id: string,@Body() data: any) {
    const result =  await this.donhangService.dagiao(id,data);
    console.log('result', result);
    return result;
  }
  @Post(':id/danhan')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
  async danhan(@Param('id') id: string,@Body() data: any) {
    const result =  await this.donhangService.danhan(id,data);
    console.log('result', result);
    return result;
  }
  // @Post(':id/danhan')
  // @Audit({entity: 'Create Donhang', action: AuditAction.CREATE, includeResponse: true})
  // danhan(@Body() data: any) {
  //   return this.donhangService.danhan(data);
  // }
  @Get('autoCompleteOrdersDaily')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Manual Auto Complete Orders', action: AuditAction.UPDATE, includeResponse: true})
  async autoCompleteOrdersDaily() {
    try {
      const result = await this.donhangCronService.autoCompleteOrdersDaily();
      return {
        success: true,
        message: 'Auto-complete cron job executed manually',
        result: result
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to execute auto-complete cron job',
        error: error.message
      };
    }
  }

  @Post('manualAutoComplete')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Manual Auto Complete Orders', action: AuditAction.UPDATE, includeResponse: true})
  async manualAutoComplete(@Body() body: { date?: string }) {
    try {
      const result = await this.donhangCronService.manualAutoComplete(body.date);
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to execute manual auto-complete',
        error: error.message
      };
    }
  }

  @Post('complete-pending-deliveries/:sanphamId')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Complete Pending Deliveries', action: AuditAction.UPDATE, includeResponse: true})
  async completePendingDeliveries(@Param('sanphamId') sanphamId: string) {
    try {
      const result = await this.donhangService.completePendingDeliveriesForProduct(sanphamId);
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to complete pending deliveries',
        error: error.message
      };
    }
  }
}
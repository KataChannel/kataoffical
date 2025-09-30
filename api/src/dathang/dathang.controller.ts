import { Controller, Get, Post, Body, Param, Patch, Delete, Res, UseGuards } from '@nestjs/common';
import { DathangService } from './dathang.service';
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';
import { Response } from 'express';
import { Cache } from '../common/cache.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('dathang')
export class DathangController {
  constructor(private readonly dathangService: DathangService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Create Dathang', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createDathangDto: any) {
    return this.dathangService.create(createDathangDto);
  }
  @Post('import')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Import Dathang', action: AuditAction.CREATE, includeResponse: true})
  import(@Body() data: any) {
    return this.dathangService.import(data);
  }
  @Post('importcu')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Import Dathang Cu', action: AuditAction.CREATE, includeResponse: true})
  importcu(@Body() data: any) {
    return this.dathangService.importcu(data);
  }
  @Post('bynhucau')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Create Dathang by nhu cau', action: AuditAction.CREATE, includeResponse: true})
  createbynhucau(@Body() data: any) {
    return this.dathangService.createbynhucau(data);
  }
  @Post('getchonhap')
  async getchonhap(@Body() params: any) {
    return this.dathangService.getchonhap(params);
  }
  @Post('search')
    async search(@Body() params: any) {
    return this.dathangService.search(params);
  }
  
  @Post('congnoncc')
  @Cache(60) // ⚡ Cache for 60 seconds for better performance
  async congnoncc(@Body() params: any) {
    return this.dathangService.congnoncc(params);
  }
  
  @Post('downloadcongnoncc')
  async downloadcongnoncc(@Body() params: any, @Res() res: Response) {
    try {
      const result = await this.dathangService.downloadcongnoncc(params);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=congnoncc.xlsx');
      res.send(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  @Get()
  findAll() {
    return this.dathangService.findAll();
  }
  @Post('findby')
  findby(@Body() param: any) {
    return this.dathangService.findby(param);
  }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.dathangService.findOne(id);
  }
  @Get('findbysanpham/:id')
  findByProductId(@Param('id') id: string) {
    return this.dathangService.findByProductId(id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Update Dathang', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateDathangDto: any) {
    return this.dathangService.update(id, updateDathangDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Delete Dathang', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.dathangService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { dathangIds: string[] }) {
    return this.dathangService.reorderDathangs(body.dathangIds);
  }
  @Post('deletebulk')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Delete Bulk Dathang', action: AuditAction.DELETE, includeResponse: true})
  deletebulk(@Body() data: any) {
    return this.dathangService.deletebulk(data);
  }

  @Post('complete-pending-receipts/:sanphamId')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Complete Pending Receipts', action: AuditAction.UPDATE, includeResponse: true})
  async completePendingReceipts(@Param('sanphamId') sanphamId: string) {
    try {
      const result = await this.dathangService.completePendingReceiptsForProduct(sanphamId);
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to complete pending receipts',
        error: error.message
      };
    }
  }
}
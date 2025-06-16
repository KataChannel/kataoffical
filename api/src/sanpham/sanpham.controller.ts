import { Controller, Get, Post, Body, Param, Patch, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';

@Controller('sanpham')
export class SanphamController {
  constructor(private readonly sanphamService: SanphamService) {}

  @Post()
  @Audit({entity: 'Create Sanpham', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createSanphamDto: any) {
    return this.sanphamService.create(createSanphamDto);
  }
  @Post('import')
  @Audit({entity: 'Import Sanpham', action: AuditAction.CREATE, includeResponse: true})
  import(@Body() data: any) {
    return this.sanphamService.import(data);
  }
  @Post('findby')
  async findby(@Body() param: any) {
    const result = await this.sanphamService.findby(param);
    return result;
  }
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.sanphamService.findAll(query);
    } catch (error) {
      throw new HttpException(
          error.message || 'Failed to fetch khachhangs',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } 
    }
  @Get('nhucaudathang')
  nhucaudathang() {
    return this.sanphamService.nhucaudathang();
  }
    @Get('lastupdated')
    async getLastUpdated() {
      try {
        return await this.sanphamService.getLastUpdated();
      } catch (error) {
        throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.sanphamService.findOne(id);
  }
  @Patch(':id')
  @Audit({entity: 'Update Sanpham', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateSanphamDto: any) {
    return this.sanphamService.update(id, updateSanphamDto);
  }

  @Delete(':id')
  @Audit({entity: 'Delete Sanpham', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.sanphamService.remove(id);
  }
  @Post('reorder')
  reorder(@Body() body: { sanphamIds: string[] }) {
    return this.sanphamService.reorderSanphams(body.sanphamIds);
  }
}
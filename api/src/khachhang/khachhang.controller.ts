import { Controller, Get, Post, Body, Param, Patch, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { KhachhangService } from './khachhang.service';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';

@Controller('khachhang')
export class KhachhangController {
  constructor(private readonly khachhangService: KhachhangService) {}
    @Get('lastupdated')
    async getLastUpdated() {
      try {
        return await this.khachhangService.getLastUpdated();
      } catch (error) {
        throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }
  @Post()
  @Audit({entity: 'Create Khachhang', action: AuditAction.CREATE, includeResponse: true})
  create(@Body() createKhachhangDto: any) {
    return this.khachhangService.create(createKhachhangDto);
  }
  @Post('import')
  @Audit({entity: 'Import Khachhang',action: AuditAction.CREATE,includeResponse: true})
  import(@Body() data: any) {
    return this.khachhangService.import(data);
  }
  @Post('findby')
  async findby(@Body() param: any) {
    const result = await this.khachhangService.findby(param);
    return result;
  }
  @Post('searchfield')
  async searchfield(@Body() searchParams: Record<string, any>) {
    return this.khachhangService.searchfield(searchParams);
  }
  // @Get()
  // findAll() {
  //   return this.khachhangService.findAll();
  // }
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.khachhangService.findAll(query);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch khachhangs',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.khachhangService.findOne(id);
  }
  @Patch(':id')
  @Audit({entity: 'Update Khachhang', action: AuditAction.UPDATE, includeResponse: true})
  update(@Param('id') id: string, @Body() updateKhachhangDto: any) {
    return this.khachhangService.update(id, updateKhachhangDto);
  }

  @Delete(':id')
  @Audit({entity: 'Delete Khachhang', action: AuditAction.DELETE, includeResponse: true})
  remove(@Param('id') id: string) {
    return this.khachhangService.remove(id);
  }
}
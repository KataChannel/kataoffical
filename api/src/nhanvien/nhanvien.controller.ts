import { Controller, Get, Post, Body, Param, Patch, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { NhanvienService } from './nhanvien.service';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
import { Cache, CacheInvalidate } from '../common/cache.interceptor';
import { SmartCache } from '../common/smart-cache.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('nhanvien')
export class NhanvienController {
  constructor(private readonly nhanvienService: NhanvienService) {}

  @Get('lastupdated')
  @Cache(300, 'nhanvien') // Cache for 5 minutes
  async getLastUpdated() {
    try {
      return await this.nhanvienService.getLastUpdated();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @Audit({entity: 'Create Nhanvien', action: AuditAction.CREATE, includeResponse: true})
  @SmartCache({
    invalidate: ['nhanvien'],
    get: { ttl: 1800, keyPrefix: 'nhanvien' },
    updateCache: true
  })
  create(@Body() createNhanvienDto: any) {
    return this.nhanvienService.create(createNhanvienDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('import')
  @Audit({entity: 'Import Nhanvien', action: AuditAction.IMPORT, includeResponse: true})
  @CacheInvalidate(['nhanvien'])
  import(@Body() data: any) {
    return this.nhanvienService.import(data);
  }

  @Post('searchfield')
  async searchfield(@Body() searchParams: Record<string, any>) {
    return this.nhanvienService.searchfield(searchParams);
  }

  @Get('forselect')
  @Cache(1800, 'nhanvien') // Cache for 30 minutes
  async findAllForSelect() {
    try {
      return await this.nhanvienService.findAllForSelect();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch nhanviens',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }

  @Get()
  @Cache(1800, 'nhanvien') // Cache for 30 minutes
  async findAll(@Query() query: any) {
    try {
      return await this.nhanvienService.findAll(query);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch nhanviens',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }

  @Get(':id')
  @Cache(1800, 'nhanvien') // Cache for 30 minutes
  findOne(@Param('id') id: string) {
    return this.nhanvienService.findOne(id);
  }

  @Get('manv/:manv')
  @Cache(1800, 'nhanvien') // Cache for 30 minutes
  findByManv(@Param('manv') manv: string) {
    return this.nhanvienService.findByManv(manv);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Audit({entity: 'Update Nhanvien', action: AuditAction.UPDATE, includeResponse: true})
  @SmartCache({
    invalidate: ['nhanvien'],
    get: { ttl: 1800, keyPrefix: 'nhanvien' },
    updateCache: true
  })
  update(@Param('id') id: string, @Body() updateNhanvienDto: any) {
    return this.nhanvienService.update(id, updateNhanvienDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Audit({entity: 'Delete Nhanvien', action: AuditAction.DELETE, includeResponse: true})
  @CacheInvalidate(['nhanvien'])
  remove(@Param('id') id: string) {
    return this.nhanvienService.remove(id);
  }
}

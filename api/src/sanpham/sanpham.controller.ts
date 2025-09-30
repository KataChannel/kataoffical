import { Controller, Get, Post, Body, Param, Patch, Delete, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
import { Cache, CacheInvalidate } from '../common/cache.interceptor';
import { SmartCache } from '../common/smart-cache.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sanpham')
export class SanphamController {
  constructor(private readonly sanphamService: SanphamService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Create Sanpham', action: AuditAction.CREATE, includeResponse: true})
  @SmartCache({
    invalidate: ['sanpham'],
    get: { ttl: 1800, keyPrefix: 'sanpham' },
    updateCache: true
  })
  create(@Body() createSanphamDto: any) {
    return this.sanphamService.create(createSanphamDto);
  }

  @Post('import')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Import Sanpham', action: AuditAction.CREATE, includeResponse: true})
  @CacheInvalidate(['sanpham'])
  import(@Body() data: any) {
    return this.sanphamService.import(data);
  }

  @Post('banggiamacdinh')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Bang Gia Mac Dinh', action: AuditAction.CREATE, includeResponse: true})
  @CacheInvalidate(['sanpham', 'banggia'])
  banggiamacdinh(@Body() data: any) {
    return this.sanphamService.banggiamacdinh(data);
  }
  @Post('findby')
  async findby(@Body() param: any) {
    const result = await this.sanphamService.findby(param);
    return result;
  }
  @Get()
  @Cache(1800, 'sanpham') // Cache for 30 minutes
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

    @Get('forselect')
    @Cache(3600, 'sanpham') // Cache for 1 hour
    async findAllForSelect() {
      try {
        return await this.sanphamService.findAllForSelect();
      } catch (error) {
        throw new HttpException(
          error.message || 'Failed to fetch sanphams',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } 
    }  
  @Get('nhucaudathang')
  @Cache(3600, 'sanpham') // Cache for 1 hour
  nhucaudathang() {
    return this.sanphamService.nhucaudathang();
  }

  @Get('lastupdated')
  @Cache(300, 'sanpham') // Cache for 5 minutes
  async getLastUpdated() {
    try {
      return await this.sanphamService.getLastUpdated();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
 }

  @Get('findid/:id')
  @Cache(1800, 'sanpham') // Cache for 30 minutes
  findOne(@Param('id') id: string) {
    return this.sanphamService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Update Sanpham', action: AuditAction.UPDATE, includeResponse: true})
  @SmartCache({
    invalidate: ['sanpham'],
    get: { ttl: 1800, keyPrefix: 'sanpham' },
    updateCache: true
  })
  update(@Param('id') id: string, @Body() updateSanphamDto: any) {
    return this.sanphamService.update(id, updateSanphamDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Audit({entity: 'Delete Sanpham', action: AuditAction.DELETE, includeResponse: true})
  @CacheInvalidate(['sanpham'])
  remove(@Param('id') id: string) {
    return this.sanphamService.remove(id);
  }

  @Post('reorder')
  @CacheInvalidate(['sanpham:*'])
  reorder(@Body() body: { sanphamIds: string[] }) {
    return this.sanphamService.reorderSanphams(body.sanphamIds);
  }
}
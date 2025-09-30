import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { khoService } from './kho.service';
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';
import { Cache, CacheInvalidate } from '../common/cache.interceptor';
import { SmartCache } from '../common/smart-cache.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('kho')
export class khoController {
  constructor(private readonly khoService: khoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Audit({entity: 'Create Kho', action: AuditAction.CREATE, includeResponse: true})
  @SmartCache({
    invalidate: ['kho'],
    get: { ttl: 1800, keyPrefix: 'kho' },
    updateCache: true
  })
  create(@Body() createkhoDto: any) {
    return this.khoService.create(createkhoDto);
  }
  
  @Get('tonkho')
  @Cache(600, 'kho:tonkho')
  getPaginated(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.khoService.gettonkho(pageNumber, limitNumber);
  }
  
  @Get()
  @Cache(1800, 'kho')
  findAll() {
    return this.khoService.findAll();
  }

  @Get('findid/:id')
  @Cache(1800, 'kho')
  findOne(@Param('id') id: string) {
    return this.khoService.findOne(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Audit({entity: 'Update Kho', action: AuditAction.UPDATE, includeResponse: true})
  @SmartCache({
    invalidate: ['kho'],
    get: { ttl: 1800, keyPrefix: 'kho' },
    updateCache: true
  })
  update(@Param('id') id: string, @Body() updatekhoDto: any) {
    return this.khoService.update(id, updatekhoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Audit({entity: 'Delete Kho', action: AuditAction.DELETE, includeResponse: true})
  @CacheInvalidate(['kho'])
  remove(@Param('id') id: string) {
    return this.khoService.remove(id);
  }
}
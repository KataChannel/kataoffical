import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ChotkhoService } from './chotkho.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
import { Cache, CacheInvalidate } from '../common/cache.interceptor';
import { SmartCache } from '../common/smart-cache.decorator';

@ApiTags('chotkho') 
@Controller('chotkho') 
export class ChotkhoController { 
  constructor(private readonly chotkhoService: ChotkhoService) {} 

  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create new inventory check - New Logic: Process all products in warehouse' }) 
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        khoId: { type: 'string', description: 'Warehouse ID' },
        products: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              sanphamId: { type: 'string' },
              sltonthucte: { type: 'number' },
              slhuy: { type: 'number' },
              ghichu: { type: 'string' }
            }
          }
        }
      }
    }
  }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  @Audit({ entity: 'Chotkho', action: AuditAction.CREATE, includeResponse: true })
  @SmartCache({
    invalidate: ['chotkho'],
    get: { ttl: 600, keyPrefix: 'chotkho' },
    updateCache: true
  })
  async create(@Body() data: any) { 
    try {
      return await this.chotkhoService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create inventory check failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get all products with inventory by warehouse' })
  @ApiParam({ name: 'khoId', type: String, description: 'Warehouse ID' })
  @Get('products/by-warehouse/:khoId')
  @Cache(300, 'chotkho:products')
  async getAllProductsByKho(@Param('khoId') khoId: string) {
    try {
      return await this.chotkhoService.getAllProductsByKho(khoId);
    } catch (error) {
      throw new HttpException(error.message || 'Get products failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find chotkho by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get(':id')
  @Cache(600, 'chotkho')
  async findOne(@Param('id') id: string) {
    try {
      return await this.chotkhoService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get all chotkho records' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get()
  @Cache(300, 'chotkho')
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ) {
    try {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      return await this.chotkhoService.findAll(pageNum, limitNum);
    } catch (error) {
      throw new HttpException(error.message || 'Find all failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update chotkho by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard) 
  @Patch(':id')
  @Audit({ entity: 'Chotkho', action: AuditAction.UPDATE, includeResponse: true })
  @SmartCache({
    invalidate: ['chotkho'],
    get: { ttl: 600, keyPrefix: 'chotkho' },
    updateCache: true
  })
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.chotkhoService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete chotkho by ID' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  @Audit({ entity: 'Chotkho', action: AuditAction.DELETE, includeResponse: true })
  @CacheInvalidate(['chotkho'])
  async remove(@Param('id') id: string) {
    try {
      return await this.chotkhoService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
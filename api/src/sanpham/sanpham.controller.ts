import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { SanphamService } from './sanpham.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
@ApiTags('sanpham') 
@Controller('sanpham') 
export class SanphamController { 
  constructor(private readonly sanphamService: SanphamService) {} 

  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Import Sanpham' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post('import')
  @Audit({entity: 'Import Sanpham', action: AuditAction.CREATE, includeResponse: true})
  import(@Body() data: any) {
    return this.sanphamService.import(data);
  }

  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new sanpham' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  @Audit({ entity: 'Sanpham', action: AuditAction.CREATE, includeResponse: true })
  async create(@Body() data: any) { 
    try {
      return await this.sanphamService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find sanphams by parameters' })
  @ApiBody({ type: Object }) 
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.sanphamService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({ summary: 'Get all sanphams with pagination' })
  @ApiResponse({ status: 200, description: 'List of sanphams with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.sanphamService.findAll(query);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch sanphams',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }
  
  @ApiOperation({ summary: 'Get last updated sanpham' })
  @Get('lastupdated') 
  async getLastUpdatedSanpham() { 
    try {
      return await this.sanphamService.getLastUpdatedSanpham();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find sanpham by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.sanphamService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a sanpham' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Audit({ entity: 'Sanpham', action: AuditAction.UPDATE, includeResponse: true })
  async update(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.sanphamService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a sanpham' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Audit({ entity: 'Sanpham', action: AuditAction.DELETE })
  async remove(@Param('id') id: string) {
    try {
      return await this.sanphamService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Reorder sanphams' })
  @ApiBody({
    schema: { 
      properties: {
        sanphamIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') 
  async reorder(@Body() body: { sanphamIds: string[] }) { 
    try {
      return await this.sanphamService.reorderSanphams(body.sanphamIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

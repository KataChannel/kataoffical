import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { NhacungcapService } from './nhacungcap.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
@ApiTags('nhacungcap') 
@Controller('nhacungcap') 
export class NhacungcapController { 
  constructor(private readonly nhacungcapService: NhacungcapService) {} 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new nhacungcap' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  @Audit({ entity: 'Nhacungcap', action: AuditAction.CREATE, includeResponse: true })
  async create(@Body() data: any) { 
    try {
      return await this.nhacungcapService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find nhacungcaps by parameters' })
  @ApiBody({ type: Object }) 
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.nhacungcapService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Get all nhacungcaps with pagination' })
  @ApiResponse({ status: 200, description: 'List of nhacungcaps with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.nhacungcapService.findAll(query);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch nhacungcaps',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }
  @ApiOperation({ summary: 'Get last updated nhacungcap' })
  @Get('lastupdated') 
  async getLastUpdatedNhacungcap() { 
    try {
      return await this.nhacungcapService.getLastUpdatedNhacungcap();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find nhacungcap by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.nhacungcapService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a nhacungcap' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Audit({ entity: 'Nhacungcap', action: AuditAction.UPDATE, includeResponse: true })
  async update(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.nhacungcapService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a nhacungcap' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Audit({ entity: 'Nhacungcap', action: AuditAction.DELETE })
  async remove(@Param('id') id: string) {
    try {
      return await this.nhacungcapService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Reorder nhacungcaps' })
  @ApiBody({
    schema: { 
      properties: {
        nhacungcapIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') 
  async reorder(@Body() body: { nhacungcapIds: string[] }) { 
    try {
      return await this.nhacungcapService.reorderNhacungcaps(body.nhacungcapIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

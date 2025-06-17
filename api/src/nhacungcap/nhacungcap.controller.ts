import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpException, Query, UseGuards } from '@nestjs/common';
import { NhacungcapService } from './nhacungcap.service';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('nhacungcap')
export class NhacungcapController {
  constructor(private readonly nhacungcapService: NhacungcapService) {}

  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new nhacungcap' }) 
  @ApiBody({ type: Object }) 
  @Post()
  @Audit({ entity: 'Nhacungcap', action: AuditAction.CREATE, includeResponse: true })
  async create(@Body() data: any) { 
    try {
      return await this.nhacungcapService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
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
  @Post('import')
  import(@Body() data: any) {
    return this.nhacungcapService.import(data);
  }
  @Post('finbyids')
  async findByProductIds(@Body() productIds: any) {
    try {
      const result = await this.nhacungcapService.findByProductIds(productIds);
      return {
        statusCode: HttpStatus.OK,
        message: 'Nhà cung cấp(s) fetched successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch nhà cung cấp(s)',
        error: error.message || error,
      };
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

  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.nhacungcapService.findOne(id);
      if (!result) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Nhà cung cấp not found',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Nhà cung cấp fetched successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch nhà cung cấp',
        error: error.message || error,
      };
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
  @Patch(':id')
  @Audit({entity: 'Update Nhacungcap', action: AuditAction.UPDATE, includeResponse: true})
  async update(@Param('id') id: string, @Body() updateNhacungcapDto: any) {
    try {
      const result = await this.nhacungcapService.update(id, updateNhacungcapDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Nhà cung cấp updated successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to update nhà cung cấp',
        error: error.message || error,
      };
    }
  }

  @Delete(':id')
  @Audit({entity: 'Delete Nhacungcap', action: AuditAction.DELETE, includeResponse: true})
  async remove(@Param('id') id: string) {
    try {
      const result = await this.nhacungcapService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Nhà cung cấp deleted successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to delete nhà cung cấp',
        error: error.message || error,
      };
    }
  }
  
}
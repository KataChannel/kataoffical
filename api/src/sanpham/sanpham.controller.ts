// sanpham.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';
import { Audit } from 'src/shared/decorators/audit.decorator';
import { AuditAction } from '@prisma/client';
import { User } from 'src/shared/decorators/createdby.decorator';
@ApiTags('sanpham')
@Controller('sanpham')
export class SanphamController {
  constructor(private readonly sanphamService: SanphamService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Import Sanpham' })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Audit({ entity: 'Sanpham', action: AuditAction.CREATE, includeResponse: true })
  @Post('import')
  async import(
    @Body() data: any,
    @User() user: any,
  ) {
    try {
      const result:any = await this.sanphamService.import(data,user);
      let entityId = 'N/A';
      if (result && result.id) {
        entityId = result.id;
      } else if (result && Array.isArray(result.results) && result.results.length > 0 && result.results[0].codeId) {
        entityId = result.results[0].codeId;
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message || 'Import failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Sanpham' })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Post()
  @Audit({ entity: 'Sanpham', action: AuditAction.CREATE, includeResponse: true }) 
  async create(
    @Body() data: any,
    @User() user: any,
  ) {
    try {
      const result = await this.sanphamService.create(data,user);
      return result;
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
  @ApiOperation({ summary: 'Update Sanpham by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Sanpham ID' })
  @ApiBody({ description: 'Update data for Sanpham' })
  @UseGuards(JwtAuthGuard)
  @Audit({ entity: 'Sanpham',action: AuditAction.UPDATE, includeResponse: true})
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    try {
      // Check if entity exists
      const existingEntity = await this.sanphamService.findOne(id);
      if (!existingEntity) {
        throw new HttpException('Sanpham not found', HttpStatus.NOT_FOUND);
      }

      const result = await this.sanphamService.update(id, data);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Update failed', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Sanpham by ID' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Audit({ entity: 'Sanpham', action: AuditAction.DELETE, includeResponse: true })
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    try {
      const result = await this.sanphamService.remove(id);
      return result;
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
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // Giả sử đường dẫn này là cố định
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Post()
  @Audit({
    entity: 'Permission',
    action: AuditAction.CREATE,
    includeResponse: true,
  })
  async create(@Body() data: any) {
    try {
      return await this.permissionService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find permissions by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.permissionService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Get all permissions with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page (default: 10)' })
  @ApiResponse({ status: 200, description: 'List of permissions with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    try {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      // Kiểm tra giá trị hợp lệ
      if (isNaN(pageNum) || pageNum < 1) {
        throw new HttpException('Page must be a positive integer', HttpStatus.BAD_REQUEST);
      }
      if (isNaN(limitNum) || limitNum < 1) {
        throw new HttpException('Limit must be a positive integer', HttpStatus.BAD_REQUEST);
      }

      return await this.permissionService.findAll(pageNum, limitNum);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch permissions',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Get last updated permission' })
  @Get('lastupdated')
  async getLastUpdatedPermission() {
    try {
      return await this.permissionService.getLastUpdatedPermission();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find permission by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.permissionService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a permission' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Audit({
    entity: 'Permission',
    action: AuditAction.UPDATE,
    includeResponse: true,
  })
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.permissionService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a permission' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Audit({
    entity: 'Permission',
    action: AuditAction.DELETE,
    includeResponse: true,
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.permissionService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Reorder permissions' })
  @ApiBody({
    schema: {
      properties: {
        permissionIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder')
  async reorder(@Body() body: { permissionIds: string[] }) {
    try {
      return await this.permissionService.reorderPermissions(body.permissionIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update code IDs of permissions' })
  @ApiBody({
    schema: {
      properties: {
        permissionIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get('updateCodeIds')
  async updateCodeIds() {
    try {
      return await this.permissionService.updateCodeIds();
    } catch (error) {
      throw new HttpException(error.message || 'Update code IDs failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
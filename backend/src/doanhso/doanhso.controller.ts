import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { DoanhsoService } from './doanhso.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
@ApiTags('doanhso') 
@Controller('doanhso') 
export class DoanhsoController { 
  constructor(private readonly doanhsoService: DoanhsoService) {} 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new doanhso' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() data: any) { 
    try {
      return await this.doanhsoService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find courses by parameters' })
  @ApiBody({ type: Object }) 
  @Post('syncsdoanhso')
  async syncsdoanhso(@Body() param: any) {
    try {
      return await this.doanhsoService.syncsdoanhso(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({ summary: 'Find doanhsos by parameters' })
  @ApiBody({ type: Object }) 
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.doanhsoService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Get all doanhsos with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page (default: 10)' })
  @ApiResponse({ status: 200, description: 'List of doanhsos with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(
    @Query('page') page: string = '1', 
    @Query('limit') limit: string = '10', 
  ) {
    try {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      if (isNaN(pageNum) || pageNum < 1) {
        throw new HttpException('Page must be a positive integer', HttpStatus.BAD_REQUEST);
      }
      if (isNaN(limitNum) || limitNum < 1) {
        throw new HttpException('Limit must be a positive integer', HttpStatus.BAD_REQUEST);
      }
      return await this.doanhsoService.findAll(pageNum, limitNum);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch doanhsos',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @ApiOperation({ summary: 'Get last updated doanhso' })
  @Get('lastupdated') 
  async getLastUpdatedDoanhso() { 
    try {
      return await this.doanhsoService.getLastUpdatedDoanhso();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find doanhso by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.doanhsoService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a doanhso' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.doanhsoService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a doanhso' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.doanhsoService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Reorder doanhsos' })
  @ApiBody({
    schema: { 
      properties: {
        doanhsoIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') 
  async reorder(@Body() body: { doanhsoIds: string[] }) { 
    try {
      return await this.doanhsoService.reorderDoanhsos(body.doanhsoIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

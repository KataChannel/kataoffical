import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { KhoahocService } from './khoahoc.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
@ApiTags('khoahoc') 
@Controller('khoahoc') 
export class KhoahocController { 
  constructor(private readonly khoahocService: KhoahocService) {} 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new khoahoc' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() data: any) { 
    try {
      return await this.khoahocService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    @ApiOperation({ summary: 'Get total hoahong by userId' })
    @ApiQuery({ name: 'userId', type: String, required: true })
    @Get('total')
    async getTotalHoahongByUserId(@Query('userId') userId: string) {
      try {
        return await this.khoahocService.getTotalKhoahocByUserId(userId);
      } catch (error) {
        throw new HttpException(
          error.message || 'Failed to fetch total khoahoc',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

  @ApiOperation({ summary: 'Find courses by parameters' })
  @ApiBody({ type: Object }) 
  @Post('syncskhoahoc')
  async syncslichhen(@Body() param: any) {
    try {
      return await this.khoahocService.syncskhoahoc(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find khoahocs by parameters' })
  @ApiBody({ type: Object }) 
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.khoahocService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Get all khoahocs with pagination' })
  @ApiResponse({ status: 200, description: 'List of khoahocs with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.khoahocService.findAll(query);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch khoahocs',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }
  @ApiOperation({ summary: 'Get last updated khoahoc' })
  @Get('lastupdated') 
  async getLastUpdatedKhoahoc() { 
    try {
      return await this.khoahocService.getLastUpdatedKhoahoc();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find khoahoc by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.khoahocService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a khoahoc' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.khoahocService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a khoahoc' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.khoahocService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Reorder khoahocs' })
  @ApiBody({
    schema: { 
      properties: {
        khoahocIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') 
  async reorder(@Body() body: { khoahocIds: string[] }) { 
    try {
      return await this.khoahocService.reorderKhoahocs(body.khoahocIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

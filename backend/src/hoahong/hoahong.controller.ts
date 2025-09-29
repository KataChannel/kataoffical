import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { HoahongService } from './hoahong.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
@ApiTags('hoahong') 
@Controller('hoahong') 
export class HoahongController { 
  constructor(private readonly hoahongService: HoahongService) {} 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new hoahong' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() data: any) { 
    try {
      return await this.hoahongService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find hoahongs by parameters' })
  @ApiBody({ type: Object }) 
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.hoahongService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Get all hoahongs with pagination' })
  @ApiResponse({ status: 200, description: 'List of hoahongs with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.hoahongService.findAll(query);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch hoahongs',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }
  
  @ApiOperation({ summary: 'Get total hoahong by userId' })
  @ApiQuery({ name: 'userId', type: String, required: true })
  @Get('total')
  async getTotalHoahongByUserId(@Query('userId') userId: string) {
    try {
      return await this.hoahongService.getTotalHoahongByUserId(userId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch total hoahong',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  @ApiOperation({ summary: 'Get last updated hoahong' })
  @Get('lastupdated') 
  async getLastUpdatedHoahong() { 
    try {
      return await this.hoahongService.getLastUpdatedHoahong();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find hoahong by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.hoahongService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a hoahong' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.hoahongService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a hoahong' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.hoahongService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Reorder hoahongs' })
  @ApiBody({
    schema: { 
      properties: {
        hoahongIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') 
  async reorder(@Body() body: { hoahongIds: string[] }) { 
    try {
      return await this.hoahongService.reorderHoahongs(body.hoahongIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

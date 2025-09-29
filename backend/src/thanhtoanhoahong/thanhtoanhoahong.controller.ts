import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ThanhtoanhoahongService } from './thanhtoanhoahong.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
@ApiTags('thanhtoanhoahong') 
@Controller('thanhtoanhoahong') 
export class ThanhtoanhoahongController { 
  constructor(private readonly thanhtoanhoahongService: ThanhtoanhoahongService) {} 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new thanhtoanhoahong' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() data: any) { 
    try {
      return await this.thanhtoanhoahongService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find thanhtoanhoahongs by parameters' })
  @ApiBody({ type: Object }) 
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.thanhtoanhoahongService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Get all thanhtoanhoahongs with pagination' })
  @ApiResponse({ status: 200, description: 'List of thanhtoanhoahongs with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.thanhtoanhoahongService.findAll(query);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch thanhtoanhoahongs',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }


  @ApiOperation({ summary: 'Get total thanhtoanhoahong by userId' })
  @ApiQuery({ name: 'userId', type: String, required: true })
  @Get('total')
  async getTotalThanhtoanhoahongByUserId(@Query('userId') userId: string) {
    try {
      return await this.thanhtoanhoahongService.getTotalThanhtoanhoahongByUserId(userId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch total thanhtoanhoahong',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }




  @ApiOperation({ summary: 'Get last updated thanhtoanhoahong' })
  @Get('lastupdated') 
  async getLastUpdatedThanhtoanhoahong() { 
    try {
      return await this.thanhtoanhoahongService.getLastUpdatedThanhtoanhoahong();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find thanhtoanhoahong by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.thanhtoanhoahongService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a thanhtoanhoahong' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.thanhtoanhoahongService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a thanhtoanhoahong' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.thanhtoanhoahongService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Reorder thanhtoanhoahongs' })
  @ApiBody({
    schema: { 
      properties: {
        thanhtoanhoahongIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') 
  async reorder(@Body() body: { thanhtoanhoahongIds: string[] }) { 
    try {
      return await this.thanhtoanhoahongService.reorderThanhtoanhoahongs(body.thanhtoanhoahongIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

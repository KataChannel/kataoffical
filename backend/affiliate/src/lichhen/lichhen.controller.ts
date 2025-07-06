import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { LichhenService } from './lichhen.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
@ApiTags('lichhen') 
@Controller('lichhen') 
export class LichhenController { 
  constructor(private readonly lichhenService: LichhenService) {} 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new lichhen' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() data: any) { 
    try {
      return await this.lichhenService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    @ApiOperation({ summary: 'Get total hoahong by userId' })
    @ApiQuery({ name: 'userId', type: String, required: true })
    @Get('total')
    async getTotalLichhenByUserId(@Query('userId') userId: string) {
      try {
        return await this.lichhenService.getTotalLichhenByUserId(userId);
      } catch (error) {
        throw new HttpException(
          error.message || 'Failed to fetch total lichhen',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

  @ApiOperation({ summary: 'Find lichhens by parameters' })
  @ApiBody({ type: Object }) 
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.lichhenService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Get all lichhens with pagination' })
  @ApiResponse({ status: 200, description: 'List of lichhens with pagination info' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.lichhenService.findAll(query);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch lichhens',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
  }
  @ApiOperation({ summary: 'Get last updated lichhen' })
  @Get('lastupdated') 
  async getLastUpdatedLichhen() { 
    try {
      return await this.lichhenService.getLastUpdatedLichhen();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find courses by parameters' })
  @ApiBody({ type: Object }) 
  @Post('syncslichhen')
  async syncslichhen(@Body() param: any) {
    try {      
      return await this.lichhenService.syncslichhen(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find lichhen by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.lichhenService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a lichhen' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.lichhenService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a lichhen' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.lichhenService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Reorder lichhens' })
  @ApiBody({
    schema: { 
      properties: {
        lichhenIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') 
  async reorder(@Body() body: { lichhenIds: string[] }) { 
    try {
      return await this.lichhenService.reorderLichhens(body.lichhenIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query, Res, StreamableFile } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard'; 
import { HoadonchitietService } from './hoadonchitiet.service';
import { Response } from 'express';
@Controller('hoadonchitiet') 
export class HoadonchitietController { 
  constructor(private readonly hoadonchitietService: HoadonchitietService) {} 
  // @Get('download')
  // async downloadExcel(@Res() res: Response) {
  //   const buffer = await this.hoadonchitietService.generateExcel();
  //   if (!buffer) {
  //     throw new HttpException('No data to download', HttpStatus.NOT_FOUND);
  //   }
  //   res.set({
  //     'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //     'Content-Disposition': 'attachment; filename="data.xlsx"',
  //     'Content-Length': buffer.length,
  //   });
  //   res.send(buffer);
  // }  

  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new hoadonchitiet' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post()
  async create(@Body() data: any) { 
    try {
      return await this.hoadonchitietService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({ summary: 'Find hoadonchitiets by parameters' })
  @ApiBody({ type: Object })
  @Post('xuatnhapton')
  async xuatnhapton(@Body() param: any, @Res({ passthrough: true }) res: Response) {
    console.log('param', param);
    
    try {
      if (param.isDownload === true) {
        const dulieu = await this.hoadonchitietService.xuatnhapton(param);
        const buffer = await this.hoadonchitietService.generateExcel(dulieu.data);
        const stream = require('stream');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        
        return new StreamableFile(bufferStream, {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          disposition: 'attachment; filename="xuatnhapton.xlsx"',
        });
      } else {
        const result = await this.hoadonchitietService.xuatnhapton(param);
        return result;
      }
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find hoadonchitiets by parameters' })
  @ApiBody({ type: Object }) 
  @Post('mathang')
  async mathang(@Body() param: any) {
    try {
      return await this.hoadonchitietService.mathang(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find hoadonchitiets by parameters' })
  @ApiBody({ type: Object }) 
  @Post('findby')
  async findby(@Body() param: any) {
    try {
      return await this.hoadonchitietService.findBy(param);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Get all hoadonchitiets with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page (default: 10)' })
  @ApiResponse({ status: 200, description: 'List of hoadonchitiets with pagination info' })
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
      return await this.hoadonchitietService.findAll(pageNum, limitNum);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch hoadonchitiets',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Get last updated hoadonchitiet' })
  @Get('lastupdated') 
  async getLastUpdatedHoadonchitiet() { 
    try {
      return await this.hoadonchitietService.getLastUpdatedhoadonChitiet();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Find hoadonchitiet by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.hoadonchitietService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a hoadonchitiet' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.hoadonchitietService.update(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a hoadonchitiet' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard)
  @Patch('mathang/:id')
  async updatemathang(@Param('id') id: string, @Body() data: any) { 
    try {
      return await this.hoadonchitietService.updateMathang(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a hoadonchitiet' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.hoadonchitietService.remove(id);
    } catch (error) {
      throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Reorder hoadonchitiets' })
  @ApiBody({
    schema: { 
      properties: {
        hoadonchitietIds: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  @Post('reorder') 
  async reorder(@Body() body: { hoadonchitietIds: string[] }) { 
    try {
      return await this.hoadonchitietService.reorderhoadonChitiets(body.hoadonchitietIds);
    } catch (error) {
      throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

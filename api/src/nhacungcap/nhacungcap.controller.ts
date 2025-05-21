import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { NhacungcapService } from './nhacungcap.service';

@Controller('nhacungcap')
export class NhacungcapController {
  constructor(private readonly nhacungcapService: NhacungcapService) {}

  @Post()
  async create(@Body() createNhacungcapDto: any) {
    try {
      const result = await this.nhacungcapService.create(createNhacungcapDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Nhà cung cấp created successfully',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create nhà cung cấp',
        error: error.message || error,
      };
    }
  }
  @Post('import')
  import(@Body() data: any) {
    console.log(data);
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

  @Get()
  async findAll() {
    try {
      const result = await this.nhacungcapService.findAll();
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

  @Patch(':id')
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
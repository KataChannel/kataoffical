import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ChotkhoService } from './chotkho.service'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';

@ApiTags('chotkho') 
@Controller('chotkho') 
export class ChotkhoController { 
  constructor(private readonly chotkhoService: ChotkhoService) {} 

  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Create a new chotkho' }) 
  @ApiBody({ type: Object }) 
  @UseGuards(JwtAuthGuard) 
  @Post('create')
  @Audit({ entity: 'Chotkho', action: AuditAction.CREATE, includeResponse: true })
  async create(@Body() data: any) { 
    try {
      return await this.chotkhoService.create(data);
    } catch (error) {
      throw new HttpException(error.message || 'Create failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Find chotkho by ID' })
  @ApiParam({ name: 'id', type: String }) 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.chotkhoService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get all chotkho records' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'khoId', required: false, type: String })
  @Get()
  async findAll(@Query() query: any) {
    try {
      return await this.chotkhoService.findAll(query);
    } catch (error) {
      throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 🎯 NEW ENDPOINTS: Workflow chốt kho

  @ApiOperation({ summary: 'Get TonKho with pending order information' })
  @ApiQuery({ name: 'khoId', required: false, type: String })
  @Get('tonkho-pending')
  async getTonkhoWithPendingQuantities(@Query('khoId') khoId?: string) {
    try {
      return await this.chotkhoService.getTonkhoWithPendingQuantities(khoId);
    } catch (error) {
      throw new HttpException(error.message || 'Get tonkho failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Create chotkho details from Excel data' })
  @ApiBody({ type: Object })
  @Post(':id/details')
  async createChotkhoDetails(
    @Param('id') chotkhoId: string,
    @Body() data: { excelData: any[] }
  ) {
    try {
      return await this.chotkhoService.createChotkhoDetails(chotkhoId, data.excelData);
    } catch (error) {
      throw new HttpException(error.message || 'Create details failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Update TonKho after closing inventory' })
  @Patch(':id/close')
  async updateTonkhoAfterClose(@Param('id') chotkhoId: string) {
    try {
      return await this.chotkhoService.updateTonkhoAfterClose(chotkhoId);
    } catch (error) {
      throw new HttpException(error.message || 'Close inventory failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Complete chotkho workflow - close with phieukho creation' })
  @Post(':id/complete')
  async completeChotkhoWorkflow(@Param('id') chotkhoId: string) {
    try {
      const result = await this.chotkhoService.updateTonkhoAfterClose(chotkhoId);
      
      if (result.success) {
        return {
          success: true,
          message: 'Chốt kho hoàn tất với phiếu kho điều chỉnh',
          data: result
        };
      } else {
        throw new HttpException(result.message || 'Chốt kho thất bại', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message || 'Complete chotkho failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Get last updated chotkho timestamp' })
  @Get('last-updated')
  async getLastUpdatedChotkho() {
    try {
      return await this.chotkhoService.getLastUpdatedChotkho();
    } catch (error) {
      throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
//   ) {
//     try {
//       const pageNum = parseInt(page, 10);
//       const limitNum = parseInt(limit, 10);
//       return await this.chotkhoService.findByDateRange(startDate, endDate, pageNum, limitNum);
//     } catch (error) {
//       throw new HttpException(error.message || 'Failed to fetch chotkho by date range', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }


//   @ApiOperation({ summary: 'Find chotkhos by parameters' })
//   @ApiBody({ type: Object }) 
//   @Post('tonkhobylist')
//   async tonkhobylist(@Body() param: any) {
//     try {
//       return await this.chotkhoService.tonkhobylist(param);
//     } catch (error) {
//       throw new HttpException(error.message || 'Find failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiOperation({ summary: 'Get all chotkhos with pagination' })
//   @ApiResponse({ status: 200, description: 'List of chotkhos with pagination info' })
//   @ApiResponse({ status: 500, description: 'Internal server error' })
//   @Get()
//   async findAll(@Query() query: any) {
//     try {
//       return await this.chotkhoService.findAll(query);
//     } catch (error) {
//       throw new HttpException(
//         error.message || 'Failed to fetch chotkhos',
//         error.status || HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     } 
//   }

//   @ApiOperation({ summary: 'Get last updated chotkho' })
//   @Get('lastupdated') 
//   async getLastUpdatedChotkho() { 
//     try {
//       return await this.chotkhoService.getLastUpdatedChotkho();
//     } catch (error) {
//       throw new HttpException(error.message || 'Get last updated failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiOperation({ summary: 'Find chotkho by ID' })
//   @ApiParam({ name: 'id', type: String }) 
//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     try {
//       return await this.chotkhoService.findOne(id);
//     } catch (error) {
//       throw new HttpException(error.message || 'Find one failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Update a chotkho' })
//   @ApiParam({ name: 'id', type: String })
//   @ApiBody({ type: Object }) 
//   @UseGuards(JwtAuthGuard)
//   @Patch('update/:id')
//   @Audit({ entity: 'Chotkho', action: AuditAction.UPDATE, includeResponse: true })
//   async update(@Param('id') id: string, @Body() data: any) { 
//     try {
//       return await this.chotkhoService.update(id, data);
//     } catch (error) {
//       throw new HttpException(error.message || 'Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Delete a chotkho' })
//   @ApiParam({ name: 'id', type: String })
//   @UseGuards(JwtAuthGuard)
//   @Delete('delete/:id')
//   @Audit({ entity: 'Chotkho', action: AuditAction.DELETE })
//   async remove(@Param('id') id: string) {
//     try {
//       return await this.chotkhoService.remove(id);
//     } catch (error) {
//       throw new HttpException(error.message || 'Delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Bulk delete chotkho records' })
//   @ApiBody({ 
//     type: Object,
//     description: 'Array of chotkho IDs to delete',
//     schema: {
//       properties: {
//         ids: { type: 'array', items: { type: 'string' } }
//       }
//     }
//   })
//   @UseGuards(JwtAuthGuard)
//   @Delete('bulk-delete')
//   @Audit({ entity: 'Chotkho', action: AuditAction.DELETE, includeResponse: true })
//   async bulkDelete(@Body() data: { ids: string[] }) {
//     try {
//       return await this.chotkhoService.bulkDelete(data.ids);
//     } catch (error) {
//       throw new HttpException(error.message || 'Bulk delete failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   // NEW ENDPOINTS BELOW

//   @ApiOperation({ summary: 'Get chotkho records by kho ID' })
//   @ApiParam({ name: 'khoId', type: String, description: 'ID of the kho (warehouse)' })
//   @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
//   @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
//   @ApiResponse({ status: 200, description: 'List of chotkho records for the specified kho' })
//   @Get('bykho/:khoId')
//   async findByKho(
//     @Param('khoId') khoId: string,
//     @Query('page') page: string = '1',
//     @Query('limit') limit: string = '20'
//   ) {
//     try {
//       const pageNum = parseInt(page, 10);
//       const limitNum = parseInt(limit, 10);
//       return await this.chotkhoService.findByKho(khoId, pageNum, limitNum);
//     } catch (error) {
//       throw new HttpException(error.message || 'Failed to fetch chotkho by kho', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiOperation({ summary: 'Get chotkho records by sanpham ID' })
//   @ApiParam({ name: 'sanphamId', type: String, description: 'ID of the sanpham (product)' })
//   @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
//   @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
//   @ApiResponse({ status: 200, description: 'List of chotkho records for the specified sanpham' })
//   @Get('bysanpham/:sanphamId')
//   async findBySanpham(
//     @Param('sanphamId') sanphamId: string,
//     @Query('page') page: string = '1',
//     @Query('limit') limit: string = '20'
//   ) {
//     try {
//       const pageNum = parseInt(page, 10);
//       const limitNum = parseInt(limit, 10);
//       return await this.chotkhoService.findBySanpham(sanphamId, pageNum, limitNum);
//     } catch (error) {
//       throw new HttpException(error.message || 'Failed to fetch chotkho by sanpham', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Generate chotkho report' })
//   @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Start date (YYYY-MM-DD)' })
//   @ApiQuery({ name: 'endDate', required: false, type: String, description: 'End date (YYYY-MM-DD)' })
//   @ApiQuery({ name: 'khoId', required: false, type: String, description: 'Filter by kho ID' })
//   @ApiQuery({ name: 'sanphamId', required: false, type: String, description: 'Filter by sanpham ID' })
//   @ApiQuery({ name: 'format', required: false, enum: ['json', 'excel'], description: 'Report format' })
//   @ApiResponse({ status: 200, description: 'Chotkho report data' })
//   @UseGuards(JwtAuthGuard)
//   @Get('report')
//   async generateReport(@Query() query: any) {
//     try {
//       return await this.chotkhoService.generateReport(query);
//     } catch (error) {
//       throw new HttpException(error.message || 'Failed to generate report', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiOperation({ summary: 'Reorder chotkhos' })
//   @ApiBody({
//     schema: { 
//       properties: {
//         chotkhoIds: { type: 'array', items: { type: 'string' } },
//       },
//     },
//   })
//   @Post('reorder') 
//   async reorder(@Body() body: { chotkhoIds: string[] }) { 
//     try {
//       return await this.chotkhoService.reorderChotkhos(body.chotkhoIds);
//     } catch (error) {
//       throw new HttpException(error.message || 'Reorder failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiOperation({ summary: 'Generate report for chotkho' })
//   @ApiBody({ type: Object })
//   @Post('report')
//   async generateReportPost(@Body() query: any) {
//     try {
//       return await this.chotkhoService.generateReport(query);
//     } catch (error) {
//       throw new HttpException(error.message || 'Generate report failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Bulk update status for chotkhos' })
//   @ApiBody({ type: Object })
//   @UseGuards(JwtAuthGuard)
//   @Patch('bulk-update-status')
//   async bulkUpdateStatus(@Body() data: { ids: string[], status: string }) {
//     try {
//       return await this.chotkhoService.bulkUpdateActive(data.ids, data.status === 'active');
//     } catch (error) {
//       throw new HttpException(error.message || 'Bulk update failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiBearerAuth()
//   @ApiOperation({ summary: 'Bulk create chotkho records' })
//   @ApiBody({ 
//     type: [Object],
//     description: 'Array of chotkho data objects'
//   })
//   @UseGuards(JwtAuthGuard)
//   @Post('bulk-create')
//   @Audit({ entity: 'Chotkho', action: AuditAction.CREATE, includeResponse: true })
//   async bulkCreate(@Body() dataList: any[]) {
//     try {
//       return await this.chotkhoService.bulkCreateChotkho(dataList);
//     } catch (error) {
//       throw new HttpException(error.message || 'Bulk create failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @ApiOperation({ summary: 'Get chotkho statistics' })
//   @Get('statistics')
//   async getStatistics() {
//     try {
//       return await this.chotkhoService.getStatistics();
//     } catch (error) {
//       throw new HttpException(error.message || 'Get statistics failed', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

// }

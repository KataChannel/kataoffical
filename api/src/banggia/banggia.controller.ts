import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BanggiaService } from './banggia.service';
import { AuditAction } from '@prisma/client';
import { Audit } from 'src/auditlog/audit.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('banggia')
@Controller('banggia')
export class BanggiaController {
  constructor(private readonly banggiaService: BanggiaService) {}

  @Post('import')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Import banggia data' })
  @ApiResponse({ status: 201, description: 'Data imported successfully' })
  @Audit({entity: 'Import Banggia',action: AuditAction.CREATE,includeResponse: true})
  import(@Body() data: any) {
    console.log('Importing banggia data:', data);
    return this.banggiaService.importBanggia(data);
  }

  @Post('importspbg')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Import spbg data' })
  @ApiResponse({ status: 201, description: 'Data imported successfully' })
  @Audit({entity: 'Import SPBG',action: AuditAction.CREATE,includeResponse: true})
  importspbg(@Body() data: any) {
    return this.banggiaService.importSPBG(data);
  }
  @Post('importbgkh')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Import bgkh data' })
  @ApiResponse({ status: 201, description: 'Data imported successfully' })
  @Audit({entity: 'Import BGKH',action: AuditAction.CREATE,includeResponse: true})
  importbgkh(@Body() data: any) {
    return this.banggiaService.importBGKH(data);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new banggia' })
  @ApiResponse({ status: 201, description: 'Banggia created successfully' })
  @Audit({entity: 'Create Banggia',action: AuditAction.CREATE,includeResponse: true})
  create(@Body() createBanggiaDto: any) {
    return this.banggiaService.createBanggia(createBanggiaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Return all banggias' })
  @ApiResponse({ status: 200, description: 'List of banggias' })
  findAll() {
    return this.banggiaService.findAll();
  }

  @Get('getbgsp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Return all banggias' })
  @ApiResponse({ status: 200, description: 'List of banggias' })
  getbgsp() {
    return this.banggiaService.getbgsp();
  }
  @Get('getbgkh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Return all banggias' })
  @ApiResponse({ status: 200, description: 'List of banggias' })
  getbgkh() {
    return this.banggiaService.getbgkh();
  }

  @Post('reorder')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reorder banggia items' })
  @ApiResponse({ status: 200, description: 'Banggia reordering complete' })
  reorder(@Body() body: { banggiaIds: string[] }) {
    return this.banggiaService.reorderBanggias(body.banggiaIds);
  }

  @Post('addKHtoBG')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Add multiple khachhang to a banggia' })
  @ApiResponse({ status: 200, description: 'Khachhang added to banggia successfully' })
  addMultipleKhachhangToBanggia(@Body() data: any) {
    return this.banggiaService.addKHtoBG(data.banggiaId, data.khachhangIds);
  }

  @Post('removeKHfromBG')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove khachhang from a banggia' })
  @ApiResponse({ status: 200, description: 'Khachhang removed from banggia successfully' })
  removeKHfromBG(@Body() data: any) {
    return this.banggiaService.removeKHfromBG(data.banggiaId, data.khachhangIds);
  }

  @Get('findid/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find a banggia by id' })
  @ApiResponse({ status: 200, description: 'Found banggia' })
  findOne(@Param('id') id: string) {
    return this.banggiaService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a banggia' })
  @ApiResponse({ status: 200, description: 'Banggia updated successfully' })
  @Audit({entity: 'Update Banggia',action: AuditAction.UPDATE,includeResponse: true})
  update(@Param('id') id: string, @Body() updateBanggiaDto: any) {
    return this.banggiaService.update(id, updateBanggiaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a banggia with all related records' })
  @ApiResponse({ status: 204, description: 'Banggia removed successfully' })
  @Audit({entity: 'Remove Banggia',action: AuditAction.DELETE,includeResponse: true})
  remove(@Param('id') id: string) {
    return this.banggiaService.remove(id);
  }

  @Post('bulk-delete')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Bulk delete banggia with all related records' })
  @ApiResponse({ status: 200, description: 'Banggia bulk deleted successfully' })
  @Audit({entity: 'Bulk Delete Banggia',action: AuditAction.DELETE,includeResponse: true})
  async removeBulk(@Body() body: { ids: string[] }) {
    return this.banggiaService.removeBulk(body.ids);
  }
}
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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BanggiaService } from './banggia.service';

@ApiTags('banggia')
@Controller('banggia')
export class BanggiaController {
  constructor(private readonly banggiaService: BanggiaService) {}

  @Post('import')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Import banggia data' })
  @ApiResponse({ status: 201, description: 'Data imported successfully' })
  import(@Body() data: any) {
    console.log('Importing banggia data:', data);
    
    return this.banggiaService.importBanggia(data);
  }

  @Post('importspbg')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Import spbg data' })
  @ApiResponse({ status: 201, description: 'Data imported successfully' })
  importspbg(@Body() data: any) {
    return this.banggiaService.importSPBG(data);
  }
  @Post('importbgkh')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Import bgkh data' })
  @ApiResponse({ status: 201, description: 'Data imported successfully' })
  importbgkh(@Body() data: any) {
    return this.banggiaService.importBGKH(data);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new banggia' })
  @ApiResponse({ status: 201, description: 'Banggia created successfully' })
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a banggia' })
  @ApiResponse({ status: 200, description: 'Banggia updated successfully' })
  update(@Param('id') id: string, @Body() updateBanggiaDto: any) {
    return this.banggiaService.update(id, updateBanggiaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a banggia' })
  @ApiResponse({ status: 204, description: 'Banggia removed successfully' })
  remove(@Param('id') id: string) {
    this.banggiaService.remove(id);
  }
}
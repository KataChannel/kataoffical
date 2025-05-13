import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { hoadonChitietService } from './hoadonchitiet.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('hoadonchitiet')
@Controller('hoadonchitiet')
export class HoadonchitietController {
  constructor(private readonly hoadonchitietService: hoadonChitietService) {}

  @ApiOperation({ summary: 'Create a new hoadonchitiet' })
  @ApiBody({ type: Object })
  @Post()
  create(@Body() data: any) {
    return this.hoadonchitietService.create(data);
  }

  @ApiOperation({ summary: 'Find hoadonchitiets by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  findby(@Body() param: any) {
    return this.hoadonchitietService.findBy(param);
  }

  @ApiOperation({ summary: 'Get all hoadonchitiets' })
  @Get()
  findAll() {
    return this.hoadonchitietService.findAll();
  }

  // Ví dụ: Endpoint lấy dữ liệu cuối cùng được cập nhật, có thể cần chỉnh sửa
  @ApiOperation({ summary: 'Get last updated hoadonchitiet' })
  @Get('lastupdated')
  async getLastUpdatedHoadonchitiet() {
    // Giả định service có phương thức tương tự, cần kiểm tra logic cụ thể
    return this.hoadonchitietService.getLastUpdatedhoadonChitiet();
  }

  @ApiOperation({ summary: 'Find hoadonchitiet by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.hoadonchitietService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a hoadonchitiet' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.hoadonchitietService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a hoadonchitiet' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hoadonchitietService.remove(id);
  }

  // Ví dụ: Endpoint sắp xếp lại, có thể cần chỉnh sửa cho phù hợp
  @ApiOperation({ summary: 'Reorder hoadonchitiets' })
  @ApiBody({ schema: { properties: { hoadonchitietIds: { type: 'array', items: { type: 'string' } } } } })
  @Post('reorder')
  reorder(@Body() body: { hoadonchitietIds: string[] }) {
    // Giả định service có phương thức tương tự, cần kiểm tra logic cụ thể
    return this.hoadonchitietService.reorderhoadonChitiets(body.hoadonchitietIds);
  }
}

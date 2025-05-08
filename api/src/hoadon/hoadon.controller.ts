import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { HoadonService } from './hoadon.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('hoadon')
@Controller('hoadon')
export class HoadonController {
  constructor(private readonly hoadonService: HoadonService) {}

  @ApiOperation({ summary: 'Create a new hoadon' })
  @ApiBody({ type: Object })
  @Post()
  create(@Body() data: any) {
    return this.hoadonService.create(data);
  }

  @ApiOperation({ summary: 'Find hoadons by parameters' })
  @ApiBody({ type: Object })
  @Post('findby')
  findby(@Body() param: any) {
    return this.hoadonService.findBy(param);
  }

  @ApiOperation({ summary: 'Get all hoadons' })
  @Get()
  findAll() {
    return this.hoadonService.findAll();
  }

  // Ví dụ: Endpoint lấy dữ liệu cuối cùng được cập nhật, có thể cần chỉnh sửa
  @ApiOperation({ summary: 'Get last updated hoadon' })
  @Get('lastupdated')
  async getLastUpdatedHoadon() {
    // Giả định service có phương thức tương tự, cần kiểm tra logic cụ thể
    return this.hoadonService.getLastUpdatedHoadon();
  }

  @ApiOperation({ summary: 'Find hoadon by ID' })
  @ApiParam({ name: 'id', type: String })
  @Get('findid/:id')
  findOne(@Param('id') id: string) {
    return this.hoadonService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a hoadon' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: Object })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.hoadonService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a hoadon' })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hoadonService.remove(id);
  }

  // Ví dụ: Endpoint sắp xếp lại, có thể cần chỉnh sửa cho phù hợp
  @ApiOperation({ summary: 'Reorder hoadons' })
  @ApiBody({ schema: { properties: { hoadonIds: { type: 'array', items: { type: 'string' } } } } })
  @Post('reorder')
  reorder(@Body() body: { hoadonIds: string[] }) {
    // Giả định service có phương thức tương tự, cần kiểm tra logic cụ thể
    return this.hoadonService.reorderHoadons(body.hoadonIds);
  }
}

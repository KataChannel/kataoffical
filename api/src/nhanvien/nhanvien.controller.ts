import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { NhanvienService } from './nhanvien.service';
import { CreateNhanvienDto, UpdateNhanvienDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('nhanvien')
@UseGuards(JwtAuthGuard)
export class NhanvienController {
  constructor(private readonly nhanvienService: NhanvienService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNhanvienDto: CreateNhanvienDto) {
    return this.nhanvienService.create(createNhanvienDto);
  }

  @Get()
  findAll(
    @Query('phongbanId') phongbanId?: string,
    @Query('trangThai') trangThai?: string,
    @Query('chucVu') chucVu?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    return this.nhanvienService.findAll({
      phongbanId,
      trangThai,
      chucVu,
      search,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined
    });
  }

  @Get('statistics')
  getStatistics() {
    return this.nhanvienService.getStatistics();
  }

  @Get('ma/:maNV')
  findByMaNV(@Param('maNV') maNV: string) {
    return this.nhanvienService.findByMaNV(maNV);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nhanvienService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNhanvienDto: UpdateNhanvienDto) {
    return this.nhanvienService.update(id, updateNhanvienDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.nhanvienService.remove(id);
  }

  @Post(':id/link-user')
  @HttpCode(HttpStatus.OK)
  linkToUser(@Param('id') id: string, @Body('userId') userId: string) {
    return this.nhanvienService.linkToUser(id, userId);
  }

  @Post(':id/unlink-user')
  @HttpCode(HttpStatus.OK)
  unlinkFromUser(@Param('id') id: string) {
    return this.nhanvienService.unlinkFromUser(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TrangThaiHoaDon } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateHoaDonDto, UpdateHoaDonDto } from './dto/hoadon.dto';
import { HoaDonService } from './hoadon.service';

@Controller('hoadon')
@UseGuards(JwtAuthGuard)
export class HoaDonController {
  constructor(private readonly hoaDonService: HoaDonService) {}

  @Post()
  async create(@Body() createDto: CreateHoaDonDto, @Request() req: any) {
    const nguoiTaoId = req.user?.sub || req.user?.id;
    return this.hoaDonService.create(createDto, nguoiTaoId);
  }

  @Get()
  async findAll(
    @Query('donhangId') donhangId?: string,
    @Query('trangThai') trangThai?: TrangThaiHoaDon,
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.hoaDonService.findAll({
      donhangId,
      trangThai,
      tuNgay: tuNgay ? new Date(tuNgay) : undefined,
      denNgay: denNgay ? new Date(denNgay) : undefined,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hoaDonService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateHoaDonDto) {
    return this.hoaDonService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.hoaDonService.remove(id);
  }

  @Post(':id/duyet')
  async duyet(@Param('id') id: string, @Request() req: any) {
    const nguoiDuyetId = req.user?.sub || req.user?.id;
    return this.hoaDonService.duyet(id, nguoiDuyetId);
  }

  @Post(':id/huy')
  async huy(@Param('id') id: string) {
    return this.hoaDonService.huy(id);
  }
}

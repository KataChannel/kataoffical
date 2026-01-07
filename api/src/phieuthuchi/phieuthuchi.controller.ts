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
import { LoaiPhieuThuChi, TrangThaiPhieu } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  CreatePhieuThuChiDto,
  UpdatePhieuThuChiDto,
} from './dto/phieuthuchi.dto';
import { PhieuThuChiService } from './phieuthuchi.service';

@Controller('phieuthuchi')
@UseGuards(JwtAuthGuard)
export class PhieuThuChiController {
  constructor(private readonly phieuThuChiService: PhieuThuChiService) {}

  @Post()
  async create(@Body() createDto: CreatePhieuThuChiDto, @Request() req: any) {
    const nguoiTaoId = req.user?.sub || req.user?.id;
    return this.phieuThuChiService.create(createDto, nguoiTaoId);
  }

  @Get()
  async findAll(
    @Query('loai') loai?: LoaiPhieuThuChi,
    @Query('trangThai') trangThai?: TrangThaiPhieu,
    @Query('doiTuong') doiTuong?: string,
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.phieuThuChiService.findAll({
      loai,
      trangThai,
      doiTuong,
      tuNgay: tuNgay ? new Date(tuNgay) : undefined,
      denNgay: denNgay ? new Date(denNgay) : undefined,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Get('bao-cao')
  async baoCaoThuChi(
    @Query('tuNgay') tuNgay: string,
    @Query('denNgay') denNgay: string,
  ) {
    return this.phieuThuChiService.baoCaoThuChi(
      new Date(tuNgay),
      new Date(denNgay),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.phieuThuChiService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePhieuThuChiDto,
  ) {
    return this.phieuThuChiService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.phieuThuChiService.remove(id);
  }

  @Post(':id/gui-duyet')
  async guiDuyet(@Param('id') id: string) {
    return this.phieuThuChiService.guiDuyet(id);
  }

  @Post(':id/duyet')
  async duyet(@Param('id') id: string, @Request() req: any) {
    const nguoiDuyetId = req.user?.sub || req.user?.id;
    return this.phieuThuChiService.duyet(id, nguoiDuyetId);
  }

  @Post(':id/huy')
  async huy(@Param('id') id: string) {
    return this.phieuThuChiService.huy(id);
  }

  @Post(':id/thanh-toan')
  async thanhToan(
    @Param('id') id: string,
    @Body('billImage') billImage?: string,
  ) {
    return this.phieuThuChiService.thanhToan(id, billImage);
  }
}

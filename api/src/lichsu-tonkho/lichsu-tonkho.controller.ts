import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Query, 
  Delete,
  Put,
  ParseIntPipe,
  BadRequestException 
} from '@nestjs/common';
import { LichSuTonKhoService } from './lichsu-tonkho.service';
import { LoaiGiaoDichKho, TrangThaiChotKho } from '@prisma/client';

@Controller('lichsu-tonkho')
export class LichSuTonKhoController {
  constructor(private readonly lichSuTonKhoService: LichSuTonKhoService) {}

  // Tạo lịch sử giao dịch tồn kho
  @Post('create')
  async createLichSuTonKho(@Body() createDto: {
    sanphamId: string;
    loaiGiaoDich: LoaiGiaoDichKho;
    soLuongThayDoi: number;
    donGia?: number;
    phieuKhoId?: string;
    donhangId?: string;
    userId?: string;
    lyDo?: string;
    ghichu?: string;
    soChungTu?: string;
  }) {
    try {
      return await this.lichSuTonKhoService.createLichSuTonKho(createDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Lấy lịch sử tồn kho với phân trang và filter
  @Get()
  async getLichSuTonKho(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('sanphamId') sanphamId?: string,
    @Query('loaiGiaoDich') loaiGiaoDich?: LoaiGiaoDichKho,
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
    @Query('userId') userId?: string,
  ) {
    try {
      return await this.lichSuTonKhoService.getLichSuTonKho({
        page,
        limit,
        sanphamId,
        loaiGiaoDich,
        tuNgay: tuNgay ? new Date(tuNgay) : undefined,
        denNgay: denNgay ? new Date(denNgay) : undefined,
        userId
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Lấy thống kê giao dịch
  @Get('thong-ke')
  async getThongKeGiaoDich(
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
    @Query('sanphamId') sanphamId?: string,
  ) {
    try {
      return await this.lichSuTonKhoService.getThongKeGiaoDich({
        tuNgay: tuNgay ? new Date(tuNgay) : undefined,
        denNgay: denNgay ? new Date(denNgay) : undefined,
        sanphamId
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // API cho chốt kho
  @Post('chot-kho')
  async createChotKho(@Body() createDto: {
    maChotKho: string;
    tenChotKho: string;
    tuNgay: string;
    denNgay: string;
    userId?: string;
    ghichu?: string;
  }) {
    try {
      return await this.lichSuTonKhoService.createChotKho({
        ...createDto,
        tuNgay: new Date(createDto.tuNgay),
        denNgay: new Date(createDto.denNgay)
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('chot-kho/:id/thuc-hien')
  async thucHienChotKho(
    @Param('id') chotKhoId: string,
    @Body() body: { userId?: string }
  ) {
    try {
      return await this.lichSuTonKhoService.thucHienChotKho(chotKhoId, body.userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('chot-kho')
  async getDanhSachChotKho(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('trangThai') trangThai?: TrangThaiChotKho,
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
  ) {
    try {
      return await this.lichSuTonKhoService.getDanhSachChotKho({
        page,
        limit,
        trangThai,
        tuNgay: tuNgay ? new Date(tuNgay) : undefined,
        denNgay: denNgay ? new Date(denNgay) : undefined,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('chot-kho/:id')
  async getChiTietChotKho(@Param('id') chotKhoId: string) {
    try {
      return await this.lichSuTonKhoService.getChiTietChotKho(chotKhoId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('chot-kho/:id')
  async xoaChotKho(@Param('id') chotKhoId: string) {
    try {
      return await this.lichSuTonKhoService.xoaChotKho(chotKhoId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

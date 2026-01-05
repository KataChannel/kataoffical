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
import { LoaiThanhToan, TrangThaiThanhToan } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBulkThanhToanDto, CreateThanhToanDto, UpdateThanhToanDto } from './dto/thanhtoan.dto';
import { ThanhToanService } from './thanhtoan.service';

@Controller('thanhtoan')
@UseGuards(JwtAuthGuard)
export class ThanhToanController {
  constructor(private readonly thanhToanService: ThanhToanService) {}

  @Post()
  async create(@Body() createDto: CreateThanhToanDto, @Request() req: any) {
    const nguoiTaoId = req.user?.sub || req.user?.id;
    return this.thanhToanService.create(createDto, nguoiTaoId);
  }

  @Post('bulk')
  async createBulk(@Body() createBulkDto: CreateBulkThanhToanDto, @Request() req: any) {
    const nguoiTaoId = req.user?.sub || req.user?.id;
    return this.thanhToanService.createBulk(createBulkDto, nguoiTaoId);
  }

  @Get()
  async findAll(
    @Query('donhangId') donhangId?: string,
    @Query('loai') loai?: LoaiThanhToan,
    @Query('trangThai') trangThai?: TrangThaiThanhToan,
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.thanhToanService.findAll({
      donhangId,
      loai,
      trangThai,
      tuNgay: tuNgay ? new Date(tuNgay) : undefined,
      denNgay: denNgay ? new Date(denNgay) : undefined,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Get('bao-cao')
  async baoCaoThanhToan(
    @Query('tuNgay') tuNgay: string,
    @Query('denNgay') denNgay: string,
  ) {
    return this.thanhToanService.baoCaoThanhToan(
      new Date(tuNgay),
      new Date(denNgay),
    );
  }

  @Get('donhang/:donhangId/tong')
  async getTongThanhToanByDonhang(@Param('donhangId') donhangId: string) {
    return this.thanhToanService.getTongThanhToanByDonhang(donhangId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.thanhToanService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateThanhToanDto,
  ) {
    return this.thanhToanService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.thanhToanService.remove(id);
  }
}

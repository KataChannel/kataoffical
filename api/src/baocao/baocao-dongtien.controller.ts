import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BaoCaoDongTienService, ThongKeDongTien } from './baocao-dongtien.service';

@Controller('baocao/dongtien')
@UseGuards(JwtAuthGuard)
export class BaoCaoDongTienController {
  constructor(private readonly baoCaoDongTienService: BaoCaoDongTienService) {}

  @Get()
  async getBaoCao(
    @Query('tuNgay') tuNgay?: string,
    @Query('denNgay') denNgay?: string,
    @Query('groupBy') groupBy?: 'day' | 'week' | 'month',
  ): Promise<ThongKeDongTien> {
    return this.baoCaoDongTienService.getBaoCaoDongTien({
      tuNgay: tuNgay ? new Date(tuNgay) : undefined,
      denNgay: denNgay ? new Date(denNgay) : undefined,
      groupBy: groupBy || 'day',
    });
  }

  @Get('hom-nay')
  async getThongKeHomNay() {
    return this.baoCaoDongTienService.getThongKeHomNay();
  }
}

import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BaoCaoDongTienService } from './baocao-dongtien.service';

@Resolver(() => GraphQLJSON)
@UseGuards(JwtAuthGuard)
export class BaoCaoDongTienResolver {
  constructor(private readonly baoCaoDongTienService: BaoCaoDongTienService) {}

  @Query(() => GraphQLJSON, { name: 'baoCaoDongTien' })
  async baoCaoDongTien(
    @Args('tuNgay', { nullable: true }) tuNgay?: string,
    @Args('denNgay', { nullable: true }) denNgay?: string,
    @Args('groupBy', { nullable: true, defaultValue: 'day' })
    groupBy?: 'day' | 'week' | 'month',
  ) {
    return this.baoCaoDongTienService.getBaoCaoDongTien({
      tuNgay: tuNgay ? new Date(tuNgay) : undefined,
      denNgay: denNgay ? new Date(denNgay) : undefined,
      groupBy,
    });
  }

  @Query(() => GraphQLJSON, { name: 'thongKeDongTienHomNay' })
  async thongKeDongTienHomNay() {
    return this.baoCaoDongTienService.getThongKeHomNay();
  }
}

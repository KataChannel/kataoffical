import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePhieuThuChiDto, UpdatePhieuThuChiDto } from './dto/phieuthuchi.dto';
import { PhieuThuChiService } from './phieuthuchi.service';

@Resolver(() => GraphQLJSON)
@UseGuards(JwtAuthGuard)
export class PhieuThuChiResolver {
  constructor(private readonly phieuThuChiService: PhieuThuChiService) {}

  @Mutation(() => GraphQLJSON, { name: 'createPhieuThuChi' })
  async createPhieuThuChi(
    @Args('input') input: CreatePhieuThuChiDto,
    @Context() context: any,
  ) {
    const user = context.req?.user;
    const nguoiTaoId = user?.sub || user?.id;
    return this.phieuThuChiService.create(input, nguoiTaoId);
  }

  @Query(() => GraphQLJSON, { name: 'phieuThuChiList' })
  async phieuThuChiList(
    @Args('loai') loai?: string,
    @Args('trangThai') trangThai?: string,
    @Args('doiTuong') doiTuong?: string,
    @Args('tuNgay') tuNgay?: string,
    @Args('denNgay') denNgay?: string,
    @Args('page') page?: number,
    @Args('limit') limit?: number,
  ) {
    return this.phieuThuChiService.findAll({
      loai: loai as any,
      trangThai: trangThai as any,
      doiTuong,
      tuNgay: tuNgay ? new Date(tuNgay) : undefined,
      denNgay: denNgay ? new Date(denNgay) : undefined,
      page,
      limit,
    });
  }

  @Query(() => GraphQLJSON, { name: 'phieuThuChi' })
  async phieuThuChi(@Args('id') id: string) {
    return this.phieuThuChiService.findOne(id);
  }

  @Mutation(() => GraphQLJSON, { name: 'updatePhieuThuChi' })
  async updatePhieuThuChi(
    @Args('id') id: string,
    @Args('input') input: UpdatePhieuThuChiDto,
  ) {
    return this.phieuThuChiService.update(id, input);
  }

  @Mutation(() => GraphQLJSON, { name: 'deletePhieuThuChi' })
  async deletePhieuThuChi(@Args('id') id: string) {
    return this.phieuThuChiService.remove(id);
  }

  @Mutation(() => GraphQLJSON, { name: 'guiDuyetPhieuThuChi' })
  async guiDuyetPhieuThuChi(@Args('id') id: string) {
    return this.phieuThuChiService.guiDuyet(id);
  }

  @Mutation(() => GraphQLJSON, { name: 'duyetPhieuThuChi' })
  async duyetPhieuThuChi(@Args('id') id: string, @Context() context: any) {
    const user = context.req?.user;
    const nguoiDuyetId = user?.sub || user?.id;
    return this.phieuThuChiService.duyet(id, nguoiDuyetId);
  }

  @Mutation(() => GraphQLJSON, { name: 'huyPhieuThuChi' })
  async huyPhieuThuChi(@Args('id') id: string) {
    return this.phieuThuChiService.huy(id);
  }

  @Query(() => GraphQLJSON, { name: 'baoCaoThuChi' })
  async baoCaoThuChi(
    @Args('tuNgay') tuNgay: string,
    @Args('denNgay') denNgay: string,
  ) {
    return this.phieuThuChiService.baoCaoThuChi(
      new Date(tuNgay),
      new Date(denNgay),
    );
  }
}

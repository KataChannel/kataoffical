import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateHoaDonDto, UpdateHoaDonDto } from './dto/hoadon.dto';
import { HoaDonService } from './hoadon.service';

@Resolver(() => GraphQLJSON)
@UseGuards(JwtAuthGuard)
export class HoaDonResolver {
  constructor(private readonly hoaDonService: HoaDonService) {}

  @Query(() => GraphQLJSON, { name: 'hoaDonDienTuList' })
  async hoaDonDienTuList(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('where', { type: () => GraphQLJSON, nullable: true }) where?: any,
    @Args('orderBy', { type: () => GraphQLJSON, nullable: true }) orderBy?: any,
  ) {
    // Convert frontend params to service params
    const page = skip !== undefined && take !== undefined ? Math.floor(skip / take) + 1 : 1;
    const limit = take || 20;

    const filters: any = {
      page,
      limit,
    };

    // Parse where conditions
    if (where) {
      if (where.donhangId) {
        filters.donhangId = where.donhangId;
      }
      if (where.trangThai) {
        filters.trangThai = where.trangThai;
      }
      if (where.ngayLap) {
        if (where.ngayLap.gte) {
          filters.tuNgay = new Date(where.ngayLap.gte);
        }
        if (where.ngayLap.lte) {
          filters.denNgay = new Date(where.ngayLap.lte);
        }
      }
    }

    const result = await this.hoaDonService.findAll(filters);

    // Convert to frontend expected format
    return {
      items: result.data,
      total: result.total,
    };
  }

  @Query(() => GraphQLJSON, { name: 'hoaDonDienTu' })
  async hoaDonDienTu(@Args('id') id: string) {
    return this.hoaDonService.findOne(id);
  }

  @Mutation(() => GraphQLJSON, { name: 'createHoaDonDienTu' })
  async createHoaDonDienTu(
    @Args('input') input: CreateHoaDonDto,
    @Context() context: any,
  ) {
    const user = context.req?.user;
    const nguoiTaoId = user?.sub || user?.id;
    return this.hoaDonService.create(input, nguoiTaoId);
  }

  @Mutation(() => GraphQLJSON, { name: 'updateHoaDonDienTu' })
  async updateHoaDonDienTu(
    @Args('id') id: string,
    @Args('input') input: UpdateHoaDonDto,
  ) {
    return this.hoaDonService.update(id, input);
  }

  @Mutation(() => GraphQLJSON, { name: 'xuatHoaDon' })
  async xuatHoaDon(@Args('id') id: string, @Context() context: any) {
    const user = context.req?.user;
    const nguoiDuyetId = user?.sub || user?.id;
    return this.hoaDonService.duyet(id, nguoiDuyetId);
  }

  @Mutation(() => GraphQLJSON, { name: 'generateHoaDonPDF' })
  async generateHoaDonPDF(@Args('id') id: string) {
    // For now, just return the existing hoaDon with pdfUrl
    // PDF generation would be implemented with a PDF library
    const hoaDon = await this.hoaDonService.findOne(id);
    return {
      pdfUrl: hoaDon.pdfUrl || null,
    };
  }

  @Mutation(() => GraphQLJSON, { name: 'deleteHoaDonDienTu' })
  async deleteHoaDonDienTu(@Args('id') id: string) {
    return this.hoaDonService.remove(id);
  }

  @Mutation(() => GraphQLJSON, { name: 'huyHoaDon' })
  async huyHoaDon(@Args('id') id: string) {
    return this.hoaDonService.huy(id);
  }
}

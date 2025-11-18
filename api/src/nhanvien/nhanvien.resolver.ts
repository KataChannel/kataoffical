import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import GraphQLJSON from 'graphql-type-json';
import { NhanvienService } from './nhanvien.service';
import { CreateNhanvienDto, UpdateNhanvienDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver('Nhanvien')
@UseGuards(JwtAuthGuard)
export class NhanvienResolver {
  constructor(private readonly nhanvienService: NhanvienService) {}

  @Mutation(() => GraphQLJSON, { name: 'createNhanvien' })
  create(@Args('input', { type: () => GraphQLJSON }) createNhanvienDto: CreateNhanvienDto) {
    return this.nhanvienService.create(createNhanvienDto);
  }

  @Query(() => GraphQLJSON, { name: 'nhanviens' })
  findAll(
    @Args('phongbanId', { nullable: true }) phongbanId?: string,
    @Args('trangThai', { nullable: true }) trangThai?: string,
    @Args('chucVu', { nullable: true }) chucVu?: string,
    @Args('search', { nullable: true }) search?: string,
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number
  ) {
    return this.nhanvienService.findAll({
      phongbanId,
      trangThai,
      chucVu,
      search,
      page,
      limit
    });
  }

  @Query(() => GraphQLJSON, { name: 'nhanvienStatistics' })
  getStatistics() {
    return this.nhanvienService.getStatistics();
  }

  @Query(() => GraphQLJSON, { name: 'nhanvien' })
  findOne(@Args('id') id: string) {
    return this.nhanvienService.findOne(id);
  }

  @Query(() => GraphQLJSON, { name: 'nhanvienByMaNV' })
  findByMaNV(@Args('maNV') maNV: string) {
    return this.nhanvienService.findByMaNV(maNV);
  }

  @Mutation(() => GraphQLJSON, { name: 'updateNhanvien' })
  update(
    @Args('id') id: string,
    @Args('input', { type: () => GraphQLJSON }) updateNhanvienDto: UpdateNhanvienDto
  ) {
    return this.nhanvienService.update(id, updateNhanvienDto);
  }

  @Mutation(() => GraphQLJSON, { name: 'deleteNhanvien' })
  remove(@Args('id') id: string) {
    return this.nhanvienService.remove(id);
  }

  @Mutation(() => GraphQLJSON, { name: 'linkNhanvienToUser' })
  linkToUser(
    @Args('nhanvienId') nhanvienId: string,
    @Args('userId') userId: string
  ) {
    return this.nhanvienService.linkToUser(nhanvienId, userId);
  }

  @Mutation(() => GraphQLJSON, { name: 'unlinkNhanvienFromUser' })
  unlinkFromUser(@Args('nhanvienId') nhanvienId: string) {
    return this.nhanvienService.unlinkFromUser(nhanvienId);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PhongbanService } from './phongban.service';
import { CreatePhongbanDto, UpdatePhongbanDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver('Phongban')
@UseGuards(JwtAuthGuard)
export class PhongbanResolver {
  constructor(private readonly phongbanService: PhongbanService) {}

  @Mutation('createPhongban')
  create(@Args('input') createPhongbanDto: CreatePhongbanDto) {
    return this.phongbanService.create(createPhongbanDto);
  }

  @Query('phongbans')
  findAll(
    @Args('level', { type: () => Int, nullable: true }) level?: number,
    @Args('loai', { nullable: true }) loai?: string,
    @Args('parentId', { nullable: true }) parentId?: string,
    @Args('includeChildren', { nullable: true }) includeChildren?: boolean
  ) {
    return this.phongbanService.findAll({
      level,
      loai,
      parentId,
      includeChildren
    });
  }

  @Query('phongbanTree')
  getTree() {
    return this.phongbanService.getTree();
  }

  @Query('phongbanStatistics')
  getStatistics() {
    return this.phongbanService.getStatistics();
  }

  @Query('phongban')
  findOne(@Args('id') id: string) {
    return this.phongbanService.findOne(id);
  }

  @Query('phongbanByMa')
  findByMa(@Args('ma') ma: string) {
    return this.phongbanService.findByMa(ma);
  }

  @Mutation('updatePhongban')
  update(
    @Args('id') id: string,
    @Args('input') updatePhongbanDto: UpdatePhongbanDto
  ) {
    return this.phongbanService.update(id, updatePhongbanDto);
  }

  @Mutation('deletePhongban')
  remove(@Args('id') id: string) {
    return this.phongbanService.remove(id);
  }
}

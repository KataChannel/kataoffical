import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import GraphQLJSON from 'graphql-type-json';
import { PhongbanService } from './phongban.service';
import { CreatePhongbanDto, UpdatePhongbanDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver('Phongban')
@UseGuards(JwtAuthGuard)
export class PhongbanResolver {
  constructor(private readonly phongbanService: PhongbanService) {}

  @Mutation(() => GraphQLJSON, { name: 'createPhongban' })
  create(@Args('input', { type: () => GraphQLJSON }) createPhongbanDto: CreatePhongbanDto) {
    return this.phongbanService.create(createPhongbanDto);
  }

  @Query(() => [GraphQLJSON], { name: 'phongbans' })
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

  @Query(() => [GraphQLJSON], { name: 'phongbanTree' })
  getTree() {
    return this.phongbanService.getTree();
  }

  @Query(() => GraphQLJSON, { name: 'phongbanStatistics' })
  getStatistics() {
    return this.phongbanService.getStatistics();
  }

  @Query(() => GraphQLJSON, { name: 'phongban' })
  findOne(@Args('id') id: string) {
    return this.phongbanService.findOne(id);
  }

  @Query(() => GraphQLJSON, { name: 'phongbanByMa' })
  findByMa(@Args('ma') ma: string) {
    return this.phongbanService.findByMa(ma);
  }

  @Mutation(() => GraphQLJSON, { name: 'updatePhongban' })
  update(
    @Args('id') id: string,
    @Args('input', { type: () => GraphQLJSON }) updatePhongbanDto: UpdatePhongbanDto
  ) {
    return this.phongbanService.update(id, updatePhongbanDto);
  }

  @Mutation(() => GraphQLJSON, { name: 'deletePhongban' })
  remove(@Args('id') id: string) {
    return this.phongbanService.remove(id);
  }
}

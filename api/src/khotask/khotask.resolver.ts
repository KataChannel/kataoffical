import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLJSON } from 'graphql-type-json';
import { KhotaskService } from './khotask.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuditAction } from '@prisma/client';
import { Audit } from '../auditlog/audit.decorator';

@Resolver('Khotask')
export class KhotaskResolver {
  constructor(private readonly khotaskService: KhotaskService) {}

  @Query(() => GraphQLJSON, { name: 'khotaskFindMany' })
  async findMany(
    @Args('filters', { type: () => GraphQLJSON, nullable: true }) 
    filters?: any
  ) {
    return await this.khotaskService.findAll(filters || {});
  }

  @Query(() => GraphQLJSON, { name: 'khotaskDailyChecklist' })
  async getDailyChecklist(
    @Args('khoId', { type: () => String }) khoId: string,
    @Args('date', { type: () => String, nullable: true }) date?: string
  ) {
    return await this.khotaskService.getDailyChecklist(khoId, date ? new Date(date) : new Date());
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GraphQLJSON, { name: 'khotaskCreate' })
  @Audit({ entity: 'KhoTask', action: AuditAction.CREATE, includeResponse: true })
  async create(
    @Args('data', { type: () => GraphQLJSON }) 
    data: any
  ) {
    return await this.khotaskService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GraphQLJSON, { name: 'khotaskUpdate' })
  @Audit({ entity: 'KhoTask', action: AuditAction.UPDATE, includeResponse: true })
  async update(
    @Args('id', { type: () => String }) id: string,
    @Args('data', { type: () => GraphQLJSON }) data: any
  ) {
    return await this.khotaskService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GraphQLJSON, { name: 'khotaskDelete' })
  @Audit({ entity: 'KhoTask', action: AuditAction.DELETE, includeResponse: true })
  async remove(@Args('id', { type: () => String }) id: string) {
    return await this.khotaskService.remove(id);
  }
}

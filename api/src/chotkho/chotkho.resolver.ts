import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GraphQLJSON } from 'graphql-type-json';
import { ChotkhoService } from './chotkho.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuditAction } from '@prisma/client';
import { Audit } from '../auditlog/audit.decorator';

@Injectable()
@Resolver('Chotkho')
export class ChotkhoResolver {
  constructor(private readonly chotkhoService: ChotkhoService) {}

  @Query(() => GraphQLJSON, { 
    name: 'chotkhoFindMany',
    description: 'Find many chotkho records with pagination'
  })
  async findMany(
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 }) 
    page?: number,
    
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 }) 
    limit?: number
  ) {
    return await this.chotkhoService.findAll(page, limit);
  }

  @Query(() => GraphQLJSON, { 
    name: 'chotkhoFindOne',
    description: 'Find one chotkho record by ID'
  })
  async findOne(
    @Args('id', { type: () => String, description: 'Chotkho ID' }) 
    id: string
  ) {
    return await this.chotkhoService.findOne(id);
  }

  @Query(() => GraphQLJSON, { 
    name: 'chotkhoGetProductsByWarehouse',
    description: '🎯 NEW: Get all products with inventory by warehouse for inventory check'
  })
  async getProductsByWarehouse(
    @Args('khoId', { type: () => String, description: 'Warehouse ID' }) 
    khoId: string
  ) {
    return await this.chotkhoService.getAllProductsByKho(khoId);
  }

  @Query(() => GraphQLJSON, { 
    name: 'chotkhoGetAllProducts',
    description: '🎯 NEW: Get all products with inventory information (no warehouse filter)'
  })
  async getAllProducts() {
    return await this.chotkhoService.getAllProducts();
  }

  @Query(() => GraphQLJSON, { 
    name: 'chotkhoGetAllWarehouses',
    description: '🎯 NEW: Get all active warehouses for selection'
  })
  async getAllWarehouses() {
    return await this.chotkhoService.getAllKho();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GraphQLJSON, { 
    name: 'chotkhoCreate',
    description: '🎯 Create inventory check with master-detail structure'
  })
  @Audit({ entity: 'Chotkho', action: AuditAction.CREATE, includeResponse: true })
  async create(
    @Args('data', { 
      type: () => GraphQLJSON,
      description: 'Inventory check data with master info and details array'
    }) 
    data: {
      ngaychot?: Date;
      title?: string;
      ghichu?: string;
      khoId: string;
      userId?: string;
      details: Array<{
        sanphamId: string;
        sltonhethong: number;
        sltonthucte: number;
        slhuy: number;
        ghichu?: string;
      }>;
    }
  ) {
    return await this.chotkhoService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GraphQLJSON, { 
    name: 'chotkhoUpdate',
    description: 'Update chotkho record by ID'
  })
  @Audit({ entity: 'Chotkho', action: AuditAction.UPDATE, includeResponse: true })
  async update(
    @Args('id', { type: () => String, description: 'Chotkho ID' }) 
    id: string,
    
    @Args('data', { type: () => GraphQLJSON }) 
    data: any
  ) {
    return await this.chotkhoService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GraphQLJSON, { 
    name: 'chotkhoDelete',
    description: 'Delete chotkho record by ID'
  })
  @Audit({ entity: 'Chotkho', action: AuditAction.DELETE, includeResponse: true })
  async remove(
    @Args('id', { type: () => String, description: 'Chotkho ID' }) 
    id: string
  ) {
    return await this.chotkhoService.remove(id);
  }

  @Query(() => GraphQLJSON, { 
    name: 'chotkhoSearch',
    description: 'Search chotkho records with filters'
  })
  async search(
    @Args('filters', { 
      type: () => GraphQLJSON,
      nullable: true,
      description: 'Search filters: khoId, sanphamId, fromDate, toDate, page, limit'
    }) 
    filters?: {
      khoId?: string;
      sanphamId?: string;
      fromDate?: string;
      toDate?: string;
      page?: number;
      limit?: number;
    }
  ) {
    return await this.chotkhoService.search(filters || {});
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GraphQLJSON, { 
    name: 'chotkhoLock',
    description: '🔒 Khóa sổ phiên chốt kho (Data Lock)'
  })
  @Audit({ entity: 'Chotkho', action: AuditAction.UPDATE, includeResponse: true })
  async lock(
    @Args('id', { type: () => String, description: 'Chotkho ID' }) 
    id: string,
    @Args('userId', { type: () => String, description: 'User ID perform lock' }) 
    userId: string
  ) {
    return await this.chotkhoService.lock(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GraphQLJSON, { 
    name: 'chotkhoUnlock',
    description: '🔓 Mở khóa phiên chốt kho (Data Unlock)'
  })
  @Audit({ entity: 'Chotkho', action: AuditAction.UPDATE, includeResponse: true })
  async unlock(
    @Args('id', { type: () => String, description: 'Chotkho ID' }) 
    id: string
  ) {
    return await this.chotkhoService.unlock(id);
  }

  @Query(() => GraphQLJSON, { 
    name: 'chotkhoScrapReport',
    description: '📊 Báo cáo hàng hủy (Scrap Report)'
  })
  async getScrapReport(
    @Args('filters', { 
      type: () => GraphQLJSON,
      nullable: true,
      description: 'Filters: khoId, fromDate, toDate'
    }) 
    filters?: {
      khoId?: string;
      fromDate?: string;
      toDate?: string;
    }
  ) {
    return await this.chotkhoService.getScrapReport(filters || {});
  }

  @Query(() => GraphQLJSON, { 
    name: 'chotkhoDailyInventorySummary',
    description: '🚀 Báo cáo tồn kho Real-time trong ngày (YC2)'
  })
  async getDailyInventorySummary(
    @Args('khoId', { type: () => String }) khoId: string,
    @Args('date', { type: () => String, nullable: true }) date?: string
  ) {
    return await this.chotkhoService.getDailyInventorySummary(khoId, date ? new Date(date) : new Date());
  }
}
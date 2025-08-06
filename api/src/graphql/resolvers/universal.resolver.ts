import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UniversalGraphQLService } from '../services/universal.service';
import { GraphQLJSON } from 'graphql-type-json';

// Import all GraphQL types
import {
  // Common types
  PaginationInput,
  SortInput,
  
  // User types
  User,
  UserPaginated,
  CreateUserInput,
  UpdateUserInput,
  UserFilterInput,
  
  // Sanpham types
  Sanpham,
  SanphamPaginated,
  CreateSanphamInput,
  UpdateSanphamInput,
  SanphamFilterInput,
  
  // Khachhang types
  Khachhang,
  KhachhangPaginated,
  CreateKhachhangInput,
  UpdateKhachhangInput,
  KhachhangFilterInput,
  
  // Donhang types
  Donhang,
  DonhangPaginated,
  CreateDonhangInput,
  UpdateDonhangInput,
  DonhangFilterInput,
  
  // Kho types
  Kho,
  KhoPaginated,
  CreateKhoInput,
  UpdateKhoInput,
  KhoFilterInput,
  
  // PhieuKho types
  PhieuKho,
  PhieuKhoPaginated,
  CreatePhieuKhoInput,
  UpdatePhieuKhoInput,
  PhieuKhoFilterInput,
  
  // TonKho types
  TonKho,
  TonKhoPaginated,
  TonKhoFilterInput,
} from '../types';

@Resolver()
// @UseGuards(JwtAuthGuard) // Temporarily disabled for testing
export class UniversalResolver {
  constructor(private readonly universalService: UniversalGraphQLService) {}

  // Query để lấy danh sách tất cả models có sẵn
  @Query(() => [String], {
    description: 'Lấy danh sách tất cả models có sẵn trong hệ thống'
  })
  async getAvailableModels(): Promise<string[]> {
    return this.universalService.getAvailableModels();
  }

  // Query để lấy danh sách records với pagination
  @Query(() => GraphQLJSON, {
    description: 'Lấy danh sách records của bất kỳ model nào với pagination và filtering'
  })
  async findMany(
    @Args('modelName', { description: 'Tên model (ví dụ: user, sanpham, donhang...)' }) 
    modelName: string,
    
    @Args('where', { 
      type: () => GraphQLJSON, 
      nullable: true,
      description: 'Điều kiện lọc (JSON format)'
    }) 
    where?: any,
    
    @Args('orderBy', { 
      type: () => GraphQLJSON, 
      nullable: true,
      description: 'Sắp xếp (JSON format)'
    }) 
    orderBy?: any,
    
    @Args('skip', { 
      nullable: true, 
      defaultValue: 0,
      description: 'Số records bỏ qua (pagination)'
    }) 
    skip?: number,
    
    @Args('take', { 
      nullable: true, 
      defaultValue: 10,
      description: 'Số records lấy ra (pagination)'
    }) 
    take?: number,
    
    @Args('include', { 
      type: () => GraphQLJSON, 
      nullable: true,
      description: 'Include relations (JSON format)'
    }) 
    include?: any,
  ) {
    // Fix: Handle undefined values
    const safeSkip = skip ?? 0;
    const safeTake = take ?? 10;
    
    // Convert skip/take to pagination format
    const page = Math.floor(safeSkip / safeTake) + 1;
    const pagination = { page, pageSize: safeTake };
    
    // Convert orderBy to sort format
    const sort = orderBy ? { 
      field: Object.keys(orderBy)[0], 
      direction: (Object.values(orderBy)[0] === 'desc' ? 'desc' : 'asc') as 'desc' | 'asc'
    } : undefined;
    
    return await this.universalService.findAll(modelName, pagination, where, sort, include);
  }

  // USER OPERATIONS
  @Query(() => UserPaginated)
  async users(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('filter', { nullable: true }) filter?: UserFilterInput,
    @Args('sort', { nullable: true }) sort?: SortInput,
  ): Promise<UserPaginated> {
    const include = {
      profile: true,
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    };

    return await this.universalService.findAll('user', pagination, filter, sort, include);
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const include = {
      profile: true,
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    };

    return await this.universalService.findById('user', id, include);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return await this.universalService.create('user', input);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    const { id, ...data } = input;
    return await this.universalService.update('user', id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.universalService.delete('user', id);
  }

  // SANPHAM OPERATIONS
  @Query(() => SanphamPaginated)
  async sanphams(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('filter', { nullable: true }) filter?: SanphamFilterInput,
    @Args('sort', { nullable: true }) sort?: SortInput,
  ): Promise<SanphamPaginated> {
    const include = {
      banggia: {
        include: {
          banggia: true,
        },
      },
      Nhacungcap: true,
    };

    // Build custom where for sanpham
    let customFilter = filter;
    if (filter) {
      const where: any = {};
      if (filter.search) {
        where.OR = [
          { title: { contains: filter.search, mode: 'insensitive' } },
          { masp: { contains: filter.search, mode: 'insensitive' } },
          { subtitle: { contains: filter.search, mode: 'insensitive' } },
        ];
      }
      if (filter.isActive !== undefined) where.isActive = filter.isActive;
      if (filter.dvt) where.dvt = { contains: filter.dvt, mode: 'insensitive' };
      if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
        where.giaban = {};
        if (filter.minPrice !== undefined) where.giaban.gte = filter.minPrice;
        if (filter.maxPrice !== undefined) where.giaban.lte = filter.maxPrice;
      }
      customFilter = where;
    }

    return await this.universalService.findAll('sanpham', pagination, customFilter, sort, include);
  }

  @Query(() => Sanpham)
  async sanpham(@Args('id') id: string): Promise<Sanpham> {
    const include = {
      banggia: {
        include: {
          banggia: true,
        },
      },
      Nhacungcap: true,
    };

    return await this.universalService.findById('sanpham', id, include);
  }

  @Mutation(() => Sanpham)
  async createSanpham(@Args('input') input: CreateSanphamInput): Promise<Sanpham> {
    return await this.universalService.create('sanpham', input);
  }

  @Mutation(() => Sanpham)
  async updateSanpham(@Args('input') input: UpdateSanphamInput): Promise<Sanpham> {
    const { id, ...data } = input;
    return await this.universalService.update('sanpham', id, data);
  }

  @Mutation(() => Boolean)
  async deleteSanpham(@Args('id') id: string): Promise<boolean> {
    return await this.universalService.delete('sanpham', id);
  }

  // KHACHHANG OPERATIONS
  @Query(() => KhachhangPaginated)
  async khachhangs(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('filter', { nullable: true }) filter?: KhachhangFilterInput,
    @Args('sort', { nullable: true }) sort?: SortInput,
  ): Promise<KhachhangPaginated> {
    const include = {
      banggia: true,
      nhomkhachhang: true,
      donhang: {
        take: 5,
        orderBy: { createdAt: 'desc' },
      },
    };

    // Build custom where for khachhang
    let customFilter = filter;
    if (filter) {
      const where: any = {};
      if (filter.search) {
        where.OR = [
          { name: { contains: filter.search, mode: 'insensitive' } },
          { makh: { contains: filter.search, mode: 'insensitive' } },
          { tenkh: { contains: filter.search, mode: 'insensitive' } },
          { diachi: { contains: filter.search, mode: 'insensitive' } },
          { sdt: { contains: filter.search, mode: 'insensitive' } },
        ];
      }
      if (filter.isActive !== undefined) where.isActive = filter.isActive;
      if (filter.loaikh) where.loaikh = filter.loaikh;
      if (filter.quan) where.quan = { contains: filter.quan, mode: 'insensitive' };
      if (filter.hiengia !== undefined) where.hiengia = filter.hiengia;
      customFilter = where;
    }

    return await this.universalService.findAll('khachhang', pagination, customFilter, sort, include);
  }

  @Query(() => Khachhang)
  async khachhang(@Args('id') id: string): Promise<Khachhang> {
    const include = {
      banggia: true,
      nhomkhachhang: true,
      donhang: {
        include: {
          sanpham: {
            include: {
              sanpham: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    };

    return await this.universalService.findById('khachhang', id, include);
  }

  @Mutation(() => Khachhang)
  async createKhachhang(@Args('input') input: CreateKhachhangInput): Promise<Khachhang> {
    return await this.universalService.create('khachhang', input);
  }

  @Mutation(() => Khachhang)
  async updateKhachhang(@Args('input') input: UpdateKhachhangInput): Promise<Khachhang> {
    const { id, ...data } = input;
    return await this.universalService.update('khachhang', id, data);
  }

  @Mutation(() => Boolean)
  async deleteKhachhang(@Args('id') id: string): Promise<boolean> {
    return await this.universalService.delete('khachhang', id);
  }

  // DONHANG OPERATIONS
  @Query(() => DonhangPaginated)
  async donhangs(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('filter', { nullable: true }) filter?: DonhangFilterInput,
    @Args('sort', { nullable: true }) sort?: SortInput,
  ): Promise<DonhangPaginated> {
    const include = {
      khachhang: true,
      sanpham: {
        include: {
          sanpham: true,
        },
      },
    };

    // Build custom where for donhang
    let customFilter = filter;
    if (filter) {
      const where: any = {};
      if (filter.search) {
        where.OR = [
          { madonhang: { contains: filter.search, mode: 'insensitive' } },
          { title: { contains: filter.search, mode: 'insensitive' } },
          { ghichu: { contains: filter.search, mode: 'insensitive' } },
        ];
      }
      if (filter.status) where.status = filter.status;
      if (filter.statuses && filter.statuses.length > 0) where.status = { in: filter.statuses };
      if (filter.khachhangId) where.khachhangId = filter.khachhangId;
      if (filter.isActive !== undefined) where.isActive = filter.isActive;
      if (filter.isshowvat !== undefined) where.isshowvat = filter.isshowvat;
      if (filter.startDate && filter.endDate) {
        where.ngaygiao = {
          gte: filter.startDate,
          lte: filter.endDate,
        };
      }
      if (filter.minTongtien !== undefined || filter.maxTongtien !== undefined) {
        where.tongtien = {};
        if (filter.minTongtien !== undefined) where.tongtien.gte = filter.minTongtien;
        if (filter.maxTongtien !== undefined) where.tongtien.lte = filter.maxTongtien;
      }
      customFilter = where;
    }

    return await this.universalService.findAll('donhang', pagination, customFilter, sort, include);
  }

  @Query(() => Donhang)
  async donhang(@Args('id') id: string): Promise<Donhang> {
    const include = {
      khachhang: true,
      sanpham: {
        include: {
          sanpham: true,
        },
      },
    };

    return await this.universalService.findById('donhang', id, include);
  }

  @Mutation(() => Donhang)
  async createDonhang(@Args('input') input: CreateDonhangInput): Promise<Donhang> {
    // Generate order code if not provided
    if (!input.title) {
      const orderCount = await (this.universalService as any).prisma.donhang.count();
      input.title = `DH${String(orderCount + 1).padStart(6, '0')}`;
    }

    return await this.universalService.create('donhang', input);
  }

  @Mutation(() => Donhang)
  async updateDonhang(@Args('input') input: UpdateDonhangInput): Promise<Donhang> {
    const { id, ...data } = input;
    return await this.universalService.update('donhang', id, data);
  }

  @Mutation(() => Boolean)
  async deleteDonhang(@Args('id') id: string): Promise<boolean> {
    return await this.universalService.delete('donhang', id);
  }

  // KHO OPERATIONS
  @Query(() => KhoPaginated)
  async khos(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('filter', { nullable: true }) filter?: KhoFilterInput,
    @Args('sort', { nullable: true }) sort?: SortInput,
  ): Promise<KhoPaginated> {
    const include = {
      congty: true,
      sanphamKho: {
        include: {
          sanpham: true,
        },
      },
    };

    return await this.universalService.findAll('kho', pagination, filter, sort, include);
  }

  @Query(() => Kho)
  async kho(@Args('id') id: string): Promise<Kho> {
    const include = {
      congty: true,
      sanphamKho: {
        include: {
          sanpham: true,
        },
      },
      phieukho: {
        take: 10,
        orderBy: { createdAt: 'desc' },
      },
    };

    return await this.universalService.findById('kho', id, include);
  }

  @Mutation(() => Kho)
  async createKho(@Args('input') input: CreateKhoInput): Promise<Kho> {
    return await this.universalService.create('kho', input);
  }

  @Mutation(() => Kho)
  async updateKho(@Args('input') input: UpdateKhoInput): Promise<Kho> {
    const { id, ...data } = input;
    return await this.universalService.update('kho', id, data);
  }

  @Mutation(() => Boolean)
  async deleteKho(@Args('id') id: string): Promise<boolean> {
    return await this.universalService.delete('kho', id);
  }

  // PHIEUKHO OPERATIONS
  @Query(() => PhieuKhoPaginated)
  async phieukhos(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('filter', { nullable: true }) filter?: PhieuKhoFilterInput,
    @Args('sort', { nullable: true }) sort?: SortInput,
  ): Promise<PhieuKhoPaginated> {
    const include = {
      kho: true,
      donhang: true,
      sanpham: {
        include: {
          sanpham: true,
        },
      },
    };

    return await this.universalService.findAll('phieuKho', pagination, filter, sort, include);
  }

  @Query(() => PhieuKho)
  async phieukho(@Args('id') id: string): Promise<PhieuKho> {
    const include = {
      kho: true,
      donhang: true,
      sanpham: {
        include: {
          sanpham: true,
        },
      },
    };

    return await this.universalService.findById('phieuKho', id, include);
  }

  @Mutation(() => PhieuKho)
  async createPhieuKho(@Args('input') input: CreatePhieuKhoInput): Promise<PhieuKho> {
    return await this.universalService.create('phieuKho', input);
  }

  @Mutation(() => PhieuKho)
  async updatePhieuKho(@Args('input') input: UpdatePhieuKhoInput): Promise<PhieuKho> {
    const { id, ...data } = input;
    return await this.universalService.update('phieuKho', id, data);
  }

  @Mutation(() => Boolean)
  async deletePhieuKho(@Args('id') id: string): Promise<boolean> {
    return await this.universalService.delete('phieuKho', id);
  }

  // TONKHO OPERATIONS
  @Query(() => TonKhoPaginated)
  async tonkhos(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('filter', { nullable: true }) filter?: TonKhoFilterInput,
    @Args('sort', { nullable: true }) sort?: SortInput,
  ): Promise<TonKhoPaginated> {
    const include = {
      sanpham: true,
    };

    return await this.universalService.findAll('tonKho', pagination, filter, sort, include);
  }

  @Query(() => TonKho)
  async tonkho(@Args('id') id: string): Promise<TonKho> {
    const include = {
      sanpham: true,
    };

    return await this.universalService.findById('tonKho', id, include);
  }

  // UNIVERSAL SEARCH
  @Query(() => String)
  async universalSearch(
    @Args('model') model: string,
    @Args('searchTerm') searchTerm: string,
    @Args('searchFields', { type: () => [String] }) searchFields: string[],
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ) {
    const result = await this.universalService.search(model, searchTerm, searchFields, pagination);
    return JSON.stringify(result);
  }

  // STATISTICS
  @Query(() => String)
  async getModelStats(@Args('model') model: string) {
    const stats = await this.universalService.getStats(model);
    return JSON.stringify(stats);
  }

  // BULK OPERATIONS
  @Mutation(() => String)
  async bulkCreate(
    @Args('model') model: string,
    @Args('data') data: string, // JSON string
  ) {
    const parsedData = JSON.parse(data);
    const result = await this.universalService.bulkCreate(model, parsedData);
    return JSON.stringify(result);
  }

  @Mutation(() => Boolean)
  async bulkDelete(
    @Args('model') model: string,
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Promise<boolean> {
    await this.universalService.bulkDelete(model, ids);
    return true;
  }
}

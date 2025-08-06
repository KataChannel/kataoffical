import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UniversalService {
  constructor(private readonly prisma: PrismaService) {}

  // Generic method để find nhiều records
  async findMany(modelName: string, args: any = {}) {
    const {
      where = {},
      orderBy = [],
      skip = 0,
      take = 10,
      include = {},
      select = undefined,
    } = args;

    try {
      const model = this.getModel(modelName);
      
      const query: any = {
        where,
        orderBy,
        skip,
        take,
      };

      if (select) {
        query.select = select;
      } else if (Object.keys(include).length > 0) {
        query.include = include;
      }

      const [data, total] = await Promise.all([
        model.findMany(query),
        model.count({ where }),
      ]);

      return {
        data,
        total,
        page: Math.floor(skip / take) + 1,
        pageSize: take,
        totalPages: Math.ceil(total / take),
        hasNextPage: skip + take < total,
        hasPreviousPage: skip > 0,
      };
    } catch (error) {
      throw new Error(`Error finding ${modelName}: ${error.message}`);
    }
  }

  // Generic method để find một record
  async findUnique(modelName: string, args: any) {
    try {
      const model = this.getModel(modelName);
      return await model.findUnique(args);
    } catch (error) {
      throw new Error(`Error finding unique ${modelName}: ${error.message}`);
    }
  }

  // Generic method để tạo record
  async create(modelName: string, data: any) {
    try {
      const model = this.getModel(modelName);
      return await model.create({ data });
    } catch (error) {
      throw new Error(`Error creating ${modelName}: ${error.message}`);
    }
  }

  // Generic method để update record
  async update(modelName: string, where: any, data: any) {
    try {
      const model = this.getModel(modelName);
      return await model.update({ where, data });
    } catch (error) {
      throw new Error(`Error updating ${modelName}: ${error.message}`);
    }
  }

  // Generic method để delete record
  async delete(modelName: string, where: any) {
    try {
      const model = this.getModel(modelName);
      return await model.delete({ where });
    } catch (error) {
      throw new Error(`Error deleting ${modelName}: ${error.message}`);
    }
  }

  // Generic method để upsert record
  async upsert(modelName: string, where: any, create: any, update: any) {
    try {
      const model = this.getModel(modelName);
      return await model.upsert({ where, create, update });
    } catch (error) {
      throw new Error(`Error upserting ${modelName}: ${error.message}`);
    }
  }

  // Generic aggregate method
  async aggregate(modelName: string, args: any) {
    try {
      const model = this.getModel(modelName);
      return await model.aggregate(args);
    } catch (error) {
      throw new Error(`Error aggregating ${modelName}: ${error.message}`);
    }
  }

  // Generic group by method
  async groupBy(modelName: string, args: any) {
    try {
      const model = this.getModel(modelName);
      return await model.groupBy(args);
    } catch (error) {
      throw new Error(`Error grouping ${modelName}: ${error.message}`);
    }
  }

  // Method để lấy model từ Prisma client
  private getModel(modelName: string) {
    console.log(`Getting model: ${modelName}`);
    
    const normalizedModelName = this.normalizeModelName(modelName);
    const model = (this.prisma as any)[normalizedModelName];
    
    if (!model) {
      throw new Error(`Model ${modelName} not found in Prisma client`);
    }
    
    return model;
  }

  // Normalize model name (PascalCase to camelCase)
  private normalizeModelName(modelName: string): string {
    // Convert PascalCase to camelCase
    return modelName.charAt(0).toLowerCase() + modelName.slice(1);
  }

  // Method để lấy danh sách tất cả models
  getAvailableModels(): string[] {
    return [
      'user',
      'role', 
      'userRole',
      'permission',
      'rolePermission',
      'menu',
      'profile',
      'banggia',
      'khachhang',
      'nhomkhachhang', 
      'sanpham',
      'donhang',
      'donhangsanpham',
      'dathang',
      'dathangsanpham',
      'kho',
      'sanphamKho',
      'phieuKho',
      'phieuKhoSanpham',
      'tonKho',
      'chotkho',
      'auditLog',
      'danhmuc',
      'danhmucsanpham',
      'banggiasanpham',
      'nhacungcap',
      'dathang',
      'dathangsanpham',
      'kho',
      'sanphamKho',
      'phieuKho',
      'phieuKhoSanpham',
      'tonKho',
      'chotkho',
      'auditLog',
    ];
  }

  // Method để lấy schema info của model
  async getModelInfo(modelName: string) {
    const model = this.getModel(modelName);
    
    return {
      modelName,
      availableOperations: [
        'findMany',
        'findUnique',
        'create', 
        'update',
        'delete',
        'upsert',
        'aggregate',
        'groupBy'
      ]
    };
  }
}

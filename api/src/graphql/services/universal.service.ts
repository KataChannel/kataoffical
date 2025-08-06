import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PaginationInput, SortInput, FilterInput } from '../types/common.types';

@Injectable()
export class UniversalGraphQLService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generic find all with pagination
   */
  async findAll(
    model: string,
    pagination: PaginationInput = { page: 1, pageSize: 10 },
    filter?: FilterInput,
    sort?: SortInput,
    include?: any
  ) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;

    // Build where clause
    const where = this.buildWhereClause(filter);

    // Build orderBy clause
    const orderBy = sort ? { [sort.field]: sort.direction } : { createdAt: 'desc' };

    try {
      const [data, total] = await Promise.all([
        (this.prisma as any)[model].findMany({
          skip,
          take: pageSize,
          where,
          orderBy,
          include,
        }),
        (this.prisma as any)[model].count({ where }),
      ]);

      const totalPages = Math.ceil(total / pageSize);

      return {
        data,
        pagination: {
          total,
          page,
          pageSize,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error querying ${model}: ${error.message}`);
    }
  }

  /**
   * Generic find by ID
   */
  async findById(model: string, id: string, include?: any) {
    try {
      const result = await (this.prisma as any)[model].findUnique({
        where: { id },
        include,
      });

      if (!result) {
        throw new NotFoundException(`${model} with ID ${id} not found`);
      }

      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error finding ${model}: ${error.message}`);
    }
  }

  /**
   * Generic create
   */
  async create(model: string, data: any, include?: any) {
    try {
      return await (this.prisma as any)[model].create({
        data,
        include,
      });
    } catch (error) {
      throw new BadRequestException(`Error creating ${model}: ${error.message}`);
    }
  }

  /**
   * Generic update
   */
  async update(model: string, id: string, data: any, include?: any) {
    try {
      // Check if record exists
      await this.findById(model, id);

      return await (this.prisma as any)[model].update({
        where: { id },
        data,
        include,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error updating ${model}: ${error.message}`);
    }
  }

  /**
   * Generic delete
   */
  async delete(model: string, id: string) {
    try {
      // Check if record exists
      await this.findById(model, id);

      await (this.prisma as any)[model].delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error deleting ${model}: ${error.message}`);
    }
  }

  /**
   * Bulk operations
   */
  async bulkCreate(model: string, data: any[]) {
    try {
      return await (this.prisma as any)[model].createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error) {
      throw new BadRequestException(`Error bulk creating ${model}: ${error.message}`);
    }
  }

  async bulkUpdate(model: string, updates: { id: string; data: any }[]) {
    try {
      const results = await Promise.all(
        updates.map(({ id, data }) =>
          (this.prisma as any)[model].update({
            where: { id },
            data,
          })
        )
      );
      return results;
    } catch (error) {
      throw new BadRequestException(`Error bulk updating ${model}: ${error.message}`);
    }
  }

  async bulkDelete(model: string, ids: string[]) {
    try {
      return await (this.prisma as any)[model].deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(`Error bulk deleting ${model}: ${error.message}`);
    }
  }

  /**
   * Search functionality
   */
  async search(
    model: string,
    searchTerm: string,
    searchFields: string[],
    pagination: PaginationInput = { page: 1, pageSize: 10 },
    include?: any
  ) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;

    // Build search where clause
    const where = {
      OR: searchFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    };

    try {
      const [data, total] = await Promise.all([
        (this.prisma as any)[model].findMany({
          skip,
          take: pageSize,
          where,
          include,
          orderBy: { createdAt: 'desc' },
        }),
        (this.prisma as any)[model].count({ where }),
      ]);

      const totalPages = Math.ceil(total / pageSize);

      return {
        data,
        pagination: {
          total,
          page,
          pageSize,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new BadRequestException(`Error searching ${model}: ${error.message}`);
    }
  }

  /**
   * Get statistics
   */
  async getStats(model: string) {
    try {
      const total = await (this.prisma as any)[model].count();
      const active = await (this.prisma as any)[model].count({
        where: { isActive: true },
      });
      const inactive = total - active;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const createdToday = await (this.prisma as any)[model].count({
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      });

      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      const createdThisWeek = await (this.prisma as any)[model].count({
        where: {
          createdAt: {
            gte: lastWeek,
          },
        },
      });

      return {
        total,
        active,
        inactive,
        createdToday,
        createdThisWeek,
      };
    } catch (error) {
      throw new BadRequestException(`Error getting stats for ${model}: ${error.message}`);
    }
  }

  /**
   * Private helper methods
   */
  private buildWhereClause(filter?: FilterInput) {
    if (!filter) return {};

    const where: any = {};

    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search, mode: 'insensitive' } },
        { name: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    if (filter.startDate && filter.endDate) {
      where.createdAt = {
        gte: filter.startDate,
        lte: filter.endDate,
      };
    } else if (filter.startDate) {
      where.createdAt = { gte: filter.startDate };
    } else if (filter.endDate) {
      where.createdAt = { lte: filter.endDate };
    }

    if (filter.ids && filter.ids.length > 0) {
      where.id = { in: filter.ids };
    }

    if (filter.isActive !== undefined) {
      where.isActive = filter.isActive;
    }

    return where;
  }
}

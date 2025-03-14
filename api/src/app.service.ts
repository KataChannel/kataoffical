import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SearchDto } from './app.dto';
@Injectable()
export class AppService {

  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  // Chỉ cho phép tìm kiếm trên các bảng này
  private allowedModels = ['users', 'posts', 'profiles','khachhang'];

  async search(searchDto: SearchDto) {
    const { model, filters = {}, relations = {}, orderBy, skip = 0, take } = searchDto;
  
    if (!this.allowedModels.includes(model)) {
      throw new BadRequestException(`Model "${model}" không tồn tại`);
    }
  
    // Xây dựng WHERE
    const where = this.buildWhereClause(filters);
    console.log(JSON.stringify(where));
    
    // Xây dựng Prisma Query
    const prismaQuery: any = { where, skip: Number(skip) };
  
    // Nếu take không được truyền vào hoặc bằng -1, không giới hạn số lượng
    if (take !== undefined && take !== -1) {
      prismaQuery.take = Number(take);
    }
  
    // Xử lý quan hệ (include)
    const include = this.buildIncludeClause(relations);
    if (include) prismaQuery.include = include;
  
    // Xử lý orderBy
    if (orderBy?.field && orderBy?.direction) {
      prismaQuery.orderBy = {
        [orderBy.field]: orderBy.direction.toLowerCase() === 'desc' ? 'desc' : 'asc',
      };
    }
    const result = await this.prisma[model].findMany(prismaQuery);
    console.log(result);
    return result
  }
  

  // Xây dựng WHERE với hỗ trợ OR + lọc theo quan hệ
  private buildWhereClause(filters: any) {
    const where: any = {};

    Object.keys(filters).forEach((key) => {
      if (key === 'OR' && Array.isArray(filters[key])) {
        where.OR = filters[key].map((condition) => this.buildWhereClause(condition));
      } else {
        const { value, type } = filters[key];
        console.log(value, type);
        
        if (value !== undefined && type) {
          where[key] = { [type]: isNaN(value) ? value : Number(value) };
        }
      }
    });

    return where;
  }

  // Xây dựng Include với lọc trên quan hệ
  private buildIncludeClause(relations: any) {
    const include: any = {};

    Object.keys(relations).forEach((relation) => {
      if (relations[relation].include) {
        include[relation] = { include: true };

        if (relations[relation].filters) {
          include[relation].where = this.buildWhereClause(relations[relation].filters);
        }
      }
    });
    console.log(include);
    
    return include;
  }
}

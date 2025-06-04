import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SearchDto } from './app.dto';
import { createHmac } from 'crypto';
import { CallbackDataDetail } from './callback/dto/callback-data-detail.dto';
import { CallbackDataInput } from './callback/dto/callback-data-input.dto';
import { CallbackDataOutput } from './callback/dto/callback-data-output.dto';
import { CallBackDataType } from './callback/enums/callback-data-type.enum';
@Injectable()
export class AppService {

  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  // Chỉ cho phép tìm kiếm trên các bảng này
  private allowedModels = ['sanpham','banggia','khachhang','donhang','nhacungcap','dathang','kho','phieukho','role','permission','nhomkhachhang'];

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
          where[key] = { [type]: isNaN(value) ? value : value };
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


  async getLastUpdated(table: string) {
    // Kiểm tra xem bảng có hợp lệ không
    const validTables = ['sanpham', 'banggia', 'donhang', 'khachhang', 'nhacungcap', 'dathang', 'kho', 'phieukho', 'role', 'permission', 'nhomkhachhang'];
    if (!validTables.includes(table)) {
      throw new BadRequestException(`Invalid table name: ${table}`);
    }

    // Truy vấn bảng tương ứng
    const lastUpdated = await this.prisma[table].aggregate({
      _max: { updatedAt: true },
    });
    return { table, updatedAt: new Date(lastUpdated._max.updatedAt).getTime() || 0 };
  }






  private readonly appId = '2d4b6324-04aa-4dbc-a85c-815fb0099057'; // Replace with your MISA-provided app_id
  
    async processCallback(param: CallbackDataInput): Promise<CallbackDataOutput> {
      const result = new CallbackDataOutput();
  
      try {
        // Validate signature
        const signature = this.generateSHA256HMAC(param.data || '', this.appId);
        console.log('signature', signature);
        console.log('param signature', param.signature);
        
        if (signature !== param.signature) {
          result.Success = false;
          result.ErrorCode = 'InvalidParam';
          result.ErrorMessage = 'Signature invalid';
          return result;
        }
  
        // Process callback in a non-blocking way
        this.doCallBackData(param).catch((err) =>
          console.error('Error processing callback:', err),
        );
      } catch (ex) {
        result.Success = false;
        result.ErrorCode = 'Exception';
        result.ErrorMessage = ex.message;
      }
  
      return result;
    }
  
    private async doCallBackData(param: CallbackDataInput): Promise<void> {
      if (!param) return;
  
      // Save callback data (implement your storage logic)
      this.saveCallBack(param);
  
      switch (param.data_type) {
        case CallBackDataType.SaveVoucher:
        case CallBackDataType.DeleteVoucher:
          const data: CallbackDataDetail[] = param.data
            ? JSON.parse(param.data)
            : [];
          if (data && data.length > 0) {
            for (const item of data) {
              // Update status for each org_refid (implement your logic)
              console.log(`Processing org_refid: ${item.org_refid}`);
            }
          }
          break;
        default:
          break;
      }
  
      // Delete callback after processing (implement your storage logic)
      this.deleteCallBack(param);
    }
  
    private saveCallBack(param: CallbackDataInput): void {
      // Implement storage logic (e.g., save to DB or file)
      console.log('Saving callback:', param);
    }
  
    private deleteCallBack(param: CallbackDataInput): void {
      // Implement deletion logic (e.g., remove from DB or file)
      console.log('Deleting callback:', param);
    }
  
    private generateSHA256HMAC(input: string, key: string): string {
      input = input || '';
      const hmac = createHmac('sha256', key);
      hmac.update(input);
      return hmac.digest('hex').toLowerCase();
    }
}

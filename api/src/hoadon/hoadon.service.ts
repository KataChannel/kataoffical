import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from './socket.gateway'; // Giả định SocketGateway ở ngoài thư mục module specific
import axios from 'axios';
@Injectable()
export class HoadonService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}


  // Cần chỉnh sửa logic cụ thể của các phương thức để phù hợp với module mới
  async getLastUpdatedHoadon() {
    try {
      // Giả định có model Prisma cho module này với trường updatedAt
      const lastUpdated = await this.prisma.hoadon.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedHoadon', error);
      throw error;
    }
  }

  // Cần chỉnh sửa logic tạo ID nếu có (ví dụ: I1 -> U1 cho user)
  async generateCodeId() {

  }

  async create(data: any) {
    try {
      const created = await this.prisma.hoadon.create({ data });
      
      this._SocketGateway.sendHoadonUpdate(); // Event socket có thể cần tên khác
      return created;
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma unique constraint failed
        throw new BadRequestException('Hóa đơn đã tồn tại.');
      }
      this._ErrorlogService.logError('createHoadon', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { page = 1, limit = 20, ...where } = param;
      const skip = (page - 1) * limit;
      // Giả định có model Prisma cho module này
      const [data, total] = await Promise.all([
        this.prisma.hoadon.findMany({
          where,
          skip,
          take: limit,
          orderBy: { updatedAt: 'desc' },
        }),
        this.prisma.hoadon.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findBy hoadon', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      // Giả định có model Prisma cho module này
      const [data, total] = await Promise.all([
        this.prisma.hoadon.findMany({
          skip,
          take: limit,
          orderBy: { updatedAt: 'desc' },
        }),
        this.prisma.hoadon.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findAll hoadon', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      // Giả định có model Prisma cho module này
      const hoadon = await this.prisma.hoadon.findUnique({ where: { id } });
      if (!hoadon) throw new NotFoundException('Hoadon not found');
      return hoadon;
    } catch (error) {
      this._ErrorlogService.logError('findOne hoadon', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      // Cần kiểm tra logic update có trường 'order' hay không
      updated = await this.prisma.hoadon.update({ where: { id }, data });
      this._SocketGateway.sendHoadonUpdate(); // Event socket có thể cần tên khác
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateHoadon', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      // Giả định có model Prisma cho module này
      const deleted = await this.prisma.hoadon.delete({ where: { id } });
      this._SocketGateway.sendHoadonUpdate(); // Event socket có thể cần tên khác
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeHoadon', error);
      throw error;
    }
  }

  // Cần chỉnh sửa logic sắp xếp lại nếu có
  async reorderHoadons(hoadonIds: string[]) {

  }
}

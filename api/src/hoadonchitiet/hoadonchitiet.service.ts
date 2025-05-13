import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from './socket.gateway'; // Giả định SocketGateway ở ngoài thư mục module specific

@Injectable()
export class hoadonChitietService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  // Cần chỉnh sửa logic cụ thể của các phương thức để phù hợp với module mới
  async getLastUpdatedhoadonChitiet() {
    try {
      // Giả định có model Prisma cho module này với trường updatedAt
      const lastUpdated = await this.prisma.hoadonChitiet.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedhoadonChitiet', error);
      throw error;
    }
  }

  // Cần chỉnh sửa logic tạo ID nếu có (ví dụ: I1 -> U1 cho user)


  async create(data: any) {
    try {
      // nếu có idhdon thì tìm Hóa đơn và nối qua quan hệ hoadon
      const { idhdon, ...payload } = data;
      if (idhdon) {
        const hoadon = await this.prisma.hoadon.findUnique({
          where: { id: idhdon },
        });
        if (!hoadon) {
          throw new NotFoundException('Hóa đơn không tồn tại');
        }
        payload.hoadon = { connect: { id: hoadon.id } };
      }
      const created = await this.prisma.hoadonChitiet.create({ data: payload });
      this._SocketGateway.sendHoadonchitietUpdate(); // Event socket có thể cần tên khác
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createhoadonChitiet', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { page = 1, limit = 20, ...where } = param;
      const skip = (page - 1) * limit;
      // Giả định có model Prisma cho module này
      const [data, total] = await Promise.all([
        this.prisma.hoadonChitiet.findMany({
          where,
          skip,
          take: limit,
          orderBy: { updatedAt: 'asc' }, // Có thể cần thay đổi orderBy
        }),
        this.prisma.hoadonChitiet.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findBy hoadonChitiet', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      // Giả định có model Prisma cho module này
      const [data, total] = await Promise.all([
        this.prisma.hoadonChitiet.findMany({
          skip,
          take: limit,
          orderBy: { updatedAt: 'asc' }, // Có thể cần thay đổi orderBy
        }),
        this.prisma.hoadonChitiet.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findAll hoadonChitiet', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      // Giả định có model Prisma cho module này
      const hoadonChitiet = await this.prisma.hoadonChitiet.findUnique({ where: { id } });
      if (!hoadonChitiet) throw new NotFoundException('hoadonChitiet not found');
      return hoadonChitiet;
    } catch (error) {
      this._ErrorlogService.logError('findOne hoadonChitiet', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      updated = await this.prisma.hoadonChitiet.update({ where: { id }, data });
      this._SocketGateway.sendHoadonchitietUpdate(); // Event socket có thể cần tên khác
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updatehoadonChitiet', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      // Giả định có model Prisma cho module này
      const deleted = await this.prisma.hoadonChitiet.delete({ where: { id } });
      this._SocketGateway.sendHoadonchitietUpdate(); // Event socket có thể cần tên khác
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removehoadonChitiet', error);
      throw error;
    }
  }

  // Cần chỉnh sửa logic sắp xếp lại nếu có
  async reorderhoadonChitiets(hoadonChitietIds: string[]) {

  }
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from './socket.gateway';
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';

@Injectable()
export class UserguideService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogsService,
  ) {}

  async getLastUpdatedUserguide(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.userguidStep.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedUserguide', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.userguidStep.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const match = latest.codeId.match(/I1(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `I1${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateCodeId', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.userguidStep.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.userguidStep.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUserguideUpdate();
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createUserguide', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { page = 1, limit = 20, ...where } = param;
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.userguidStep.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
          include: { UserguidBlocks: true },
        }),
        this.prisma.userguidStep.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByUserguide', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.userguidStep.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.userguidStep.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllUserguide', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.userguidStep.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Userguide not found');
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneUserguide', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    console.log('update data', data);
    
    try {
      const { UserguidBlocks, ...rest } = data;
      // First, update the base userguide data without UserguidBlocks
      const updatedUserguide = await this.prisma.userguidStep.update({
        where: { id },
        data: {
          ...rest,
        },
      });

      // Then, update or create each UserguidBlock as needed
      if (UserguidBlocks && Array.isArray(UserguidBlocks)) {
        await Promise.all(
          UserguidBlocks.map(async (block: any) => {
        if (block.id) {
          // Nếu có id, cập nhật các thông tin của block hiện có
          await this.prisma.userguidBlock.update({
            where: { id: block.id },
            data: block,
          });
        } else {
          // Nếu chưa có id, tạo mới block và liên kết với userguide hiện tại
          await this.prisma.userguidBlock.create({
            data: { ...block, stepId: id },
          });
        }
          })
        );
      }
      this._SocketGateway.sendUserguideUpdate();
      return updatedUserguide;
    } catch (error) {
      console.log('Error updating userguide:', error);
      
      throw new InternalServerErrorException('Lỗi khi cập nhật userguide', { cause: error });
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.userguidStep.delete({ where: { id } });
      this._SocketGateway.sendUserguideUpdate();
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeUserguide', error);
      throw error;
    }
  }

  async reorderUserguides(userguideIds: string[]) {
    try {
      for (let i = 0; i < userguideIds.length; i++) {
        await this.prisma.userguidStep.update({
          where: { id: userguideIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUserguideUpdate();
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderUserguides', error);
      throw error;
    }
  }
}
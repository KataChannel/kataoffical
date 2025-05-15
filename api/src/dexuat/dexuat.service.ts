import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';


@Injectable()
export class DexuatService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedDexuat() {
    try {
      const lastUpdated = await this.prisma.dexuat.aggregate({
        _max: {
          updatedAt: true,
        },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedDexuat',error);
      throw error;
    }
  }

  async generatecodeId(): Promise<string> {
    try {
      const latest = await this.prisma.dexuat.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest) {
        const match = latest.codeId.match(/DX(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `DX${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generatecodeId',error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      let newOrder: number;
      const maxOrder = await this.prisma.dexuat.aggregate({
        _max: { order: true },
      });
      newOrder = (maxOrder._max?.order || 0) + 1;
      this._SocketGateway.sendUpdate('dexuat');
      const codeId = await this.generatecodeId();      
      const { chitiet, ...dexuatData } = data;
      return this.prisma.dexuat.create({
        data: {
          ...dexuatData,
          order: newOrder,
          codeId: codeId,
          chitiet: chitiet && Array.isArray(chitiet) ? {
            create: chitiet.map(({ id,dexuatId, ...rest }) => rest) // ❌ Loại bỏ ID
          } : undefined
        },
        include: {
          chitiet: true
        }
      });
    } catch (error) {
      this._ErrorlogService.logError('createDexuat', error);
      throw error;
    }
  }
  

  async reorderDexuats(dexuatIds: string[]) {
    try {
      for (let i = 0; i < dexuatIds.length; i++) {
        await this.prisma.dexuat.update({
          where: { id: dexuatIds[i] },
          data: { order: i + 1 },
        });
      }
    } catch (error) {
      this._ErrorlogService.logError('reorderDexuats',error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.dexuat.findMany();
    } catch (error) {
      this._ErrorlogService.logError('findAll',error);
      throw error;
    }
  }

  async findby(param: any) {
    try {
      const dexuat = await this.prisma.dexuat.findUnique(
        {
           where: param,
           include:{chitiet:true} 
        }
      );
      if (!dexuat) throw new NotFoundException('Dexuat not found');
      return dexuat;
    } catch (error) {
      this._ErrorlogService.logError('findby',error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const dexuat = await this.prisma.dexuat.findUnique({ where: { id } });
      if (!dexuat) throw new NotFoundException('Dexuat not found');
      return dexuat;
    } catch (error) {
      this._ErrorlogService.logError('findOne',error);
      throw error;
    }
  }

  // async update(id: string, data: any) {
  //   try {
  //     if (data.order) {
  //       const { order, ...rest } = data;
  //       await this.prisma.dexuat.update({ where: { id }, data: rest });
  //       await this.prisma.dexuat.update({ where: { id }, data: { order } });
  //     }
  //     this._SocketGateway.sendDexuatUpdate();
  //     return this.prisma.dexuat.update({ where: { id }, data });
  //   } catch (error) {
  //     this._ErrorlogService.logError('updateDexuat',error);
  //     throw error;
  //   }
  // }
  async update(id: string, data: any) {
    try {
      const { chitiet, ...dexuatData } = data;
      
      // Update main dexuat record
      const updatedDexuat = await this.prisma.dexuat.update({
        where: { id },
        data: {
          ...dexuatData,
          updatedAt: new Date(),
        },
      });

      if (chitiet?.length) {
        // Process chitiet records (upsert and delete)
        const existingIds = (await this.prisma.chitietDexuat.findMany({
          where: { dexuatId: id },
          select: { id: true },
        })).map(item => item.id);
        
        const payloadIds = chitiet.map(item => item.id).filter(Boolean);
        
        // Delete removed items
        await this.prisma.chitietDexuat.deleteMany({
          where: { 
            dexuatId: id,
            id: { notIn: payloadIds }
          },
        });

        // Upsert items (create or update)
        await Promise.all(
          chitiet.map(item => {
            const { id: itemId, ...itemData } = item;
            return this.prisma.chitietDexuat.upsert({
              where: { id: itemId || 'new-id' }, // Use a placeholder for new items
              update: itemData,
              create: { ...itemData, dexuatId: id },
            });
          })
        );
      }

      this._SocketGateway.sendUpdate('dexuat');
      return this.prisma.dexuat.findUnique({
        where: { id },
        include: { chitiet: true }
      });
    } catch (error) {
      this._ErrorlogService.logError('update', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      this._SocketGateway.sendUpdate('dexuat');
      return this.prisma.dexuat.delete({ where: { id } });
    } catch (error) {
      this._ErrorlogService.logError('removeDexuat',error);
      throw error;
    }
  }
}
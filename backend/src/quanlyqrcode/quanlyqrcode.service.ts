import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
@Injectable()
export class QuanlyqrcodeService {
  constructor(
    private readonly prisma: PrismaService,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedquanlyqrcode() {
    try {
      const lastUpdated = await this.prisma.quanlyqrcode.aggregate({
        _max: {
          updatedAt: true,
        },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedquanlyqrcode',error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      return this.prisma.quanlyqrcode.create({data});
    } catch (error) {
      this._ErrorlogService.logError('createquanlyqrcode',error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.quanlyqrcode.findMany();
    } catch (error) {
      this._ErrorlogService.logError('findAll',error);
      throw error;
    }
  }

  async findby(param: any) {
    console.log('findby',param);
    
    try {
      const quanlyqrcode = await this.prisma.quanlyqrcode.findUnique({ where: param });
      return quanlyqrcode;
    } catch (error) {
      this._ErrorlogService.logError('findby',error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const quanlyqrcode = await this.prisma.quanlyqrcode.findUnique({ where: { id } });
      if (!quanlyqrcode) throw new NotFoundException('quanlyqrcode not found');
      return quanlyqrcode;
    } catch (error) {
      this._ErrorlogService.logError('findOne',error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      return this.prisma.quanlyqrcode.update({ where: { id }, data });
    } catch (error) {
      this._ErrorlogService.logError('updatequanlyqrcode',error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.quanlyqrcode.delete({ where: { id } });
    } catch (error) {
      this._ErrorlogService.logError('removequanlyqrcode',error);
      throw error;
    }
  }
}
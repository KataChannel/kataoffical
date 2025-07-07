import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';


@Injectable()
export class leadService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedlead() {
    try {
      const lastUpdated = await this.prisma.lead.aggregate({
        _max: {
          updatedAt: true,
        },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedlead',error);
      throw error;
    }
  }

  async generateCode(): Promise<string> {
    try {
      const latest = await this.prisma.lead.findFirst({
        orderBy: { code: 'desc' },
      });

      let nextNumber = 1;
      if (latest) {
        const match = latest.code ? latest.code.match(/I1(d+)/) : null;
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      return `TMN-L${nextNumber.toString().padStart(7, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateCode',error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      let newOrder: number;
      const maxOrder = await this.prisma.lead.aggregate({
        _max: { order: true },
      });
      newOrder = (maxOrder._max?.order || 0) + 1;
      this._SocketGateway.sendleadUpdate();
      const code = data.code?data.code: await this.generateCode();
      return this.prisma.lead.create({
        data: {
          ...data,
          order: newOrder,
          code: code,
        },
      });
    } catch (error) {
      this._ErrorlogService.logError('createlead',error);
      throw error;
    }
  }

  async reorderleads(leadIds: string[]) {
    try {
      for (let i = 0; i < leadIds.length; i++) {
        await this.prisma.lead.update({
          where: { id: leadIds[i] },
          data: { order: i + 1 },
        });
      }
    } catch (error) {
      this._ErrorlogService.logError('reorderleads',error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.lead.findMany();
    } catch (error) {
      this._ErrorlogService.logError('findAll',error);
      throw error;
    }
  }

  async findby(param: any) {
    try {
      const lead = await this.prisma.lead.findUnique({ where: param });
      if (!lead) throw new NotFoundException('lead not found');
      return lead;
    } catch (error) {
      this._ErrorlogService.logError('findby',error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const lead = await this.prisma.lead.findUnique({ where: { id } });
      if (!lead) throw new NotFoundException('lead not found');
      return lead;
    } catch (error) {
      this._ErrorlogService.logError('findOne',error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.lead.update({ where: { id }, data: rest });
        await this.prisma.lead.update({ where: { id }, data: { order } });
      }
      this._SocketGateway.sendleadUpdate();
      return this.prisma.lead.update({ where: { id }, data });
    } catch (error) {
      this._ErrorlogService.logError('updatelead',error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      this._SocketGateway.sendleadUpdate();
      return this.prisma.lead.delete({ where: { id } });
    } catch (error) {
      this._ErrorlogService.logError('removelead',error);
      throw error;
    }
  }
}
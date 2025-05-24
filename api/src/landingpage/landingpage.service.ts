import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';


@Injectable()
export class landingPageService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedlandingPage() {
    try {
      const lastUpdated = await this.prisma.landingPage.aggregate({
        _max: {
          updatedAt: true,
        },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedlandingPage',error);
      throw error;
    }
  }

  async generatecodeId(): Promise<string> {
    try {
      const latest = await this.prisma.landingPage.findFirst({
        orderBy: { codeId: 'desc' },
      });

      let nextNumber = 1;
      if (latest) {
        const match = latest.codeId.match(/LDP(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      return `LDP${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generatecodeId',error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      let newOrder: number;
      const maxOrder = await this.prisma.landingPage.aggregate({
        _max: { order: true },
      });
      newOrder = (maxOrder._max?.order || 0) + 1;
     this._SocketGateway.sendUpdate('landingPage');
      const codeId = await this.generatecodeId();
      return this.prisma.landingPage.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId,
        },
      });
    } catch (error) {
      this._ErrorlogService.logError('createlandingPage',error);
      throw error;
    }
  }

  async reorderlandingPages(landingPageIds: string[]) {
    try {
      for (let i = 0; i < landingPageIds.length; i++) {
        await this.prisma.landingPage.update({
          where: { id: landingPageIds[i] },
          data: { order: i + 1 },
        });
      }
    } catch (error) {
      this._ErrorlogService.logError('reorderlandingPages',error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.landingPage.findMany();
    } catch (error) {
      this._ErrorlogService.logError('findAll',error);
      throw error;
    }
  }

  async findby(param: any) {
    try {
      const landingPage = await this.prisma.landingPage.findUnique({ where: param });
      if (!landingPage) throw new NotFoundException('landingPage not found');
      return landingPage;
    } catch (error) {
      this._ErrorlogService.logError('findby',error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const landingPage = await this.prisma.landingPage.findUnique({ where: { id } });
      if (!landingPage) throw new NotFoundException('landingPage not found');
      return landingPage;
    } catch (error) {
      this._ErrorlogService.logError('findOne',error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.landingPage.update({ where: { id }, data: rest });
        await this.prisma.landingPage.update({ where: { id }, data: { order } });
      }
      this._SocketGateway.sendUpdate('landingPage');
      return this.prisma.landingPage.update({ where: { id }, data });
    } catch (error) {
      this._ErrorlogService.logError('updatelandingPage',error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      this._SocketGateway.sendUpdate('landingPage');
      return this.prisma.landingPage.delete({ where: { id } });
    } catch (error) {
      this._ErrorlogService.logError('removelandingPage',error);
      throw error;
    }
  }
}
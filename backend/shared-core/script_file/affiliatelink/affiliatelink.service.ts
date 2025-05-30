import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
import { CreateAffiliatelinkDto, UpdateAffiliatelinkDto } from './dto/affiliatelink.dto';

@Injectable()
export class AffiliatelinkService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
    private readonly errorLogService: ErrorlogService,
  ) {}

  private async emitUpdateEvent() {
    const lastUpdate = await this.getLastUpdatedAffiliatelink();
    this.socketGateway.sendAffiliatelinkUpdate();
  }

  async getLastUpdatedAffiliatelink() {
    try {
      const lastUpdated = await this.prisma.affiliatelink.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this.errorLogService.logError('getLastUpdatedAffiliatelink', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.affiliatelink.findFirst({
        orderBy: { codeId: 'desc' },
      });

      let nextNumber = 1;
      if (latest?.codeId) {
        const match = latest.codeId.match(/AFFILIATELINK(\d+)/);
        if (match) nextNumber = parseInt(match[1]) + 1;
      }

      return `AFFILIATELINK${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this.errorLogService.logError('generateCodeId', error);
      throw error;
    }
  }

  async create(data: CreateAffiliatelinkDto) {
    try {
      const maxOrder = await this.prisma.affiliatelink.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();

      const newAffiliatelink = await this.prisma.affiliatelink.create({
        data: {
          ...data,
          order: newOrder,
          codeId,
        },
      });

      await this.emitUpdateEvent();
      return newAffiliatelink;
    } catch (error) {
      this.errorLogService.logError('createAffiliatelink', error);
      throw error;
    }
  }

  async reorderAffiliatelinks(affiliatelinkIds: string[]) {
    try {
      await this.prisma.$transaction(
        affiliatelinkIds.map((id, index) => 
          this.prisma.affiliatelink.update({
            where: { id },
            data: { order: index + 1 },
          })
        )
      );
      await this.emitUpdateEvent();
    } catch (error) {
      this.errorLogService.logError('reorderAffiliatelinks', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.affiliatelink.findMany({
        orderBy: { order: 'asc' },
      });
    } catch (error) {
      this.errorLogService.logError('findAll', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const affiliatelink = await this.prisma.affiliatelink.findUnique({ where: param });
      if (!affiliatelink) throw new NotFoundException('Affiliatelink not found');
      return affiliatelink;
    } catch (error) {
      this.errorLogService.logError('findBy', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const affiliatelink = await this.prisma.affiliatelink.findUnique({ where: { id } });
      if (!affiliatelink) throw new NotFoundException('Affiliatelink not found');
      return affiliatelink;
    } catch (error) {
      this.errorLogService.logError('findOne', error);
      throw error;
    }
  }

  async update(id: string, data: UpdateAffiliatelinkDto) {
    try {
      const updatedAffiliatelink = await this.prisma.affiliatelink.update({
        where: { id },
        data,
      });
      await this.emitUpdateEvent();
      return updatedAffiliatelink;
    } catch (error) {
      this.errorLogService.logError('updateAffiliatelink', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deletedAffiliatelink = await this.prisma.affiliatelink.delete({ 
        where: { id } 
      });
      await this.emitUpdateEvent();
      return deletedAffiliatelink;
    } catch (error) {
      this.errorLogService.logError('removeAffiliatelink', error);
      throw error;
    }
  }
}
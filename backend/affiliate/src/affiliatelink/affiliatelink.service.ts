import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class affiliateLinkService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedaffiliateLink(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.affiliateLink.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedaffiliateLink', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.affiliateLink.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'AL';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'AL'; 
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateaffiliateLinkCodeId', error);
      throw error;
    }
  }
  async create(data: any, user: { id: string }) { 
    try {
      const maxOrder = await this.prisma.affiliateLink.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      console.log('Generated Code ID:', codeId);

      // Check if landingPageId exists if provided
      if (data.landingPageId) {
        const landingPage = await this.prisma.landingPage.findUnique({
          where: { id: data.landingPageId },
        });
        if (!landingPage) {
          throw new NotFoundException('landingPageId does not exist');
        }
      }

      const created = await this.prisma.affiliateLink.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId,
          createdById: user.id,
        },
      });
      this._SocketGateway.sendAffiliatelinkUpdate(); 
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createaffiliateLink', error);
      throw error;
    }
  }
  
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.affiliateLink.findFirst({
          where,
          orderBy: { order: 'asc' },
          include: { landingPage: true, trackingEvents: true },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.affiliateLink.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.affiliateLink.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByaffiliateLink', error);
      throw error;
    }
  }

  async findAll(query: any) { 
    try {
      const { page = 1, pageSize = 20, ...filters } = query;
      const pageInt = parseInt(page, 10) || 1;
      const pageSizeInt = parseInt(pageSize, 10) || 20;
      const skip = (pageInt - 1) * pageSizeInt;
      console.log(filters);
      



      const [data, total] = await Promise.all([
        this.prisma.affiliateLink.findMany({
          skip,
          take: pageSizeInt,
          orderBy: { order: 'asc' },
          include: { landingPage: true, trackingEvents: true },
          where: { ...filters },
        }),
        this.prisma.affiliateLink.count({ where: { ...filters } }),
      ]);
      return {
        data,
        total,
        page: pageInt,
        pageCount: Math.ceil(total / pageSizeInt),
        pageSize: pageSizeInt
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllaffiliateLink', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.affiliateLink.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('affiliateLink not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneaffiliateLink', error);
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.affiliateLink.update({ where: { id }, data: rest });
        updated = await this.prisma.affiliateLink.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.affiliateLink.update({ where: { id }, data });
      }
      this._SocketGateway.sendAffiliatelinkUpdate();
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateaffiliateLink', error);
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.affiliateLink.delete({ where: { id } });
      this._SocketGateway.sendAffiliatelinkUpdate();
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeaffiliateLink', error);
      throw error;
    }
  }
  async reorderaffiliateLinks(affiliateLinkIds: string[]) { 
    try {
      for (let i = 0; i < affiliateLinkIds.length; i++) {
        await this.prisma.affiliateLink.update({
          where: { id: affiliateLinkIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendAffiliatelinkUpdate(); 
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderaffiliatelink', error);
      throw error;
    }
  }
}

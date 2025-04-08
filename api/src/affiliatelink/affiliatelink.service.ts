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
      const lastUpdated = await this.prisma.affiliateLink.aggregate({
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
      const latest = await this.prisma.affiliateLink.findFirst({
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

  async create(data: any) {
    try {
      // Find the highest order number to place new item at the end
      const maxOrder = await this.prisma.affiliateLink.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      // Generate unique code ID
      const codeId = await this.generateCodeId();
      // Extract landingPageId from data for cleaner connection syntax
      const { landingPageId,createdById, ...affiliateLinkData } = data;
      // Verify that the landing page exists before creating the link
      const landingPage = await this.prisma.landingPage.findUnique({
        where: { id: landingPageId },
      });
      const createdBy = await this.prisma.user.findUnique({
        where: { id: data.createdById },
      });
      if (!landingPage) {
        throw new NotFoundException(`Landing page with ID ${landingPageId} not found`);
      }
      // Create the affiliate link with proper relational data structure
      const newAffiliatelink = await this.prisma.affiliateLink.create({
        data: {
          ...affiliateLinkData,
          order: newOrder,
          codeId,
          landingPage: {
            connect: { id: landingPageId }
          },
          createdBy: {
            connect: { id: data.createdById }
          },
        },
      }); 
      // Notify clients about the update
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
          this.prisma.affiliateLink.update({
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
      return this.prisma.affiliateLink.findMany({
        orderBy: { order: 'asc' },
      });
    } catch (error) {
      this.errorLogService.logError('findAll', error);
      throw error;
    }
  }

  async findOneBy(param: any) {
    try {
      console.log('findBy', param);
      
      const affiliatelink = await this.prisma.affiliateLink.findUnique({ where: param });
      if (!affiliatelink) throw new NotFoundException('Affiliatelink not found');
      return affiliatelink;
    } catch (error) {
      this.errorLogService.logError('findBy', error);
      throw error;
    }
  }
  async findListBy(param: any) {
    try { 
      if(Object.entries(param).length === 0) return [];
      const affiliatelinks = await this.prisma.affiliateLink.findMany({ where: param,
        include: { 
          landingPage: true,
          trackingEvents: true,
        }, // Include landing page for redirect URL/slug
        orderBy: { order: 'asc' },  
       });
      return affiliatelinks.map((link) => ({
        ...link,
        trackingEvents: link.trackingEvents.length
      }));
    } catch (error) {
      this.errorLogService.logError('findListBy', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const affiliatelink = await this.prisma.affiliateLink.findUnique({ where: { id } });
      if (!affiliatelink) throw new NotFoundException('Affiliatelink not found');
      return affiliatelink;
    } catch (error) {
      this.errorLogService.logError('findOne', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const updatedAffiliatelink = await this.prisma.affiliateLink.update({
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
      const deletedAffiliatelink = await this.prisma.affiliateLink.delete({ 
        where: { id } 
      });
      await this.emitUpdateEvent();
      return deletedAffiliatelink;
    } catch (error) {
      this.errorLogService.logError('removeAffiliatelink', error);
      throw error;
    }
  }
  async findByCode(codeId: string): Promise<any | null> {
    return this.prisma.affiliateLink.findUnique({
        where: { codeId },
        include: { landingPage: true } // Include landing page for redirect URL/slug
    });
  }
}
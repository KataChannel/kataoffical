import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class TrackingEventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
    private readonly errorLogService: ErrorlogService,
  ) {}

  async logEvent(data: any): Promise<any> {
    try {
      return await this.prisma.trackingEvent.create({
        data: {
          affiliateLink: { connect: { id: data.affiliateLinkId } },
          type: data.type,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          // Connect user if ID is provided
          triggeredByUser: data.triggeredByUserId ? { connect: { id: data.triggeredByUserId } } : undefined,
          // timestamp is defaulted by Prisma schema
        },
      });
    } catch (error) {
      // Handle potential errors, e.g., affiliateLinkId not found (P2025)
      console.error("Error logging tracking event:", error);
      // Avoid throwing errors that break the main flow (like redirect)
      // Consider logging to a separate system or using a queue for high traffic
      // For now, just log and potentially re-throw if critical
       // throw new InternalServerErrorException('Could not log tracking event.');
       return null; // Or return a specific error object without throwing
    }
  }

   // Add methods to query tracking events if needed by ReportModule etc.
   async getEventsByLink(linkId: string, type?: string) {
       return this.prisma.trackingEvent.findMany({
           where: { affiliateLinkId: linkId, type: type },
           orderBy: { timestamp: 'desc' }
       });
   }


  private async emitUpdateEvent() {
    this.socketGateway.sendTrackingEventUpdate();
  }

  async create(data: any) {
    try {
      const newTrackingEvent = await this.prisma.trackingEvent.create({data});

      await this.emitUpdateEvent();
      return newTrackingEvent;
    } catch (error) {
      this.errorLogService.logError('createTrackingEvent', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.trackingEvent.findMany();
    } catch (error) {
      this.errorLogService.logError('findAll', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const trackingevent = await this.prisma.trackingEvent.findUnique({ where: param });
      if (!trackingevent) throw new NotFoundException('TrackingEvent not found');
      return trackingevent;
    } catch (error) {
      this.errorLogService.logError('findBy', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const trackingevent = await this.prisma.trackingEvent.findUnique({ where: { id } });
      if (!trackingevent) throw new NotFoundException('TrackingEvent not found');
      return trackingevent;
    } catch (error) {
      this.errorLogService.logError('findOne', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const updatedTrackingEvent = await this.prisma.trackingEvent.update({
        where: { id },
        data,
      });
      await this.emitUpdateEvent();
      return updatedTrackingEvent;
    } catch (error) {
      this.errorLogService.logError('updateTrackingEvent', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deletedTrackingEvent = await this.prisma.trackingEvent.delete({ 
        where: { id } 
      });
      await this.emitUpdateEvent();
      return deletedTrackingEvent;
    } catch (error) {
      this.errorLogService.logError('removeTrackingEvent', error);
      throw error;
    }
  }
}
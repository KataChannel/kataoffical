import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
import { CreateTrackingDto, UpdateTrackingDto } from './dto/tracking.dto';

@Injectable()
export class TrackingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
    private readonly errorLogService: ErrorlogService,
  ) {}

  private async emitUpdateEvent() {
    const lastUpdate = await this.getLastUpdatedTracking();
    this.socketGateway.sendTrackingUpdate({ 
      event: 'trackingUpdated',
      timestamp: lastUpdate.updatedAt,
    });
  }

  async getLastUpdatedTracking() {
    try {
      const lastUpdated = await this.prisma.tracking.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this.errorLogService.logError('getLastUpdatedTracking', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.tracking.findFirst({
        orderBy: { codeId: 'desc' },
      });

      let nextNumber = 1;
      if (latest?.codeId) {
        const match = latest.codeId.match(/TRACKING(\d+)/);
        if (match) nextNumber = parseInt(match[1]) + 1;
      }

      return `TRACKING${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this.errorLogService.logError('generateCodeId', error);
      throw error;
    }
  }

  async create(data: CreateTrackingDto) {
    try {
      const maxOrder = await this.prisma.tracking.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();

      const newTracking = await this.prisma.tracking.create({
        data: {
          ...data,
          order: newOrder,
          codeId,
        },
      });

      await this.emitUpdateEvent();
      return newTracking;
    } catch (error) {
      this.errorLogService.logError('createTracking', error);
      throw error;
    }
  }

  async reorderTrackings(trackingIds: string[]) {
    try {
      await this.prisma.$transaction(
        trackingIds.map((id, index) => 
          this.prisma.tracking.update({
            where: { id },
            data: { order: index + 1 },
          })
        )
      );
      await this.emitUpdateEvent();
    } catch (error) {
      this.errorLogService.logError('reorderTrackings', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.tracking.findMany({
        orderBy: { order: 'asc' },
      });
    } catch (error) {
      this.errorLogService.logError('findAll', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const tracking = await this.prisma.tracking.findUnique({ where: param });
      if (!tracking) throw new NotFoundException('Tracking not found');
      return tracking;
    } catch (error) {
      this.errorLogService.logError('findBy', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const tracking = await this.prisma.tracking.findUnique({ where: { id } });
      if (!tracking) throw new NotFoundException('Tracking not found');
      return tracking;
    } catch (error) {
      this.errorLogService.logError('findOne', error);
      throw error;
    }
  }

  async update(id: string, data: UpdateTrackingDto) {
    try {
      const updatedTracking = await this.prisma.tracking.update({
        where: { id },
        data,
      });
      await this.emitUpdateEvent();
      return updatedTracking;
    } catch (error) {
      this.errorLogService.logError('updateTracking', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deletedTracking = await this.prisma.tracking.delete({ 
        where: { id } 
      });
      await this.emitUpdateEvent();
      return deletedTracking;
    } catch (error) {
      this.errorLogService.logError('removeTracking', error);
      throw error;
    }
  }
}
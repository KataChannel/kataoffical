import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
import { CreateTrackingeventDto, UpdateTrackingeventDto } from './dto/trackingevent.dto';

@Injectable()
export class TrackingeventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
    private readonly errorLogService: ErrorlogService,
  ) {}

  private async emitUpdateEvent() {
    const lastUpdate = await this.getLastUpdatedTrackingevent();
    this.socketGateway.sendTrackingeventUpdate();
  }

  async getLastUpdatedTrackingevent() {
    try {
      const lastUpdated = await this.prisma.trackingevent.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this.errorLogService.logError('getLastUpdatedTrackingevent', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.trackingevent.findFirst({
        orderBy: { codeId: 'desc' },
      });

      let nextNumber = 1;
      if (latest?.codeId) {
        const match = latest.codeId.match(/TRACKINGEVENT(\d+)/);
        if (match) nextNumber = parseInt(match[1]) + 1;
      }

      return `TRACKINGEVENT${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this.errorLogService.logError('generateCodeId', error);
      throw error;
    }
  }

  async create(data: CreateTrackingeventDto) {
    try {
      const maxOrder = await this.prisma.trackingevent.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();

      const newTrackingevent = await this.prisma.trackingevent.create({
        data: {
          ...data,
          order: newOrder,
          codeId,
        },
      });

      await this.emitUpdateEvent();
      return newTrackingevent;
    } catch (error) {
      this.errorLogService.logError('createTrackingevent', error);
      throw error;
    }
  }

  async reorderTrackingevents(trackingeventIds: string[]) {
    try {
      await this.prisma.$transaction(
        trackingeventIds.map((id, index) => 
          this.prisma.trackingevent.update({
            where: { id },
            data: { order: index + 1 },
          })
        )
      );
      await this.emitUpdateEvent();
    } catch (error) {
      this.errorLogService.logError('reorderTrackingevents', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.trackingevent.findMany({
        orderBy: { order: 'asc' },
      });
    } catch (error) {
      this.errorLogService.logError('findAll', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const trackingevent = await this.prisma.trackingevent.findUnique({ where: param });
      if (!trackingevent) throw new NotFoundException('Trackingevent not found');
      return trackingevent;
    } catch (error) {
      this.errorLogService.logError('findBy', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const trackingevent = await this.prisma.trackingevent.findUnique({ where: { id } });
      if (!trackingevent) throw new NotFoundException('Trackingevent not found');
      return trackingevent;
    } catch (error) {
      this.errorLogService.logError('findOne', error);
      throw error;
    }
  }

  async update(id: string, data: UpdateTrackingeventDto) {
    try {
      const updatedTrackingevent = await this.prisma.trackingevent.update({
        where: { id },
        data,
      });
      await this.emitUpdateEvent();
      return updatedTrackingevent;
    } catch (error) {
      this.errorLogService.logError('updateTrackingevent', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deletedTrackingevent = await this.prisma.trackingevent.delete({ 
        where: { id } 
      });
      await this.emitUpdateEvent();
      return deletedTrackingevent;
    } catch (error) {
      this.errorLogService.logError('removeTrackingevent', error);
      throw error;
    }
  }
}
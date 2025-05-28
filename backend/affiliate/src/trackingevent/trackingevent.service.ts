import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';

@Injectable()
export class TrackingeventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorLogService: ErrorlogService,
  ) {}

  async create(
    data: Record<string, any>,
    ipAddress?: string,
    userAgent?: string,
  ) {

    try {
      if (!data) throw new NotFoundException('Data not found');
      const payload = {
        ...data,
        ...(ipAddress && { ipAddress }),
        ...(userAgent && { userAgent }),
      };
      return await this.prisma.trackingEvent.create({ data: payload });
    } catch (error) {
      this.errorLogService.logError('createTrackingevent', error);
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
      if (param?.isCount) {
        const { isCount, ...whereParams } = param;
        const count = await this.prisma.trackingEvent.count({ where: whereParams });
        return { count };
      }
      const trackingevents = await this.prisma.trackingEvent.findMany({ where: param });
      return trackingevents;
    } catch (error) {
      this.errorLogService.logError('findBy', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const trackingevent = await this.prisma.trackingEvent.findUnique({ where: { id } });
      if (!trackingevent) throw new NotFoundException('Trackingevent not found');
      return trackingevent;
    } catch (error) {
      this.errorLogService.logError('findOne', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const updatedTrackingevent = await this.prisma.trackingEvent.update({
        where: { id },
        data,
      });
      return updatedTrackingevent;
    } catch (error) {
      this.errorLogService.logError('updateTrackingevent', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deletedTrackingevent = await this.prisma.trackingEvent.delete({ 
        where: { id } 
      });
      return deletedTrackingevent;
    } catch (error) {
      this.errorLogService.logError('removeTrackingevent', error);
      throw error;
    }
  }
}
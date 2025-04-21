import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ErrorlogService {
  constructor(private readonly prisma: PrismaService) {}
  async logError(message: string, details: any, source: string = 'server'): Promise<void> {
    const logEntry = {
      timestamp: new Date(),
      message,
      details,
      source,
    };

    try {
      await this.prisma.errorLog.create({
        data: logEntry,
      });
      console.error(logEntry); // Log tạm vào console
    } catch (error) {
      console.error('Failed to save log to database:', error);
    }
  }
  async create(data: any) {
    return this.prisma.errorLog.create({ data });
  }
  async findAll() {
    return this.prisma.errorLog.findMany();
  }

  async findOne(id: string) {
    const errorLog = await this.prisma.errorLog.findUnique({ where: { id } });
    if (!errorLog) throw new NotFoundException('errorLog not found');
    return errorLog;
  }

  async update(id: string, data: any) {
    return this.prisma.errorLog.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.errorLog.delete({ where: { id } });
  }
}
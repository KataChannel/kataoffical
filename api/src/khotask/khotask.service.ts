import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class KhotaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { title: string; description?: string; type: string; khoId?: string; userId?: string }) {
    return this.prisma.khoTask.create({
      data
    });
  }

  async findAll(filters: { khoId?: string; userId?: string; type?: string; status?: string }) {
    return this.prisma.khoTask.findMany({
      where: {
        ...(filters.khoId && { khoId: filters.khoId }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.type && { type: filters.type }),
        ...(filters.status && { status: filters.status })
      },
      include: {
        kho: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: { status?: string; notes?: string }) {
    return this.prisma.khoTask.update({
      where: { id },
      data
    });
  }

  async remove(id: string) {
    return this.prisma.khoTask.delete({
      where: { id }
    });
  }

  async getDailyChecklist(khoId: string, date: Date = new Date()) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.khoTask.findMany({
      where: {
        khoId,
        ngaythuchien: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }
}

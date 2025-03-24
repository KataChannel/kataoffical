import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
@Injectable()
export class taskService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedtask() {
    try {
      const lastUpdated = await this.prisma.task.aggregate({
        _max: {
          updatedAt: true,
        },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedtask',error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      this._SocketGateway.sendtaskUpdate();
      return this.prisma.task.create({data});
    } catch (error) {
      this._ErrorlogService.logError('createtask',error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.task.findMany();
    } catch (error) {
      this._ErrorlogService.logError('findAll',error);
      throw error;
    }
  }

  async findby(param: any) {
    try {
      const task = await this.prisma.task.findUnique({ where: param });
      if (!task) throw new NotFoundException('task not found');
      return task;
    } catch (error) {
      this._ErrorlogService.logError('findby',error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.prisma.task.findUnique({ where: { id } });
      if (!task) throw new NotFoundException('task not found');
      return task;
    } catch (error) {
      this._ErrorlogService.logError('findOne',error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.task.update({ where: { id }, data: rest });
      }
      this._SocketGateway.sendtaskUpdate();
      return this.prisma.task.update({ where: { id }, data });
    } catch (error) {
      this._ErrorlogService.logError('updatetask',error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      this._SocketGateway.sendtaskUpdate();
      return this.prisma.task.delete({ where: { id } });
    } catch (error) {
      this._ErrorlogService.logError('removetask',error);
      throw error;
    }
  }
}
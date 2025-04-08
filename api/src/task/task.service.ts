import { Injectable, NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';
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
      const tasks= await this.prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          assignee: true,
          comments: true,
          user: true,
          relatedUser: true,
        },
      });
      const result = tasks.map((task) => {
        const { user, assignee,relatedUser, ...rest } = task;
        return {
          ...rest,
          NguoitaoEmail: user?.email,
          NguoitaoSDT: user?.SDT,
          NguoinhanEmail: assignee?.email,
          NguoinhanSDT: assignee?.SDT,
          NguoilienquanEmail: relatedUser?.email,
          NguoilienquanSDT: relatedUser?.SDT,
        };
      });
      return result;
    } catch (error) {
      this._ErrorlogService.logError('findAll',error);
      throw error;
    }
  }
  async search(params: any) {
    try {
      const { filters, relations, orderBy, skip, take } = params;
      const where = filters ? { ...filters } : {};
      const include = relations ? { ...relations } : {};
      const orderByClause = orderBy ? { [orderBy.field]: orderBy.direction } : undefined;

      const tasks = await this.prisma.task.findMany({
        where,
        include,
        orderBy: orderByClause,
        skip: skip || 0,
        take: take || 10,
      });
      return tasks;
    } catch (error) {
      this._ErrorlogService.logError('searchtask',error);
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
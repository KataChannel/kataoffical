import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private _SocketGateway: SocketGateway,
  ) {}

  async createUser(dto: any) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password, // Hash password in real app
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
    async findAll() {
      return this.prisma.user.findMany();
    }
  
    async findOne(id: string) {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException('user not found');
      return user;
    }
  
    async update(id: string, data: any) {
      this._SocketGateway.senduserUpdate();
      return this.prisma.user.update({ where: { id }, data });
    }
  
    async remove(id: string) {
      return this.prisma.user.delete({ where: { id } });
    }
}

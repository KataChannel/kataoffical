import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway';
@Injectable()
export class khachHangService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async create(data: any) { 

  }
  async findBy(param: any) {

  }
  async findAll(page: number = 1, limit: number = 20) { 

  }
  async findOne(id: string) {
      console.log(id);
      
  }
  async update(id: string, data: any) { 

  }
  async remove(id: string) { 

  }
  async reorderkhachHangs(khachHangIds: string[]) { 

  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NhacungcapService {
  constructor(private readonly prisma: PrismaService) {}
  async generateMancc(): Promise<string> {
    // Lấy NCC mới nhất
    const latest = await this.prisma.nhacungcap.findFirst({
      orderBy: { mancc: 'desc' },
    });

    // Nếu chưa có NCC nào, bắt đầu từ 1
    let nextNumber = 1;
    if (latest) {
      const match = latest.mancc.match(/TG-NCC(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    // Tạo mã mới dạng TG-NCC00001
    return `TG-NCC${nextNumber.toString().padStart(5, '0')}`;
  }
  async create(data: any) {
    const mancc = await this.generateMancc();
    return this.prisma.nhacungcap.create({
      data: {
        mancc,
        ...data,
      },
    });
  }
  async findAll() {
    return this.prisma.nhacungcap.findMany();
  }

  async findOne(id: string) {
    const nhacungcap = await this.prisma.nhacungcap.findUnique({ 
      where: { id },
      include: {
        Sanpham: true,
      },
    });
    if (!nhacungcap) throw new NotFoundException('Nhacungcap not found');
    return nhacungcap;
  }

  async update(id: string, data: any) {
    const { Sanpham, ...rest } = data;
    const updatedNhacc = await this.prisma.nhacungcap.update({
      where: { id },
      data: {
        ...rest,
        Sanpham: {
          set: Sanpham.map((sp: any) => ({ id: sp.id })), // Gán lại danh sách sản phẩm
        },
      },
    });
    return updatedNhacc;
  }


  async remove(id: string) {
    return this.prisma.nhacungcap.delete({ where: { id } });
  }


  async findByProductIds(productIds: string[]) {
    if (!productIds || productIds.length === 0) {
      return [];
    }
    const suppliers = await this.prisma.nhacungcap.findMany({
      where: {
        Sanpham: {
          some: {
            id: { in: productIds }
          }
        }
      },
      include: {
        Sanpham: true,
      },
    });
    console.log(suppliers);
    
    return suppliers;
  }

}
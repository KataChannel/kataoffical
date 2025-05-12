import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class khoService {
  constructor(private readonly prisma: PrismaService) {}


  async gettonkho(page: number, limit: number) {
    if (page < 1) throw new Error('Page number must be greater than 0');
    if (limit < 1) throw new Error('Limit must be greater than 0');

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.tonKho.findMany({
        include: {
          sanpham: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.tonKho.count(),
    ]);

    // Merge the product (sanpham) and inventory (tonKho) details into one object per record
    const mergedData = data.map(({ sanpham, ...inventory }) => {
      const valueCalculation =
      (Number(inventory.slton) - Number(inventory.slchogiao) + Number(inventory.slchonhap)) *
      (1 + Number(sanpham?.haohut ?? 0) / 100);

      return {
      ...inventory,
      slchogiao: Number(inventory.slchogiao),
      slchonhap: Number(inventory.slchonhap),
      slton: Number(inventory.slton),
      masp: sanpham?.masp ?? null,
      dvt: sanpham?.dvt ?? null,
      title: sanpham?.title ?? '',
      subtitle: sanpham?.subtitle ?? '',
      haohut: sanpham?.haohut ?? false,
      goiy: valueCalculation < 0 ? Math.abs(valueCalculation) : 0,
      };
    });
   

    return {
      data: mergedData,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  
  async create(data: any) {
    return this.prisma.kho.create({ data });
  }



  async findAll() {
    return this.prisma.kho.findMany();
  }

  async findOne(id: string) {
    const kho = await this.prisma.kho.findUnique({ where: { id } });
    if (!kho) throw new NotFoundException('kho not found');
    return kho;
  }

  async update(id: string, data: any) {
    return this.prisma.kho.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.kho.delete({ where: { id } });
  }
}
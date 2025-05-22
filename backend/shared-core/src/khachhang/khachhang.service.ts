import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { VttechPrismaService } from 'prisma/vttech.prisma.service';

@Injectable()
export class KhachhangService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly vttechPrisma: VttechPrismaService
  ) {}

  async create(data: any) {
    const prefix = data.loaikh === 'khachsi' ? 'TG-KS' : 'TG-KL';

    // Lấy mã khách hàng lớn nhất trong loại này
    const lastCustomer = await this.prisma.khachhang.findFirst({
      where: { makh: { startsWith: prefix } },
      orderBy: { makh: 'desc' }, // Sắp xếp giảm dần
      select: { makh: true },
    });

    // Sinh số tiếp theo
    let nextNumber = 1;
    if (lastCustomer) {
      const lastNumber = parseInt(lastCustomer.makh.slice(-5), 10); // Lấy 5 số cuối
      nextNumber = lastNumber + 1;
    }

    // Format mã khách hàng mới
    const newMakh = `${prefix}${String(nextNumber).padStart(5, '0')}`;

    // Tạo khách hàng mới
    return this.prisma.khachhang.create({
      data: {
        makh: newMakh,
        loaikh: data.loaikh,
        name: data.name,
        diachi: data.diachi,
        sdt: data.sdt,
        email: data.email,
      },
    });
  }

  async findAll() {
    return this.prisma.khachhang.findMany();
  }


  async findAllVttech({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.vttechPrisma.customer.findMany({ skip, take: limit }),
      this.vttechPrisma.customer.count(),
    ]);
    const pageCount = Math.ceil(total / limit); 
    return {
      data,
      page: page || 1,
      pageCount: pageCount || 1,
      total,
      pageSize: limit,
    };
  }


  async findOne(id: string) {
    const khachhang = await this.prisma.khachhang.findUnique({ where: { id } });
    if (!khachhang) throw new NotFoundException('Khachhang not found');
    return khachhang;
  }

  async update(id: string, data: any) {
    return this.prisma.khachhang.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.khachhang.delete({ where: { id } });
  }
}
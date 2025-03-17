import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class KhachhangService {
  constructor(private readonly prisma: PrismaService) {}

  async timkiemkhachhang(query: string) {
    return this.prisma.$queryRaw`
      SELECT * FROM "Khachhang" 
      WHERE search_vector @@ to_tsquery('simple', ${query})
    `;
  }
  async create(data: any) {
    // Kiểm tra xem data.makh gửi lên từ client có trong database chưa
    const existingCustomer = await this.prisma.khachhang.findUnique({
      where: { makh: data.makh },
    });

    if (existingCustomer) {
      // Nếu đã tồn tại, bỏ qua
      return existingCustomer;
    }

    let newMakh = data.makh;

    // Nếu data.makh khác null và rỗng thì lấy, không thì tạo mới newMakh
    if (!newMakh) {
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
      newMakh = `${prefix}${String(nextNumber).padStart(5, '0')}`;
    }

    // Tạo khách hàng mới
    return this.prisma.khachhang.create({
      data: {
      makh: newMakh,
      ...data,
      },
    });
  }

  async findAll() {
    return this.prisma.khachhang.findMany({
      include: {banggia: true}
    });
  }

  async findOne(id: string) {
    const khachhang = await this.prisma.khachhang.findUnique({ where: { id },    
      include:{
      banggia: true
    } });
    if (!khachhang) throw new NotFoundException('Khachhang not found');
    return khachhang;
  }
  async searchfield(searchParams: Record<string, any>) {
    const where: any = {};
    // Xây dựng điều kiện tìm kiếm linh hoạt
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) continue;

      if (key === 'id') {
        where[key] = value; // Tìm chính xác theo ID
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        where[key] = value; // Tìm theo số hoặc boolean
      } else {
        where[key] = { contains: value, mode: 'insensitive' }; // Tìm gần đúng với string
      }
    }
    const khachhang = await this.prisma.khachhang.findUnique({ where,
      include:{
        banggia: true
      }
    });
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
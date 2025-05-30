import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { VttechPrismaService } from 'prisma/vttech.prisma.service';

@Injectable()
export class KhachhangService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly vttechPrisma: VttechPrismaService
  ) {}

  Doanhthu:any={
    "paidAmount": "Thanh Toán",
    "discountAmount": "Giảm Giá",
    "depositAmountUsing": "Tiền Đặt Cọc",
    "totalPaid": "Tổng Thanh Toán",
    "debtAmount": "Số Dư",
    "methodName": "Hình Thức",
    "content": "Nội Dung",
    "serviceId": 1253,
    "isProduct": 0,
    "quantity": "Số Lượng",
    "priceRoot": "Giá Gốc",
    "priceUnit": "Giá Đơn Vị",
    "price": "Giá",
    "amount": "Số Tiền",
    "timeToTreatment": "Thời Gian Điều Trị",
    "percentOfService": "Phần Trăm Dịch Vụ",
    "treatIndex": 0,
  }

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
      this.vttechPrisma.customer.findMany({
        where: {
          // Add your filtering conditions here
        },
        skip,
        take: limit
      }),
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

  async findKhachhangDoanhthu(param: any) {
    try {
      if (param.listphone && param.listphone.length > 0) {
        const khachhangs = await this.vttechPrisma.customer.findMany({
          where: {
            OR: param.listphone.map(phone => ({ phone })),
          },
        });
        let doanhthus:any = await this.vttechPrisma.revenue.findMany({
          where: {
            custPhone: { in: param.listphone },
          },
        });
        let dieutris = await this.vttechPrisma.treatment.findMany({
          where: {
            phone: { in: param.listphone },
          },
        });
        let dichvus = await this.vttechPrisma.dichvu.findMany({
          where: {
            phone: { in: param.listphone },
          },
        });
        const doanhthu = doanhthus.reduce((acc: any, item: any) => {
            acc.total = (acc.total || 0) + Number(item.amount);
            return acc;
        }, {});
        const doanhso = doanhthus.reduce((acc: any, item: any) => {
            acc.total = (acc.total || 0) + Number(item.totalPaid);
            return acc;
        }, {});
        return { khachhangs, doanhthus, dieutris, dichvus, doanhthu, doanhso };
      }
      return { khachhangs: [], doanhthus: [], dieutris: [], dichvus: [] };
    } catch (error) {
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if(where.branchId){
        where.branchId = {
          in: where.branchId
        };
      }
      if (isOne) {
        const result = await this.vttechPrisma.customer.findFirst({
          where,
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.vttechPrisma.customer.findMany({
          where,
          skip,
          take: limit,
        }),
        this.vttechPrisma.customer.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    console.log(id);
     const khachhang = await this.vttechPrisma.customer.findFirst({ where: { OR: [ { phone: id }, { phone2: id } ] } }); 
     const doanhthu = await this.vttechPrisma.revenue.findMany({ where: { custPhone: id } });
    return {khachhang, doanhthu};
  }

  async update(id: string, data: any) {
    return this.prisma.khachhang.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.khachhang.delete({ where: { id } });
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { VttechPrismaService } from 'prisma/vttech.prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class KhachhangService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly vttechPrisma: VttechPrismaService,
    private readonly httpService: HttpService
  ) {}
  ACADEMY_APIURL = process.env.ACADEMY_APIURL
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

 async Syncdichvus(param: any) {
    try {
      const response = await firstValueFrom(
          this.httpService.post(this.ACADEMY_APIURL + '/dichvu/syncsdichvu', param, 
            // {headers: { Authorization: `Bearer ${yourToken}` }}
          ),
        );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to call API: ${error.message}`);
    }
  }

 async Syncdoanhthus(param: any) {
    try {
      const response = await firstValueFrom(
          this.httpService.post(this.ACADEMY_APIURL + '/doanhthu/syncsdoanhthu', param, 
            // {headers: { Authorization: `Bearer ${yourToken}` }}
          ),
        );
      console.log(response.data);
        
      return response.data;
    } catch (error) {
      throw new Error(`Failed to call API: ${error.message}`);
    }
  }

 async Syncdoanhsos(param: any) {
    try {
      const response = await firstValueFrom(
          this.httpService.post(this.ACADEMY_APIURL + '/doanhso/syncsdoanhso', param, 
            // {headers: { Authorization: `Bearer ${yourToken}` }}
          ),
        );
      console.log(response.data);
        
      return response.data;
    } catch (error) {
      throw new Error(`Failed to call API: ${error.message}`);
    }
  }
 async Syncdieutris(param: any) {
    try {
      // const response = await firstValueFrom(
      //     this.httpService.post(this.ACADEMY_APIURL + '/doanhthu/syncsdieutri', param, 
      //       // {headers: { Authorization: `Bearer ${yourToken}` }}
      //     ),
      //   );
      // console.log(response.data);
        
      // return response.data;
    } catch (error) {
      throw new Error(`Failed to call API: ${error.message}`);
    }
  }
 async Synclichhens(param: any) {
    try {
      const response = await firstValueFrom(
          this.httpService.post(this.ACADEMY_APIURL + '/lichhen/syncslichhen', param, 
            // {headers: { Authorization: `Bearer ${yourToken}` }}
          ),
        );
      console.log(response.data);
        
      return response.data;
    } catch (error) {
      throw new Error(`Failed to call API: ${error.message}`);
    }
  }

 async Synckhoahocs(param: any) {
    try {
      const response = await firstValueFrom(
          this.httpService.post(this.ACADEMY_APIURL + '/khoahoc/syncskhoahoc', param, 
            // {headers: { Authorization: `Bearer ${yourToken}` }}
          ),
        );
      console.log(response.data);
        
      return response.data;
    } catch (error) {
      throw new Error(`Failed to call API: ${error.message}`);
    }
  }

  async findKhachhangDoanhthu(param: any) {
    try {
      if (param && param.length > 0) {
        const khachhangs = await this.vttechPrisma.customer.findMany({
          select: { code: true, phone: true },
          where: {
            OR: param.map((phone:any) => ({ phone })),
          },
        });
        // const listKhachhang = khachhangs.map(kh => ({ code: kh.code, phone: kh.phone }));

        let dichvusRaw = await this.vttechPrisma.dichvu.findMany({
          where: {
            phone: { in: khachhangs.map(kh => kh.phone).filter((phone): phone is string => phone !== null) },
          },
        });
        let dichvus = dichvusRaw.map((v) => {
          // const kh = khachhangs.find(kh => kh.phone === v.phone);
          return {
            codeId : v.id,
            phone: v.phone,
            phone2: v.phone2,
            name: v.name,
            code:v.code,
            birthday: v.birthday,
            gender: v.gender,
            serviceCode: v.serviceCode,
            tabCode: v.tabCode,
            serviceName: v.serviceName,
            timeIndex: v.timeIndex,
            timeToTreatment: v.timeToTreatment,
            priceUnit: v.priceUnit,
            quantity: v.quantity,
            discount: v.discount,
            priceRoot: v.priceRoot,
            priceDiscounted: v.priceDiscounted,
            branchId: v.branchId,
            createdDate: v.createdDate,
            modifiedDate: v.modifiedDate,
            state: v.state,
          }
        });
       const dichvu = await this.Syncdichvus(dichvus)    

        let doanhthus:any = await this.vttechPrisma.revenue.findMany({
          where: {
            custPhone: { in: param },
          },
        });
        let doanhthu = await this.Syncdichvus(doanhthus)

        let dieutris = await this.vttechPrisma.treatment.findMany({
          where: {
            phone: { in: param },
          },
        });
        // await this.Syncdieutris(dieutris)


        let lichhensRaw = await this.vttechPrisma.appointment.findMany({
          where: {
            custCode: { in: khachhangs.map(kh => kh.code).filter((code): code is string => code !== null) },
          },
        });
        let lichhens = lichhensRaw.map((v) => {
          const kh = khachhangs.find(kh => kh.code === v.custCode);
          return {
            "id": v.id,
            "custCode": v.custCode,
            "custName": v.custName,
            "dateFrom": v.dateFrom,
            "statusName": v.statusName,
            "statusTime": v.statusTime,
            "isCancel": v.isCancel,
            "branchName": v.branchName,
            "createdDate": v.createdDate,
            "modifiedDate": v.modifiedDate,
            "phone": kh?.phone || null, // Thêm phone từ listKhachhang
          }
        });
        const lichhen = await this.Synclichhens(lichhens)

        doanhthu = {
          ...doanhthu,
          totaldoanhthu: doanhthus.reduce((acc: any, item: any) => {
            return acc + Number(item.amount);
          }, 0),
          totaldoanhso: doanhthus.reduce((acc: any, item: any) => {
            return acc + Number(item.totalPaid);
          }, 0)
        };

        return {lichhen,dichvu,doanhthu };
        // return {dichvu,doanhthu, khachhangs, doanhthus, dieutris, dichvus, lichhens };
      }

      return { khachhangs: [], doanhthus: [], dieutris: [], dichvus: [], lichhen: [] };
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
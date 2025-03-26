import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as moment from 'moment-timezone';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class DonhangService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,

  ) {}

  async generateNextOrderCode(): Promise<string> {
    // Lấy mã đơn hàng gần nhất
    const lastOrder = await this.prisma.donhang.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    let nextCode = 'TG-AA00001'; // Mã đầu tiên

    if (lastOrder) {
      nextCode = this.incrementOrderCode(lastOrder.madonhang);
    }
    return nextCode;
  }

  private incrementOrderCode(orderCode: string): string {
    const prefix = 'TG-';
    const letters = orderCode.slice(3, 5); // Lấy AA → ZZ
    const numbers = parseInt(orderCode.slice(5), 10); // Lấy 00001 → 99999

    let newLetters = letters;
    let newNumbers = numbers + 1;

    if (newNumbers > 99999) {
      newNumbers = 1; // Reset về 00001
      newLetters = this.incrementLetters(letters);
    }

    return `${prefix}${newLetters}${newNumbers.toString().padStart(5, '0')}`;
  }

  private incrementLetters(letters: string): string {
    let firstChar = letters.charCodeAt(0);
    let secondChar = letters.charCodeAt(1);

    if (secondChar === 90) { // 'Z'
      if (firstChar === 90) return 'ZZ'; // Giới hạn cuối cùng
      firstChar++;
      secondChar = 65; // Reset về 'A'
    } else {
      secondChar++;
    }

    return String.fromCharCode(firstChar) + String.fromCharCode(secondChar);
  }


  async reorderDonHangs(donhangIds: string[]) {
    // Update the order of each donhang based on its position in the array
    for (let i = 0; i < donhangIds.length; i++) {
      await this.prisma.donhang.update({
        where: { id: donhangIds[i] },
        data: { order: i + 1 },
      });
    }
  }

  async search(params: any) {
    const cache = await this.redis.read('donhang-search');
    if (cache.length>0) return cache;
    const { Batdau, Ketthuc, Type, pageSize, pageNumber } = params;            
    const donhangs =await this.prisma.donhang.findMany({
      where: {
        ngaygiao: {
          gte: Batdau ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate() : undefined,
          lte: Ketthuc ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate() : undefined,
        },
        type: Type,
        status: Array.isArray(params.Status) ? { in: params.Status } : params.Status,
      },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: {include: {banggia: {include: {sanpham: true}}},},
      },
      orderBy: { createdAt: 'desc' },
    });

    const result = donhangs.map(({ khachhang, sanpham, ...donhang }) => ({
      ...donhang,
      sanpham: sanpham.map((item: any) => ({
        ...item.sanpham,
        idSP: item.idSP,
        giaban: khachhang.banggia.find((bg) => 
          donhang.ngaygiao && bg.batdau && bg.ketthuc &&
          donhang.ngaygiao >= bg.batdau && donhang.ngaygiao <= bg.ketthuc
        )?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
        sldat: item.sldat,
        slgiao: item.slgiao,
        slnhan: item.slnhan,
        ttdat: item.ttdat,
        ttgiao: item.ttgiao,
        ttnhan: item.ttnhan,
        ghichu: item.ghichu,
      })),
      khachhang: (({ banggia, ...rest }) => rest)(khachhang), // Xóa banggia
      name: khachhang.name
    }));
    await this.redis.create('donhang-search', result);
    console.log('result', result); 
    return result 
  }

  async phieuchuyen(params: any) {
    const { Batdau, Ketthuc, Type} = params;   
    console.log('Batdau',moment(Batdau).startOf('day').toDate());
    console.log('Ketthuc',moment(Ketthuc).endOf('day').toDate());   
    const result =await this.prisma.donhang.findMany({
      where: {
        ngaygiao: {
          gte: Batdau ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate() : undefined,
          lte: Ketthuc ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate() : undefined,
        },
        type: Type,
        status: Array.isArray(params.Status) ? { in: params.Status } : params.Status,
      },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: {include: {banggia: {include: {sanpham: true}}},},
      },
      orderBy: { createdAt: 'desc' },
    });
    return result.map(({ khachhang, sanpham, ...donhang }) => ({
      ...donhang,
      name: khachhang.name,
      diachi: khachhang.diachi,
      sdt: khachhang.sdt,
      gionhanhang: khachhang.gionhanhang,
      tongsomon:sanpham.length,
      soluongtt: sanpham.reduce((total, item:any) => total + item.slgiao, 0),
    }));
  }
  async phieugiao(params: any) {
 
    const result = await this.prisma.donhang.findUnique({
      where: params,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: {include: {banggia: {include: {sanpham: true}}},},   
      },
    });
    if (!result) {
      throw new NotFoundException('DonHang not found');
    }

    return {
      ...result,
      sanpham: result.sanpham.map((item: any) => ({
        ...item.sanpham,
        idSP: item.idSP,
        giaban: result.khachhang.banggia.find((bg) => 
          result.ngaygiao && bg.batdau && bg.ketthuc &&
          result.ngaygiao >= bg.batdau && result.ngaygiao <= bg.ketthuc
        )?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
        sldat: item.sldat,
        slgiao: item.slgiao,
        slnhan: item.slnhan,
        ttdat: item.ttdat,
        ttgiao: item.ttgiao,
        ttnhan: item.ttnhan,
        ghichu: item.ghichu,
      })),
      khachhang: (({ banggia, ...rest }) => rest)(result.khachhang), // Xóa banggia
    }
  }



  async findAll() {
    const cache = await this.redis.read('donhang');
    if (cache.length>0) return cache;
    const donhangs = await this.prisma.donhang.findMany({
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: {include: {banggia: {include: {sanpham: true}}},},
      },
    });
    const result =  donhangs.map((donhang) => ({
      ...donhang,
      sanpham: donhang.sanpham.map((item: any) => ({
        ...item.sanpham,
        idSP: item.idSP,
        giaban: donhang.khachhang.banggia.find((bg) => donhang.ngaygiao && bg.batdau && bg.ketthuc && donhang.ngaygiao >= bg.batdau && donhang.ngaygiao <= bg.ketthuc)?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
        sldat: item.sldat,
        slgiao: item.slgiao,
        slnhan: item.slnhan,
        ttdat: item.ttdat,
        ttgiao: item.ttgiao,
        ttnhan: item.ttnhan,
        ghichu: item.ghichu,
      })),
      name: donhang.khachhang.name,
    }));
    await this.redis.create('donhang', result);
    return result;
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

    const donhang = await this.prisma.donhang.findFirst({
      where,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: {
          include: {
            banggia: {
              include: { sanpham: true },
            },
          },
        },
      },
    });

    if (!donhang) throw new NotFoundException('DonHang not found');

    return {
      ...donhang,
      sanpham: donhang.sanpham.map((item) => ({
        ...item.sanpham,
        idSP: item.idSP,
        giaban: donhang.khachhang.banggia.find(
          (bg) =>
            donhang.ngaygiao &&
            bg.batdau &&
            bg.ketthuc &&
            donhang.ngaygiao >= bg.batdau &&
            donhang.ngaygiao <= bg.ketthuc
        )?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
        sldat: item.sldat,
        slgiao: item.slgiao,
        slnhan: item.slnhan,
        ttdat: item.ttdat,
        ttgiao: item.ttgiao,
        ttnhan: item.ttnhan,
        ghichu: item.ghichu,
      })),
      khachhang: (({ banggia, ...rest }) => rest)(donhang.khachhang) // Xóa banggia
    };
  }
  async findOne(id: string) {
    // const donhang = await this.prisma.donhang.findUnique({ where: { id } });
       const cache = await this.redis.read(`donhangid-${id}`);
       if (cache) return cache;
    const donhang = await this.prisma.donhang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: {include: {banggia: {include: {sanpham: true}}},},
      },
    });
    if (!donhang) throw new NotFoundException('DonHang not found');
    const result = {
      ...donhang,
      sanpham: donhang.sanpham.map((item) => ({
        ...item.sanpham,
        idSP: item.idSP,
        giaban: donhang.khachhang.banggia.find((bg) => donhang.ngaygiao && bg.batdau && bg.ketthuc && donhang.ngaygiao >= bg.batdau && donhang.ngaygiao <= bg.ketthuc)?.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban,
        sldat: item.sldat,
        slgiao: item.slgiao,
        slnhan: item.slnhan,
        ttdat: item.ttdat,
        ttgiao: item.ttgiao,
        ttnhan: item.ttnhan,
        ghichu: item.ghichu,
      })),
    };
    await this.redis.create(`donhangid-${id}`, donhang);
    return result
  }


  
  async create(dto: any) {
    const madonhang = await this.generateNextOrderCode();
    await this.redis.delete(`donhang`);
    await this.redis.delete(`donhang-search`);
    return this.prisma.$transaction(async (prisma) => {
      const newDonhang = await prisma.donhang.create({
        data: {
          title: dto.title,
          type: dto.type,
          madonhang: madonhang,
          ngaygiao: new Date(dto.ngaygiao),
          khachhangId: dto.khachhangId,
          isActive: dto.isActive,
          order: dto.order,
          ghichu: dto.ghichu,
          sanpham: {
            create: dto?.sanpham?.map((sp: any) => ({
              idSP: sp.id,
              ghichu: sp.ghichu,
              sldat: sp.sldat ?? 0,
              slgiao: sp.slgiao ?? 0,
              slnhan: sp.slnhan ?? 0,
              ttdat: sp.ttdat ?? 0,
              ttgiao: sp.ttgiao ?? 0,
              ttnhan: sp.ttnhan ?? 0,
              order:sp.order??0,
            })),
          },
        },
        include: {
          sanpham: true,
        },
      });
  
      // Cập nhật số lượng sản phẩm
      for (const sp of dto.sanpham) {
        await prisma.sanpham.update({
          where: { id: sp.id },
          data: {
            soluong: {
              decrement: sp.sldat ?? 0, // Giảm số lượng khi đặt hàng
            },
          },
        });
      }
  
      return newDonhang;
    });
  }

  
  async update(id: string, data: any) {
    await this.redis.delete(`donhang`);
    await this.redis.delete(`donhang-search`);
    return this.prisma.$transaction(async (prisma) => {
      // Lấy đơn hàng cũ
      const oldDonhang = await prisma.donhang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
  
      if (!oldDonhang) throw new Error('Đơn hàng không tồn tại');
  
      // Hoàn lại số lượng sản phẩm cũ
      for (const oldSP of oldDonhang.sanpham) {
        await prisma.sanpham.update({
          where: { id: oldSP.idSP },
          data: {
            soluong: {
              increment: oldSP.sldat ?? 0, // Hoàn trả số lượng cũ trước khi trừ đi số mới
            },
          },
        });
      }
  
      // Cập nhật đơn hàng
      const updatedDonhang = await prisma.donhang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          madonhang: data.madonhang,
          ngaygiao: new Date(data.ngaygiao),
          khachhangId: data.khachhangId,
          isActive: data.isActive,
          status: data.status,
          order: data.order,
          ghichu: data.ghichu,
          printCount: data.printCount,
          sanpham: {
            deleteMany: {}, // Xóa tất cả sản phẩm cũ trước khi thêm mới
            create: data?.sanpham?.map((sp: any) => ({
              idSP: sp.id,
              ghichu: sp.ghichu,
              sldat: sp.sldat ?? 0,
              slgiao: sp.slgiao ?? 0,
              slnhan: sp.slnhan ?? 0,
              ttdat: sp.ttdat ?? 0,
              ttgiao: sp.ttgiao ?? 0,
              ttnhan: sp.ttnhan ?? 0,
              order:sp.order??0,
            })),
          },
        },
        include: {
          sanpham: true,
        },
      });
  
      // Cập nhật lại số lượng sản phẩm mới
      for (const newSP of data.sanpham) {
        await prisma.sanpham.update({
          where: { id: newSP.id },
          data: {
            soluong: {
              decrement: newSP.sldat ?? 0, // Giảm số lượng theo số mới đặt hàng
            },
          },
        });
      }
  
      return updatedDonhang;
    });
  }
  

  async remove(id: string) {
    await this.redis.delete(`donhang`);
    await this.redis.delete(`donhangid-${id}`);
    return this.prisma.donhang.delete({ where: { id } });
  }
}

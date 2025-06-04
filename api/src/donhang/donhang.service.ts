import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as moment from 'moment-timezone';
const DEFAUL_KHO_ID='4cc01811-61f5-4bdc-83de-a493764e9258'
@Injectable()
export class DonhangService {
  constructor(private readonly prisma: PrismaService) {}

  async generateNextOrderCode(): Promise<string> {
    // Lấy mã đơn hàng gần nhất
    const lastOrder = await this.prisma.donhang.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    let nextCode = 'TG-AA00001'; // Mã đầu tiên

    if (lastOrder) {
      nextCode = this.incrementOrderCode(lastOrder.madonhang);
    }
    console.log('nextCode', nextCode);
    
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

    if (secondChar === 90) {
      // 'Z'
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
    const { Batdau, Ketthuc, Type, pageSize = 10, pageNumber = 1 } = params;

    const where = {
      ngaygiao: {
        gte: Batdau
          ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate()
          : undefined,
        lte: Ketthuc
          ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate()
          : undefined,
      },
      type: Type,
      status: Array.isArray(params.Status)
        ? { in: params.Status }
        : params.Status,
    };

    const [total, donhangs] = await Promise.all([
      this.prisma.donhang.count({ where }),
      this.prisma.donhang.findMany({
        where,
        include: {
          sanpham: {
            include: {
              sanpham: true,
            },
          },
          khachhang: { include: { banggia: { include: { sanpham: true } } } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (Number(pageNumber) - 1) * Number(pageSize),
        take: Number(pageSize),
      }),
    ]);

    const result = donhangs.map(({ khachhang, sanpham, ...donhang }) => ({
      ...donhang,
      sanpham: sanpham.map((item: any) => {
      const matchingBanggia = khachhang.banggia.find(
        (bg) =>
        donhang.ngaygiao &&
        bg.batdau &&
        bg.ketthuc &&
        donhang.ngaygiao >= bg.batdau &&
        donhang.ngaygiao <= bg.ketthuc,
      );
      const priceFromBanggia = matchingBanggia
        ? matchingBanggia.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban
        : undefined;
      return {
        ...item.sanpham,
        idSP: item.idSP,
        giaban:
        priceFromBanggia !== undefined
          ? priceFromBanggia
          : item.sanpham.giaban,
        sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
        slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
        slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
        ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
        ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
        ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
        ghichu: item.ghichu,
      };
      }),
      khachhang: (({ banggia, ...rest }) => rest)(khachhang), // Xóa banggia
      name: khachhang.name,
    }));

    return {
      data: result,
      total,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async phieuchuyen(params: any) {
    const { Batdau, Ketthuc, Type } = params;
    console.log('Batdau', moment(Batdau).startOf('day').toDate());
    console.log('Ketthuc', moment(Ketthuc).endOf('day').toDate());
    const result = await this.prisma.donhang.findMany({
      where: {
        ngaygiao: {
          gte: Batdau
            ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate()
            : undefined,
          lte: Ketthuc
            ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate()
            : undefined,
        },
        type: Type,
        status: Array.isArray(params.Status)
          ? { in: params.Status }
          : params.Status,
      },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return result.map(({ khachhang, sanpham, ...donhang }) => ({
      ...donhang,
      name: khachhang.name,
      diachi: khachhang.diachi,
      sdt: khachhang.sdt,
      gionhanhang: khachhang.gionhanhang,
      tongsomon: sanpham.length,
      soluongtt: parseFloat(
        sanpham.reduce((total, item: any) => total + Number(item.slgiao || 0), 0).toFixed(2)
      ),
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
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
    });
    if (!result) {
      throw new NotFoundException('DonHang not found');
    }
    return {
      ...result,
      sanpham: result.sanpham.map((item: any) => {
      const matchingBanggia = result.khachhang.banggia.find(
        (bg) =>
        result.ngaygiao &&
        bg.batdau &&
        bg.ketthuc &&
        result.ngaygiao >= bg.batdau &&
        result.ngaygiao <= bg.ketthuc,
      );
      const priceFromBanggia = matchingBanggia
        ? matchingBanggia.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban
        : undefined;
      return {
        ...item.sanpham,
        idSP: item.idSP,
        giaban:
        priceFromBanggia !== undefined
          ? priceFromBanggia
          : item.sanpham.giaban,
        sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
        slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
        slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
        ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
        ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
        ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
        ghichu: item.ghichu,
      };
      }),
      khachhang: (({ banggia, ...rest }) => rest)(result.khachhang), // Xóa banggia
    };
  }

  async findAll() {
    const donhangs = await this.prisma.donhang.findMany({
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    const result = donhangs.map((donhang) => ({
      ...donhang,
      sanpham: donhang.sanpham.map((item: any) => {
      const matchingBanggia = donhang.khachhang.banggia.find(
        (bg) =>
        donhang.ngaygiao &&
        bg.batdau &&
        bg.ketthuc &&
        donhang.ngaygiao >= bg.batdau &&
        donhang.ngaygiao <= bg.ketthuc,
      );
      const priceFromBanggia = matchingBanggia
        ? matchingBanggia.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban
        : undefined;
      return {
        ...item.sanpham,
        idSP: item.idSP,
        giaban: priceFromBanggia !== undefined ? priceFromBanggia : item.sanpham.giaban,
        sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
        slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
        slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
        ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
        ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
        ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
        ghichu: item.ghichu,
      };
      }),
      name: donhang.khachhang.name,
    }));
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
      sanpham: donhang.sanpham.map((item) => {
      const matchingBanggia = donhang.khachhang.banggia.find(
        (bg) =>
        donhang.ngaygiao &&
        bg.batdau &&
        bg.ketthuc &&
        donhang.ngaygiao >= bg.batdau &&
        donhang.ngaygiao <= bg.ketthuc,
      );
      const priceFromBanggia = matchingBanggia
        ? matchingBanggia.sanpham.find((sp) => sp.sanphamId === item.idSP)?.giaban
        : undefined;
      return {
        ...item.sanpham,
        idSP: item.idSP,
        giaban:
        priceFromBanggia !== undefined
          ? priceFromBanggia
          : item.sanpham.giaban,
        sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
        slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
        slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
        ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
        ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
        ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
        ghichu: item.ghichu,
      };
      }),
      khachhang: (({ banggia, ...rest }) => rest)(donhang.khachhang), // Xóa banggia
    };
  }
  async findOne(id: string) {
    const donhang = await this.prisma.donhang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
    });
    if (!donhang) throw new NotFoundException('DonHang not found');
    const result = {
      ...donhang,
      sanpham: donhang.sanpham.map((item) => {
        const matchingBanggia = donhang.khachhang.banggia.find(
          (bg) =>
            donhang.ngaygiao &&
            bg.batdau &&
            bg.ketthuc &&
            donhang.ngaygiao >= bg.batdau &&
            donhang.ngaygiao <= bg.ketthuc,
        );
        const productGiabanFromBanggia = matchingBanggia?.sanpham.find(
          (sp) => sp.sanphamId === item.idSP,
        )?.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban:
            productGiabanFromBanggia !== undefined
              ? productGiabanFromBanggia
              : item.sanpham.giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
          slhuy: parseFloat((item.slhuy ?? 0).toFixed(2)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
          ghichu: item.ghichu,
        };
      }),
    };
    return result;
  }

  async ImportDonhangOld(dulieu: any) { 
    const data = await Promise.all(dulieu.map(async (v: any) => ({
      tenkh: v.tenkh,
      ngaygiao: moment().toDate(),
      makh: await this.prisma.khachhang.findFirst({ where: { tenkh: v.tenkh } }),
      mabanggia: v.mabanggia,
      masp: v.ItemCode,
      sldat: Number(v.Quantity),
      slgiao: Number(v.Quantity),
      slnhan: Number(v.Quantity),
      ghichu: v.ghichu,
    })));

    console.log(data);
    
    // const acc: Record<string, any> = {};
    // for (const curr of data) {
    //   if (!acc[curr.makh]) {
    //     const khachhang = await this.prisma.khachhang.findFirst({ where: { makh: curr.makh } });
    //     acc[curr.makh] = {
    //       title: `Import ${moment().format('DD_MM_YYYY')}`,
    //       ngaygiao: curr.ngaygiao,
    //       makh: curr.makh,
    //       khachhangId: khachhang?.id,
    //       name: khachhang?.name,
    //       mabanggia: curr.mabanggia,
    //       sanpham: [],
    //       khachhang: {
    //         makh: curr.makh,
    //       }
    //     };
    //   }
    //   const sanphamRecord = await this.prisma.sanpham.findFirst({ where: { masp: curr.masp } });
    //   acc[curr.makh].sanpham.push({
    //     masp: curr.masp,
    //     id: sanphamRecord?.id,
    //     sldat: Number(curr.sldat),
    //     slgiao: Number(curr.slgiao),
    //     slnhan: Number(curr.slnhan),
    //     ghichu: curr.ghichu,
    //   });
    // }
    // const convertData: any = Object.values(acc);
    // let success = 0;
    // let fail = 0;  
    // for (const element of convertData) {
    //   try {
    //     await this.create(element);
    //     success += 1;
    //   } catch (error) {
    //     console.log('error', error);

    //   await this.prisma.importHistory.create({
    //      data: {
    //        codeId: element.madonhang, // using madonhang as the unique code identifier
    //        title: element.title,      // new field: title
    //        type: 'donhang',        // new field: type
    //        caseDetail: {
    //           errorMessage: error.message,
    //           errorStack: error.stack,
    //           additionalInfo: 'Failed during donhang import process',
    //        },
    //        order: 1, // update based on your ordering logic if needed
    //        createdBy: 'system', // replace with the actual account ID if available
    //      },
    //    });
    //     fail += 1;
    //   }
    // }
    // return {
    //   success,
    //   fail,
    // };
  }

  async ImportDonhang(data: any) {    
    const acc: Record<string, any> = {};
    for (const curr of data) {
      if (!acc[curr.makh]) {
        const khachhang = await this.prisma.khachhang.findFirst({ where: { makh: curr.makh } });
        acc[curr.makh] = {
          title: `Import ${moment().format('DD_MM_YYYY')}`,
          ngaygiao: curr.ngaygiao,
          makh: curr.makh,
          khachhangId: khachhang?.id,
          name: khachhang?.name,
          mabanggia: curr.mabanggia,
          sanpham: [],
          khachhang: {
            makh: curr.makh,
          }
        };
      }
      const sanphamRecord = await this.prisma.sanpham.findFirst({ where: { masp: curr.masp } });
      acc[curr.makh].sanpham.push({
        masp: curr.masp,
        id: sanphamRecord?.id,
        sldat: Number(curr.sldat),
        slgiao: Number(curr.slgiao),
        slnhan: Number(curr.slnhan),
        ghichu: curr.ghichu,
      });
    }
    const convertData: any = Object.values(acc);
    let success = 0;
    let fail = 0;  
    for (const element of convertData) {
      try {
        await this.create(element);
        success += 1;
      } catch (error) {
        console.log('error', error);

      await this.prisma.importHistory.create({
         data: {
           codeId: element.madonhang, // using madonhang as the unique code identifier
           title: element.title,      // new field: title
           type: 'donhang',        // new field: type
           caseDetail: {
              errorMessage: error.message,
              errorStack: error.stack,
              additionalInfo: 'Failed during donhang import process',
           },
           order: 1, // update based on your ordering logic if needed
           createdBy: 'system', // replace with the actual account ID if available
         },
       });
        fail += 1;
      }
    }
    return {
      success,
      fail,
    };
  }

  async create(dto: any) {
    const madonhang = await this.generateNextOrderCode();
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
              sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
              slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
              slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
              slhuy: parseFloat((sp.slhuy ?? 0).toFixed(2)),
              ttdat: parseFloat((sp.ttdat ?? 0).toFixed(2)),
              ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
              ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(2)),
            })),
          },
        },
        include: {
          sanpham: true,
        },
      });
      
      for (const sp of dto.sanpham) {
        const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(2));
        await prisma.tonKho.upsert({
          where: { sanphamId: sp.id },
          update: {
            slchogiao: { increment: incrementValue },
          },
          create: {
            sanphamId: sp.id,
            slchogiao: incrementValue,
          },
        });
      }
      return newDonhang;
    });
}

async update(id: string, data: any) {
  return this.prisma.$transaction(async (prisma) => {
    // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
    const oldDonhang = await prisma.donhang.findUnique({
      where: { id },
      include: { sanpham: true },
    });
    if (!oldDonhang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }
    
    // 2. Rollback từ 'dagiao' về 'dadat' và cập nhật lại chi tiết đơn hàng (donhangsanpham)
    if (oldDonhang.status === 'dagiao' && data.status === 'dadat') {
      // 2.1. Rollback tồn kho: tăng lại slchogiao và slton theo slgiao cũ
      for (const sp of oldDonhang.sanpham) {
        const incValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
        await prisma.tonKho.update({
          where: { sanphamId: sp.idSP },
          data: {
            slchogiao: { increment: incValue },
            slton: { increment: incValue },
          },
        });
      }
      
      // 2.2. Xóa phiếu kho dựa theo madonhang cũ
      const maphieuOld = `PX-${oldDonhang.madonhang}`;
      const phieuKho = await prisma.phieuKho.findUnique({
        where: { maphieu: maphieuOld },
      });
      if (!phieuKho) {
        throw new NotFoundException('Phiếu kho không tồn tại');
      }
      try {
        await prisma.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: phieuKho.id },
        });
        await prisma.phieuKho.delete({
          where: { maphieu: maphieuOld },
        });
      } catch (error) {
        throw error;
      }
      
      // 2.3. Cập nhật đơn hàng (update các thông tin đơn hàng và donhangsanpham)
      const updatedOrder = await prisma.donhang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          ngaygiao: new Date(data.ngaygiao),
          khachhangId: data.khachhangId,
          isActive: data.isActive,
          order: data.order,
          ghichu: data.ghichu,
          status: 'dadat',
          ...(data.sanpham && data.sanpham.length
            ? {
                sanpham: {
                  updateMany: data.sanpham.map((sp: any) => ({
                    where: { idSP: sp.id },
                    data: {
                      ghichu: sp.ghichu,
                      slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                    },
                  })),
                },
              }
            : {}),
        },
      });
      
      // 2.4. Cập nhật tồn kho theo chênh lệch giữa số lượng giao mới và cũ
      for (const sp of data.sanpham) {
        const newSlgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
        const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
        const oldSlgiao = oldItem ? parseFloat((oldItem.slgiao ?? 0).toFixed(2)) : 0;
        const difference = newSlgiao - oldSlgiao;
        if (difference !== 0) {
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
              slchogiao:
                difference > 0
                  ? { decrement: difference }
                  : { increment: -difference },
              slton:
                difference > 0
                  ? { decrement: difference }
                  : { increment: -difference },
            },
          });
        }
      }
      
      return updatedOrder;
    }

    // Thêm trường hợp sửa đơn hàng ở trạng thái 'dadat'
    if (oldDonhang.status === 'dadat' && data.status === 'dadat') {

      // Cập nhật tồn kho: tính hiệu số giữa số lượng giao mới và cũ
      for (const sp of data.sanpham) {
      const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
      if (oldItem) {
        const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
        const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
        const difference = Number(newSldat) - Number(oldSldat);        
        if (difference > 0) {
        await prisma.tonKho.update({
          where: { sanphamId: sp.id },
          data: {
          slchogiao: { increment: difference },
          },
        });
        } 
        else if (difference < 0) {
        await prisma.tonKho.update({
          where: { sanphamId: sp.id },
          data: {
          slchogiao: { increment: difference },
          },
        });
        }
       }
      }
    
      return prisma.donhang.update({
      where: { id },
      data: {
        title: data.title,
        type: data.type,
        ngaygiao: new Date(data.ngaygiao),
        khachhangId: data.khachhangId,
        isActive: data.isActive,
        order: data.order,
        ghichu: data.ghichu,
        ...(data.sanpham && data.sanpham.length
        ? {
          sanpham: {
            updateMany: data.sanpham.map((sp: any) => ({
            where: { idSP: sp.id },
            data: {
              ghichu: sp.ghichu,
              sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
              slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
              slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
            },
            })),
          },
          }
        : {}),
      },
      });
    }

    // 3. Chuyển sang 'dagiao' (xuất kho) và cập nhật lại chi tiết đơn hàng
    if (data.status === 'dagiao') {
      // 3.1. Giảm tồn kho
      for (const sp of data.sanpham) {
        const decValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
        await prisma.tonKho.update({
          where: { sanphamId: sp.id },
          data: {
            slchogiao: { decrement: decValue },
            slton: { decrement: decValue },
          },
        });
      }
      // 3.2. Chuẩn bị payload cho phiếu kho và upsert
      const maphieuNew = `PX-${data.madonhang}`;
      const phieuPayload = {
        ngay: new Date(data.ngaygiao),
        type: 'xuat',
        khoId: DEFAUL_KHO_ID,
        ghichu: data.ghichu,
        isActive: data.isActive ?? true,
        sanpham: {
          create: data.sanpham.map((sp: any) => ({
            sanphamId: sp.id,
            soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
            ghichu: sp.ghichu,
          })),
        },
      };
      await prisma.phieuKho.upsert({
        where: { maphieu: maphieuNew },
        create: { maphieu: maphieuNew, ...phieuPayload },
        update: phieuPayload,
      });
      // 3.3. Cập nhật trạng thái đơn hàng và cập nhật chi tiết donhangsanpham
      return prisma.donhang.update({
        where: { id },
        data: {
          status: 'dagiao',
          sanpham: {
            updateMany: data.sanpham.map((sp: any) => ({
              where: { idSP: sp.id },
              data: {
                ghichu: sp.ghichu,
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
              },
            })),
          },
        },
      });
    }

    // 4. Chuyển sang 'danhan' và cập nhật lại chi tiết đơn hàng
    if (data.status === 'danhan') {      
      // Mảng lưu thông tin các sản phẩm có số lượng thiếu
      const shortageItems: { sanphamId: string; soluong: number; ghichu?: string }[] = [];
      
      for (const item of data.sanpham) {
      const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(2));
      const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(2));
      if (receivedQty < shippedQty) {
        const shortage = shippedQty - receivedQty;          
        // Cập nhật tồn kho: hoàn lại số lượng chưa nhận
        await prisma.tonKho.update({
        where: { sanphamId: item.idSP },
        data: { slton: { increment: shortage } },
        });
        // Thu thập thông tin sản phẩm thiếu
        shortageItems.push({
        sanphamId: item.id,
        soluong: shortage,
        ghichu: item.ghichu
          ? `${item.ghichu}; thiếu ${shortage.toFixed(2)}`
          : `Thiếu ${shortage.toFixed(2)}`,
        });
      } else if (receivedQty === shippedQty) {
        // Trường hợp nhận đủ số lượng: cập nhật tồn kho (mặc định không thay đổi giá trị)
        await prisma.tonKho.update({
        where: { sanphamId: item.idSP },
        data: { slton: { decrement: receivedQty } },
        });
      }
      }
      
      // Nếu có sản phẩm thiếu, phát sinh phiếu kho nhập hàng trả về
      if (shortageItems.length > 0) {
      const maphieuNhap = `PN-${data.madonhang}-RET`; // Tạo mã phiếu nhập phù hợp
      const phieuKhoData = {
        maphieu: maphieuNhap,
        ngay: new Date(data.ngaygiao), // Ngày nhập có thể sử dụng ngày giao hoặc hiện tại
        type: 'nhap', // Loại phiếu nhập
        khoId: DEFAUL_KHO_ID,
        ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
        isActive: data.isActive ?? true,
        sanpham: {
        create: shortageItems.map(item => ({
          sanphamId: item.sanphamId,
          soluong: item.soluong,
          ghichu: item.ghichu,
        })),
        },
      };
      
      await prisma.phieuKho.create({
        data: phieuKhoData,
      });
      }
      
      // Cập nhật trạng thái đơn hàng và thông tin từng sản phẩm
      return prisma.donhang.update({
      where: { id },
      data: {
        status: 'danhan',
        sanpham: {
        updateMany: data.sanpham.map((item: any) => {
          const delivered = parseFloat((item.slgiao ?? 0).toFixed(2));
          const received = parseFloat((item.slnhan ?? 0).toFixed(2));
          const shortageNote =
          received < delivered
            ? item.ghichu
            ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(2)}`
            : `Thiếu ${(delivered - received).toFixed(2)}`
            : item.ghichu || '';
          return {
          where: { idSP: item.id },
          data: {
            ghichu: shortageNote,
            slnhan: received,
          },
          };
        }),
        },
      },
      });
    }
    if (data.status === 'hoanthanh') {
      return prisma.donhang.update({
        where: { id },
        data: {
          status: 'hoanthanh',
        },
      });
    }
    // Nếu không rơi vào các trường hợp trên, sử dụng logic cập nhật phiếu giao (updatePhieugiao)
    // return this.updatePhieugiao(id, data);
  });
}

async updatePhieugiao(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
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
            updateMany: data?.sanpham?.map((sp: any) => ({
              where: { idSP: sp.id },
              data: {
                ghichu: sp.ghichu,
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
              },
            })),
          },
        },
        include: {
          sanpham: true,
        },
      });
      return updatedDonhang;
    });
  }




  async remove(id: string) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Lấy đơn hàng bao gồm chi tiết sản phẩm
      const donhang = await prisma.donhang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!donhang) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }

      // 2. Cập nhật TONKHO cho từng sản phẩm theo trạng thái đơn hàng
      for (const sp of donhang.sanpham) {
        const sldat = parseFloat((sp.sldat ?? 0).toFixed(2));
        if (donhang.status === 'dagiao') {
          const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              // Loại bỏ số lượng đơn hàng đã thêm ban đầu
              slchogiao: { decrement: sldat },
              // Cộng lại số lượng đã giao đã trừ khi xuất kho
              slton: { increment: slgiao },
            },
          });
        } else {
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchogiao: { decrement: sldat },
            },
          });
        }
      }
      // 3. Xóa đơn hàng
      return prisma.donhang.delete({ where: { id } });
    });
  }
}

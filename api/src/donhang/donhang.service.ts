import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as moment from 'moment-timezone';
const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
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
        const priceFromBanggia = khachhang.banggia
          ? khachhang.banggia.sanpham.find((sp) => sp.sanphamId === item.idSP)
              ?.giaban
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
        sanpham
          .reduce((total, item: any) => total + Number(item.slgiao || 0), 0)
          .toFixed(2),
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
        const priceFromBanggia = result.khachhang.banggia
          ? result.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
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
        const priceFromBanggia = donhang.khachhang.banggia
          ? donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
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
        const priceFromBanggia = donhang.khachhang.banggia
          ? donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
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
        const productGiabanFromBanggia = donhang.khachhang.banggia
          ? donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : undefined;
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
    // Step 1: Map input data to the expected internal format
    const rawData = await Promise.all(
      dulieu.map(async (v: any) => {
        const mappedSanpham = await Promise.all(
          v.sanpham.map(async (item: any) => {
            const sp = await this.prisma.sanpham.findFirst({
              where: { masp: item.ItemCode },
            });
            return {
              id: sp?.id,
              sldat: parseFloat((item.Quantity ?? 0).toFixed(2)),
              slgiao: 0,
              slnhan: 0,
              slhuy: 0,
              ttdat: 0,
              ttgiao: 0,
              ttnhan: 0,
            };
          }),
        );

        return {
          title: `Import ${v.tenkh} - ${moment().format('DD_MM_YYYY')}`,
          type: 'donsi',
          ngaygiao: new Date(v.ngaygiao) || new Date(),
          khachhangId: v.khachhangId,
          sanpham: mappedSanpham,
        };
      }),
    );

    let success = 0;
    let fail = 0;
    let skip = 0;

    for (const order of rawData) {
      // Kiểm tra đơn hàng theo ngày (ngày giao tính theo startOf day và endOf day)
      const startOfDay = moment(order.ngaygiao).startOf('day').toDate();
      const endOfDay = moment(order.ngaygiao).endOf('day').toDate();
      const existingOrder = await this.prisma.donhang.findFirst({
        where: {
          khachhangId: order.khachhangId,
          ngaygiao: { gte: startOfDay, lte: endOfDay },
        },
        include: { sanpham: true },
      });

      // Nếu đã tồn tại đơn hàng với cùng khachhangId, ngaygiao và số lượng sanpham giống nhau thì bỏ qua
      if (
        existingOrder &&
        existingOrder.sanpham.length === order.sanpham.length
      ) {
        skip++;
        continue;
      }

      // Nếu không tồn tại, tạo mới đơn hàng
      try {
        await this.create(order);
        success++;
      } catch (error) {
        fail++;
      }
    }
    return { success, fail, skip };
  }

  // async ImportDonhangOld(dulieu: any) {
  //   // Step 1: Map input data to the expected internal format
  //   const rawData = await Promise.all(
  //     dulieu.map(async (v: any) => {
  //       const ngaygiao = moment(v.ngaygiao).toDate();

  //       // Retrieve required records concurrently
  //       const [khachhangRecord, banggiaRecord, sanphamRecord] = await Promise.all([
  //         this.prisma.khachhang.findFirst({ where: { id: v.khachhangId } }),
  //         this.prisma.banggia.findFirst({ where: { mabanggia: v.mabanggia } }),
  //         this.prisma.sanpham.findFirst({ where: { masp: v.ItemCode } }),
  //       ]);

  //       // If any required record is missing, skip this entry
  //       if (!khachhangRecord || !banggiaRecord || !sanphamRecord) {
  //         return null;
  //       }

  //       return {
  //         ngaygiao,
  //         makh: khachhangRecord.makh,
  //         mabanggia: banggiaRecord.mabanggia,
  //         masp: sanphamRecord.masp,
  //         sldat: Number(v.Quantity) || 0,
  //         slgiao: Number(v.Quantity) || 0,
  //         slnhan: Number(v.Quantity) || 0,
  //         ghichu: v.ghichu || '',
  //       };
  //     })
  //   );

  //   // Count entries skipped due to missing records
  //   const missingRecordSkip = rawData.filter((item) => item === null).length;

  //   // Step 2: Filter out entries that already exist based on ngaygiao and customer (makh)
  //   const validRawData = rawData.filter((item) => item !== null);
  //   const data: any[] = [];
  //   let existsSkipCount = 0;
  //   for (const d of validRawData) {
  //     const startOfDay = moment(d.ngaygiao).startOf('day').toDate();
  //     const endOfDay = moment(d.ngaygiao).endOf('day').toDate();
  //     const exists = await this.prisma.donhang.findFirst({
  //       where: {
  //         ngaygiao: { gte: startOfDay, lte: endOfDay },
  //         khachhang: { makh: d.makh },
  //       },
  //     });
  //     if (exists) {
  //       existsSkipCount++;
  //     } else {
  //       data.push(d);
  //     }
  //   }
  //   const skip = missingRecordSkip + existsSkipCount;

  //   // Step 3: Group the data by customer (makh)
  //   const acc: Record<string, any> = {};
  //   for (const curr of data) {
  //     if (!acc[curr.makh]) {
  //       const khachhang = await this.prisma.khachhang.findFirst({ where: { makh: curr.makh } });
  //       acc[curr.makh] = {
  //         title: `Import ${moment().format('DD_MM_YYYY')}`,
  //         ngaygiao: curr.ngaygiao,
  //         makh: curr.makh,
  //         khachhangId: khachhang?.id,
  //         name: khachhang?.name,
  //         mabanggia: curr.mabanggia,
  //         sanpham: [],
  //         khachhang: {
  //           makh: curr.makh,
  //         },
  //       };
  //     }
  //     const sanphamRecord = await this.prisma.sanpham.findFirst({ where: { masp: curr.masp } });
  //     acc[curr.makh].sanpham.push({
  //       masp: curr.masp,
  //       id: sanphamRecord?.id,
  //       sldat: Number(curr.sldat),
  //       slgiao: Number(curr.slgiao),
  //       slnhan: Number(curr.slnhan),
  //       ghichu: curr.ghichu,
  //     });
  //   }

  //   // Step 4: Convert grouped data into an array and attempt the import process
  //   const convertData: any[] = Object.values(acc);
  //   let success = 0;
  //   let fail = 0;
  //   for (const element of convertData) {
  //     try {
  //       await this.create(element);
  //       success++;
  //     } catch (error: any) {
  //       console.error('Error importing order:', error);
  //       await this.prisma.importHistory.create({
  //         data: {
  //           codeId: element.madonhang, // using madonhang as the unique code identifier
  //           title: element.title,
  //           type: 'donhang',
  //           caseDetail: {
  //             errorMessage: error.message,
  //             errorStack: error.stack,
  //             additionalInfo: 'Failed during donhang import process',
  //           },
  //           order: 1,
  //           createdBy: 'system',
  //         },
  //       });
  //       fail++;
  //     }
  //   }
  //   return { success, fail, skip };
  // }

  async ImportDonhang(data: any) {
    const acc: Record<string, any> = {};
    for (const curr of data) {
      if (!acc[curr.makh]) {
        const khachhang = await this.prisma.khachhang.findFirst({
          where: { makh: curr.makh },
        });
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
          },
        };
      }
      const sanphamRecord = await this.prisma.sanpham.findFirst({
        where: { masp: curr.masp },
      });
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
            title: element.title, // new field: title
            type: 'donhang', // new field: type
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
          type: dto.type || 'donsi',
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
              slgiao: parseFloat((sp.sldat ?? 0).toFixed(2)),
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
      // 1. Fetch existing order with its product details.
      const oldOrder = await prisma.donhang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!oldOrder) {
        throw new NotFoundException("Đơn hàng không tồn tại");
      }

      // Helper: Rollback from 'dagiao' to 'dadat'
      async function rollbackDagiaoToDadat() {
        // a. Rollback inventory: increment both slchogiao and slton using previous shipped quantity.
        for (const sp of oldOrder!.sanpham) {
          const incValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchogiao: { increment: incValue },
              slton: { increment: incValue },
            },
          });
        }

        // b. Remove warehouse voucher linked to the previous order.
        const maphieuOld = `PX-${oldOrder!.madonhang}`;
        const phieuKho = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuOld },
        });
        if (!phieuKho) {
          throw new NotFoundException("Phiếu kho không tồn tại");
        }
        await prisma.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: phieuKho.id },
        });
        await prisma.phieuKho.delete({
          where: { maphieu: maphieuOld },
        });

        // c. Update order header and its product details.
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

        // d. Adjust inventory based on differences in shipped quantity.
        for (const sp of data.sanpham) {
          const newSlgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
          const oldItem = oldOrder!.sanpham.find((o: any) => o.idSP === sp.id);
          const oldSlgiao = oldItem
            ? parseFloat((oldItem.slgiao ?? 0).toFixed(2))
            : 0;
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

      // Helper: Update 'dadat' order (order in pending state). Adjust inventory for products added, removed, or updated.
      async function updateDadat() {
        // a. For each product in the new payload:
        for (const sp of data.sanpham) {
          const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
          const oldItem = oldOrder!.sanpham.find((o: any) => o.idSP === sp.id);
          if (oldItem) {
            const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
            const diff = newSldat - oldSldat;
            if (diff !== 0) {
              await prisma.tonKho.upsert({
                where: { sanphamId: sp.id },
                update: {
                  slchogiao:
                    diff > 0
                      ? { increment: diff }
                      : { decrement: Math.abs(diff) },
                },
                create: {
                  sanphamId: sp.id,
                  slchogiao: newSldat,
                },
              });
            }
          } else {
            // New product added.
            await prisma.tonKho.upsert({
              where: { sanphamId: sp.id },
              update: {
                slchogiao: { increment: newSldat },
              },
              create: {
                sanphamId: sp.id,
                slchogiao: newSldat,
              },
            });
          }
        }

        // b. For each product in the old order not present in new payload:
        for (const oldItem of oldOrder!.sanpham) {
          const exists = data.sanpham.find((sp: any) => sp.id === oldItem.idSP);
          if (!exists) {
            const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
            await prisma.tonKho.upsert({
              where: { sanphamId: oldItem.idSP },
              update: { slchogiao: { decrement: oldSldat } },
              create: { sanphamId: oldItem.idSP, slchogiao: 0 },
            });
          }
        }

        // c. Update the order by replacing its product details.
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
                    deleteMany: {},
                    createMany: {
                      data: data.sanpham.map((sp: any) => ({
                        idSP: sp.id,
                        ghichu: sp.ghichu,
                        sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                        slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                        slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                        ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
                      })),
                    },
                  },
                }
              : {}),
          },
        });
      }

      // Helper: Update order to 'dagiao' (shipment). Deduct inventory and upsert the shipment voucher.
      async function updateDagiao() {
        // a. Decrease inventory for each product.
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
        // b. Upsert warehouse voucher information.
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
        // c. Update the order status and product details.
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

      // Helper: Update order to 'danhan' (received). Handle cases with shortages.
      async function updateDanhan() {
        const shortageItems: {
          sanphamId: string;
          soluong: number;
          ghichu?: string;
        }[] = [];

        for (const item of data.sanpham) {
          const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(2));
          const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(2));
          if (receivedQty < shippedQty) {
            const shortage = shippedQty - receivedQty;
            // Revert inventory for the not-received quantity.
            await prisma.tonKho.update({
              where: { sanphamId: item.idSP },
              data: { slton: { increment: shortage } },
            });
            shortageItems.push({
              sanphamId: item.id,
              soluong: shortage,
              ghichu: item.ghichu
                ? `${item.ghichu}; thiếu ${shortage.toFixed(2)}`
                : `Thiếu ${shortage.toFixed(2)}`,
            });
          } else if (receivedQty === shippedQty) {
            await prisma.tonKho.update({
              where: { sanphamId: item.idSP },
              data: { slton: { decrement: receivedQty } },
            });
          }
        }

        // If shortages exist, create a return receipt.
        if (shortageItems.length > 0) {
          const maphieuNhap = `PN-${data.madonhang}-RET`;
          const phieuKhoData = {
            maphieu: maphieuNhap,
            ngay: new Date(data.ngaygiao),
            type: 'nhap',
            khoId: DEFAUL_KHO_ID,
            ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
            isActive: data.isActive ?? true,
            sanpham: {
              create: shortageItems.map((item) => ({
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
                    : item.ghichu || "";
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

      // Main update workflow based on the target status.
      if (oldOrder.status === "dagiao" && data.status === "dadat") {
        return rollbackDagiaoToDadat();
      } else if (oldOrder.status === "dadat" && data.status === "dadat") {
        return updateDadat();
      } else if (data.status === "dagiao") {
        return updateDagiao();
      } else if (data.status === "danhan") {
        return updateDanhan();
      } else if (data.status === "hoanthanh") {
        return prisma.donhang.update({
          where: { id },
          data: { status: "hoanthanh" },
        });
      } else {
        throw new Error("Invalid update status");
      }
    });
  }

  async updatePhieugiao(id: string, data: any) {
    try {
      console.log(data);

      return await this.prisma.$transaction(async (prisma) => {
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
              deleteMany: {},
              create: data.sanpham.map((sp: any) => ({
                idSP: sp.id,
                ghichu: sp.ghichu,
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
              })),
            },
          },
          include: {
            sanpham: true,
          },
        });

        return updatedDonhang;
      });
    } catch (error) {
      console.error('Error updating phieugiao:', error);
      throw error;
    }
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

  async findByProductId(idSP: string) {
  const donhangs = await this.prisma.donhang.findMany({
    where: {
      sanpham: {
        some: { idSP },
      },
    },
    include: {
      sanpham: {
        where: { idSP },
        include: {
          sanpham: true,
        },
      },
      khachhang: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return donhangs.map((donhang) => ({
    ...donhang,
    sanpham: donhang.sanpham.find((item: any) => item.idSP === idSP)
  }));
}
}

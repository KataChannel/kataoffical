import { Injectable, NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';

@Injectable()
export class DathangService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly  _ImportdataService: ImportdataService
  ) {}

  async generateNextOrderCode(): Promise<string> {
    // Lấy mã đơn hàng gần nhất
    const lastOrder = await this.prisma.dathang.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    let nextCode = 'TGNCC-AA00001'; // Mã đầu tiên

    if (lastOrder && lastOrder.madncc) {
      nextCode = this.incrementOrderCode(lastOrder.madncc);
    }
    return nextCode;
  }

  private incrementOrderCode(orderCode: string): string {
    const prefix = 'TGNCC-';
    const letters = orderCode.slice(6, 8); // Lấy AA → ZZ
    const numbers = parseInt(orderCode.slice(8), 13); // Lấy 00001 → 99999

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

  async reorderDathangs(dathangIds: string[]) {
    // Update the order of each dathang based on its position in the array
    for (let i = 0; i < dathangIds.length; i++) {
      await this.prisma.dathang.update({
        where: { id: dathangIds[i] },
        data: { order: i + 1 },
      });
    }
  }

  async findAll() {
    const dathangs = await this.prisma.dathang.findMany({
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        nhacungcap: true,
        kho: true, // Include kho information
      },
      orderBy: { createdAt: 'desc' },
    });
    return dathangs.map((dathang) => ({
      ...dathang,
      sanpham: dathang.sanpham.map((item: any) => ({
        ...item.sanpham,
        idSP: item.idSP,
        sldat: item.sldat || 0,
        slgiao: item.slgiao || 0,
        slnhan: item.slnhan || 0,
        ttdat: item.ttdat || 0,
        ttgiao: item.ttgiao || 0,
        ttnhan: item.ttnhan || 0,
        ghichu: item.ghichu,
      })),
    }));
  }

  async findOne(id: string) {
    const dathang = await this.prisma.dathang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: {
              include: {
                TonKho: true,
              },
            },
          },
        },
        nhacungcap: true,
        kho: true, // Include kho information
      },
    });
    if (!dathang) throw new NotFoundException('Dathang not found');
    return {
      ...dathang,
      sanpham: dathang.sanpham.map((item) => {
        let computedGoiy = 0;
        if (item.sanpham.TonKho && item.sanpham.TonKho[0]) {
          const tonkho = item.sanpham.TonKho[0];
          computedGoiy = (Number(tonkho.slton) - Number(tonkho.slchogiao) + Number(tonkho.slchonhap))
            * (1 + Number(item.sanpham.haohut) / 100);
        }
        return {
          ...item.sanpham,
          idSP: item.idSP,
          goiy: Math.abs(computedGoiy),
          sldat: Number(item.sldat),
          slgiao: Number(item.slgiao),
          slnhan: Number(item.slnhan),
          slhuy: Number(item.slhuy),
          ttdat: Number(item.ttdat),
          ttgiao: Number(item.ttgiao),
          ttnhan: Number(item.ttnhan),
          gianhap: Number(item.gianhap),
          ghichu: item.ghichu,
        };
      }),
    };
  }

  async import(data: any) {      
    const convertData = await this.convertDathangImportToTransfer(data);
    let success = 0;
    let fail = 0;  
    for (const element of convertData) {
      try {
        await this.create(element);
        success += 1;
      } catch (error) {
        fail += 1;
        await this._ImportdataService.create({
          caseDetail: {
            errorMessage: error.message,
            errorStack: error.stack,
            additionalInfo: 'Error during import process',
          },
          order: 1,
          createdBy: 'system',
          title: `Import Đặt hàng ${moment().format('HH:mm:ss DD/MM/YYYY')}`,
          type: 'dathang',
        });
      }
    }
    return {
      success,
      fail,
    };
  }
async importcu(data:any){
  return {}
}
async convertDathangImportToTransfer(
  dathangimport: any[],
): Promise<any[]> {
  const dathangimporttranfer: any[] = [];

  for (const importItem of dathangimport) {
    try {
      // Tìm nhà cung cấp theo mã
      const nhacungcap = await this.prisma.nhacungcap.findFirst({
        where: { mancc: importItem.mancc }
      });

      if (!nhacungcap) {
        console.warn(`Không tìm thấy nhà cung cấp với mã: ${importItem.mancc}`);
        continue;
      }

      // Tìm kho theo makho (nếu có) hoặc lấy kho mặc định
      let kho:any = null;
      if (importItem.makho) {
        kho = await this.prisma.kho.findFirst({
          where: { 
            OR: [
              { makho: importItem.makho },
              { name: { contains: importItem.makho, mode: 'insensitive' } }
            ]
          }
        });
      }
      
      // Nếu không tìm thấy kho, lấy kho mặc định
      if (!kho) {
        kho = await this.prisma.kho.findFirst({
          where: { isActive: true },
          orderBy: { createdAt: 'asc' }
        });
      }

      // Xử lý danh sách sản phẩm
      const sanphamList: any[] = [];
      
      for (const sp of importItem.sanpham) {
        // Tìm sản phẩm theo mã
        const sanpham = await this.prisma.sanpham.findFirst({
          where: { masp: sp.masp }
        });

        if (!sanpham) {
          console.warn(`Không tìm thấy sản phẩm với mã: ${sp.masp}`);
          continue;
        }

        // Map sản phẩm theo format mới
        sanphamList.push({
          id: sanpham.id,
          masp: sanpham.masp,
          slnhan: Number(sp.slnhan) || 0,
          slgiao: Number(sp.slgiao) || 0,
          sldat: Number(sp.sldat) || 0,
        });
      }

      // Tạo object theo format đích
      const transferItem = {
        title: `Import ${moment().format('DDMMYYYY')}`,
        type: "dathang",
        ngaynhan: moment(importItem.ngaynhan).format('YYYY-MM-DD'),
        nhacungcapId: nhacungcap.id,
        nhacungcap: {
          name: nhacungcap.name,
          mancc: nhacungcap.mancc,
          diachi: nhacungcap.diachi,
          sdt: nhacungcap.sdt,
          ghichu: nhacungcap.ghichu
        },
        khoId: kho?.id || null,
        kho: kho ? {
          name: kho.name,
          diachi: kho.diachi || "",
          sdt: kho.sdt || "",
          ghichu: kho.ghichu || ""
        } : null,
        sanpham: sanphamList,
        status: importItem.status || "dadat",
        ghichu: importItem.ghichu || ""
      };

      dathangimporttranfer.push(transferItem);

    } catch (error) {
      console.error(`Lỗi khi convert item với mancc ${importItem.mancc}:`, error);
    }
  }

  return dathangimporttranfer;
}





  async search(params: any) {
    const { Batdau, Ketthuc, Type, pageSize = 10, pageNumber = 1, khoId } = params;
    const where: any = {};

    // Date filter
    if (Batdau || Ketthuc) {
      where.ngaynhan = {};
      if (Batdau) {
        where.ngaynhan.gte = moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate();
      }
      if (Ketthuc) {
        where.ngaynhan.lte = moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate();
      }
    }

    // Kho filter
    if (khoId) {
      where.khoId = khoId;
    }

    // Status filter
    if (params.Status) {
      where.status = Array.isArray(params.Status)
        ? { in: params.Status }
        : params.Status;
    }

    const [total, dathangs] = await Promise.all([
      this.prisma.dathang.count({ where }),
      this.prisma.dathang.findMany({
        where,
        include: {
          sanpham: {
            include: {
              sanpham: true,
            },
          },
          nhacungcap: true,
          kho: true, // Include kho information
        },
        orderBy: { createdAt: 'desc' },
        skip: (Number(pageNumber) - 1) * Number(pageSize),
        take: Number(pageSize),
      }),
    ]);
    return {
      data: dathangs,
      total,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getchonhap(params: any) {
    const { Batdau, Ketthuc, Type, khoId } = params;

    const where: any = {};

    // Date filter
    if (Batdau || Ketthuc) {
      where.ngaynhan = {};
      if (Batdau) {
        where.ngaynhan.gte = moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate();
      }
      if (Ketthuc) {
        where.ngaynhan.lte = moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate();
      }
    }

    // Kho filter
    if (khoId) {
      where.khoId = khoId;
    }

    // Lấy danh sách đơn hàng theo điều kiện lọc
    const dathangs = await this.prisma.dathang.findMany({
      where,
      include: {
        sanpham: {
          include: { sanpham: true },
        },
        kho: true, // Include kho information
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Gộp số lượng đặt theo từng sản phẩm
    const productMap = new Map<string, { title: string; masp: string; sldat: number }>();

    for (const dh of dathangs) {
      for (const sp of dh.sanpham) {
        if (!sp?.sanpham) continue;
        const key = sp.idSP;
        if (productMap.has(key)) {
          productMap.get(key)!.sldat += Number(sp.sldat) || 0;
        } else {
          productMap.set(key, {
            title: sp.sanpham.title,
            masp: sp.sanpham.masp,
            sldat: Number(sp.sldat) || 0,
          });
        }
      }
    }

    // Trả về danh sách tổng hợp
    return Array.from(productMap, ([idSP, value]) => ({
      idSP,
      title: value.title,
      masp: value.masp,
      slchonhaptt: parseFloat(value.sldat.toFixed(2)),
    }));
  }

  async findby(param: any) {
    const { page = 1, pageSize = 50, isOne, khoId, ...where } = param;
    const whereClause: any = {};     

    // Filter by title if provided
    if (where.subtitle) {
      whereClause.OR = [];

      if (where.subtitle) {
        whereClause.OR.push({ subtitle: { contains: where.subtitle, mode: 'insensitive' } });
        whereClause.OR.push({ madncc: { contains: where.subtitle, mode: 'insensitive' } });
        whereClause.OR.push({ title: { contains: where.subtitle, mode: 'insensitive' } });
       whereClause.OR.push({
            nhacungcap: { name: { contains: where.subtitle, mode: 'insensitive' } }
        });
       whereClause.OR.push({
            nhacungcap: { sdt: { contains: where.subtitle, mode: 'insensitive' } }
        });
      }
    }

    // Filter by ngaynhan (order receive date)
    if (where.Batdau || where.Ketthuc) {
      whereClause.ngaynhan = {};
      if (where.Batdau) {
        whereClause.ngaynhan.gte = moment(where.Batdau)
      .tz('Asia/Ho_Chi_Minh')
      .startOf('day')
      .toDate();
      }
      if (where.Ketthuc) {
        whereClause.ngaynhan.lte = moment(where.Ketthuc)
      .tz('Asia/Ho_Chi_Minh')
      .endOf('day')
      .toDate();
      }
    }

    // Filter by kho
    if (khoId) {
      whereClause.khoId = khoId;
    }

    if (isOne) {
      const oneResult = await this.prisma.dathang.findFirst({
        where: whereClause,
        include: {
          sanpham: {
            include: { sanpham: true },
          },
          nhacungcap: true,
          kho: true, // Include kho information
        },
        orderBy: { createdAt: 'desc' },
      });
      return oneResult;
    }

    const skip = (page - 1) * pageSize;
    const [dathangs, total] = await Promise.all([
      this.prisma.dathang.findMany({
        where: whereClause,
        include: {
          sanpham: {
            include: { sanpham: true },
          },
          nhacungcap: true,
          kho: true, // Include kho information
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.dathang.count({ where: whereClause }),
    ]);

    return {
      data: dathangs,
      page,
      pageSize,
      total,
      pageCount: Math.ceil(total / pageSize),
    };
  }

  async create(dto: any) {   
     
    const madathang = await this.generateNextOrderCode();
    return this.prisma.$transaction(async (prisma) => {      
      const nhacungcap = await prisma.nhacungcap.findFirst({
        where: {
          mancc: dto.nhacungcap.mancc,
        },
      });
      if (!nhacungcap)
        throw new NotFoundException('Nhà cung cấp không tồn tại');

      // Validate kho if provided
      if (dto.khoId) {
        const kho = await prisma.kho.findFirst({
          where: { id: dto.khoId },
        });
        if (!kho) {
          throw new NotFoundException('Kho không tồn tại');
        }
      } 
      // Create the new order (đặt hàng) using the generated order code
      const newDathang = await prisma.dathang.create({
        data: {
          title: dto.title,
          type: dto.type,
          madncc: madathang,
          ngaynhan: dto.ngaynhan ? new Date(dto.ngaynhan) : new Date(),
          nhacungcapId: nhacungcap.id,
          khoId: dto.khoId, // Add khoId
          isActive: dto.isActive !== undefined ? dto.isActive : true,
          order: dto.order,
          ghichu: dto.ghichu,
          sanpham: {
            create: dto?.sanpham?.map((sp: any) => ({
              idSP: sp.id,
              ghichu: sp.ghichu,
              sldat: sp.sldat || 0,
              slgiao: sp.slgiao || 0,
              slnhan: sp.slnhan || 0,
              slhuy: sp.slhuy || 0,
              ttdat: sp.ttdat || 0,
              ttgiao: sp.ttgiao || 0,
              ttnhan: sp.ttnhan || 0,
            })),
          },
        },
        include: { sanpham: true },
      });

      // Update warehouse inventory for dathang: upsert tonKho, increment slchogiao based on sldat
      for (const sp of dto.sanpham) {
        const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(2));
        await prisma.tonKho.upsert({
          where: { sanphamId: sp.id },
          update: {
            slchonhap: { increment: incrementValue },
          },
          create: {
            sanphamId: sp.id,
            slchonhap: incrementValue,
          },
        });
      }
      return newDathang;
    });
  }

  async createbynhucau(dto: any) {
    const madathang = await this.generateNextOrderCode();
    return this.prisma.$transaction(async (prisma) => {
      // Verify that the associated supplier (nhacungcap) exists
      const nhacungcap = await prisma.nhacungcap.findUnique({
        where: { id: dto.id },
      });
      if (!nhacungcap)
        throw new NotFoundException('Nhà cung cấp không tồn tại');

      // Validate kho if provided
      if (dto.khoId) {
        const kho = await prisma.kho.findUnique({
          where: { id: dto.khoId },
        });
        if (!kho) {
          throw new NotFoundException('Kho không tồn tại');
        }
      }

      // Create the new order (đặt hàng) using the generated order code
      const newDathang = await prisma.dathang.create({
        data: {
          title: dto.title,
          type: dto.type,
          madncc: madathang,
          ngaynhan: dto.ngaynhan ? new Date(dto.ngaynhan) : new Date(),
          nhacungcapId: nhacungcap.id,
          khoId: dto.khoId, // Add khoId
          isActive: dto.isActive !== undefined ? dto.isActive : true,
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
        include: { sanpham: true },
      });

      // Update warehouse inventory for dathang: upsert tonKho, increment slchogiao based on sldat
      for (const sp of dto.sanpham) {
        const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(2));
        await prisma.tonKho.upsert({
          where: { sanphamId: sp.id },
          update: {
            slchonhap: { increment: incrementValue },
          },
          create: {
            sanphamId: sp.id,
            slchonhap: incrementValue,
          },
        });
      }
      return newDathang;
    });
  }

  async update(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Lấy đơn đặt hàng cũ kèm chi tiết sản phẩm
      const oldDathang = await prisma.dathang.findUnique({
        where: { id },
        include: { sanpham: true, kho: true },
      });
      if (!oldDathang) {
        throw new NotFoundException('Đơn đặt hàng không tồn tại');
      }

      // Validate kho if changed
      if (data.khoId && data.khoId !== oldDathang.khoId) {
        const kho = await prisma.kho.findUnique({
          where: { id: data.khoId },
        });
        if (!kho) {
          throw new NotFoundException('Kho không tồn tại');
        }
      }

      // Use the khoId from data or fallback to existing khoId
      const khoId = data.khoId || oldDathang.khoId;

      // 2. Rollback từ 'dagiao' về 'dadat'
      if (oldDathang.status === 'dagiao' && data.status === 'dadat') {
        // 2.1. Hoàn lại slchonhap
        for (const sp of oldDathang.sanpham) {
          const incValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchonhap: { increment: incValue },
            },
          });
        }

        // 2.2. Xóa phiếu kho xuất
        const maphieuOld = `PX-${oldDathang.madncc}`;
        const phieuKho = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuOld },
        });
        if (phieuKho) {
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: phieuKho.id },
          });
          await prisma.phieuKho.delete({
            where: { maphieu: maphieuOld },
          });
        }

        // 2.3. Cập nhật đơn đặt hàng
        const updatedDathang = await prisma.dathang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
            nhacungcapId: data.nhacungcapId,
            khoId: khoId, // Update khoId
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
                        sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                        slgiao: 0, // Reset slgiao
                        slnhan: 0, // Reset slnhan
                        slhuy: 0, // Reset slhuy
                      },
                    })),
                  },
                }
              : {}),
          },
        });

        // 2.4. Cập nhật slchonhap theo chênh lệch sldat
        for (const sp of data.sanpham) {
          const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
          const oldItem = oldDathang.sanpham.find((o: any) => o.idSP === (sp.idSP ?? sp.id));
          const oldSlgiao = oldItem
            ? parseFloat((oldItem.slgiao ?? 0).toFixed(2))
            : 0;
          const difference = newSldat - oldSlgiao;
          if (difference !== 0) {
            await prisma.tonKho.update({
              where: { sanphamId: sp.idSP ?? sp.id },
              data: {
                slchonhap:
                  difference > 0
                    ? { increment: difference }
                    : { decrement: -difference },
              },
            });
          }
        }

        return updatedDathang;
      }

      // 3. Cập nhật đơn ở trạng thái 'dadat'
      if (oldDathang.status === 'dadat' && data.status === 'dadat') {
        // 3.1. Cập nhật slchonhap theo chênh lệch sldat
        for (const sp of data.sanpham) {
          const oldItem = oldDathang.sanpham.find((o: any) => o.idSP === (sp.idSP ?? sp.id));
          if (oldItem) {
            const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
            const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
            const difference = newSldat - oldSldat;
            if (difference !== 0) {
              await prisma.tonKho.update({
                where: { sanphamId: sp.idSP ?? sp.id },
                data: {
                  slchonhap: { increment: difference },
                },
              });
            }
          }
        }

        // 3.2. Cập nhật thông tin đơn đặt hàng
        return prisma.dathang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
            nhacungcapId: data.nhacungcapId,
            khoId: khoId, // Update khoId
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
                        sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                        slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                        slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                        slhuy: parseFloat((sp.slhuy ?? 0).toFixed(2)),
                      },
                    })),
                  },
                }
              : {}),
          },
        });
      }

      // 4. Chuyển sang 'dagiao' (xuất kho từ nhà cung cấp)
      if (data.status === 'dagiao') {
        // 4.1. Giảm slchonhap
        for (const sp of data.sanpham) {
          const decValue = parseFloat((Number(sp.slgiao) ?? 0).toFixed(2));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchonhap: { decrement: decValue },
            },
          });
        }

        // 4.2. Tạo/upsert phiếu kho xuất
        const maphieuNew = `PX-${data.madncc}-${moment().format('DDMMYYYY')}`;
        const phieuPayload = {
          ngay: data.ngaynhan ? new Date(data.ngaynhan) : new Date(),
          type: 'xuat',
          khoId: khoId, // Use the khoId from dathang
          madncc: data.madncc,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.idSP,
              soluong: parseFloat((Number(sp.slgiao) ?? 0).toFixed(2)),
              ghichu: sp.ghichu,
            })),
          },
        };

        try {
          const { sanpham, ...phieuPayloadWithoutSanpham } = phieuPayload;
          await prisma.phieuKho.upsert({
            where: { maphieu: maphieuNew },
            create: { maphieu: maphieuNew, ...phieuPayload },
            update: { ...phieuPayloadWithoutSanpham },
          });
        } catch (error) {
          console.error('Error upserting phieuKho:', error);
          throw error;
        }

        // 4.3. Cập nhật trạng thái đơn đặt hàng
        return prisma.dathang.update({
          where: { id },
          data: {
            status: 'dagiao',
            khoId: khoId, // Update khoId
            sanpham: {
              updateMany: data.sanpham.map((sp: any) => ({
                where: { idSP: sp.idSP },
                data: {
                  ghichu: sp.ghichu,
                  slgiao: parseFloat((Number(sp.slgiao) ?? 0).toFixed(2)),
                  slnhan: parseFloat((Number(sp.slnhan) ?? 0).toFixed(2)),
                  ttdat: parseFloat((Number(sp.ttdat) ?? 0).toFixed(2)),
                  ttgiao: parseFloat((Number(sp.ttgiao) ?? 0).toFixed(2)),
                  ttnhan: parseFloat((Number(sp.ttnhan) ?? 0).toFixed(2)),
                  gianhap: parseFloat((Number(sp.gianhap) ?? 0).toFixed(2)),
                },
              })),
            },
          },
        });
      }

      // 5. Chuyển sang 'danhan' (nhập kho, xử lý hao hụt)
      if (data.status === 'danhan' && oldDathang.status==='dagiao' ) {
        // Mảng lưu thông tin các sản phẩm có số lượng thiếu
        const shortageItems: {
          sanphamId: string;
          soluong: number;
          ghichu?: string;
        }[] = [];

        for (const item of data.sanpham) {
          const receivedQty = parseFloat((Number(item.slnhan) ?? 0).toFixed(2));
          const shippedQty = parseFloat((Number(item.slgiao) ?? 0).toFixed(2));
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
        // Nếu số lượng nhận bằng số lượng giao, cập nhật tồn kho (không thay đổi số lượng)
        await prisma.tonKho.update({
          where: { sanphamId: item.idSP },
          data: { slton: { increment: receivedQty} },
        });
          }
        }

        // Nếu có sản phẩm thiếu, phát sinh phiếu kho nhập hàng trả về
      if (shortageItems.length > 0) {
          // Sử dụng mã đơn hàng hiện có (madncc) để tạo mã phiếu kho nhập
        const maphieuNhap = `PX-${oldDathang.madncc}-RET-${moment().format('DDMMYYYY')}`;
        const phieuKhoData = {
        maphieu: maphieuNhap,
        ngay: new Date(data.ngaynhan), // Ngày nhập có thể sử dụng ngày giao hoặc hiện tại
        type: 'xuat', // Loại phiếu xuất
        khoId: khoId, // Use the khoId from dathang
        ghichu: 'Phiếu xuất hàng trả về do thiếu hàng khi nhận',
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

        // Cập nhật trạng thái đơn đặt hàng và thông tin từng sản phẩm
        return prisma.dathang.update({
          where: { id },
          data: {
        status: 'danhan',
        khoId: khoId, // Update khoId
        sanpham: {
          updateMany: data.sanpham.map((item: any) => {
            const delivered = parseFloat((Number(item.slgiao) ?? 0).toFixed(2));
            const received = parseFloat((Number(item.slnhan) ?? 0).toFixed(2));
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

      // 6. Chuyển sang 'huy'
      if (data.status === 'huy') {
        // 6.1. Hoàn lại slchonhap
        for (const sp of oldDathang.sanpham) {
          const incValue = parseFloat((sp.sldat ?? 0).toFixed(2));
          if (incValue > 0) {
            await prisma.tonKho.update({
              where: { sanphamId: sp.idSP },
              data: {
                slchonhap: { decrement: incValue },
              },
            });
          }
        }

        // 6.2. Xóa phiếu kho nếu có
        const maphieuOld = `PX-${oldDathang.madncc}`;
        const phieuKho = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuOld },
        });
        if (phieuKho) {
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: phieuKho.id },
          });
          await prisma.phieuKho.delete({
            where: { maphieu: maphieuOld },
          });
        }

        // 6.3. Cập nhật trạng thái đơn đặt hàng
        return prisma.dathang.update({
          where: { id },
          data: {
            status: 'huy',
            khoId: khoId, // Update khoId
            ghichu: data.ghichu || 'Đơn đặt hàng đã hủy',
            sanpham: {
              updateMany: oldDathang.sanpham.map((sp: any) => ({
                where: { idSP: sp.idSP },
                data: {
                  slgiao: 0,
                  slnhan: 0,
                  slhuy: parseFloat((sp.sldat ?? 0).toFixed(2)),
                  ghichu: sp.ghichu || 'Hủy đơn đặt hàng',
                },
              })),
            },
          },
        });
      }

     // 7. Rollback từ 'danhan' về 'dadat'
    if (oldDathang.status === 'danhan' && data.status === 'dadat') {
      // 7.1. Hoàn lại slton (số lượng đã nhập vào kho)
      for (const sp of oldDathang.sanpham) {
        const slnhan = parseFloat((sp.slnhan ?? 0).toFixed(2));
        if (slnhan > 0) {
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slton: { decrement: slnhan },
            },
          });
        }
      }

      // 7.2. Xóa phiếu kho nhập hàng trả về (nếu có)
      const maphieuReturn = `PX-${oldDathang.madncc}-RET-${moment(oldDathang.ngaynhan).format('DDMMYYYY')}`;
      const phieuKhoReturn = await prisma.phieuKho.findUnique({
        where: { maphieu: maphieuReturn },
      });
      if (phieuKhoReturn) {
        await prisma.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: phieuKhoReturn.id },
        });
        await prisma.phieuKho.delete({
          where: { maphieu: maphieuReturn },
        });
      }

      // 7.3. Khôi phục lại slchonhap
      for (const sp of data.sanpham) {
        const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
        const oldItem = oldDathang.sanpham.find((o: any) => o.idSP === sp.id);
        const oldslnhan = oldItem ? parseFloat((oldItem.slnhan ?? 0).toFixed(2)) : 0;
        const difference = newSldat - oldslnhan;    
        if (difference !== 0) {
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
              slchonhap: difference > 0 
                ? { increment: difference } 
                : { decrement: -difference },
            },
          });
        }
      }

      // 7.4. Cập nhật đơn đặt hàng về trạng thái 'dadat'
      const updatedDathang = await prisma.dathang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
          nhacungcapId: data.nhacungcapId,
          khoId: khoId, // Update khoId
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
                      sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                    },
                  })),
                },
              }
            : {}),
        },
      });

      return updatedDathang;
    }

    // 8. Từ 'dadat' chuyển sang 'danhan' (bỏ qua 'dagiao' nhưng vẫn xử lý tồn kho và phiếu kho)
    if (oldDathang.status === 'dadat' && data.status === 'danhan') {
      // 8.1. Giảm slchonhap (tồn kho chờ nhập) theo số lượng nhận thực tế
     for (const sp of data.sanpham) {
      const slnhan = parseFloat((Number(sp.slnhan) ?? 0).toFixed(2));
      await prisma.tonKho.update({
        where: { sanphamId: sp.idSP ?? sp.id },
        data: {
        slchonhap: { decrement: slnhan },
        slton: { increment: slnhan }, // Nhập kho thực tế
        },
      });
      }

      // 8.2. Nếu có sản phẩm thiếu (slnhan < sldat), tạo phiếu xuất trả về
      const shortageItems: {
      sanphamId: string;
      soluong: number;
      ghichu?: string;
      }[] = [];
      for (const item of data.sanpham) {
      const sldat = parseFloat((Number(item.sldat) ?? 0).toFixed(2));
      const slnhan = parseFloat((Number(item.slnhan) ?? 0).toFixed(2));
      if (slnhan < sldat) {
        const shortage = sldat - slnhan;
        shortageItems.push({
        sanphamId: item.id,
        soluong: shortage,
        ghichu: item.ghichu
          ? `${item.ghichu}; thiếu ${shortage.toFixed(2)}`
          : `Thiếu ${shortage.toFixed(2)}`,
        });
      }
      }
      if (shortageItems.length > 0) {
      const maphieuNhap = `PX-${oldDathang.madncc}-RET-${moment().format('DDMMYYYY')}`;
      const phieuKhoData = {
        maphieu: maphieuNhap,
        ngay: new Date(data.ngaynhan),
        type: 'xuat',
        khoId: khoId, // Use the khoId from dathang
        ghichu: 'Phiếu xuất hàng trả về do thiếu hàng khi nhận',
        isActive: data.isActive ?? true,
        sanpham: {
        create: shortageItems.map((item) => ({
          sanphamId: item.sanphamId,
          soluong: item.soluong,
          ghichu: item.ghichu,
        })),
        },
      };
      await prisma.phieuKho.create({ data: phieuKhoData });
      }

      // 8.3. Cập nhật trạng thái đơn đặt hàng và thông tin từng sản phẩm
      return prisma.dathang.update({
      where: { id },
      data: {
        status: 'danhan',
        khoId: khoId, // Update khoId
        sanpham: {
        updateMany: data.sanpham.map((item: any) => {
          const sldat = parseFloat((Number(item.sldat) ?? 0).toFixed(2));
          const slnhan = parseFloat((Number(item.slnhan) ?? 0).toFixed(2));
          const shortageNote =
          slnhan < sldat
            ? item.ghichu
            ? `${item.ghichu}; thiếu ${(sldat - slnhan).toFixed(2)}`
            : `Thiếu ${(sldat - slnhan).toFixed(2)}`
            : item.ghichu || '';
          return {
          where: { idSP: item.idSP ?? item.id },
          data: {
            ghichu: shortageNote,
            slnhan: slnhan,
            slgiao: sldat, // Ghi nhận đã giao bằng số lượng đặt
          },
          };
        }),
        },
      },
      });
    }


      throw new Error('Trạng thái không hợp lệ');
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (prisma) => {
      const dathang = await prisma.dathang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!dathang) {
        throw new NotFoundException('Đơn đặt hàng không tồn tại');
      }

      // Revert TONKHO updates based on the order's status
      // For each product, undo the creation increment.
      // If the order was already delivered ('dagiao'),
      // first reverse the delivery decrement by incrementing slchonhap.
      for (const sp of dathang.sanpham) {
        const sldat = parseFloat((sp.sldat ?? 0).toFixed(2));
        const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
        if (dathang.status === 'dagiao') {
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: { slchonhap: { increment: slgiao } },
          });
        }
        await prisma.tonKho.update({
          where: { sanphamId: sp.idSP },
          data: { slchonhap: { decrement: sldat } },
        });
      }

      // Finally, delete the order
      return prisma.dathang.delete({ where: { id } });
    });
  }

async findByProductId(idSP: string) {
  const dathangs = await this.prisma.dathang.findMany({
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
      nhacungcap: true,
      kho: true, // Include kho information
    },
    orderBy: { createdAt: 'desc' },
  });

  return dathangs.map((dathang) => ({
    ...dathang,
    sanpham: dathang.sanpham.find((item: any) => item.idSP === idSP)
  }));
}

// async importcu(data: any) {
//   try {
//     // Group data by supplier (mancc) similar to the existing import method
//     const acc: Record<string, any> = {};
//     const itemErrors: any[] = [];
    
//     for (const curr of data) {
//       try {
//         // Validate required fields
//         if (!curr.mancc || !curr.masp) {
//           itemErrors.push({
//             item: curr,
//             error: 'Missing required fields: mancc or masp'
//           });
//           continue;
//         }

//         // Group by supplier
//         if (!acc[curr.mancc]) {
//           const nhacungcap = await this.prisma.nhacungcap.findFirst({ 
//             where: { mancc: curr.mancc } 
//           });
          
//           if (!nhacungcap) {
//             itemErrors.push({
//               item: curr,
//               error: `Supplier with mancc ${curr.mancc} not found`
//             });
//             continue;
//           }
          
//           acc[curr.mancc] = {
//             title: `Import Cu ${moment().format('DD/MM/YYYY')}`,
//             ngaynhan: curr.ngaynhan || new Date(),
//             mancc: curr.mancc,
//             name: nhacungcap?.name,
//             mabanggia: curr.mabanggia,
//             khoId: curr.khoId, // Add khoId from import data
//             sanpham: [],
//             nhacungcap: {
//               mancc: curr.mancc,
//             }
//           };
//         }

//         // Check if product exists
//         const sanphamRecord = await this.prisma.sanpham.findFirst({ 
//           where: { masp: curr.masp } 
//         });
        
//         if (!sanphamRecord) {
//           itemErrors.push({
//             item: curr,
//             error: `Product with masp ${curr.masp} not found`
//           });
//           continue;
//         }

//         // Check if product already exists in the group
//         const existingSanphamIndex = acc[curr.mancc].sanpham.findIndex(
//           (item: any) => item.masp === curr.masp
//         );
        
//         if (existingSanphamIndex !== -1) {
//           // Update existing product quantities
//           acc[curr.mancc].sanpham[existingSanphamIndex].sldat += Number(curr.sldat) || 0;
//           acc[curr.mancc].sanpham[existingSanphamIndex].slgiao += Number(curr.slgiao) || 0;
//           acc[curr.mancc].sanpham[existingSanphamIndex].slnhan += Number(curr.slnhan) || 0;
//           acc[curr.mancc].sanpham[existingSanphamIndex].ttdat += Number(curr.ttdat) || 0;
//           acc[curr.mancc].sanpham[existingSanphamIndex].ttgiao += Number(curr.ttgiao) || 0;
//           acc[curr.mancc].sanpham[existingSanphamIndex].ttnhan += Number(curr.ttnhan) || 0;
//         } else {
//           // Add new product to the group
//           acc[curr.mancc].sanpham.push({
//             masp: curr.masp,
//             id: sanphamRecord.id,
//             sldat: Number(curr.sldat) || 0,
//             slgiao: Number(curr.slgiao) || 0,
//             slnhan: Number(curr.slnhan) || 0,
//             ttdat: Number(curr.ttdat) || 0,
//             ttgiao: Number(curr.ttgiao) || 0,
//             ttnhan: Number(curr.ttnhan) || 0,
//             ghichu: curr.ghichu || '',
//           });
//         }

//       } catch (error: any) {
//         console.error('Error processing item:', error);
//         itemErrors.push({
//           item: curr,
//           error: error.message
//         });
//       }
//     }

//     // Create dathang records using the existing create method
//     const convertData: any = Object.values(acc);
//     let success = 0;
//     let fail = 0;
//     const createErrors: any[] = [];

//     for (const element of convertData) {
//       try {
//         await this.create(element);
//         success += 1;
//       } catch (error: any) {
//         fail += 1;
//         console.error('Error creating dathang:', error);
//         createErrors.push({
//           supplier: element.mancc,
//           error: error.message
//         });
        
//         // Log to import data service for tracking
//         await this._ImportdataService.create({
//           caseDetail: {
//             errorMessage: error.message,
//             errorStack: error.stack,
//             additionalInfo: 'Error during importcu process',
//             supplier: element.mancc
//           },
//           order: 1,
//           createdBy: 'system',
//           title: `Import Dathang Cu ${moment().format('HH:mm:ss DD/MM/YYYY')}`,
//           type: 'dathang',
//         });
//       }
//     }

//     return {
//       success,
//       fail,
//       totalProcessed: data.length,
//       itemErrors,
//       createErrors,
//       message: `Processed ${data.length} items. ${success} suppliers created successfully, ${fail} failed.`
//     };

//   } catch (error: any) {
//     console.error('Error in importcu:', error);
//     throw error;
//   }
// }

async deletebulk(data: any) {
  try {
    const { ids } = data;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('Invalid or empty ids array');
    }

    const results: any[] = [];
    const errors: any[] = [];

    for (const id of ids) {
      try {
        await this.remove(id);
        results.push({ id, status: 'deleted' });
      } catch (error: any) {
        console.error(`Error deleting dathang ${id}:`, error);
        errors.push({ 
          id, 
          error: error.message,
          status: 'failed'
        });
        
        // Log error
        await this._ImportdataService.create({
          caseDetail: {
            errorMessage: error.message,
            errorStack: error.stack,
            additionalInfo: `Error deleting dathang with id: ${id}`,
          },
          order: 1,
          createdBy: 'system',
          title: `Delete Bulk Dathang Error ${moment().format('HH:mm:ss DD/MM/YYYY')}`,
          type: 'dathang',
        });
      }
    }

    return {
      total: ids.length,
      success: results.length,
      failed: errors.length,
      results,
      errors,
      message: `Processed ${ids.length} deletions. ${results.length} successful, ${errors.length} failed.`
    };

  } catch (error: any) {
    console.error('Error in deletebulk:', error);
    throw error;
  }
}

}

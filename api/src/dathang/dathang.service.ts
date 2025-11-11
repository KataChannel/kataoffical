import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';
import { StatusMachineService } from 'src/common/status-machine.service';
import { TonkhoManagerService } from 'src/common/tonkho-manager.service';
import { PerformanceLogger } from '../shared/performance-logger';

@Injectable()
export class DathangService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly _ImportdataService: ImportdataService,
    private readonly statusMachine: StatusMachineService,
    private readonly tonkhoManager: TonkhoManagerService,
  ) {}

  // ✅ Helper methods để thay thế TimezoneUtilService (vì frontend gửi UTC)
  private formatDateForFilename(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  private convertDateFilters(filters: any): any {
    // ✅ Frontend đã gửi UTC, chỉ cần parse trực tiếp
    const result: any = {};
    
    if (filters.fromDate) {
      result.fromDate = new Date(filters.fromDate);
    }
    
    if (filters.toDate) {
      result.toDate = new Date(filters.toDate);
    }
    
    return result;
  }

  async generateNextOrderCode(): Promise<string> {
    return await PerformanceLogger.logAsync('DathangService.generateNextOrderCode', async () => {
      // Lấy mã đơn hàng gần nhất
      const lastOrder = await this.prisma.dathang.findFirst({
        orderBy: { createdAt: 'desc' },
      });

      let nextCode = 'TGNCC-AA00001'; // Mã đầu tiên

      if (lastOrder && lastOrder.madncc) {
        nextCode = this.incrementOrderCode(lastOrder.madncc);
      }
      return nextCode;
    });
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
    return await PerformanceLogger.logAsync('DathangService.findAll', async () => {
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
    });
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
          title: `Import Đặt hàng ${new Date().toLocaleString('vi-VN')}`,
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
        title: `Import ${this.formatDateForFilename()}`,
        type: "dathang",
        ngaynhan: importItem.ngaynhan ? new Date(importItem.ngaynhan).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
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

    // ✅ Date filter - Frontend gửi UTC nên parse trực tiếp
    if (Batdau || Ketthuc) {
      where.ngaynhan = {
        ...(Batdau && { gte: new Date(Batdau) }),
        ...(Ketthuc && { lte: new Date(Ketthuc) })
      };
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

    // ✅ Date filter - Frontend gửi UTC nên parse trực tiếp
    if (Batdau || Ketthuc) {
      where.ngaynhan = {
        ...(Batdau && { gte: new Date(Batdau) }),
        ...(Ketthuc && { lte: new Date(Ketthuc) })
      };
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
      slchonhaptt: parseFloat(value.sldat.toFixed(3)),
    }));
  }

  async findby(param: any) {
    console.log('findby', param);
    
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

    if (where.Batdau || where.Ketthuc) {
      whereClause.ngaynhan = {
        ...(where.Batdau && { gte: new Date(where.Batdau) }),
        ...(where.Ketthuc && { lte: new Date(where.Ketthuc) })
      };
      console.log('dateRange', whereClause.ngaynhan);
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
              ttnhan: Number(sp.slnhan*sp.gianhap) || 0,
            })),
          },
        },
        include: { sanpham: true },
      });

      // Update warehouse inventory for dathang: upsert tonKho, increment slchogiao based on sldat
      for (const sp of dto.sanpham) {
        const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(3));
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
              sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
              slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
              slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
              slhuy: parseFloat((sp.slhuy ?? 0).toFixed(3)),
              ttdat: parseFloat((sp.ttdat ?? 0).toFixed(3)),
              ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
              ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(3)),
            })),
          },
        },
        include: { sanpham: true },
      });

      // Update warehouse inventory for dathang: upsert tonKho, increment slchogiao based on sldat
      for (const sp of dto.sanpham) {
        const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(3));
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

      // 1.1. Validate status transition if status is changing
      if (data.status && data.status !== oldDathang.status) {
        const transition = this.statusMachine.validateTransition(
          oldDathang.status as any,
          data.status as any,
          'dathang'
        );
        if (!transition.isValid) {
          throw new Error(`Invalid status transition: ${transition.reason}`);
        }
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
          const incValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
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
                        sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                        slgiao:  parseFloat((sp.slgiao ?? 0).toFixed(3)),
                        slnhan:  parseFloat((sp.slnhan ?? 0).toFixed(3)),
                        slhuy: parseFloat((sp.slhuy ?? 0).toFixed(3)),
                        gianhap: parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0,
                        ttnhan: Number((sp.slnhan ?? 0) * (sp.gianhap ?? 0)) || 0,
                      },
                    })),
                  },
                }
              : {}),
          },
        });

        // 2.4. Cập nhật slchonhap theo chênh lệch sldat
        for (const sp of data.sanpham) {
          const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
          const oldItem = oldDathang.sanpham.find((o: any) => o.idSP === (sp.idSP ?? sp.id));
          const oldSlgiao = oldItem
            ? parseFloat((oldItem.slgiao ?? 0).toFixed(3))
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
        // 3.1. Xử lý sản phẩm bị xóa - giảm slchonhap
        const oldProductIds = oldDathang.sanpham.map((sp: any) => sp.idSP);
        const newProductIds = data.sanpham.map((sp: any) => sp.idSP ?? sp.id);
        const deletedProductIds = oldProductIds.filter((id: string) => !newProductIds.includes(id));
        
        for (const deletedId of deletedProductIds) {
          const deletedItem = oldDathang.sanpham.find((sp: any) => sp.idSP === deletedId);
          if (deletedItem && Number(deletedItem.sldat) > 0) {
            await prisma.tonKho.update({
              where: { sanphamId: deletedId },
              data: {
                slchonhap: { decrement: parseFloat((deletedItem.sldat ?? 0).toFixed(3)) },
              },
            });
          }
        }

        // 3.2. Xử lý sản phẩm mới và cập nhật sản phẩm hiện có
        for (const sp of data.sanpham) {
          const oldItem = oldDathang.sanpham.find((o: any) => o.idSP === (sp.idSP ?? sp.id));
          const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
          
          if (oldItem) {
            // Sản phẩm đã tồn tại - cập nhật theo chênh lệch
            const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(3));
            const difference = newSldat - oldSldat;
            if (difference !== 0) {
              await prisma.tonKho.update({
                where: { sanphamId: sp.idSP ?? sp.id },
                data: {
                  slchonhap: { increment: difference },
                },
              });
            }
          } else {
            // Sản phẩm mới - tăng slchonhap
            if (newSldat > 0) {
              await prisma.tonKho.upsert({
                where: { sanphamId: sp.idSP ?? sp.id },
                update: {
                  slchonhap: { increment: newSldat },
                },
                create: {
                  sanphamId: sp.idSP ?? sp.id,
                  slchonhap: newSldat,
                  slton: 0,
                  slchogiao: 0,
                },
              });
            }
          }
        }

        // 3.3. Xóa các sản phẩm không còn trong danh sách mới
        if (deletedProductIds.length > 0) {
          await prisma.dathangsanpham.deleteMany({
            where: {
              dathangId: id,
              idSP: { in: deletedProductIds },
            },
          });
        }

        // 3.4. Cập nhật thông tin đơn đặt hàng với xử lý create/update sản phẩm
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
          },
        });

        // 3.5. Xử lý upsert từng sản phẩm để tránh conflict
        for (const sp of data.sanpham) {
          const existingProduct = await prisma.dathangsanpham.findFirst({
            where: {
              dathangId: id,
              idSP: sp.idSP ?? sp.id,
            },
          });

          if (existingProduct) {
            // Update existing product
            await prisma.dathangsanpham.update({
              where: { id: existingProduct.id },
              data: {
                ghichu: sp.ghichu,
                sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                slhuy: parseFloat((sp.slhuy ?? 0).toFixed(3)),
                gianhap: parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0,
                ttnhan: Number((sp.slnhan ?? 0) * (sp.gianhap ?? 0)) || 0,
              },
            });
          } else {
            // Create new product
            await prisma.dathangsanpham.create({
              data: {
                dathangId: id,
                idSP: sp.idSP ?? sp.id,
                ghichu: sp.ghichu,
                sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                slhuy: parseFloat((sp.slhuy ?? 0).toFixed(3)),
                ttdat: parseFloat((sp.ttdat ?? 0).toFixed(3)),
                ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                gianhap: parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0,
                ttnhan: Number((sp.slnhan ?? 0) * (sp.gianhap ?? 0)) || 0,
              },
            });
          }
        }

        return prisma.dathang.findUnique({
          where: { id },
          include: { sanpham: true },
        });
      }

      // 4. Chuyển sang 'dagiao' (xuất kho từ nhà cung cấp)
      if (data.status === 'dagiao') {
        // 4.1. Giảm slchonhap
        for (const sp of data.sanpham) {
          const decValue = parseFloat((Number(sp.slgiao) ?? 0).toFixed(3));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchonhap: { decrement: decValue },
            },
          });
        }

        // 4.2. Tạo/upsert phiếu kho xuất
        const maphieuNew = `PX-${data.madncc}-${this.formatDateForFilename()}`;
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
              soluong: parseFloat((Number(sp.slgiao) ?? 0).toFixed(3)),
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
                  slgiao: parseFloat((Number(sp.slgiao) ?? 0).toFixed(3)),
                  slnhan: parseFloat((Number(sp.slnhan) ?? 0).toFixed(3)),
                  ttdat: parseFloat((Number(sp.ttdat) ?? 0).toFixed(3)),
                  ttgiao: parseFloat((Number(sp.ttgiao) ?? 0).toFixed(3)),
                  ttnhan: Number((sp.slnhan ?? 0) * (sp.gianhap ?? 0)) || 0,
                  gianhap: parseFloat((Number(sp.gianhap) ?? 0).toFixed(3)),
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
          const receivedQty = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
          const shippedQty = parseFloat((Number(item.slgiao) ?? 0).toFixed(3));
          
          // Tăng tồn kho theo số lượng thực nhận
          await prisma.tonKho.update({
            where: { sanphamId: item.idSP },
            data: { slton: { increment: receivedQty } },
          });
          
          // Nếu thiếu hàng, tạo phiếu xuất trả về cho phần thiếu
          if (receivedQty < shippedQty) {
            const shortage = shippedQty - receivedQty;
            shortageItems.push({
              sanphamId: item.idSP,
              soluong: shortage,
              ghichu: item.ghichu
                ? `${item.ghichu}; thiếu ${shortage.toFixed(3)}`
                : `Thiếu ${shortage.toFixed(3)}`,
            });
          }
        }

        // Nếu có sản phẩm thiếu, phát sinh phiếu kho nhập hàng trả về
      if (shortageItems.length > 0) {
          // Sử dụng mã đơn hàng hiện có (madncc) để tạo mã phiếu kho nhập
        const maphieuNhap = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
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
            const delivered = parseFloat((Number(item.slgiao) ?? 0).toFixed(3));
            const received = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
            const shortageNote =
          received < delivered
            ? item.ghichu
              ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(3)}`
              : `Thiếu ${(delivered - received).toFixed(3)}`
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
          const incValue = parseFloat((sp.sldat ?? 0).toFixed(3));
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
                  slhuy: parseFloat((sp.sldat ?? 0).toFixed(3)),
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
        const slnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
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
      const maphieuReturn = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
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
        const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
        const oldItem = oldDathang.sanpham.find((o: any) => o.idSP === sp.id);
        const oldslnhan = oldItem ? parseFloat((oldItem.slnhan ?? 0).toFixed(3)) : 0;
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
                      sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
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
      const slnhan = parseFloat((Number(sp.slnhan) ?? 0).toFixed(3));
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
      const sldat = parseFloat((Number(item.sldat) ?? 0).toFixed(3));
      const slnhan = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
      if (slnhan < sldat) {
        const shortage = sldat - slnhan;
        shortageItems.push({
        sanphamId: item.id,
        soluong: shortage,
        ghichu: item.ghichu
          ? `${item.ghichu}; thiếu ${shortage.toFixed(3)}`
          : `Thiếu ${shortage.toFixed(3)}`,
        });
      }
      }
      if (shortageItems.length > 0) {
      const maphieuNhap = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
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
          const sldat = parseFloat((Number(item.sldat) ?? 0).toFixed(3));
          const slnhan = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
          const shortageNote =
          slnhan < sldat
            ? item.ghichu
            ? `${item.ghichu}; thiếu ${(sldat - slnhan).toFixed(3)}`
            : `Thiếu ${(sldat - slnhan).toFixed(3)}`
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
        const sldat = parseFloat((sp.sldat ?? 0).toFixed(3));
        const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(3));
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
//           title: `Import Dathang Cu ${new Date().toLocaleString('vi-VN')}`,
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
          title: `Delete Bulk Dathang Error ${new Date().toLocaleString('vi-VN')}`,
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

  // 🎯 NEW METHODS: Xử lý đặt hàng tồn đọng cho workflow chốt kho

  /**
   * Tìm các đặt hàng theo trạng thái và sản phẩm
   */
  async findOrdersByStatus(params: {
    sanphamId: string;
    status: string[];
  }): Promise<any[]> {
    try {
      const data = await this.prisma.dathang.findMany({
        where: {
          status: { in: params.status as any[] },
          sanpham: {
            some: {
              idSP: params.sanphamId
            }
          }
        },
        include: {
          sanpham: {
            where: { idSP: params.sanphamId }
          },
          nhacungcap: {
            select: {
              id: true,
              name: true,
              mancc: true
            }
          }
        }
      });
      
      return data || [];
    } catch (error) {
      console.error('Error finding dathang by status:', error);
      return [];
    }
  }

  /**
   * Hoàn tất đặt hàng - chuyển trạng thái sang 'danhan'
   */
  async completeDathang(id: string, data: {
    status: string;
    slnhan: number;
    completedBy?: string;
    completedAt?: Date;
    ghichu?: string;
  }): Promise<{ success: boolean; message?: string }> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Lấy đặt hàng hiện tại
        const dathang = await prisma.dathang.findUnique({
          where: { id },
          include: { sanpham: true }
        });

        if (!dathang) {
          return { success: false, message: 'Đặt hàng không tồn tại' };
        }

        // Cập nhật trạng thái đặt hàng sang danhan
        await prisma.dathang.update({
          where: { id },
          data: {
            status: 'danhan',
            ghichu: data.ghichu,
            updatedAt: new Date()
          }
        });

        // Cập nhật số lượng nhận trong dathangsanpham
        for (const sp of dathang.sanpham) {
          await prisma.dathangsanpham.update({
            where: { id: sp.id },
            data: {
              slnhan: data.slnhan,
              ghichu: data.ghichu
            }
          });

          // 🎯 QUAN TRỌNG: Cập nhật TonKho - giảm slchonhap về 0 và tăng slton
          const oldSlchonhap = parseFloat((sp.slgiao || 0).toString()); // slgiao trong dathang = slchonhap
          const newSlnhan = parseFloat(data.slnhan.toString());
          
          await this.updateTonKhoSafely(sp.idSP, {
            slchonhap: { decrement: oldSlchonhap }, // Giảm slchonhap về 0
            slton: { increment: newSlnhan } // Tăng số lượng tồn
          });
        }

        return { success: true, message: 'Hoàn tất đặt hàng thành công' };
      });
    } catch (error) {
      console.error('Error completing dathang:', error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Hoàn tất tất cả đặt hàng chờ nhập cho sản phẩm cụ thể
   */
  async completePendingReceiptsForProduct(sanphamId: string): Promise<{ success: boolean; count: number; message?: string }> {
    try {
      // First, find all pending orders without transaction to avoid timeout
      const pendingOrders = await this.prisma.dathang.findMany({
        where: {
          status: { in: ['dadat', 'dagiao'] },
          sanpham: {
            some: {
              idSP: sanphamId,
              slgiao: { gt: 0 } // slgiao trong dathang tương đương slchonhap
            }
          }
        },
        include: {
          sanpham: {
            where: { idSP: sanphamId }
          }
        }
      });

      if (pendingOrders.length === 0) {
        return {
          success: true,
          count: 0,
          message: 'Không có đặt hàng chờ nhập nào'
        };
      }

      // Process in smaller batches to avoid transaction timeout
      const batchSize = 10;
      let totalCompleted = 0;

      for (let i = 0; i < pendingOrders.length; i += batchSize) {
        const batch = pendingOrders.slice(i, i + batchSize);
        
        const batchResult = await this.prisma.$transaction(async (prisma) => {
          let batchCount = 0;
          
          for (const order of batch) {
            // Collect all sanpham updates for this order
            const sanphamUpdates = order.sanpham.map(sp => ({
              id: sp.id,
              slnhan: parseFloat(sp.slgiao.toString()),
              ghichu: (sp.ghichu || '') + ' | Auto-completed for inventory close'
            }));

            // Update order status
            await prisma.dathang.update({
              where: { id: order.id },
              data: {
                status: 'danhan',
                ghichu: (order.ghichu || '') + ' | Tự động hoàn tất trước chốt kho',
                updatedAt: new Date()
              }
            });

            // Batch update all sanpham for this order
            for (const update of sanphamUpdates) {
              await prisma.dathangsanpham.update({
                where: { id: update.id },
                data: {
                  slnhan: update.slnhan,
                  ghichu: update.ghichu
                }
              });
            }

            // Update TonKho using atomic operations
            for (const sp of order.sanpham) {
              const slgiaoValue = parseFloat(sp.slgiao.toString());
              await this.tonkhoManager.updateTonkhoAtomic([{
                sanphamId: sp.idSP,
                operation: 'increment',
                slton: slgiaoValue,
                slchonhap: -slgiaoValue, // Decrease slchonhap
                reason: `Auto-complete pending receipt for order ${order.madncc}`
              }]);
            }

            batchCount += order.sanpham.length;
          }
          
          return batchCount;
        }, {
          timeout: 30000 // Increase timeout to 30 seconds
        });

        totalCompleted += batchResult;
      }

      return {
        success: true,
        count: totalCompleted,
        message: `Đã hoàn tất ${totalCompleted} đặt hàng chờ nhập`
      };
    } catch (error) {
      console.error('Error completing pending receipts:', error);
      return {
        success: false,
        count: 0,
        message: error.message || 'Lỗi khi hoàn tất đặt hàng chờ nhập'
      };
    }
  }

  /**
   * Helper method to safely update TonKho, creating record if not exists
   */
  private async updateTonKhoSafely(sanphamId: string, updateData: any): Promise<void> {
    try {
      // Kiểm tra TonKho có tồn tại không
      const existingTonKho = await this.prisma.tonKho.findUnique({
        where: { sanphamId }
      });

      if (existingTonKho) {
        // Update existing record
        await this.prisma.tonKho.update({
          where: { sanphamId },
          data: updateData
        });
      } else {
        // Create new record với giá trị mặc định
        const initialValue = this.calculateInitialTonKhoValue(updateData);
        await this.prisma.tonKho.create({
          data: {
            sanphamId,
            slton: initialValue.slton,
            slchogiao: initialValue.slchogiao,
            slchonhap: initialValue.slchonhap
          }
        });
      }
    } catch (error) {
      console.error(`Error updating TonKho for product ${sanphamId}:`, error);
      throw error;
    }
  }

  /**
   * Helper to calculate initial value for TonKho creation
   */
  private calculateInitialTonKhoValue(updateData: any): {
    slton: number;
    slchogiao: number; 
    slchonhap: number;
  } {
    // Tính toán giá trị ban đầu dựa trên updateData
    let slton = 0;
    let slchogiao = 0;
    let slchonhap = 0;

    if (updateData.slton) {
      if (typeof updateData.slton === 'object' && updateData.slton.increment) {
        slton = updateData.slton.increment;
      } else {
        slton = updateData.slton;
      }
    }

    if (updateData.slchogiao) {
      if (typeof updateData.slchogiao === 'object' && updateData.slchogiao.increment) {
        slchogiao = updateData.slchogiao.increment;
      } else if (typeof updateData.slchogiao === 'object' && updateData.slchogiao.decrement) {
        slchogiao = -updateData.slchogiao.decrement;
      } else {
        slchogiao = updateData.slchogiao;
      }
    }

    if (updateData.slchonhap) {
      if (typeof updateData.slchonhap === 'object' && updateData.slchonhap.increment) {
        slchonhap = updateData.slchonhap.increment;
      } else if (typeof updateData.slchonhap === 'object' && updateData.slchonhap.decrement) {
        slchonhap = -updateData.slchonhap.decrement;
      } else {
        slchonhap = updateData.slchonhap;
      }
    }

    return { slton, slchogiao, slchonhap };
  }

  // 🎯 ADDITIONAL METHODS for GraphQL integration

  /**
   * Get pending receipts with full details for frontend
   */
  async getPendingReceiptsForProduct(sanphamId: string): Promise<any[]> {
    try {
      const orders = await this.prisma.dathang.findMany({
        where: {
          status: { in: ['dadat', 'dagiao'] },
          sanpham: {
            some: {
              idSP: sanphamId,
              slgiao: { gt: 0 }
            }
          }
        },
        include: {
          sanpham: {
            where: { idSP: sanphamId }
          },
          nhacungcap: {
            select: {
              id: true,
              name: true,
              mancc: true
            }
          }
        }
      });

      return orders.map(order => ({
        id: order.id,
        status: order.status,
        nhacungcap: order.nhacungcap,
        sanpham: order.sanpham[0], // Since we filtered by sanphamId
        createdAt: order.createdAt
      }));
    } catch (error) {
      console.error('Error getting pending receipts for product:', error);
      return [];
    }
  }

  async congnoncc(params: any) {
    console.time('🚀 CONGNONCC Performance');
    const { Batdau, Ketthuc, query } = params;

    // ✅ Optimized date range for Dathang
    const dateRange = {
        gte: Batdau ? new Date(Batdau) : undefined,
        lte: Ketthuc ? new Date(Ketthuc) : undefined,
      }

    const where: any = {
      ngaynhan: dateRange,
      status: Array.isArray(params.Status)
        ? { in: params.Status }
        : params.Status,
    };

    if (query) {
      where.OR = [
        { madncc: { contains: query, mode: 'insensitive' } },
        { nhacungcap: { name: { contains: query, mode: 'insensitive' } } },
      ];
    }

    console.time('⚡ Database Query');
    // 🔥 PERFORMANCE OPTIMIZATION: Use selective fields instead of full includes
    const dathangs = await this.prisma.dathang.findMany({
      where,
      select: {
        id: true,
        madncc: true,
        ngaynhan: true,
        nhacungcap: {
          select: {
            name: true,
            mancc: true
          }
        },
        sanpham: {
          select: {
            slnhan: true,
            sanpham: {
              select: {
                giaban: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
    console.timeEnd('⚡ Database Query');
    
    console.time('💨 Data Processing');
    const result = dathangs.map((v: any) => {
      let tong = 0;
      let soluong = 0;
      
      // 🔥 OPTIMIZATION: Direct arithmetic without parseFloat overhead
      // ✅ BUGFIX: Skip products with slnhan = 0 (not actually received)
      for (const item of v.sanpham) {
        const slnhan = Number(item.slnhan) || 0;
        if (slnhan === 0) continue; // Skip unreceived products
        const giaban = Number(item.sanpham?.giaban) || 0;
        tong += slnhan * giaban;
        soluong += slnhan;
      }
      
      return {
        id: v.id,
        madathang: v.madncc,
        ngaynhan: v.ngaynhan,
        tong: tong.toFixed(3),
        soluong: soluong.toFixed(3),
        tonnhap: tong.toFixed(3), // Calculate total from aggregated data
        tennhacungcap: v.nhacungcap?.name,
        manhacungcap: v.nhacungcap?.mancc,
      }
    });
    console.timeEnd('💨 Data Processing');
    
    console.timeEnd('🚀 CONGNONCC Performance');
    console.log(`📊 Processed ${result.length} Dathang records`);
    
    return result || [];
  }

  async downloadcongnoncc(params: any) {
    const { Batdau, Ketthuc, query, ids } = params;
    
    // ✅ Sử dụng date range cho đặt hàng  
    const dateRange =  {
        gte: Batdau ? new Date(Batdau) : undefined,
        lte: Ketthuc ? new Date(Ketthuc) : undefined,
    } 
    
    const where: any = {
      ngaynhan: dateRange,
      status: Array.isArray(params.Status)
        ? { in: params.Status }
        : params.Status,
    };
    
    if(ids?.length > 0){
      where.id = { in: ids };
    }
    
    if (query) {
      where.OR = [
        { madncc: { contains: query, mode: 'insensitive' } }, // Thay đổi từ madonhang
        { nhacungcap: { name: { contains: query, mode: 'insensitive' } } }, // Thay đổi từ khachhang
      ];
    }
    
    const dathangs = await this.prisma.dathang.findMany({ // Thay đổi từ donhang
      where,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        nhacungcap: true, // Thay đổi từ khachhang
      },
      orderBy: { createdAt: 'desc' },
    });
    
    const Sanphams = await this.prisma.sanpham.findMany();
    
    // Step 1: Flatten all order items với thông tin cơ bản
    // ✅ BUGFIX: Filter out products with slnhan = 0 (not actually received)
    const flatItems = dathangs.flatMap((v: any) => {
      return v.sanpham
        .filter((item: any) => Number(item.slnhan) > 0) // Skip unreceived products
        .map((item: any) => ({
          madathang: v.madncc, // Thay đổi từ madonhang
          ngaynhan: v.ngaynhan,
          tennhacungcap: v.nhacungcap?.name, // Thay đổi từ tenkhachhang
          manhacungcap: v.nhacungcap?.mancc, // Thay đổi từ makhachhang
          sdt: v.nhacungcap?.sdt,
          diachi: v.nhacungcap?.diachi,
          sanphamId: item.sanphamId,
          title: item.sanpham?.title,
          masp: item.sanpham?.masp,
          dvt: item.sanpham?.dvt,
          giaban: parseFloat((item.sanpham?.giaban || 0).toString()),
          slnhan: parseFloat((item.slnhan || 0).toString()),
          tongtien: parseFloat((item.slnhan || 0).toString()) * parseFloat((item.sanpham?.giaban || 0).toString()),
          ghichu: item.ghichu,
          vat: v.vat || 0,
          tongvat: v.tongvat || 0,
          tongtienOrder: v.tongtien || 0,
        }));
    });

    // Step 2: Group by customer and calculate totals
    const customerGroups = flatItems.reduce((groups: any, item: any) => {
      const key = `${item.manhacungcap}_${item.tennhacungcap}`; // Thay đổi key
      
      if (!groups[key]) {
        groups[key] = {
          manhacungcap: item.manhacungcap, // Thay đổi từ makhachhang
          tennhacungcap: item.tennhacungcap, // Thay đổi từ tenkhachhang
          sdt: item.sdt,
          diachi: item.diachi,
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
          vatAmount: 0,
          finalAmount: 0
        };
      }
      
      groups[key].items.push(item);
      groups[key].totalQuantity += item.slnhan;
      groups[key].totalAmount += item.tongtien;
      
      return groups;
    }, {});

    // Step 3: Create final Excel data
    const excelData = Object.values(customerGroups).flatMap((group: any) => {
      // Calculate totals for this customer
      const subtotal = group.totalAmount;
      const vatRate = group.items[0]?.vat || 0;
      const vatAmount = subtotal * vatRate;
      const finalTotal = subtotal + vatAmount;
      
      // Create rows for each item
      const itemRows = group.items.map((item: any, index: number) => ({
        'STT': index + 1,
        'Mã Đặt Hàng': item.madathang, // Thay đổi từ 'Mã Đơn Hàng'
        'Ngày Giao': item.ngaynhan ? new Date(item.ngaynhan).toLocaleDateString('vi-VN') : '',
        'Mã NCC': item.manhacungcap, // Thay đổi từ 'Mã KH'
        'Tên Nhà Cung Cấp': item.tennhacungcap, // Thay đổi từ 'Tên Khách Hàng'
        'SĐT': item.sdt,
        'Địa Chỉ': item.diachi,
        'Mã SP': item.masp,
        'Tên Sản Phẩm': item.title,
        'ĐVT': item.dvt,
        'Giá Bán': item.giaban,
        'Số Lượng': item.slnhan,
        'Thành Tiền': item.tongtien,
        'Ghi Chú': item.ghichu,
        // Show totals only in first row of each customer
        'Tổng Số Lượng': index === 0 ? group.totalQuantity : '',
        'Tổng Tiền': index === 0 ? subtotal : '',
        'Thuế VAT (%)': index === 0 ? (vatRate * 100) : '',
        'Tiền Thuế': index === 0 ? vatAmount : '',
        'Tổng Cộng': index === 0 ? finalTotal : '',
      }));
      
      return itemRows;
    });

    // Step 4: Create Excel file using XLSX
    const XLSX = require('xlsx-js-style');
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths
    const colWidths = [
      { wch: 5 },  // STT
      { wch: 15 }, // Mã Đặt Hàng
      { wch: 12 }, // Ngày Giao
      { wch: 10 }, // Mã NCC
      { wch: 25 }, // Tên Nhà Cung Cấp
      { wch: 12 }, // SĐT
      { wch: 30 }, // Địa Chỉ
      { wch: 10 }, // Mã SP
      { wch: 30 }, // Tên Sản Phẩm
      { wch: 8 },  // ĐVT
      { wch: 12 }, // Giá Bán
      { wch: 10 }, // Số Lượng
      { wch: 15 }, // Thành Tiền
      { wch: 20 }, // Ghi Chú
      { wch: 15 }, // Tổng Số Lượng
      { wch: 15 }, // Tổng Tiền
      { wch: 12 }, // Thuế VAT (%)
      { wch: 15 }, // Tiền Thuế
      { wch: 15 }, // Tổng Cộng
    ];
    ws['!cols'] = colWidths;
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Công Nợ NCC'); // Thay đổi sheet name
    
    // Generate filename with timestamp
    const dateStr = this.formatDateForFilename();
    const filename = `CongNoNCC_${dateStr}.xlsx`; // Thay đổi filename
    
    return XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
  }

}

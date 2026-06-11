import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment-timezone';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from '../importdata/importdata.service';
import { StatusMachineService } from '../common/status-machine.service';
import { TonkhoManagerService } from '../common/tonkho-manager.service';
import { PerformanceLogger } from '../shared/performance-logger';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class DathangService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly _ImportdataService: ImportdataService,
    private readonly statusMachine: StatusMachineService,
    private readonly tonkhoManager: TonkhoManagerService,
    private readonly notificationService: NotificationService,
  ) {}

  // ✅ Helper methods để thay thế TimezoneUtilService (vì frontend gửi UTC)
  async getCompletionDate(ngaynhan: Date | string, khoId: string | null, prismaTx?: any): Promise<Date> {
    const prisma = prismaTx || this.prisma;
    const targetKhoId = khoId || "4cc01811-61f5-4bdc-83de-a493764e9258";
    
    // Parse ngaynhan and find the VN date boundary
    const vnMoment = moment.tz(ngaynhan, 'Asia/Ho_Chi_Minh');
    const startOfVNDay = vnMoment.clone().startOf('day').toDate();
    const endOfVNDay = vnMoment.clone().endOf('day').toDate();
    
    // Find active Chotkho record for the target warehouse on that day
    let chotkho = await prisma.chotkho.findFirst({
      where: {
        khoId: targetKhoId,
        isActive: true,
        ngaychot: {
          gte: startOfVNDay,
          lte: endOfVNDay
        }
      },
      orderBy: { ngaychot: 'desc' }
    });
    
    // Fallback to KHO_HCM if not found
    if (!chotkho && targetKhoId !== "4cc01811-61f5-4bdc-83de-a493764e9258") {
      chotkho = await prisma.chotkho.findFirst({
        where: {
          khoId: "4cc01811-61f5-4bdc-83de-a493764e9258",
          isActive: true,
          ngaychot: {
            gte: startOfVNDay,
            lte: endOfVNDay
          }
        },
        orderBy: { ngaychot: 'desc' }
      });
    }
    
    if (chotkho) {
      // Return 1 second before the chốt kho session
      return new Date(chotkho.ngaychot.getTime() - 1000);
    }
    
    // If no chốt kho session exists for that day yet, return the current time
    return new Date();
  }

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
      // 🚀 OPTIMIZATION: Limited to 100 most recent records to prevent "High memory usage" (860MB+)
      // as seen in logs. Over time, fetching thousands of orders with full includes
      // will crash the server.
      const dathangs = await this.prisma.dathang.findMany({
        take: 100,
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
          // 🎯 FIX LOGIC GOIY: Mục tiêu là bù đắp phần còn thiếu để về 0 (hoặc tồn an toàn)
          // Dự kiến tồn = Tồn hiện tại - Chờ giao + Chờ nhập
          const expectedStock = Number(tonkho.slton) - Number(tonkho.slchogiao) + Number(tonkho.slchonhap);
          
          if (expectedStock < 0) {
            // Nếu dự kiến âm, gợi ý nhập đúng phần âm đó + bù hao hụt
            computedGoiy = Math.abs(expectedStock) * (1 + Number(item.sanpham.haohut) / 100);
          } else {
            // Nếu dự kiến vẫn còn dương, không cần gợi ý nhập thêm (tránh thừa hàng)
            computedGoiy = 0;
          }
        }
        return {
          ...item.sanpham,
          idSP: item.idSP,
          goiy: computedGoiy, // 🎯 Đã bỏ Math.abs vì đã xử lý logic âm/dương ở trên
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
    
    if (success > 0) {
      this.notificationService.broadcastToAdmins({
        title: 'Import Đặt Hàng Thành Công',
        body: `Đã import thành công ${success} đơn đặt hàng.`,
        url: '/admin/dathang/list',
        type: 'import'
      }).catch(err => console.error('Failed to send notification:', err));
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
    
    const { page: rawPage = 1, pageSize: rawPageSize = 50, isOne, khoId, ...where } = param;
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

    const pageSize = Math.min(Math.max(Number(rawPageSize) || 10, 1), 1000); // 🛡️ CAP at 1000 to prevent OOM/Bridge errors
    const pageNumber = Math.max(Number(rawPage) || 1, 1);
    const skip = (pageNumber - 1) * pageSize;
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
        page: pageNumber,
        pageSize,
        total,
        pageCount: Math.ceil(total / pageSize),
      };
    }

  async create(dto: any) {   
     
    const madathang = await this.generateNextOrderCode();
    const result = await this.prisma.$transaction(async (prisma) => {      
      if (!dto.nhacungcap || !dto.nhacungcap.mancc) {
        throw new BadRequestException('Thông tin nhà cung cấp không hợp lệ');
      }
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
          ngaynhanEnd: dto.ngaynhanEnd ? new Date(dto.ngaynhanEnd) : null,
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
              ttnhan: parseFloat(((sp.slnhan || 0) * (sp.gianhap || 0)).toFixed(3)),
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

    if (result) {
      const nhacungcap = result.nhacungcapId ? await this.prisma.nhacungcap.findUnique({ where: { id: result.nhacungcapId } }) : null;
      this.notificationService.broadcastToAdmins({
        title: 'Đặt Hàng Mới',
        body: `Đơn đặt hàng ${result.madncc} đã được tạo cho NCC ${nhacungcap?.name || 'N/A'}.`,
        url: `/admin/dathang/detail/${result.id}`,
        type: 'dathang'
      }).catch(err => console.error('Failed to send notification:', err));

      this.notificationService.handleDathangEvent(result, 'CREATE').catch(err => {
        console.error('Failed to send post-closing telegram notification for dathang:', err);
      });
    }

    return result;
  }

  async createbynhucau(dto: any) {
    const madathang = await this.generateNextOrderCode();
    const result = await this.prisma.$transaction(async (prisma) => {
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
          ngaynhanEnd: dto.ngaynhanEnd ? new Date(dto.ngaynhanEnd) : null,
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
              ttnhan: parseFloat(((sp.slnhan || 0) * (sp.gianhap || 0)).toFixed(3)),
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

    if (result) {
      const nhacungcap = result.nhacungcapId ? await this.prisma.nhacungcap.findUnique({ where: { id: result.nhacungcapId } }) : null;
      this.notificationService.broadcastToAdmins({
        title: 'Đặt Hàng Mới (Nhu Cầu)',
        body: `Đơn đặt hàng ${result.madncc} đã được tạo cho NCC ${nhacungcap?.name || 'N/A'}.`,
        url: `/admin/dathang/detail/${result.id}`,
        type: 'dathang'
      }).catch(err => console.error('Failed to send notification:', err));

      this.notificationService.handleDathangEvent(result, 'CREATE').catch(err => {
        console.error('Failed to send post-closing telegram notification for dathang:', err);
      });
    }

    return result;
  }

  private async shouldSkipInventory(dathang: { ngaynhan: Date | null, createdAt: Date, khoId: string | null }, prisma: any): Promise<boolean> {
    const targetKhoId = dathang.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258";
    let latestChot = await prisma.chotkho.findFirst({
      where: { khoId: targetKhoId, isActive: true },
      orderBy: { ngaychot: 'desc' },
      select: { ngaychot: true }
    });
    
    // Nếu kho này không có chốt kho, dùng chốt kho của KHO-HCM làm mốc tham chiếu hệ thống toàn cục
    if (!latestChot && targetKhoId !== "4cc01811-61f5-4bdc-83de-a493764e9258") {
      latestChot = await prisma.chotkho.findFirst({
        where: { khoId: "4cc01811-61f5-4bdc-83de-a493764e9258", isActive: true },
        orderBy: { ngaychot: 'desc' },
        select: { ngaychot: true }
      });
    }
    
    if (!latestChot) return false;
    
    const effectiveDate = dathang.ngaynhan || dathang.createdAt;
    
    // Chuyển sang chuỗi ngày YYYY-MM-DD ở múi giờ Việt Nam (+07:00) để so sánh chính xác tuyệt đối
    const toVNDateStr = (date: Date): string => {
      const d = new Date(new Date(date).getTime() + 7 * 60 * 60 * 1000);
      return d.toISOString().split('T')[0];
    };

    const orderDateStr = toVNDateStr(effectiveDate);
    const chotkhoDateStr = toVNDateStr(latestChot.ngaychot);

    return orderDateStr <= chotkhoDateStr;
  }

  async update(id: string, data: any) {
    const oldDathangForAlert = await this.prisma.dathang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: true
          }
        },
        nhacungcap: true
      }
    });

    const result = await this.prisma.$transaction(async (prisma) => {
      // 1. Lấy đơn đặt hàng cũ kèm chi tiết sản phẩm
      const oldDathang = await prisma.dathang.findUnique({
        where: { id },
        include: { sanpham: true, kho: true },
      });
      if (!oldDathang) {
        throw new NotFoundException('Đơn đặt hàng không tồn tại');
      }

      const skipInventory = await this.shouldSkipInventory(oldDathang, prisma);

      // 🎯 LOCKING PERIOD CHECK: Đã loại bỏ phần lock chốt kho theo yêu cầu

      // 1.1. Validate status transition if status is changing
      const status = data.status || oldDathang.status;
      if (data.status && data.status !== oldDathang.status) {
        const transition = this.statusMachine.validateTransition(
          'dathang',
          oldDathang.status as any,
          data.status as any,
          true,
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

      // 10. Cập nhật khi ở trạng thái 'choxuly' (không thay đổi trạng thái hoặc giữ nguyên choxuly)
      if (oldDathang.status === 'choxuly' && status === 'choxuly') {
        const oldProductIds = oldDathang.sanpham.map((sp: any) => sp.idSP);
        const newProductIds = data.sanpham ? data.sanpham.map((sp: any) => sp.idSP ?? sp.id) : [];
        const deletedProductIds = oldProductIds.filter((id: string) => !newProductIds.includes(id));

        // Xóa các sản phẩm không còn trong danh sách mới
        if (deletedProductIds.length > 0) {
          await prisma.dathangsanpham.deleteMany({
            where: {
              dathangId: id,
              idSP: { in: deletedProductIds },
            },
          });
        }

        // Cập nhật thông tin đơn đặt hàng
        await prisma.dathang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
            ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
            nhacungcapId: data.nhacungcapId,
            khoId: khoId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            status: 'choxuly',
          },
        });

        // Xử lý upsert từng sản phẩm
        if (data.sanpham) {
          for (const sp of data.sanpham) {
            const spId = sp.idSP ?? sp.id;
            const existingProduct = await prisma.dathangsanpham.findFirst({
              where: {
                dathangId: id,
                idSP: spId,
              },
            });

            if (existingProduct) {
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
              await prisma.dathangsanpham.create({
                data: {
                  dathangId: id,
                  idSP: spId,
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
        }

        return prisma.dathang.findUnique({
          where: { id },
          include: { sanpham: true },
        });
      }

      // 11. Từ 'choxuly' chuyển sang 'dadat' (Xác nhận đặt hàng)
      if (oldDathang.status === 'choxuly' && status === 'dadat') {
        const oldProductIds = oldDathang.sanpham.map((sp: any) => sp.idSP);
        const newProductIds = data.sanpham ? data.sanpham.map((sp: any) => sp.idSP ?? sp.id) : [];
        const deletedProductIds = oldProductIds.filter((id: string) => !newProductIds.includes(id));

        // Xóa các sản phẩm không còn trong danh sách mới
        if (deletedProductIds.length > 0) {
          await prisma.dathangsanpham.deleteMany({
            where: {
              dathangId: id,
              idSP: { in: deletedProductIds },
            },
          });
        }

        // Tăng slchonhap cho các sản phẩm trong đơn hàng mới
        if (!skipInventory && data.sanpham) {
          for (const sp of data.sanpham) {
            const spId = sp.idSP ?? sp.id;
            const newSldat = parseFloat((sp.sldat ?? 0).toFixed(3));
            if (newSldat > 0) {
              await prisma.tonKho.upsert({
                where: { sanphamId: spId },
                update: {
                  slchonhap: { increment: newSldat },
                },
                create: {
                  sanphamId: spId,
                  slchonhap: newSldat,
                  slton: 0,
                  slchogiao: 0,
                },
              });
            }
          }
        }

        // Cập nhật thông tin đơn đặt hàng
        await prisma.dathang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
            ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
            nhacungcapId: data.nhacungcapId,
            khoId: khoId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            status: 'dadat',
          },
        });

        // Xử lý upsert từng sản phẩm
        if (data.sanpham) {
          for (const sp of data.sanpham) {
            const spId = sp.idSP ?? sp.id;
            const existingProduct = await prisma.dathangsanpham.findFirst({
              where: {
                dathangId: id,
                idSP: spId,
              },
            });

            if (existingProduct) {
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
              await prisma.dathangsanpham.create({
                data: {
                  dathangId: id,
                  idSP: spId,
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
        }

        return prisma.dathang.findUnique({
          where: { id },
          include: { sanpham: true },
        });
      }

      // 2. Rollback từ 'dagiao' về 'dadat'
      if (oldDathang.status === 'dagiao' && status === 'dadat') {
        // 2.1. Hoàn lại slchonhap
        if (!skipInventory) {
          for (const sp of oldDathang.sanpham) {
            const incValue = parseFloat((sp.slgiao ?? 0).toFixed(3));
            await prisma.tonKho.update({
              where: { sanphamId: sp.idSP },
              data: {
                slchonhap: { increment: incValue },
              },
            });
          }
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
            ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
            nhacungcapId: data.nhacungcapId,
            khoId: khoId, // Update khoId
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            status: 'dadat',
            ngayHoanThanhThucte: null,
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
        if (!skipInventory) {
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
        }

        return updatedDathang;
      }

      // 3. Cập nhật đơn ở trạng thái 'dadat'
      if (oldDathang.status === 'dadat' && status === 'dadat') {
        // 3.1. Xử lý sản phẩm bị xóa - giảm slchonhap
        const oldProductIds = oldDathang.sanpham.map((sp: any) => sp.idSP);
        const newProductIds = data.sanpham.map((sp: any) => sp.idSP ?? sp.id);
        const deletedProductIds = oldProductIds.filter((id: string) => !newProductIds.includes(id));
        
        if (!skipInventory) {
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
        }

        // 3.2. Xử lý sản phẩm mới và cập nhật sản phẩm hiện có
        if (!skipInventory) {
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
            ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
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
      if (status === 'dagiao') {
        // 4.1. Giảm slchonhap
        // for (const sp of data.sanpham) {
        //   const decValue = parseFloat((Number(sp.slgiao) ?? 0).toFixed(3));
        //   await prisma.tonKho.update({
        //     where: { sanphamId: sp.idSP },
        //     data: {
        //       slchonhap: { decrement: decValue },
        //     },
        //   });
        // }
        // 🚩 GIỮ NGUYÊN slchonhap ở bước DAGIAO (Đang về) để phản ánh đúng thực tế đang trên đường.
        // Sẽ giảm slchonhap khi sang bước DANHAN (Đã nhận).

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
      if (status === 'danhan' && oldDathang.status==='dagiao' ) {
        const completionDate = await this.getCompletionDate(
          oldDathang.ngaynhan || new Date(),
          oldDathang.khoId,
          prisma
        );

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
          const oldSp = oldDathang.sanpham.find(o => o.idSP === item.idSP);
          const reservedQty = parseFloat((Number(oldSp?.sldat) ?? 0).toFixed(3));
          
          // Tôi nên tách làm 2 operations hoặc update manager.
          
          // Để an toàn và nhanh chóng, tôi sẽ dùng manager cho slton và prisma cho slchonhap 
          // (vì slchonhap chỉ có ở bảng tổng TonKho, không có ở SanphamKho)
          
          if (!skipInventory) {
            await prisma.tonKho.update({
              where: { sanphamId: item.idSP },
              data: { slchonhap: { decrement: reservedQty } }
            });
          }
          
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

        if (!skipInventory) {
          // ✅ NEW: Phát sinh phiếu kho NHẬP HÀNG cho số lượng thực nhận (Traceability Fix)
          const maphieuNhapChuan = `PN-${oldDathang.madncc}-${this.formatDateForFilename()}`;
          await prisma.phieuKho.create({
            data: {
              maphieu: maphieuNhapChuan,
              ngay: completionDate,
              createdAt: completionDate,
              updatedAt: completionDate,
              type: 'nhap',
              khoId: khoId,
              madncc: oldDathang.madncc,
              ghichu: `Nhập kho tự động từ đơn đặt hàng ${oldDathang.madncc}`,
              isActive: data.isActive ?? true,
              sanpham: {
                create: data.sanpham.map((item) => ({
                  sanphamId: item.idSP,
                  soluong: parseFloat((Number(item.slnhan) ?? 0).toFixed(3)),
                  ghichu: item.ghichu,
                })),
              },
            },
          });

          // Nếu có sản phẩm thiếu, phát sinh phiếu kho nhập hàng trả về (Hao hụt)
          if (shortageItems.length > 0) {
            // Sử dụng mã đơn hàng hiện có (madncc) để tạo mã phiếu kho nhập
            const maphieuShortage = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
            const phieuKhoData = {
              maphieu: maphieuShortage,
              ngay: completionDate,
              createdAt: completionDate,
              updatedAt: completionDate,
              type: 'xuat', // Loại phiếu xuất trả về
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
        }

        // Cập nhật trạng thái đơn đặt hàng và thông tin từng sản phẩm
        return prisma.dathang.update({
          where: { id },
          data: {
        status: 'danhan',
        khoId: khoId, // Update khoId
        ngayHoanThanhThucte: oldDathang.ngayHoanThanhThucte || completionDate,
        updatedAt: completionDate,
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

      // 🎯 NEW: Điều chỉnh số lượng tồn kho nếu ĐÃ ở trạng thái 'danhan' và có thay đổi slnhan
      if (status === 'danhan' && oldDathang.status === 'danhan' && data.sanpham) {
        for (const item of data.sanpham) {
          const oldSp = oldDathang.sanpham.find(o => o.idSP === item.id || o.idSP === item.idSP);
          if (oldSp) {
            const oldReceived = parseFloat((Number(oldSp.slnhan) ?? 0).toFixed(3));
            const newReceived = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
            const delta = newReceived - oldReceived;

            if (delta !== 0 && !skipInventory) {
              await this.tonkhoManager.updateTonkhoAtomic([{
                sanphamId: oldSp.idSP,
                khoId: khoId,
                operation: delta > 0 ? 'increment' : 'decrement',
                slton: Math.abs(delta),
                reason: `Điều chỉnh số lượng nhập cho đơn ${oldDathang.madncc} (${oldReceived} -> ${newReceived})`
              }]);
              console.log(`📌 [DATHANG-UPDATE] Adjusted stock for ${oldSp.idSP}: delta ${delta}`);
            }
          }
        }
      }

      // 6. Chuyển sang 'huy', 'choxuly', hoặc 'khonggiao'
      if (['huy', 'choxuly', 'khonggiao'].includes(status)) {
        // 6.1. Hoàn lại slton nếu từ 'danhan'
        if (oldDathang.status === 'danhan') {
          for (const sp of oldDathang.sanpham) {
            const slnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
            if (slnhan > 0 && !skipInventory) {
              // ✅ Sử dụng TonkhoManagerService để hoàn kho nguyên tử (Cả Tổng và Chi tiết)
              if (oldDathang.khoId) {
                await this.tonkhoManager.updateTonkhoAtomic([{
                  sanphamId: sp.idSP,
                  khoId: oldDathang.khoId || undefined,
                  operation: 'decrement',
                  slton: slnhan,
                  reason: `Hoàn kho do đơn hàng ${oldDathang.madncc} chuyển trạng thái ${status}`
                }]);
              } else {
                // Fallback nếu không có khoId (không nên xảy ra)
                await prisma.tonKho.update({
                  where: { sanphamId: sp.idSP },
                  data: { slton: { decrement: slnhan } },
                });
              }
            }
          }
        }

        // 6.2. Hoàn lại slchonhap nếu từ 'dadat' hoặc 'dagiao'
        if (['dadat', 'dagiao'].includes(oldDathang.status) && !skipInventory) {
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
        }

        // 6.3. Xóa phiếu kho nếu có
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

        // 6.4. Cập nhật trạng thái đơn đặt hàng
        return prisma.dathang.update({
          where: { id },
          data: {
            status: status,
            khoId: khoId, // Update khoId
            ghichu: data.ghichu || `Đơn đặt hàng chuyển sang ${status}`,
            ngayHoanThanhThucte: null,
            sanpham: {
              updateMany: oldDathang.sanpham.map((sp: any) => ({
                where: { idSP: sp.idSP },
                data: {
                  slgiao: 0,
                  slnhan: 0,
                  slhuy: status === 'huy' ? parseFloat((sp.sldat ?? 0).toFixed(3)) : 0,
                  ghichu: sp.ghichu || `Chuyển sang ${status}`,
                },
              })),
            },
          },
        });
      }

     // 7. Rollback từ 'danhan' về 'dadat'
    if (oldDathang.status === 'danhan' && status === 'dadat') {
      // 7.1. Hoàn lại slton (hoàn kho số lượng đã nhập) atomically
      if (!skipInventory) {
        for (const sp of oldDathang.sanpham) {
          const slnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
          if (slnhan > 0) {
            await this.tonkhoManager.updateTonkhoAtomic([{
              sanphamId: sp.idSP,
              khoId: oldDathang.khoId || undefined,
              operation: 'decrement',
              slton: slnhan,
              reason: `Hoàn kho khi rollback đơn hàng ${oldDathang.madncc} từ Đã nhận về Đã đặt`
            }], prisma);
          }
        }
      }

      // 7.2. Xóa các phiếu kho nhập hàng (PN-...) và phiếu xuất trả hàng (PX-...-RET-...) liên quan đến đơn hàng này
      const relatedPhieuKhos = await prisma.phieuKho.findMany({
        where: {
          OR: [
            { maphieu: { startsWith: `PN-${oldDathang.madncc}` } },
            { maphieu: { startsWith: `PX-${oldDathang.madncc}-RET-` } }
          ]
        }
      });
      for (const pk of relatedPhieuKhos) {
        await prisma.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: pk.id },
        });
        await prisma.phieuKho.delete({
          where: { id: pk.id },
        });
      }

      // 7.3. Khôi phục lại slchonhap
      if (!skipInventory) {
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
      }

      // 7.4. Cập nhật đơn đặt hàng về trạng thái 'dadat'
      const updatedDathang = await prisma.dathang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
          ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
          nhacungcapId: data.nhacungcapId,
          khoId: khoId, // Update khoId
          isActive: data.isActive,
          order: data.order,
          ghichu: data.ghichu,
          status: 'dadat',
          ngayHoanThanhThucte: null,
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
    if (oldDathang.status === 'dadat' && status === 'danhan') {
      const completionDate = await this.getCompletionDate(
        oldDathang.ngaynhan || new Date(),
        oldDathang.khoId,
        prisma
      );

      // 8.1. Cập nhật tồn kho (Cả Tổng và Chi tiết)
      if (!skipInventory) {
        for (const sp of data.sanpham) {
          const receivedQty = parseFloat((Number(sp.slnhan) ?? 0).toFixed(3));
          const oldSp = oldDathang.sanpham.find(o => o.idSP === (sp.idSP ?? sp.id));
          const reservedQty = parseFloat((Number(oldSp?.sldat) ?? 0).toFixed(3));
          
          await this.tonkhoManager.updateTonkhoAtomic([{
            sanphamId: sp.idSP ?? sp.id,
            khoId: khoId,
            operation: 'increment',
            slton: receivedQty,
            reason: `Nhập kho tự động từ đơn đặt hàng ${oldDathang.madncc} (Bỏ qua bước Đã giao)`
          }], prisma);

          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP ?? sp.id },
            data: {
              slchonhap: { decrement: reservedQty },
            },
          });
        }
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

      if (!skipInventory) {
        // ✅ NEW: Phát sinh phiếu kho NHẬP HÀNG cho số lượng thực nhận (Traceability Fix)
        const maphieuNhapChuan = `PN-${oldDathang.madncc}-${this.formatDateForFilename()}`;
        await prisma.phieuKho.create({
          data: {
            maphieu: maphieuNhapChuan,
            ngay: completionDate,
            createdAt: completionDate,
            updatedAt: completionDate,
            type: 'nhap',
            khoId: khoId,
            madncc: oldDathang.madncc,
            ghichu: `Nhập kho tự động từ đơn đặt hàng ${oldDathang.madncc} (Bỏ qua bước Đã giao)`,
            isActive: data.isActive ?? true,
            sanpham: {
              create: data.sanpham.map((item) => ({
                sanphamId: item.idSP ?? item.id,
                soluong: parseFloat((Number(item.slnhan) ?? 0).toFixed(3)),
                ghichu: item.ghichu,
              })),
            },
          },
        });

        if (shortageItems.length > 0) {
          const maphieuShortage = `PX-${oldDathang.madncc}-RET-${this.formatDateForFilename()}`;
          const phieuKhoData = {
            maphieu: maphieuShortage,
            ngay: completionDate,
            createdAt: completionDate,
            updatedAt: completionDate,
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
      }

      // LOG TRACKING METADATA
      await prisma.importHistory.create({
        data: {
          caseDetail: {
            dathangId: id,
            madncc: oldDathang.madncc,
            products: data.sanpham.map((item: any) => {
              const sldat = parseFloat((Number(item.sldat) ?? 0).toFixed(3));
              const slnhan = parseFloat((Number(item.slnhan) ?? 0).toFixed(3));
              return {
                idSP: item.sanphamId ?? item.id,
                sldat: sldat,
                slnhan: slnhan,
                chenhlech: sldat - slnhan
              };
            }),
            additionalInfo: "Lưu vết tự động đối soát lúc nhận hàng",
          },
          order: 1,
          createdBy: "system",
          title: `[Metadata] Đối soát nhận hàng ${oldDathang.madncc} - ${new Date().toLocaleString('vi-VN')}`,
          type: "dathang_audit",
        }
      });

      // 8.3. Cập nhật trạng thái đơn đặt hàng và thông tin từng sản phẩm
      return prisma.dathang.update({
      where: { id },
      data: {
        status: 'danhan',
        khoId: khoId, // Update khoId
        ngayHoanThanhThucte: oldDathang.ngayHoanThanhThucte || completionDate,
        updatedAt: completionDate,
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
            slgiao: item.slgiao !== undefined && Number(item.slgiao) > 0 ? parseFloat(Number(item.slgiao).toFixed(3)) : sldat, // Ghi nhận đã giao theo thực tế hoặc theo đặt
          },
          };
        }),
        },
      },
      });
    }

      // 12. Chuyển từ 'danhan' sang 'hoanthanh' (Hoàn thành đơn đặt hàng)
      if (oldDathang.status === 'danhan' && status === 'hoanthanh') {
        return await prisma.dathang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
            ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
            nhacungcapId: data.nhacungcapId,
            khoId: khoId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            status: 'hoanthanh',
          },
          include: { sanpham: true }
        });
      }

      // 13. Chuyển ngược từ 'hoanthanh' về 'danhan'
      if (oldDathang.status === 'hoanthanh' && status === 'danhan') {
        return await prisma.dathang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
            ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
            nhacungcapId: data.nhacungcapId,
            khoId: khoId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            status: 'danhan',
          },
          include: { sanpham: true }
        });
      }

      // 9. Cập nhật khi ở trạng thái 'danhan'
      if (oldDathang.status === 'danhan' && status === 'danhan') {
        const oldProductIds = oldDathang.sanpham.map((sp: any) => sp.idSP);
        const newProductIds = data.sanpham.map((sp: any) => sp.idSP ?? sp.id);
        const deletedProductIds = oldProductIds.filter((id: string) => !newProductIds.includes(id));

        // 9.1. Xử lý sản phẩm bị xóa - giảm slton (Trừ kho chi tiết và tổng) atomically
        if (!skipInventory) {
          for (const deletedId of deletedProductIds) {
            const deletedItem = oldDathang.sanpham.find((sp: any) => sp.idSP === deletedId);
            const slnhan = deletedItem ? parseFloat((deletedItem.slnhan ?? 0).toFixed(3)) : 0;
            if (slnhan > 0) {
              await this.tonkhoManager.updateTonkhoAtomic([{
                sanphamId: deletedId,
                khoId: oldDathang.khoId || undefined,
                operation: 'decrement',
                slton: slnhan,
                reason: `Trừ kho do xóa sản phẩm khỏi đơn đặt hàng đã nhận ${oldDathang.madncc}`
              }], prisma);
            }
          }
        }

        if (deletedProductIds.length > 0) {
          await prisma.dathangsanpham.deleteMany({
            where: {
              dathangId: id,
              idSP: { in: deletedProductIds },
            },
          });
        }

        // 9.2. Xử lý sản phẩm mới và cập nhật sản phẩm hiện có
        for (const sp of data.sanpham) {
          const spId = sp.idSP ?? sp.id;
          const oldItem = oldDathang.sanpham.find((o: any) => o.idSP === spId);
          const newSlnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
          const newGianhap = parseFloat((sp.gianhap ?? 0).toFixed(3)) || 0;

          if (oldItem) {
            // ❌ ĐÃ BỎ: Không tự cập nhật slton ở đây nữa vì đã được điều chỉnh nguyên tử qua TonkhoManager ở dòng 1159 (Sửa lỗi Double Update)
            /*
            const oldSlnhan = parseFloat((oldItem.slnhan ?? 0).toFixed(3));
            const diff = newSlnhan - oldSlnhan;
            if (diff !== 0) {
              await prisma.tonKho.update({
                where: { sanphamId: spId },
                data: {
                  slton: { increment: diff },
                },
              });
            }
            */

            // Đảm bảo slchonhap luôn được dọn sạch cho đơn Đã nhận
            if (!skipInventory) {
              await prisma.tonKho.update({
                where: { sanphamId: spId },
                data: {
                  slchonhap: { set: 0 } // Reset về 0 nếu có rác cũ
                }
              });
            }

            await prisma.dathangsanpham.update({
              where: { id: oldItem.id },
              data: {
                slnhan: newSlnhan,
                gianhap: newGianhap,
                ttnhan: Number(newSlnhan * newGianhap),
                ghichu: sp.ghichu,
                sldat: parseFloat((sp.sldat ?? oldItem.sldat ?? 0).toFixed(3)),
                slgiao: parseFloat((sp.slgiao ?? oldItem.slgiao ?? 0).toFixed(3)),
              }
            });
          } else {
            // Sản phẩm mới - tăng slton
            if (newSlnhan > 0 && !skipInventory) {
              await this.tonkhoManager.updateTonkhoAtomic([{
                sanphamId: spId,
                khoId: khoId || undefined,
                operation: 'increment',
                slton: newSlnhan,
                reason: `Nhập kho cho sản phẩm mới được thêm vào đơn ${oldDathang.madncc}`
              }], prisma);
            }

            await prisma.dathangsanpham.create({
              data: {
                dathangId: id,
                idSP: spId,
                slnhan: newSlnhan,
                sldat: parseFloat((sp.sldat ?? sp.slnhan ?? 0).toFixed(3)),
                slgiao: parseFloat((sp.slgiao ?? sp.slnhan ?? 0).toFixed(3)),
                gianhap: newGianhap,
                ttnhan: Number(newSlnhan * newGianhap),
                ghichu: sp.ghichu,
                isActive: true,
              }
            });
          }
        }

        // 🎯 NEW: Đồng bộ lại phiếu nhập kho tự động (Traceability & Stock Voucher Sync)
        const phieuKhoNhap = await prisma.phieuKho.findFirst({
          where: {
            madncc: oldDathang.madncc,
            type: 'nhap',
          },
        });

        if (phieuKhoNhap) {
          // Xóa các sản phẩm đã bị xóa khỏi đơn NCC khỏi phiếu nhập kho
          if (deletedProductIds.length > 0) {
            await prisma.phieuKhoSanpham.deleteMany({
              where: {
                phieuKhoId: phieuKhoNhap.id,
                sanphamId: { in: deletedProductIds },
              },
            });
          }

          // Cập nhật hoặc thêm các sản phẩm trong phiếu nhập kho theo slnhan mới
          for (const sp of data.sanpham) {
            const spId = sp.idSP ?? sp.id;
            const newSlnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));

            if (newSlnhan > 0) {
              await prisma.phieuKhoSanpham.upsert({
                where: {
                  phieuKhoId_sanphamId: {
                    phieuKhoId: phieuKhoNhap.id,
                    sanphamId: spId,
                  },
                },
                update: {
                  soluong: newSlnhan,
                  ghichu: sp.ghichu,
                },
                create: {
                  phieuKhoId: phieuKhoNhap.id,
                  sanphamId: spId,
                  soluong: newSlnhan,
                  ghichu: sp.ghichu,
                },
              });
            } else {
              // Nếu số nhận = 0, xóa khỏi phiếu nhập kho
              await prisma.phieuKhoSanpham.deleteMany({
                where: {
                  phieuKhoId: phieuKhoNhap.id,
                  sanphamId: spId,
                },
              });
            }
          }
        }

        await prisma.importHistory.create({
          data: {
            caseDetail: {
              dathangId: id,
              madncc: oldDathang.madncc,
              products: data.sanpham.map((sp: any) => {
                const sldat = parseFloat((sp.sldat ?? 0).toFixed(3));
                const slnhan = parseFloat((sp.slnhan ?? 0).toFixed(3));
                return {
                  idSP: sp.idSP ?? sp.id,
                  sldat: sldat,
                  slnhan: slnhan,
                  chenhlech: sldat - slnhan
                };
              }),
              additionalInfo: "Sửa đổi số liệu sau khi hoàn tất Nhận hàng",
            },
            order: 1,
            createdBy: "system",
            title: `[Metadata] Cập nhật đối soát nhận hàng ${oldDathang.madncc} - ${new Date().toLocaleString('vi-VN')}`,
            type: "dathang_audit",
          }
        });

        return await prisma.dathang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
            ngaynhanEnd: data.ngaynhanEnd ? new Date(data.ngaynhanEnd) : undefined,
            nhacungcapId: data.nhacungcapId,
            khoId: khoId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
          },
          include: { sanpham: true }
        });
      }

      throw new Error('Trạng thái không hợp lệ');

    });

    if (result) {
      this.notificationService.handleDathangEvent(result, 'UPDATE', oldDathangForAlert).catch(err => {
        console.error('Failed to send post-closing telegram notification for dathang update:', err);
      });
    }

    return result;
  }

  async remove(id: string) {
    const oldDathangForAlert = await this.prisma.dathang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: true
          }
        },
        nhacungcap: true
      }
    });

    const result = await this.prisma.$transaction(async (prisma) => {
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

    if (result && oldDathangForAlert) {
      this.notificationService.handleDathangEvent(oldDathangForAlert, 'DELETE').catch(err => {
        console.error('Failed to send post-closing telegram notification for dathang deletion:', err);
      });
    }

    return result;
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

        const completionDate = await this.getCompletionDate(
          dathang.ngaynhan || new Date(),
          dathang.khoId,
          prisma
        );

        // Cập nhật trạng thái đặt hàng sang danhan
        await prisma.dathang.update({
          where: { id },
          data: {
            status: 'danhan',
            ghichu: data.ghichu,
            ngayHoanThanhThucte: dathang.ngayHoanThanhThucte || completionDate,
            updatedAt: completionDate
          }
        });

        const skipInventory = await this.shouldSkipInventory(dathang, prisma);

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
          
          if (!skipInventory) {
            await this.updateTonKhoSafely(sp.idSP, {
              slchonhap: { decrement: oldSlchonhap }, // Giảm slchonhap về 0
              slton: { increment: newSlnhan } // Tăng số lượng tồn
            });
          }
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
      // Find all pending orders that contain this product
      const pendingOrders = await this.prisma.dathang.findMany({
        where: {
          status: { in: ['dadat', 'dagiao'] },
          sanpham: { some: { idSP: sanphamId } }
        },
        include: {
          sanpham: true // Fetch ALL items in these orders
        }
      });

      if (pendingOrders.length === 0) {
        // ✅ Still sync stock to reality even if no orders found, to fix discrepancies!
        await this.tonkhoManager.syncStockToReality(sanphamId);
        return {
          success: true,
          count: 0,
          message: 'Đã hoàn tất đồng bộ tồn kho thực tế'
        };
      }

      // Process in batches to avoid transaction timeout and reduce roundtrips
      const batchSize = 25;
      let totalCompletedItems = 0;

      for (let i = 0; i < pendingOrders.length; i += batchSize) {
        const batch = pendingOrders.slice(i, i + batchSize);
        
        await this.prisma.$transaction(async (tx) => {
          for (const order of batch) {
            const completionDate = await this.getCompletionDate(
              order.ngaynhan || new Date(),
              order.khoId,
              tx
            );

            // 1. Update order status to 'danhan'
            await tx.dathang.update({
              where: { id: order.id },
              data: {
                status: 'danhan',
                ghichu: (order.ghichu || '') + ' | Hoàn tất chờ nhập (Tự động)',
                ngayHoanThanhThucte: order.ngayHoanThanhThucte || completionDate,
                updatedAt: completionDate
              }
            });

            const skipInventory = await this.shouldSkipInventory(order, tx);

            // 2. Update EVERY product in this order to be received
            for (const sp of order.sanpham) {
              const sldat = parseFloat(sp.sldat.toString()) || 0;
              const slgiao = parseFloat(sp.slgiao.toString()) || 0;
              
              // If slgiao is 0 but sldat > 0, we assume they are receiving what was ordered
              const qtyToReceive = slgiao > 0 ? slgiao : sldat;
              
              if (qtyToReceive > 0) {
                await tx.dathangsanpham.update({
                  where: { id: sp.id },
                  data: {
                    slnhan: qtyToReceive,
                    ghichu: (sp.ghichu || '') + ' | Tự động khớp lệnh'
                  }
                });

                if (!skipInventory) {
                  // Update TonKho atomically
                  await tx.tonKho.upsert({
                    where: { sanphamId: sp.idSP },
                    create: {
                      sanphamId: sp.idSP,
                      slton: qtyToReceive,
                      slchonhap: 0,
                      slchogiao: 0
                    },
                    update: {
                      slton: { increment: qtyToReceive },
                      slchonhap: { decrement: sldat } // Use sldat as that's what frontend counts as incoming
                    }
                  });
                }
                
                totalCompletedItems++;
              }
            }
          }

          // ✅ AUTO-SNAPSHOT: Sync system stock to reality for this product
          await this.tonkhoManager.syncStockToReality(sanphamId, tx);

        }, {
          timeout: 40000 // Increased timeout for per-product updates
        });
      }

      return {
        success: true,
        count: totalCompletedItems,
        message: `Đã hoàn tất ${totalCompletedItems} mục hàng`
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
   * Hoàn tất hàng chờ nhập cho danh sách nhiều sản phẩm (Bulk Processing)
   */
  async completePendingReceiptsBulk(sanphamIds: string[]): Promise<{ success: boolean; count: number; totalProducts: number }> {
    try {
      // 1. Fetch all pending orders that involve ANY of these products
      const orders = await this.prisma.dathang.findMany({
        where: {
          status: { in: ['dadat', 'dagiao'] },
          sanpham: { some: { idSP: { in: sanphamIds } } }
        },
        include: {
          sanpham: true // Fetch ALL items in these orders
        }
      });
      
      if (orders.length === 0) {
        // ✅ Still sync all requested products to fix discrepancies!
        for (const id of sanphamIds) {
          await this.tonkhoManager.syncStockToReality(id);
        }
        return { success: true, count: 0, totalProducts: sanphamIds.length };
      }

      const batchSize = 40; 
      let totalItems = 0;
      const uniqueProducts = new Set<string>();

      for (let i = 0; i < orders.length; i += batchSize) {
        const batch = orders.slice(i, i + batchSize);
        
        await this.prisma.$transaction(async (tx) => {
          // 🚀 Gom nhóm cập nhật TonKho để tránh Deadlock và tăng tốc
          const tonkhoUpdates = new Map<string, { slton: number; slchonhap: number }>();

          for (const order of batch) {
            const completionDate = await this.getCompletionDate(
              order.ngaynhan || new Date(),
              order.khoId,
              tx
            );

            // Cập nhật trạng thái đơn hàng (tuần tự)
            await tx.dathang.update({
              where: { id: order.id },
              data: {
                status: 'danhan',
                ghichu: (order.ghichu || '') + ' | Bulk match process',
                ngayHoanThanhThucte: order.ngayHoanThanhThucte || completionDate,
                updatedAt: completionDate
              }
            });

            for (const sp of order.sanpham) {
              const sldat = parseFloat(sp.sldat.toString()) || 0;
              const slgiao = parseFloat(sp.slgiao.toString()) || 0;
              const qtyToReceive = slgiao > 0 ? slgiao : sldat;

              if (qtyToReceive > 0) {
                // Cập nhật dathangsanpham
                await tx.dathangsanpham.update({
                  where: { id: sp.id },
                  data: { slnhan: qtyToReceive, ghichu: (sp.ghichu || '') + ' | Bulk match' }
                });
                
                // Gom dữ liệu để update TonKho 1 lần duy nhất
                const current = tonkhoUpdates.get(sp.idSP) || { slton: 0, slchonhap: 0 };
                tonkhoUpdates.set(sp.idSP, {
                  slton: current.slton + qtyToReceive,
                  slchonhap: current.slchonhap + sldat
                });

                uniqueProducts.add(sp.idSP);
                totalItems++;
              }
            }
          }
          
          // 🚀 Thực hiện cập nhật TonKho đã gom nhóm (tuần tự theo ID để tránh Deadlock)
          const sortedProductIds = Array.from(tonkhoUpdates.keys()).sort();
          for (const prodId of sortedProductIds) {
            const delta = tonkhoUpdates.get(prodId);
            if (!delta) continue;
            
            await tx.tonKho.upsert({
              where: { sanphamId: prodId },
              create: { sanphamId: prodId, slton: delta.slton, slchonhap: 0, slchogiao: 0 },
              update: {
                slton: { increment: delta.slton },
                slchonhap: { decrement: delta.slchonhap }
              }
            });
            // Đồng bộ thực tế luôn trong cùng TX
            await this.tonkhoManager.syncStockToReality(prodId, tx);
          }
        }, { timeout: 120000 });
      }

      // 3. Final safety sync song song cho các sản phẩm không có đơn hàng
      const unsyncedIds = sanphamIds.filter(id => !uniqueProducts.has(id));
      if (unsyncedIds.length > 0) {
        const CHUNK_SIZE = 20;
        for (let j = 0; j < unsyncedIds.length; j += CHUNK_SIZE) {
          const chunk = unsyncedIds.slice(j, j + CHUNK_SIZE);
          await Promise.all(chunk.map(id => this.tonkhoManager.syncStockToReality(id)));
        }
      }

      return {
        success: true,
        count: totalItems,
        totalProducts: uniqueProducts.size
      };
    } catch (error) {
      console.error('Error in completePendingReceiptsBulk:', error);
      throw error;
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
    
    // Add borders to all data cells
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref]) ws[cell_ref] = { t: 'z' };
        if (!ws[cell_ref].s) ws[cell_ref].s = {};
        ws[cell_ref].s.border = {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } }
        };
      }
    }
    
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

  /**
   * 🔧 Tối ưu hóa TẤT CẢ sản phẩm - dành cho script nội bộ
   * Tự lấy danh sách sản phẩm và xử lý bulk theo batch
   */
  async optimizeAllProducts(): Promise<{
    success: boolean;
    totalProducts: number;
    processedBatches: number;
    totalOptimized: number;
    errors: string[];
  }> {
    console.log('🔧 [OPTIMIZE ALL] Bắt đầu tối ưu hóa tất cả sản phẩm...');
    const startTime = Date.now();
    
    try {
      // 1. Lấy tất cả sản phẩm ID
      const allProducts = await this.prisma.sanpham.findMany({
        select: { id: true },
      });
      
      const allIds = allProducts.map(p => p.id);
      const totalProducts = allIds.length;
      console.log(`📦 Tìm thấy ${totalProducts} sản phẩm`);
      
      if (totalProducts === 0) {
        return {
          success: true,
          totalProducts: 0,
          processedBatches: 0,
          totalOptimized: 0,
          errors: [],
        };
      }

      // 2. Xử lý theo batch
      const BATCH_SIZE = 200; // 🚀 Tăng kích thước batch vì xử lý tuần tự đã an toàn hơn
      let totalOptimized = 0;
      const errors: string[] = [];
      let processedBatches = 0;

      for (let i = 0; i < allIds.length; i += BATCH_SIZE) {
        const batchIds = allIds.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(allIds.length / BATCH_SIZE);
        
        console.log(`  🔄 [${batchNum}/${totalBatches}] Đang xử lý ${batchIds.length} sản phẩm...`);
        
        try {
          const result = await this.completePendingReceiptsBulk(batchIds);
          totalOptimized += result.count;
          processedBatches++;
          console.log(`  ✅ [${batchNum}/${totalBatches}] Hoàn tất: ${result.count} mục khớp lệnh`);
        } catch (error) {
          const errMsg = `Batch ${batchNum}: ${error.message}`;
          errors.push(errMsg);
          console.error(`  ❌ [${batchNum}/${totalBatches}] Lỗi:`, error.message);
        }
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`🎉 [OPTIMIZE ALL] Hoàn tất trong ${elapsed}s: ${totalOptimized} mục khớp lệnh từ ${totalProducts} sản phẩm`);

      return {
        success: errors.length === 0,
        totalProducts,
        processedBatches,
        totalOptimized,
        errors,
      };
    } catch (error) {
      console.error('❌ [OPTIMIZE ALL] Lỗi:', error);
      throw error;
    }
  }

  /**
   * 🤖 AUTO-PILOT CRON JOB
   * Tự động hoàn tất các đơn đặt hàng 'dadat' sang 'danhan' vào lúc 14h hàng ngày.
   */
  @Cron('0 14 * * *', {
    name: 'auto-complete-dathang',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async autoSystemCompleteOrders() {
    console.log('🤖 [Auto-pilot] Bắt đầu quét đơn đặt hàng chờ nhập hàng ngày...');
    try {
      // Get the end of today in Vietnam timezone (23:59:59.999 VN)
      const endOfDay = moment().tz('Asia/Ho_Chi_Minh').endOf('day').toDate();

      console.log(`🤖 [Auto-pilot] Filtering orders with ngaynhan <= ${endOfDay.toISOString()} (23:59:59 VN today)`);

      const pendingOrders = await this.prisma.dathang.findMany({
        where: {
          status: 'dadat',
          isActive: true,
          ngaynhan: {
            lte: endOfDay
          }
        }
      });

      if (pendingOrders.length === 0) {
        console.log('🤖 [Auto-pilot] Không có đơn hàng nào cần xử lý.');
        return;
      }

      let updateCount = 0;
      const executionTime = new Date();
      const vietnamTime = executionTime.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

      for (const order of pendingOrders) {
        console.log(`🤖 [Auto-pilot] Đang xử lý tự động đơn hàng: ${order.madncc}`);
        // Lấy đầy đủ thông tin sản phẩm của đơn hàng
        const dathangFull = await this.prisma.dathang.findUnique({
          where: { id: order.id },
          include: { sanpham: true }
        });

        if (!dathangFull) continue;

        const updateData = {
          status: 'danhan',
          ghichu: (order.ghichu || '') + ' | [Auto-pilot] Tự động xác nhận nhập kho lúc 14h',
          sanpham: dathangFull.sanpham.map(sp => {
            const sldat = Number(sp.sldat) || 0;
            const slgiao = Number(sp.slgiao) || 0;
            const slnhan = Number(sp.slnhan) || 0;

            // Xác định số lượng nhận thực tế:
            // 1. Ưu tiên số lượng nhận (slnhan) đã nhập trước đó (nếu > 0)
            // 2. Tiếp theo là số lượng giao (slgiao) nếu > 0
            // 3. Cuối cùng mới dùng số lượng đặt (sldat)
            const actualQty = slnhan > 0 ? slnhan : (slgiao > 0 ? slgiao : sldat);

            return {
              id: sp.id, // ID của dathangsanpham record
              idSP: sp.idSP,
              sldat: sldat,
              slgiao: slgiao > 0 ? slgiao : actualQty,
              slnhan: actualQty,
              gianhap: Number(sp.gianhap) || 0
            };
          })
        };

        await this.update(order.id, updateData);
        updateCount++;

        // Tạo audit log chi tiết cho từng đơn đặt hàng được cập nhật
        await this.prisma.auditLog.create({
          data: {
            userId: null, // System action
            action: 'UPDATE',
            entityName: 'Dathang',
            entityId: order.id,
            oldValues: {
              status: order.status,
              madncc: order.madncc,
              processedBy: 'auto-pilot-cron'
            },
            newValues: {
              status: 'danhan',
              madncc: order.madncc,
              updatedAt: executionTime.toISOString(),
              processedBy: 'auto-pilot-cron',
              autoPilotExecution: {
                jobName: 'auto-complete-dathang',
                executionTime: vietnamTime,
                autoCompleteReason: 'Daily auto-completion at 14:00 Vietnam time'
              }
            },
            createdAt: new Date(),
          }
        });
      }

      console.log(`🤖 [Auto-pilot] Hoàn thành tự động chốt ${updateCount} đơn hàng.`);

      if (updateCount > 0) {
        // Tạo audit log tổng quan cho cron job execution
        await this.prisma.auditLog.create({
          data: {
            userId: null, // System action
            action: 'UPDATE',
            entityName: 'DathangCronService',
            entityId: null,
            oldValues: {
              cronJobName: 'auto-complete-dathang',
              status: 'dadat',
              scheduledTime: '14:00 Vietnam Time',
              timezone: 'Asia/Ho_Chi_Minh',
              executionType: 'CRON_EXECUTION'
            },
            newValues: {
              action: 'auto-complete-dathang-daily',
              executionStatus: 'SUCCESS',
              ordersFound: pendingOrders.length,
              ordersProcessed: updateCount,
              executionTime: executionTime.toISOString(),
              vietnamTime: vietnamTime,
              targetStatus: 'danhan',
              executionType: 'CRON_EXECUTION'
            },
            createdAt: new Date(),
          }
        });
      }
    } catch (error) {
      console.error('❌ [Auto-pilot] Lỗi trong quá trình tự động chốt đơn:', error);
    }
  }

}

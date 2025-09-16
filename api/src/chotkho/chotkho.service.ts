import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ChotkhoService {
  constructor(
    private prisma: PrismaService
  ) {}

  /**
   * 🎯 NEW CREATE METHOD: Chốt kho với logic mới
   * Logic: 1 lần chốt kho sẽ lấy tất cả sản phẩm đang có
   * sltonhethong = slton tương ứng từ Tonkho
   * sau đó bổ sung sltonthucte, slhuy từ user input
   * chenhlech = sltonhethong - sltonthucte - slhuy
   */
  async create(inventoryData: {
    khoId: string;
    products: Array<{
      sanphamId: string;
      sltonthucte: number;
      slhuy: number;
      ghichu?: string;
    }>;
  }) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const { khoId, products } = inventoryData;
        const ngaychot = new Date();
        
        // Lấy tất cả sản phẩm có tồn kho > 0 theo kho
        const tonkhoRecords = await prisma.tonKho.findMany({
          where: {
            slton: { gt: 0 },
            sanpham: {
              SanphamKho: {
                some: { khoId }
              }
            }
          },
          include: {
            sanpham: {
              select: {
                id: true,
                title: true,
                masp: true
              }
            }
          }
        });

        console.log(`📦 Found ${tonkhoRecords.length} products with inventory > 0`);

        if (tonkhoRecords.length === 0) {
          return {
            success: false,
            message: 'Không có sản phẩm nào có tồn kho > 0 trong kho này'
          };
        }

        const createdRecords: any[] = [];
        let totalDifference = 0;

        // Tạo record chốt kho cho từng sản phẩm
        for (const tonkho of tonkhoRecords) {
          // Tìm data user input cho sản phẩm này
          const userInput = products.find(p => p.sanphamId === tonkho.sanphamId);
          
          const sltonhethong = Number(tonkho.slton);
          const sltonthucte = userInput?.sltonthucte || 0;
          const slhuy = userInput?.slhuy || 0;
          const chenhlech = sltonhethong - sltonthucte - slhuy;
          
          // Tạo record chotkho
          const chotkhoRecord = await prisma.chotkho.create({
            data: {
              khoId,
              sanphamId: tonkho.sanphamId,
              ngaychot,
              sltonhethong: new Decimal(sltonhethong),
              sltonthucte: new Decimal(sltonthucte),
              slhuy: new Decimal(slhuy),
              chenhlech: new Decimal(chenhlech),
              ghichu: userInput?.ghichu || ''
            },
            include: {
              sanpham: {
                select: {
                  title: true,
                  masp: true
                }
              }
            }
          });

          createdRecords.push(chotkhoRecord);
          totalDifference += chenhlech;
        }

        return {
          success: true,
          message: `Chốt kho thành công cho ${createdRecords.length} sản phẩm`,
          data: {
            totalProducts: createdRecords.length,
            totalDifference,
            records: createdRecords
          }
        };
      });
    } catch (error) {
      console.error('Error in create chotkho:', error);
      throw error;
    }
  }

  /**
   * Lấy tất cả sản phẩm có tồn kho theo kho
   */
  async getAllProductsByKho(khoId: string): Promise<any[]> {
    try {
      const tonkhoRecords = await this.prisma.tonKho.findMany({
        where: {
          slton: { gt: 0 },
          sanpham: {
            SanphamKho: {
              some: { khoId }
            }
          }
        },
        include: {
          sanpham: {
            select: {
              id: true,
              title: true,
              masp: true
            }
          }
        },
        orderBy: {
          sanpham: {
            title: 'asc'
          }
        }
      });

      return tonkhoRecords.map(tonkho => ({
        sanphamId: tonkho.sanphamId,
        sanpham: tonkho.sanpham,
        sltonhethong: Number(tonkho.slton),
        sltonthucte: 0,
        slhuy: 0,
        chenhlech: Number(tonkho.slton)
      }));
    } catch (error) {
      console.error('Error getting products by kho:', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [items, total] = await Promise.all([
      this.prisma.chotkho.findMany({
        skip,
        take: limit,
        include: {
          sanpham: {
            select: {
              id: true,
              title: true,
              masp: true
            }
          },
          kho: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: {
          ngaychot: 'desc'
        }
      }),
      this.prisma.chotkho.count()
    ]);

    return {
      data: items,
      pagination: {
        current: page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string) {
    return this.prisma.chotkho.findUnique({
      where: { id },
      include: {
        sanpham: {
          select: {
            id: true,
            title: true,
            masp: true
          }
        },
        kho: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  }

  async update(id: string, updateData: any) {
    return this.prisma.chotkho.update({
      where: { id },
      data: updateData
    });
  }

  async remove(id: string) {
    return this.prisma.chotkho.delete({
      where: { id }
    });
  }

  async search(searchParams: any) {
    const { khoId, sanphamId, fromDate, toDate, page = 1, limit = 10 } = searchParams;
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (khoId) where.khoId = khoId;
    if (sanphamId) where.sanphamId = sanphamId;
    if (fromDate || toDate) {
      where.ngaychot = {};
      if (fromDate) where.ngaychot.gte = new Date(fromDate);
      if (toDate) where.ngaychot.lte = new Date(toDate);
    }

    const [items, total] = await Promise.all([
      this.prisma.chotkho.findMany({
        where,
        skip,
        take: limit,
        include: {
          sanpham: {
            select: {
              id: true,
              title: true,
              masp: true
            }
          },
          kho: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: {
          ngaychot: 'desc'
        }
      }),
      this.prisma.chotkho.count({ where })
    ]);

    return {
      data: items,
      pagination: {
        current: page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
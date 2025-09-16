import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ChotkhoService {
  constructor(
    private prisma: PrismaService
  ) {}

  /**
   * 🎯 CREATE METHOD: Tạo chốt kho với master-detail structure
   * Master: Chotkho (ngaychot, title, ghichu, khoId, userId)
   * Details: Chotkhodetail (sanphamId, sltonhethong, sltonthucte, slhuy, chenhlech)
   */
  async create(inventoryData: {
    ngaychot?: Date;
    title?: string;
    ghichu?: string;
    khoId: string;
    userId?: string;
    details: Array<{
      sanphamId: string;
      sltonhethong: number;
      sltonthucte: number;
      slhuy: number;
      ghichu?: string;
    }>;
  }) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const { ngaychot, title, ghichu, khoId, userId, details } = inventoryData;
        
        // Validate khoId exists
        const kho = await prisma.kho.findUnique({
          where: { id: khoId }
        });
        
        if (!kho) {
          throw new Error(`Kho với ID ${khoId} không tồn tại trong hệ thống`);
        }

        // Validate all sanphamId exist
        for (const detail of details) {
          const sanpham = await prisma.sanpham.findUnique({
            where: { id: detail.sanphamId }
          });
          
          if (!sanpham) {
            throw new Error(`Sản phẩm với ID ${detail.sanphamId} không tồn tại trong hệ thống`);
          }
        }
        
        // Tạo master record - Chotkho
        const chotkhoMaster = await prisma.chotkho.create({
          data: {
            ngaychot: ngaychot || new Date(),
            title: title || `Chốt kho ${new Date().toLocaleDateString('vi-VN')}`,
            ghichu: ghichu || '',
            khoId,
            userId,
            codeId: `CHOTKHO_${Date.now()}`,
            isActive: true
          }
        });

        console.log(`📦 Created master chotkho record: ${chotkhoMaster.id}`);

        // Tạo detail records - Chotkhodetail
        let detailCount = 0;
        for (const detail of details) {
          const chenhlech = Number(detail.sltonhethong) - Number(detail.sltonthucte) - Number(detail.slhuy);
          
          await prisma.chotkhodetail.create({
            data: {
              chotkhoId: chotkhoMaster.id,
              sanphamId: detail.sanphamId,
              sltonhethong: new Decimal(detail.sltonhethong),
              sltonthucte: new Decimal(detail.sltonthucte),
              slhuy: new Decimal(detail.slhuy),
              chenhlech: new Decimal(chenhlech),
              ghichu: detail.ghichu || '',
              userId,
              ngaychot: chotkhoMaster.ngaychot
            }
          });
          
          detailCount++;
        }

        // Lấy full data với relations
        const result = await prisma.chotkho.findUnique({
          where: { id: chotkhoMaster.id },
          include: {
            kho: {
              select: { id: true, name: true, makho: true }
            },
            user: {
              select: { 
                id: true, 
                email: true,
                profile: { select: { name: true } }
              }
            },
            details: {
              include: {
                sanpham: {
                  select: { id: true, title: true, masp: true }
                }
              }
            }
          }
        });

        return {
          success: true,
          message: `Tạo chốt kho thành công với ${detailCount} sản phẩm`,
          data: result
        };
      });
    } catch (error) {
      console.error('Error in create chotkho:', error);
      throw error;
    }
  }

  /**
   * Lấy tất cả sản phẩm có tồn kho theo kho để chuẩn bị cho việc chốt kho
   */
  async getAllProductsByKho(khoId: string): Promise<any[]> {
    try {
      const sanphamKhoRecords = await this.prisma.sanphamKho.findMany({
        where: {
          khoId,
          soluong: { gt: 0 }
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

      return sanphamKhoRecords.map(item => ({
        sanphamId: item.sanphamId,
        sanpham: item.sanpham,
        sltonhethong: Number(item.soluong),
        sltonthucte: 0,
        slhuy: 0,
        chenhlech: Number(item.soluong)
      }));
    } catch (error) {
      console.error('Error getting products by kho:', error);
      throw error;
    }
  }

  /**
   * Lấy danh sách tất cả kho
   */
  async getAllKho(): Promise<any[]> {
    try {
      return await this.prisma.kho.findMany({
        where: {
          isActive: true
        },
        select: {
          id: true,
          name: true,
          makho: true,
          diachi: true
        },
        orderBy: {
          name: 'asc'
        }
      });
    } catch (error) {
      console.error('Error getting all kho:', error);
      throw error;
    }
  }

  /**
   * Lấy tất cả sản phẩm có thông tin tồn kho (không phân theo kho)
   */
  async getAllProducts(): Promise<any[]> {
    try {
      const products = await this.prisma.sanpham.findMany({
        where: {
          isActive: true
        },
        include: {
          TonKho: {
            select: {
              slton: true,
              sltontt: true,
              slchogiao: true,
              slchonhap: true
            }
          }
        },
        orderBy: {
          title: 'asc'
        }
      });

      return products.map(product => ({
        id: product.id,
        masanpham: product.masp,
        tensanpham: product.title,
        donvitinh: product.dvt,
        dongia: Number(product.giaban) || 0,
        status: product.isActive,
        ghichu: product.ghichu,
        tonkho: product.TonKho ? {
          slton: Number(product.TonKho.slton) || 0,
          slhuy: 0, // TonKho không có field slhuy
          sltinhthucte: Number(product.TonKho.sltontt) || 0,
          ngaycapnhat: new Date()
        } : {
          slton: 0,
          slhuy: 0,
          sltinhthucte: 0,
          ngaycapnhat: null
        }
      }));
    } catch (error) {
      console.error('Error getting all products:', error);
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
          kho: {
            select: {
              id: true,
              name: true,
              makho: true
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: { name: true }
              }
            }
          },
          details: {
            include: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true
                }
              }
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
        kho: {
          select: {
            id: true,
            name: true,
            makho: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: { name: true }
            }
          }
        },
        details: {
          include: {
            sanpham: {
              select: {
                id: true,
                title: true,
                masp: true
              }
            }
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
    if (fromDate || toDate) {
      where.ngaychot = {};
      if (fromDate) where.ngaychot.gte = new Date(fromDate);
      if (toDate) where.ngaychot.lte = new Date(toDate);
    }

    // Filter by sanphamId through details relation
    if (sanphamId) {
      where.details = {
        some: { sanphamId }
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.chotkho.findMany({
        where,
        skip,
        take: limit,
        include: {
          kho: {
            select: {
              id: true,
              name: true,
              makho: true
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: { name: true }
              }
            }
          },
          details: {
            include: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true
                }
              }
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
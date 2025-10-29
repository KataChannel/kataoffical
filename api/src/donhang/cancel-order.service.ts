import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import Redis from 'ioredis';

export interface CancelOrderDto {
  orderId: string;
  lydohuy: string; // Lý do hủy (bắt buộc)
  userId?: string; // User thực hiện hủy
}

@Injectable()
export class CancelOrderService {
  private redis: Redis;

  constructor(private prisma: PrismaService) {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    });
  }

  /**
   * Invalidate cache cho đơn hàng
   */
  private async invalidateDonhangCache(orderId: string): Promise<void> {
    try {
      const patterns = [
        `*donhang*${orderId}*`,
        `*donhang*`,
        `*tonkho*`,
        `*phieukho*`
      ];

      for (const pattern of patterns) {
        const keys = await this.redis.keys(pattern);
        if (keys && keys.length > 0) {
          await this.redis.del(...keys);
          console.log(`[CACHE] Invalidated ${keys.length} keys for pattern: ${pattern}`);
        }
      }
    } catch (error) {
      console.error('[CACHE] Error invalidating donhang cache:', error);
    }
  }

  /**
   * Invalidate cache cho đơn đặt hàng
   */
  private async invalidateDathangCache(orderId: string): Promise<void> {
    try {
      const patterns = [
        `*dathang*${orderId}*`,
        `*dathang*`,
        `*tonkho*`,
        `*phieukho*`
      ];

      for (const pattern of patterns) {
        const keys = await this.redis.keys(pattern);
        if (keys && keys.length > 0) {
          await this.redis.del(...keys);
          console.log(`[CACHE] Invalidated ${keys.length} keys for pattern: ${pattern}`);
        }
      }
    } catch (error) {
      console.error('[CACHE] Error invalidating dathang cache:', error);
    }
  }

  /**
   * Hủy đơn hàng (Donhang)
   * - Validate lý do hủy
   * - Kiểm tra status hiện tại
   * - Hoàn trả tồn kho nếu đã xuất kho
   * - Cập nhật status = 'huy'
   */
  async cancelDonhang(dto: CancelOrderDto): Promise<any> {
    const { orderId, lydohuy, userId } = dto;

    // Validate lý do hủy
    if (!lydohuy || lydohuy.trim().length === 0) {
      throw new BadRequestException('Lý do hủy đơn hàng là bắt buộc');
    }

    if (lydohuy.trim().length < 10) {
      throw new BadRequestException('Lý do hủy phải có ít nhất 10 ký tự');
    }

    // Lấy thông tin đơn hàng
    const donhang = await this.prisma.donhang.findUnique({
      where: { id: orderId },
      include: {
        sanpham: {
          include: {
            sanpham: true
          }
        },
        PhieuKho: true
      }
    });

    if (!donhang) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    // Kiểm tra status hiện tại
    if (donhang.status === 'huy') {
      throw new BadRequestException('Đơn hàng đã được hủy trước đó');
    }

    // if (donhang.status === 'hoanthanh') {
    //   throw new BadRequestException('Không thể hủy đơn hàng đã hoàn thành');
    // }

    // if (donhang.status === 'danhan') {
    //   throw new BadRequestException('Không thể hủy đơn hàng đã nhận');
    // }

    // Kiểm tra xem đã có phiếu xuất kho chưa
    const hasPhieuXuatKho = donhang.PhieuKho && donhang.PhieuKho.length > 0;
    const oldStatus = donhang.status;
    const restoredItems: any[] = [];

    // Transaction để đảm bảo tính toàn vẹn dữ liệu
    const result = await this.prisma.$transaction(async (tx) => {
      // Nếu đơn hàng đã xuất kho (có PhieuKho), cần hoàn trả tồn kho
      if (hasPhieuXuatKho && donhang.sanpham && donhang.sanpham.length > 0) {
        console.log(`[CancelOrder] Hoàn trả tồn kho cho đơn hàng ${donhang.madonhang}`);

        // Hoàn trả từng sản phẩm
        for (const item of donhang.sanpham) {
          const slgiao = Number(item.slgiao || 0);
          if (item.sanpham && slgiao > 0) {
            // Lấy sanphamId từ relation
            const sanphamId = item.sanpham.id;
            
            // Cập nhật TonKho: tăng lại số lượng đã xuất
            await tx.tonKho.upsert({
              where: { sanphamId },
              create: {
                sanphamId,
                slton: slgiao,
                sltontt: slgiao,
                slchogiao: 0,
                slchonhap: 0,
              },
              update: {
                slton: {
                  increment: slgiao
                },
                sltontt: {
                  increment: slgiao
                }
              }
            });

            restoredItems.push({
              masp: item.sanpham.masp,
              tensanpham: item.sanpham.title,
              soluong: slgiao
            });

            console.log(
              `[CancelOrder] Hoàn trả ${slgiao} ${item.sanpham.masp} vào kho`
            );
          }
        }

        // Xóa các phiếu xuất kho liên quan
        await tx.phieuKho.deleteMany({
          where: { 
            donhang: {
              id: orderId
            }
          }
        });

        console.log(`[CancelOrder] Đã xóa ${donhang.PhieuKho.length} phiếu xuất kho`);
      }

      // Cập nhật đơn hàng: status = 'huy', thêm lý do hủy
      const updatedDonhang = await tx.donhang.update({
        where: { id: orderId },
        data: {
          status: 'huy',
          lydohuy: lydohuy.trim(),
          updatedAt: new Date()
        },
        include: {
          sanpham: {
            include: {
              sanpham: true
            }
          },
          khachhang: true
        }
      });

      // Ghi log audit
      if (userId) {
        await tx.auditLog.create({
          data: {
            userId: userId,
            action: 'UPDATE',
            entityName: 'Donhang',
            entityId: orderId,
            oldValues: { status: oldStatus },
            newValues: { status: 'huy', lydohuy: lydohuy.trim() },
            metadata: {
              actionType: 'CANCEL',
              inventoryRestored: hasPhieuXuatKho,
              restoredItems
            }
          }
        });
      }

      return {
        success: true,
        message: hasPhieuXuatKho 
          ? 'Đơn hàng đã được hủy và tồn kho đã được hoàn trả'
          : 'Đơn hàng đã được hủy',
        data: updatedDonhang,
        restoredInventory: hasPhieuXuatKho,
        oldStatus
      };
    });

    // Invalidate cache sau khi hủy đơn hàng thành công
    await this.invalidateDonhangCache(orderId);
    console.log(`[CancelOrder] Cache invalidated for donhang: ${orderId}`);

    return result;
  }

  /**
   * Hủy đơn đặt hàng (Dathang)
   * - Validate lý do hủy
   * - Kiểm tra status hiện tại
   * - Hoàn trả tồn kho nếu đã nhập kho
   * - Cập nhật status = 'huy'
   */
  async cancelDathang(dto: CancelOrderDto): Promise<any> {
    const { orderId, lydohuy, userId } = dto;

    // Validate lý do hủy
    if (!lydohuy || lydohuy.trim().length === 0) {
      throw new BadRequestException('Lý do hủy đơn đặt hàng là bắt buộc');
    }

    if (lydohuy.trim().length < 10) {
      throw new BadRequestException('Lý do hủy phải có ít nhất 10 ký tự');
    }

    // Lấy thông tin đơn đặt hàng
    const dathang = await this.prisma.dathang.findUnique({
      where: { id: orderId },
      include: {
        sanpham: {
          include: {
            sanpham: true
          }
        },
        PhieuKho: true
      }
    });

    if (!dathang) {
      throw new NotFoundException('Không tìm thấy đơn đặt hàng');
    }

    // Kiểm tra status hiện tại
    if (dathang.status === 'huy') {
      throw new BadRequestException('Đơn đặt hàng đã được hủy trước đó');
    }

    // if (dathang.status === 'hoanthanh') {
    //   throw new BadRequestException('Không thể hủy đơn đặt hàng đã hoàn thành');
    // }

    // if (dathang.status === 'danhan') {
    //   throw new BadRequestException('Không thể hủy đơn đặt hàng đã nhận');
    // }

    // Kiểm tra xem đã có phiếu nhập kho chưa
    const hasPhieuNhapKho = dathang.PhieuKho && dathang.PhieuKho.length > 0;
    const oldStatus = dathang.status;
    const restoredItems: any[] = [];

    // Transaction để đảm bảo tính toàn vẹn dữ liệu
    const result = await this.prisma.$transaction(async (tx) => {
      // Nếu đơn đặt hàng đã nhập kho (có PhieuKho), cần trừ lại tồn kho
      if (hasPhieuNhapKho && dathang.sanpham && dathang.sanpham.length > 0) {
        console.log(`[CancelOrder] Trừ tồn kho cho đơn đặt hàng ${dathang.madncc}`);

        // Trừ từng sản phẩm
        for (const item of dathang.sanpham) {
          const slnhan = Number(item.slnhan || 0);
          if (item.sanpham && slnhan > 0) {
            const sanphamId = item.sanpham.id;
            
            // Cập nhật TonKho: giảm lại số lượng đã nhập
            const currentTonKho = await tx.tonKho.findUnique({
              where: { sanphamId }
            });

            if (currentTonKho) {
              const newSlton = Math.max(0, Number(currentTonKho.slton) - slnhan);
              const newSltontt = Math.max(0, Number(currentTonKho.sltontt) - slnhan);
              
              await tx.tonKho.update({
                where: { sanphamId },
                data: {
                  slton: newSlton,
                  sltontt: newSltontt
                }
              });

              restoredItems.push({
                masp: item.sanpham.masp,
                tensanpham: item.sanpham.title,
                soluong: slnhan,
                oldTonkho: Number(currentTonKho.slton),
                newTonkho: newSlton
              });

              console.log(
                `[CancelOrder] Trừ ${slnhan} ${item.sanpham.masp} khỏi kho (Tồn kho: ${currentTonKho.slton} → ${newSlton})`
              );
            }
          }
        }

        // Xóa các phiếu nhập kho liên quan
        await tx.phieuKho.deleteMany({
          where: { 
            dathang: {
              id: orderId
            }
          }
        });

        console.log(`[CancelOrder] Đã xóa ${dathang.PhieuKho.length} phiếu nhập kho`);
      }

      // Cập nhật đơn đặt hàng: status = 'huy', thêm lý do hủy
      const updatedDathang = await tx.dathang.update({
        where: { id: orderId },
        data: {
          status: 'huy',
          lydohuy: lydohuy.trim(),
          updatedAt: new Date()
        },
        include: {
          sanpham: {
            include: {
              sanpham: true
            }
          },
          nhacungcap: true
        }
      });

      // Ghi log audit
      if (userId) {
        await tx.auditLog.create({
          data: {
            userId: userId,
            action: 'UPDATE',
            entityName: 'Dathang',
            entityId: orderId,
            oldValues: { status: oldStatus },
            newValues: { status: 'huy', lydohuy: lydohuy.trim() },
            metadata: {
              actionType: 'CANCEL',
              inventoryRestored: hasPhieuNhapKho,
              restoredItems
            }
          }
        });
      }

      return {
        success: true,
        message: hasPhieuNhapKho 
          ? 'Đơn đặt hàng đã được hủy và tồn kho đã được điều chỉnh'
          : 'Đơn đặt hàng đã được hủy',
        data: updatedDathang,
        restoredInventory: hasPhieuNhapKho,
        oldStatus
      };
    });

    // Invalidate cache sau khi hủy đơn đặt hàng thành công
    await this.invalidateDathangCache(orderId);
    console.log(`[CancelOrder] Cache invalidated for dathang: ${orderId}`);

    return result;
  }

  /**
   * Lấy thông tin đơn hàng đã hủy
   */
  async getCanceledOrders(type: 'donhang' | 'dathang', options?: {
    skip?: number;
    take?: number;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = {
      status: 'huy'
    };

    if (options?.startDate || options?.endDate) {
      where.updatedAt = {};
      if (options.startDate) {
        where.updatedAt.gte = options.startDate;
      }
      if (options.endDate) {
        where.updatedAt.lte = options.endDate;
      }
    }

    if (type === 'donhang') {
      return await this.prisma.donhang.findMany({
        where,
        include: {
          khachhang: true,
          sanpham: {
            include: {
              sanpham: true
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        },
        skip: options?.skip || 0,
        take: options?.take || 50
      });
    } else {
      return await this.prisma.dathang.findMany({
        where,
        include: {
          nhacungcap: true,
          sanpham: {
            include: {
              sanpham: true
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        },
        skip: options?.skip || 0,
        take: options?.take || 50
      });
    }
  }
}

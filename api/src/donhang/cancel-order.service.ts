import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

export interface CancelOrderDto {
  orderId: string;
  lydohuy: string; // Lý do hủy (bắt buộc)
  userId?: string; // User thực hiện hủy
}

@Injectable()
export class CancelOrderService {
  constructor(private prisma: PrismaService) {}

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

    if (donhang.status === 'hoanthanh') {
      throw new BadRequestException('Không thể hủy đơn hàng đã hoàn thành');
    }

    // Kiểm tra xem đã có phiếu xuất kho chưa
    const hasPhieuXuatKho = donhang.PhieuKho && donhang.PhieuKho.length > 0;
    const oldStatus = donhang.status;

    // Transaction để đảm bảo tính toàn vẹn dữ liệu
    return await this.prisma.$transaction(async (tx) => {
      // Nếu đơn hàng đã xuất kho (có PhieuKho), cần hoàn trả tồn kho
      if (hasPhieuXuatKho && donhang.sanpham && donhang.sanpham.length > 0) {
        console.log(`[CancelOrder] Hoàn trả tồn kho cho đơn hàng ${donhang.madonhang}`);

        // Hoàn trả từng sản phẩm
        for (const item of donhang.sanpham) {
          if (item.sanpham && item.slgiao > 0) {
            // Cập nhật lại tồn kho: tăng lại số lượng đã xuất
            await tx.sanpham.update({
              where: { id: item.sanphamId },
              data: {
                tonkho: {
                  increment: Number(item.slgiao)
                }
              }
            });

            console.log(
              `[CancelOrder] Hoàn trả ${item.slgiao} ${item.sanpham.masp} vào kho`
            );
          }
        }

        // Xóa các phiếu xuất kho liên quan
        await tx.phieuKho.deleteMany({
          where: { donhangId: orderId }
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
            entity: 'Donhang',
            entityId: orderId,
            changes: JSON.stringify({
              before: { status: oldStatus },
              after: { status: 'huy', lydohuy: lydohuy.trim() },
              restoredInventory: hasPhieuXuatKho
            })
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

    if (dathang.status === 'hoanthanh') {
      throw new BadRequestException('Không thể hủy đơn đặt hàng đã hoàn thành');
    }

    // Kiểm tra xem đã có phiếu nhập kho chưa
    const hasPhieuNhapKho = dathang.PhieuKho && dathang.PhieuKho.length > 0;
    const oldStatus = dathang.status;

    // Transaction để đảm bảo tính toàn vẹn dữ liệu
    return await this.prisma.$transaction(async (tx) => {
      // Nếu đơn đặt hàng đã nhập kho (có PhieuKho), cần trừ lại tồn kho
      if (hasPhieuNhapKho && dathang.sanpham && dathang.sanpham.length > 0) {
        console.log(`[CancelOrder] Trừ tồn kho cho đơn đặt hàng ${dathang.madncc}`);

        // Trừ từng sản phẩm
        for (const item of dathang.sanpham) {
          if (item.sanpham && item.slnhan > 0) {
            // Cập nhật lại tồn kho: giảm lại số lượng đã nhập
            const currentProduct = await tx.sanpham.findUnique({
              where: { id: item.sanphamId },
              select: { tonkho: true, masp: true }
            });

            if (currentProduct) {
              const newTonkho = Math.max(0, Number(currentProduct.tonkho) - Number(item.slnhan));
              
              await tx.sanpham.update({
                where: { id: item.sanphamId },
                data: {
                  tonkho: newTonkho
                }
              });

              console.log(
                `[CancelOrder] Trừ ${item.slnhan} ${currentProduct.masp} khỏi kho (Tồn kho: ${currentProduct.tonkho} → ${newTonkho})`
              );
            }
          }
        }

        // Xóa các phiếu nhập kho liên quan
        await tx.phieuKho.deleteMany({
          where: { dathangId: orderId }
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
            entity: 'Dathang',
            entityId: orderId,
            changes: JSON.stringify({
              before: { status: oldStatus },
              after: { status: 'huy', lydohuy: lydohuy.trim() },
              restoredInventory: hasPhieuNhapKho
            })
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

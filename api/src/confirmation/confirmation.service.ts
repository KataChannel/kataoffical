import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from '../socket.gateway';

@Injectable()
export class ConfirmationService {
  constructor(
    private prisma: PrismaService,
    private socketGateway: SocketGateway,
  ) {}

  // Tạo token xác nhận cho đơn hàng
  async generateConfirmToken(donhangId: string): Promise<string> {
    const donhang = await this.prisma.donhang.findUnique({
      where: { id: donhangId },
    });

    if (!donhang) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    // Tạo token ngẫu nhiên
    const token = crypto.randomBytes(32).toString('hex');
    
    // Token hết hạn sau 7 ngày
    const tokenExpiredAt = new Date();
    tokenExpiredAt.setDate(tokenExpiredAt.getDate() + 7);

    // Cập nhật đơn hàng với token
    await this.prisma.donhang.update({
      where: { id: donhangId },
      data: {
        confirmToken: token,
        tokenExpiredAt,
      },
    });

    return token;
  }

  // Lấy thông tin đơn hàng từ token
  async getDonhangByToken(token: string) {
    const donhang = await this.prisma.donhang.findUnique({
      where: { confirmToken: token },
      include: {
        khachhang: true,
        sanpham: {
          include: {
            sanpham: true,
          },
        },
      },
    });

    if (!donhang) {
      throw new NotFoundException('Token không hợp lệ hoặc đã hết hạn');
    }

    // Kiểm tra token còn hiệu lực
    if (donhang.tokenExpiredAt && new Date() > donhang.tokenExpiredAt) {
      throw new BadRequestException('Token đã hết hạn');
    }

    return donhang;
  }

  // Xác nhận lần 1
  async xacNhanLan1(token: string, ghiChuKH?: string) {
    const donhang = await this.getDonhangByToken(token);

    if (donhang.xacNhanLan1) {
      throw new BadRequestException('Đơn hàng đã được xác nhận lần 1');
    }

    const updated = await this.prisma.donhang.update({
      where: { id: donhang.id },
      data: {
        xacNhanLan1: true,
        xacNhanLan1At: new Date(),
        ghiChuKH: ghiChuKH || donhang.ghiChuKH,
      },
      include: {
        khachhang: true,
        sanpham: {
          include: {
            sanpham: true,
          },
        },
      },
    });

    // Emit WebSocket event for realtime update
    this.socketGateway.sendDonhangConfirmed(donhang.id, {
      type: 'xac_nhan_lan_1',
      xacNhanLan1At: updated.xacNhanLan1At,
      ghiChuKH: updated.ghiChuKH,
    });

    return updated;
  }

  // Xác nhận lần 2
  async xacNhanLan2(token: string, ghiChuKH?: string) {
    const donhang = await this.getDonhangByToken(token);

    if (!donhang.xacNhanLan1) {
      throw new BadRequestException('Cần xác nhận lần 1 trước');
    }

    if (donhang.xacNhanLan2) {
      throw new BadRequestException('Đơn hàng đã được xác nhận lần 2');
    }

    const updated = await this.prisma.donhang.update({
      where: { id: donhang.id },
      data: {
        xacNhanLan2: true,
        xacNhanLan2At: new Date(),
        ghiChuKH: ghiChuKH || donhang.ghiChuKH,
      },
      include: {
        khachhang: true,
        sanpham: {
          include: {
            sanpham: true,
          },
        },
      },
    });

    // Emit WebSocket event for realtime update
    this.socketGateway.sendDonhangConfirmed(donhang.id, {
      type: 'xac_nhan_lan_2',
      xacNhanLan2At: updated.xacNhanLan2At,
      ghiChuKH: updated.ghiChuKH,
    });

    return updated;
  }

  // Từ chối đơn hàng
  async tuChoi(token: string, ghiChuKH?: string) {
    const donhang = await this.getDonhangByToken(token);

    const updated = await this.prisma.donhang.update({
      where: { id: donhang.id },
      data: {
        status: 'huy' as any,
        ghiChuKH: ghiChuKH || 'Khách hàng từ chối đơn hàng',
        lydohuy: ghiChuKH || 'Khách hàng từ chối',
      },
      include: {
        khachhang: true,
        sanpham: {
          include: {
            sanpham: true,
          },
        },
      },
    });

    // Emit WebSocket event for realtime update
    this.socketGateway.sendDonhangRejected(donhang.id, {
      ghiChuKH: updated.ghiChuKH,
      lydohuy: updated.lydohuy,
    });

    return updated;
  }

  // Cập nhật ghi chú từ khách hàng
  async updateGhiChuKH(token: string, ghiChuKH: string) {
    const donhang = await this.getDonhangByToken(token);

    return this.prisma.donhang.update({
      where: { id: donhang.id },
      data: {
        ghiChuKH,
      },
    });
  }

  // Lấy link xác nhận
  getConfirmationLink(token: string, baseUrl?: string): string {
    const base = baseUrl || process.env.FRONTEND_URL || 'http://localhost:3000';
    return `${base}/confirm/${token}`;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { KetoanService } from './ketoan.service';
import { NotificationService } from '../notification/notification.service';

/**
 * Cron nhắc chốt công nợ: mỗi sáng quét khách sắp tới/tới hạn/quá hạn chốt
 * và gửi thông báo (lưu DB + push) cho user thuộc role Kế toán / Admin.
 */
@Injectable()
export class KetoanCronService {
  private readonly logger = new Logger(KetoanCronService.name);

  constructor(
    private prisma: PrismaService,
    private ketoan: KetoanService,
    private notification: NotificationService,
  ) {}

  @Cron('0 8 * * *', { name: 'nhac-chot-cong-no', timeZone: 'Asia/Ho_Chi_Minh' })
  async nhacChotHangNgay() {
    try {
      const list: any[] = await this.ketoan.nhacChotCongNo({ soNgayCanhBao: 3 });
      if (!list.length) {
        this.logger.log('Nhắc chốt: không có khách nào tới hạn.');
        return;
      }
      const dem = (tt: string) => list.filter((x) => x.trangThai === tt).length;
      const body = `${list.length} khách cần chốt công nợ (quá hạn ${dem('QUA_HAN')}, tới hạn ${dem('TOI_HAN')}, sắp tới ${dem('SAP_TOI')}).`;

      const userIds = await this.userKeToan();
      for (const userId of userIds) {
        await this.notification
          .sendNotificationToUser(userId, {
            title: 'Nhắc chốt công nợ',
            body,
            url: '/admin/ketoan/chotcongno',
            type: 'ketoan',
          })
          .catch(() => undefined);
      }
      this.logger.log(`Nhắc chốt: ${list.length} khách -> đã gửi ${userIds.length} người dùng.`);
    } catch (e: any) {
      this.logger.error('Lỗi cron nhắc chốt: ' + (e?.message || e));
    }
  }

  /** Trả về danh sách userId thuộc role Kế toán / Admin. */
  private async userKeToan(): Promise<string[]> {
    const roles = await this.prisma.role.findMany({
      where: { name: { in: ['KẾ TOÁN', 'Admin'] } },
      select: { id: true },
    });
    const roleIds = roles.map((r) => r.id);
    if (!roleIds.length) return [];
    const urs = await this.prisma.userRole.findMany({
      where: { roleId: { in: roleIds } },
      select: { userId: true },
    });
    return [...new Set(urs.map((u) => u.userId))];
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class BanggiaPriceHistoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cập nhật giá sản phẩm với audit logging
   * Forward-only approach: Chỉ track price changes từ bây giờ về sau
   */
  async updatePrice(params: {
    banggiaId: string;
    sanphamId: string;
    newPrice: number;
    userId?: string;
    reason?: string;
  }) {
    const { banggiaId, sanphamId, newPrice, userId, reason } = params;

    // Validate
    if (newPrice < 0) {
      throw new BadRequestException('Giá không thể âm');
    }

    return await this.prisma.$transaction(async (tx) => {
      // 1. Get current price
      const currentBgsp = await tx.banggiasanpham.findFirst({
        where: { banggiaId, sanphamId },
        include: {
          banggia: { select: { id: true, mabanggia: true, title: true } },
          sanpham: { select: { id: true, masp: true, title: true } },
        },
      });

      if (!currentBgsp) {
        // Create new if doesn't exist
        const newBgsp = await tx.banggiasanpham.create({
          data: {
            banggiaId,
            sanphamId,
            giaban: newPrice,
            isActive: true,
          },
          include: {
            banggia: { select: { mabanggia: true, title: true } },
            sanpham: { select: { masp: true, title: true } },
          },
        });

        // ✅ Log creation to BanggiasanphamHistory
        // Get user email
        let userEmail = 'system';
        if (userId && userId !== 'system') {
          const user = await tx.user.findUnique({
            where: { id: userId },
            select: { email: true, name: true },
          });
          userEmail = user?.email || user?.name || userId;
        }

        await tx.banggiasanphamHistory.create({
          data: {
            banggiasanphamId: newBgsp.id,
            banggiaId,
            sanphamId,
            oldPrice: 0,
            newPrice: newPrice,
            changePercent: 0,
            changeReason: reason || 'Tạo giá mới',
            changedBy: userEmail,
            sourceType: 'MANUAL',
            metadata: {
              userId: userId,
              banggiaCode: newBgsp.banggia.mabanggia,
              banggiaTitle: newBgsp.banggia.title,
              sanphamCode: newBgsp.sanpham.masp,
              sanphamTitle: newBgsp.sanpham.title,
              action: 'CREATE',
            },
          },
        });

        return {
          action: 'CREATED',
          data: newBgsp,
          oldPrice: null,
          newPrice,
        };
      }

      const oldPrice = Number(currentBgsp.giaban);

      // Check if price actually changed
      if (oldPrice === newPrice) {
        return {
          action: 'NO_CHANGE',
          message: 'Giá không thay đổi',
          currentPrice: oldPrice,
        };
      }

      // Calculate price change percentage
      const priceChange = Math.abs((newPrice - oldPrice) / oldPrice);

      // Note: Log warning for large price changes (>20%)
      // Frontend auto-generates reason when change > 20%
      // But still allow the update to proceed
      const hasValidReason = reason && reason.trim().length > 0;

      if (priceChange > 0.2) {
        if (hasValidReason) {
          console.log(`⚠️  [PRICE-UPDATE] Large price change with reason:`, {
            oldPrice,
            newPrice,
            priceChange: (priceChange * 100).toFixed(1) + '%',
            reason,
          });
        } else {
          console.warn(
            `⚠️  [PRICE-UPDATE] Large price change WITHOUT reason:`,
            {
              oldPrice,
              newPrice,
              priceChange: (priceChange * 100).toFixed(1) + '%',
              note: 'Consider adding reason for audit purposes',
            },
          );
        }
      }

      // 2. Update price in Banggiasanpham
      const updated = await tx.banggiasanpham.update({
        where: { id: currentBgsp.id },
        data: { giaban: newPrice },
        include: {
          banggia: { select: { mabanggia: true, title: true } },
          sanpham: { select: { masp: true, title: true } },
        },
      });

      // 3. ✅ Create price history record in BanggiasanphamHistory
      const percentChange =
        oldPrice > 0 ? ((newPrice - oldPrice) / oldPrice) * 100 : 0;

      // Get user email
      let userEmail = 'system';
      let userName = 'system';
      if (userId && userId !== 'system') {
        const user = await tx.user.findUnique({
          where: { id: userId },
          select: { email: true, name: true },
        });
        userEmail = user?.email || user?.name || userId;
        userName = user?.name || user?.email || userId;
      }

      await tx.banggiasanphamHistory.create({
        data: {
          banggiasanphamId: currentBgsp.id,
          banggiaId,
          sanphamId,
          oldPrice: oldPrice,
          newPrice: newPrice,
          changePercent: percentChange,
          changeReason:
            reason ||
            `Cập nhật giá: ${oldPrice.toLocaleString()} → ${newPrice.toLocaleString()}`,
          changedBy: userEmail,
          sourceType: 'MANUAL',
          metadata: {
            userId: userId,
            userName: userName,
            banggiaCode: currentBgsp.banggia.mabanggia,
            banggiaTitle: currentBgsp.banggia.title,
            sanphamCode: currentBgsp.sanpham.masp,
            sanphamTitle: currentBgsp.sanpham.title,
            difference: newPrice - oldPrice,
            action: 'UPDATE',
          },
        },
      });

      console.log(`📝 Price history logged for ${currentBgsp.sanpham.masp}`);
      console.log(
        `   Old: ${oldPrice} → New: ${newPrice} (${percentChange.toFixed(2)}%)`,
      );
      console.log(`   Changed by: ${userEmail} (${userName})`);
      console.log(`   Reason: ${reason || 'No reason provided'}`);

      console.log(
        `✅ Updated price: ${currentBgsp.sanpham.masp} in ${currentBgsp.banggia.mabanggia}: ${oldPrice} → ${newPrice}`,
      );

      return {
        action: 'UPDATED',
        data: updated,
        oldPrice,
        newPrice,
        changePercent: priceChange * 100,
      };
    });
  }

  /**
   * ✅ Lấy lịch sử thay đổi giá từ BanggiasanphamHistory
   */
  async getPriceHistory(
    banggiaId: string,
    sanphamId: string,
    options?: {
      from?: Date;
      to?: Date;
      limit?: number;
    },
  ) {
    // Find the banggiasanpham record
    const bgsp = await this.prisma.banggiasanpham.findFirst({
      where: { banggiaId, sanphamId },
      include: {
        banggia: { select: { mabanggia: true, title: true } },
        sanpham: { select: { masp: true, title: true } },
      },
    });

    console.log('[PRICE-HISTORY] Query for:', { banggiaId, sanphamId });
    console.log('[PRICE-HISTORY] Found bgsp:', bgsp ? bgsp.id : 'NOT FOUND');

    if (!bgsp) {
      console.warn('[PRICE-HISTORY] No banggiasanpham found');
      return [];
    }

    // ✅ Query BanggiasanphamHistory
    const where: any = {
      banggiasanphamId: bgsp.id,
    };

    if (options?.from || options?.to) {
      where.changedAt = {};
      if (options.from) where.changedAt.gte = options.from;
      if (options.to) where.changedAt.lte = options.to;
    }

    const history = await this.prisma.banggiasanphamHistory.findMany({
      where,
      orderBy: { changedAt: 'desc' },
      take: options?.limit || 100,
      select: {
        id: true,
        oldPrice: true,
        newPrice: true,
        changePercent: true,
        changeReason: true,
        changedBy: true,
        changedAt: true,
        sourceType: true,
        batchId: true,
        metadata: true,
      },
    });

    console.log(`[PRICE-HISTORY] Found ${history.length} records`);

    // ✅ Transform to match expected format
    return history.map((record) => {
      const difference = Number(record.newPrice) - Number(record.oldPrice);
      const percentChange = Number(record.changePercent);

      // Extract user info from metadata if available
      const userName = record.metadata?.['userName'] || record.changedBy;
      const userId = record.metadata?.['userId'] || null;

      return {
        id: record.id,
        oldPrice: Number(record.oldPrice),
        newPrice: Number(record.newPrice),
        difference,
        percentChange,
        reason: record.changeReason,
        changedAt: record.changedAt,
        changedBy: record.changedBy, // Email
        changedByName: userName, // Name or Email
        changedByUserId: userId, // Original userId
        sourceType: record.sourceType,
        batchId: record.batchId,
        banggia: {
          id: banggiaId,
          code: bgsp.banggia.mabanggia,
          title: bgsp.banggia.title,
        },
        sanpham: {
          id: sanphamId,
          code: bgsp.sanpham.masp,
          title: bgsp.sanpham.title,
        },
        metadata: record.metadata,
      };
    });
  }

  /**
   * Get current price
   */
  async getCurrentPrice(
    banggiaId: string,
    sanphamId: string,
  ): Promise<number | null> {
    const bgsp = await this.prisma.banggiasanpham.findFirst({
      where: { banggiaId, sanphamId },
    });

    return bgsp ? Number(bgsp.giaban) : null;
  }

  /**
   * Bulk update prices
   */
  async bulkUpdatePrices(
    updates: Array<{
      banggiaId: string;
      sanphamId: string;
      newPrice: number;
    }>,
    userId?: string,
    reason?: string,
  ) {
    const results: any[] = [];

    for (const update of updates) {
      try {
        const result = await this.updatePrice({
          ...update,
          userId,
          reason,
        });
        results.push({ success: true, ...update, result });
      } catch (error: any) {
        results.push({
          success: false,
          ...update,
          error: error.message,
        });
      }
    }

    const summary = {
      total: updates.length,
      successful: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      results,
    };

    console.log(
      `📊 Bulk price update: ${summary.successful}/${summary.total} successful`,
    );

    return summary;
  }
}

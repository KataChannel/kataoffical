import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
          sanpham: { select: { id: true, masp: true, title: true } }
        }
      });
      
      if (!currentBgsp) {
        // Create new if doesn't exist
        const newBgsp = await tx.banggiasanpham.create({
          data: {
            banggiaId,
            sanphamId,
            giaban: newPrice,
            isActive: true
          },
          include: {
            banggia: { select: { mabanggia: true, title: true } },
            sanpham: { select: { masp: true, title: true } }
          }
        });
        
        // Log creation
        if (userId) {
          await tx.auditLog.create({
            data: {
              entityName: 'Banggiasanpham',
              entityId: newBgsp.id,
              action: 'CREATE',
              userId,
              newValues: { giaban: newPrice },
              metadata: {
                banggiaId,
                banggiaCode: newBgsp.banggia.mabanggia,
                banggiaTitle: newBgsp.banggia.title,
                sanphamId,
                sanphamCode: newBgsp.sanpham.masp,
                sanphamTitle: newBgsp.sanpham.title,
                reason: reason || 'Tạo giá mới',
                timestamp: new Date().toISOString()
              }
            }
          });
        }
        
        return { 
          action: 'CREATED', 
          data: newBgsp,
          oldPrice: null,
          newPrice 
        };
      }
      
      const oldPrice = Number(currentBgsp.giaban);
      
      // Check if price actually changed
      if (oldPrice === newPrice) {
        return { 
          action: 'NO_CHANGE', 
          message: 'Giá không thay đổi',
          currentPrice: oldPrice 
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
            reason
          });
        } else {
          console.warn(`⚠️  [PRICE-UPDATE] Large price change WITHOUT reason:`, {
            oldPrice,
            newPrice,
            priceChange: (priceChange * 100).toFixed(1) + '%',
            note: 'Consider adding reason for audit purposes'
          });
        }
      }
      
      // 2. Update price in Banggiasanpham
      const updated = await tx.banggiasanpham.update({
        where: { id: currentBgsp.id },
        data: { giaban: newPrice },
        include: {
          banggia: { select: { mabanggia: true, title: true } },
          sanpham: { select: { masp: true, title: true } }
        }
      });
      
      // 3. Create audit log for price change
      if (userId) {
        await tx.auditLog.create({
          data: {
            entityName: 'Banggiasanpham',
            entityId: currentBgsp.id,
            action: 'UPDATE',
            userId,
            oldValues: { giaban: oldPrice },
            newValues: { giaban: newPrice },
            changedFields: ['giaban'],
            metadata: {
              banggiaId,
              banggiaCode: currentBgsp.banggia.mabanggia,
              banggiaTitle: currentBgsp.banggia.title,
              sanphamId,
              sanphamCode: currentBgsp.sanpham.masp,
              sanphamTitle: currentBgsp.sanpham.title,
              priceChange: {
                oldPrice,
                newPrice,
                difference: newPrice - oldPrice,
                percentChange: priceChange * 100
              },
              reason: reason || `Cập nhật giá: ${oldPrice.toLocaleString()} → ${newPrice.toLocaleString()}`,
              timestamp: new Date().toISOString()
            }
          }
        });
      }
      
      console.log(`✅ Updated price: ${currentBgsp.sanpham.masp} in ${currentBgsp.banggia.mabanggia}: ${oldPrice} → ${newPrice}`);
      
      return {
        action: 'UPDATED',
        data: updated,
        oldPrice,
        newPrice,
        changePercent: priceChange * 100
      };
    });
  }
  
  /**
   * Lấy lịch sử thay đổi giá từ AuditLog
   */
  async getPriceHistory(
    banggiaId: string,
    sanphamId: string,
    options?: {
      from?: Date;
      to?: Date;
      limit?: number;
    }
  ) {
    // Find the banggiasanpham record
    const bgsp = await this.prisma.banggiasanpham.findFirst({
      where: { banggiaId, sanphamId },
      include: {
        banggia: { select: { mabanggia: true, title: true } },
        sanpham: { select: { masp: true, title: true } }
      }
    });
    
    if (!bgsp) {
      return [];
    }
    
    // Query audit logs
    const where: any = {
      entityName: 'Banggiasanpham',
      entityId: bgsp.id,
      action: { in: ['CREATE', 'UPDATE'] }
    };
    
    if (options?.from || options?.to) {
      where.createdAt = {};
      if (options.from) where.createdAt.gte = options.from;
      if (options.to) where.createdAt.lte = options.to;
    }
    
    const logs = await this.prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 100,
      select: {
        id: true,
        action: true,
        oldValues: true,
        newValues: true,
        metadata: true,
        createdAt: true,
        userId: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });
    
    return logs.map(log => ({
      id: log.id,
      action: log.action,
      oldPrice: log.oldValues?.['giaban'] || null,
      newPrice: log.newValues?.['giaban'] || null,
      reason: log.metadata?.['reason'] || null,
      priceChange: log.metadata?.['priceChange'] || null,
      changedAt: log.createdAt,
      changedBy: log.user ? {
        id: log.user.id,
        email: log.user.email,
        name: log.user.name
      } : null,
      banggia: {
        id: banggiaId,
        code: bgsp.banggia.mabanggia,
        title: bgsp.banggia.title
      },
      sanpham: {
        id: sanphamId,
        code: bgsp.sanpham.masp,
        title: bgsp.sanpham.title
      }
    }));
  }
  
  /**
   * Get current price
   */
  async getCurrentPrice(banggiaId: string, sanphamId: string): Promise<number | null> {
    const bgsp = await this.prisma.banggiasanpham.findFirst({
      where: { banggiaId, sanphamId }
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
    reason?: string
  ) {
    const results: any[] = [];
    
    for (const update of updates) {
      try {
        const result = await this.updatePrice({
          ...update,
          userId,
          reason
        });
        results.push({ success: true, ...update, result });
      } catch (error: any) {
        results.push({ 
          success: false, 
          ...update, 
          error: error.message 
        });
      }
    }
    
    const summary = {
      total: updates.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    };
    
    console.log(`📊 Bulk price update: ${summary.successful}/${summary.total} successful`);
    
    return summary;
  }
}

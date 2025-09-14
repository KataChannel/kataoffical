import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PhieuGiaoHangOptimizedService {
  private readonly logger = new Logger(PhieuGiaoHangOptimizedService.name);
  private readonly BATCH_SIZE = 10;
  private readonly TRANSACTION_TIMEOUT = 30000; // 30 seconds

  constructor(private prisma: PrismaService) {}

  /**
   * OPTIMIZED updatePhieugiao - fixes N+1 query pattern
   */
  async updatePhieugiaoOptimized(id: string, data: any) {
    const startTime = performance.now();
    
    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Get current order first
        const currentOrder = await prisma.donhang.findUnique({
          where: { id },
          include: { sanpham: true }
        });

        if (!currentOrder) {
          throw new Error('Order not found');
        }

        // OPTIMIZATION 1: Batch all sanpham updates into single operation
        if (data.sanpham && data.sanpham.length > 0) {
          // Extract current sanpham IDs vs new sanpham IDs
          const currentSanphamIds = currentOrder.sanpham.map(sp => sp.idSP);
          const newSanphamIds = data.sanpham.map((sp: any) => sp.id);
          
          // Delete removed sanpham records
          const sanphamToDelete = currentSanphamIds.filter(spId => !newSanphamIds.includes(spId));
          if (sanphamToDelete.length > 0) {
            await prisma.donhangsanpham.deleteMany({
              where: {
                donhangId: id,
                idSP: { in: sanphamToDelete }
              }
            });
          }

          // OPTIMIZATION 2: Use Promise.all for concurrent updates instead of sequential loop
          const updatePromises = data.sanpham.map((sp: any) =>
            prisma.donhangsanpham.updateMany({
              where: { 
                donhangId: id,
                idSP: sp.id 
              },
              data: {
                ghichu: sp.ghichu,
                sldat: parseFloat((sp.sldat ?? 0).toFixed(3)),
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(3)),
                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(3)),
                ttdat: parseFloat((sp.ttdat ?? 0).toFixed(3)),
                ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(3)),
                ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(3)),
                vat: parseFloat((sp.vat ?? 0).toFixed(3)),
                ttsauvat: parseFloat((sp.ttsauvat ?? 0).toFixed(3)),
              },
            })
          );

          // Execute all updates concurrently
          await Promise.all(updatePromises);
        }

        // Update main order record
        const updatedOrder = await prisma.donhang.update({
          where: { id },
          data: {
            status: data.status,
            ghichu: data.ghichu,
            ngaygiao: data.ngaygiao ? new Date(data.ngaygiao) : undefined,
            // Add other fields as needed
          },
          include: {
            sanpham: {
              include: { sanpham: true }
            },
            khachhang: true
          }
        });

        return updatedOrder;
      }, {
        timeout: this.TRANSACTION_TIMEOUT,
        maxWait: 5000
      });
    } catch (error) {
      const duration = performance.now() - startTime;
      this.logger.error(`updatePhieugiao failed after ${duration}ms for order ${id}:`, error);
      throw error;
    } finally {
      const duration = performance.now() - startTime;
      if (duration > 5000) {
        this.logger.warn(`SLOW OPERATION: updatePhieugiao took ${duration}ms for order ${id}`);
      }
    }
  }

  /**
   * OPTIMIZED updateBulk - fixes transaction timeout issues
   */
  async updateBulkOptimized(ids: string[], status: string) {
    const startTime = performance.now();
    let totalSuccess = 0;
    let totalFail = 0;

    this.logger.log(`Starting bulk update for ${ids.length} orders with status: ${status}`);

    // OPTIMIZATION 3: Process in smaller batches to prevent timeout
    for (let i = 0; i < ids.length; i += this.BATCH_SIZE) {
      const batch = ids.slice(i, i + this.BATCH_SIZE);
      const batchStartTime = performance.now();

      try {
        const { success, fail } = await this.processBatch(batch, status);
        totalSuccess += success;
        totalFail += fail;

        const batchDuration = performance.now() - batchStartTime;
        this.logger.log(`Batch ${Math.floor(i/this.BATCH_SIZE) + 1} completed: ${success}/${batch.length} successful in ${batchDuration}ms`);

        // Add small delay between batches to prevent overwhelming database
        if (i + this.BATCH_SIZE < ids.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        this.logger.error(`Batch ${Math.floor(i/this.BATCH_SIZE) + 1} failed:`, error);
        totalFail += batch.length;
      }
    }

    const totalDuration = performance.now() - startTime;
    this.logger.log(`Bulk update completed: ${totalSuccess}/${ids.length} successful in ${totalDuration}ms`);

    return { success: totalSuccess, fail: totalFail };
  }

  private async processBatch(batchIds: string[], status: string) {
    return await this.prisma.$transaction(async (prisma) => {
      let success = 0;
      let fail = 0;

      // OPTIMIZATION 4: Process batch items concurrently instead of sequentially
      const batchPromises = batchIds.map(async (id) => {
        try {
          const oldDonhang = await prisma.donhang.findUnique({
            where: { id },
            include: { sanpham: true }
          });

          if (!oldDonhang) {
            return { success: 0, fail: 1 };
          }

          // Process status change logic here...
          if (oldDonhang.status === 'dadat' && status === 'danhan') {
            // Batch inventory updates
            const inventoryUpdates = oldDonhang.sanpham.map(sp => {
              const decValue = parseFloat((sp.sldat ?? 0).toFixed(3));
              return prisma.tonKho.update({
                where: { sanphamId: sp.idSP },
                data: {
                  slchogiao: { decrement: decValue },
                  slton: { decrement: decValue },
                },
              });
            });

            await Promise.all(inventoryUpdates);

            // Update order status
            await prisma.donhang.update({
              where: { id },
              data: {
                status: 'danhan',
                // Update sanpham quantities
                sanpham: {
                  updateMany: oldDonhang.sanpham.map((sp: any) => ({
                    where: { idSP: sp.idSP },
                    data: {
                      slgiao: parseFloat((sp.sldat ?? 0).toFixed(3)),
                      slnhan: parseFloat((sp.sldat ?? 0).toFixed(3)),
                    },
                  })),
                },
              },
            });
          }

          return { success: 1, fail: 0 };
        } catch (error) {
          this.logger.error(`Error processing order ${id}:`, error);
          return { success: 0, fail: 1 };
        }
      });

      const results = await Promise.all(batchPromises);
      
      results.forEach(result => {
        success += result.success;
        fail += result.fail;
      });

      return { success, fail };
    }, {
      timeout: this.TRANSACTION_TIMEOUT,
      maxWait: 5000
    });
  }

  /**
   * Health check method to monitor performance
   */
  async healthCheck() {
    const startTime = performance.now();
    
    try {
      // Simple query to test database connectivity and performance
      const count = await this.prisma.donhang.count({
        where: { status: 'dadat' }
      });
      
      const duration = performance.now() - startTime;
      
      return {
        status: 'healthy',
        duration,
        pendingOrders: count,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        status: 'unhealthy',
        duration,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}
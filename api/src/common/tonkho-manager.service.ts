import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

export interface TonkhoOperation {
  sanphamId: string;
  khoId?: string; // Target warehouse ID
  operation: 'increment' | 'decrement' | 'set';
  slton?: number;
  sltontt?: number;
  slchogiao?: number;
  slchonhap?: number;
  reason?: string;
}

export interface TonkhoValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

@Injectable()
export class TonkhoManagerService {
  constructor(private prisma: PrismaService) {}

  /**
   * Safely update TonKho with atomic transaction
   */
  async updateTonkhoAtomic(operations: TonkhoOperation[], tx?: any): Promise<void> {
    const execute = async (prisma: any) => {
      for (const op of operations) {
        // --- 1. Update Global TonKho ---
        // Get current tonkho state
        const currentTonkho = await prisma.tonKho.findUnique({
          where: { sanphamId: op.sanphamId }
        });

        if (!currentTonkho) {
          // Create if doesn't exist
          await prisma.tonKho.create({
            data: {
              sanphamId: op.sanphamId,
              slton: op.slton || 0,
              sltontt: op.sltontt || 0,
              slchogiao: op.slchogiao || 0,
              slchonhap: op.slchonhap || 0,
            }
          });
        } else {
          // Build update data
          const updateData: any = {};

          if (op.slton !== undefined) {
            switch (op.operation) {
              case 'increment':
                updateData.slton = { increment: op.slton };
                break;
              case 'decrement':
                updateData.slton = { decrement: op.slton };
                break;
              case 'set':
                updateData.slton = op.slton;
                break;
            }
          }

          if (op.sltontt !== undefined) {
            switch (op.operation) {
              case 'increment':
                updateData.sltontt = { increment: op.sltontt };
                break;
              case 'decrement':
                updateData.sltontt = { decrement: op.sltontt };
                break;
              case 'set':
                updateData.sltontt = op.sltontt;
                break;
            }
          }

          if (op.slchogiao !== undefined) {
            switch (op.operation) {
              case 'increment':
                updateData.slchogiao = { increment: op.slchogiao };
                break;
              case 'decrement':
                updateData.slchogiao = { decrement: op.slchogiao };
                break;
              case 'set':
                updateData.slchogiao = op.slchogiao;
                break;
            }
          }

          if (op.slchonhap !== undefined) {
            switch (op.operation) {
              case 'increment':
                updateData.slchonhap = { increment: op.slchonhap };
                break;
              case 'decrement':
                updateData.slchonhap = { decrement: op.slchonhap };
                break;
              case 'set':
                updateData.slchonhap = op.slchonhap;
                break;
            }
          }

          // Apply update
          await prisma.tonKho.update({
            where: { sanphamId: op.sanphamId },
            data: updateData
          });
        }

        // --- 2. Update Warehouse-specific SanphamKho ---
        const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
        const effectiveKhoId = op.khoId || KHO_TONG_ID;

        if (op.slton !== undefined || op.sltontt !== undefined) {
          const movement = op.slton !== undefined ? op.slton : (op.sltontt || 0);
          
          // Update the specific warehouse (Source Tracking)
          await prisma.sanphamKho.upsert({
            where: {
              sanphamId_khoId: {
                sanphamId: op.sanphamId,
                khoId: effectiveKhoId
              }
            },
            update: {
              soluong: 
                op.operation === 'increment' ? { increment: Number(movement) } :
                op.operation === 'decrement' ? { decrement: Number(movement) } :
                Number(movement)
            },
            create: {
              sanphamId: op.sanphamId,
              khoId: effectiveKhoId,
              soluong: op.operation === 'decrement' ? -Number(movement) : Number(movement)
            }
          });

          // ✅ MIRROR LOGIC: If update is NOT for KHO TỔNG, apply same delta to KHO TỔNG
          if (effectiveKhoId !== KHO_TONG_ID && op.operation !== 'set') {
             await prisma.sanphamKho.upsert({
                where: {
                  sanphamId_khoId: {
                    sanphamId: op.sanphamId,
                    khoId: KHO_TONG_ID
                  }
                },
                 update: {
                   soluong: 
                     op.operation === 'increment' ? { increment: Number(movement) } :
                     { decrement: Number(movement) }
                 },
                 create: {
                   sanphamId: op.sanphamId,
                   khoId: KHO_TONG_ID,
                   soluong: op.operation === 'decrement' ? -Number(movement) : Number(movement)
                 }
             });
          }

          // --- 3. Synchronize Global TonKho from KHO TỔNG ---
          // Since there is only ONE physical warehouse, KHO TỔNG is the truth for Global Stock
          const khoTongRecord = await prisma.sanphamKho.findUnique({
            where: {
              sanphamId_khoId: {
                sanphamId: op.sanphamId,
                khoId: KHO_TONG_ID
              }
            }
          });

          const totalPhysicalStock = Number(khoTongRecord?.soluong || 0);

          await prisma.tonKho.update({
            where: { sanphamId: op.sanphamId },
            data: { 
              slton: totalPhysicalStock,
              sltontt: totalPhysicalStock 
            }
          });
        }
      }
    };

    if (tx) return execute(tx);
    return this.prisma.safeTransaction(execute);
  }

  /**
   * Validate TonKho consistency against pending orders
   */
  async validateTonkhoConsistency(): Promise<TonkhoValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const tonkhoData = await this.prisma.tonKho.findMany({
        include: {
          sanpham: {
            include: {
              Donhangsanpham: {
                where: {
                  donhang: {
                    status: { in: ['dadat', 'dagiao'] }
                  }
                }
              },
              Dathangsanpham: {
                where: {
                  dathang: {
                    status: { in: ['dadat', 'dagiao'] }
                  }
                }
              }
            }
          }
        }
      });

      for (const tonkho of tonkhoData) {
        const pendingOut = tonkho.sanpham.Donhangsanpham
          .reduce((sum, item) => sum + Number(item.slgiao || 0), 0);
        
        const pendingIn = tonkho.sanpham.Dathangsanpham
          .reduce((sum, item) => sum + Number(item.slgiao || 0), 0);

        // Check slchogiao consistency
        const chogiaoExpected = Math.round(pendingOut * 1000) / 1000;
        const chogiaoActual = Math.round(Number(tonkho.slchogiao) * 1000) / 1000;
        
        if (Math.abs(chogiaoExpected - chogiaoActual) > 0.001) {
          errors.push(
            `TonKho ${tonkho.sanpham.masp}: slchogiao inconsistent. ` +
            `Expected: ${chogiaoExpected}, Actual: ${chogiaoActual}`
          );
        }

        // Check slchonhap consistency  
        const chonhapExpected = Math.round(pendingIn * 1000) / 1000;
        const chonhapActual = Math.round(Number(tonkho.slchonhap) * 1000) / 1000;
        
        if (Math.abs(chonhapExpected - chonhapActual) > 0.001) {
          errors.push(
            `TonKho ${tonkho.sanpham.masp}: slchonhap inconsistent. ` +
            `Expected: ${chonhapExpected}, Actual: ${chonhapActual}`
          );
        }

        // Check negative inventory
        if (Number(tonkho.slton) < 0) {
          warnings.push(`TonKho ${tonkho.sanpham.masp}: Negative inventory ${tonkho.slton}`);
        }

        // Check if available inventory can fulfill pending orders
        const availableInventory = Number(tonkho.slton) - Number(tonkho.slchogiao);
        if (availableInventory < 0) {
          warnings.push(
            `TonKho ${tonkho.sanpham.masp}: ` +
            `Oversold. Available: ${availableInventory}, Pending out: ${tonkho.slchogiao}`
          );
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings
      };

    } catch (error) {
      return {
        isValid: false,
        errors: [`Validation failed: ${error.message}`],
        warnings: []
      };
    }
  }

  /**
   * Get TonKho summary with pending order details
   */
  async getTonkhoSummary(khoId?: string): Promise<any[]> {
    const whereClause: any = {};
    if (khoId) {
      whereClause.sanpham = {
        SanphamKho: {
          some: { khoId }
        }
      };
    }

    return this.prisma.tonKho.findMany({
      where: whereClause,
      include: {
        sanpham: {
          select: {
            id: true,
            masp: true,
            title: true,
            dvt: true,
            Donhangsanpham: {
              where: {
                donhang: { status: { in: ['dadat', 'dagiao'] } }
              },
              include: {
                donhang: {
                  select: {
                    madonhang: true,
                    status: true,
                    ngaygiao: true
                  }
                }
              }
            },
            Dathangsanpham: {
              where: {
                dathang: { status: { in: ['dadat', 'dagiao'] } }
              },
              include: {
                dathang: {
                  select: {
                    madncc: true,
                    status: true,
                    ngaynhan: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  /**
   * Fix TonKho inconsistencies by recalculating from orders
   */
  async recalculateTonkho(sanphamIds?: string[]): Promise<{ fixed: number; errors: string[] }> {
    const errors: string[] = [];
    let fixed = 0;

    try {
      const whereClause = sanphamIds ? { id: { in: sanphamIds } } : {};
      
      const sanphams = await this.prisma.sanpham.findMany({
        where: whereClause,
        include: {
          TonKho: true,
          Donhangsanpham: {
            where: {
              donhang: { status: { in: ['dadat', 'dagiao'] } }
            }
          },
          Dathangsanpham: {
            where: {
              dathang: { status: { in: ['dadat', 'dagiao'] } }
            }
          }
        }
      });

      for (const sanpham of sanphams) {
        const pendingOut = sanpham.Donhangsanpham
          .reduce((sum, item) => sum + Number(item.slgiao || 0), 0);
        
        const pendingIn = sanpham.Dathangsanpham
          .reduce((sum, item) => sum + Number(item.slgiao || 0), 0);

        const correctedSlchogiao = Math.round(pendingOut * 1000) / 1000;
        const correctedSlchonhap = Math.round(pendingIn * 1000) / 1000;

        if (sanpham.TonKho) {
          await this.prisma.tonKho.update({
            where: { sanphamId: sanpham.id },
            data: {
              slchogiao: correctedSlchogiao,
              slchonhap: correctedSlchonhap
            }
          });
          fixed++;
        } else {
          await this.prisma.tonKho.create({
            data: {
              sanphamId: sanpham.id,
              slton: 0,
              slchogiao: correctedSlchogiao,
              slchonhap: correctedSlchonhap
            }
          });
          fixed++;
        }
      }

      return { fixed, errors };

    } catch (error) {
      errors.push(`Recalculation failed: ${error.message}`);
      return { fixed, errors };
    }
  }

  /**
   * Đồng bộ Sổ sách với Thực tế (Quick Snapshot/Sync)
   * Giúp Chênh lệch về 0 bằng cách cân bằng slton và sltontt theo tính toán tin cậy
   */
  async syncStockToReality(sanphamId: string, tx?: any): Promise<void> {
    const prisma = tx || this.prisma;
    
    // 1. Lấy trạng thái hiện tại và các đơn hàng liên quan kể từ lần chốt gần nhất
    const tk = await prisma.tonKho.findUnique({
      where: { sanphamId },
      include: {
        sanpham: {
          include: {
            Donhangsanpham: {
              where: {
                donhang: { status: { in: ['dagiao', 'danhan', 'hoanthanh'] } }
              }
            },
            Dathangsanpham: {
              where: {
                dathang: { status: 'danhan' }
              }
            }
          }
        }
      }
    });

    if (!tk) return;

    // 2. Sử dụng Aggregate để tính tổng nhanh từ DB thay vì kéo hàng nghìn record về memory
    const [receivedAgg, deliveredAgg] = await Promise.all([
      prisma.dathangsanpham.aggregate({
        where: {
          idSP: sanphamId,
          dathang: {
            updatedAt: { gt: tk.updatedAt },
            status: 'danhan'
          }
        },
        _sum: { slnhan: true }
      }),
      prisma.donhangsanpham.aggregate({
        where: {
          idSP: sanphamId,
          donhang: {
            updatedAt: { gt: tk.updatedAt },
            status: { in: ['dagiao', 'danhan', 'hoanthanh'] }
          }
        },
        _sum: { slnhan: true, sldat: true }
      })
    ]);

    const received = Number(receivedAgg._sum?.slnhan || 0);
    // Ưu tiên slnhan, nếu chưa có thì dùng sldat (cho đơn hàng đang giao/hoàn thành)
    const delivered = Number(deliveredAgg._sum?.slnhan || deliveredAgg._sum?.sldat || 0);
    
    // Công thức hội tụ: Tồn chốt cũ + Biến động = Tồn thực tế hiện tại
    const reliableTotal = Math.max(0, Number(tk.sltontt || 0) + received - delivered);

    // 3. Cập nhật đồng bộ
    await prisma.tonKho.update({
      where: { sanphamId },
      data: {
        slton: reliableTotal,
        sltontt: reliableTotal,
        updatedAt: new Date() // Reset thời điểm chốt về hiện tại
      }
    });
  }
}

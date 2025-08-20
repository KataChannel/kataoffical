import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

export interface TonkhoOperation {
  sanphamId: string;
  operation: 'increment' | 'decrement' | 'set';
  slton?: number;
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
  async updateTonkhoAtomic(operations: TonkhoOperation[]): Promise<void> {
    return this.prisma.$transaction(async (tx) => {
      for (const op of operations) {
        // Get current tonkho state
        const currentTonkho = await tx.tonKho.findUnique({
          where: { sanphamId: op.sanphamId }
        });

        if (!currentTonkho) {
          // Create if doesn't exist
          await tx.tonKho.create({
            data: {
              sanphamId: op.sanphamId,
              slton: op.slton || 0,
              slchogiao: op.slchogiao || 0,
              slchonhap: op.slchonhap || 0,
            }
          });
          continue;
        }

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
        await tx.tonKho.update({
          where: { sanphamId: op.sanphamId },
          data: updateData
        });
      }
    });
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
}

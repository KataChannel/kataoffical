import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from '../importdata/importdata.service';
import { convertXuatnhapton } from '../shared/utils/xuatnhapton.utils';

@Injectable()
export class PhieukhoService {
  constructor(
    private readonly prisma: PrismaService,
    private _ImportdataService: ImportdataService,
  ) {}

  // ✅ Helper methods để thay thế TimezoneUtilService (vì frontend gửi UTC)
  private formatDateForFilename(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  async generateNextOrderCode(type: any): Promise<string> {
    try {
      // Validate type parameter
      if (!type || !['nhap', 'xuat', 'chuyenkho'].includes(type)) {
        throw new Error(`Invalid type: ${type}`);
      }

      // Lấy mã đơn hàng gần nhất theo type nhap hoặc xuat
      const lastOrder = await this.prisma.phieuKho.findFirst({
        where: { type },
        orderBy: { createdAt: 'desc' },
      });

      // Mã mặc định cho từng loại
      let nextCode = 'PKNAA00001';
      if (type === 'xuat') nextCode = 'PKXAA00001';
      if (type === 'chuyenkho') nextCode = 'PK-CK-AA0001';

      if (lastOrder && lastOrder.maphieu) {
        console.log(`Last order found: ${lastOrder.maphieu} for type: ${type}`);
        nextCode = this.incrementOrderCode(lastOrder.maphieu, type);
        console.log(`Generated next code: ${nextCode}`);
      } else {
        console.log(`No previous orders found for type: ${type}, using default: ${nextCode}`);
      }

      return nextCode;
    } catch (error) {
      console.error('Error in generateNextOrderCode:', error);
      // Return safe default in case of any error
      return type === 'nhap' ? 'PKNAA00001' : (type === 'xuat' ? 'PKXAA00001' : 'PK-CK-AA0001');
    }
  }
  private incrementOrderCode(orderCode: string, type: any): string {
    // Sử dụng prefix theo loại: PKN cho nhap, PKX cho xuat, PK-CK- cho chuyenkho
    let prefix = 'PKN';
    let numberPartLength = 5;
    let letterStartIndex = 3;

    if (type === 'xuat') {
        prefix = 'PKX';
        numberPartLength = 5;
        letterStartIndex = 3;
    } else if (type === 'chuyenkho') {
        prefix = 'PK-CK-';
        numberPartLength = 4;
        letterStartIndex = 6;
    }
    
    // Validate orderCode format - check if it at least contains the prefix
    if (!orderCode || !orderCode.startsWith(prefix)) {
      console.warn(`Invalid orderCode prefix: ${orderCode}, expected ${prefix}. Using default.`);
      return type === 'nhap' ? 'PKNAA00001' : (type === 'xuat' ? 'PKXAA00001' : 'PK-CK-AA0001');
    }
    
    // Extract letters and numbers based on dynamic indices
    const letters = orderCode.slice(letterStartIndex, letterStartIndex + 2);
    const numberPart = orderCode.slice(letterStartIndex + 2);
    const numbers = parseInt(numberPart, 10);

    // Validate parsed numbers
    if (isNaN(numbers) || numbers < 0) {
      console.warn(`Invalid number part in orderCode: ${orderCode}, numberPart: ${numberPart}, parsed: ${numbers}`);
      return type === 'nhap' ? 'PKNAA00001' : (type === 'xuat' ? 'PKXAA00001' : 'PK-CK-AA0001');
    }

    let newLetters = letters;
    let newNumbers = numbers + 1;

    // Giới hạn số (99999 cho nhap/xuat, 9999 cho chuyenkho)
    const maxNumber = Math.pow(10, numberPartLength) - 1;

    if (newNumbers > maxNumber) {
      newNumbers = 1; // Reset số về 1
      newLetters = this.incrementLetters(letters);
    }

    return `${prefix}${newLetters}${newNumbers.toString().padStart(numberPartLength, '0')}`;
  }

  private incrementLetters(letters: string): string {
    // Validate input
    if (!letters || letters.length !== 2) {
      console.warn(`Invalid letters format: ${letters}, using default AA`);
      return 'AA';
    }

    let firstChar = letters.charCodeAt(0);
    let secondChar = letters.charCodeAt(1);

    // Validate character codes (A=65, Z=90)
    if (firstChar < 65 || firstChar > 90 || secondChar < 65 || secondChar > 90) {
      console.warn(`Invalid letter characters: ${letters}, using default AA`);
      return 'AA';
    }

    if (secondChar === 90) {
      // 'Z'
      if (firstChar === 90) return 'ZZ'; // Giới hạn cuối cùng
      firstChar++;
      secondChar = 65; // Reset về 'A'
    } else {
      secondChar++;
    }

    return String.fromCharCode(firstChar) + String.fromCharCode(secondChar);
  }



  async xuatnhapton(query: any) {
    const { khoId, Batdau, Ketthuc } = query;
    const phieuKhos = await this.prisma.phieuKho.findMany({
      where: {
        ...(khoId && { khoId }),
        ngay: {
          gte: new Date(Batdau),
          lte: new Date(Ketthuc),
        },
      },
      include: {
        sanpham: { include: { sanpham: true } },
        kho: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    const tranData = phieuKhos.map((phieuKho) => ({
      khoname: phieuKho.kho?.name ?? '',
      maphieu: phieuKho.maphieu,
      ngay: phieuKho.ngay,
      type: phieuKho.type,
      sanpham: phieuKho.sanpham.map((item) => ({
        id: item.id,
        soluong: item.soluong,
        title: item.sanpham.title,
      })),
    }));

    console.log(tranData);
    // return convertXuatnhapton(tranData);
    return tranData
  }



  async findAll() {
    const phieuKhos = await this.prisma.phieuKho.findMany({
      take: 100,
      where: { isActive: true },
      include: {
        sanpham: { select: { id: true, soluong: true, ghichu: true, sanpham: { select: { id: true, masp: true, title: true } } } },
        kho: { select: { id: true, name: true } },
        tuKho: { select: { id: true, name: true } },
        denKho: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return phieuKhos;
  }

  async findByRange(start: string, end: string) {
    const phieuKhos = await this.prisma.phieuKho.findMany({
      where: {
        isActive: true,
        ngay: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
      include: {
        sanpham: { select: { id: true, soluong: true, ghichu: true, sanpham: { select: { id: true, masp: true, title: true } } } },
        kho: { select: { id: true, name: true } },
        tuKho: { select: { id: true, name: true } },
        denKho: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return phieuKhos;
  }

  async findOne(id: string) {
    const phieuKho = await this.prisma.phieuKho.findUnique({
      where: { id },
      include: {
        sanpham: true,
        kho: true,
      },
    });
    if (!phieuKho) throw new NotFoundException('phieuKho not found');
    return phieuKho;
  }



  


  async create(data: any) {
    // Validate input data first
    if (!data.type || !['nhap', 'xuat', 'chuyenkho'].includes(data.type)) {
      throw new BadRequestException('Invalid phieukho type. Must be "nhap", "xuat" or "chuyenkho"');
    }
    
    if (!data.sanpham || !Array.isArray(data.sanpham) || data.sanpham.length === 0) {
      throw new BadRequestException('Sanpham array is required and cannot be empty');
    }

    // Merge sanpham with same sanphamId to prevent unique constraint violation
    const mergedSanphamMap = new Map();
    for (const sp of data.sanpham) {
      if (!sp.sanphamId) continue;
      
      if (mergedSanphamMap.has(sp.sanphamId)) {
        const existing = mergedSanphamMap.get(sp.sanphamId);
        existing.soluong = (Number(existing.soluong) || 0) + (Number(sp.soluong) || 0);
        if (sp.ghichu) existing.ghichu = existing.ghichu ? `${existing.ghichu}; ${sp.ghichu}` : sp.ghichu;
      } else {
        mergedSanphamMap.set(sp.sanphamId, { ...sp });
      }
    }
    data.sanpham = Array.from(mergedSanphamMap.values());

    // Generate maphieu outside transaction to avoid nested queries
    let maphieukho: string = '';
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      try {
        maphieukho = await this.generateNextOrderCode(data.type);
        break;
      } catch (error) {
        attempts++;
        console.log(`Error generating maphieu, attempt ${attempts}:`, error.message);
        if (attempts >= maxAttempts) {
          throw new BadRequestException('Failed to generate unique maphieu after multiple attempts');
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 100 * attempts));
      }
    }

    // Create phieukho with generated maphieu
    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Double-check maphieu uniqueness within transaction
        const existingPhieukho = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieukho }
        });

        if (existingPhieukho) {
          throw new BadRequestException(`Maphieu ${maphieukho} already exists`);
        }

        const newPhieuKho = await prisma.phieuKho.create({
          data: {
            title: data.title,  
            maphieu: maphieukho,
            ngay: new Date(data.ngay),
            type: data.type,
            isChotkho: data.isChotkho || false,
            khoId: data.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258",
            tuKhoId: data.tuKhoId,
            denKhoId: data.denKhoId,
            ghichu: data.ghichu,
            isActive: data.isActive ?? true,
            sanpham: {
              create: data.sanpham.map((sp: any) => ({
                sanphamId: sp.sanphamId,
                soluong: Number(sp.soluong) || 0,
                ghichu: sp.ghichu || '',
              })),
            },
          },
          include: { sanpham: true },
        });

        // Update tonkho for each sanpham
        for (const sp of data.sanpham) {
          const soluong = Number(sp.soluong) || 0;
          if (soluong > 0 || (data.useAbsoluteTarget && sp.targetSlton !== undefined)) {
            // Find current stock to handle "Checkout Reset" logic
            const currentTonKho = await prisma.tonKho.findUnique({
              where: { sanphamId: sp.sanphamId }
            });

            const currentSltontt = currentTonKho ? (Number(currentTonKho.sltontt) || 0) : 0;

            if (data.isChotkho) {
              // ✅ FIX: Khi useAbsoluteTarget=true, dùng giá trị tuyệt đối từ frontend
              // Không tính delta → Không race condition
              let targetStock: number;

              if (data.useAbsoluteTarget && sp.targetSlton !== undefined) {
                // 🚀 NEW: Absolute target mode - SET trực tiếp giá trị từ Excel
                targetStock = Number(sp.targetSlton);
                console.log(`📌 [CHOTKHO-ABS] ${sp.sanphamId}: sltontt ${currentSltontt} → ${targetStock} (absolute target)`);
              } else {
                // Legacy delta mode (backward compatible)
                targetStock = data.type === 'nhap' ? currentSltontt + soluong : currentSltontt - soluong;
                console.log(`📌 [CHOTKHO-DELTA] ${sp.sanphamId}: sltontt ${currentSltontt} → ${targetStock} (delta: ${soluong})`);
              }

              if (targetStock < 0) {
                console.warn(`⚠️ [CHOTKHO] ${sp.sanphamId}: targetStock=${targetStock} < 0, setting to 0`);
                targetStock = 0;
              }

              // 🚀 SPECIAL CHECKOUT LOGIC: Align Cumulative (slton) with Actual (sltontt)
              // This resets any historical negative balance (Debt) to the real physical count
              await prisma.tonKho.upsert({
                where: { sanphamId: sp.sanphamId },
                update: { 
                  slton: targetStock, // Force alignment
                  sltontt: targetStock
                },
                create: { 
                  sanphamId: sp.sanphamId, 
                  slton: targetStock,
                  sltontt: targetStock,
                  slchogiao: 0,
                  slchonhap: 0
                }
              });
            } else if (data.type === 'chuyenkho') {
              // 🚀 SPECIAL: Transfer Logic (Transactional update for two warehouses)
              if (!data.tuKhoId || !data.denKhoId) {
                throw new BadRequestException('tuKhoId and denKhoId are required for transfers');
              }
              if (data.tuKhoId === data.denKhoId) {
                throw new BadRequestException('Source and Destination warehouses must be different');
              }

              // 1. Subtract from Source (tuKhoId) - NOTE: Currently TonKho logic is simplified to one global slton per sanphamId? 
              // Wait, checking schema: TonKho has only sanphamId as @unique. 
              // This project seems to handle multi-warehouse via a different mechanism or it's currently 1-1.
              // IF TonKho is global, transfer is just internal redistribution? 
              // BUT the request says "Trừ tại Kho Đi, Cộng tại Kho Nhận". 
              // Let's assume there's a SanphamKho table we should use instead or update TonKho if it's per warehouse.
              // ACUALLY: Schema shows `model TonKho { sanphamId String @unique ... }`
              // This implies TonKho is GLOBAL. 
              // BUT `model Kho` has `sanphamKho SanphamKho[]`. 
              // Let's check `SanphamKho`.
              // `model SanphamKho { id String @id, khoId String, sanphamId String, soluong Decimal }`
              // YES! SanphamKho is the multi-warehouse table.
              
              // Update Source Warehouse (tuKhoId)
              await prisma.sanphamKho.upsert({
                where: {
                  sanphamId_khoId: {
                    sanphamId: sp.sanphamId,
                    khoId: data.tuKhoId
                  }
                },
                update: { soluong: { decrement: soluong } },
                create: { khoId: data.tuKhoId, sanphamId: sp.sanphamId, soluong: -soluong }
              });

              // Update Destination Warehouse (denKhoId)
              await prisma.sanphamKho.upsert({
                where: {
                  sanphamId_khoId: {
                    sanphamId: sp.sanphamId,
                    khoId: data.denKhoId
                  }
                },
                update: { soluong: { increment: soluong } },
                create: { khoId: data.denKhoId, sanphamId: sp.sanphamId, soluong: soluong }
              });

              // NOTE: If we want to keep TonKho (global) updated, transfers don't change global total.
            } else {
              // Regular Inventory movement (Import/Export)
              if (data.type === 'nhap') {
                await prisma.tonKho.upsert({
                  where: { sanphamId: sp.sanphamId },
                  update: { 
                    slton: { increment: soluong },
                    sltontt: { increment: soluong }
                  },
                  create: { sanphamId: sp.sanphamId, slton: soluong, sltontt: soluong, slchogiao: 0, slchonhap: 0 }
                });
                
                // Update specific warehouse
                await prisma.sanphamKho.upsert({
                  where: {
                    sanphamId_khoId: {
                      sanphamId: sp.sanphamId,
                      khoId: data.khoId
                    }
                  },
                  update: { soluong: { increment: soluong } },
                  create: { khoId: data.khoId, sanphamId: sp.sanphamId, soluong: soluong }
                });
              } else if (data.type === 'xuat') {
                await prisma.tonKho.upsert({
                  where: { sanphamId: sp.sanphamId },
                  update: { 
                    slton: { decrement: soluong },
                    sltontt: { decrement: soluong }
                  },
                  create: { sanphamId: sp.sanphamId, slton: -soluong, sltontt: -soluong, slchogiao: 0, slchonhap: 0 }
                });

                // Update specific warehouse
                await prisma.sanphamKho.upsert({
                  where: {
                    sanphamId_khoId: {
                      sanphamId: sp.sanphamId,
                      khoId: data.khoId
                    }
                  },
                  update: { soluong: { decrement: soluong } },
                  create: { khoId: data.khoId, sanphamId: sp.sanphamId, soluong: -soluong }
                });
              }
            }
          }
        }

        console.log(`✅ Created phieukho: ${maphieukho} with ${data.sanpham.length} items`);
        return newPhieuKho;
      });
      
    } catch (error: any) {
      console.error('Error creating phieukho:', error);
      
      // Log error for debugging
      try {
        await this._ImportdataService.create({
          caseDetail: {
            errorMessage: error.message,
            errorStack: error.stack,
            additionalInfo: `Error creating phieukho with maphieu: ${maphieukho}`,
            inputData: JSON.stringify(data)
          },
          order: 1,
          createdBy: 'system',
          title: `Phieukho Creation Error ${new Date().toLocaleString('vi-VN')}`,
          type: 'phieukho_error',
        });
      } catch (logError) {
        console.error('Error logging to ImportdataService:', logError);
      }

      // Re-throw with better error message
      if (error.code === 'P2002') {
        throw new BadRequestException(`Duplicate entry: ${error.meta?.target || 'unknown field'}`);
      } else if (error.code === 'P2003') {
        throw new BadRequestException('Foreign key constraint violation. Check sanphamId validity.');
      } else if (error.code === '25P02') {
        throw new BadRequestException('Transaction was aborted. Please try again.');
      } else {
        throw new BadRequestException(`Failed to create phieukho: ${error.message}`);
      }
    }
  }

  async update(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      const oldPhieuKho = await prisma.phieuKho.findUnique({
        where: { id },
        include: { sanpham: true },
      });

      if (!oldPhieuKho) throw new NotFoundException('Phiếu kho không tồn tại');
      for (const oldSP of oldPhieuKho.sanpham) {
        await prisma.sanpham.update({
          where: { id: oldSP.sanphamId },
          data: {
            soluongkho:
              oldPhieuKho.type === 'nhap'
                ? { decrement: Number(oldSP.soluong) || 0 }
                : { increment: Number(oldSP.soluong) || 0 },
          },
        });
      }
      const updatedPhieuKho = await prisma.phieuKho.update({
        where: { id },
        data: {
          maphieu: data.maphieu,
          ngay: new Date(data.ngay),
          type: data.type,
          khoId: data.khoId,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            deleteMany: {}, // Xóa sản phẩm cũ trước khi thêm mới
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.sanphamId,
              soluong: sp.soluong,
              sldat: sp.sldat,
              ghichu: sp.ghichu,
            })),
          },
        },
        include: { sanpham: true },
      });

      // Cập nhật tồn kho theo loại phiếu mới
      for (const newSP of data.sanpham) {
        await prisma.sanpham.update({
          where: { id: newSP.sanphamId },
          data: {
            soluongkho:
              data.type === 'nhap'
                ? { increment: newSP.soluong } // Tăng kho nếu là phiếu nhập
                : { decrement: newSP.soluong }, // Giảm kho nếu là phiếu xuất
          },
        });
      }
      return updatedPhieuKho;
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (prisma) => {
      const phieuKho = await prisma.phieuKho.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!phieuKho) {
        throw new NotFoundException('Phiếu kho không tồn tại');
      }

      // Điều chỉnh tồn kho (tonkho) ngược lại theo loại phiếu: 
      // Nếu là phiếu nhập thì giảm tồn, nếu là phiếu xuất thì tăng tồn
      for (const item of phieuKho.sanpham) {
        await prisma.tonKho.update({
          where: { sanphamId: item.sanphamId },
          data: {
            slton:
              phieuKho.type === 'nhap'
                ? { decrement: item.soluong ?? 0 }
                : { increment: item.soluong ?? 0 },
            sltontt:
              phieuKho.type === 'nhap'
                ? { decrement: item.soluong ?? 0 }
                : { increment: item.soluong ?? 0 },
          },
        });
      }

      await prisma.phieuKhoSanpham.deleteMany({ where: { phieuKhoId: id } });
      return prisma.phieuKho.delete({ where: { id } });
    });
  }

  // 🎯 NEW METHODS: Hỗ trợ workflow chốt kho với chenhlech

  /**
   * Tạo phiếu kho điều chỉnh (nhập hoặc xuất) cho chenhlech
   */
  async createAdjustmentPhieuKho(data: {
    type: 'nhap' | 'xuat';
    sanphamId: string;
    soluong: number;
    ghichu: string;
    khoId: string;
    chothkhoId?: string;
  }): Promise<{ success: boolean; phieukho?: any; message?: string }> {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        // Generate mã phiếu tự động
        const maphieu = await this.generateNextOrderCode(data.type);

        // Tạo phiếu kho
        const phieukho = await prisma.phieuKho.create({
          data: {
            maphieu,
            type: data.type,
            ngay: new Date(),
            ghichu: data.ghichu,
            khoId: data.khoId,
            isActive: true
          }
        });

        // Tạo chi tiết phiếu kho
        await prisma.phieuKhoSanpham.create({
          data: {
            phieuKhoId: phieukho.id,
            sanphamId: data.sanphamId,
            soluong: data.soluong,
            ghichu: data.ghichu
          }
        });

        // Cập nhật TonKho
        const tonkhoUpdate = data.type === 'nhap' 
          ? { 
              slton: { increment: data.soluong },
              sltontt: { increment: data.soluong }
            }
          : { 
              slton: { decrement: data.soluong },
              sltontt: { decrement: data.soluong }
            };

        await this.updateTonKhoSafely(data.sanphamId, tonkhoUpdate);

        // Note: ChotkhoDetail table removed - adjustment logging simplified
        if (data.chothkhoId) {
          console.log(`📝 Inventory adjustment logged: Product ${data.sanphamId}, Type: ${data.type}, Amount: ${data.soluong}, PhieuKho: ${maphieu}`);
        }

        return { 
          success: true, 
          phieukho,
          message: `Đã tạo phiếu ${data.type} điều chỉnh: ${maphieu}` 
        };
      });
    } catch (error) {
      console.error('Error creating adjustment phieukho:', error);
      return { 
        success: false, 
        message: error.message || 'Lỗi tạo phiếu điều chỉnh' 
      };
    }
  }

  /**
   * Helper method to safely update TonKho, creating record if not exists
   */
  private async updateTonKhoSafely(sanphamId: string, updateData: any): Promise<void> {
    try {
      // Kiểm tra TonKho có tồn tại không
      const existingTonKho = await this.prisma.tonKho.findUnique({
        where: { sanphamId }
      });

      if (existingTonKho) {
        // Update existing record
        await this.prisma.tonKho.update({
          where: { sanphamId },
          data: updateData
        });
      } else {
        // Create new record với giá trị mặc định
        const initialValue = this.calculateInitialTonKhoValue(updateData);
        await this.prisma.tonKho.create({
          data: {
            sanphamId,
            slton: initialValue.slton,
            sltontt: initialValue.slton, // Use same initial value
            slchogiao: 0,
            slchonhap: 0
          }
        });
      }
    } catch (error) {
      console.error(`Error updating TonKho for product ${sanphamId}:`, error);
      throw error;
    }
  }

  /**
   * Helper to calculate initial value for TonKho creation
   */
  private calculateInitialTonKhoValue(updateData: any): {
    slton: number;
  } {
    let slton = 0;

    if (updateData.slton) {
      if (typeof updateData.slton === 'object' && updateData.slton.increment) {
        slton = updateData.slton.increment;
      } else if (typeof updateData.slton === 'object' && updateData.slton.decrement) {
        slton = -updateData.slton.decrement;
      } else {
        slton = updateData.slton;
      }
    }

    return { slton };
  }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';
import { convertXuatnhapton } from 'src/shared/utils/xuatnhapton.utils';

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
      if (!type || !['nhap', 'xuat'].includes(type)) {
        throw new Error(`Invalid type: ${type}`);
      }

      // Lấy mã đơn hàng gần nhất theo type nhap hoặc xuat
      const lastOrder = await this.prisma.phieuKho.findFirst({
        where: { type },
        orderBy: { createdAt: 'desc' },
      });

      // Mã mặc định cho từng loại
      let nextCode = type === 'nhap' ? 'PKNAA00001' : 'PKXAA00001';

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
      return type === 'nhap' ? 'PKNAA00001' : 'PKXAA00001';
    }
  }

  private incrementOrderCode(orderCode: string, type: any): string {
    // Sử dụng prefix theo loại: PKN cho nhap, PKX cho xuat
    const prefix = type === 'nhap' ? 'PKN' : 'PKX';
    
    // Validate orderCode format
    if (!orderCode || orderCode.length < 8) {
      console.warn(`Invalid orderCode format: ${orderCode}, using default`);
      return type === 'nhap' ? 'PKNAA00001' : 'PKXAA00001';
    }
    
    // Với cấu trúc mã: prefix (3 ký tự) + 2 chữ (AA -> ZZ) + 5 số (00001 -> 99999)
    const letters = orderCode.slice(3, 5);
    const numberPart = orderCode.slice(5);
    const numbers = parseInt(numberPart, 10);

    // Validate parsed numbers
    if (isNaN(numbers) || numbers < 0) {
      console.warn(`Invalid number part in orderCode: ${orderCode}, numberPart: ${numberPart}, parsed: ${numbers}`);
      return type === 'nhap' ? 'PKNAA00001' : 'PKXAA00001';
    }

    let newLetters = letters;
    let newNumbers = numbers + 1;

    if (newNumbers > 99999) {
      newNumbers = 1; // Reset số về 00001
      newLetters = this.incrementLetters(letters);
    }

    return `${prefix}${newLetters}${newNumbers.toString().padStart(5, '0')}`;
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
      where: {},
      include: {
      sanpham: { include: { sanpham: true } },
      kho: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return phieuKhos.map((phieuKho) => ({
      ...phieuKho,
      sanpham: phieuKho.sanpham.map((item) => ({
        ...item,
        sanpham: item.sanpham,
      })),
    }));
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
    if (!data.type || !['nhap', 'xuat'].includes(data.type)) {
      throw new BadRequestException('Invalid phieukho type. Must be "nhap" or "xuat"');
    }
    
    if (!data.sanpham || !Array.isArray(data.sanpham) || data.sanpham.length === 0) {
      throw new BadRequestException('Sanpham array is required and cannot be empty');
    }

    // Validate all sanpham have required fields
    for (const sp of data.sanpham) {
      if (!sp.sanphamId || !sp.soluong) {
        throw new BadRequestException('Each sanpham must have sanphamId and soluong');
      }
    }

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
          if (soluong > 0) {
            if (data.type === 'nhap') {
              // Tăng tồn kho
              await prisma.tonKho.upsert({
                where: { sanphamId: sp.sanphamId },
                update: { slton: { increment: soluong } },
                create: { 
                  sanphamId: sp.sanphamId, 
                  slton: soluong,
                  slchogiao: 0,
                  slchonhap: 0
                }
              });
            } else if (data.type === 'xuat') {
              // Giảm tồn kho
              await prisma.tonKho.upsert({
                where: { sanphamId: sp.sanphamId },
                update: { slton: { decrement: soluong } },
                create: { 
                  sanphamId: sp.sanphamId, 
                  slton: -soluong, // Có thể âm nếu xuất trước khi nhập
                  slchogiao: 0,
                  slchonhap: 0
                }
              });
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
          ? { slton: { increment: data.soluong } }
          : { slton: { decrement: data.soluong } };

        await this.updateTonKhoSafely(data.sanphamId, tonkhoUpdate);

        // Ghi log vào chotkho nếu có chothkhoId
        if (data.chothkhoId) {
          await prisma.chotkhoDetail.create({
            data: {
              chotkhoId: data.chothkhoId,
              sanphamId: data.sanphamId,
              slthucte: 0, // Điều chỉnh không có trong Excel
              slhethong: 0, // Sẽ được cập nhật sau
              chenhlech: data.type === 'nhap' ? data.soluong : -data.soluong,
              ghichu: `Phiếu điều chỉnh: ${maphieu}`,
              phieukhoId: phieukho.id
            }
          });
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

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';
import { SocketGateway } from 'src/socket.gateway';
import { BanggiaPriceHistoryService } from './banggia-price-history.service';

@Injectable()
export class BanggiaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly _SocketGateway: SocketGateway,
    private readonly _ImportdataService: ImportdataService,
    private readonly priceHistoryService: BanggiaPriceHistoryService,
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

  async importSPBG(listBanggia: any[]) {
    try {
      console.log(`Starting import of ${listBanggia.length} price lists`);
      
      if (!listBanggia || !Array.isArray(listBanggia)) {
        throw new InternalServerErrorException('Invalid data format: listBanggia must be an array');
      }
      
      if (listBanggia.length > 200) {
        throw new InternalServerErrorException(`Data too large: ${listBanggia.length} items. Maximum recommended: 200 items per request. Please split your data into smaller batches.`);
      }

      // Basic data validation
      const invalidBanggias = listBanggia.filter((bg, index) => {
        if (!bg || typeof bg !== 'object') {
          console.warn(`Invalid banggia at index ${index}:`, bg);
          return true;
        }
        if (!bg.mabanggia || bg.mabanggia.trim() === '') {
          console.warn(`Empty mabanggia at index ${index}:`, bg);
          return true;
        }
        return false;
      });

      if (invalidBanggias.length > 0) {
        throw new InternalServerErrorException(`Found ${invalidBanggias.length} invalid banggia records. Please check your data format.`);
      }

      console.log(listBanggia[0]);
      
     const banggiagoc = listBanggia.find(bg => bg.mabanggia === 'giaban');  

        // Update giaban for each sanpham in banggiagoc with smaller batches
     if(banggiagoc && banggiagoc.sanpham && Array.isArray(banggiagoc.sanpham)){
       // Filter out invalid products first
       const validSanpham = banggiagoc.sanpham.filter((sp: any) => {
         if (!sp.masp || sp.masp.trim() === '') {
           console.warn(`Skipping product with empty masp in banggiagoc:`, sp);
           return false;
         }
         return true;
       });
       
       console.log(`Updating giaban for ${validSanpham.length} valid products`);
       
       const sanphamBatchSize = 50; // Process products in smaller batches
       for (let i = 0; i < validSanpham.length; i += sanphamBatchSize) {
         const batch = validSanpham.slice(i, i + sanphamBatchSize);
         await Promise.all(batch.map(async (sp: any) => {
           try {
             await this.prisma.sanpham.updateMany({
               where: { masp: sp.masp },
               data: { giaban: Number(sp.giaban) || 0 }
             });
           } catch (updateError) {
             console.log(`Failed to update sanpham ${sp.masp}:`, updateError);
           }
         }));
         
         // Add small delay between product batches
         if (i + sanphamBatchSize < validSanpham.length) {
           await new Promise(resolve => setTimeout(resolve, 50));
         }
       }
      }


      // Process product validation in smaller chunks to avoid memory issues
      const allProductIds = Array.from(
        new Set(
          listBanggia
            .flatMap(bg => bg?.sanpham?.map((sp: any) => sp.masp) || [])
            .filter(masp => masp && masp.trim() !== '') // Filter out empty, null, or whitespace-only IDs
        )
      );
      
      console.log(`Found ${allProductIds.length} unique product IDs to validate`);
      
      // Split product IDs into smaller chunks for database queries
      const productChunkSize = 100;
      const productMap = new Map();
      
      for (let i = 0; i < allProductIds.length; i += productChunkSize) {
        const chunk = allProductIds.slice(i, i + productChunkSize);
        const chunkProducts = await this.prisma.sanpham.findMany({
          where: { masp: { in: chunk } },
        });
        
        chunkProducts.forEach(p => productMap.set(p.masp, p));
        
        // Small delay between chunks
        if (i + productChunkSize < allProductIds.length) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }

      // Validate products exist and assign IDs, with better error handling
      for (const bg of listBanggia) {
        if (!bg.sanpham || !Array.isArray(bg.sanpham)) continue;
        
        // Filter out invalid products and log warnings
        bg.sanpham = bg.sanpham.filter((sp: any) => {
          if (!sp.masp || sp.masp.trim() === '') {
            console.warn(`Skipping product with empty masp in banggia ${bg.mabanggia}:`, sp);
            return false;
          }
          return true;
        });
        
        for (const sp of bg.sanpham) {
          if (!productMap.has(sp.masp)) {
            await this._ImportdataService.create({
              caseDetail: {
                errorMessage: `Sanpham with ID "${sp.masp}" not found in banggia "${bg.mabanggia}"`,
                errorStack: '',
                additionalInfo: 'Error during import process - product validation',
              },
              order: 1,
              createdBy: 'system',
              title: `Import Sản Phẩm Bảng giá ${new Date().toLocaleString('vi-VN')} `,
              type: 'banggia',
            });
            throw new NotFoundException(`Sanpham with ID "${sp.masp}" not found in banggia "${bg.mabanggia}"`);
          }
          sp.id = productMap.get(sp.masp)!.id;
        }
      }

      const mabanggiaList = listBanggia.map(bg => bg.mabanggia);
      console.log(`Loading existing banggias for: ${mabanggiaList.length} items`);
      
      const existingBanggias = await this.prisma.banggia.findMany({
        where: { mabanggia: { in: mabanggiaList } },
      });
      const banggiaMap = new Map(existingBanggias.map(bg => [bg.mabanggia, bg]));

      // Process in smaller batches to avoid 413 Content Too Large error
      const batchSize = 3; // Reduced batch size significantly
      console.log(`Processing ${listBanggia.length} banggias in batches of ${batchSize}`);
      
      for (let i = 0; i < listBanggia.length; i += batchSize) {
        const batch = listBanggia.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(listBanggia.length / batchSize)} (items ${i + 1}-${Math.min(i + batchSize, listBanggia.length)})`);
        
        // Process sequentially instead of parallel to reduce memory usage
        for (const bg of batch) {
          const now = new Date();
          try {
            if (banggiaMap.has(bg.mabanggia)) {
              if (!bg.batdau && !bg.ketthuc) {
                bg.batdau = new Date(now.getFullYear(), now.getMonth(), 1);
                bg.ketthuc = new Date(now.getFullYear(), now.getMonth() + 1, 0);
              }
              const existing = banggiaMap.get(bg.mabanggia)!;
              await this.update(existing.id, bg);
            } else {
              bg.batdau = bg.batdau || new Date(now.getFullYear(), now.getMonth(), 1);
              bg.ketthuc = bg.ketthuc || new Date(now.getFullYear(), now.getMonth() + 1, 0);
              await this.createBanggia(bg);
            }
          } catch (itemError) {
            console.log(`Error processing banggia ${bg.mabanggia}:`, itemError);
            // Continue with next item instead of failing entire batch
            await this._ImportdataService.create({
              caseDetail: {
                errorMessage: `Failed to process banggia ${bg.mabanggia}: ${itemError.message}`,
                errorStack: itemError.stack,
                additionalInfo: `Error processing individual banggia during batch import`,
              },
              order: 1,
              createdBy: 'system',
              title: `Import Sản Phẩm Bảng giá - Individual Error ${new Date().toLocaleString('vi-VN')}`,
              type: 'banggia',
            });
          }
        }
        
        // Add small delay between batches to reduce server load
        if (i + batchSize < listBanggia.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      console.log(`Successfully completed import of ${listBanggia.length} price lists`);
      return {};
    } catch (error) {
      console.log('Error importing san pham bang gia:', error);
      
      // Handle 413 Content Too Large error specifically
      if (error.code === 'ECONNRESET' || 
          error.message?.includes('413') || 
          error.message?.includes('Content Too Large') ||
          error.message?.includes('request entity too large') ||
          error.name === 'PayloadTooLargeError') {
        
        await this._ImportdataService.create({
          caseDetail: {
            errorMessage: `Content too large - Data contains ${listBanggia?.length || 0} price lists. Try splitting into smaller batches (max 50-100 items per request).`,
            errorStack: error.stack,
            additionalInfo: 'Error 413: Content Too Large during import process. Consider reducing batch size or splitting data.',
          },
          order: 1,
          createdBy: 'system',
          title: `Import Sản Phẩm Bảng giá (413 Error) ${new Date().toLocaleString('vi-VN')} `,
          type: 'banggia',
        });
        throw new InternalServerErrorException(`Content too large. Your data contains ${listBanggia?.length || 0} price lists. Please split into smaller batches (recommended: 50-100 items per request) and try again.`);
      }
      
      await this._ImportdataService.create({
        caseDetail: {
          errorMessage: error.message,
          errorStack: error.stack,
          additionalInfo: `Error during import process. Data size: ${listBanggia?.length || 0} items`,
        },
        order: 1,
        createdBy: 'system',
        title: `Import Sản Phẩm Bảng giá ${new Date().toLocaleString('vi-VN')} `,
        type: 'banggia',
      });
      throw new InternalServerErrorException(
        error.message || 'Error importing san pham bang gia'
      );
    }
  }

  async importBanggia(data: any) {    
    try {
      const results = await Promise.all(
      data.map(async (item: any) => {
        const existing = await this.prisma.banggia.findFirst({
        where: { mabanggia: item.mabanggia },
        });
        if (existing) {
        return await this.update(existing.id, item);
        } else {
        return await this.createBanggia(item);
        }
      })
      );
      console.log('Import results:', results);
      
      return results;
    } catch (error) {
      await this._ImportdataService.create({
          caseDetail: {
            errorMessage: error.message,
            errorStack: error.stack,
            additionalInfo: 'Error during import process',
          },
          order: 1, // cập nhật nếu cần theo thứ tự của bạn
          createdBy: 'system', // thay bằng ID người dùng thực nếu có
          title: `Import Bảng giá ${new Date().toLocaleString('vi-VN')} `,
          type: 'banggia',
        });
        
      throw new InternalServerErrorException(
      error.message || 'Error importing bang gia'
      );
    }
  }

  async importBGKH(data: any[]) {    
    try {
      // Group input records by mabanggia
      const grouped = data.reduce((acc: Record<string, any[]>, curr: any) => {
        if (!acc[curr.mabanggia]) {
          acc[curr.mabanggia] = [];
        }
        acc[curr.mabanggia].push(curr);
        return acc;
      }, {});

      const results: any[] = [];
      
      // Process in batches to avoid 413 Content Too Large error
      const batchSize = 10;
      const groupedEntries = Object.entries(grouped);
      
      for (let i = 0; i < groupedEntries.length; i += batchSize) {
        const batch = groupedEntries.slice(i, i + batchSize);
        
        await Promise.all(
          batch.map(async ([mabanggia, items]: [string, any[]]) => {
            const existingBanggia = await this.prisma.banggia.findFirst({
              where: { mabanggia },
              include: { khachhang: true },
            });
            
            if (existingBanggia) {
              // For each khachhang item, update if exists (by makh) or create new one
              for (const item of items as any[]) {
                const existingKH = existingBanggia.khachhang.find((kh: any) => kh.makh === item.makh);
                if (existingKH) {
                  await this.prisma.khachhang.update({
                    where: { id: existingKH.id },
                    data: { name: item.name, makh: item.makh },
                  });
                } else {
                  await this.prisma.banggia.update({
                    where: { id: existingBanggia.id },
                    data: {
                      khachhang: {
                        create: { name: item.name, makh: item.makh },
                      },
                    },
                    include: { khachhang: true },
                  });
                }
              }
              // Refetch the banggia with updated khachhang list
              const updated = await this.prisma.banggia.findUnique({
                where: { id: existingBanggia.id },
                include: { khachhang: true },
              });
              results.push(updated);
            } else {
              // If banggia does not exist, create it with associated khachhang records.
              const created = await this.prisma.banggia.create({
                data: {
                  mabanggia,
                  khachhang: {
                    create: items.map((item: any) => ({
                      name: item.name,
                      makh: item.makh,
                    })),
                  },
                },
                include: { khachhang: true },
              });
              results.push(created);
            }
          })
        );
      }
      
      return results;
    } catch (error) {
      console.log('Error importing bang gia khach hang:', error);
      
      // Handle 413 Content Too Large error specifically
      if (error.code === 'ECONNRESET' || error.message?.includes('413') || error.message?.includes('Content Too Large')) {
        await this._ImportdataService.create({
          caseDetail: {
            errorMessage: 'Content too large - try reducing batch size or splitting the import',
            errorStack: error.stack,
            additionalInfo: 'Error 413: Content Too Large during import process',
          },
          order: 1,
          createdBy: 'system',
          title: `Import Bảng giá khách hàng (413 Error) ${new Date().toLocaleString('vi-VN')} `,
          type: 'banggia',
        });
        throw new InternalServerErrorException('Content too large. Please reduce the amount of data and try again.');
      }
      
      await this._ImportdataService.create({
        caseDetail: {
          errorMessage: error.message,
          errorStack: error.stack,
          additionalInfo: 'Error during import process',
        },
        order: 1,
        createdBy: 'system',
        title: `Import Bảng giá khách hàng ${new Date().toLocaleString('vi-VN')} `,
        type: 'banggia',
      });
      throw new InternalServerErrorException(
        error.message || 'Error importing bang gia'
      );
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.banggia.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const result = await this.prisma.banggia.create({
        data: { ...data, order: newOrder },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error creating banggia'
      );
    }
  }

  async createBanggia(data: any) {
    try {
      this._SocketGateway.sendBanggiaUpdate();
      
      // Filter out invalid sanpham entries
      const validSanpham = data.sanpham?.filter((sp: any) => {
        return sp && sp.id && (sp.giaban !== undefined && sp.giaban !== null);
      }) || [];
      
      const result = await this.prisma.banggia.create({
        data: {
          title: data.title,
          mabanggia: data.mabanggia,
          type: data.type || 'bansi',
          status: data.status || 'baogia',
          batdau: data.batdau ? new Date(data.batdau) : null,
          ketthuc: data.ketthuc ? new Date(data.ketthuc) : null,
          isActive: data.isActive ?? false,
          sanpham: validSanpham.length > 0 ? {
            create: validSanpham.map((sp: any) => ({
              sanphamId: sp.id,
              giaban: Number(sp.giaban) || 0,
            })),
          } : undefined,
        },
        include: { sanpham: true },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error creating banggia'
      );
    }
  }

  async reorderBanggias(banggiaIds: string[]) {
    try {
      for (let i = 0; i < banggiaIds.length; i++) {
        await this.prisma.banggia.update({
          where: { id: banggiaIds[i] },
          data: { order: i + 1 },
        });
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error reordering banggias'
      );
    }
  }

  async getbgsp() {
    try {
      const banggias = await this.prisma.banggia.findMany({
        include: {
          sanpham: {
            include: { sanpham: true },
          },
        },
        orderBy: { order: 'asc' },
      });
      const result = banggias.flatMap(bg =>
        bg.sanpham.map(sp => ({
          mabanggia: bg.mabanggia,
          masp: sp.sanpham.id,
          title: sp.sanpham.title,
          giaban: Number(sp.sanpham.giaban),
        }))
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving banggias'
      );
    }
  }

  async getbgkh() {
    try {
      const banggias = await this.prisma.banggia.findMany({
        include: {
          khachhang: true,
        },
        orderBy: { order: 'asc' },
      });
      const result = banggias.flatMap(bg =>
        bg.khachhang.map(kh => ({
          mabanggia: bg.mabanggia,
          makh: kh.makh,
        }))
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving banggias'
      );
    }
  }

  async findAll() {
    try {
      const banggias = await this.prisma.banggia.findMany({
        include: {
          sanpham: true,
          khachhang: true,
        },
        orderBy: { order: 'asc' },
      });
      const result = banggias.map(bg => ({
        ...bg,
        sanpham: bg.sanpham.length,
        khachhang: bg.khachhang.length,
        ListKH: bg.khachhang.map(kh => ({
          makh: kh.makh,
          name: kh.name,
        })),
      }));
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving banggias'
      );
    }
  }

  async findOne(id: string) {
    try {
      const banggia = await this.prisma.banggia.findUnique({
        where: { id },
        include: {
          sanpham: { include: { sanpham: true } },
          khachhang: true,
        },
      });
      if (!banggia) {
        throw new NotFoundException(`Banggia with ID "${id}" not found`);
      }
      const result = {
        ...banggia,
        sanpham: banggia.sanpham.map(item => ({
          ...item.sanpham,
          giaban: Number(item.giaban),
        })),
      };
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error retrieving banggia'
      );
    }
  }

  async update(id: string, data: any) {
    try {
      const existingBanggia = await this.prisma.banggia.findUnique({ 
        where: { id },
        include: { sanpham: true }
      });
      if (!existingBanggia) {
        throw new NotFoundException(`Banggia with ID "${id}" not found`);
      }
      
      this._SocketGateway.sendBanggiaUpdate();
      
      // ✅ Handle price updates with audit trail
      if (data.sanpham && Array.isArray(data.sanpham)) {
        const validSanpham = data.sanpham.filter((sp: any) => sp.sanphamId || sp.id);
        
        // Track price changes for each product
        for (const sp of validSanpham) {
          const sanphamId = sp.sanphamId || sp.id;
          const newPrice = Number(sp.giaban) || 0;
          
          // Find existing price
          const existingPrice = existingBanggia.sanpham.find(
            item => item.sanphamId === sanphamId
          );
          
          if (existingPrice && Number(existingPrice.giaban) !== newPrice) {
            // Price changed - use audit service
            await this.priceHistoryService.updatePrice({
              banggiaId: id,
              sanphamId,
              newPrice,
              userId: data.userId || 'system',
              reason: `Price updated via banggia update`
            });
          } else if (!existingPrice) {
            // New product in banggia - create with audit
            await this.priceHistoryService.updatePrice({
              banggiaId: id,
              sanphamId,
              newPrice,
              userId: data.userId || 'system',
              reason: `Product added to banggia`
            });
          }
          // If price unchanged, skip (no audit needed)
        }
      }
      
      const result = await this.prisma.banggia.update({
        where: { id },
        data: {
          title: data.title,
          isActive: data.isActive,
          type: data.type || 'bansi',
          status: data.status || 'baogia',
          batdau: data.batdau ? new Date(data.batdau) : null,
          ketthuc: data.ketthuc ? new Date(data.ketthuc) : null,
          sanpham:
            data.sanpham && Array.isArray(data.sanpham)
              ? {
                  deleteMany: {},
                  create: data.sanpham
                    .filter((sp: any) => sp.sanphamId || sp.id)
                    .map((sp: any) => ({
                      sanphamId: sp.sanphamId || sp.id,
                      giaban: Number(sp.giaban) || 0,
                    })),
                }
              : undefined,
        },
        include: { sanpham: true },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error updating banggia'
      );
    }
  }

  /**
   * Delete banggia with all related records using transaction
   * This method handles cascading delete properly to avoid foreign key violations
   */
  async remove(id: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1. Disconnect khách hàng (many-to-many relationship)
        await tx.banggia.update({
          where: { id },
          data: { khachhang: { set: [] } }
        });

        // 2. Delete all Banggiasanpham records
        await tx.banggiasanpham.deleteMany({
          where: { banggiaId: id }
        });

        // 3. Delete the banggia
        const deletedBanggia = await tx.banggia.delete({ where: { id } });

        // 4. Send socket update
        this._SocketGateway.sendBanggiaUpdate();

        return deletedBanggia;
      });
    } catch (error) {
      console.error('Error removing banggia:', error);
      throw new InternalServerErrorException(
        error.message || 'Error removing banggia'
      );
    }
  }

  /**
   * Bulk delete banggia with all related records using transaction
   * @param ids Array of banggia IDs to delete
   * @returns Object with success count and failed count
   */
  async removeBulk(ids: string[]) {
    let successCount = 0;
    let failCount = 0;
    const errors: any[] = [];

    for (const id of ids) {
      try {
        await this.remove(id);
        successCount++;
      } catch (error) {
        console.error(`Error deleting banggia ${id}:`, error);
        failCount++;
        errors.push({ id, error: error.message });
      }
    }

    // Send socket update once after all deletions
    if (successCount > 0) {
      this._SocketGateway.sendBanggiaUpdate();
    }

    return {
      success: successCount,
      fail: failCount,
      errors,
      message: `Deleted ${successCount} banggia successfully${failCount > 0 ? `, ${failCount} failed` : ''}`
    };
  }

  async addKHtoBG(banggiaId: string, khachhangIds: any[]) {
    try {
      const result = await this.prisma.banggia.update({
        where: { id: banggiaId },
        data: {
          khachhang: {
            connect: khachhangIds.map(id => ({ id })),
          },
        },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error adding KH to BG'
      );
    }
  }

  async removeKHfromBG(banggiaId: string, khachhangIds: any[]) {
    try {
      const result = await this.prisma.banggia.update({
        where: { id: banggiaId },
        data: {
          khachhang: {
            disconnect: khachhangIds.map(id => ({ id })),
          },
        },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error removing KH from BG'
      );
    }
  }

  /**
   * ✅ Get price history for a product in a banggia
   */
  async getPriceHistory(banggiaId: string, sanphamId: string) {
    try {
      return await this.priceHistoryService.getPriceHistory(banggiaId, sanphamId);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error getting price history'
      );
    }
  }

  /**
   * ✅ Get current price for a product in a banggia
   */
  async getCurrentPrice(banggiaId: string, sanphamId: string) {
    try {
      return await this.priceHistoryService.getCurrentPrice(banggiaId, sanphamId);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error getting current price'
      );
    }
  }

  /**
   * ✅ Bulk update prices with audit trail
   */
  async bulkUpdatePrices(updates: Array<{
    banggiaId: string;
    sanphamId: string;
    newPrice: number;
    reason?: string;
  }>, userId: string) {
    try {
      return await this.priceHistoryService.bulkUpdatePrices(updates, userId);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error bulk updating prices'
      );
    }
  }
}

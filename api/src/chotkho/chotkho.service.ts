import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as moment from 'moment-timezone';

@Injectable()
export class ChotkhoService {
  constructor(private readonly prisma: PrismaService) {}

  async getLastUpdatedChotkho(): Promise<{ updatedAt: number }> {
    try {
      const item = await this.prisma.chotkho.findFirst({
        orderBy: { updatedAt: 'desc' },
      });
      return { updatedAt: item ? item.updatedAt.getTime() : 0 };
    } catch (error) {
      console.log('Error getting last updated chotkho:', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const timestamp = moment().format('YYYYMMDDHHmmss');
      const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `CK-${timestamp}-${randomPart}`;
    } catch (error) {
      console.log('Error generating codeId:', error);
      throw error;
    }
  } 



  async create(data: any) {    
    try {
      // Handle both single object and array of objects
      const dataArray = Array.isArray(data) ? data : [data];
      
      return await this.prisma.$transaction(async (prisma) => {
        // Initialize result tracking
        const result = {
          status: 'success',
          created: 0,
          updated: 0,
          failed: 0,
          errors: [] as any[],
          data: [] as any[],
          summary: {
            totalProcessed: dataArray.length,
            phieukhoCreated: 0,
            tonkhoUpdated: 0,
          }
        };

        try {
          // Pre-fetch required data in batch
          const sanphamIds = dataArray
            .filter(item => item.sanphamId)
            .map(item => item.sanphamId);
          
          const tonkhoMap = new Map();
          if (sanphamIds.length > 0) {
            const tonkhos = await prisma.tonKho.findMany({
              where: { sanphamId: { in: sanphamIds } },
              select: { sanphamId: true, slton: true }
            });
            tonkhos.forEach(tk => tonkhoMap.set(tk.sanphamId, tk.slton));
          }

          // Get max order once
          const maxOrder = await prisma.chotkho.aggregate({
            _max: { order: true },
          });
          let currentOrder = (maxOrder._max?.order || 0);

          // Generate all codeIds upfront
          const codeIds = await Promise.all(
            dataArray.map(() => this.generateCodeId())
          );

          // Check for existing records by date and sanphamId
          const existingRecordsMap = new Map();
          for (const item of dataArray) {
            if (item.sanphamId && item.ngay) {
              const startOfDay = moment(item.ngay).startOf('day').toDate();
              const endOfDay = moment(item.ngay).endOf('day').toDate();
              
              const existing = await prisma.chotkho.findFirst({
                where: {
                  sanphamId: item.sanphamId,
                  ngay: {
                    gte: startOfDay,
                    lte: endOfDay
                  }
                }
              });
              
              if (existing) {
                existingRecordsMap.set(`${item.sanphamId}-${moment(item.ngay).format('YYYY-MM-DD')}`, existing);
              }
            }
          }

          // Prepare bulk data
          const chotkhoCreateData:any = [];
          const chotkhoUpdateData:any = [];
          const phieukhoCreateData:any = [];
          const tonkhoUpdates: Array<{ sanphamId: string; newSlton: number }> = [];

          for (let i = 0; i < dataArray.length; i++) {
            try {
              const item = dataArray[i];
              const {sanphamId, tonkhoId, phieukhoId, ngay, slthucte, slhethong, chenhlech, ghichu, title} = item;
              
              const dateKey = `${sanphamId}-${moment(ngay).format('YYYY-MM-DD')}`;
              const existingRecord = existingRecordsMap.get(dateKey);

              // Use provided slhethong or get from cached TonKho
              let finalSlhethong = slhethong !== undefined ? Number(slhethong) : 0;
              if (finalSlhethong === 0 && sanphamId) {
                finalSlhethong = Number(tonkhoMap.get(sanphamId) || 0);
              }

              const finalSlthucte = Number(slthucte || 0);
              const finalChenhlech = chenhlech !== undefined ? Number(chenhlech) : (finalSlthucte - finalSlhethong);

              if (existingRecord) {
                // Update existing record
                chotkhoUpdateData.push({
                  id: existingRecord.id,
                  data: {
                    slthucte: finalSlthucte,
                    slhethong: finalSlhethong,
                    chenhlech: finalChenhlech,
                    ghichu: ghichu || existingRecord.ghichu,
                    title: title || existingRecord.title,
                    updatedAt: new Date(),
                  }
                });
              } else {
                // Create new record
                currentOrder++;
                const codeId = codeIds[i];

                const chotkhoData = {
                  sanphamId,
                  tonkhoId,
                  phieukhoId,
                  ngay: ngay ? moment(ngay).startOf('day').toDate() : moment().startOf('day').toDate(),
                  slthucte: finalSlthucte,
                  slhethong: finalSlhethong,
                  chenhlech: finalChenhlech,
                  ghichu,
                  title,
                  order: currentOrder,
                  codeId: codeId,
                  userId: item.userId,
                  khoId: item.khoId,
                  isActive: item.isActive !== undefined ? item.isActive : true,
                };

                chotkhoCreateData.push(chotkhoData);
              }

              // Prepare phieukho data if needed (for both create and update)
              if (finalChenhlech !== 0 && sanphamId) {
                const codeId = existingRecord ? existingRecord.codeId : codeIds[i];
                phieukhoCreateData.push({
                  chotkhoIndex: i,
                  isUpdate: !!existingRecord,
                  chotkhoId: existingRecord?.id,
                  data: {
                    title: `Điều chỉnh tồn kho - ${codeId}`,
                    maphieu: `DC-${codeId}`,
                    ngay: ngay ? moment(ngay).startOf('day').toDate() : moment().startOf('day').toDate(),
                    type: finalChenhlech > 0 ? 'nhap' : 'xuat',
                    isChotkho: true,
                    khoId: item.khoId || '4cc01811-61f5-4bdc-83de-a493764e9258',
                    ghichu: `Điều chỉnh theo chốt kho ${codeId}. Chênh lệch: ${finalChenhlech}`,
                    isActive: true,
                  },
                  sanphamData: {
                    sanphamId: sanphamId,
                    soluong: Math.abs(finalChenhlech),
                    ghichu: `Điều chỉnh chốt kho ${codeId}`,
                  }
                });

                tonkhoUpdates.push({
                  sanphamId,
                  newSlton: finalSlthucte
                });
              }
            } catch (itemError) {
              result.failed++;
              result.errors.push({
                index: i,
                item: dataArray[i],
                error: itemError.message || 'Unknown error processing item',
              });
            }
          }

          // Bulk create new chotkho records
          if (chotkhoCreateData.length > 0) {
            try {
              await prisma.chotkho.createMany({
                data: chotkhoCreateData,
              });
              result.created = chotkhoCreateData.length;
            } catch (createError) {
              result.errors.push({
                operation: 'bulk create',
                error: createError.message || 'Failed to bulk create chotkho records',
              });
              result.failed += chotkhoCreateData.length;
            }
          }

          // Bulk update existing chotkho records
          if (chotkhoUpdateData.length > 0) {
            try {
              const updatePromises = chotkhoUpdateData.map((update: any) => 
                prisma.chotkho.update({
                  where: { id: update.id },
                  data: update.data,
                })
              );
              await Promise.all(updatePromises);
              result.updated = chotkhoUpdateData.length;
            } catch (updateError) {
              result.errors.push({
                operation: 'bulk update',
                error: updateError.message || 'Failed to bulk update chotkho records',
              });
              result.failed += chotkhoUpdateData.length;
            }
          }

          // Get all affected records (created + updated)
          const allCodeIds = [...codeIds, ...Array.from(existingRecordsMap.values()).map(r => r.codeId)];
          const allRecords = await prisma.chotkho.findMany({
            where: {
              codeId: { in: allCodeIds }
            },
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  profile: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              kho: true,
              sanpham: true,
              tonkho: true,
            },
            orderBy: { order: 'asc' }
          });

          result.data = allRecords;

          // Create phieukho records if needed
          if (phieukhoCreateData.length > 0) {
            try {
              // Batch create phieukho records
              const phieukhoPromises = phieukhoCreateData.map(async (phieuData: any) => {
                const phieukho = await prisma.phieuKho.create({
                  data: {
                    ...phieuData.data,
                    sanpham: {
                      create: [phieuData.sanphamData],
                    },
                  },
                });
                return { 
                  phieukho, 
                  chotkhoIndex: phieuData.chotkhoIndex,
                  isUpdate: phieuData.isUpdate,
                  chotkhoId: phieuData.chotkhoId
                };
              });

              const phieukhoResults = await Promise.all(phieukhoPromises);
              result.summary.phieukhoCreated = phieukhoResults.length;

              // Batch update chotkho with phieukhoId
              const chotkhoUpdatePromises = phieukhoResults.map(({ phieukho, chotkhoIndex, isUpdate, chotkhoId }) => {
                if (isUpdate && chotkhoId) {
                  return prisma.chotkho.update({
                    where: { id: chotkhoId },
                    data: { phieukhoId: phieukho.id },
                  });
                } else {
                  const chotkhoRecord = allRecords.find(r => r.codeId === codeIds[chotkhoIndex]);
                  if (chotkhoRecord) {
                    return prisma.chotkho.update({
                      where: { id: chotkhoRecord.id },
                      data: { phieukhoId: phieukho.id },
                    });
                  }
                }
              }).filter(Boolean);

              await Promise.all(chotkhoUpdatePromises);

              // Bulk update tonkho
              await Promise.all(
                tonkhoUpdates.map((update: { sanphamId: string; newSlton: number }) =>
                  prisma.tonKho.update({
                    where: { sanphamId: update.sanphamId },
                    data: { slton: update.newSlton },
                  })
                )
              );
              result.summary.tonkhoUpdated = tonkhoUpdates.length;
            } catch (phieukhoError) {
              result.errors.push({
                operation: 'phieukho/tonkho update',
                error: phieukhoError.message || 'Failed to create phieukho or update tonkho',
              });
            }
          }

          // Set final status
          if (result.failed > 0) {
            result.status = 'partial';
          }
          
          if (result.created === 0 && result.updated === 0) {
            result.status = 'failed';
          }

          return result;
        } catch (transactionError) {
          result.status = 'failed';
          result.errors.push({
            operation: 'transaction',
            error: transactionError.message || 'Transaction failed',
          });
          return result;
        }
      }, {
        maxWait: 20000, // 20 seconds max wait time
        timeout: 30000, // 30 seconds timeout
      });
    } catch (error) {
      console.log('Error creating chotkho:', error);
      return {
        status: 'failed',
        created: 0,
        updated: 0,
        failed: 0,
        errors: [{
          operation: 'main',
          error: error.message || 'Unknown error',
        }],
        data: [],
        summary: {
          totalProcessed: 0,
          phieukhoCreated: 0,
          tonkhoUpdated: 0,
        }
      };
    }
  }
  




  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ngay, ...restWhere } = param;

      // Handle date filtering
      const where: any = { ...restWhere };
      if (ngay) {
        const dateStart = moment(ngay).startOf('day').toDate();
        const dateEnd = moment(ngay).endOf('day').toDate();
        where.ngay = {
          gte: dateStart,
          lte: dateEnd
        };
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.chotkho.findMany({
          where,
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            sanpham: true,
            tonkho: true,
          },
          orderBy: { order: 'asc' },
        }),
        this.prisma.chotkho.count({ where }),
      ]);

      // Transform data to match the desired format
      const transformedData = data.map(item => ({
        sanphamId: item.sanphamId,
        masp: item.sanpham?.masp || '',
        tonkhoId: item.tonkhoId,
        phieukhoId: item.phieukhoId,
        ngay: item.ngay,
        slthucte: Number(item.slthucte),
        slhethong: Number(item.slhethong),
        chenhlech: Number(item.chenhlech),
        ghichu: item.ghichu || '',
        title: item.title || '',
        dvt: item.sanpham?.dvt || '',
        sanpham: item.sanpham ? {
          id: item.sanpham.id,
          masp: item.sanpham.masp,
          title: item.sanpham.title,
          dvt: item.sanpham.dvt
        } : undefined
      }));

      return {
        data: transformedData,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      console.log('Error finding chotkho by param:', error);
      throw error;
    }
  }

  async tonkhobylist(param: any) {
    try {
      const result = await this.prisma.tonKho.findMany({
        where: {
          sanpham: {
            masp: { in: param },
          },
        },
        include: {
          sanpham: true,
        },
      });
      return result;
    } catch (error) {
      console.log('Error finding chotkho by maspList:', error);
      throw error;
    }
  }

  async findAll(query: any) {
    try {
      const {
        page = 1,
        pageSize = 20,
        search = '',
        trangThai = '',
        tuNgay = '',
        denNgay = '',
        ...filters
      } = query;

      const pageNum = parseInt(page.toString(), 10);
      const limitNum = parseInt(pageSize.toString(), 10);
      const skip = (pageNum - 1) * limitNum;

      const where: any = { ...filters };

      // Search filter
      if (search) {
        where.OR = [
          { maChotKho: { contains: search, mode: 'insensitive' } },
          { tenChotKho: { contains: search, mode: 'insensitive' } },
          { ghichu: { contains: search, mode: 'insensitive' } },
          { codeId: { contains: search, mode: 'insensitive' } },
        ];
      }

      // Status filter
      if (trangThai) {
        where.trangThai = trangThai;
      }

      // Date range filter
      if (tuNgay || denNgay) {
        where.AND = where.AND || [];

        if (tuNgay) {
          where.AND.push({
            tuNgay: {
              gte: moment(tuNgay).startOf('day').toDate(),
            },
          });
        }

        if (denNgay) {
          where.AND.push({
            denNgay: {
              lte: moment(denNgay).endOf('day').toDate(),
            },
          });
        }
      }

      const [data, total] = await Promise.all([
        this.prisma.chotkho.findMany({
          where,
          skip,
          take: limitNum,
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.chotkho.count({ where }),
      ]);

      return {
        data,
        total,
        page: pageNum,
        limit: limitNum,
        pageCount: Math.ceil(total / limitNum),
      };
    } catch (error) {
      console.log('Error finding all chotkho:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.chotkho.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      if (!item) throw new NotFoundException('Chotkho not found');
      return item;
    } catch (error) {
      console.log('Error finding chotkho:', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const updated = await this.prisma.chotkho.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return updated;
    } catch (error) {
      console.log('Error updating chotkho:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.chotkho.delete({ where: { id } });
      return deleted;
    } catch (error) {
      console.log('Error removing chotkho:', error);
      throw error;
    }
  }

  async findByDateRange(startDate: string, endDate?: string, page?: number, limit?: number) {
    try {
      // Parse the date and create date range
      const start = moment(startDate).startOf('day').toDate();
      const end = endDate 
        ? moment(endDate).endOf('day').toDate() 
        : moment(startDate).endOf('day').toDate();

      const where = {
        ngay: {
          gte: start,
          lte: end,
        },
      };

      // If page and limit are provided, paginate
      if (page && limit) {
        const skip = (page - 1) * limit;
        
        const [allRecords, total] = await Promise.all([
          this.prisma.chotkho.findMany({
            where,
            skip,
            take: limit,
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  profile: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              kho: true,
              sanpham: true,
              tonkho: true,
              phieukho: true,
            },
            orderBy: { createdAt: 'desc' },
          }),
          this.prisma.chotkho.count({ where }),
        ]);

        // Group by date and sanphamId to get unique records
        const uniqueRecordsMap = new Map();
        allRecords.forEach(record => {
          const dateKey = moment(record.ngay).format('YYYY-MM-DD');          
          // Keep the latest record for each date-sanpham combination
          if (!uniqueRecordsMap.has(dateKey) || 
              record.updatedAt > uniqueRecordsMap.get(dateKey).updatedAt) {
            uniqueRecordsMap.set(dateKey, record);
          }
        });

        const data = Array.from(uniqueRecordsMap.values()).map(record => ({
          id: record.id,
          title: record.title || record.sanpham?.title || '',
          ngay: record.ngay,
        }));
        
        return {
          data,
          total: data.length,
          page,
          limit,
          pageCount: Math.ceil(data.length / limit),
          dateRange: {
            start,
            end,
          },
        };
      }

      // If no pagination, get all records
      const allRecords = await this.prisma.chotkho.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: {
                  name: true,
                },
              },
            },
          },
          kho: true,
          sanpham: true,
          tonkho: true,
          phieukho: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      // Group by date and sanphamId to get unique records
      const uniqueRecordsMap = new Map();
      allRecords.forEach(record => {
        const dateKey = moment(record.ngay).format('YYYY-MM-DD');
        const key = `${dateKey}-${record.sanphamId}`;
        
        // Keep the latest record for each date-sanpham combination
        if (!uniqueRecordsMap.has(key) || 
            record.updatedAt > uniqueRecordsMap.get(key).updatedAt) {
          uniqueRecordsMap.set(key, record);
        }
      });

      const data = Array.from(uniqueRecordsMap.values());

      return {
        data,
        total: data.length,
        dateRange: {
          start,
          end,
        },
      };
    } catch (error) {
      console.log('Error finding chotkho by date range:', error);
      throw error;
    }
  }

  async generateReport(query: any) {
    try {
      const {
        startDate,
        endDate,
        format = 'json',
        khoId = '',
        sanphamId = '',
      } = query;

      const where: any = {};

      // Date range filter
      if (startDate || endDate) {
        where.ngay = {};

        if (startDate) {
          where.ngay.gte = moment(startDate).startOf('day').toDate();
        }

        if (endDate) {
          where.ngay.lte = moment(endDate).endOf('day').toDate();
        }
      }

      // Kho filter
      if (khoId) {
        where.khoId = khoId;
      }

      // Sanpham filter
      if (sanphamId) {
        where.sanphamId = sanphamId;
      }

      const chotkhoRecords = await this.prisma.chotkho.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: {
                  name: true,
                },
              },
            },
          },
          kho: true,
          sanpham: true,
          tonkho: true,
          phieukho: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      // Calculate summary statistics
      const summary = {
        totalRecords: chotkhoRecords.length,
        totalChenhLech: chotkhoRecords.reduce(
          (sum, ck) => sum + Number(ck.chenhlech || 0),
          0,
        ),
        totalSlThucTe: chotkhoRecords.reduce(
          (sum, ck) => sum + Number(ck.slthucte || 0),
          0,
        ),
        totalSlHeThong: chotkhoRecords.reduce(
          (sum, ck) => sum + Number(ck.slhethong || 0),
          0,
        ),
        dateRange: {
          start: startDate,
          end: endDate,
        },
        filters: {
          khoId,
          sanphamId,
        },
      };

      // Group by kho for insights
      const khoStats = chotkhoRecords.reduce((acc, ck) => {
        const khoName = ck.kho?.name || 'Unknown';
        if (!acc[khoName]) {
          acc[khoName] = {
            count: 0,
            totalChenhLech: 0,
            totalSlThucTe: 0,
            totalSlHeThong: 0,
          };
        }
        acc[khoName].count += 1;
        acc[khoName].totalChenhLech += Number(ck.chenhlech || 0);
        acc[khoName].totalSlThucTe += Number(ck.slthucte || 0);
        acc[khoName].totalSlHeThong += Number(ck.slhethong || 0);
        return acc;
      }, {});

      const reportData = {
        summary,
        khoStats,
        records: chotkhoRecords,
        generatedAt: new Date(),
        generatedBy: 'system',
      };

      if (format === 'excel') {
        return {
          ...reportData,
          format: 'excel',
          downloadUrl: '/api/chotkho/report/download',
        };
      }

      return reportData;
    } catch (error) {
      console.log('Error generating report:', error);
      throw error;
    }
  }

  async reorderChotkhos(chotkhoIds: string[]) {
    try {
      for (let i = 0; i < chotkhoIds.length; i++) {
        await this.prisma.chotkho.update({
          where: { id: chotkhoIds[i] },
          data: { order: i + 1 },
        });
      }
      return {
        status: 'success',
        message: 'Chotkho records reordered successfully',
      };
    } catch (error) {
      console.log('Error reordering chotkho:', error);
      throw error;
    }
  }

  async getStatistics() {
    try {
      const [total, activeCount, inactiveCount] = await Promise.all([
        this.prisma.chotkho.count(),
        this.prisma.chotkho.count({ where: { isActive: true } }),
        this.prisma.chotkho.count({ where: { isActive: false } }),
      ]);

      const avgChenhLech = await this.prisma.chotkho.aggregate({
        _avg: { chenhlech: true },
      });

      return {
        total,
        active: activeCount,
        inactive: inactiveCount,
        averageChenhLech: avgChenhLech._avg.chenhlech || 0,
      };
    } catch (error) {
      console.log('Error getting statistics:', error);
      throw error;
    }
  }

  async bulkUpdateActive(ids: string[], isActive: boolean) {
    try {
      const updated = await this.prisma.chotkho.updateMany({
        where: { id: { in: ids } },
        data: {
          isActive,
          updatedAt: new Date(),
        },
      });

      return {
        status: 'success',
        message: `Updated ${updated.count} chotkho records`,
        count: updated.count,
      };
    } catch (error) {
      console.log('Error bulk updating chotkho active status:', error);
      throw error;
    }
  }

  async bulkCreateChotkho(dataList: any[]) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const results: any = [];

        for (const data of dataList) {
          // Lấy số lượng từ TonKho để làm slhethong
          let slhethong = 0;
          if (data.sanphamId) {
            const tonkho = await prisma.tonKho.findUnique({
              where: { sanphamId: data.sanphamId },
            });
            slhethong = Number(tonkho?.slton || 0);
          }

          // Tính chênh lệch
          const slthucte = Number(data.slthucte || 0);
          const chenhlech = slthucte - slhethong;

          const maxOrder = await prisma.chotkho.aggregate({
            _max: { order: true },
          });
          const newOrder = (maxOrder._max?.order || 0) + 1;
          const codeId = await this.generateCodeId();

          const created = await prisma.chotkho.create({
            data: {
              ...data,
              order: newOrder,
              codeId: codeId,
              slhethong: slhethong,
              slthucte: slthucte,
              chenhlech: chenhlech,
            },
            include: {
              kho: true,
              sanpham: true,
              tonkho: true,
            },
          });

          // Nếu có chênh lệch, tạo PhieuKho và cập nhật TonKho
          if (chenhlech !== 0 && data.sanphamId) {
            const phieuKhoData = {
              title: `Điều chỉnh tồn kho - ${created.codeId}`,
              maphieu: `DC-${created.codeId}`,
              ngay: new Date(data.ngay || new Date()),
              type: chenhlech > 0 ? 'nhap' : 'xuat',
              isChotkho: true,
              khoId: data.khoId || '4cc01811-61f5-4bdc-83de-a493764e9258',
              ghichu: `Điều chỉnh theo chốt kho ${created.codeId}. Chênh lệch: ${chenhlech}`,
              isActive: true,
              sanpham: {
                create: [
                  {
                    sanphamId: data.sanphamId,
                    soluong: Math.abs(chenhlech),
                    ghichu: `Điều chỉnh chốt kho ${created.codeId}`,
                  },
                ],
              },
            };

            const phieukho = await prisma.phieuKho.create({
              data: phieuKhoData,
              include: { sanpham: true },
            });

            // Cập nhật liên kết với PhieuKho
            await prisma.chotkho.update({
              where: { id: created.id },
              data: { phieukhoId: phieukho.id },
            });

            // Cập nhật TonKho.slton
            await prisma.tonKho.update({
              where: { sanphamId: data.sanphamId },
              data: {
                slton: slthucte, // Cập nhật số lượng tồn kho theo số thực tế
              },
            });
          }

          results.push(created);
        }

        return {
          status: 'success',
          message: `Created ${results.length} chotkho records`,
          data: results,
        };
      });
    } catch (error) {
      console.log('Error bulk creating chotkho:', error);
      throw error;
    }
  }
  async findBySanpham(sanphamId: string, page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;

      const where = { sanphamId };

      const [data, total] = await Promise.all([
        this.prisma.chotkho.findMany({
          where,
          skip,
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            kho: true,
            sanpham: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.chotkho.count({ where }),
      ]);

      return {
        data,
        total,
        page,
        limit,
        pageCount: Math.ceil(total / limit),
        sanphamId,
      };
    } catch (error) {
      console.log('Error finding chotkho by sanpham:', error);
      throw error;
    }
  }

  async findByKho(khoId: string, page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;

      const where = { khoId };

      const [data, total] = await Promise.all([
        this.prisma.chotkho.findMany({
          where,
          skip,
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            kho: true,
            sanpham: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.chotkho.count({ where }),
      ]);

      return {
        data,
        total,
        page,
        limit,
        pageCount: Math.ceil(total / limit),
        khoId,
      };
    } catch (error) {
      console.log('Error finding chotkho by kho:', error);
      throw error;
    }
  }
}

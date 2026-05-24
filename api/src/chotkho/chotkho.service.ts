import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ChotkhoService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) { }
  /**
   * 🎯 TRACE LOG LOGIC: Tính toán tồn kho dựa trên phiên chốt kho gần nhất và các giao dịch phát sinh
   */
  async calculateStockFromLogs(sanphamId: string, khoId: string, endTime: Date = new Date(), tx?: any) {
    const prisma = tx || this.prisma;
    
    // 1. Tìm phiên chốt kho gần nhất của sản phẩm này
    const lastChot = await this.prisma.chotkhodetail.findFirst({
      where: {
        sanphamId,
        chotkho: {
          khoId,
          isActive: true,
          ngaychot: { lt: endTime }
        }
      },
      orderBy: { ngaychot: 'desc' },
      include: { chotkho: true }
    });

    const startTime = lastChot ? lastChot.ngaychot : new Date(0);
    const initialQty = lastChot ? Number(lastChot.sltonthucte) : 0;

    const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
    const isMainWarehouse = khoId === KHO_TONG_ID;

    // 2. Lấy tất cả các phiếu xuất (Donhangsanpham)
    const xuat = await prisma.donhangsanpham.findMany({
      where: {
        idSP: sanphamId,
        donhang: {
          ...(isMainWarehouse ? {} : { khoId: khoId }), // Nếu là kho tổng, lấy tất cả biến động
          status: { in: ['dagiao', 'danhan', 'hoanthanh'] },
          updatedAt: { gt: startTime, lte: endTime }
        }
      },
      include: { donhang: true }
    });

    // 3. Lấy tất cả các phiếu nhập (Dathangsanpham)
    const nhap = await prisma.dathangsanpham.findMany({
      where: {
        idSP: sanphamId,
        dathang: {
          ...(isMainWarehouse ? {} : { khoId: khoId }), // Nếu là kho tổng, lấy tất cả biến động
          status: 'danhan',
          updatedAt: { gt: startTime, lte: endTime }
        }
      },
      include: { dathang: true }
    });

    // 4. Tổng hợp sự kiện
    const events = [
      ...xuat.map(x => ({
        type: 'XUẤT',
        qty: Number(x.slnhan || x.slgiao || x.sldat),
        time: x.donhang.updatedAt,
        code: x.donhang.madonhang,
        note: 'Đơn hàng'
      })),
      ...nhap.map(n => ({
        type: 'NHẬP',
        qty: Number(n.slnhan || n.slgiao),
        time: n.dathang.updatedAt,
        code: n.dathang.madncc,
        note: 'Nhập kho'
      }))
    ].sort((a, b) => a.time.getTime() - b.time.getTime());

    let currentCalc = initialQty;
    const history = events.map(e => {
      if (e.type === 'XUẤT') currentCalc -= e.qty;
      else currentCalc += e.qty;
      return { ...e, balance: currentCalc };
    });

    return {
      initialQty,
      lastClosingDate: startTime,
      currentCalc,
      history
    };
  }

  /**
   * API lấy Trace Log cho một sản phẩm trong một phiên chốt kho cụ thể
   */
  async getTraceLog(chotkhoId: string, sanphamId: string) {
    const chotkho = await this.prisma.chotkho.findUnique({
      where: { id: chotkhoId }
    });

    if (!chotkho) throw new Error('Không tìm thấy phiên chốt kho');
    if (!chotkho.khoId) throw new Error('Phiên chốt kho không có thông tin khoId');

    return await this.calculateStockFromLogs(sanphamId, chotkho.khoId, chotkho.ngaychot);
  }

  /**
   * 🎯 NEW: Lấy danh sách các đơn hàng chưa nhận (Dadat) để hỗ trợ chốt kho nhanh
   */
  async getPendingOrders(khoId: string) {
    return await this.prisma.dathang.findMany({
      where: {
        khoId: khoId,
        status: 'dadat'
      },
      include: {
        sanpham: {
          include: {
            sanpham: true
          }
        },
        nhacungcap: true
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  /**
   * 🎯 CREATE METHOD: Tạo chốt kho với master-detail structure
   * Master: Chotkho (ngaychot, title, ghichu, khoId, userId)
   * Details: Chotkhodetail (sanphamId, sltonhethong, sltonthucte, slhuy, chenhlech)
   */
  async create(inventoryData: {
    ngaychot?: Date;
    title?: string;
    ghichu?: string;
    khoId: string;
    userId?: string;
    confirmOrderIds?: string[]; // 🎯 Bổ sung: Danh sách ID đơn hàng cần xác nhận "Đã nhận" ngay lúc chốt
    details: Array<{
      sanphamId: string;
      sltonhethong: number;
      sltonthucte: number;
      slhuy: number;
      ghichu?: string;
    }>;
  }) {
    try {
      const transactionResult = await this.prisma.$transaction(async (prisma) => {
        const { ngaychot, title, ghichu, khoId, userId, details: inputDetails, confirmOrderIds } = inventoryData;

        const details = inputDetails;

        // 🎯 XỬ LÝ XÁC NHẬN ĐƠN HÀNG "QUÊN" CHƯA NHẬP (Implicit Reception)
        if (confirmOrderIds && confirmOrderIds.length > 0) {
          console.log(`📝 Processing auto-reception for ${confirmOrderIds.length} orders...`);
          for (const orderId of confirmOrderIds) {
            const order = await prisma.dathang.findUnique({
              where: { id: orderId },
              include: { sanpham: true }
            });

            if (order && order.status !== 'danhan') {
              // 1. Cập nhật trạng thái đơn hàng
              await prisma.dathang.update({
                where: { id: orderId },
                data: { 
                  status: 'danhan',
                  updatedAt: new Date(),
                  sanpham: {
                    updateMany: order.sanpham.map(sp => ({
                      where: { id: sp.id },
                      data: { slnhan: sp.slgiao || sp.sldat } // Mặc định nhận đủ nếu xác nhận nhanh
                    }))
                  }
                }
              });

              // 2. Tạo phiếu nhập kho (Audit trail)
              await prisma.phieuKho.create({
                data: {
                  maphieu: `PNK-AUTO-${order.madncc}-${Date.now()}`,
                  ngay: new Date(),
                  type: 'nhap',
                  khoId: order.khoId || khoId,
                  madncc: order.madncc,
                  ghichu: `✅ Tự động xác nhận nhập kho khi chốt kho phiên ${title || ''}`,
                  sanpham: {
                    create: order.sanpham.map(sp => ({
                      sanphamId: sp.idSP,
                      soluong: sp.slgiao || sp.sldat
                    }))
                  }
                }
              });
            }
          }
        }

        // Validate khoId exists
        const kho = await prisma.kho.findUnique({
          where: { id: khoId }
        });

        if (!kho) {
          throw new Error(`Kho với ID ${khoId} không tồn tại trong hệ thống`);
        }

        // 🚀 OPTIMIZATION: Batch fetch all needed products and their current tonKho state
        const sanphamIds = details.map(d => d.sanphamId);
        const [sanphams, currentTonKhos] = await Promise.all([
          prisma.sanpham.findMany({ where: { id: { in: sanphamIds } } }),
          prisma.tonKho.findMany({ where: { sanphamId: { in: sanphamIds } } })
        ]);

        const sanphamMap = new Map(sanphams.map(s => [s.id, s]));
        const tonKhoMap = new Map(currentTonKhos.map(tk => [tk.sanphamId, tk]));

        // Validate sltonthucte is not negative and items exist
        for (const detail of details) {
          if (detail.sltonthucte < 0) {
            throw new Error(`Số lượng tồn thực tế không được nhỏ hơn 0 (Sản phẩm ID: ${detail.sanphamId})`);
          }
          if (!sanphamMap.has(detail.sanphamId)) {
            throw new Error(`Sản phẩm với ID ${detail.sanphamId} không tồn tại trong hệ thống`);
          }
        }

        // 🚀 BATCH PRE-FETCH: Get all current inventory levels for all products in this transaction
        const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
        const [allSanphamKho, allTonKho] = await Promise.all([
          prisma.sanphamKho.findMany({
            where: {
              sanphamId: { in: sanphamIds },
              khoId: { in: [khoId, KHO_TONG_ID] }
            }
          }),
          prisma.tonKho.findMany({
            where: { sanphamId: { in: sanphamIds } }
          })
        ]);

        // Create lookup maps for fast access
        const sanphamKhoMap = new Map<string, any>();
        allSanphamKho.forEach((sk: any) => {
          sanphamKhoMap.set(`${sk.sanphamId}_${sk.khoId}`, sk);
        });
        const tonKhoMapFinal = new Map(allTonKho.map((tk: any) => [tk.sanphamId, tk]));

        // Tạo master record - Chotkho
        const chotkhoMaster = await prisma.chotkho.create({
          data: {
            ngaychot: ngaychot || new Date(),
            title: title || `Chốt kho ${new Date().toLocaleDateString('vi-VN')}`,
            ghichu: ghichu || '',
            khoId,
            userId,
            codeId: `CHOTKHO_${Date.now()}`,
            isActive: true
          }
        });

        console.log(`📦 Created master chotkho record: ${chotkhoMaster.id}`);

        // Tạo detail records - Chotkhodetail
        let detailCount = 0;
        const pendingWarnings: any[] = [];

        for (const detail of details) {
          // 🎯 OPTIMIZATION: Use the provided system stock instead of recalculating from logs for every product
          const sltonhethong_chuan = Number(detail.sltonhethong);
          const chenhlech = sltonhethong_chuan - Number(detail.sltonthucte) - Number(detail.slhuy);

          await prisma.chotkhodetail.create({
            data: {
              chotkhoId: chotkhoMaster.id,
              sanphamId: detail.sanphamId,
              sltonhethong: new Decimal(sltonhethong_chuan), 
              sltonthucte: new Decimal(detail.sltonthucte),
              slhuy: new Decimal(detail.slhuy),
              chenhlech: new Decimal(chenhlech),
              ghichu: detail.ghichu || '',
              userId,
              ngaychot: chotkhoMaster.ngaychot
            }
          });

          // 🎯 SYNC TO REALITY: Cập nhật tồn kho vật lý trong hệ thống
          // 1. Lấy tồn kho hiện tại để tính toán Delta (using our pre-fetched map)
          const currentSpKho = sanphamKhoMap.get(`${detail.sanphamId}_${khoId}`);
          const oldQty = Number(currentSpKho?.soluong || 0);
          const delta = Number(detail.sltonthucte) - oldQty;

          // 2. Cập nhật tồn tại kho cụ thể (Source Tracking)
          await prisma.sanphamKho.upsert({
            where: {
              sanphamId_khoId: {
                sanphamId: detail.sanphamId,
                khoId: khoId
              }
            },
            create: {
              sanphamId: detail.sanphamId,
              khoId: khoId,
              soluong: new Decimal(detail.sltonthucte),
            },
            update: {
              soluong: new Decimal(detail.sltonthucte),
              updatedAt: new Date()
            }
          });

          // 3. Nếu không phải KHO TỔNG, thực hiện Mirror Delta vào KHO TỔNG
          if (khoId !== KHO_TONG_ID) {
            await prisma.sanphamKho.upsert({
              where: {
                sanphamId_khoId: {
                  sanphamId: detail.sanphamId,
                  khoId: KHO_TONG_ID
                }
              },
              create: {
                sanphamId: detail.sanphamId,
                khoId: KHO_TONG_ID,
                soluong: new Decimal(delta), 
              },
              update: {
                soluong: { increment: delta },
                updatedAt: new Date()
              }
            });
          }

          // 4. Đồng bộ Tồn kho tổng (TonKho)
          // We need to fetch the latest khoTong value if we just updated it with increment
          // Or we can calculate it locally if we are careful
          // To be safe, we'll re-fetch only if it's not the main warehouse (where we did increment)
          // but actually, we can just calculate it: finalTotal = currentKhoTong + delta
          const currentKhoTongRecord = sanphamKhoMap.get(`${detail.sanphamId}_${KHO_TONG_ID}`);
          let finalTotal = (khoId === KHO_TONG_ID) 
            ? Number(detail.sltonthucte) 
            : (Number(currentKhoTongRecord?.soluong || 0) + delta);
          
          // 🛡️ SAFETY CHECK: Hàng hóa không thể tồn âm ở kho vật lý
          if (finalTotal < 0) {
            console.warn(`⚠️ [CHOTKHO-SYNC] Product ${detail.sanphamId} has negative calculation (${finalTotal}). Clamping to 0.`);
            finalTotal = 0;
            
            // Cập nhật lại KHO_TONG về 0 nếu bị âm
            await prisma.sanphamKho.upsert({
              where: {
                sanphamId_khoId: {
                  sanphamId: detail.sanphamId,
                  khoId: KHO_TONG_ID
                }
              },
              create: {
                sanphamId: detail.sanphamId,
                khoId: KHO_TONG_ID,
                soluong: new Decimal(0),
              },
              update: { soluong: new Decimal(0) }
            });
          }

          await prisma.tonKho.upsert({
            where: { sanphamId: detail.sanphamId },
            create: {
              sanphamId: detail.sanphamId,
              slton: new Decimal(finalTotal),
              sltontt: new Decimal(finalTotal),
            },
            update: {
              slton: new Decimal(finalTotal),
              sltontt: new Decimal(finalTotal),
              updatedAt: new Date()
            }
          });

          detailCount++;
        }

        // Lấy full data với relations
        const result = await prisma.chotkho.findUnique({
          where: { id: chotkhoMaster.id },
          include: {
            kho: {
              select: { id: true, name: true, makho: true }
            },
            user: {
              select: {
                id: true,
                email: true,
                profile: { select: { name: true } }
              }
            },
            details: {
              include: {
                sanpham: {
                  select: { id: true, title: true, masp: true }
                }
              }
            }
          }
        });

        return {
          success: true,
          message: `Tạo chốt kho thành công với ${detailCount} sản phẩm`,
          data: result,
          warnings: pendingWarnings
        };
      }, {
        timeout: 90000,
        maxWait: 15000,
      });

      // Gửi Push Notification cho creator hoặc admin
      if (transactionResult.success && transactionResult.data && inventoryData.userId) {
        this.notificationService.sendNotificationToUser(inventoryData.userId, {
          title: 'Cập nhật tồn kho',
          body: `Quá trình tạo chốt kho ${transactionResult.data.title} đã hoàn thành.`,
          url: `/admin/chotkho/${transactionResult.data.id}` 
        }).catch(err => console.error('Error sending push notification:', err));
      }

      return transactionResult;
    } catch (error) {
      console.error('Error in create chotkho:', error);
      throw error;

    }
  }

  /**
   * 🎯 TIMELINE LOGIC: Tính toán và trả về tiến trình số lượng nhập, xuất, chốt chi tiết của sản phẩm
   */
  async getProductTimeline(
    sanphamId: string,
    khoId: string,
    fromDateStr: string,
    toDateStr: string
  ) {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);

    // 1. Tìm phiên chốt kho gần nhất ngay trước fromDate
    const lastChot = await this.prisma.chotkhodetail.findFirst({
      where: {
        sanphamId,
        ngaychot: { lt: fromDate },
        chotkho: {
          khoId,
          isActive: true
        }
      },
      orderBy: { ngaychot: 'desc' },
      include: { chotkho: true }
    });

    const anchorTime = lastChot ? lastChot.ngaychot : new Date(0);
    let startQty = lastChot ? Number(lastChot.sltonthucte) : 0;

    // 2. Lấy phiếu nhập xuất từ sau anchorTime đến trước fromDate để tính tồn đầu kỳ
    const prePhieuKhos = await this.prisma.phieuKhoSanpham.findMany({
      where: {
        sanphamId,
        phieuKho: {
          khoId,
          createdAt: { gt: anchorTime, lt: fromDate },
          isActive: true
        }
      },
      include: { phieuKho: true }
    });

    prePhieuKhos.forEach(item => {
      if (item.phieuKho.type === 'nhap') {
        startQty += Number(item.soluong);
      } else if (item.phieuKho.type === 'xuat') {
        startQty -= Number(item.soluong);
      }
    });

    // 3. Lấy phiếu kho chi tiết trong khoảng từ fromDate đến toDate
    const phieuKhos = await this.prisma.phieuKhoSanpham.findMany({
      where: {
        sanphamId,
        phieuKho: {
          khoId,
          createdAt: { gte: fromDate, lte: toDate },
          isActive: true
        }
      },
      include: {
        phieuKho: true
      }
    });

    // 4. Lấy chốt kho chi tiết trong khoảng từ fromDate đến toDate
    const chotKhos = await this.prisma.chotkhodetail.findMany({
      where: {
        sanphamId,
        ngaychot: { gte: fromDate, lte: toDate },
        chotkho: {
          khoId,
          isActive: true
        }
      },
      include: {
        chotkho: true
      }
    });

    // 5. Tạo timeline
    const timeline: any[] = [];

    phieuKhos.forEach(item => {
      timeline.push({
        id: item.id,
        time: item.phieuKho.createdAt,
        type: item.phieuKho.type === 'nhap' ? 'NHẬP' : 'XUẤT',
        code: item.phieuKho.maphieu || '',
        qty: Number(item.soluong),
        ghichu: item.phieuKho.ghichu || ''
      });
    });

    chotKhos.forEach(item => {
      timeline.push({
        id: item.id,
        time: item.ngaychot,
        type: 'CHỐT KHO',
        code: item.chotkho?.title || 'Chốt kho',
        qty: Number(item.sltonthucte),
        sltonhethong: Number(item.sltonhethong),
        chenhlech: Number(item.chenhlech),
        slhuy: Number(item.slhuy),
        ghichu: item.ghichu || ''
      });
    });

    timeline.sort((a, b) => a.time.getTime() - b.time.getTime());

    // 6. Tính tồn lũy kế
    let runningQty = startQty;
    const resultTimeline: any[] = [];

    resultTimeline.push({
      id: 'START',
      time: fromDate,
      type: 'TỒN ĐẦU KỲ',
      code: 'START',
      qty: 0,
      balance: runningQty,
      ghichu: `Tồn đầu kỳ tại mốc ${fromDate.toLocaleDateString('vi-VN')}`
    });

    timeline.forEach(event => {
      if (event.type === 'NHẬP') {
        runningQty += event.qty;
      } else if (event.type === 'XUẤT') {
        runningQty -= event.qty;
      } else if (event.type === 'CHỐT KHO') {
        runningQty = event.qty;
      }

      resultTimeline.push({
        ...event,
        balance: runningQty
      });
    });

    return {
      startQty,
      timeline: resultTimeline
    };
  }

  /**
   * Lấy tất cả sản phẩm có tồn kho theo kho để chuẩn bị cho việc chốt kho
   */
  async getAllProductsByKho(khoId: string): Promise<any[]> {
    try {
      const sanphamKhoRecords = await this.prisma.sanphamKho.findMany({
        where: {
          khoId,
          soluong: { gt: 0 }
        },
        include: {
          sanpham: {
            select: {
              id: true,
              title: true,
              masp: true
            }
          }
        },
        orderBy: {
          sanpham: {
            title: 'asc'
          }
        }
      });

      const products = await Promise.all(sanphamKhoRecords.map(async (item) => {
        // Chuẩn hóa: Thay vì lấy item.soluong trực tiếp, ta tính toán lại từ log để đối soát
        const analysis = await this.calculateStockFromLogs(item.sanphamId, khoId);
        
        const sltonhethong = Math.max(0, analysis.currentCalc);
        const isAbnormal = analysis.currentCalc < 0;
        
        return {
          sanphamId: item.sanphamId,
          sanpham: item.sanpham,
          sltonhethong_db: Number(item.soluong), 
          sltonhethong: sltonhethong,
          sltonhethong_raw: analysis.currentCalc, // Giá trị gốc chưa clamp
          isAbnormal: isAbnormal,                 // Đánh dấu bất thường (âm)
          sltonthucte: 0,
          slhuy: 0,
          chenhlech: sltonhethong,
          isSynced: sltonhethong === Number(item.soluong),
          lastClosingDate: analysis.lastClosingDate
        };
      }));

      return products;
    } catch (error) {
      console.error('Error getting products by kho:', error);
      throw error;
    }
  }

  /**
   * Lấy danh sách tất cả kho
   */
  async getAllKho(): Promise<any[]> {
    try {
      return await this.prisma.kho.findMany({
        where: {
          isActive: true
        },
        select: {
          id: true,
          name: true,
          makho: true,
          diachi: true
        },
        orderBy: {
          name: 'asc'
        }
      });
    } catch (error) {
      console.error('Error getting all kho:', error);
      throw error;
    }
  }

  /**
   * Lấy tất cả sản phẩm có thông tin tồn kho (không phân theo kho)
   */
  async getAllProducts(): Promise<any[]> {
    try {
      const products = await this.prisma.sanpham.findMany({
        include: {
          TonKho: {
            select: {
              slton: true,
              sltontt: true,
              slchogiao: true,
              slchonhap: true
            }
          }
        },
        orderBy: {
          title: 'asc'
        }
      });

      return products.map(product => ({
        id: product.id,
        masp: product.masp,
        title: product.title,
        dvt: product.dvt,
        dongia: Number(product.giaban) || 0,
        status: product.isActive,
        ghichu: product.ghichu,
        tonkho: product.TonKho ? {
          slton: Number(product.TonKho.slton) || 0,
          slhuy: 0, // TonKho không có field slhuy
          sltinhthucte: Number(product.TonKho.sltontt) || 0,
        } : {
          slton: 0,
          slhuy: 0,
          sltinhthucte: 0,
        }
      }));
    } catch (error) {
      console.error('Error getting all products:', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.chotkho.findMany({
        skip,
        take: limit,
        include: {
          kho: {
            select: {
              id: true,
              name: true,
              makho: true
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: { name: true }
              }
            }
          },
          details: {
            include: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true
                }
              }
            }
          }
        },
        orderBy: {
          ngaychot: 'desc'
        }
      }),
      this.prisma.chotkho.count()
    ]);

    return {
      data: items,
      pagination: {
        current: page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string) {
    return this.prisma.chotkho.findUnique({
      where: { id },
      include: {
        kho: {
          select: {
            id: true,
            name: true,
            makho: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: { name: true }
            }
          }
        },
        details: {
          include: {
            sanpham: {
              select: {
                id: true,
                title: true,
                masp: true
              }
            }
          }
        }
      }
    });
  }

  async update(id: string, updateData: any) {
    return this.prisma.chotkho.update({
      where: { id },
      data: updateData
    });
  }

  async remove(id: string) {
    return this.prisma.chotkho.delete({
      where: { id }
    });
  }

  async search(searchParams: any) {
    const { khoId, sanphamId, fromDate, toDate, page = 1, limit = 10 } = searchParams;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (khoId) where.khoId = khoId;
    if (fromDate || toDate) {
      where.ngaychot = {};
      if (fromDate) where.ngaychot.gte = new Date(fromDate);
      if (toDate) where.ngaychot.lte = new Date(toDate);
    }

    // Filter by sanphamId through details relation
    if (sanphamId) {
      where.details = {
        some: { sanphamId }
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.chotkho.findMany({
        where,
        skip,
        take: limit,
        include: {
          kho: {
            select: {
              id: true,
              name: true,
              makho: true
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: { name: true }
              }
            }
          },
          details: {
            include: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true
                }
              }
            }
          }
        },
        orderBy: {
          ngaychot: 'desc'
        }
      }),
      this.prisma.chotkho.count({ where })
    ]);

    return {
      data: items,
      pagination: {
        current: page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Update chotkho with details
   */
  async updateChotkhoWithDetails(
    id: string,
    data: {
      ngaychot?: Date;
      title?: string;
      ghichu?: string;
      isActive?: boolean;
      details?: Array<{
        sanphamId: string;
        sltonhethong: number;
        sltonthucte: number;
        slhuy: number;
        ghichu?: string;
      }>;
    }
  ) {
    try {
      const transactionResult = await this.prisma.$transaction(async (prisma) => {
        // Update master record
      const updatedMaster = await prisma.chotkho.update({
        where: { id },
        data: {
          ngaychot: data.ngaychot,
          title: data.title,
          ghichu: data.ghichu,
          isActive: data.isActive
        }
      });

        // Handle details if provided
        if (data.details && data.details.length > 0) {
          // Validate sltonthucte is not negative
          for (const detail of data.details) {
            if (detail.sltonthucte < 0) {
              throw new Error(`Số lượng tồn thực tế không được nhỏ hơn 0 (Sản phẩm ID: ${detail.sanphamId})`);
            }
          }

          // Delete existing details
          await prisma.chotkhodetail.deleteMany({
            where: { chotkhoId: id }
          });

          // 🚀 BATCH PRE-FETCH: Get all current inventory and aggregate data
          const sanphamIds = data.details.map(d => d.sanphamId);
          const KHO_TONG_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
          const currentKhoId = updatedMaster.khoId;
          if (!currentKhoId) throw new Error('Không thể tính toán log: phiên chốt kho thiếu khoId');

          const [allSanphamKho, pendingInAggs, pendingOutAggs] = await Promise.all([
            prisma.sanphamKho.findMany({
              where: {
                sanphamId: { in: sanphamIds },
                khoId: { in: [currentKhoId as string, KHO_TONG_ID] }
              }
            }),
            prisma.dathangsanpham.groupBy({
              by: ['idSP'],
              where: { idSP: { in: sanphamIds }, dathang: { status: { in: ['dadat', 'dagiao'] } } },
              _sum: { slnhan: true, sldat: true }
            }),
            prisma.donhangsanpham.groupBy({
              by: ['idSP'],
              where: { idSP: { in: sanphamIds }, donhang: { status: { in: ['dadat', 'dagiao'] } } },
              _sum: { slnhan: true, sldat: true }
            })
          ]);

          // Create lookup maps
          const sanphamKhoMap = new Map();
          allSanphamKho.forEach((sk: any) => sanphamKhoMap.set(`${sk.sanphamId}_${sk.khoId}`, sk));
          
          const pendingInMap = new Map(pendingInAggs.map((agg: any) => [agg.idSP, agg]));
          const pendingOutMap = new Map(pendingOutAggs.map((agg: any) => [agg.idSP, agg]));

          // Create new details
          for (const detail of data.details) {
            if (!updatedMaster.khoId) throw new Error('Không thể tính toán log: phiên chốt kho thiếu khoId');
            
            // 🎯 CHUẨN HÓA LOGIC: Kiểm tra lại tồn kho hệ thống từ log (Standardization)
            // Note: Recalculating from logs for EVERY product might still be slow. 
            // We'll keep it for now as it's part of the "standardization" logic, but ideally this would be optimized too.
            const analysis = await this.calculateStockFromLogs(detail.sanphamId, currentKhoId as string, updatedMaster.ngaychot, prisma);
            const sltonhethong_chuan = analysis.currentCalc;

            const chenhlech = sltonhethong_chuan - Number(detail.sltonthucte) - Number(detail.slhuy);

            await prisma.chotkhodetail.create({
              data: {
                chotkhoId: id,
                sanphamId: detail.sanphamId,
                sltonhethong: new Decimal(sltonhethong_chuan),
                sltonthucte: new Decimal(detail.sltonthucte),
                slhuy: new Decimal(detail.slhuy),
                chenhlech: new Decimal(chenhlech),
                ghichu: detail.ghichu || (analysis.currentCalc !== Number(detail.sltonhethong) ? `⚠️ Đã chuẩn hóa từ log (Báo cáo cũ: ${detail.sltonhethong})` : ''),
                ngaychot: updatedMaster.ngaychot
              }
            });

            // 🎯 SYNC TO REALITY: Cập nhật tồn kho vật lý trong hệ thống
            // 1. Lấy tồn kho cũ để tính Delta
            const currentSpKho = sanphamKhoMap.get(`${detail.sanphamId}_${currentKhoId}`);
            const oldQty = Number(currentSpKho?.soluong || 0);
            const delta = Number(detail.sltonthucte) - oldQty;

            // 2. Cập nhật tồn tại kho cụ thể
            await prisma.sanphamKho.upsert({
              where: {
                sanphamId_khoId: {
                  sanphamId: detail.sanphamId,
                  khoId: currentKhoId as string
                }
              },
              create: {
                sanphamId: detail.sanphamId,
                khoId: currentKhoId as string,
                soluong: new Decimal(detail.sltonthucte),
              },
              update: {
                soluong: new Decimal(detail.sltonthucte),
                updatedAt: new Date()
              }
            });

            // 3. Mirror Delta vào KHO TỔNG nếu cần
            if (currentKhoId !== KHO_TONG_ID) {
              await prisma.sanphamKho.upsert({
                where: {
                  sanphamId_khoId: {
                    sanphamId: detail.sanphamId,
                    khoId: KHO_TONG_ID
                  }
                },
                create: {
                  sanphamId: detail.sanphamId,
                  khoId: KHO_TONG_ID,
                  soluong: new Decimal(delta),
                },
                update: {
                  soluong: { increment: delta },
                  updatedAt: new Date()
                }
              });
            }

            // 4. Đồng bộ Tồn kho tổng
            const currentKhoTongRecord = sanphamKhoMap.get(`${detail.sanphamId}_${KHO_TONG_ID}`);
            const finalTotal = (currentKhoId === KHO_TONG_ID)
              ? Number(detail.sltonthucte)
              : (Number(currentKhoTongRecord?.soluong || 0) + delta);

            // 🎯 Batch calculation for slchonhap and slchogiao
            const pIn = pendingInMap.get(detail.sanphamId);
            const pOut = pendingOutMap.get(detail.sanphamId);

            const currentPendingIn = Number(pIn?._sum?.sldat || 0) - Number(pIn?._sum?.slnhan || 0);
            const currentPendingOut = Number(pOut?._sum?.sldat || 0) - Number(pOut?._sum?.slnhan || 0);

            await prisma.tonKho.upsert({
              where: { sanphamId: detail.sanphamId },
              create: {
                sanphamId: detail.sanphamId,
                slton: new Decimal(finalTotal),
                sltontt: new Decimal(finalTotal),
                slchogiao: new Decimal(Math.max(0, currentPendingOut)),
                slchonhap: new Decimal(Math.max(0, currentPendingIn)),
              },
              update: {
                slton: new Decimal(finalTotal),
                sltontt: new Decimal(finalTotal),
                slchogiao: new Decimal(Math.max(0, currentPendingOut)),
                slchonhap: new Decimal(Math.max(0, currentPendingIn)),
                updatedAt: new Date()
              }
            });
          }
        }

        // Return full data with relations
        return await prisma.chotkho.findUnique({
          where: { id },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: { select: { name: true } }
              }
            },
            details: {
              include: {
                sanpham: {
                  select: { id: true, title: true, masp: true }
                }
              }
            }
          }
        });
      }, {
        timeout: 60000,
      });

      // Gửi Push Notification cho creator hoặc admin
      if (transactionResult && transactionResult.userId) {
        this.notificationService.sendNotificationToUser(transactionResult.userId, {
          title: 'Cập nhật tồn kho (Sửa đổi)',
          body: `Quá trình cập nhật chốt kho đã hoàn thành.`,
          url: `/admin/chotkho/${transactionResult.id}`
        }).catch(err => console.error('Error sending push notification:', err));
      }

      return transactionResult;
    } catch (error) {
      console.error('Error in update chotkho:', error);
      throw error;
    }
  }
}
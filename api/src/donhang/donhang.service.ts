import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as moment from 'moment-timezone';
const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258';
@Injectable()
export class DonhangService {
  constructor(private readonly prisma: PrismaService) {}

  async generateNextOrderCode(): Promise<string> {
    // Lấy mã đơn hàng gần nhất
    const lastOrder = await this.prisma.donhang.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    let nextCode = 'TG-AA00001'; // Mã đầu tiên

    if (lastOrder) {
      nextCode = this.incrementOrderCode(lastOrder.madonhang);
    }
    console.log('nextCode', nextCode);

    return nextCode;
  }

  private incrementOrderCode(orderCode: string): string {
    const prefix = 'TG-';
    const letters = orderCode.slice(3, 5); // Lấy AA → ZZ
    const numbers = parseInt(orderCode.slice(5), 10); // Lấy 00001 → 99999

    let newLetters = letters;
    let newNumbers = numbers + 1;

    if (newNumbers > 99999) {
      newNumbers = 1; // Reset về 00001
      newLetters = this.incrementLetters(letters);
    }

    return `${prefix}${newLetters}${newNumbers.toString().padStart(5, '0')}`;
  }

  private incrementLetters(letters: string): string {
    let firstChar = letters.charCodeAt(0);
    let secondChar = letters.charCodeAt(1);

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

  async reorderDonHangs(donhangIds: string[]) {
    // Update the order of each donhang based on its position in the array
    for (let i = 0; i < donhangIds.length; i++) {
      await this.prisma.donhang.update({
        where: { id: donhangIds[i] },
        data: { order: i + 1 },
      });
    }
  }

  async search(params: any) {
    const { Batdau, Ketthuc, Type, pageSize = 10, pageNumber = 1, query } = params;

    const where: any = {
      ngaygiao: {
        gte: Batdau
          ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate()
          : undefined,
        lte: Ketthuc
          ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate()
          : undefined,
      },
      // type: Type,
      status: Array.isArray(params.Status)
        ? { in: params.Status }
        : params.Status,
    };

    if (query) {
      where.OR = [
        { madonhang: { contains: query, mode: 'insensitive' } },
        { khachhang: { name: { contains: query, mode: 'insensitive' } } }
      ];
    }

    const [total, donhangs] = await Promise.all([
      this.prisma.donhang.count({ where }),
      this.prisma.donhang.findMany({
        where,
        include: {
          sanpham: {
            include: {
              sanpham: true,
            },
          },
          khachhang: { include: { banggia: { include: { sanpham: true } } } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (Number(pageNumber) - 1) * Number(pageSize),
        take: Number(pageSize),
      }),
    ]);

    const result = donhangs.map(({ khachhang, sanpham, ...donhang }) => ({
      ...donhang,
      sanpham: sanpham.map((item: any) => {
        const priceFromBanggia = khachhang.banggia
          ? khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : 0;
        const giaban = priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;


        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
          ghichu: item.ghichu,
        };
      }),
      khachhang: (({ banggia, ...rest }) => rest)(khachhang), // Xóa banggia
      name: khachhang.name,
    }));

    return {
      data: result,
      total,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * Tổng hợp số lượng sản phẩm chờ giao trong các đơn hàng theo điều kiện lọc.
   * Trả về danh sách sản phẩm với tổng số lượng đặt (sldat) theo từng mã sản phẩm.
   */
  async getchogiao(params: any) {
    const { Batdau, Ketthuc, Type } = params;

    // Lấy danh sách đơn hàng theo điều kiện lọc
    const donhangs = await this.prisma.donhang.findMany({
      where: {
        ngaygiao: {
          gte: Batdau
            ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate()
            : undefined,
          lte: Ketthuc
            ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate()
            : undefined,
        },
        // type: Type,
        // Có thể bổ sung điều kiện status nếu cần
      },
      include: {
        sanpham: {
          include: { sanpham: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Gộp số lượng đặt theo từng sản phẩm
    const productMap = new Map<string, { title: string; masp: string; sldat: number }>();

    for (const dh of donhangs) {
      for (const sp of dh.sanpham) {
        if (!sp?.sanpham) continue;
        const key = sp.idSP;
        if (productMap.has(key)) {
          productMap.get(key)!.sldat += Number(sp.sldat) || 0;
        } else {
          productMap.set(key, {
            title: sp.sanpham.title,
            masp: sp.sanpham.masp,
            sldat: Number(sp.sldat) || 0,
          });
        }
      }
    }

    // Trả về danh sách tổng hợp
    return Array.from(productMap, ([idSP, value]) => ({
      idSP,
      title: value.title,
      masp: value.masp,
      slchogiaott: parseFloat(value.sldat.toFixed(2)),
    }));
  }
  
  async dongbogia(listdonhang: any) {
    console.log('listdonhang', listdonhang);

    return this.prisma.$transaction(async (prisma) => {
      let updatedCount = 0;
      
      for (const donhangId of listdonhang) {
        try {
          // 1. Tìm đơn hàng với khách hàng và bảng giá
          const donhang = await prisma.donhang.findUnique({
            where: { id: donhangId },
            include: {
              khachhang: {
                include: {
                  banggia: {
                    include: {
                      sanpham: true
                    }
                  }
                }
              },
              sanpham: true
            }
          });

          if (!donhang) {
            console.warn(`Đơn hàng ${donhangId} không tồn tại`);
            continue;
          }

          // 2. Kiểm tra khách hàng có bảng giá không
          if (!donhang.khachhang.banggia) {
            console.warn(`Khách hàng ${donhang.khachhang.name} không có bảng giá`);
            continue;
          }

          // 3. Cập nhật giá cho từng sản phẩm trong đơn hàng
          for (const donhangSanpham of donhang.sanpham) {
            // Tìm giá từ bảng giá của khách hàng
            const giaSanpham = donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === donhangSanpham.idSP
            );

            if (giaSanpham) {
              const giaban = giaSanpham.giaban;
              const sldat = Number(donhangSanpham.sldat);
              const slgiao = Number(donhangSanpham.slgiao);
              const slnhan = Number(donhangSanpham.slnhan);
              const vat = Number(donhangSanpham.vat) || 0;

              // 4. Cập nhật giá và tính toán lại các giá trị
              await prisma.donhangsanpham.update({
                where: { id: donhangSanpham.id },
                data: {
                  giaban: giaban,
                  ttdat: giaban * sldat,
                  ttgiao: giaban * slgiao,
                  ttnhan: giaban * slnhan,
                  ttsauvat: (giaban * slnhan) * (1 + vat / 100)
                }
              });
            }
          }
          
          updatedCount++;
        } catch (error) {
          console.error(`Lỗi khi cập nhật đơn hàng ${donhangId}:`, error);
        }
      }

      return {
        status: 'success',
        message: `Đồng bộ giá thành công cho ${updatedCount}/${listdonhang.length} đơn hàng`
      };
    });
  }



  async phieuchuyen(params: any) {
    const { Batdau, Ketthuc, Type } = params;
    console.log('Batdau', moment(Batdau).startOf('day').toDate());
    console.log('Ketthuc', moment(Ketthuc).endOf('day').toDate());
    const result = await this.prisma.donhang.findMany({
      where: {
        ngaygiao: {
          gte: Batdau
            ? moment(Batdau).tz('Asia/Ho_Chi_Minh').startOf('day').toDate()
            : undefined,
          lte: Ketthuc
            ? moment(Ketthuc).tz('Asia/Ho_Chi_Minh').endOf('day').toDate()
            : undefined,
        },
        // type: Type,
        status: Array.isArray(params.Status)
          ? { in: params.Status }
          : params.Status,
      },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return result.map(({ khachhang, sanpham, ...donhang }) => ({
      ...donhang,
      name: khachhang.name,
      diachi: khachhang.diachi,
      sdt: khachhang.sdt,
      gionhanhang: khachhang.gionhanhang,
      tongsomon: sanpham.length,
      soluongtt: parseFloat(
        sanpham
          .reduce((total, item: any) => total + Number(item.slgiao || 0), 0)
          .toFixed(2),
      ),
    }));
  }



  async phieugiao(params: any) {
    const result = await this.prisma.donhang.findUnique({
      where: params,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
    });
    if (!result) {
      throw new NotFoundException('DonHang not found');
    }
    return {
      ...result,
      sanpham: result.sanpham.map((item: any) => {
        const priceFromBanggia = result.khachhang.banggia
          ? result.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : 0;
        const giaban = priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
          ghichu: item.ghichu,
        };
      }),
      khachhang: (({ banggia, ...rest }) => rest)(result.khachhang), // Xóa banggia
    };
  }

  async findAll() {
    const donhangs = await this.prisma.donhang.findMany({
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    const result = donhangs.map((donhang) => ({
      ...donhang,
      sanpham: donhang.sanpham.map((item: any) => { 
        const priceFromBanggia = donhang.khachhang.banggia
          ? donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : 0;
        const giaban = priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;      
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
          ghichu: item.ghichu,
        };
      }),
      name: donhang.khachhang.name,
    }));
    return result;
  }

  async searchfield(searchParams: Record<string, any>) {
    const where: any = {};

    // Xây dựng điều kiện tìm kiếm linh hoạt
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) continue;

      if (key === 'id') {
        where[key] = value; // Tìm chính xác theo ID
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        where[key] = value; // Tìm theo số hoặc boolean
      } else {
        where[key] = { contains: value, mode: 'insensitive' }; // Tìm gần đúng với string
      }
    }

    const donhang = await this.prisma.donhang.findFirst({
      where,
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: {
          include: {
            banggia: {
              include: { sanpham: true },
            },
          },
        },
      },
    });

    if (!donhang) throw new NotFoundException('DonHang not found');

    return {
      ...donhang,
      sanpham: donhang.sanpham.map((item) => {
        const priceFromBanggia = donhang.khachhang.banggia
          ? donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : 0;
        const giaban = priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
          ghichu: item.ghichu,
        };
      }),
      khachhang: (({ banggia, ...rest }) => rest)(donhang.khachhang), // Xóa banggia
    };
  }
  async findOne(id: string) {
    const donhang = await this.prisma.donhang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        khachhang: { include: { banggia: { include: { sanpham: true } } } },
      },
    });
    if (!donhang) throw new NotFoundException('DonHang not found');
    const result = {
      ...donhang,
      sanpham: donhang.sanpham.map((item) => {

        const priceFromBanggia = donhang.khachhang.banggia
          ? donhang.khachhang.banggia.sanpham.find(
              (sp) => sp.sanphamId === item.idSP,
            )?.giaban
          : 0;
        const giaban = priceFromBanggia !== 0 ? priceFromBanggia : item.sanpham.giaban;
        return {
          ...item.sanpham,
          idSP: item.idSP,
          giaban: giaban,
          sldat: parseFloat((item.sldat ?? 0).toFixed(2)),
          slgiao: parseFloat((item.slgiao ?? 0).toFixed(2)),
          slnhan: parseFloat((item.slnhan ?? 0).toFixed(2)),
          slhuy: parseFloat((item.slhuy ?? 0).toFixed(2)),
          ttdat: parseFloat((item.ttdat ?? 0).toFixed(2)),
          ttgiao: parseFloat((item.ttgiao ?? 0).toFixed(2)),
          ttnhan: parseFloat((item.ttnhan ?? 0).toFixed(2)),
          ghichu: item.ghichu,
        };
      }),
    };
    return result;
  }

  async ImportDonhangOld(dulieu: any) {
    // Step 1: Map input data to the expected internal format
    const rawData = await Promise.all(
      dulieu.map(async (v: any) => {
        try {
          const mappedSanpham = await Promise.all(
            v.sanpham.map(async (item: any) => {
              try {
                const sp = await this.prisma.sanpham.findFirst({
                  where: { masp: item.ItemCode },
                });
                
                if (!sp) {
                  console.warn(`Sản phẩm với mã ${item.ItemCode} không tồn tại, bỏ qua`);
                  return null;
                }

                return {
                  id: sp.id,
                  sldat: parseFloat((item.Quantity ?? 0).toFixed(2)),
                  slgiao: parseFloat((item.Quantity ?? 0).toFixed(2)),
                  slnhan: parseFloat((item.Quantity ?? 0).toFixed(2)),
                  slhuy: 0,
                  ttdat: 0,
                  ttgiao: 0,
                  ttnhan: 0,
                };
              } catch (error) {
                console.warn(`Lỗi xử lý sản phẩm ${item.ItemCode}, bỏ qua:`, error,item);
                return null;
              }
            }),
          );

          // Filter out null items (failed products)
          const validSanpham = mappedSanpham.filter(item => item !== null);

          // Skip this order if no valid products
          if (validSanpham.length === 0) {
            console.warn(`Đơn hàng ${v.tenkh} không có sản phẩm hợp lệ, bỏ qua`);
            return null;
          }

          return {
            title: `Import ${v.tenkh} - ${moment().format('DD_MM_YYYY')}`,
            type: 'donsi',
            ngaygiao: new Date(v.ngaygiao) || new Date(),
            khachhangId: v.khachhangId,
            sanpham: validSanpham,
          };
        } catch (error) {
          console.warn(`Lỗi xử lý đơn hàng ${v.tenkh}, bỏ qua:`, error);
          return null;
        }
      }),
    );

    // Filter out null orders (failed orders)
    const validRawData = rawData.filter(item => item !== null);

    let success = 0;
    let fail = 0;
    let skip = 0;

    for (const order of rawData) {
      // Kiểm tra đơn hàng theo ngày (ngày giao tính theo startOf day và endOf day)
      const startOfDay = moment(order.ngaygiao).startOf('day').toDate();
      const endOfDay = moment(order.ngaygiao).endOf('day').toDate();
      const existingOrder = await this.prisma.donhang.findFirst({
        where: {
          khachhangId: order.khachhangId,
          ngaygiao: { gte: startOfDay, lte: endOfDay },
        },
        include: { sanpham: true },
      });

      // Nếu đã tồn tại đơn hàng với cùng khachhangId, ngaygiao và số lượng sanpham giống nhau thì bỏ qua
      if (
        existingOrder &&
        existingOrder.sanpham.length === order.sanpham.length
      ) {
        skip++;
        continue;
      }

      // Nếu không tồn tại, tạo mới đơn hàng
      try {
        await this.create(order);
        success++;
      } catch (error) {
        fail++;
      }
    }
    return { success, fail, skip };
  }


  async ImportDonhang(data: any) {
    const acc: Record<string, any> = {};
    for (const curr of data) {
      if (!acc[curr.makh]) {
        const khachhang = await this.prisma.khachhang.findFirst({
          where: { makh: curr.makh },
        });
        acc[curr.makh] = {
          title: `Import ${moment().format('DD_MM_YYYY')}`,
          ngaygiao: curr.ngaygiao,
          makh: curr.makh,
          khachhangId: khachhang?.id,
          name: khachhang?.name,
          mabanggia: curr.mabanggia,
          sanpham: [],
          khachhang: {
            makh: curr.makh,
          },
        };
      }
      const sanphamRecord = await this.prisma.sanpham.findFirst({
        where: { masp: curr.masp },
      });
      acc[curr.makh].sanpham.push({
        masp: curr.masp,
        id: sanphamRecord?.id,
        sldat: Number(curr.sldat),
        slgiao: Number(curr.slgiao),
        slnhan: Number(curr.slnhan),
        ghichu: curr.ghichu,
      });
    }
    const convertData: any = Object.values(acc);
    let success = 0;
    let fail = 0;
    for (const element of convertData) {
      try {
        await this.create(element);
        success += 1;
      } catch (error) {
        console.log('error', error);

        await this.prisma.importHistory.create({
          data: {
            codeId: element.madonhang, // using madonhang as the unique code identifier
            title: element.title, // new field: title
            type: 'donhang', // new field: type
            caseDetail: {
              errorMessage: error.message,
              errorStack: error.stack,
              additionalInfo: 'Failed during donhang import process',
            },
            order: 1, // update based on your ordering logic if needed
            createdBy: 'system', // replace with the actual account ID if available
          },
        });
        fail += 1;
      }
    }
    return {
      success,
      fail,
    };
  }

  async create(dto: any) {
    const madonhang = await this.generateNextOrderCode();
    return this.prisma.$transaction(async (prisma) => {
      const newDonhang = await prisma.donhang.create({
        data: {
          title: dto.title,
          type: dto.type || 'donsi',
          madonhang: madonhang,
          ngaygiao: new Date(dto.ngaygiao),
          khachhangId: dto.khachhangId,
          isActive: dto.isActive,
          order: dto.order,
          ghichu: dto.ghichu,
          sanpham: {
            create: dto?.sanpham?.map((sp: any) => ({
              idSP: sp.id,
              ghichu: sp.ghichu,
              sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
              slgiao: parseFloat((sp.sldat ?? 0).toFixed(2)),
              slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
              slhuy: parseFloat((sp.slhuy ?? 0).toFixed(2)),
              ttdat: parseFloat((sp.ttdat ?? 0).toFixed(2)),
              ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
              ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(2)),
            })),
          },
        },
        include: {
          sanpham: true,
        },
      });

      for (const sp of dto.sanpham) {
        const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(2));
        await prisma.tonKho.upsert({
          where: { sanphamId: sp.id },
          update: {
            slchogiao: { increment: incrementValue },
          },
          create: {
            sanphamId: sp.id,
            slchogiao: incrementValue,
          },
        });
      }
      return newDonhang;
    });
  }

async update(id: string, data: any) {
  return this.prisma.$transaction(async (prisma) => {
    // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
    const oldDonhang = await prisma.donhang.findUnique({
      where: { id },
      include: { sanpham: true },
    });
    if (!oldDonhang) {
      throw new NotFoundException('Đơn hàng không tồn tại');
    }

    // 2. Rollback từ 'dagiao' về 'dadat'
    if (oldDonhang.status === 'dagiao' && data.status === 'dadat') {
      // Rollback tồn kho
      for (const sp of oldDonhang.sanpham) {
        const incValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
        await prisma.tonKho.update({
          where: { sanphamId: sp.idSP },
          data: {
            slchogiao: { increment: incValue },
            slton: { increment: incValue },
          },
        });
      }
      // Xóa phiếu kho
      const maphieuOld = `PX-${oldDonhang.madonhang}`;
      const phieuKho = await prisma.phieuKho.findUnique({
        where: { maphieu: maphieuOld },
      });
      if (phieuKho) {
        await prisma.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: phieuKho.id },
        });
        await prisma.phieuKho.delete({
          where: { maphieu: maphieuOld },
        });
      }
      // Cập nhật đơn hàng
      const updatedOrder = await prisma.donhang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          ngaygiao: new Date(data.ngaygiao),
          khachhangId: data.khachhangId,
          isActive: data.isActive,
          order: data.order,
          ghichu: data.ghichu,
          status: 'dadat',
          ...(data.sanpham && data.sanpham.length
            ? {
                sanpham: {
                  updateMany: data.sanpham.map((sp: any) => ({
                    where: { idSP: sp.id },
                    data: {
                      ghichu: sp.ghichu,
                      slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                    },
                  })),
                },
              }
            : {}),
        },
      });
      // Cập nhật tồn kho theo chênh lệch số lượng giao mới/cũ
      for (const sp of data.sanpham) {
        const newSlgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
        const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
        const oldSlgiao = oldItem ? parseFloat((oldItem.slgiao ?? 0).toFixed(2)) : 0;
        const difference = newSlgiao - oldSlgiao;
        if (difference !== 0) {
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
              slchogiao: difference > 0 ? { decrement: difference } : { increment: -difference },
              slton: difference > 0 ? { decrement: difference } : { increment: -difference },
            },
          });
        }
      }
      return updatedOrder;
    }

    // 3. Sửa đơn hàng ở trạng thái 'dadat'
    if (oldDonhang.status === 'dadat' && data.status === 'dadat') {
      // Cập nhật tồn kho cho các sản phẩm có trong cả đơn hàng cũ và mới
      for (const sp of data.sanpham) {
        const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
        const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
        if (oldItem) {
          const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
          const difference = newSldat - oldSldat;
          if (difference !== 0) {
            await prisma.tonKho.update({
              where: { sanphamId: sp.id },
              data: {
                slchogiao: difference > 0 ? { increment: difference } : { decrement: Math.abs(difference) },
              },
            });
          }
        } else {
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
              slchogiao: { increment: newSldat },
            },
          });
        }
      }
      // Xử lý các sản phẩm đã có trong đơn hàng cũ nhưng bị loại bỏ trong đơn hàng mới
      for (const oldItem of oldDonhang.sanpham) {
        const exists = data.sanpham.find((sp: any) => sp.id === oldItem.idSP);
        if (!exists) {
          const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
          await prisma.tonKho.update({
            where: { sanphamId: oldItem.idSP },
            data: {
              slchogiao: { decrement: oldSldat },
            },
          });
        }
      }
      return prisma.donhang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          ngaygiao: new Date(data.ngaygiao),
          khachhangId: data.khachhangId,
          isActive: data.isActive,
          order: data.order,
          ghichu: data.ghichu,
          ...(data.sanpham && data.sanpham.length
            ? {
                sanpham: {
                  deleteMany: {},
                  createMany: {
                    data: data.sanpham.map((sp: any) => ({
                      idSP: sp.id,
                      ghichu: sp.ghichu,
                      sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                      slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                      slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                      ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
                    })),
                  },
                },
              }
            : {}),
        },
      });
    }

    // 4. Chuyển sang 'dagiao'
    if (oldDonhang.status === 'dadat' && data.status === 'dagiao') {
      for (const sp of data.sanpham) {
        const decValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
        await prisma.tonKho.update({
          where: { sanphamId: sp.id },
          data: {
            slchogiao: { decrement: decValue },
            slton: { decrement: decValue },
          },
        });
      }
      const maphieuNew = `PX-${data.madonhang}`;
      const phieuPayload = {
        ngay: new Date(data.ngaygiao),
        type: 'xuat',
        khoId: DEFAUL_KHO_ID,
        ghichu: data.ghichu,
        isActive: data.isActive ?? true,
        sanpham: {
          create: data.sanpham.map((sp: any) => ({
            sanphamId: sp.id,
            soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
            ghichu: sp.ghichu,
          })),
        },      };

      // Handle phieuKho upsert manually to avoid unique constraint violation
      const existingPhieu = await prisma.phieuKho.findUnique({
        where: { maphieu: maphieuNew },
        include: { sanpham: true },
      });

      if (existingPhieu) {
        // Delete existing sanpham records first
        await prisma.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: existingPhieu.id },
        });
        
        // Update the phieuKho and create new sanpham records
        await prisma.phieuKho.update({
          where: { maphieu: maphieuNew },
          data: {
            ngay: phieuPayload.ngay,
            type: phieuPayload.type,
            khoId: phieuPayload.khoId,
            ghichu: phieuPayload.ghichu,
            isActive: phieuPayload.isActive,
            sanpham: {
              create: data.sanpham.map((sp: any) => ({
                sanphamId: sp.id,
                soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                ghichu: sp.ghichu,
              })),
            },
          },
        });
      } else {
        // Create new phieuKho with sanpham
        const uniqueSanpham = data.sanpham.reduce((acc: any[], sp: any) => {
          const existing = acc.find(item => item.sanphamId === sp.id);
          if (existing) {
            existing.soluong += parseFloat((sp.slgiao ?? 0).toFixed(2));
          } else {
            acc.push({
              sanphamId: sp.id,
              soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
              ghichu: sp.ghichu,
            });
          }
          return acc;
        }, []);

        await prisma.phieuKho.create({
          data: {
            maphieu: maphieuNew,
            ngay: phieuPayload.ngay,
            type: phieuPayload.type,
            khoId: phieuPayload.khoId,
            ghichu: phieuPayload.ghichu,
            isActive: phieuPayload.isActive,
            sanpham: {
              create: uniqueSanpham,
            },
          },
        });
      }

      return prisma.donhang.update({
        where: { id },
        data: {
          status: 'dagiao',
          sanpham: {
            updateMany: data.sanpham.map((sp: any) => ({
              where: { idSP: sp.id },
              data: {
                ghichu: sp.ghichu,
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
              },
            })),
          },
        },
      });
    }

    // 5. Chuyển sang 'danhan'
    if (oldDonhang.status === 'dagiao' && data.status === 'danhan') {
      const shortageItems: { sanphamId: string; soluong: number; ghichu?: string }[] = [];
      for (const item of data.sanpham) {
        const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(2));
        const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(2));
        if (receivedQty < shippedQty) {
          const shortage = shippedQty - receivedQty;
          await prisma.tonKho.update({
            where: { sanphamId: item.idSP ?? item.id },
            data: { slton: { increment: shortage } },
          });
          shortageItems.push({
            sanphamId: item.id,
            soluong: shortage,
            ghichu: item.ghichu
              ? `${item.ghichu}; thiếu ${shortage.toFixed(2)}`
              : `Thiếu ${shortage.toFixed(2)}`,
          });
        } else if (receivedQty === shippedQty) {
          await prisma.tonKho.update({
            where: { sanphamId: item.idSP ?? item.id },
            data: { slton: { decrement: receivedQty } },
          });
        }
      }
      if (shortageItems.length > 0) {
        const maphieuNhap = `PN-${data.madonhang}-RET-${moment().format('DDMMYYYY')}`;
        const phieuKhoData = {
          maphieu: maphieuNhap,
          ngay: new Date(data.ngaygiao),
          type: 'nhap',
          khoId: DEFAUL_KHO_ID,
          ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
          isActive: data.isActive ?? true,
          sanpham: {
            create: shortageItems.map((item) => ({
              sanphamId: item.sanphamId,
              soluong: item.soluong,
              ghichu: item.ghichu,
            })),
          },
        };
        await prisma.phieuKho.create({ data: phieuKhoData });
      }
      return prisma.donhang.update({
        where: { id },
        data: {
          status: 'danhan',
          sanpham: {
            updateMany: data.sanpham.map((item: any) => {
              const delivered = parseFloat((item.slgiao ?? 0).toFixed(2));
              const received = parseFloat((item.slnhan ?? 0).toFixed(2));
              const shortageNote =
                received < delivered
                  ? item.ghichu
                    ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(2)}`
                    : `Thiếu ${(delivered - received).toFixed(2)}`
                  : item.ghichu || '';
              return {
                where: { idSP: item.id },
                data: {
                  ghichu: shortageNote,
                  slnhan: received,
                },
              };
            }),
          },
        },
      });
    }

    // 6. Chuyển sang 'hoanthanh'
    if (data.status === 'hoanthanh') {
      return prisma.donhang.update({
        where: { id },
        data: {
          status: 'hoanthanh',
        },
      });
    }

    // 7. Chuyển từ 'danhan' về 'dadat'
    if (oldDonhang.status === 'danhan' && data.status === 'dadat') {
      for (const sp of oldDonhang.sanpham) {
        const incValue = parseFloat((sp.slnhan ?? 0).toFixed(2));
        await prisma.tonKho.update({
          where: { sanphamId: sp.idSP },
          data: {
            slchogiao: { increment: incValue },
            slton: { increment: incValue },
          },
        });
      }
      const maphieuNhap = `PN-${oldDonhang.madonhang}-RET-${moment().format('DDMMYYYY')}`;
      const phieuNhap = await prisma.phieuKho.findUnique({
        where: { maphieu: maphieuNhap },
      });
      if (phieuNhap) {
        await prisma.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: phieuNhap.id },
        });
        await prisma.phieuKho.delete({
          where: { maphieu: maphieuNhap },
        });
      }
      const updatedOrder = await prisma.donhang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          ngaygiao: new Date(data.ngaygiao),
          khachhangId: data.khachhangId,
          isActive: data.isActive,
          order: data.order,
          ghichu: data.ghichu,
          status: 'dadat',
          ...(data.sanpham && data.sanpham.length
            ? {
                sanpham: {
                  updateMany: data.sanpham.map((sp: any) => ({
                    where: { idSP: sp.id },
                    data: {
                      ghichu: sp.ghichu,
                      sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
                      slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                      slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                      ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
                      ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(2)),
                    },
                  })),
                },
              }
            : {}),
        },
      });
      return updatedOrder;
    }

    // 8. Chuyển trực tiếp từ 'dadat' sang 'danhan'
    if (oldDonhang.status === 'dadat' && data.status === 'danhan') {
      for (const sp of data.sanpham) {
        const decValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
        await prisma.tonKho.update({
          where: { sanphamId: sp.id },
          data: {
            slchogiao: { decrement: decValue },
            slton: { decrement: decValue },
          },
        });
      }
      const maphieuNew = `PX-${data.madonhang}-${moment().format('DDMMYYYY')}`;
      const phieuPayload = {
        ngay: new Date(data.ngaygiao),
        type: 'xuat',
        khoId: DEFAUL_KHO_ID,
        ghichu: data.ghichu,
        isActive: data.isActive ?? true,
        sanpham: {
          create: data.sanpham.map((sp: any) => ({
            sanphamId: sp.id,
            soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
            ghichu: sp.ghichu,
          })),        },
      };
      
      // Handle phieuKho upsert manually to avoid unique constraint violation
      const existingPhieu = await prisma.phieuKho.findUnique({
        where: { maphieu: maphieuNew },
        include: { sanpham: true },
      });

      if (existingPhieu) {
        // Delete existing sanpham records first
        await prisma.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: existingPhieu.id },
        });
        
        // Update the phieuKho and create new sanpham records
        await prisma.phieuKho.update({
          where: { maphieu: maphieuNew },
          data: {
            ngay: phieuPayload.ngay,
            type: phieuPayload.type,
            khoId: phieuPayload.khoId,
            ghichu: phieuPayload.ghichu,
            isActive: phieuPayload.isActive,
            sanpham: {
              create: data.sanpham.map((sp: any) => ({
                sanphamId: sp.id,
                soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                ghichu: sp.ghichu,
              })),
            },
          },
        });
      } else {
        // Create new phieuKho with sanpham
        await prisma.phieuKho.create({
          data: {
            maphieu: maphieuNew,
            ngay: phieuPayload.ngay,
            type: phieuPayload.type,
            khoId: phieuPayload.khoId,
            ghichu: phieuPayload.ghichu,
            isActive: phieuPayload.isActive,
            sanpham: {
              create: data.sanpham.map((sp: any) => ({
                sanphamId: sp.id,
                soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                ghichu: sp.ghichu,
              })),
            },
          },
        });
      }
      
      // Xử lý nhận hàng
      const shortageItems: { sanphamId: string; soluong: number; ghichu?: string }[] = [];
      for (const item of data.sanpham) {
        const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(2));
        const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(2));
        if (receivedQty < shippedQty) {
          const shortage = shippedQty - receivedQty;
          await prisma.tonKho.update({
            where: { sanphamId: item.idSP ?? item.id },
            data: { slton: { increment: shortage } },
          });
          shortageItems.push({
            sanphamId: item.id,
            soluong: shortage,
            ghichu: item.ghichu
              ? `${item.ghichu}; thiếu ${shortage.toFixed(2)}`
              : `Thiếu ${shortage.toFixed(2)}`,
          });
        } 
      }
      if (shortageItems.length > 0) {
        const maphieuNhap = `PN-${data.madonhang}-RET-${moment().format('DDMMYYYY')}`;
        const phieuKhoData = {
          maphieu: maphieuNhap,
          ngay: new Date(data.ngaygiao),
          type: 'nhap',
          khoId: DEFAUL_KHO_ID,
          ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
          isActive: data.isActive ?? true,
          sanpham: {
            create: shortageItems.map((item) => ({
              sanphamId: item.sanphamId,
              soluong: item.soluong,
              ghichu: item.ghichu,
            })),
          },
        };
        await prisma.phieuKho.create({ data: phieuKhoData });
      }
      return prisma.donhang.update({
        where: { id },
        data: {
          status: 'danhan',
          sanpham: {
            updateMany: data.sanpham.map((item: any) => {
              const delivered = parseFloat((item.slgiao ?? 0).toFixed(2));
              const received = parseFloat((item.slnhan ?? 0).toFixed(2));
              const shortageNote =
                received < delivered
                  ? item.ghichu
                    ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(2)}`
                    : `Thiếu ${(delivered - received).toFixed(2)}`
                  : item.ghichu || '';
              return {
                where: { idSP: item.id },
                data: {
                  ghichu: shortageNote,
                  slgiao: delivered,
                  slnhan: received,
                },
              };
            }),
          },
        },
      });
    }

    // 9. Nếu trạng thái không thuộc các trường hợp trên, chỉ cập nhật thông tin cơ bản
    return prisma.donhang.update({
      where: { id },
      data: {
        title: data.title,
        type: data.type,
        ngaygiao: new Date(data.ngaygiao),
        khachhangId: data.khachhangId,
        isActive: data.isActive,
        order: data.order,
        ghichu: data.ghichu,
        status: data.status,
      },
    });
  });
}


  
 async danhan(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
      const oldDonhang = await prisma.donhang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!oldDonhang) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }

      // 2. Rollback từ 'dagiao' về 'dadat' và cập nhật lại chi tiết đơn hàng (donhangsanpham)
      if (oldDonhang.status === 'dagiao' && data.status === 'dadat') {
        // 2.1. Rollback tồn kho: tăng lại slchogiao và slton theo slgiao cũ
        for (const sp of oldDonhang.sanpham) {
          const incValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchogiao: { increment: incValue },
              slton: { increment: incValue },
            },
          });
        }

        // 2.2. Xóa phiếu kho dựa theo madonhang cũ
        const maphieuOld = `PX-${oldDonhang.madonhang}`;
        const phieuKho = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuOld },
        });
        if (!phieuKho) {
          throw new NotFoundException('Phiếu kho không tồn tại');
        }
        try {
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: phieuKho.id },
          });
          await prisma.phieuKho.delete({
            where: { maphieu: maphieuOld },
          });
        } catch (error) {
          throw error;
        }

        // 2.3. Cập nhật đơn hàng (update các thông tin đơn hàng và donhangsanpham)
        const updatedOrder = await prisma.donhang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaygiao: new Date(data.ngaygiao),
            khachhangId: data.khachhangId,
            isActive: data.isActive,
            order: data.order,
            ghichu: data.ghichu,
            status: 'dadat',
            ...(data.sanpham && data.sanpham.length
              ? {
                  sanpham: {
                    updateMany: data.sanpham.map((sp: any) => ({
                      where: { idSP: sp.id },
                      data: {
                        ghichu: sp.ghichu,
                        slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                      },
                    })),
                  },
                }
              : {}),
          },
        });

        // 2.4. Cập nhật tồn kho theo chênh lệch giữa số lượng giao mới và cũ
        for (const sp of data.sanpham) {
          const newSlgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
          const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
          const oldSlgiao = oldItem
            ? parseFloat((oldItem.slgiao ?? 0).toFixed(2))
            : 0;
          const difference = newSlgiao - oldSlgiao;
          if (difference !== 0) {
            await prisma.tonKho.update({
              where: { sanphamId: sp.id },
              data: {
                slchogiao:
                  difference > 0
                    ? { decrement: difference }
                    : { increment: -difference },
                slton:
                  difference > 0
                    ? { decrement: difference }
                    : { increment: -difference },
              },
            });
          }
        }

        return updatedOrder;
      }

      // Thêm trường hợp sửa đơn hàng ở trạng thái 'dadat'
      if (oldDonhang.status === 'dadat' && data.status === 'dadat') {
        // Cập nhật tồn kho cho các sản phẩm có trong cả đơn hàng cũ và mới
        for (const sp of data.sanpham) {
          const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
          const oldItem = oldDonhang.sanpham.find((o: any) => o.idSP === sp.id);
          if (oldItem) {
        const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
        const difference = newSldat - oldSldat;
        if (difference !== 0) {
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
          slchogiao:
            difference > 0
              ? { increment: difference }
              : { decrement: Math.abs(difference) },
            },
          });
        }
          } else {
        // Nếu sp mới được thêm vào: tăng slchogiao bằng sldat mới
        await prisma.tonKho.update({
          where: { sanphamId: sp.id },
          data: {
            slchogiao: { increment: newSldat },
          },
        });
          }
        }

        // Xử lý các sản phẩm đã có trong đơn hàng cũ nhưng bị loại bỏ trong đơn hàng mới
        for (const oldItem of oldDonhang.sanpham) {
          const exists = data.sanpham.find((sp: any) => sp.id === oldItem.idSP);
          if (!exists) {
        const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
        await prisma.tonKho.update({
          where: { sanphamId: oldItem.idSP },
          data: {
            slchogiao: { decrement: oldSldat },
          },
        });
          }
        }

        return prisma.donhang.update({
          where: { id },
          data: {
        title: data.title,
        type: data.type,
        ngaygiao: new Date(data.ngaygiao),
        khachhangId: data.khachhangId,
        isActive: data.isActive,
        order: data.order,
        ghichu: data.ghichu,
        ...(data.sanpham && data.sanpham.length
          ? {
          sanpham: {
            deleteMany: {},
            createMany: {
              data: data.sanpham.map((sp: any) => ({
            idSP: sp.id,
            ghichu: sp.ghichu,
            slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
            slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
            ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
              })),
            },
          },
            }
          : {}),
          },
        });
      }      // 3. Chuyển sang 'dagiao' (xuất kho) và cập nhật lại chi tiết đơn hàng
      if (data.status === 'dagiao') {
        // 3.1. Giảm tồn kho
        for (const sp of data.sanpham) {
          const decValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
              slchogiao: { decrement: decValue },
              slton: { decrement: decValue },
            },
          });
        }
        // 3.2. Chuẩn bị payload cho phiếu kho và upsert
        const maphieuNew = `PX-${data.madonhang}`;
        const phieuPayload = {
          ngay: new Date(data.ngaygiao),
          type: 'xuat',
          khoId: DEFAUL_KHO_ID,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.id,
              soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
              ghichu: sp.ghichu,
            })),
          },
        };

        // Handle phieuKho upsert manually to avoid unique constraint violation
        const existingPhieu = await prisma.phieuKho.findUnique({
          where: { maphieu: maphieuNew },
          include: { sanpham: true },
        });

        if (existingPhieu) {
          // Delete existing sanpham records first
          await prisma.phieuKhoSanpham.deleteMany({
            where: { phieuKhoId: existingPhieu.id },
          });
          
          // Update the phieuKho and create new sanpham records
          await prisma.phieuKho.update({
            where: { maphieu: maphieuNew },
            data: {
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: data.sanpham.map((sp: any) => ({
                  sanphamId: sp.id,
                  soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                  ghichu: sp.ghichu,
                })),
              },
            },
          });
        } else {
          // Create new phieuKho with sanpham
          await prisma.phieuKho.create({
            data: {
              maphieu: maphieuNew,
              ngay: phieuPayload.ngay,
              type: phieuPayload.type,
              khoId: phieuPayload.khoId,
              ghichu: phieuPayload.ghichu,
              isActive: phieuPayload.isActive,
              sanpham: {
                create: data.sanpham.map((sp: any) => ({
                  sanphamId: sp.id,
                  soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                  ghichu: sp.ghichu,
                })),
              },
            },
          });
        }

        // 3.3. Cập nhật trạng thái đơn hàng và cập nhật chi tiết donhangsanpham
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'dagiao',
            sanpham: {
              updateMany: data.sanpham.map((sp: any) => ({
                where: { idSP: sp.id },
                data: {
                  ghichu: sp.ghichu,
                  slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                },
              })),
            },
          },
        });
      }

      // 4. Chuyển sang 'danhan' và cập nhật lại chi tiết đơn hàng
      if (data.status === 'danhan') {
        // Mảng lưu thông tin các sản phẩm có số lượng thiếu
        const shortageItems: {
          sanphamId: string;
          soluong: number;
          ghichu?: string;
        }[] = [];

        for (const item of data.sanpham) {
          const receivedQty = parseFloat((item.slnhan ?? 0).toFixed(2));
          const shippedQty = parseFloat((item.slgiao ?? 0).toFixed(2));
          if (receivedQty < shippedQty) {
            const shortage = shippedQty - receivedQty;
            // Cập nhật tồn kho: hoàn lại số lượng chưa nhận
            await prisma.tonKho.update({
              where: { sanphamId: item.idSP },
              data: { slton: { increment: shortage } },
            });
            // Thu thập thông tin sản phẩm thiếu
            shortageItems.push({
              sanphamId: item.id,
              soluong: shortage,
              ghichu: item.ghichu
                ? `${item.ghichu}; thiếu ${shortage.toFixed(2)}`
                : `Thiếu ${shortage.toFixed(2)}`,
            });
          } else if (receivedQty === shippedQty) {
            // Trường hợp nhận đủ số lượng: cập nhật tồn kho (mặc định không thay đổi giá trị)
            await prisma.tonKho.update({
              where: { sanphamId: item.idSP },
              data: { slton: { decrement: receivedQty } },
            });
          }
        }

        // Nếu có sản phẩm thiếu, phát sinh phiếu kho nhập hàng trả về
        if (shortageItems.length > 0) {
          const maphieuNhap = `PN-${data.madonhang}-RET-${moment().format('DDMMYYYY')}`; // Tạo mã phiếu nhập phù hợp
          const phieuKhoData = {
            maphieu: maphieuNhap,
            ngay: new Date(data.ngaygiao), // Ngày nhập có thể sử dụng ngày giao hoặc hiện tại
            type: 'nhap', // Loại phiếu nhập
            khoId: DEFAUL_KHO_ID,
            ghichu: 'Phiếu nhập hàng trả về do thiếu hàng khi nhận',
            isActive: data.isActive ?? true,
            sanpham: {
              create: shortageItems.map((item) => ({
                sanphamId: item.sanphamId,
                soluong: item.soluong,
                ghichu: item.ghichu,
              })),
            },
          };

          await prisma.phieuKho.create({
            data: phieuKhoData,
          });
        }

        // Cập nhật trạng thái đơn hàng và thông tin từng sản phẩm
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'danhan',
            sanpham: {
              updateMany: data.sanpham.map((item: any) => {
                const delivered = parseFloat((item.slgiao ?? 0).toFixed(2));
                const received = parseFloat((item.slnhan ?? 0).toFixed(2));
                const shortageNote =
                  received < delivered
                    ? item.ghichu
                      ? `${item.ghichu}; thiếu ${(delivered - received).toFixed(2)}`
                      : `Thiếu ${(delivered - received).toFixed(2)}`
                    : item.ghichu || '';
                return {
                  where: { idSP: item.id },
                  data: {
                    ghichu: shortageNote,
                    slnhan: received,
                  },
                };
              }),
            },
          },
        });
      }
      if (data.status === 'hoanthanh') {
        return prisma.donhang.update({
          where: { id },
          data: {
            status: 'hoanthanh',
          },
        });
      }
      // Nếu không rơi vào các trường hợp trên, sử dụng logic cập nhật phiếu giao (updatePhieugiao)
      // return this.updatePhieugiao(id, data);
    });
  }
async dagiao(id: string, data: any) {
  return this.prisma.$transaction(async (prisma) => {
    // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
    const oldDonhang = await prisma.donhang.findUnique({
      where: { id },
      include: { sanpham: true },
    });
    if (!oldDonhang) {
      return {
        message: 'Đơn hàng không tồn tại',
        code: 'NOT_FOUND',
        result: null,
      };
    }

    // 3. Chuyển sang 'dagiao' (xuất kho) và cập nhật lại chi tiết đơn hàng
    if (data.status === 'dagiao') {
      // 3.1. Giảm tồn kho
      for (const sp of data.sanpham) {
        const decValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
        await prisma.tonKho.update({
          where: { sanphamId: sp.id },
          data: {
            slchogiao: { decrement: decValue },
            slton: { decrement: decValue },
          },
        });
      }
      // 3.2. Chuẩn bị payload cho phiếu kho và upsert
      const maphieuNew = `PX-${data.madonhang}`;
      const phieuPayload = {
        ngay: new Date(data.ngaygiao),
        type: 'xuat',
        khoId: DEFAUL_KHO_ID,
        ghichu: data.ghichu,
        isActive: data.isActive ?? true,
        sanpham: {
          create: data.sanpham.map((sp: any) => ({
            sanphamId: sp.id,
            soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
            ghichu: sp.ghichu,
          })),        },
      };

      // Handle phieuKho upsert manually to avoid unique constraint violation
      const existingPhieu = await prisma.phieuKho.findUnique({
        where: { maphieu: maphieuNew },
        include: { sanpham: true },
      });

      if (existingPhieu) {
        // Delete existing sanpham records first
        await prisma.phieuKhoSanpham.deleteMany({
          where: { phieuKhoId: existingPhieu.id },
        });
        
        // Update the phieuKho and create new sanpham records
        await prisma.phieuKho.update({
          where: { maphieu: maphieuNew },
          data: {
            ngay: phieuPayload.ngay,
            type: phieuPayload.type,
            khoId: phieuPayload.khoId,
            ghichu: phieuPayload.ghichu,
            isActive: phieuPayload.isActive,
            sanpham: {
              create: data.sanpham.map((sp: any) => ({
                sanphamId: sp.id,
                soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                ghichu: sp.ghichu,
              })),
            },
          },
        });
      } else {
        // Create new phieuKho with sanpham
        await prisma.phieuKho.create({
          data: {
            maphieu: maphieuNew,
            ngay: phieuPayload.ngay,
            type: phieuPayload.type,
            khoId: phieuPayload.khoId,
            ghichu: phieuPayload.ghichu,
            isActive: phieuPayload.isActive,
            sanpham: {
              create: data.sanpham.map((sp: any) => ({
                sanphamId: sp.id,
                soluong: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                ghichu: sp.ghichu,
              })),
            },
          },
        });
      }

      // 3.3. Cập nhật trạng thái đơn hàng và cập nhật chi tiết donhangsanpham
      const updatedOrder = await prisma.donhang.update({
        where: { id },
        data: {
          status: 'dagiao',
          sanpham: {
            updateMany: data.sanpham.map((sp: any) => ({
              where: { idSP: sp.id },
              data: {
                ghichu: sp.ghichu,
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
              },
            })),
          },
        },
      });
      return {
        message: 'Cập nhật trạng thái đơn hàng sang "Đã giao" thành công',
        code: 'SUCCESS',
        result: updatedOrder,
      };
    }
    return {
      message: 'Trạng thái không hợp lệ hoặc không thay đổi',
      code: 'INVALID_STATUS',
      result: null,
    };
  });
}

  async updatePhieugiao(id: string, data: any) {
    try {
      console.log(data);

      return await this.prisma.$transaction(async (prisma) => {
        const updatedDonhang = await prisma.donhang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            madonhang: data.madonhang,
            ngaygiao: new Date(data.ngaygiao),
            khachhangId: data.khachhangId,
            isActive: data.isActive,
            status: data.status,
            order: data.order,
            ghichu: data.ghichu,
            printCount: data.printCount,
            sanpham: {
              deleteMany: {},
              create: data.sanpham.map((sp: any) => ({
                idSP: sp.id,
                ghichu: sp.ghichu,
                slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
                slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
                ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
              })),
            },
          },
          include: {
            sanpham: true,
          },
        });

        return updatedDonhang;
      });
    } catch (error) {
      console.error('Error updating phieugiao:', error);
      throw error;
    }
  }


  async updateBulk(ids: string[], status: string) {
    return this.prisma.$transaction(async (prisma) => {
      let success = 0;
      let fail = 0;

      for (const id of ids) {
        try {
          // 1. Lấy đơn hàng cũ kèm chi tiết sản phẩm
          const oldDonhang = await prisma.donhang.findUnique({
            where: { id },
            include: { sanpham: true },
          });
          
          if (!oldDonhang) {
            fail++;
            continue;
          }

          // 2. Chuyển từ 'dadat' sang 'danhan'
          if (oldDonhang.status === 'dadat' && status === 'danhan') {
            // Giảm tồn kho cho từng sản phẩm
            for (const sp of oldDonhang.sanpham) {
              const decValue = parseFloat((sp.sldat ?? 0).toFixed(2));
              await prisma.tonKho.update({
                where: { sanphamId: sp.idSP },
                data: {
                  slchogiao: { decrement: decValue },
                  slton: { decrement: decValue },
                },
              });
            }

            // Deduplicate products and aggregate quantities
            const uniqueSanpham = oldDonhang.sanpham.reduce((acc: any[], sp: any) => {
              const existing = acc.find(item => item.sanphamId === sp.idSP);
              if (existing) {
                existing.soluong += parseFloat((sp.sldat ?? 0).toFixed(2));
              } else {
                acc.push({
                  sanphamId: sp.idSP,
                  soluong: parseFloat((sp.sldat ?? 0).toFixed(2)),
                  ghichu: sp.ghichu,
                });
              }
              return acc;
            }, []);

            // Tạo phiếu xuất kho
            const maphieuNew = `PX-${oldDonhang.madonhang}-${moment().format('DDMMYYYY')}`;
            const phieuPayload = {
              ngay: oldDonhang.ngaygiao ? new Date(oldDonhang.ngaygiao) : new Date(),
              type: 'xuat',
              khoId: DEFAUL_KHO_ID,
              ghichu: oldDonhang.ghichu || 'Xuất kho hàng loạt',
              isActive: true,
            };

            // Handle phieuKho upsert manually to avoid unique constraint violation
            const existingPhieu = await prisma.phieuKho.findUnique({
              where: { maphieu: maphieuNew },
              include: { sanpham: true },
            });

            if (existingPhieu) {
              // Delete existing sanpham records first
              await prisma.phieuKhoSanpham.deleteMany({
                where: { phieuKhoId: existingPhieu.id },
              });
              
              // Update the phieuKho and create new sanpham records
              await prisma.phieuKho.update({
                where: { maphieu: maphieuNew },
                data: {
                  ngay: phieuPayload.ngay,
                  type: phieuPayload.type,
                  khoId: phieuPayload.khoId,
                  ghichu: phieuPayload.ghichu,
                  isActive: phieuPayload.isActive,
                  sanpham: {
                    create: uniqueSanpham,
                  },
                },
              });
            } else {
              // Create new phieuKho with sanpham
              await prisma.phieuKho.create({
                data: {
                  maphieu: maphieuNew,
                  ngay: phieuPayload.ngay,
                  type: phieuPayload.type,
                  khoId: phieuPayload.khoId,
                  ghichu: phieuPayload.ghichu,
                  isActive: phieuPayload.isActive,
                  sanpham: {
                    create: uniqueSanpham,
                  },
                },
              });
            }

            // Cập nhật trạng thái đơn hàng và số liệu
            await prisma.donhang.update({
              where: { id },
              data: {
                status: 'danhan',
                sanpham: {
                  updateMany: oldDonhang.sanpham.map((sp: any) => ({
                    where: { idSP: sp.idSP },
                    data: {
                      slgiao: parseFloat((sp.sldat ?? 0).toFixed(2)),
                      slnhan: parseFloat((sp.sldat ?? 0).toFixed(2)),
                    },
                  })),
                },
              },
            });

            success++;
          } else {
            fail++;
          }
        } catch (error) {
          console.error(`Error updating donhang ${id}:`, error);
          fail++;
        }
      }

      return { success, fail };
    },
  );
  }

  async remove(id: string) {
    // return this.prisma.$transaction(async (prisma) => {
    //   // 1. Lấy đơn hàng bao gồm chi tiết sản phẩm
    //   const donhang = await prisma.donhang.findUnique({
    //     where: { id },
    //     include: { sanpham: true },
    //   });
    //   if (!donhang) {
    //     throw new NotFoundException('Đơn hàng không tồn tại');
    //   }

    //   // 2. Cập nhật TONKHO cho từng sản phẩm theo trạng thái đơn hàng
    //   for (const sp of donhang.sanpham) {
    //     const sldat = parseFloat((sp.sldat ?? 0).toFixed(2));
    //     if (donhang.status === 'dagiao' || donhang.status === 'danhan') {
    //       const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
    //       await prisma.tonKho.update({
    //         where: { sanphamId: sp.idSP },
    //         data: {
    //           // Loại bỏ số lượng đơn hàng đã thêm ban đầu
    //           slchogiao: { decrement: sldat },
    //           // Cộng lại số lượng đã giao đã trừ khi xuất kho
    //           slton: { increment: slgiao },
    //         },
    //       });
    //     } else {
    //       await prisma.tonKho.update({
    //         where: { sanphamId: sp.idSP },
    //         data: {
    //           slchogiao: { decrement: sldat },
    //         },
    //       });
    //     }
    //   }
    //   // 3. Xóa đơn hàng
    //   return prisma.donhang.delete({ where: { id } });
    // });
  }


async removeBulk(ids: string[]) {
  return this.prisma.$transaction(async (prisma) => {
    let success = 0;
    let fail = 0;
    for (const id of ids) {
      try {
        // 1. Lấy đơn hàng bao gồm chi tiết sản phẩm
        const donhang = await prisma.donhang.findUnique({
          where: { id },
          include: { sanpham: true },
        });
        if (!donhang) {
          fail++;
          continue;
        }

        // 2. Cập nhật TONKHO cho từng sản phẩm theo trạng thái đơn hàng
        for (const sp of donhang.sanpham) {
          const sldat = parseFloat((sp.sldat ?? 0).toFixed(2));
          if (donhang.status === 'dagiao' || donhang.status === 'danhan') {
            const slgiao = parseFloat((sp.slgiao ?? 0).toFixed(2));
            await prisma.tonKho.update({
              where: { sanphamId: sp.idSP },
              data: {
                slton: { increment: slgiao },
              },
            });
          } else {
            await prisma.tonKho.update({
              where: { sanphamId: sp.idSP },
              data: {
                slchogiao: { decrement: sldat },
              },
            });
          }
        }

        // 3. Xóa phiếu kho liên quan nếu có
        const maphieuXuat = `PX-${donhang.madonhang}-${moment().format('DDMMYYYY')}`;
        const maphieuNhap = `PN-${donhang.madonhang}-RET-${moment().format('DDMMYYYY')}`;
        // Xóa phiếu xuất kho
        const phieuXuat = await prisma.phieuKho.findUnique({ where: { maphieu: maphieuXuat } });
        if (phieuXuat) {
          await prisma.phieuKhoSanpham.deleteMany({ where: { phieuKhoId: phieuXuat.id } });
          await prisma.phieuKho.delete({ where: { maphieu: maphieuXuat } });
        }
        // Xóa phiếu nhập kho trả về (nếu có)
        const phieuNhap = await prisma.phieuKho.findUnique({ where: { maphieu: maphieuNhap } });
        if (phieuNhap) {
          await prisma.phieuKhoSanpham.deleteMany({ where: { phieuKhoId: phieuNhap.id } });
          await prisma.phieuKho.delete({ where: { maphieu: maphieuNhap } });
        }

        // 4. Xóa đơn hàng
        await prisma.donhang.delete({ where: { id } });
        success++;
      } catch (error) {
        fail++;
      }
    }
    return { success, fail };
  });
}




  async findByProductId(idSP: string) {
    console.log(idSP);
    
  const donhangs = await this.prisma.donhang.findMany({
    where: {
      sanpham: {
        some: { idSP },
      },
    },
    include: {
      sanpham: {
        where: { idSP },
        include: {
          sanpham: true,
        },
      },
      khachhang: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  console.log(donhangs);
  
  return donhangs.map((donhang) => ({
    ...donhang,
    sanpham: donhang.sanpham.find((item: any) => item.idSP === idSP)
  }));
}
}

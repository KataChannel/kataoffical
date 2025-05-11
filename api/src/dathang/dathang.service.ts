import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
const DEFAUL_KHO_ID = '4cc01811-61f5-4bdc-83de-a493764e9258'; // Kho mặc định, cần thay đổi theo yêu cầu thực tế
@Injectable()
export class DathangService {
  constructor(private readonly prisma: PrismaService) {}

  async generateNextOrderCode(): Promise<string> {
    // Lấy mã đơn hàng gần nhất
    const lastOrder = await this.prisma.dathang.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    let nextCode = 'TGNCC-AA00001'; // Mã đầu tiên

    if (lastOrder && lastOrder.madncc) {
      nextCode = this.incrementOrderCode(lastOrder.madncc);
    }
    return nextCode;
  }
  private incrementOrderCode(orderCode: string): string {
    const prefix = 'TGNCC-';
    const letters = orderCode.slice(6, 8); // Lấy AA → ZZ
    const numbers = parseInt(orderCode.slice(8), 13); // Lấy 00001 → 99999

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

  async reorderDathangs(dathangIds: string[]) {
    // Update the order of each dathang based on its position in the array
    for (let i = 0; i < dathangIds.length; i++) {
      await this.prisma.dathang.update({
        where: { id: dathangIds[i] },
        data: { order: i + 1 },
      });
    }
  }
  async findAll() {
    const dathangs = await this.prisma.dathang.findMany({
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        nhacungcap: true,
      },
    });
    return dathangs.map((dathang) => ({
      ...dathang,
      sanpham: dathang.sanpham.map((item: any) => ({
        ...item.sanpham,
        idSP: item.idSP,
        sldat: item.sldat || 0,
        slgiao: item.slgiao || 0,
        slnhan: item.slnhan || 0,
        ttdat: item.ttdat || 0,
        ttgiao: item.ttgiao || 0,
        ttnhan: item.ttnhan || 0,
        ghichu: item.ghichu,
      })),
    }));
  }

  async findOne(id: string) {
    // const dathang = await this.prisma.dathang.findUnique({ where: { id } });
    const dathang = await this.prisma.dathang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        nhacungcap: true,
      },
    });
    if (!dathang) throw new NotFoundException('Dathang not found');
    return {
      ...dathang,
      sanpham: dathang.sanpham.map((item) => ({
      ...item.sanpham,
      idSP: item.idSP,
      sldat: Number(item.sldat),
      slgiao: Number(item.slgiao),
      slnhan: Number(item.slnhan),
      slhuy: Number(item.slhuy),
      ttdat: Number(item.ttdat),
      ttgiao: Number(item.ttgiao),
      ttnhan: Number(item.ttnhan),
      ghichu: item.ghichu,
      })),
    };
  }

  // async create(data: any) {
  //   return this.prisma.$transaction(async (prisma) => {
  //     const madathang = await this.generateNextOrderCode();
  //     console.log(madathang);

  //     const newDathang = await prisma.dathang.create({
  //       data: {
  //         title: data.title,
  //         type: data.type,
  //         madncc: madathang,
  //         ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : new Date(),
  //         ghichu: data.ghichu,
  //         nhacungcapId: data.nhacungcapId,
  //         order: data.order,
  //         isActive: data.isActive,
  //         sanpham: {
  //           create: data.sanpham?.map((sp: any) => ({
  //             idSP: sp.id,
  //             sldat: sp.sldat,
  //             slgiao: sp.slgiao,
  //             slnhan: sp.slnhan,
  //             ttdat: sp.ttdat || 0,
  //             ttgiao: sp.ttgiao || 0,
  //             ttnhan: sp.ttnhan || 0,
  //             ghichu: sp.ghichu,
  //             order: sp.order,
  //             isActive: sp.isActive,
  //           })),
  //         },
  //       },
  //       include: { sanpham: true },
  //     });

  //     // Cập nhật số lượng sản phẩm trong kho (tăng số lượng nhận)
  //     for (const sp of data.sanpham) {
  //       await prisma.sanpham.update({
  //         where: { id: sp.id },
  //         data: {
  //           soluong: {
  //             decrement: parseFloat((sp.sldat ?? 0).toFixed(2))
  //           },
  //         },
  //       });
  //     }

  //     // Tạo phiếu nhập kho tương ứng
  //     await prisma.phieuKho.create({
  //       data: {
  //         maphieu: `PN-${newDathang.madncc}`, // Mã phiếu nhập kho dựa trên ID đơn hàng
  //         khoId: DEFAUL_KHO_ID,        // Cập nhật khoId phù hợp
  //         type: 'nhap',                   // Loại phiếu nhập (nhập kho)
  //         ngay: newDathang.ngaynhan || new Date(),        // Sử dụng ngày nhận từ đơn hàng
  //         ghichu: `Phiếu nhập kho cho đơn hàng ${newDathang.title}`,
  //         sanpham: {
  //           create: data?.sanpham?.map((sp: any) => ({
  //             sanphamId: sp.id,
  //             sldat: sp.sldat,
  //             soluong: sp.sldat,
  //             ghichu: sp.ghichu,
  //           })),
  //         },
  //       },
  //     });

  //     return newDathang;
  //   });
  // }

  async create(dto: any) {
    const madathang = await this.generateNextOrderCode();
    return this.prisma.$transaction(async (prisma) => {
      // Verify that the associated supplier (nhacungcap) exists
      const nhacungcap = await prisma.nhacungcap.findUnique({
        where: { id: dto.id },
      });
      if (!nhacungcap)
        throw new NotFoundException('Nhà cung cấp không tồn tại');

      // Create the new order (đặt hàng) using the generated order code
      const newDathang = await prisma.dathang.create({
        data: {
          title: dto.title,
          type: dto.type,
          madncc: madathang,
          ngaynhan: dto.ngaynhan ? new Date(dto.ngaynhan) : new Date(),
          nhacungcapId: nhacungcap.id,
          isActive: dto.isActive !== undefined ? dto.isActive : true,
          order: dto.order,
          ghichu: dto.ghichu,
          sanpham: {
            create: dto?.sanpham?.map((sp: any) => ({
              idSP: sp.id,
              ghichu: sp.ghichu,
              sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
              slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
              slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
              slhuy: parseFloat((sp.slhuy ?? 0).toFixed(2)),
              ttdat: parseFloat((sp.ttdat ?? 0).toFixed(2)),
              ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
              ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(2)),
            })),
          },
        },
        include: { sanpham: true },
      });

      // Update warehouse inventory for dathang: upsert tonKho, increment slchogiao based on sldat
      for (const sp of dto.sanpham) {
        const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(2));
        await prisma.tonKho.upsert({
          where: { sanphamId: sp.id },
          update: {
            slchonhap: { increment: incrementValue },
          },
          create: {
            sanphamId: sp.id,
            slchonhap: incrementValue,
          },
        });
      }
      return newDathang;
    });
  }

  async createbynhucau(dto: any) {
    const madathang = await this.generateNextOrderCode();
    return this.prisma.$transaction(async (prisma) => {
      // Verify that the associated supplier (nhacungcap) exists
      const nhacungcap = await prisma.nhacungcap.findUnique({
        where: { id: dto.id },
      });
      if (!nhacungcap)
        throw new NotFoundException('Nhà cung cấp không tồn tại');

      // Create the new order (đặt hàng) using the generated order code
      const newDathang = await prisma.dathang.create({
        data: {
          title: dto.title,
          type: dto.type,
          madncc: madathang,
          ngaynhan: dto.ngaynhan ? new Date(dto.ngaynhan) : new Date(),
          nhacungcapId: nhacungcap.id,
          isActive: dto.isActive !== undefined ? dto.isActive : true,
          order: dto.order,
          ghichu: dto.ghichu,
          sanpham: {
            create: dto?.sanpham?.map((sp: any) => ({
              idSP: sp.id,
              ghichu: sp.ghichu,
              sldat: parseFloat((sp.sldat ?? 0).toFixed(2)),
              slgiao: parseFloat((sp.slgiao ?? 0).toFixed(2)),
              slnhan: parseFloat((sp.slnhan ?? 0).toFixed(2)),
              slhuy: parseFloat((sp.slhuy ?? 0).toFixed(2)),
              ttdat: parseFloat((sp.ttdat ?? 0).toFixed(2)),
              ttgiao: parseFloat((sp.ttgiao ?? 0).toFixed(2)),
              ttnhan: parseFloat((sp.ttnhan ?? 0).toFixed(2)),
            })),
          },
        },
        include: { sanpham: true },
      });

      // Update warehouse inventory for dathang: upsert tonKho, increment slchogiao based on sldat
      for (const sp of dto.sanpham) {
        const incrementValue = parseFloat((sp.sldat ?? 0).toFixed(2));
        await prisma.tonKho.upsert({
          where: { sanphamId: sp.id },
          update: {
            slchonhap: { increment: incrementValue },
          },
          create: {
            sanphamId: sp.id,
            slchonhap: incrementValue,
          },
        });
      }
      return newDathang;
    });
  }

  async update(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Lấy đơn đặt hàng cũ kèm chi tiết sản phẩm
      const oldDathang = await prisma.dathang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!oldDathang) {
        throw new NotFoundException('Đơn đặt hàng không tồn tại');
      }

      // 2. Rollback từ 'dagiao' về 'dadat'
      if (oldDathang.status === 'dagiao' && data.status === 'dadat') {
        // 2.1. Hoàn lại slchonhap
        for (const sp of oldDathang.sanpham) {
          const incValue = parseFloat((sp.slgiao ?? 0).toFixed(2));
          await prisma.tonKho.update({
            where: { sanphamId: sp.idSP },
            data: {
              slchonhap: { increment: incValue },
            },
          });
        }

        // 2.2. Xóa phiếu kho xuất
        const maphieuOld = `PX-${oldDathang.madncc}`;
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

        // 2.3. Cập nhật đơn đặt hàng
        const updatedDathang = await prisma.dathang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
            nhacungcapId: data.nhacungcapId,
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
                        slgiao: 0, // Reset slgiao
                        slnhan: 0, // Reset slnhan
                        slhuy: 0, // Reset slhuy
                      },
                    })),
                  },
                }
              : {}),
          },
        });

        // 2.4. Cập nhật slchonhap theo chênh lệch sldat
        for (const sp of data.sanpham) {
          const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
          const oldItem = oldDathang.sanpham.find((o: any) => o.idSP === sp.id);
          const oldSlgiao = oldItem
            ? parseFloat((oldItem.slgiao ?? 0).toFixed(2))
            : 0;
          const difference = newSldat - oldSlgiao;
          if (difference !== 0) {
            await prisma.tonKho.update({
              where: { sanphamId: sp.id },
              data: {
                slchonhap:
                  difference > 0
                    ? { increment: difference }
                    : { decrement: -difference },
              },
            });
          }
        }

        return updatedDathang;
      }

      // 3. Cập nhật đơn ở trạng thái 'dadat'
      if (oldDathang.status === 'dadat' && data.status === 'dadat') {
        // 3.1. Cập nhật slchonhap theo chênh lệch sldat
        for (const sp of data.sanpham) {
          const oldItem = oldDathang.sanpham.find((o: any) => o.idSP === sp.id);
          if (oldItem) {
            const newSldat = parseFloat((sp.sldat ?? 0).toFixed(2));
            const oldSldat = parseFloat((oldItem.sldat ?? 0).toFixed(2));
            const difference = newSldat - oldSldat;
            if (difference !== 0) {
              await prisma.tonKho.update({
                where: { sanphamId: sp.id },
                data: {
                  slchonhap: { increment: difference },
                },
              });
            }
          }
        }

        // 3.2. Cập nhật thông tin đơn đặt hàng
        return prisma.dathang.update({
          where: { id },
          data: {
            title: data.title,
            type: data.type,
            ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : undefined,
            nhacungcapId: data.nhacungcapId,
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
                        slhuy: parseFloat((sp.slhuy ?? 0).toFixed(2)),
                      },
                    })),
                  },
                }
              : {}),
          },
        });
      }

      // 4. Chuyển sang 'dagiao' (xuất kho từ nhà cung cấp)
      if (data.status === 'dagiao') {
        // 4.1. Giảm slchonhap
        for (const sp of data.sanpham) {
          const decValue = parseFloat((Number(sp.slgiao) ?? 0).toFixed(2));
          await prisma.tonKho.update({
            where: { sanphamId: sp.id },
            data: {
              slchonhap: { decrement: decValue },
            },
          });
        }

        // 4.2. Tạo/upsert phiếu kho xuất
        const maphieuNew = `PX-${data.madncc}`;
        const phieuPayload = {
          ngay: data.ngaynhan ? new Date(data.ngaynhan) : new Date(),
          type: 'xuat',
          khoId: DEFAUL_KHO_ID,
          madncc: data.madncc,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.id,
              soluong: parseFloat((Number(sp.slgiao) ?? 0).toFixed(2)),
              ghichu: sp.ghichu,
            })),
          },
        };
        await prisma.phieuKho.upsert({
          where: { maphieu: maphieuNew },
          create: { maphieu: maphieuNew, ...phieuPayload },
          update: phieuPayload,
        });

        // 4.3. Cập nhật trạng thái đơn đặt hàng
        return prisma.dathang.update({
          where: { id },
          data: {
            status: 'dagiao',
            sanpham: {
              updateMany: data.sanpham.map((sp: any) => ({
                where: { idSP: sp.id },
                data: {
                  ghichu: sp.ghichu,
                  slgiao: parseFloat((Number(sp.slgiao) ?? 0).toFixed(2)),
                },
              })),
            },
          },
        });
      }

      // 5. Chuyển sang 'danhan' (nhập kho, xử lý hao hụt)
      if (data.status === 'danhan') {
        // Mảng lưu thông tin các sản phẩm có số lượng thiếu
        const shortageItems: {
          sanphamId: string;
          soluong: number;
          ghichu?: string;
        }[] = [];

        for (const item of data.sanpham) {
          const receivedQty = parseFloat((Number(item.slnhan) ?? 0).toFixed(2));
          const shippedQty = parseFloat((Number(item.slgiao) ?? 0).toFixed(2));
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
        // Nếu số lượng nhận bằng số lượng giao, cập nhật tồn kho (không thay đổi số lượng)
        await prisma.tonKho.update({
          where: { sanphamId: item.idSP },
          data: { slton: { increment: receivedQty} },
        });
          }
        }

        // Nếu có sản phẩm thiếu, phát sinh phiếu kho nhập hàng trả về
        if (shortageItems.length > 0) {
          // Sử dụng mã đơn hàng hiện có (madncc) để tạo mã phiếu kho nhập
          const maphieuNhap = `PX-${oldDathang.madncc}-RET`;
          const phieuKhoData = {
        maphieu: maphieuNhap,
        ngay: new Date(data.ngaygiao), // Ngày nhập có thể sử dụng ngày giao hoặc hiện tại
        type: 'xuat', // Loại phiếu xuất
        khoId: DEFAUL_KHO_ID,
        ghichu: 'Phiếu xuất hàng trả về do thiếu hàng khi nhận',
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

        // Cập nhật trạng thái đơn đặt hàng và thông tin từng sản phẩm
        return prisma.dathang.update({
          where: { id },
          data: {
        status: 'danhan',
        sanpham: {
          updateMany: data.sanpham.map((item: any) => {
            const delivered = parseFloat((Number(item.slgiao) ?? 0).toFixed(2));
            const received = parseFloat((Number(item.slnhan) ?? 0).toFixed(2));
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

      // 6. Chuyển sang 'huy'
      if (data.status === 'huy') {
        // 6.1. Hoàn lại slchonhap
        for (const sp of oldDathang.sanpham) {
          const incValue = parseFloat((sp.sldat ?? 0).toFixed(2));
          if (incValue > 0) {
            await prisma.tonKho.update({
              where: { sanphamId: sp.idSP },
              data: {
                slchonhap: { decrement: incValue },
              },
            });
          }
        }

        // 6.2. Xóa phiếu kho nếu có
        const maphieuOld = `PX-${oldDathang.madncc}`;
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

        // 6.3. Cập nhật trạng thái đơn đặt hàng
        return prisma.dathang.update({
          where: { id },
          data: {
            status: 'huy',
            ghichu: data.ghichu || 'Đơn đặt hàng đã hủy',
            sanpham: {
              updateMany: oldDathang.sanpham.map((sp: any) => ({
                where: { idSP: sp.idSP },
                data: {
                  slgiao: 0,
                  slnhan: 0,
                  slhuy: parseFloat((sp.sldat ?? 0).toFixed(2)),
                  ghichu: sp.ghichu || 'Hủy đơn đặt hàng',
                },
              })),
            },
          },
        });
      }

      throw new Error('Trạng thái không hợp lệ');
    });
  }

  async remove(id: string) {
    return this.prisma.dathang.delete({ where: { id } });
  }
}

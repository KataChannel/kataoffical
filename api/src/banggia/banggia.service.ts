import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class BanggiaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly _SocketGateway: SocketGateway
  ) {}

  async importSPBG(listBanggia: any[]) {
    try {
      const productIds = Array.from(
        listBanggia.flatMap(bg => bg?.sanpham?.map((sp: any) => sp.masp) || [])
      );
      const products = await this.prisma.sanpham.findMany({
        where: { masp: { in: productIds } },
      });
      const productMap = new Map(products.map(p => [p.masp, p]));

      for (const bg of listBanggia) {
        for (const sp of bg.sanpham) {
          if (!productMap.has(sp.masp)) {
            throw new NotFoundException(`Sanpham with ID "${sp.masp}" not found`);
          }
          sp.id = productMap.get(sp.masp)!.id;
        }
      }

      const mabanggiaList = listBanggia.map(bg => bg.mabanggia);
      const existingBanggias = await this.prisma.banggia.findMany({
        where: { mabanggia: { in: mabanggiaList } },
      });
      const banggiaMap = new Map(existingBanggias.map(bg => [bg.mabanggia, bg]));

      await Promise.all(
        listBanggia.map(async (bg) => {
          const now = new Date();
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
        })
      );

      return {};
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error importing san pham bang gia'
      );
    }
  }

  async importBanggia(data: any) {
    try {
      const existing = await this.prisma.banggia.findFirst({
        where: { mabanggia: data.mabanggia },
      });
      if (existing) {
        const result = await this.update(existing.id, data);
        return result;
      } else {
        const result = await this.createBanggia(data);
        return result;
      }
    } catch (error) {
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
      // For each banggia, update or create associated khachhangs
      for (const mabanggia in grouped) {
        const items = grouped[mabanggia];
        const existingBanggia = await this.prisma.banggia.findFirst({
          where: { mabanggia },
          include: { khachhang: true },
        });
        if (existingBanggia) {
          // For each khachhang item, update if exists (by makh) or create new one
          for (const item of items) {
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
      }
      return results;
    } catch (error) {
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
      const result = await this.prisma.banggia.create({
        data: {
          title: data.title,
          mabanggia: data.mabanggia,
          type: data.type || 'bansi',
          status: data.status || 'baogia',
          batdau: data.batdau ? new Date(data.batdau) : null,
          ketthuc: data.ketthuc ? new Date(data.ketthuc) : null,
          isActive: data.isActive ?? false,
          sanpham: {
            create: data.sanpham?.map((sp: any) => ({
              sanphamId: sp.id,
              giaban: Number(sp.giaban) || 0,
            })),
          },
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
          giaban: item.giaban,
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
      const existingBanggia = await this.prisma.banggia.findUnique({ where: { id } });
      if (!existingBanggia) {
        throw new NotFoundException(`Banggia with ID "${id}" not found`);
      }
      this._SocketGateway.sendBanggiaUpdate();
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

  async remove(id: string) {
    try {
      const result = await this.prisma.banggia.delete({ where: { id } });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Error removing banggia'
      );
    }
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
}

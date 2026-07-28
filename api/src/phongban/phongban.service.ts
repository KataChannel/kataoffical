import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePhongbanDto, UpdatePhongbanDto } from './dto';
import { Phongban, Prisma } from '@prisma/client';

@Injectable()
export class PhongbanService {
  constructor(private prisma: PrismaService) {}

  async create(createPhongbanDto: CreatePhongbanDto): Promise<Phongban> {
    try {
      // Kiểm tra mã phòng ban đã tồn tại chưa
      const existing = await this.prisma.phongban.findUnique({
        where: { ma: createPhongbanDto.ma }
      });

      if (existing) {
        throw new ConflictException(`Phòng ban với mã ${createPhongbanDto.ma} đã tồn tại`);
      }

      // Tính level nếu có parent
      let level = 1;
      if (createPhongbanDto.parentId) {
        const parent = await this.prisma.phongban.findUnique({
          where: { id: createPhongbanDto.parentId }
        });
        
        if (!parent) {
          throw new NotFoundException(`Phòng ban cha với ID ${createPhongbanDto.parentId} không tồn tại`);
        }
        
        level = parent.level + 1;
      }

      return await this.prisma.phongban.create({
        data: {
          ...createPhongbanDto,
          level
        },
        include: {
          parent: true,
          truongPhong: true,
          _count: {
            select: {
              children: true,
              nhanviens: true
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Lỗi khi tạo phòng ban: ${error.message}`);
    }
  }

  async findAll(options?: {
    level?: number;
    loai?: string;
    parentId?: string;
    includeChildren?: boolean;
  }): Promise<Phongban[]> {
    const where: Prisma.PhongbanWhereInput = {};

    if (options?.level) {
      where.level = options.level;
    }
    if (options?.loai) {
      where.loai = options.loai as any;
    }
    if (options?.parentId !== undefined) {
      where.parentId = options.parentId === 'null' ? null : options.parentId;
    }

    return await this.prisma.phongban.findMany({
      where,
      include: {
        parent: true,
        truongPhong: true,
        children: options?.includeChildren,
        _count: {
          select: {
            children: true,
            nhanviens: true
          }
        }
      },
      orderBy: [
        { level: 'asc' },
        { ma: 'asc' }
      ]
    });
  }

  async findOne(id: string): Promise<Phongban> {
    const phongban = await this.prisma.phongban.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        truongPhong: true,
        nhanviens: {
          orderBy: { maNV: 'asc' }
        },
        _count: {
          select: {
            children: true,
            nhanviens: true
          }
        }
      }
    });

    if (!phongban) {
      throw new NotFoundException(`Phòng ban với ID ${id} không tồn tại`);
    }

    return phongban;
  }

  async findByMa(ma: string): Promise<Phongban> {
    const phongban = await this.prisma.phongban.findUnique({
      where: { ma },
      include: {
        parent: true,
        children: true,
        truongPhong: true,
        nhanviens: true,
        _count: {
          select: {
            children: true,
            nhanviens: true
          }
        }
      }
    });

    if (!phongban) {
      throw new NotFoundException(`Phòng ban với mã ${ma} không tồn tại`);
    }

    return phongban;
  }

  async getTree(): Promise<Phongban[]> {
    // Lấy tất cả phòng ban cấp 1 (root)
    return await this.prisma.phongban.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            children: {
              include: {
                children: true,
                _count: {
                  select: { nhanviens: true }
                }
              }
            },
            _count: {
              select: { nhanviens: true }
            }
          }
        },
        _count: {
          select: { nhanviens: true }
        }
      },
      orderBy: { ma: 'asc' }
    });
  }

  async update(id: string, updatePhongbanDto: UpdatePhongbanDto): Promise<Phongban> {
    try {
      // Kiểm tra phòng ban tồn tại
      await this.findOne(id);

      // Nếu đổi parent, cần tính lại level
      let level: number | undefined;
      if (updatePhongbanDto.parentId !== undefined) {
        if (updatePhongbanDto.parentId === null) {
          level = 1;
        } else {
          const parent = await this.prisma.phongban.findUnique({
            where: { id: updatePhongbanDto.parentId }
          });
          
          if (!parent) {
            throw new NotFoundException(`Phòng ban cha với ID ${updatePhongbanDto.parentId} không tồn tại`);
          }
          
          level = parent.level + 1;
        }
      }

      return await this.prisma.phongban.update({
        where: { id },
        data: {
          ...updatePhongbanDto,
          ...(level !== undefined && { level })
        },
        include: {
          parent: true,
          children: true,
          truongPhong: true,
          _count: {
            select: {
              children: true,
              nhanviens: true
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Lỗi khi cập nhật phòng ban: ${error.message}`);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      // Kiểm tra phòng ban tồn tại và lấy thông tin count
      const phongban = await this.prisma.phongban.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              children: true,
              nhanviens: true
            }
          }
        }
      });

      if (!phongban) {
        throw new NotFoundException(`Phòng ban với ID ${id} không tồn tại`);
      }

      // Kiểm tra có phòng ban con không
      if (phongban._count.children > 0) {
        throw new ConflictException('Không thể xóa phòng ban có bộ phận con. Vui lòng xóa các bộ phận con trước.');
      }

      // Kiểm tra có nhân viên không
      if (phongban._count.nhanviens > 0) {
        throw new ConflictException(`Không thể xóa phòng ban có ${phongban._count.nhanviens} nhân viên. Vui lòng chuyển nhân viên trước.`);
      }

      await this.prisma.phongban.delete({
        where: { id }
      });

      return { message: `Đã xóa phòng ban ${phongban.ten} (${phongban.ma})` };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Lỗi khi xóa phòng ban: ${error.message}`);
    }
  }

  async getStatistics() {
    const [total, byLevel, byLoai, topByNhanvien] = await Promise.all([
      this.prisma.phongban.count(),
      
      this.prisma.phongban.groupBy({
        by: ['level'],
        _count: true,
        orderBy: { level: 'asc' }
      }),
      
      this.prisma.phongban.groupBy({
        by: ['loai'],
        _count: true
      }),
      
      this.prisma.phongban.findMany({
        take: 10,
        include: {
          _count: {
            select: { nhanviens: true }
          }
        },
        orderBy: {
          nhanviens: {
            _count: 'desc'
          }
        }
      })
    ]);

    return {
      total,
      byLevel,
      byLoai,
      topByNhanvien: topByNhanvien.map(pb => ({
        id: pb.id,
        ma: pb.ma,
        ten: pb.ten,
        nhanvienCount: pb._count.nhanviens
      }))
    };
  }
}

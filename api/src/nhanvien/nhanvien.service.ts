import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateNhanvienDto, UpdateNhanvienDto } from './dto';
import { Nhanvien, Prisma } from '@prisma/client';

@Injectable()
export class NhanvienService {
  constructor(private prisma: PrismaService) {}

  async create(createNhanvienDto: CreateNhanvienDto): Promise<Nhanvien> {
    try {
      // Kiểm tra mã nhân viên đã tồn tại chưa
      const existing = await this.prisma.nhanvien.findUnique({
        where: { maNV: createNhanvienDto.maNV }
      });

      if (existing) {
        throw new ConflictException(`Nhân viên với mã ${createNhanvienDto.maNV} đã tồn tại`);
      }

      // Kiểm tra email nếu có
      if (createNhanvienDto.email) {
        const existingEmail = await this.prisma.nhanvien.findUnique({
          where: { email: createNhanvienDto.email }
        });

        if (existingEmail) {
          throw new ConflictException(`Email ${createNhanvienDto.email} đã được sử dụng`);
        }
      }

      // Kiểm tra phòng ban nếu có
      if (createNhanvienDto.phongbanId) {
        const phongban = await this.prisma.phongban.findUnique({
          where: { id: createNhanvienDto.phongbanId }
        });

        if (!phongban) {
          throw new NotFoundException(`Phòng ban với ID ${createNhanvienDto.phongbanId} không tồn tại`);
        }
      }

      // Kiểm tra user nếu có
      if (createNhanvienDto.userId) {
        const user = await this.prisma.user.findUnique({
          where: { id: createNhanvienDto.userId }
        });

        if (!user) {
          throw new NotFoundException(`User với ID ${createNhanvienDto.userId} không tồn tại`);
        }

        // Kiểm tra user đã được gán cho nhân viên khác chưa
        const existingUserNhanvien = await this.prisma.nhanvien.findUnique({
          where: { userId: createNhanvienDto.userId }
        });

        if (existingUserNhanvien) {
          throw new ConflictException(`User này đã được gán cho nhân viên ${existingUserNhanvien.maNV}`);
        }
      }

      // Convert date strings to Date objects
      const data: any = { ...createNhanvienDto };
      if (data.ngaySinh) {
        data.ngaySinh = new Date(data.ngaySinh);
      }
      if (data.ngayVaoLam) {
        data.ngayVaoLam = new Date(data.ngayVaoLam);
      }

      return await this.prisma.nhanvien.create({
        data,
        include: {
          phongban: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              isActive: true
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Lỗi khi tạo nhân viên: ${error.message}`);
    }
  }

  async findAll(options?: {
    phongbanId?: string;
    trangThai?: string;
    chucVu?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Nhanvien[]; total: number; page: number; limit: number }> {
    const where: Prisma.NhanvienWhereInput = {};

    if (options?.phongbanId) {
      where.phongbanId = options.phongbanId;
    }
    if (options?.trangThai) {
      where.trangThai = options.trangThai as any;
    }
    if (options?.chucVu) {
      where.chucVu = { contains: options.chucVu, mode: 'insensitive' };
    }
    if (options?.search) {
      where.OR = [
        { maNV: { contains: options.search, mode: 'insensitive' } },
        { hoTen: { contains: options.search, mode: 'insensitive' } },
        { email: { contains: options.search, mode: 'insensitive' } },
        { soDienThoai: { contains: options.search, mode: 'insensitive' } }
      ];
    }

    const page = options?.page || 1;
    const limit = options?.limit || 50;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.nhanvien.findMany({
        where,
        include: {
          phongban: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              isActive: true
            }
          }
        },
        orderBy: { maNV: 'asc' },
        skip,
        take: limit
      }),
      this.prisma.nhanvien.count({ where })
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Nhanvien> {
    const nhanvien = await this.prisma.nhanvien.findUnique({
      where: { id },
      include: {
        phongban: {
          include: {
            parent: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            isActive: true,
            createdAt: true
          }
        }
      }
    });

    if (!nhanvien) {
      throw new NotFoundException(`Nhân viên với ID ${id} không tồn tại`);
    }

    return nhanvien;
  }

  async findByMaNV(maNV: string): Promise<Nhanvien> {
    const nhanvien = await this.prisma.nhanvien.findUnique({
      where: { maNV },
      include: {
        phongban: true,
        user: true
      }
    });

    if (!nhanvien) {
      throw new NotFoundException(`Nhân viên với mã ${maNV} không tồn tại`);
    }

    return nhanvien;
  }

  async update(id: string, updateNhanvienDto: UpdateNhanvienDto): Promise<Nhanvien> {
    try {
      // Kiểm tra nhân viên tồn tại
      await this.findOne(id);

      // Kiểm tra phòng ban nếu update
      if (updateNhanvienDto.phongbanId !== undefined) {
        if (updateNhanvienDto.phongbanId === null) {
          // Allow null - unassign from phòng ban
        } else {
          const phongban = await this.prisma.phongban.findUnique({
            where: { id: updateNhanvienDto.phongbanId }
          });

          if (!phongban) {
            throw new NotFoundException(`Phòng ban với ID ${updateNhanvienDto.phongbanId} không tồn tại`);
          }
        }
      }

      // Kiểm tra user nếu update
      if (updateNhanvienDto.userId !== undefined) {
        if (updateNhanvienDto.userId === null) {
          // Allow null - unlink from user
        } else {
          const user = await this.prisma.user.findUnique({
            where: { id: updateNhanvienDto.userId }
          });

          if (!user) {
            throw new NotFoundException(`User với ID ${updateNhanvienDto.userId} không tồn tại`);
          }

          // Kiểm tra user đã được gán cho nhân viên khác chưa
          const existingUserNhanvien = await this.prisma.nhanvien.findFirst({
            where: {
              userId: updateNhanvienDto.userId,
              id: { not: id }
            }
          });

          if (existingUserNhanvien) {
            throw new ConflictException(`User này đã được gán cho nhân viên ${existingUserNhanvien.maNV}`);
          }
        }
      }

      // Convert date strings to Date objects
      const data: any = { ...updateNhanvienDto };
      if (data.ngaySinh) {
        data.ngaySinh = new Date(data.ngaySinh);
      }
      if (data.ngayVaoLam) {
        data.ngayVaoLam = new Date(data.ngayVaoLam);
      }

      return await this.prisma.nhanvien.update({
        where: { id },
        data,
        include: {
          phongban: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              isActive: true
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Lỗi khi cập nhật nhân viên: ${error.message}`);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      // Kiểm tra nhân viên tồn tại
      const nhanvien = await this.findOne(id);

      // Kiểm tra xem nhân viên có phải trưởng phòng không
      const phongbanQuanLy = await this.prisma.phongban.findFirst({
        where: { truongPhongId: id }
      });

      if (phongbanQuanLy) {
        throw new ConflictException(
          `Không thể xóa nhân viên đang làm trưởng phòng của ${phongbanQuanLy.ten}. Vui lòng chuyển quyền trưởng phòng trước.`
        );
      }

      await this.prisma.nhanvien.delete({
        where: { id }
      });

      return { message: `Đã xóa nhân viên ${nhanvien.hoTen} (${nhanvien.maNV})` };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Lỗi khi xóa nhân viên: ${error.message}`);
    }
  }

  async getStatistics() {
    const [
      total,
      byPhongban,
      byTrangThai,
      byChucVu,
      withUser,
      withoutPhongban
    ] = await Promise.all([
      this.prisma.nhanvien.count(),
      
      this.prisma.nhanvien.groupBy({
        by: ['phongbanId'],
        _count: true,
        orderBy: { _count: { phongbanId: 'desc' } }
      }),
      
      this.prisma.nhanvien.groupBy({
        by: ['trangThai'],
        _count: true
      }),
      
      this.prisma.nhanvien.groupBy({
        by: ['chucVu'],
        _count: true,
        orderBy: { _count: { chucVu: 'desc' } }
      }),
      
      this.prisma.nhanvien.count({
        where: { userId: { not: null } }
      }),
      
      this.prisma.nhanvien.count({
        where: { phongbanId: null }
      })
    ]);

    // Get phongban details
    const phongbanIds = byPhongban
      .filter(item => item.phongbanId !== null)
      .map(item => item.phongbanId as string);
    
    const phongbanDetails = await this.prisma.phongban.findMany({
      where: { id: { in: phongbanIds } },
      select: { id: true, ma: true, ten: true }
    });

    const byPhongbanWithDetails = byPhongban.map(item => {
      const phongban = phongbanDetails.find(pb => pb.id === item.phongbanId);
      return {
        phongbanId: item.phongbanId,
        phongbanMa: phongban?.ma || 'N/A',
        phongbanTen: phongban?.ten || 'Chưa phân công',
        count: item._count
      };
    });

    return {
      total,
      byPhongban: byPhongbanWithDetails,
      byTrangThai,
      byChucVu: byChucVu.filter(item => item.chucVu !== null),
      withUser,
      withoutPhongban
    };
  }

  async linkToUser(nhanvienId: string, userId: string): Promise<Nhanvien> {
    // Kiểm tra nhân viên
    const nhanvien = await this.findOne(nhanvienId);

    // Kiểm tra user
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException(`User với ID ${userId} không tồn tại`);
    }

    // Kiểm tra user đã được gán chưa
    const existingUserNhanvien = await this.prisma.nhanvien.findUnique({
      where: { userId }
    });

    if (existingUserNhanvien && existingUserNhanvien.id !== nhanvienId) {
      throw new ConflictException(`User này đã được gán cho nhân viên ${existingUserNhanvien.maNV}`);
    }

    // Link nhân viên với user
    return await this.prisma.nhanvien.update({
      where: { id: nhanvienId },
      data: {
        userId,
        email: user.email || nhanvien.email
      },
      include: {
        phongban: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            isActive: true
          }
        }
      }
    });
  }

  async unlinkFromUser(nhanvienId: string): Promise<Nhanvien> {
    await this.findOne(nhanvienId);

    return await this.prisma.nhanvien.update({
      where: { id: nhanvienId },
      data: { userId: null },
      include: {
        phongban: true,
        user: true
      }
    });
  }
}

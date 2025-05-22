// import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { PrismaService } from 'prisma/prisma.service';

// @Injectable()
// export class KhachhangService {
//   constructor(private readonly prisma: PrismaService) {}

//   async timkiemkhachhang(query: string) {
//     return this.prisma.$queryRaw`
//       SELECT * FROM "Khachhang" 
//       WHERE search_vector @@ to_tsquery('simple', ${query})
//     `;
//   }



//   async generateMakh(loaikh: string): Promise<string> {
//     try {
//       const prefix = loaikh === 'khachsi' ? 'TG-KS' : 'TG-KL';
//       const latest = await this.prisma.khachhang.findFirst({
//         where: { makh: { startsWith: prefix } },
//         orderBy: { makh: 'desc' },
//         select: { makh: true },
//       });
//       let nextNumber = 1;
//       if (latest && latest.makh) {
//         const lastNumber = parseInt(latest.makh.slice(prefix.length), 10);
//         nextNumber = lastNumber + 1;
//       }
//       return `${prefix}${nextNumber.toString().padStart(5, '0')}`;
//     } catch (error) {
//       throw new InternalServerErrorException('Lỗi khi tạo mã khách hàng');
//     }
//   }

//   async create(data: any) {
//     // Nếu mã khách hàng không được truyền, tự động tạo mới
//     if (!data.makh) {
//       data.makh = await this.generateMakh(data.loaikh);
//     } else {
//       // Nếu mã khách hàng được truyền, kiểm tra xem có tồn tại chưa
//       const existingCustomer = await this.prisma.khachhang.findUnique({
//         where: { makh: data.makh },
//       });
//       if (existingCustomer) {
//         // Nếu đã tồn tại, trả về khách hàng hiện có
//         return existingCustomer;
//       }
//     }
//     // Tạo khách hàng mới với dữ liệu đã có, bao gồm makh
//     return this.prisma.khachhang.create({
//       data,
//     });
//   }



//   async import(data: any[]) {
//     // Dữ liệu gửi lên là một mảng khách hàng
//     for (const customer of data) {
//       // Nếu không có makh, gọi create để tự sinh makh
//       if (!customer.makh) {
//         await this.create(customer);
//       } else {
//         // Tìm khách hàng tồn tại theo makh
//         const existingCustomer = await this.prisma.khachhang.findUnique({
//           where: { makh: customer.makh },
//           select: { id: true },
//         });
//         if (existingCustomer) {
//           // Nếu khách hàng đã tồn tại thì cập nhật
//           await this.prisma.khachhang.update({
//             where: { id: existingCustomer.id },
//             data: { ...customer },
//           });
//         } else {
//           // Nếu chưa tồn tại thì tạo mới
//           await this.create(customer);
//         }
//       }
//     }
//     return { message: 'Import completed' };
//   }

//   async findAll() {
//     return this.prisma.khachhang.findMany({
//       include: {banggia: true}
//     });
//   }
//   async findby(param: any) {
//     try {
//       const khachhang = await this.prisma.khachhang.findUnique({
//         where: param,
//       });
//       return khachhang;
//     } catch (error) {
//       console.error('Error finding item:', error);
//       throw error;
//     }
//   }
//   async findOne(id: string) {
//     const khachhang = await this.prisma.khachhang.findUnique({ where: { id },    
//       include:{
//       banggia: true
//     } });
//     if (!khachhang) throw new NotFoundException('Khachhang not found');
//     return khachhang;
//   }
//   async searchfield(searchParams: Record<string, any>) {
//     const where: any = {};
//     // Xây dựng điều kiện tìm kiếm linh hoạt
//     for (const [key, value] of Object.entries(searchParams)) {
//       if (!value) continue;

//       if (key === 'id') {
//         where[key] = value; // Tìm chính xác theo ID
//       } else if (typeof value === 'number' || typeof value === 'boolean') {
//         where[key] = value; // Tìm theo số hoặc boolean
//       } else {
//         where[key] = { contains: value, mode: 'insensitive' }; // Tìm gần đúng với string
//       }
//     }
//     const khachhang = await this.prisma.khachhang.findUnique({ where,
//       include:{
//         banggia: true
//       }
//     });
//     if (!khachhang) throw new NotFoundException('Khachhang not found');
//     return khachhang;
//   }

//   async update(id: string, data: any) {
//     // Lấy thông tin khách hàng cùng các bảng giá liên kết
//     const existingCustomer = await this.prisma.khachhang.findUnique({
//       where: { id },
//       select: { banggia: { select: { id: true } } }, // Chỉ lấy ID của bảng giá
//     });
  
//     if (!existingCustomer) {
//       throw new Error("Khách hàng không tồn tại");
//     }
  
//     // Ngắt kết nối tất cả bảng giá cũ
//     const disconnectBanggia = existingCustomer.banggia.map(({ id }) => ({ id }));
  
//     // Lấy danh sách bảng giá mới từ payload
//     const newBanggiaIds = data.banggia?.map(({ id }: { id: string }) => ({ id })) || [];
  
//     // Cập nhật dữ liệu khách hàng
//     return this.prisma.khachhang.update({
//       where: { id },
//       data: {
//         ...data,
//         banggia: {
//           disconnect: disconnectBanggia, // Ngắt toàn bộ bảng giá cũ
//           connect: newBanggiaIds, // Kết nối bảng giá mới từ payload
//         },
//       },
//       include: { banggia: true },
//     });
//   }
  

//   async remove(id: string) {
//     return this.prisma.khachhang.delete({ where: { id } });
//   }
// }
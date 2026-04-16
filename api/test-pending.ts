import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.tonKho.findMany({
    where: { sanpham: { title: { contains: 'BẮP CẢI TRẮNG' } } },
    select: {
      slchonhap: true,
      slchogiao: true,
      sanpham: {
        select: {
          title: true,
          Dathangsanpham: {
            where: { dathang: { status: { in: ['dadat', 'dagiao'] } } },
            take: 20,
            select: { dathang: { select: { id: true, madncc: true, status: true, title: true } } }
          },
          Donhangsanpham: {
            where: { donhang: { status: { in: ['dadat', 'dagiao'] } } },
            take: 20,
            select: { donhang: { select: { id: true, madonhang: true, status: true, title: true } } }
          }
        }
      }
    }
  });
  console.log(JSON.stringify(result, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());

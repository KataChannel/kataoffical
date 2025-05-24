import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
const prisma = new PrismaClient();
async function importData() {

  try {
// Find groups of duplicate records (same codeId and title)
const duplicateRecords = await prisma.hoadonChitiet.groupBy({
  by: ['codeId', 'title'],
  _count: { id: true },
  having: { id: { _count: { gt: 1 } } }
});

// For each duplicate group delete all records except one
// for (const group of duplicateRecords) {
//   // Retrieve all records in the group, ordered by id so that the first is kept
//   const records = await prisma.hoadonChitiet.findMany({
//     where: {
//       codeId: group.codeId,
//       title: group.title,
//     },
//     orderBy: { id: 'asc' }
//   });
  
//   // Keep the first record and delete the rest
//   const recordsToDelete = records.slice(1);
//   for (const record of recordsToDelete) {
//     await prisma.hoadonChitiet.delete({
//       where: { id: record.id }
//     });
//   }
// }

console.log('Duplicate record groups:', duplicateRecords);


    // const listdat = await prisma.hoadonChitiet.findMany({where: {idhdon: "e0b2c5a7-6260-48c9-b9c8-dd5bd3783cc0"}});
    // const listdat = await prisma.hoadonChitiet.findMany({where: {idhdon: "e0b2c5a7-6260-48c9-b9c8-dd5bd3783cc0"}});
    // console.log('listdat', listdat.length);
    // const hoadons = await prisma.hoadon.findMany({
    //   include: {
    //     HoadonChitiet: {
    //       select: {
    //         id: true,
    //         codeId: true,
    //         dgia: true,
    //         sluong: true,
    //         thtien: true,
    //       }
    //     }
    //   }
    // });
    // console.log('hoadons', hoadons.length);
    // hoadons.forEach(v => {
    //   v.HoadonChitiet.forEach(async v1 => {
    //      v1.codeId = removeVietnameseAccents(`${v.khhdon}-${v.nbmst}-${v.khmshdon}-${v.shdon}-${v.thlap}`);
    //      await prisma.hoadonChitiet.update({
    //       where: { id: v1.id },
    //       data: { codeId: v1.codeId }
    //   });
    // });
    // })

    // const banra = hoadons.filter(v => v.nbmst=="5900363291");
    // const muavao = hoadons.filter(v => v.nbmst!=="5900363291");
    // const tongbanra = banra.reduce((acc, v) => acc + Number(v.tgtcthue), 0);


    // console.log('tongbanra1', tongbanra1);
    // console.log('hoadons', tongbanra);
    // const deleteResult = await prisma.hoadonChitiet.deleteMany({
    //   where: { idhdon: "e0b2c5a7-6260-48c9-b9c8-dd5bd3783cc0" }
    // });
    // console.log('Deleted records count:', deleteResult.count);
  } catch (error: any) {
    console.error('Error updating hoadonChitiet titles:', error);
  }

  console.log('✅ Completed updating hoadonChitiet titles!');
  await prisma.$disconnect();
}

importData();



export function removeVietnameseAccents(text:any) {
    if (!text) {
        return ""; // Xử lý trường hợp đầu vào rỗng hoặc null
      }
      return text
        .replace(/đ/g, "d")
        .normalize("NFD") // Chuẩn hóa chuỗi về dạng NFD để tách dấu
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu thanh
        .replace(/[^a-zA-Z0-9]/g, "") // Loại bỏ tất cả ký tự không phải chữ cái hoặc số
        .toLowerCase(); // Chuyển đổi thành chữ thường
}
export function toSnakeCase(text:any) {
    return removeVietnameseAccents(text)
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/\W+/g, "_")
        .toLowerCase();
}
export function toKebabCase(text:any) {
    return removeVietnameseAccents(text)
        .replace(/\s+/g, "-")
        .toLowerCase();
}
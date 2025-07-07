import { PrismaClient } from '@prisma/client';
import { bangiakhachahng } from './migrations/dulieu';

const prisma = new PrismaClient();
const dulieus = bangiakhachahng
async function main() {
//   const khachangs = await prisma.khachhang.findMany({
//     select: { id: true,makh: true},
//   });
//   const banggias = await prisma.banggia.findMany({
//     select: { id: true, mabanggia: true,title: true},
//   });
//   // console.log(khachangs);
//   // console.log(banggias);
//   console.log(dulieus);
//   const newData = dulieus.map((dulieu) => {
//     const makh = dulieu.makh;
//     const mabanggia = dulieu.mabanggia;
//     const khachhangId = khachangs.find((khachang) => khachang.makh === makh)?.id;
//     const banggiaId = banggias.find((banggia) => banggia.mabanggia === mabanggia)?.id;
//     return { khachhangId, banggiaId,makh,mabanggia };
//   })
//   //console.log(newData);
//   const dataxulys = convertData(newData)
//   //console.log(convertData(newData));
// //  console.log(dataxulys[1].khachhangIds.map(id => ({ id })),);
  
//   // // Cập nhật từng khách hàng

//   for (const dataxuly of dataxulys) {
//     const banggiaId = dataxuly.banggiaId;
//     const khachhangIds = dataxuly.khachhangIds;
//     console.log(banggiaId, khachhangIds);

//     setTimeout(async () => {
//       await prisma.banggia.update({
//         where: { id: banggiaId },
//         data: {
//           khachhang: {
//             connect: khachhangIds.map(id => ({ id })),
//           },
//         },
//       });
//     }, 1000); // Adjust the timeout duration as needed
//   }


  // for (const banggia of dulieu) {
  //   await prisma.banggia.update({
  //     where: { id: banggia.id },
  //     data: {
  //       mabanggia: banggia.title
  //     },
  //   });
  // }

  // return this.prisma.banggia.update({
  //   where: { id: banggiaId },
  //   data: {
  //     khachhang: {
  //       connect: khachhangIds.map(id => ({ id })),
  //     },
  //   },
  // });

  // const donhangsanphams = await prisma.donhangsanpham.findMany({
  //   select: { id: true, sldat: true }
  // });

  // for (const item of donhangsanphams) {
  //   await prisma.donhangsanpham.update({
  //     where: { id: item.id },
  //     data: {
  //       slgiao: item.sldat,
  //       slnhan: item.sldat,
  //     },
  //   });
  // }
  // Reset tonkho: set slton, slchonhap, slchogiao về 0 cho tất cả bản ghi
  // Lấy tất cả các bản ghi tonKho
  const tonKhos = await prisma.tonKho.findMany({
    select: { id: true, slton: true, slchonhap: true, slchogiao: true },
  });

  // Cập nhật từng bản ghi: cộng dồn slchonhap vào slton, đặt slchonhap về 0
  for (const tonKho of tonKhos) {
    await prisma.tonKho.update({
      where: { id: tonKho.id },
      data: {
        // slton: tonKho.slton.plus(tonKho.slchonhap),
        slchonhap: 0,
        slton: 0,
        slchogiao: 0,
        // Nếu muốn reset slchogiao về 0 thì thêm dòng dưới:
        // slchogiao: 0,
      },
    });
  }

}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});


export function convertData(data1) {
  const result = {};

  data1.forEach(item => {
    if (item.banggiaId) {
      if (!result[item.banggiaId]) {
        result[item.banggiaId] = [];
      }
      result[item.banggiaId].push(item.khachhangId);
    }
  });

  return Object.keys(result).map(key => ({
    banggiaId: key,
    khachhangIds: result[key]
  }));
}

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
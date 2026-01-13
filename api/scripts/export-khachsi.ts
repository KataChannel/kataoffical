
import { PrismaClient } from '@prisma/client';
import * as ExcelJS from 'exceljs';
import * as path from 'path';

const prisma = new PrismaClient();

async function exportKhachsi() {
  console.log('Đang tải dữ liệu khách sỉ...');
  
  try {
    const customers = await prisma.khachhang.findMany({
      where: {
        loaikh: 'khachsi',
      },
      include: {
        nhomkhachhang: true,
      },
      orderBy: {
        makh: 'asc',
      },
    });

    console.log(`Đã tìm thấy ${customers.length} khách sỉ.`);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Danh sách khách sỉ');

    // Cấu hình cột
    worksheet.columns = [
      { header: 'Mã KH', key: 'makh', width: 20 },
      { header: 'Tên KH', key: 'name', width: 40 },
      { header: 'Nhóm KH', key: 'nhomkh', width: 40 },
    ];

    // Định dạng header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).height = 20;
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // Thêm dữ liệu
    customers.forEach((customer) => {
      const nhomkh = customer.nhomkhachhang.map((n) => n.name).join(', ');
      worksheet.addRow({
        makh: customer.makh,
        name: customer.name || customer.tenkh || '',
        nhomkh: nhomkh,
      });
    });

    // Thêm border cho bảng
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    const fileName = `DanhSachKhachSi_${new Date().toISOString().split('T')[0]}.xlsx`;
    const filePath = path.join(process.cwd(), '..', fileName);

    await workbook.xlsx.writeFile(filePath);
    console.log(`Đã xuất file: ${filePath}`);
  } catch (error) {
    console.error('Lỗi khi xuất file Excel:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportKhachsi();

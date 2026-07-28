
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Load excel data
  const excelDataRaw = fs.readFileSync('../excel_data.json', 'utf8');
  const excelData = JSON.parse(excelDataRaw);
  const excelOrderIds = new Set(excelData.orders);
  let excelCustomerCodes = excelData.customers.filter((c: string) => c.startsWith('TG-') || c.startsWith('SCC'));

  console.log(`Loaded ${excelOrderIds.size} unique order IDs and ${excelCustomerCodes.length} customer codes from Excel.`);

  // Find khachhang IDs for these codes
  const khachhangs = await prisma.khachhang.findMany({
    where: {
      makh: {
        in: excelCustomerCodes
      }
    }
  });

  const khIds = khachhangs.map(k => k.id);
  console.log(`Matched ${khIds.length} customers in DB.`);

  // Date range: 2026-01-01 to 2026-01-25
  const startDate = new Date('2026-01-01T00:00:00Z');
  const endDate = new Date('2026-01-25T23:59:59Z');

  // Fetch orders from DB for these specific customers
  const dbOrders = await prisma.donhang.findMany({
    where: {
      ngaygiao: {
        gte: startDate,
        lte: endDate,
      },
      status: {
        in: ['danhan', 'hoanthanh']
      },
      khachhangId: {
        in: khIds
      }
    },
    include: {
      khachhang: true
    }
  });

  console.log(`Found ${dbOrders.length} matching orders for these customers in DB.`);

  const missingOrders = dbOrders.filter(o => !excelOrderIds.has(o.madonhang));

  console.log(`Identified ${missingOrders.length} missing orders.`);

  let totalValue = 0;
  const reportData = missingOrders.map(o => {
    const val = Number(o.tongtien);
    totalValue += val;
    return {
      madonhang: o.madonhang,
      ngaygiao: o.ngaygiao,
      khachhang: o.khachhang?.name || 'Unknown',
      makh: o.khachhang?.makh || 'Unknown',
      tongtien: val,
      status: o.status
    };
  });

  console.log(`Total missing value for these customers: ${totalValue.toLocaleString()} VND`);

  fs.writeFileSync('../missing_orders_report.json', JSON.stringify({
    summary: {
      totalCount: missingOrders.length,
      totalValue: totalValue,
    },
    details: reportData
  }, null, 2));

  // Generate a Markdown summary
  let md = `# BÁO CÁO TOÀN DIỆN VỀ ĐƠN HÀNG SÓT ĐỐI SOÁT (INVISIBLE ORDERS)\n\n`;
  md += `**Phạm vi:** Các khách hàng thuộc nhóm Bò Tơ, LongWang, và các chuỗi hiện có trong file đối soát.\n`;
  md += `**Thời gian:** 01/01/2026 - 25/01/2026\n`;
  md += `**Kết quả phát hiện:**\n`;
  md += `- Tổng số đơn hàng trong DB: **${dbOrders.length}**\n`;
  md += `- Tổng số đơn hàng đã đưa vào Excel: **${dbOrders.length - missingOrders.length}**\n`;
  md += `- **Số đơn hàng đã hoàn thành nhưng bị BỎ SÓT:** **${missingOrders.length}**\n`;
  md += `- **Giá trị thất thoát (tạm tính):** **${totalValue.toLocaleString()} VNĐ**\n\n`;

  md += `## 1. PHÂN TÍCH THEO KHÁCH HÀNG (SỐ TIỀN SÓT LỚN NHẤT)\n\n`;
  
  const customerSummary: any = {};
  reportData.forEach(o => {
    if (!customerSummary[o.khachhang]) customerSummary[o.khachhang] = 0;
    customerSummary[o.khachhang] += o.tongtien;
  });

  md += `| Tên Khách Hàng | Tổng tiền sót | Số đơn sót |\n`;
  md += `| :--- | :--- | :--- |\n`;
  Object.keys(customerSummary).sort((a,b) => customerSummary[b] - customerSummary[a]).forEach(name => {
    const count = reportData.filter(o => o.khachhang === name).length;
    md += `| ${name} | ${customerSummary[name].toLocaleString()} | ${count} |\n`;
  });

  md += `\n## 2. DANH SÁCH CHI TIẾT CÁC ĐƠN HÀNG SÓT (Top 20)\n\n`;
  md += `| Mã đơn hàng | Ngày giao | Khách hàng | Tổng tiền | Trạng thái |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- |\n`;
  
  reportData.sort((a,b) => b.tongtien - a.tongtien).slice(0, 20).forEach(o => {
    md += `| ${o.madonhang} | ${new Date(o.ngaygiao!).toLocaleDateString('vi-VN')} | ${o.khachhang} | ${o.tongtien.toLocaleString()} | ${o.status} |\n`;
  });

  md += `\n... (và ${missingOrders.length - 20} đơn hàng khác)\n\n`;

  md += `## 3. ĐỀ XUẤT PHƯƠNG ÁN CHỐNG THẤT THOÁT\n\n`;
  md += `### 3.1. Về mặt Công nghệ (Hệ thống)\n`;
  md += `- **Số hóa quy trình chốt nợ:** Thay thế hoàn toàn file Excel thủ công bằng Module "Chốt công nợ" trên hệ thống. Chỉ cho phép chốt khi hệ thống xác nhận 100% đơn hàng trong kỳ đã được đưa vào bảng kê.\n`;
  md += `- **Cảnh báo đơn "Lơ lửng":** Hệ thống tự động gửi thông báo cho Kế toán trưởng mỗi sáng nếu có đơn hàng giao quá 24h mà chưa chuyển sang trạng thái \`hoanthanh\` hoặc chưa được gán vào một kỳ đối soát.\n`;
  md += `- **Gắn nhãn Đối soát:** Mỗi đơn hàng khi được đưa vào file đối soát phải có 1 cờ \`isReconciled = true\`. Hệ thống sẽ có báo cáo lọc nhanh tất cả đơn \`isReconciled = false\` để xử lý ngay.\n\n`;

  md += `### 3.2. Về mặt Quy trình (Con người)\n`;
  md += `- **Đối chiếu chéo (Cross-check):** Hàng tuần, kế toán phải chạy báo cáo "Tổng doanh thu DB" so với "Tổng doanh thu đã chốt nợ". Nếu lệch > 0.1%, phải dừng lại truy vết ngay.\n`;
  md += `- **Quy trình 4 mắt:** Nhân viên Sales/Giao hàng xác nhận đơn -> Kế toán bán hàng kiểm tra -> Kế toán công nợ chốt số -> Kế toán trưởng phê duyệt kỳ đối soát.\n`;

  fs.writeFileSync('../DANH_SACH_DON_HANG_SOT.md', md);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

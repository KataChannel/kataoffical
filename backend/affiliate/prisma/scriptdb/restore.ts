import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const prisma = new PrismaClient();
const BACKUP_ROOT_DIR = './affiliate_json';

// Định nghĩa thứ tự khôi phục bảng để thỏa mãn ràng buộc khóa ngoại
const TABLE_ORDER = [
  'User',
  'Role',
  'Permission',
  'Resource',
  'FileManager',
  'Dichvu',
  'LandingPage',
  'AffiliateLink',
  'Menu',
  'ChatAIHistory',
  'ChatAIMessage',
  'ErrorLog',
  'AuditLog',
  'Notification',
  'Doanhso',
  'Doanhthu',
  'HoaHong',
  'ThanhToanHoaHong',
  'TrackingEvent',
  'UserRole',
  'RolePermission',
];

async function getTables(): Promise<string[]> {
  try {
    const tables: { tablename: string }[] =
      await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    return tables.map((table) => table.tablename).filter((table) => table !== '_prisma_migrations');
  } catch (error: any) {
    console.error('❌ Lỗi khi lấy danh sách bảng:', error.message, error.stack);
    throw error;
  }
}

async function restoreTableFromJson(table: string): Promise<void> {
  try {
    const latestBackupDir = fs.readdirSync(BACKUP_ROOT_DIR).sort().reverse()[0];
    console.log(`Đang khôi phục dữ liệu cho bảng: ${table} từ thư mục backup: ${latestBackupDir}`);
    
    if (!latestBackupDir) {
      console.error(`❌ Không tìm thấy thư mục backup.`);
      return;
    }
    const filePath: string = path.join(BACKUP_ROOT_DIR, latestBackupDir, `${table}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ Không tìm thấy tệp JSON cho bảng ${table}, bỏ qua.`);
      return;
    }
    const data: any[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (!Array.isArray(data) || data.length === 0) {
      console.log(`⚠️ Dữ liệu JSON cho bảng ${table} trống hoặc không hợp lệ, bỏ qua.`);
      return;
    }

    const processedData = data.map((item) => {
      const newItem = { ...item };

      // Xử lý trường DateTime
      for (const key in newItem) {
        if (newItem[key] && typeof newItem[key] === 'string' && key.match(/At$/)) {
          newItem[key] = new Date(newItem[key]);
        }
      }

      // Xử lý trường Float và cung cấp giá trị mặc định
      const floatFields = ['amount', 'commission', 'amountPaid', 'originalAmount', 'discountAmount', 'actualAmount', 'tienhoahong', 'price'];
      for (const key of floatFields) {
        if (key in newItem) {
          newItem[key] = newItem[key] != null ? parseFloat(newItem[key]) : null;
        } else if (table === 'Doanhso' && key === 'actualAmount') {
          newItem[key] = newItem.originalAmount - (newItem.discountAmount ?? 0);
        }
      }

      // Xử lý trường size
      if (newItem.size && typeof newItem.size === 'string') {
        newItem.size = newItem.size.trim() === '' ? null : parseInt(newItem.size, 10);
      }

      // Xử lý khóa ngoại
      const foreignKeys: { [key: string]: { field: string; model: string }[] } = {
        TrackingEvent: [
          { field: 'affiliateLinkId', model: 'affiliateLink' },
          { field: 'userId', model: 'user' },
        ],
        Doanhso: [
          { field: 'affiliateLinkId', model: 'affiliateLink' },
          { field: 'dichvuId', model: 'dichvu' },
          { field: 'userId', model: 'user' },
        ],
        AuditLog: [{ field: 'userId', model: 'user' }],
        Notification: [{ field: 'userId', model: 'user' }],
        HoaHong: [
          { field: 'affiliateLinkId', model: 'affiliateLink' },
          { field: 'doanhthuId', model: 'doanhthu' },
          { field: 'userId', model: 'user' },
        ],
        ThanhToanHoaHong: [
          { field: 'hoaHongId', model: 'hoaHong' },
          { field: 'userId', model: 'user' },
        ],
        LandingPage: [{ field: 'ownerId', model: 'user' }],
        User: [{ field: 'referrerId', model: 'user' }],
        UserRole: [
          { field: 'userId', model: 'user' },
          { field: 'roleId', model: 'role' },
        ],
        RolePermission: [
          { field: 'roleId', model: 'role' },
          { field: 'permissionId', model: 'permission' },
        ],
        Menu: [{ field: 'parentId', model: 'menu' }],
        Doanhthu: [{ field: 'doanhsoId', model: 'doanhso' }],
      };

      if (foreignKeys[table]) {
        for (const { field, model } of foreignKeys[table]) {
          if (newItem[field]) {
            const isValid = (prisma as any)[model].findUnique({
              where: { id: newItem[field] },
            });
            if (!isValid) {
              console.warn(`⚠️ ${field} ${newItem[field]} không tồn tại trong ${model}, đặt thành null hoặc bỏ qua.`);
              newItem[field] = null; // Đặt thành null nếu nullable
            }
          }
        }
      }

      return newItem;
    }).filter(item => item !== null);

    if (processedData.length === 0) {
      console.log(`⚠️ Không có bản ghi hợp lệ để khôi phục cho bảng ${table}.`);
      return;
    }

    const model = (prisma as any)[table];
    if (!model || typeof model.createMany !== 'function') {
      console.log(`Bảng join ${table} không có model. Sử dụng raw SQL để khôi phục dữ liệu.`);
      const columns = Object.keys(processedData[0]).map((col) => `"${col}"`).join(', ');
      const values = processedData
        .map((item) => {
          return (
            '(' +
            Object.values(item)
              .map((val) => {
                if (val instanceof Date) {
                  return `'${val.toISOString()}'`;
                } else if (typeof val === 'string') {
                  return `'${val.replace(/'/g, "''")}'`;
                } else if (val === null || val === undefined) {
                  return 'NULL';
                }
                return val;
              })
              .join(', ') +
            ')'
          );
        })
        .join(', ');
      await prisma.$executeRawUnsafe(
        `INSERT INTO "${table}" (${columns}) VALUES ${values} ON CONFLICT DO NOTHING`
      );
    } else {
      try {
        await model.createMany({
          data: processedData,
          skipDuplicates: true,
        });
      } catch (error: any) {
        console.error(`❌ Lỗi khi chèn dữ liệu vào ${table} bằng createMany:`, error.message);
        // Thử chèn từng bản ghi
        for (const item of processedData) {
          try {
            const data: any = { ...item };
            // Xử lý quan hệ
            if (table === 'Doanhso') {
              data.dichvu = item.dichvuId ? { connect: { id: item.dichvuId } } : undefined;
              data.user = item.userId ? { connect: { id: item.userId } } : undefined;
              data.affiliateLink = item.affiliateLinkId ? { connect: { id: item.affiliateLinkId } } : undefined;
              delete data.dichvuId;
              delete data.userId;
              delete data.affiliateLinkId;
            } else if (table === 'TrackingEvent') {
              data.affiliateLink = item.affiliateLinkId ? { connect: { id: item.affiliateLinkId } } : undefined;
              data.user = item.userId ? { connect: { id: item.userId } } : undefined;
              delete data.affiliateLinkId;
              delete data.userId;
            } else if (['AuditLog', 'Notification', 'HoaHong', 'ThanhToanHoaHong'].includes(table)) {
              data.user = item.userId ? { connect: { id: item.userId } } : undefined;
              delete data.userId;
              if (table === 'HoaHong') {
                data.affiliateLink = item.affiliateLinkId ? { connect: { id: item.affiliateLinkId } } : undefined;
                data.doanhthu = item.doanhthuId ? { connect: { id: item.doanhthuId } } : undefined;
                delete data.affiliateLinkId;
                delete data.doanhthuId;
              } else if (table === 'ThanhToanHoaHong') {
                data.hoaHong = item.hoaHongId ? { connect: { id: item.hoaHongId } } : undefined;
                delete data.hoaHongId;
              }
            } else if (table === 'LandingPage') {
              data.owner = item.ownerId ? { connect: { id: item.ownerId } } : undefined;
              delete data.ownerId;
            } else if (table === 'User') {
              data.referrer = item.referrerId ? { connect: { id: item.referrerId } } : undefined;
              delete data.referrerId;
            } else if (table === 'UserRole') {
              data.user = item.userId ? { connect: { id: item.userId } } : undefined;
              data.role = item.roleId ? { connect: { id: item.roleId } } : undefined;
              delete data.userId;
              delete data.roleId;
            } else if (table === 'RolePermission') {
              data.role = item.roleId ? { connect: { id: item.roleId } } : undefined;
              data.permission = item.permissionId ? { connect: { id: item.permissionId } } : undefined;
              delete data.roleId;
              delete data.permissionId;
            } else if (table === 'Menu') {
              data.parent = item.parentId ? { connect: { id: item.parentId } } : undefined;
              delete data.parentId;
            } else if (table === 'Doanhthu') {
              data.doanhso = item.doanhsoId ? { connect: { id: item.doanhsoId } } : undefined;
              delete data.doanhsoId;
            }
            await model.create({ data });
          } catch (subError: any) {
            console.warn(`⚠️ Bỏ qua bản ghi trong ${table}:`, item, subError.message);
          }
        }
      }
    }
    console.log(`✅ Đã nhập dữ liệu vào bảng ${table}`);
  } catch (error: any) {
    console.error(`❌ Lỗi khôi phục bảng ${table}:`, error.message, error.stack);
    throw error;
  }
}

async function restoreAllTablesFromJson(): Promise<void> {
  try {
    // Kiểm tra kết nối cơ sở dữ liệu
    console.log('Kiểm tra kết nối cơ sở dữ liệu...');
    await prisma.$executeRaw`SELECT 1`;
    console.log('Kết nối cơ sở dữ liệu thành công.');

    // Xóa lược đồ public
    console.log('Đang xóa lược đồ public...');
    await prisma.$executeRaw`DROP SCHEMA public CASCADE`;
    await prisma.$executeRaw`CREATE SCHEMA public`;
    console.log('Đã xóa và tạo lại lược đồ public.');

    // Tạo migration mới và áp dụng schema.prisma
    console.log('Đang tạo và áp dụng migration mới...');
    try {
      execSync('npx prisma migrate dev --name init_after_restore', { stdio: 'inherit' });
      console.log('Đã tạo và áp dụng migration mới.');
    } catch (error: any) {
      console.error('❌ Lỗi khi tạo migration mới:', error.message);
      throw error;
    }

    // Khôi phục dữ liệu theo thứ tự bảng
    console.log(`Khôi phục dữ liệu cho ${TABLE_ORDER.length} bảng...`);
    for (const table of TABLE_ORDER) {
      await restoreTableFromJson(table);
    }
  } catch (error: any) {
    console.error('❌ Lỗi trong quá trình đặt lại và khôi phục dữ liệu:', error.message, error.stack);
    throw error;
  }
}

restoreAllTablesFromJson()
  .then(() => console.log('🎉 Đặt lại, áp dụng migration và khôi phục dữ liệu JSON hoàn tất!'))
  .catch((err) =>
    console.error('❌ Lỗi chung trong quá trình xử lý:', err.message, err.stack),
  )
  .finally(() => prisma.$disconnect());
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface PhongbanData {
  'MÃ PHÒNG BAN': string;
  'TÊN PHÒNG BAN': string;
  'PHÂN LOẠI': string;
  'MÃ PHÒNG BAN CHA': string;
}

interface NhanvienData {
  'MÃ NV': string;
  'TÊN NV': string;
  'SDT': string;
  'Ngày Sinh': string;
  'EMAIL': string;
  'ĐỊA CHỈ': string;
  'HÌNH CĂN CƯỚC': string;
  'PHÒNG BAN': string;
}

// Map loại phòng ban từ tiếng Việt sang enum
function mapLoaiPhongban(loai: string): 'PHONGBAN' | 'BOPHAN' | 'PHONG' | 'BAN' | 'TO' | 'NHOM' | 'KHAC' {
  const loaiMap: { [key: string]: 'PHONGBAN' | 'BOPHAN' | 'PHONG' | 'BAN' | 'TO' | 'NHOM' } = {
    'Phòng Ban': 'PHONGBAN',
    'Phòng ban': 'PHONGBAN',
    'Bộ phận': 'BOPHAN',
    'Phòng': 'PHONG',
    'Ban': 'BAN',
    'Tổ': 'TO',
    'Nhóm': 'NHOM',
  };
  
  return loaiMap[loai] || 'PHONGBAN';
}

// Tính level dựa trên parent
function calculateLevel(parentId: string | null, phongbanMap: Map<string, any>): number {
  if (!parentId) return 1;
  
  const parent = phongbanMap.get(parentId);
  if (!parent) return 1;
  
  return parent.level + 1;
}

async function importPhongban() {
  console.log('🔄 Starting Phongban import...');
  
  // Đọc file JSON
  const filePath = path.join(__dirname, '../../promt/phongban.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const phongbanData: PhongbanData[] = JSON.parse(fileContent);
  
  // Bỏ qua dòng đầu tiên (header example)
  const validData = phongbanData.filter(pb => pb['MÃ PHÒNG BAN'] !== 'mapb');
  
  // Map để lưu phòng ban đã tạo (key = mã phòng ban)
  const phongbanMap = new Map<string, any>();
  
  // Phase 1: Tạo tất cả phòng ban cấp 1 (không có parent)
  console.log('📝 Phase 1: Creating root departments...');
  for (const pb of validData) {
    const maPhongBanCha = pb['MÃ PHÒNG BAN CHA'];
    
    if (!maPhongBanCha || maPhongBanCha === 'NULL' || maPhongBanCha === '') {
      try {
        const phongban = await prisma.phongban.create({
          data: {
            ma: pb['MÃ PHÒNG BAN'],
            ten: pb['TÊN PHÒNG BAN'],
            loai: mapLoaiPhongban(pb['PHÂN LOẠI']),
            level: 1,
            isActive: true,
          },
        });
        
        phongbanMap.set(pb['MÃ PHÒNG BAN'], phongban);
        console.log(`  ✅ Created: ${phongban.ma} - ${phongban.ten} (Level 1)`);
      } catch (error: any) {
        if (error.code === 'P2002') {
          console.log(`  ⚠️ Already exists: ${pb['MÃ PHÒNG BAN']}`);
          // Lấy phòng ban đã tồn tại
          const existing = await prisma.phongban.findUnique({
            where: { ma: pb['MÃ PHÒNG BAN'] },
          });
          if (existing) {
            phongbanMap.set(pb['MÃ PHÒNG BAN'], existing);
          }
        } else {
          console.error(`  ❌ Error creating ${pb['MÃ PHÒNG BAN']}:`, error.message);
        }
      }
    }
  }
  
  // Phase 2: Tạo các phòng ban có parent (cấp 2+)
  console.log('\n📝 Phase 2: Creating child departments...');
  const childDepartments = validData.filter(pb => {
    const maPhongBanCha = pb['MÃ PHÒNG BAN CHA'];
    return maPhongBanCha && maPhongBanCha !== 'NULL' && maPhongBanCha !== '';
  });
  
  for (const pb of childDepartments) {
    const maPhongBanCha = pb['MÃ PHÒNG BAN CHA'];
    const parentPhongban = phongbanMap.get(maPhongBanCha);
    
    if (!parentPhongban) {
      console.error(`  ❌ Parent not found: ${maPhongBanCha} for ${pb['MÃ PHÒNG BAN']}`);
      continue;
    }
    
    try {
      const level = calculateLevel(parentPhongban.id, phongbanMap);
      
      const phongban = await prisma.phongban.create({
        data: {
          ma: pb['MÃ PHÒNG BAN'],
          ten: pb['TÊN PHÒNG BAN'],
          loai: mapLoaiPhongban(pb['PHÂN LOẠI']),
          level: level,
          parentId: parentPhongban.id,
          isActive: true,
        },
      });
      
      phongbanMap.set(pb['MÃ PHÒNG BAN'], phongban);
      console.log(`  ✅ Created: ${phongban.ma} - ${phongban.ten} (Level ${level}, Parent: ${maPhongBanCha})`);
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`  ⚠️ Already exists: ${pb['MÃ PHÒNG BAN']}`);
        // Lấy phòng ban đã tồn tại
        const existing = await prisma.phongban.findUnique({
          where: { ma: pb['MÃ PHÒNG BAN'] },
        });
        if (existing) {
          phongbanMap.set(pb['MÃ PHÒNG BAN'], existing);
        }
      } else {
        console.error(`  ❌ Error creating ${pb['MÃ PHÒNG BAN']}:`, error.message);
      }
    }
  }
  
  console.log(`\n✅ Phongban import completed! Total: ${phongbanMap.size} departments`);
  return phongbanMap;
}

async function importNhanvien(phongbanMap: Map<string, any>) {
  console.log('\n🔄 Starting Nhanvien import...');
  
  // Đọc file JSON
  const filePath = path.join(__dirname, '../../promt/nhanvien.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const nhanvienData: NhanvienData[] = JSON.parse(fileContent);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const nv of nhanvienData) {
    try {
      // Lấy phòng ban ID từ mã phòng ban
      let phongbanId: string | undefined = undefined;
      if (nv['PHÒNG BAN'] && nv['PHÒNG BAN'].trim() !== '') {
        const phongban = phongbanMap.get(nv['PHÒNG BAN']);
        if (phongban) {
          phongbanId = phongban.id;
        } else {
          console.warn(`  ⚠️ Phòng ban not found: ${nv['PHÒNG BAN']} for ${nv['MÃ NV']}`);
        }
      }
      
      // Parse ngày sinh nếu có
      let ngaySinh: Date | undefined = undefined;
      if (nv['Ngày Sinh'] && nv['Ngày Sinh'].trim() !== '') {
        try {
          ngaySinh = new Date(nv['Ngày Sinh']);
        } catch (e) {
          console.warn(`  ⚠️ Invalid date format: ${nv['Ngày Sinh']} for ${nv['MÃ NV']}`);
        }
      }
      
      const nhanvien = await prisma.nhanvien.create({
        data: {
          maNV: nv['MÃ NV'],
          hoTen: nv['TÊN NV'],
          soDienThoai: nv['SDT'] || undefined,
          ngaySinh: ngaySinh,
          email: nv['EMAIL'] || undefined,
          diaChiHienTai: nv['ĐỊA CHỈ'] || undefined,
          phongbanId: phongbanId,
          trangThai: 'DANGLAMVIEC',
          isActive: true,
        },
      });
      
      successCount++;
      console.log(`  ✅ Created: ${nhanvien.maNV} - ${nhanvien.hoTen}${phongbanId ? ` (Phòng ban: ${nv['PHÒNG BAN']})` : ''}`);
    } catch (error: any) {
      errorCount++;
      if (error.code === 'P2002') {
        console.log(`  ⚠️ Already exists: ${nv['MÃ NV']} - ${nv['TÊN NV']}`);
      } else {
        console.error(`  ❌ Error creating ${nv['MÃ NV']}:`, error.message);
      }
    }
  }
  
  console.log(`\n✅ Nhanvien import completed!`);
  console.log(`   - Success: ${successCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total: ${nhanvienData.length}`);
}

async function main() {
  try {
    console.log('🚀 Starting import process...\n');
    console.log('=' .repeat(60));
    
    // Import phòng ban trước
    const phongbanMap = await importPhongban();
    
    console.log('\n' + '='.repeat(60));
    
    // Import nhân viên sau
    await importNhanvien(phongbanMap);
    
    console.log('\n' + '='.repeat(60));
    console.log('\n🎉 Import process completed successfully!');
    
    // Thống kê
    const phongbanCount = await prisma.phongban.count();
    const nhanvienCount = await prisma.nhanvien.count();
    
    console.log('\n📊 Database Statistics:');
    console.log(`   - Total Phongban: ${phongbanCount}`);
    console.log(`   - Total Nhanvien: ${nhanvienCount}`);
    
    // Hiển thị cấu trúc phòng ban
    console.log('\n🏢 Department Structure:');
    const rootDepartments = await prisma.phongban.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
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
    
    for (const dept of rootDepartments) {
      console.log(`   📁 ${dept.ma} - ${dept.ten} (${dept._count.nhanviens} nhân viên)`);
      for (const child of dept.children) {
        console.log(`      └─ ${child.ma} - ${child.ten} (${child._count.nhanviens} nhân viên)`);
      }
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
main()
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });

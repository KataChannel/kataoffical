import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UpdateStats {
  totalDonhang: number;
  updatedDonhang: number;
  totalSanpham: number;
  updatedSanpham: number;
  errors: string[];
  warnings: string[];
}

const stats: UpdateStats = {
  totalDonhang: 0,
  updatedDonhang: 0,
  totalSanpham: 0,
  updatedSanpham: 0,
  errors: [],
  warnings: []
};

/**
 * Cập nhật giá bán cho một sản phẩm trong đơn hàng
 */
async function updateDonhangsanphamGiaban(
  donhangsanphamId: string,
  newGiaban: number
): Promise<boolean> {
  try {
    await prisma.donhangsanpham.update({
      where: { id: donhangsanphamId },
      data: { giaban: newGiaban }
    });
    return true;
  } catch (error) {
    stats.errors.push(`Error updating donhangsanpham ${donhangsanphamId}: ${error}`);
    return false;
  }
}

/**
 * Cập nhật giá bán cho tất cả sản phẩm trong một đơn hàng
 */
async function updateDonhangGiaban(donhangId: string): Promise<void> {
  try {
    // Lấy thông tin đơn hàng với khách hàng và sản phẩm
    const donhang = await prisma.donhang.findUnique({
      where: { id: donhangId },
      include: {
        khachhang: {
          include: {
            banggia: {
              include: {
                sanpham: true // banggiasanpham
              }
            }
          }
        },
        sanpham: {
          include: {
            sanpham: true // thông tin sản phẩm
          }
        }
      }
    });

    if (!donhang) {
      stats.warnings.push(`Donhang ${donhangId} not found`);
      return;
    }

    if (!donhang.khachhang) {
      stats.warnings.push(`Donhang ${donhang.madonhang} has no khachhang`);
      return;
    }

    if (!donhang.khachhang.banggia) {
      stats.warnings.push(`Khachhang ${donhang.khachhang.makh} has no banggia`);
      return;
    }

    let hasUpdates = false;
    const banggiaSanphamMap = new Map<string, number>();
    
    // Tạo map từ sanphamId -> giaban từ bảng giá
    donhang.khachhang.banggia.sanpham.forEach(bgs => {
      banggiaSanphamMap.set(bgs.sanphamId, parseFloat(bgs.giaban.toString()));
    });

    // Lấy bảng giá mặc định để fallback
    const banggiaDefault = await prisma.banggia.findUnique({
      where: { id: '84a62698-5784-4ac3-b506-5e662d1511cb' },
      include: { sanpham: true }
    });
    const defaultBanggiaMap = new Map<string, number>();
    if (banggiaDefault) {
      banggiaDefault.sanpham.forEach(bgs => {
        defaultBanggiaMap.set(bgs.sanphamId, parseFloat(bgs.giaban.toString()));
      });
    }

    // Cập nhật giá cho từng sản phẩm trong đơn hàng
    for (const donhangsanpham of donhang.sanpham) {
      stats.totalSanpham++;
      
      const sanphamId = donhangsanpham.idSP;
      const currentGiaban = parseFloat(donhangsanpham.giaban.toString());
      let targetPrice = banggiaSanphamMap.get(sanphamId);

      // Nếu giá trong bảng giá khách = 0 hoặc không có, fallback sang BG04
      if (targetPrice === undefined || targetPrice <= 0) {
        const fallbackPrice = defaultBanggiaMap.get(sanphamId);
        if (fallbackPrice !== undefined && fallbackPrice > 0) {
          targetPrice = fallbackPrice;
        }
      }

      if (targetPrice !== undefined && targetPrice > 0) {
        if (Math.abs(currentGiaban - targetPrice) > 0.01) {
          const success = await updateDonhangsanphamGiaban(
            donhangsanpham.id,
            targetPrice
          );
          
          if (success) {
            console.log(`Updated ${donhang.madonhang} - ${donhangsanpham.sanpham?.masp}: ${currentGiaban} -> ${targetPrice}`);
            stats.updatedSanpham++;
            hasUpdates = true;
          }
        }
      } else {
        stats.warnings.push(`No valid price found for product ${donhangsanpham.sanpham?.masp} in banggia ${donhang.khachhang.banggia.mabanggia} or default BG04`);
      }
    }

    if (hasUpdates) {
      stats.updatedDonhang++;
    }

  } catch (error) {
    stats.errors.push(`Error processing donhang ${donhangId}: ${error}`);
  }
}

/**
 * Cập nhật giá bán cho danh sách các đơn hàng cụ thể
 */
export async function updateSpecificDonhangsGiaban(donhangIds: string[]): Promise<void> {
  console.log(`🎯 Starting update for ${donhangIds.length} specific donhang...`);
  const startTime = Date.now();

  for (let i = 0; i < donhangIds.length; i++) {
    const donhangId = donhangIds[i];
    await updateDonhangGiaban(donhangId);
    
    if ((i + 1) % 10 === 0) {
      console.log(`📊 Processed ${i + 1}/${donhangIds.length} donhang`);
    }
  }

  const duration = Date.now() - startTime;
  console.log(`\n✅ Update completed in ${duration}ms`);
  printStats();
}

/**
 * Cập nhật giá bán cho tất cả đơn hàng
 */
export async function updateAllDonhangsGiaban(): Promise<void> {
  console.log('🚀 Starting bulk update of all donhang giaban...');
  const startTime = Date.now();

  try {
    // Lấy tất cả đơn hàng có khách hàng và bảng giá
    const donhangs = await prisma.donhang.findMany({
      where: {
        khachhangId: { not: null },
        khachhang: {
          banggiaId: { not: null }
        }
      },
      select: { id: true, madonhang: true }
    });

    stats.totalDonhang = donhangs.length;
    console.log(`📋 Found ${donhangs.length} donhang with khachhang and banggia`);

    // Xử lý từng đơn hàng
    for (let i = 0; i < donhangs.length; i++) {
      const donhang = donhangs[i];
      await updateDonhangGiaban(donhang.id);

      // Progress report every 100 orders
      if ((i + 1) % 100 === 0) {
        const progress = ((i + 1) / donhangs.length * 100).toFixed(1);
        console.log(`📊 Progress: ${i + 1}/${donhangs.length} (${progress}%) - Updated: ${stats.updatedDonhang} donhang, ${stats.updatedSanpham} sanpham`);
      }
    }

    const duration = Date.now() - startTime;
    console.log(`\n✅ Bulk update completed in ${duration}ms (${(duration/1000).toFixed(1)}s)`);
    
  } catch (error) {
    stats.errors.push(`Fatal error in bulk update: ${error}`);
    console.error('❌ Fatal error:', error);
  }

  printStats();
}

/**
 * Cập nhật giá bán cho đơn hàng của khách hàng cụ thể
 */
export async function updateDonhangsByKhachhang(khachhangId: string): Promise<void> {
  console.log(`🎯 Starting update for khachhang: ${khachhangId}`);
  
  try {
    const donhangs = await prisma.donhang.findMany({
      where: { khachhangId },
      select: { id: true, madonhang: true }
    });

    console.log(`📋 Found ${donhangs.length} donhang for this khachhang`);
    
    for (const donhang of donhangs) {
      await updateDonhangGiaban(donhang.id);
    }

    printStats();
  } catch (error) {
    console.error('❌ Error updating by khachhang:', error);
  }
}

/**
 * Cập nhật giá bán cho các đơn hàng sử dụng bảng giá cụ thể
 */
export async function updateDonhangsByBanggia(banggiaId: string): Promise<void> {
  console.log(`🎯 Starting update for banggia: ${banggiaId}`);
  
  try {
    const donhangs = await prisma.donhang.findMany({
      where: { 
        banggiaId,
        khachhangId: { not: null }
      },
      select: { id: true, madonhang: true }
    });

    console.log(`📋 Found ${donhangs.length} donhang for this banggia`);
    
    for (const donhang of donhangs) {
      await updateDonhangGiaban(donhang.id);
    }

    printStats();
  } catch (error) {
    console.error('❌ Error updating by banggia:', error);
  }
}

/**
 * In thống kê kết quả
 */
function printStats(): void {
  console.log('\n📊 UPDATE STATISTICS:');
  console.log(`├─ Total Donhang: ${stats.totalDonhang}`);
  console.log(`├─ Updated Donhang: ${stats.updatedDonhang}`);
  console.log(`├─ Total Sanpham: ${stats.totalSanpham}`);
  console.log(`├─ Updated Sanpham: ${stats.updatedSanpham}`);
  console.log(`├─ Errors: ${stats.errors.length}`);
  console.log(`└─ Warnings: ${stats.warnings.length}`);

  if (stats.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    stats.errors.forEach(error => console.log(`   ${error}`));
  }

  if (stats.warnings.length > 0 && stats.warnings.length <= 10) {
    console.log('\n⚠️  WARNINGS:');
    stats.warnings.forEach(warning => console.log(`   ${warning}`));
  } else if (stats.warnings.length > 10) {
    console.log(`\n⚠️  WARNINGS: ${stats.warnings.length} warnings (showing first 10)`);
    stats.warnings.slice(0, 10).forEach(warning => console.log(`   ${warning}`));
  }
}

/**
 * Test function - cập nhật một đơn hàng cụ thể
 */
export async function testUpdateDonhang(madonhang: string): Promise<void> {
  console.log(`🧪 Testing update for donhang: ${madonhang}`);
  
  try {
    const donhang = await prisma.donhang.findUnique({
      where: { madonhang },
      select: { id: true }
    });

    if (!donhang) {
      console.log(`❌ Donhang ${madonhang} not found`);
      return;
    }

    await updateDonhangGiaban(donhang.id);
    printStats();
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  try {
    if (args.includes('--test') && args[1]) {
      // Test với đơn hàng cụ thể
      await testUpdateDonhang(args[1]);
    } else if (args.includes('--khachhang') && args[1]) {
      // Cập nhật theo khách hàng
      await updateDonhangsByKhachhang(args[1]);
    } else if (args.includes('--banggia') && args[1]) {
      // Cập nhật theo bảng giá
      await updateDonhangsByBanggia(args[1]);
    } else if (args.includes('--ids')) {
      // Cập nhật danh sách ID cụ thể
      const ids = args.slice(1);
      await updateSpecificDonhangsGiaban(ids);
    } else {
      // Cập nhật tất cả
      await updateAllDonhangsGiaban();
    }
  } catch (error) {
    console.error('❌ Main execution error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chỉ chạy main nếu file này được execute trực tiếp
if (require.main === module) {
  main().catch(console.error);
}
import { PrismaClient, Decimal } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * FIX I100008 — Bắp mỹ trái (Loại 1)
 * 
 * Root cause: Production server ran OLD code that used `updatedAt` instead of `ngaygiao`
 * in the Donhangsanpham export query, pulling 6 extra old orders (64 units total).
 * 
 * Correction:
 * - Chotkhodetail (17/06): sltonhethong 89→153, sltonthucte 89→153
 * - TonKho: slton 88→152, sltontt 88→152 (153 - 1 post-chotkho export)
 * - SanphamKho: soluong 88→152
 */
async function main() {
  const CHOTKHODETAIL_ID = 'd61e2fa0-2079-469a-be06-e3b5d9e24186';
  const TONKHO_ID = 'd4e622d9-230c-4047-b157-86b445a05d29';
  const SANPHAMKHO_ID = 'a46402fc-760d-4043-a0cf-5de71e0d434e';
  const SANPHAM_ID = 'bf93ef1b-31d6-40ca-affe-1a98a55f07e0';

  console.log('=== FIX I100008 DATA ===\n');

  // 1. Verify current values before fixing
  const currentCkd = await prisma.chotkhodetail.findUnique({ where: { id: CHOTKHODETAIL_ID } });
  const currentTk = await prisma.tonKho.findUnique({ where: { id: TONKHO_ID } });
  const currentSpk = await prisma.sanphamKho.findUnique({ where: { id: SANPHAMKHO_ID } });

  console.log('--- BEFORE FIX ---');
  console.log(`Chotkhodetail: sltonhethong=${currentCkd?.sltonhethong}, sltonthucte=${currentCkd?.sltonthucte}, chenhlech=${currentCkd?.chenhlech}`);
  console.log(`TonKho: slton=${currentTk?.slton}, sltontt=${currentTk?.sltontt}`);
  console.log(`SanphamKho: soluong=${currentSpk?.soluong}`);

  // Safety check
  if (Number(currentCkd?.sltonhethong) !== 89 || Number(currentCkd?.sltonthucte) !== 89) {
    console.error('❌ ABORT: Chotkhodetail values do not match expected (89/89). Data may have been modified.');
    return;
  }

  // 2. Apply fixes in a transaction
  await prisma.$transaction(async (tx) => {
    // Fix Chotkhodetail: sltonhethong 89→153, sltonthucte 89→153, chenhlech stays 0
    await tx.chotkhodetail.update({
      where: { id: CHOTKHODETAIL_ID },
      data: {
        sltonhethong: new Decimal(153),
        sltonthucte: new Decimal(153),
        chenhlech: new Decimal(0),
        ghichu: 'Tự động đưa qua (không có trong Excel - Auto-carried) [FIX: sltonhethong 89→153, code cũ dùng updatedAt thay ngaygiao]'
      }
    });
    console.log('✅ Chotkhodetail updated: 89 → 153');

    // Fix TonKho: 88→152 (153 - 1 post-chotkho export PX-TG-AA47738)
    await tx.tonKho.update({
      where: { id: TONKHO_ID },
      data: {
        slton: new Decimal(152),
        sltontt: new Decimal(152)
      }
    });
    console.log('✅ TonKho updated: 88 → 152');

    // Fix SanphamKho: 88→152
    await tx.sanphamKho.update({
      where: { id: SANPHAMKHO_ID },
      data: {
        soluong: new Decimal(152)
      }
    });
    console.log('✅ SanphamKho updated: 88 → 152');
  });

  // 3. Verify after fix
  const fixedCkd = await prisma.chotkhodetail.findUnique({ where: { id: CHOTKHODETAIL_ID } });
  const fixedTk = await prisma.tonKho.findUnique({ where: { id: TONKHO_ID } });
  const fixedSpk = await prisma.sanphamKho.findUnique({ where: { id: SANPHAMKHO_ID } });

  console.log('\n--- AFTER FIX ---');
  console.log(`Chotkhodetail: sltonhethong=${fixedCkd?.sltonhethong}, sltonthucte=${fixedCkd?.sltonthucte}, chenhlech=${fixedCkd?.chenhlech}`);
  console.log(`TonKho: slton=${fixedTk?.slton}, sltontt=${fixedTk?.sltontt}`);
  console.log(`SanphamKho: soluong=${fixedSpk?.soluong}`);

  console.log('\n=== FIX COMPLETE ===');

  await prisma.$disconnect();
}

main().catch(console.error);

-- CreateTable
CREATE TABLE "Dexuat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tienBangChu" TEXT NOT NULL,
    "tongTien" INTEGER NOT NULL,
    "tongChi" INTEGER NOT NULL,
    "ngayTao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nguoiNhan" TEXT NOT NULL,
    "truongBoPhan" TEXT NOT NULL,
    "nguoiDeXuat" TEXT NOT NULL,
    "boPhan" TEXT NOT NULL,
    "viTri" TEXT NOT NULL,
    "tamUng" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Dexuat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChitietDexuat" (
    "id" TEXT NOT NULL,
    "dexuatId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thanhTien" INTEGER NOT NULL,
    "ghiChu" TEXT,

    CONSTRAINT "ChitietDexuat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChitietDexuat" ADD CONSTRAINT "ChitietDexuat_dexuatId_fkey" FOREIGN KEY ("dexuatId") REFERENCES "Dexuat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

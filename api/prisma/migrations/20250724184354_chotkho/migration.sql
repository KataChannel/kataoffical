-- CreateTable
CREATE TABLE "Chotkho" (
    "id" TEXT NOT NULL,
    "khoId" TEXT,
    "sanphamId" TEXT,
    "tonkhoId" TEXT,
    "phieukhoId" TEXT,
    "ngay" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slthucte" DECIMAL(20,2) NOT NULL,
    "slhethong" DECIMAL(20,2) NOT NULL,
    "chenhlech" DECIMAL(20,2),
    "ghichu" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chotkho_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chotkho" ADD CONSTRAINT "Chotkho_khoId_fkey" FOREIGN KEY ("khoId") REFERENCES "Kho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chotkho" ADD CONSTRAINT "Chotkho_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "Sanpham"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chotkho" ADD CONSTRAINT "Chotkho_tonkhoId_fkey" FOREIGN KEY ("tonkhoId") REFERENCES "TonKho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chotkho" ADD CONSTRAINT "Chotkho_phieukhoId_fkey" FOREIGN KEY ("phieukhoId") REFERENCES "PhieuKho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

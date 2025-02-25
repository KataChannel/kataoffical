-- CreateTable
CREATE TABLE "Congty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "diachi" TEXT,
    "email" TEXT,
    "sdt" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Congty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kho" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "diachi" TEXT,
    "congtyId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SanphamKho" (
    "id" TEXT NOT NULL,
    "khoId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "soluong" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SanphamKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhieuKho" (
    "id" TEXT NOT NULL,
    "maphieu" TEXT NOT NULL,
    "ngay" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "khoId" TEXT NOT NULL,
    "ghichu" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhieuKho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhieuKhoSanpham" (
    "id" TEXT NOT NULL,
    "phieuKhoId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "soluong" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhieuKhoSanpham_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kho" ADD CONSTRAINT "Kho_congtyId_fkey" FOREIGN KEY ("congtyId") REFERENCES "Congty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanphamKho" ADD CONSTRAINT "SanphamKho_khoId_fkey" FOREIGN KEY ("khoId") REFERENCES "Kho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanphamKho" ADD CONSTRAINT "SanphamKho_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhieuKho" ADD CONSTRAINT "PhieuKho_khoId_fkey" FOREIGN KEY ("khoId") REFERENCES "Kho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhieuKhoSanpham" ADD CONSTRAINT "PhieuKhoSanpham_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhieuKhoSanpham" ADD CONSTRAINT "PhieuKhoSanpham_phieuKhoId_fkey" FOREIGN KEY ("phieuKhoId") REFERENCES "PhieuKho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

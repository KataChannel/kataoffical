/*
  Warnings:

  - You are about to drop the `Khachhang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_KhachhangNhom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_KhachhangNhom" DROP CONSTRAINT "_KhachhangNhom_A_fkey";

-- DropForeignKey
ALTER TABLE "_KhachhangNhom" DROP CONSTRAINT "_KhachhangNhom_B_fkey";

-- DropTable
DROP TABLE "Khachhang";

-- DropTable
DROP TABLE "_KhachhangNhom";

-- CreateTable
CREATE TABLE "khachhang" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nhomkhachhangId" TEXT,

    CONSTRAINT "khachhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donhang" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "khachhangId" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donhangsanpham" (
    "id" TEXT NOT NULL,
    "donhangId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "sldat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slgiao" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slnhan" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slhuy" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gia" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donhangsanpham_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "khachhang_codeId_key" ON "khachhang"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "khachhang_email_key" ON "khachhang"("email");

-- CreateIndex
CREATE UNIQUE INDEX "khachhang_phone_key" ON "khachhang"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "donhang_codeId_key" ON "donhang"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "donhangsanpham_donhangId_sanphamId_key" ON "donhangsanpham"("donhangId", "sanphamId");

-- AddForeignKey
ALTER TABLE "khachhang" ADD CONSTRAINT "khachhang_nhomkhachhangId_fkey" FOREIGN KEY ("nhomkhachhangId") REFERENCES "Nhomkhachhang"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donhang" ADD CONSTRAINT "donhang_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "khachhang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donhangsanpham" ADD CONSTRAINT "donhangsanpham_donhangId_fkey" FOREIGN KEY ("donhangId") REFERENCES "donhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donhangsanpham" ADD CONSTRAINT "donhangsanpham_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "sanpham"("id") ON DELETE CASCADE ON UPDATE CASCADE;

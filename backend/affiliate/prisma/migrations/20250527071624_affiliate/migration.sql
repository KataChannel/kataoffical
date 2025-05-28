-- AlterTable
ALTER TABLE "TrackingEvent" ADD COLUMN     "sharePlatform" TEXT;

-- CreateTable
CREATE TABLE "KhachHang" (
    "id" TEXT NOT NULL,
    "ten" TEXT NOT NULL,
    "email" TEXT,
    "sdt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KhachHang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoanhThu" (
    "id" TEXT NOT NULL,
    "khachHangId" TEXT,
    "soTien" DOUBLE PRECISION NOT NULL,
    "ngay" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoanhThu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KhachHang_email_key" ON "KhachHang"("email");

-- AddForeignKey
ALTER TABLE "DoanhThu" ADD CONSTRAINT "DoanhThu_khachHangId_fkey" FOREIGN KEY ("khachHangId") REFERENCES "KhachHang"("id") ON DELETE SET NULL ON UPDATE CASCADE;

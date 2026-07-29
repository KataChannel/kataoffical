-- CreateTable
CREATE TABLE "public"."ChotCongNo" (
    "id" TEXT NOT NULL,
    "soBienBan" TEXT NOT NULL,
    "khachhangId" TEXT NOT NULL,
    "tuNgay" TIMESTAMP(3) NOT NULL,
    "denNgay" TIMESTAMP(3) NOT NULL,
    "soHeThong" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "soChot" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "chenhLech" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "lyDo" TEXT,
    "trangThai" TEXT NOT NULL DEFAULT 'NHAP',
    "butToanId" TEXT,
    "ngayChot" TIMESTAMP(3),
    "nguoiChot" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChotCongNo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChotCongNo_soBienBan_key" ON "public"."ChotCongNo"("soBienBan");

-- CreateIndex
CREATE INDEX "ChotCongNo_khachhangId_denNgay_idx" ON "public"."ChotCongNo"("khachhangId", "denNgay");

-- CreateIndex
CREATE INDEX "ChotCongNo_trangThai_idx" ON "public"."ChotCongNo"("trangThai");


-- CreateTable
CREATE TABLE "public"."ChotCongNoChiTiet" (
    "id" TEXT NOT NULL,
    "chotId" TEXT NOT NULL,
    "donhangId" TEXT,
    "madonhang" TEXT,
    "ngay" TIMESTAMP(3),
    "soHeThong" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "soChot" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "chenhLech" DECIMAL(20,3) NOT NULL DEFAULT 0,
    "ghichu" TEXT,

    CONSTRAINT "ChotCongNoChiTiet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChotCongNoChiTiet_chotId_idx" ON "public"."ChotCongNoChiTiet"("chotId");

-- AddForeignKey
ALTER TABLE "public"."ChotCongNoChiTiet" ADD CONSTRAINT "ChotCongNoChiTiet_chotId_fkey" FOREIGN KEY ("chotId") REFERENCES "public"."ChotCongNo"("id") ON DELETE CASCADE ON UPDATE CASCADE;


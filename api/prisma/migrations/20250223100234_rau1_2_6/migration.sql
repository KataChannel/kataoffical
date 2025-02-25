-- CreateTable
CREATE TABLE "Nhacungcap" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mancc" TEXT NOT NULL,
    "diachi" TEXT NOT NULL,
    "email" TEXT,
    "sdt" TEXT,
    "ghichu" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Nhacungcap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dathang" (
    "id" TEXT NOT NULL,
    "madncc" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "nhacungcapId" TEXT NOT NULL,
    "giohangId" TEXT,

    CONSTRAINT "Dathang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DathangSanpham" (
    "id" TEXT NOT NULL,
    "dathangId" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,

    CONSTRAINT "DathangSanpham_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nhacungcap_mancc_key" ON "Nhacungcap"("mancc");

-- CreateIndex
CREATE UNIQUE INDEX "Nhacungcap_email_key" ON "Nhacungcap"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dathang_madncc_key" ON "Dathang"("madncc");

-- AddForeignKey
ALTER TABLE "Dathang" ADD CONSTRAINT "Dathang_nhacungcapId_fkey" FOREIGN KEY ("nhacungcapId") REFERENCES "Nhacungcap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dathang" ADD CONSTRAINT "Dathang_giohangId_fkey" FOREIGN KEY ("giohangId") REFERENCES "Giohang"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DathangSanpham" ADD CONSTRAINT "DathangSanpham_dathangId_fkey" FOREIGN KEY ("dathangId") REFERENCES "Dathang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DathangSanpham" ADD CONSTRAINT "DathangSanpham_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

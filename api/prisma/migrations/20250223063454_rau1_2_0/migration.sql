-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "provider" TEXT,
    "providerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "slug" TEXT,
    "parentId" TEXT,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "bio" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sanpham" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT,
    "masp" TEXT NOT NULL,
    "giagoc" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dvt" TEXT,
    "hinhanh" TEXT,
    "soluong" INTEGER NOT NULL DEFAULT 0,
    "soluongkho" INTEGER NOT NULL DEFAULT 0,
    "ghichu" TEXT,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sanpham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donhang" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "madonhang" TEXT NOT NULL,
    "ngaygiao" TIMESTAMP(3) NOT NULL,
    "ghichu" TEXT,
    "khachhang" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Donhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Giohang" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "donhangId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Giohang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Giohangsanpham" (
    "id" TEXT NOT NULL,
    "idSP" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sldat" INTEGER NOT NULL,
    "slgiao" INTEGER NOT NULL,
    "slnhan" INTEGER NOT NULL,
    "ttdat" DOUBLE PRECISION NOT NULL,
    "ttgiao" DOUBLE PRECISION NOT NULL,
    "ttnhan" DOUBLE PRECISION NOT NULL,
    "giohangId" TEXT NOT NULL,

    CONSTRAINT "Giohangsanpham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banggia" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "batdau" TIMESTAMP(3) NOT NULL,
    "ketthuc" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Banggia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banggiasanpham" (
    "id" TEXT NOT NULL,
    "sanphamId" TEXT NOT NULL,
    "banggiaId" TEXT NOT NULL,

    CONSTRAINT "Banggiasanpham_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Sanpham_slug_key" ON "Sanpham"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Sanpham_masp_key" ON "Sanpham"("masp");

-- CreateIndex
CREATE UNIQUE INDEX "Donhang_madonhang_key" ON "Donhang"("madonhang");

-- CreateIndex
CREATE UNIQUE INDEX "Giohang_donhangId_key" ON "Giohang"("donhangId");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Giohang" ADD CONSTRAINT "Giohang_donhangId_fkey" FOREIGN KEY ("donhangId") REFERENCES "Donhang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Giohangsanpham" ADD CONSTRAINT "Giohangsanpham_idSP_fkey" FOREIGN KEY ("idSP") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Giohangsanpham" ADD CONSTRAINT "Giohangsanpham_giohangId_fkey" FOREIGN KEY ("giohangId") REFERENCES "Giohang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banggiasanpham" ADD CONSTRAINT "Banggiasanpham_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banggiasanpham" ADD CONSTRAINT "Banggiasanpham_banggiaId_fkey" FOREIGN KEY ("banggiaId") REFERENCES "Banggia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

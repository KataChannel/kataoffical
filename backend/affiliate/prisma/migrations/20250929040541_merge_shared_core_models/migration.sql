-- CreateEnum
CREATE TYPE "serviceType" AS ENUM ('core', 'spa', 'cms', 'academy', 'affiliate', 'cosmetics', 'ecommerce');

-- CreateEnum
CREATE TYPE "DriveItemType" AS ENUM ('folder', 'file');

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "serviceType" "serviceType" DEFAULT 'core';

-- CreateTable
CREATE TABLE "Khachhang" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "namenn" TEXT,
    "makh" TEXT NOT NULL,
    "diachi" TEXT,
    "sdt" TEXT,
    "mst" TEXT,
    "gionhanhang" TEXT,
    "quan" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "loaikh" TEXT,
    "ghichu" TEXT,
    "hiengia" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Khachhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nhomkhachhang" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nhomkhachhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quanlyqrcode" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "qrcode" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isSentEmail" BOOLEAN NOT NULL DEFAULT false,
    "isSentZalo" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "checkedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quanlyqrcode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriveItem" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DriveItemType" NOT NULL,
    "parentId" TEXT,
    "mimeType" TEXT,
    "path" TEXT,
    "size" BIGINT,
    "isDelete" BOOLEAN DEFAULT false,
    "createdTime" TIMESTAMP(3),
    "modifiedTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriveItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionDrive" (
    "id" TEXT NOT NULL,
    "userIdDrive" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "emailAddress" TEXT,
    "role" TEXT NOT NULL,
    "driveId" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PermissionDrive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dexuat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tienbangchu" TEXT,
    "tongtien" INTEGER,
    "tongchi" INTEGER,
    "ngaytao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "nguoinhan" TEXT,
    "truongbophan" TEXT,
    "nguoidexuat" TEXT,
    "bophan" TEXT,
    "vitri" TEXT,
    "attachments" JSONB DEFAULT '[]',
    "ghichu" TEXT,
    "tamung" INTEGER DEFAULT 0,
    "codeId" TEXT NOT NULL,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dexuat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChitietDexuat" (
    "id" TEXT NOT NULL,
    "dexuatId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thanhtien" INTEGER,
    "ghichu" TEXT,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChitietDexuat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KhachhangNhom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_KhachhangNhom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Khachhang_makh_key" ON "Khachhang"("makh");

-- CreateIndex
CREATE UNIQUE INDEX "Nhomkhachhang_name_key" ON "Nhomkhachhang"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_qrcode_key" ON "Quanlyqrcode"("qrcode");

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_code_key" ON "Quanlyqrcode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_slug_phone_email_key" ON "Quanlyqrcode"("slug", "phone", "email");

-- CreateIndex
CREATE UNIQUE INDEX "DriveItem_googleId_key" ON "DriveItem"("googleId");

-- CreateIndex
CREATE INDEX "DriveItem_type_parentId_idx" ON "DriveItem"("type", "parentId");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionDrive_userIdDrive_driveId_googleId_key" ON "PermissionDrive"("userIdDrive", "driveId", "googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Dexuat_codeId_key" ON "Dexuat"("codeId");

-- CreateIndex
CREATE INDEX "_KhachhangNhom_B_index" ON "_KhachhangNhom"("B");

-- AddForeignKey
ALTER TABLE "PermissionDrive" ADD CONSTRAINT "PermissionDrive_driveId_fkey" FOREIGN KEY ("driveId") REFERENCES "DriveItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dexuat" ADD CONSTRAINT "Dexuat_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChitietDexuat" ADD CONSTRAINT "ChitietDexuat_dexuatId_fkey" FOREIGN KEY ("dexuatId") REFERENCES "Dexuat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KhachhangNhom" ADD CONSTRAINT "_KhachhangNhom_A_fkey" FOREIGN KEY ("A") REFERENCES "Khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KhachhangNhom" ADD CONSTRAINT "_KhachhangNhom_B_fkey" FOREIGN KEY ("B") REFERENCES "Nhomkhachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "StatusDonhang" AS ENUM ('dadat', 'dagiao', 'danhan', 'huy');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('CHAT', 'TASK', 'SUPPORT', 'MEETING', 'NOTIFICATION');

-- CreateEnum
CREATE TYPE "WorkPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE', 'CLOSED', 'SENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "SDT" TEXT,
    "password" TEXT NOT NULL,
    "provider" TEXT,
    "providerId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "slug" TEXT,
    "parentId" TEXT,
    "order" INTEGER,
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
CREATE TABLE "Banggia" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "batdau" TIMESTAMP(3),
    "ketthuc" TIMESTAMP(3),
    "order" INTEGER DEFAULT 1,
    "ghichu" TEXT,
    "status" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banggia_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Donhangsanpham" (
    "id" TEXT NOT NULL,
    "idSP" TEXT NOT NULL,
    "sldat" DOUBLE PRECISION,
    "slgiao" DOUBLE PRECISION,
    "slnhan" DOUBLE PRECISION,
    "ttdat" DOUBLE PRECISION,
    "ttgiao" DOUBLE PRECISION,
    "ttnhan" DOUBLE PRECISION,
    "ghichu" TEXT,
    "donhangId" TEXT NOT NULL,
    "order" INTEGER,
    "isActive" BOOLEAN DEFAULT false,

    CONSTRAINT "Donhangsanpham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donhang" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT,
    "madonhang" TEXT NOT NULL,
    "ngaygiao" TIMESTAMP(3),
    "ghichu" TEXT,
    "status" "StatusDonhang" NOT NULL DEFAULT 'dadat',
    "khachhangId" TEXT NOT NULL,
    "order" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donhang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banggiasanpham" (
    "id" TEXT NOT NULL,
    "giaban" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sanphamId" TEXT NOT NULL,
    "banggiaId" TEXT NOT NULL,
    "order" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Banggiasanpham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nhacungcap" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "mancc" TEXT NOT NULL,
    "diachi" TEXT,
    "email" TEXT,
    "sdt" TEXT,
    "ghichu" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nhacungcap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dathang" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "type" TEXT,
    "madncc" TEXT,
    "ngaynhan" TIMESTAMP(3),
    "ghichu" TEXT,
    "nhacungcapId" TEXT NOT NULL,
    "order" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Dathang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dathangsanpham" (
    "id" TEXT NOT NULL,
    "idSP" TEXT NOT NULL,
    "sldat" DOUBLE PRECISION,
    "slgiao" DOUBLE PRECISION,
    "slnhan" DOUBLE PRECISION,
    "ttdat" DOUBLE PRECISION,
    "ttgiao" DOUBLE PRECISION,
    "ttnhan" DOUBLE PRECISION,
    "ghichu" TEXT,
    "dathangId" TEXT NOT NULL,
    "order" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Dathangsanpham_pkey" PRIMARY KEY ("id")
);

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
    "makho" TEXT,
    "diachi" TEXT,
    "sdt" TEXT,
    "ghichu" TEXT,
    "congtyId" TEXT,
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
    "ghichu" TEXT,
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
    "sldat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "soluong" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ghichu" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhieuKhoSanpham_pkey" PRIMARY KEY ("id")
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
    "soluong" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "soluongkho" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "haohut" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ghichu" TEXT,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sanpham_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAIMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatAIMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAIHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatAIHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "senderId" TEXT,
    "receiverId" TEXT,
    "assignedTo" TEXT,
    "groupId" TEXT,
    "priority" "WorkPriority",
    "status" "ActivityStatus" NOT NULL,
    "deadline" TIMESTAMP(3),
    "meetingLink" TEXT,
    "customerId" TEXT,
    "slaTime" TIMESTAMP(3),
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "details" JSONB,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "order" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadLog" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallLog" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "callTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "outcome" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "CallLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadTag" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "LeadTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT,
    "entity" TEXT,
    "entityId" TEXT,
    "oldValue" JSONB,
    "newValue" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Banggiakhachhang" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Banggiakhachhang_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_KhachhangNhom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_KhachhangNhom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_SDT_key" ON "User"("SDT");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Khachhang_makh_key" ON "Khachhang"("makh");

-- CreateIndex
CREATE UNIQUE INDEX "Nhomkhachhang_name_key" ON "Nhomkhachhang"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Donhang_madonhang_key" ON "Donhang"("madonhang");

-- CreateIndex
CREATE UNIQUE INDEX "Nhacungcap_mancc_key" ON "Nhacungcap"("mancc");

-- CreateIndex
CREATE UNIQUE INDEX "Dathang_madncc_key" ON "Dathang"("madncc");

-- CreateIndex
CREATE UNIQUE INDEX "Sanpham_slug_key" ON "Sanpham"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Sanpham_masp_key" ON "Sanpham"("masp");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_code_key" ON "Lead"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_phone_key" ON "Lead"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "_Banggiakhachhang_B_index" ON "_Banggiakhachhang"("B");

-- CreateIndex
CREATE INDEX "_KhachhangNhom_B_index" ON "_KhachhangNhom"("B");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donhangsanpham" ADD CONSTRAINT "Donhangsanpham_idSP_fkey" FOREIGN KEY ("idSP") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donhangsanpham" ADD CONSTRAINT "Donhangsanpham_donhangId_fkey" FOREIGN KEY ("donhangId") REFERENCES "Donhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donhang" ADD CONSTRAINT "Donhang_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "Khachhang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banggiasanpham" ADD CONSTRAINT "Banggiasanpham_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banggiasanpham" ADD CONSTRAINT "Banggiasanpham_banggiaId_fkey" FOREIGN KEY ("banggiaId") REFERENCES "Banggia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dathang" ADD CONSTRAINT "Dathang_nhacungcapId_fkey" FOREIGN KEY ("nhacungcapId") REFERENCES "Nhacungcap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dathangsanpham" ADD CONSTRAINT "Dathangsanpham_idSP_fkey" FOREIGN KEY ("idSP") REFERENCES "Sanpham"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dathangsanpham" ADD CONSTRAINT "Dathangsanpham_dathangId_fkey" FOREIGN KEY ("dathangId") REFERENCES "Dathang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kho" ADD CONSTRAINT "Kho_congtyId_fkey" FOREIGN KEY ("congtyId") REFERENCES "Congty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "LeadLog" ADD CONSTRAINT "LeadLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadTag" ADD CONSTRAINT "LeadTag_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Banggiakhachhang" ADD CONSTRAINT "_Banggiakhachhang_A_fkey" FOREIGN KEY ("A") REFERENCES "Banggia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Banggiakhachhang" ADD CONSTRAINT "_Banggiakhachhang_B_fkey" FOREIGN KEY ("B") REFERENCES "Khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KhachhangNhom" ADD CONSTRAINT "_KhachhangNhom_A_fkey" FOREIGN KEY ("A") REFERENCES "Khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KhachhangNhom" ADD CONSTRAINT "_KhachhangNhom_B_fkey" FOREIGN KEY ("B") REFERENCES "Nhomkhachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

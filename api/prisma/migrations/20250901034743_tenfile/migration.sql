/*
  Warnings:

  - You are about to drop the column `chenhlech` on the `Chotkho` table. All the data in the column will be lost.
  - You are about to drop the column `phieukhoId` on the `Chotkho` table. All the data in the column will be lost.
  - You are about to drop the column `sanphamId` on the `Chotkho` table. All the data in the column will be lost.
  - You are about to drop the column `slhethong` on the `Chotkho` table. All the data in the column will be lost.
  - You are about to drop the column `slthucte` on the `Chotkho` table. All the data in the column will be lost.
  - You are about to drop the column `tonkhoId` on the `Chotkho` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Chotkho" DROP CONSTRAINT "Chotkho_phieukhoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Chotkho" DROP CONSTRAINT "Chotkho_sanphamId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Chotkho" DROP CONSTRAINT "Chotkho_tonkhoId_fkey";

-- AlterTable
ALTER TABLE "public"."Chotkho" DROP COLUMN "chenhlech",
DROP COLUMN "phieukhoId",
DROP COLUMN "sanphamId",
DROP COLUMN "slhethong",
DROP COLUMN "slthucte",
DROP COLUMN "tonkhoId";

-- AlterTable
ALTER TABLE "public"."TonKho" ADD COLUMN     "sltontt" DECIMAL(20,3) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."ChotkhoDetail" (
    "id" TEXT NOT NULL,
    "chotkhoId" TEXT NOT NULL,
    "sanphamId" TEXT,
    "tonkhoId" TEXT,
    "phieukhoId" TEXT,
    "slthucte" DECIMAL(20,3) NOT NULL,
    "slhethong" DECIMAL(20,3) NOT NULL,
    "chenhlech" DECIMAL(20,3),
    "ghichu" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "order" INTEGER DEFAULT 1,

    CONSTRAINT "ChotkhoDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChotkhoDetail_chotkhoId_idx" ON "public"."ChotkhoDetail"("chotkhoId");

-- CreateIndex
CREATE INDEX "ChotkhoDetail_sanphamId_idx" ON "public"."ChotkhoDetail"("sanphamId");

-- AddForeignKey
ALTER TABLE "public"."ChotkhoDetail" ADD CONSTRAINT "ChotkhoDetail_chotkhoId_fkey" FOREIGN KEY ("chotkhoId") REFERENCES "public"."Chotkho"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChotkhoDetail" ADD CONSTRAINT "ChotkhoDetail_phieukhoId_fkey" FOREIGN KEY ("phieukhoId") REFERENCES "public"."PhieuKho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChotkhoDetail" ADD CONSTRAINT "ChotkhoDetail_sanphamId_fkey" FOREIGN KEY ("sanphamId") REFERENCES "public"."Sanpham"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChotkhoDetail" ADD CONSTRAINT "ChotkhoDetail_tonkhoId_fkey" FOREIGN KEY ("tonkhoId") REFERENCES "public"."TonKho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

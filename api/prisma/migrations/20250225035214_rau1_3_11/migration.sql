-- DropForeignKey
ALTER TABLE "Kho" DROP CONSTRAINT "Kho_congtyId_fkey";

-- AlterTable
ALTER TABLE "Kho" ALTER COLUMN "congtyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Kho" ADD CONSTRAINT "Kho_congtyId_fkey" FOREIGN KEY ("congtyId") REFERENCES "Congty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

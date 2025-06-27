/*
  Warnings:

  - You are about to drop the `ErrorLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "sanpham" ADD COLUMN     "createdById" TEXT;

-- DropTable
DROP TABLE "ErrorLog";

-- AddForeignKey
ALTER TABLE "sanpham" ADD CONSTRAINT "sanpham_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

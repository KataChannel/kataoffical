/*
  Warnings:

  - Added the required column `createdById` to the `Dexuat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Dexuat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dexuat" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "order" INTEGER DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Dexuat" ADD CONSTRAINT "Dexuat_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

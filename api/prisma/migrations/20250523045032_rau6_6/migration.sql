/*
  Warnings:

  - You are about to drop the column `accountId` on the `ImportHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImportHistory" DROP CONSTRAINT "ImportHistory_accountId_fkey";

-- AlterTable
ALTER TABLE "ImportHistory" DROP COLUMN "accountId",
ADD COLUMN     "createdBy" TEXT DEFAULT 'system';

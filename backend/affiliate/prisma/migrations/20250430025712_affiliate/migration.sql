/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `affiliate_partners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "affiliate_partners" DROP COLUMN "passwordHash",
ADD COLUMN     "password" TEXT;

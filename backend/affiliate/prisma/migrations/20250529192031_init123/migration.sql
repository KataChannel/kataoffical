/*
  Warnings:

  - You are about to drop the column `name` on the `Dichvu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dichvu" DROP COLUMN "name",
ADD COLUMN     "serviceCode" TEXT,
ADD COLUMN     "serviceName" TEXT;

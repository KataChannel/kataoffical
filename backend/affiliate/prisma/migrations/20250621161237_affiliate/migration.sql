/*
  Warnings:

  - Added the required column `modifiedDate` to the `lichhen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "khoahoc" ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "lichhen" ADD COLUMN     "branchName" TEXT,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "custCode" TEXT,
ADD COLUMN     "custName" TEXT,
ADD COLUMN     "dateFrom" TIMESTAMP(3),
ADD COLUMN     "isCancel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modifiedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "statusName" TEXT,
ADD COLUMN     "statusTime" TIMESTAMP(3),
ALTER COLUMN "title" DROP NOT NULL;

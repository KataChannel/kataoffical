/*
  Warnings:

  - You are about to drop the column `errorDetails` on the `AuditLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."AuditLog" DROP COLUMN "errorDetails",
ADD COLUMN     "error_details" JSONB;

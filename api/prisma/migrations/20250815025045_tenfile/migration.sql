/*
  Warnings:

  - You are about to drop the column `error_details` on the `AuditLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."AuditLog" DROP COLUMN "error_details",
ADD COLUMN     "errorDetails" JSONB;

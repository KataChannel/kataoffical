/*
  Warnings:

  - A unique constraint covering the columns `[source_id]` on the table `dichvu` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "dichvu_code_key";

-- AlterTable
ALTER TABLE "dichvu" ADD COLUMN     "source_id" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "code" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "dichvu_source_id_key" ON "dichvu"("source_id");

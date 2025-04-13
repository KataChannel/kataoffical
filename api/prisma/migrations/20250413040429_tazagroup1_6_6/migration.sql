/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Quanlyqrcode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Quanlyqrcode" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSentZalo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER DEFAULT 1,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_slug_key" ON "Quanlyqrcode"("slug");

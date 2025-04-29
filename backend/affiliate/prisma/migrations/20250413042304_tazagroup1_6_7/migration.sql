/*
  Warnings:

  - A unique constraint covering the columns `[slug,phone,email]` on the table `Quanlyqrcode` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Quanlyqrcode_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_slug_phone_email_key" ON "Quanlyqrcode"("slug", "phone", "email");

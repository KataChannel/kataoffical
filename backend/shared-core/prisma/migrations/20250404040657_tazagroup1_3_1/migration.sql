/*
  Warnings:

  - You are about to drop the `Kataapp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Kataapp";

-- CreateTable
CREATE TABLE "kataapp" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[],
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kataapp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "kataapp_title_idx" ON "kataapp"("title");

-- CreateIndex
CREATE INDEX "kataapp_tags_idx" ON "kataapp"("tags");

-- CreateIndex
CREATE INDEX "kataapp_authorId_idx" ON "kataapp"("authorId");

-- CreateIndex
CREATE INDEX "kataapp_createdAt_idx" ON "kataapp"("createdAt");

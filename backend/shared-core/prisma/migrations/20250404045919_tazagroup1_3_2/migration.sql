/*
  Warnings:

  - You are about to drop the `kataapp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "kataapp";

-- CreateTable
CREATE TABLE "Kataapp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kataapp_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "sanpham" ADD COLUMN     "danhmucId" TEXT;

-- CreateTable
CREATE TABLE "danhmuc" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "danhmuc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "danhmuc_codeId_key" ON "danhmuc"("codeId");

-- AddForeignKey
ALTER TABLE "sanpham" ADD CONSTRAINT "sanpham_danhmucId_fkey" FOREIGN KEY ("danhmucId") REFERENCES "danhmuc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

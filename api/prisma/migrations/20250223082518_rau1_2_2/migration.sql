/*
  Warnings:

  - Added the required column `makh` to the `Khachhang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Khachhang" ADD COLUMN     "diachi" TEXT,
ADD COLUMN     "gionhanhng" TEXT,
ADD COLUMN     "loaikh" TEXT,
ADD COLUMN     "makh" TEXT NOT NULL,
ADD COLUMN     "mst" TEXT,
ADD COLUMN     "namenn" TEXT,
ADD COLUMN     "quan" TEXT,
ADD COLUMN     "sdt" TEXT;

-- CreateTable
CREATE TABLE "_Banggiakhachhang" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Banggiakhachhang_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Banggiakhachhang_B_index" ON "_Banggiakhachhang"("B");

-- AddForeignKey
ALTER TABLE "_Banggiakhachhang" ADD CONSTRAINT "_Banggiakhachhang_A_fkey" FOREIGN KEY ("A") REFERENCES "Banggia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Banggiakhachhang" ADD CONSTRAINT "_Banggiakhachhang_B_fkey" FOREIGN KEY ("B") REFERENCES "Khachhang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

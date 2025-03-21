-- AlterTable
ALTER TABLE "Sanpham" ADD COLUMN     "loadpoint" DOUBLE PRECISION DEFAULT 0;

-- CreateTable
CREATE TABLE "_NhacungcapToSanpham" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NhacungcapToSanpham_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NhacungcapToSanpham_B_index" ON "_NhacungcapToSanpham"("B");

-- AddForeignKey
ALTER TABLE "_NhacungcapToSanpham" ADD CONSTRAINT "_NhacungcapToSanpham_A_fkey" FOREIGN KEY ("A") REFERENCES "Nhacungcap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NhacungcapToSanpham" ADD CONSTRAINT "_NhacungcapToSanpham_B_fkey" FOREIGN KEY ("B") REFERENCES "Sanpham"("id") ON DELETE CASCADE ON UPDATE CASCADE;

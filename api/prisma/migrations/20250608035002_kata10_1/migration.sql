-- AlterTable
ALTER TABLE "kho" ADD COLUMN     "createdBy" TEXT;

-- AlterTable
ALTER TABLE "nhacungcap" ADD COLUMN     "createdBy" TEXT;

-- AddForeignKey
ALTER TABLE "kho" ADD CONSTRAINT "kho_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nhacungcap" ADD CONSTRAINT "nhacungcap_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

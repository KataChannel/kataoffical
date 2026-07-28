-- AlterTable
ALTER TABLE "Chotkho" ADD COLUMN     "order" INTEGER DEFAULT 1,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Chotkho" ADD CONSTRAINT "Chotkho_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

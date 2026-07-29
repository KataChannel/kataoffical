-- AlterTable
ALTER TABLE "public"."HeThongKhachHang" ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE INDEX "HeThongKhachHang_parentId_idx" ON "public"."HeThongKhachHang"("parentId");

-- AddForeignKey
ALTER TABLE "public"."HeThongKhachHang" ADD CONSTRAINT "HeThongKhachHang_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."HeThongKhachHang"("id") ON DELETE SET NULL ON UPDATE CASCADE;


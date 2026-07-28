-- AlterTable
ALTER TABLE "public"."Dathang" ADD COLUMN     "ngaynhan1" DATE,
ALTER COLUMN "ngaynhan" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Donhang" ADD COLUMN     "ngaygiao1" DATE,
ALTER COLUMN "ngaygiao" SET DATA TYPE TIMESTAMP(3);

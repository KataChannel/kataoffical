-- CreateTable
CREATE TABLE "public"."NhomNcc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NhomNcc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_NhacungcapNhom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NhacungcapNhom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "NhomNcc_name_key" ON "public"."NhomNcc"("name");

-- CreateIndex
CREATE INDEX "_NhacungcapNhom_B_index" ON "public"."_NhacungcapNhom"("B");

-- AddForeignKey
ALTER TABLE "public"."_NhacungcapNhom" ADD CONSTRAINT "_NhacungcapNhom_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Nhacungcap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_NhacungcapNhom" ADD CONSTRAINT "_NhacungcapNhom_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."NhomNcc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Quanlyqrcode" (
    "id" TEXT NOT NULL,
    "qrcode" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quanlyqrcode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_qrcode_key" ON "Quanlyqrcode"("qrcode");

-- CreateIndex
CREATE UNIQUE INDEX "Quanlyqrcode_code_key" ON "Quanlyqrcode"("code");

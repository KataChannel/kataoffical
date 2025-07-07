-- Tạo sequences nếu chưa có
CREATE SEQUENCE kataapp_code_id_seq;
CREATE SEQUENCE kataapp_order_seq;
-- CreateTable
CREATE TABLE "Kataapp" (
    "id" TEXT NOT NULL,
    "codeIdNumber" INTEGER NOT NULL DEFAULT nextval('kataapp_code_id_seq'::regclass),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT nextval('kataapp_order_seq'::regclass),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kataapp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kataapp_codeIdNumber_key" ON "Kataapp"("codeIdNumber");

-- CreateIndex
CREATE INDEX "Kataapp_order_idx" ON "Kataapp"("order");

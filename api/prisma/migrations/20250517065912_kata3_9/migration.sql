-- CreateTable
CREATE TABLE "Mathang" (
    "id" TEXT NOT NULL,
    "codeId" TEXT,
    "ten" TEXT,
    "title" TEXT,
    "title2" TEXT,
    "dvtinh" TEXT,
    "giavon" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mathang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mathang_codeId_key" ON "Mathang"("codeId");

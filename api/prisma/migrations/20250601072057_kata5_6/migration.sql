-- CreateTable
CREATE TABLE "banggia" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banggia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dathang" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dathang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kho" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nhacungcap" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nhacungcap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phieukho" (
    "id" TEXT NOT NULL,
    "codeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phieukho_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "banggia_codeId_key" ON "banggia"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "dathang_codeId_key" ON "dathang"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "kho_codeId_key" ON "kho"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "nhacungcap_codeId_key" ON "nhacungcap"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "phieukho_codeId_key" ON "phieukho"("codeId");

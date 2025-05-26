-- CreateTable
CREATE TABLE "FileManager" (
    "id" TEXT NOT NULL,
    "codeId" TEXT,
    "title" TEXT,
    "url" TEXT,
    "description" TEXT,
    "fileType" TEXT,
    "metaData" JSONB,
    "category" TEXT,
    "group" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileManager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileManager_codeId_key" ON "FileManager"("codeId");

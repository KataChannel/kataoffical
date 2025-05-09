-- CreateTable
CREATE TABLE "UserguidBlock" (
    "id" TEXT NOT NULL,
    "codeId" TEXT,
    "type" TEXT NOT NULL,
    "text" TEXT,
    "listItems" TEXT,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "videoUrl" TEXT,
    "videoType" TEXT,
    "caption" TEXT,
    "stepId" TEXT,
    "order" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserguidBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserguidStep" (
    "id" TEXT NOT NULL,
    "codeId" TEXT,
    "time" TEXT,
    "title" TEXT,
    "description" TEXT,
    "order" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserguidStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserguidBlock_codeId_key" ON "UserguidBlock"("codeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserguidStep_codeId_key" ON "UserguidStep"("codeId");

-- CreateIndex
CREATE INDEX "UserguidStep_id_idx" ON "UserguidStep"("id");

-- AddForeignKey
ALTER TABLE "UserguidBlock" ADD CONSTRAINT "UserguidBlock_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "UserguidStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

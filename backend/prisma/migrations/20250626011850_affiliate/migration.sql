-- CreateTable
CREATE TABLE "khachhang" (
    "id" TEXT NOT NULL,
    "CodeId" TEXT,
    "name" TEXT,
    "code" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "phone2" TEXT,
    "birthday" TIMESTAMP(3),
    "gender" TEXT,
    "address" TEXT,
    "customerSource" TEXT,
    "customerGroup" TEXT,
    "branchId" INTEGER,
    "firstPaidDate" TIMESTAMP(3),
    "firstCheckinDate" TIMESTAMP(3),
    "firstTreatmentDate" TIMESTAMP(3),
    "lastTreatmentDate" TIMESTAMP(3),
    "lastCheckinDate" TIMESTAMP(3),
    "caringStaffCode" TEXT,
    "staffCode" TEXT,
    "createdDate" TIMESTAMP(3),
    "modifiedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "khachhang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "khachhang_CodeId_key" ON "khachhang"("CodeId");

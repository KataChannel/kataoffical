-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "source_id" TEXT,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "codeOld" TEXT,
    "docCode" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "phone2" TEXT,
    "birthday" TIMESTAMP(3),
    "gender" TEXT,
    "address" TEXT,
    "commune" TEXT,
    "district" TEXT,
    "city" TEXT,
    "citizenIdentity" TEXT,
    "identityGrantDate" TIMESTAMP(3),
    "identityIssuedBy" TEXT,
    "customerSource" TEXT,
    "customerGroup" TEXT,
    "branchId" INTEGER,
    "firstPaidDate" TIMESTAMP(3),
    "firstCheckinDate" TIMESTAMP(3),
    "firstTreatmentDate" TIMESTAMP(3),
    "lastTreatmentDate" TIMESTAMP(3),
    "lastCheckinDate" TIMESTAMP(3),
    "ccStaffId" INTEGER,
    "caringStaffCode" TEXT,
    "marStaffId" INTEGER,
    "marStaffCode" TEXT,
    "staffId" INTEGER,
    "staffCode" TEXT,
    "gclid" TEXT,
    "state" INTEGER,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "modifiedDate" TIMESTAMP(3) NOT NULL,
    "modifiedBy" TEXT,
    "extracted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_source_id_key" ON "customers"("source_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_code_key" ON "customers"("code");

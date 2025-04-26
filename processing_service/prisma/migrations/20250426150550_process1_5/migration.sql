/*
  Warnings:

  - You are about to drop the `treats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "treats";

-- CreateTable
CREATE TABLE "treatment" (
    "id" SERIAL NOT NULL,
    "source_id" TEXT NOT NULL,
    "name" TEXT,
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
    "serviceId" INTEGER NOT NULL DEFAULT 0,
    "serviceTypeId" INTEGER NOT NULL DEFAULT 0,
    "serviceCode" TEXT,
    "tabId" INTEGER NOT NULL DEFAULT 0,
    "tabCode" TEXT,
    "comboId" INTEGER NOT NULL DEFAULT 0,
    "comboCode" TEXT,
    "serviceName" TEXT,
    "timeIndex" TEXT,
    "timeToTreatment" INTEGER NOT NULL DEFAULT 0,
    "teethChoosing" TEXT,
    "priceUnit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceRoot" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceDiscounted" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "doctor" INTEGER NOT NULL DEFAULT 0,
    "doctor2" INTEGER NOT NULL DEFAULT 0,
    "doctor3" INTEGER NOT NULL DEFAULT 0,
    "doctor4" INTEGER NOT NULL DEFAULT 0,
    "assistant" INTEGER NOT NULL DEFAULT 0,
    "assistant2" INTEGER NOT NULL DEFAULT 0,
    "assistant3" INTEGER NOT NULL DEFAULT 0,
    "assistant4" INTEGER NOT NULL DEFAULT 0,
    "technician" INTEGER NOT NULL DEFAULT 0,
    "technician2" INTEGER NOT NULL DEFAULT 0,
    "timeTreatIndex" INTEGER NOT NULL DEFAULT 0,
    "percent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percentNew" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percentStage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percentNewStage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "note" TEXT,
    "content" TEXT,
    "contentNext" TEXT,
    "symptoms" TEXT,
    "treatDateNext" TIMESTAMP(3),
    "branchId" INTEGER NOT NULL DEFAULT 0,
    "createdDate" TIMESTAMP(3),
    "createdBy" TEXT,
    "modifiedDate" TIMESTAMP(3),
    "modifiedBy" INTEGER DEFAULT 0,
    "state" INTEGER NOT NULL DEFAULT 0,
    "extractedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "treatment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "treatment_source_id_key" ON "treatment"("source_id");

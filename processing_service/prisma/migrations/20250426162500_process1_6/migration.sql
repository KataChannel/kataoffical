/*
  Warnings:

  - A unique constraint covering the columns `[code,serviceCode,createdDate]` on the table `treatment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "treatment_code_serviceCode_createdDate_key" ON "treatment"("code", "serviceCode", "createdDate");

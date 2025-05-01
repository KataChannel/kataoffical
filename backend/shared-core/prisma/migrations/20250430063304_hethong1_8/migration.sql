-- CreateEnum
CREATE TYPE "serviceType" AS ENUM ('core', 'spa', 'cms', 'academy', 'affiliate', 'cosmetics', 'ecommerce');

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "serviceType" "serviceType" DEFAULT 'core';

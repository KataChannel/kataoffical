-- CreateEnum
CREATE TYPE "public"."TicketStatus" AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- CreateEnum
CREATE TYPE "public"."TicketPriority" AS ENUM ('low', 'medium', 'high', 'urgent');

-- CreateTable
CREATE TABLE "public"."support_tickets" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "public"."TicketStatus" NOT NULL DEFAULT 'open',
    "priority" "public"."TicketPriority" NOT NULL DEFAULT 'medium',
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "technicianId" TEXT,

    CONSTRAINT "support_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."support_responses" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "support_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."support_attachments" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketId" TEXT,
    "responseId" TEXT,

    CONSTRAINT "support_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "support_tickets_createdBy_idx" ON "public"."support_tickets"("createdBy");

-- CreateIndex
CREATE INDEX "support_tickets_technicianId_idx" ON "public"."support_tickets"("technicianId");

-- CreateIndex
CREATE INDEX "support_tickets_status_idx" ON "public"."support_tickets"("status");

-- CreateIndex
CREATE INDEX "support_responses_ticketId_idx" ON "public"."support_responses"("ticketId");

-- CreateIndex
CREATE INDEX "support_responses_createdBy_idx" ON "public"."support_responses"("createdBy");

-- CreateIndex
CREATE INDEX "support_attachments_ticketId_idx" ON "public"."support_attachments"("ticketId");

-- CreateIndex
CREATE INDEX "support_attachments_responseId_idx" ON "public"."support_attachments"("responseId");

-- AddForeignKey
ALTER TABLE "public"."support_tickets" ADD CONSTRAINT "support_tickets_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."support_tickets" ADD CONSTRAINT "support_tickets_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."support_responses" ADD CONSTRAINT "support_responses_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."support_responses" ADD CONSTRAINT "support_responses_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."support_tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."support_attachments" ADD CONSTRAINT "support_attachments_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."support_tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."support_attachments" ADD CONSTRAINT "support_attachments_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "public"."support_responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

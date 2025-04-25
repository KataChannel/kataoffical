-- CreateTable
CREATE TABLE "processed_posts" (
    "id" SERIAL NOT NULL,
    "source_id" INTEGER NOT NULL,
    "title" TEXT,
    "content_length" INTEGER NOT NULL,
    "user_ref" INTEGER,
    "extracted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processed_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "processed_posts_source_id_key" ON "processed_posts"("source_id");

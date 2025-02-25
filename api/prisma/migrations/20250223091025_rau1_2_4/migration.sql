-- CreateTable
CREATE TABLE "Banggiakhachhang" (
    "banggiaId" TEXT NOT NULL,
    "khachhangId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Banggiakhachhang_pkey" PRIMARY KEY ("banggiaId","khachhangId")
);

-- AddForeignKey
ALTER TABLE "Banggiakhachhang" ADD CONSTRAINT "Banggiakhachhang_banggiaId_fkey" FOREIGN KEY ("banggiaId") REFERENCES "Banggia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banggiakhachhang" ADD CONSTRAINT "Banggiakhachhang_khachhangId_fkey" FOREIGN KEY ("khachhangId") REFERENCES "Khachhang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

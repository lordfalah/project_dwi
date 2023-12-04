-- AlterTable
ALTER TABLE "RekamMedis" ADD COLUMN     "dokterId" TEXT;

-- CreateTable
CREATE TABLE "Dokter" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "Dokter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dokter_email_key" ON "Dokter"("email");

-- AddForeignKey
ALTER TABLE "RekamMedis" ADD CONSTRAINT "RekamMedis_dokterId_fkey" FOREIGN KEY ("dokterId") REFERENCES "Dokter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

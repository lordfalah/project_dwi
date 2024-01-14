/*
  Warnings:

  - You are about to drop the column `obatId` on the `RekamMedis` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[obat_pasien_id]` on the table `RekamMedis` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RekamMedis" DROP CONSTRAINT "RekamMedis_obatId_fkey";

-- AlterTable
ALTER TABLE "Obat" ALTER COLUMN "jumlah" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "RekamMedis" DROP COLUMN "obatId",
ADD COLUMN     "obat_pasien_id" TEXT;

-- CreateTable
CREATE TABLE "ObatPasien" (
    "id" TEXT NOT NULL,
    "obat" JSONB,

    CONSTRAINT "ObatPasien_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RekamMedis_obat_pasien_id_key" ON "RekamMedis"("obat_pasien_id");

-- AddForeignKey
ALTER TABLE "RekamMedis" ADD CONSTRAINT "RekamMedis_obat_pasien_id_fkey" FOREIGN KEY ("obat_pasien_id") REFERENCES "ObatPasien"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - Made the column `resep` on table `RekamMedis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `keluhan` on table `RekamMedis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `diagnosa` on table `RekamMedis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `keterangan` on table `RekamMedis` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dokter" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RekamMedis" ADD COLUMN     "obatId" TEXT,
ALTER COLUMN "resep" SET NOT NULL,
ALTER COLUMN "keluhan" SET NOT NULL,
ALTER COLUMN "diagnosa" SET NOT NULL,
ALTER COLUMN "keterangan" SET NOT NULL;

-- CreateTable
CREATE TABLE "Obat" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "ukuran" INTEGER NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "keterangan" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Obat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RekamMedis" ADD CONSTRAINT "RekamMedis_obatId_fkey" FOREIGN KEY ("obatId") REFERENCES "Obat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

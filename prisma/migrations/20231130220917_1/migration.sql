-- CreateTable
CREATE TABLE "Pasien" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "gejala" VARCHAR(100) NOT NULL,

    CONSTRAINT "Pasien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RekamMedis" (
    "id" TEXT NOT NULL,
    "resep" VARCHAR(100),
    "keluhan" VARCHAR(100),
    "diagnosa" VARCHAR(100),
    "keterangan" VARCHAR(100),
    "pasienId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RekamMedis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RekamMedis" ADD CONSTRAINT "RekamMedis_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "Pasien"("id") ON DELETE SET NULL ON UPDATE CASCADE;

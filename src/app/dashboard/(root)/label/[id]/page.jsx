import prisma from "@/libs/prisma";
import Cetak from "./cetak-resume";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Cetak Resume",
  description: "Page Cetak Resume",
};

export const rekamMedis = async (id) => {
  try {
    const response = await prisma.rekamMedis.findFirst({
      where: {
        id,
      },
      include: {
        dokter: true,
        obat_pasien: true,
        pasien: true,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.message || "INTERNAL SERVER ERROR");
  }
};

export default async function page({ params }) {
  const rm = await rekamMedis(params.id);
  if (!rm) {
    notFound();
  }

  return <Cetak data={rm} />;
}

import prisma from "@/libs/prisma";
import Cetak from "./cetak-resume";

export const rekamMedis = async (id) => {
  try {
    const response = await prisma.rekamMedis.findFirst({
      where: {
        id,
      },
      include: {
        dokter: true,
        obat: true,
        pasien: true,
      },
    });
    return response ? response : [];
  } catch (error) {
    return error;
  }
};

export default async function page({ params }) {
  const rm = await rekamMedis(params.id);

  return <Cetak data={rm} />;
}

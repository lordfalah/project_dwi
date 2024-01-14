import prisma from "@/libs/prisma";
import { FormCardsProvider } from "@/utils/context/FormCards";
import Calender from "../form/Calender";
import { CardDokter } from "../form/(cards)/Dokter";
import { CardPasien } from "../form/(cards)/Pasien";
import { CardObat } from "../form/(cards)/Obat";
import FormEdit from "../form/FormEdit";
import { notFound } from "next/navigation";

export const revalidate = 0;

export const rekamMedis = async (id) => {
  try {
    const response = await prisma.rekamMedis.findFirst({
      where: {
        id,
      },
      include: {
        dokter: true,
        pasien: true,
        obat_pasien: true,
      },
    });

    return response;
  } catch (error) {
    throw new Error(error.message || "INTERNAL SERVER ERROR");
  }
};

export const getDokter = async () => {
  try {
    const response = await prisma.dokter.findMany();

    return response ? response : [];
  } catch (error) {
    throw new Error(error.message || "INTERNAL SERVER ERROR");
  }
};

export const getPasien = async () => {
  try {
    const response = await prisma.pasien.findMany();

    return response ? response : [];
  } catch (error) {
    throw new Error(error.message || "INTERNAL SERVER ERROR");
  }
};

export const getObat = async () => {
  try {
    const response = await prisma.obat.findMany();
    return response ? response : [];
  } catch (error) {
    throw new Error(error.message || "INTERNAL SERVER ERROR");
  }
};

const updateDataObatPasien = ({ obats, obat_pasien }) => {
  const obatIdToPropsMap = Object.fromEntries(
    obats.map((obat) => [
      obat.id,
      {
        name: obat.name,
        ukuran: obat.ukuran,
        harga: obat.harga,
        keterangan: obat.keterangan,
        createdAt: obat.createdAt,
      },
    ])
  );

  // Mengganti nilai properti pada objek di dalam obat_pasien dengan properti dari obats
  const obatPasienUpdated = obat_pasien.map((obatPasien) => ({
    ...obatPasien,
    ...obatIdToPropsMap[obatPasien.id],
  }));

  // Mengganti nilai obat_pasien pada data dengan obatPasienUpdated

  return obatPasienUpdated;
};

export const metadata = {
  title: "Edit Resume",
  description: "Page Edit Resume",
};

export default async function page({ params }) {
  const [{ dokter, obat_pasien, pasien, ...data }, dokters, pasiens, obats] =
    await Promise.all([
      rekamMedis(params.id),
      getDokter(),
      getPasien(),
      getObat(),
    ]);

  if (!data.id) {
    notFound();
  }

  const data_obat_pasien = updateDataObatPasien({
    obats,
    obat_pasien: obat_pasien.obat,
  });

  return (
    <div className="space-y-10">
      <FormCardsProvider>
        <div className="bg-white p-4 sm:p-6 flex-wrap rounded-lg items-center mt-4">
          <div className="col-span-2 justify-self-end items-center">
            <Calender createdAt={data.createdAt} />
          </div>
        </div>
        <div className="flex gap-x-10 gap-y-6 justify-between flex-wrap">
          <CardDokter dokters={dokters} deffault={dokter} />
          <CardPasien pasiens={pasiens} deffault={pasien} />
          <CardObat obats={obats} deffault={data_obat_pasien} />
        </div>
        <FormEdit deffault={data} params={params.id} />
      </FormCardsProvider>
    </div>
  );
}

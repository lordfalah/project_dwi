import prisma from "@/libs/prisma";
import { FormCardsProvider } from "@/utils/context/FormCards";
import Calender from "../form/Calender";
import { CardDokter } from "../form/(cards)/Dokter";
import { CardPasien } from "../form/(cards)/Pasien";
import { CardObat } from "../form/(cards)/Obat";
import FormEdit from "../form/FormEdit";
export const revalidate = 0;

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

export const getDokter = async () => {
  try {
    const response = await prisma.dokter.findMany();
    return response ? response : [];
  } catch (error) {
    return error;
  }
};

export const getPasien = async () => {
  try {
    const response = await prisma.pasien.findMany();
    return response ? response : [];
  } catch (error) {
    return error;
  }
};

export const getObat = async () => {
  try {
    const response = await prisma.obat.findMany();
    return response ? response : [];
  } catch (error) {
    return error;
  }
};

export default async function page({ params }) {
  const { dokter, obat, pasien, ...data } = await rekamMedis(params.id);
  const dokters = await getDokter();
  const pasiens = await getPasien();
  const obats = await getObat();

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
          <CardObat obats={obats} deffault={obat} />
        </div>
        <FormEdit deffault={data} params={params.id} />
      </FormCardsProvider>
    </div>
  );
}

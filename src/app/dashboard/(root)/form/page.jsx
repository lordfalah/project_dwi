import React from "react";
import prisma from "@/libs/prisma";
import { CardDokter } from "./(cards)/Dokter";
import { CardPasien } from "./(cards)/Pasien";
import { CardObat } from "./(cards)/Obat";
import Calender from "./Calender";
import { FormCardsProvider } from "@/utils/context/FormCards";
import FormAdd from "./FormAdd";

export const revalidate = 0;
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

export const metadata = {
  title: "Form",
  description: "Page Form",
};

export default async function page() {
  const [dokters, pasiens, obats] = await Promise.all([
    getDokter(),
    getPasien(),
    getObat(),
  ]);

  return (
    <div className="space-y-10">
      <FormCardsProvider>
        <div className="bg-white p-4 sm:p-6 flex-wrap rounded-lg items-center mt-4">
          <div className="col-span-2 justify-self-end items-center">
            <Calender />
          </div>
        </div>
        <div className="flex gap-x-10 gap-y-6 justify-between flex-wrap">
          <CardDokter dokters={dokters} />
          <CardPasien pasiens={pasiens} />
          <CardObat obats={obats} />
        </div>
        <FormAdd />
      </FormCardsProvider>
    </div>
  );
}

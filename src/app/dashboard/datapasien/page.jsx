import React from "react";
import DataPasien from "./data-table";
import prisma from "@/libs/prisma";
import getQueryClient from "@/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const fetchCache = "auto";
export const getPasien = async () => {
  try {
    const response = await prisma.pasien.findMany();
    return response ? response : [];
  } catch (error) {
    return error;
  }
};

const page = async () => {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: ["pasien"],
    queryFn: getPasien,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataPasien />
      </HydrationBoundary>
    </main>
  );
};

export default page;

import prisma from "@/libs/prisma";
import React from "react";
import getQueryClient from "@/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { DataObat } from "./data-table";

export const getObat = async () => {
  try {
    const response = await prisma.obat.findMany();
    return response ? response : [];
  } catch (error) {
    throw new Error(error.message || "INTERNAL SERVER ERROR");
  }
};

export const metadata = {
  title: "Obat",
  description: "Page Obat",
};

const page = async () => {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: ["obat"],
    queryFn: getObat,
  });

  return (
    <main className="">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataObat />
      </HydrationBoundary>
    </main>
  );
};

export default page;

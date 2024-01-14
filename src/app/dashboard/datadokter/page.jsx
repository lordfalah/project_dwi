import prisma from "@/libs/prisma";
import React from "react";
import getQueryClient from "@/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { DataDokter } from "./data-table";

export const fetchCache = "auto";
export const getDokter = async () => {
  try {
    const response = await prisma.dokter.findMany();
    return response ? response : [];
  } catch (error) {
    throw new Error(error.message || "INTERNAL SERVER ERROR");
  }
};

export const metadata = {
  title: "Dokter",
  description: "Page Dokter",
};

export const page = async () => {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: ["dokter"],
    queryFn: getDokter,
  });
  return (
    <main className="">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataDokter />
      </HydrationBoundary>
    </main>
  );
};

export default page;

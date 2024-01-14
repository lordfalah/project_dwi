import prisma from "@/libs/prisma";
import DataTable from "./data-table";
import getQueryClient from "@/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const revalidate = 0;

export const rekamMedis = async () => {
  try {
    const response = await prisma.rekamMedis.findMany({
      include: {
        dokter: true,
        pasien: true,
      },
    });
    return response ? response : [];
  } catch (error) {
    throw new Error(error.message || "INTERNAL SERVER ERROR");
  }
};

export const metadata = {
  title: "Dashboard",
  description: "Page Dashboard",
};

export default async function page() {
  // Inisialisasi QueryClient
  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: ["rekamMedis"],
    queryFn: rekamMedis,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DataTable />
    </HydrationBoundary>
  );
}

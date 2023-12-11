import prisma from "@/libs/prisma";
import DataTable from "./data-table";
import getQueryClient from "@/query/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

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
    return error;
  }
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

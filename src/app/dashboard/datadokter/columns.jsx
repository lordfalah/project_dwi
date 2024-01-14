"use client";

import { Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "@/libs/actions";
import FormEdit from "./FormEdit";

export const columnsDokter = [
  {
    accessorKey: "name",
    header: "NAMA DOKTER",
  },
  {
    accessorKey: "address",
    header: "ALAMAT",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },

  {
    header: "TINDAKAN",
    cell: ({ row }) => {
      const { toast } = useToast();
      const queryClient = useQueryClient();

      const { mutate: deleteMutate } = useMutation({
        mutationFn: clientApi.deleteDokter,
        onMutate: async (id) => {
          await queryClient.cancelQueries({ queryKey: ["dokter"] });
          const previousDokter = queryClient.getQueryData(["dokter"]);

          queryClient.setQueryData(["dokter"], () =>
            previousDokter.filter((posts) => posts?.id !== id)
          );

          return { previousDokter };
        },

        onError: (err, newTodo, context) => {
          queryClient.setQueryData("dokter", context.previousDokter);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              err?.message || "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        },

        onSuccess: () => {
          toast({
            title: "Success",
            variant: "success",
            description: "Data Dokter berhasil di hapus",
          });
        },

        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["dokter"] });
        },
      });

      return (
        <div className="flex gap-x-4">
          <FormEdit data={row?.original} />

          <button
            type="button"
            onClick={() => {
              deleteMutate(row?.original?.id);
            }}
          >
            <Trash />
          </button>
        </div>
      );
    },
  },
];

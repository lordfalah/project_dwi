"use client";

import { Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "@/libs/actions";
import FormEdit from "./FormEdit";

export const columnsPasien = [
  {
    accessorKey: "name",
    header: "NAMA PASIEN",
  },
  {
    accessorKey: "age",
    header: "UMUR",
  },
  {
    accessorKey: "gender",
    header: "GENDER",
  },
  {
    accessorKey: "address",
    header: "ALAMAT",
  },

  {
    accessorKey: "gejala",
    header: "GEJALA",
  },

  {
    header: "TINDAKAN",
    cell: ({ row }) => {
      const { toast } = useToast();
      const queryClient = useQueryClient();

      const { mutate: deleteMutate } = useMutation({
        mutationFn: clientApi.deletePasien,
        onMutate: async (id) => {
          await queryClient.cancelQueries({ queryKey: ["pasien"] });
          const previousPasien = queryClient.getQueryData(["pasien"]);

          queryClient.setQueryData(["pasien"], () =>
            previousPasien.filter((posts) => posts?.id !== id)
          );

          return { previousPasien };
        },

        onError: (err, newTodo, context) => {
          queryClient.setQueryData("pasien", context.previousPasien);
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
            variant: "success",
            title: "Success",
            description: "Data Pasien berhasil di hapus",
          });
        },

        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["pasien"] });
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

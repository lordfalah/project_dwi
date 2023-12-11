"use client";

import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "@/libs/actions";

export const columnsRekamMedis = [
  {
    header: "No",
    cell: ({ row }) => <span className="font-medium">{row?.index + 1}</span>,
  },

  {
    accessorKey: "id",
    header: "REKAM MEDIS",
  },

  {
    header: "PASIEN",
    cell: ({ row }) => <span className="">{row?.original?.pasien?.name}</span>,
  },
  {
    header: "DOKTER",
    cell: ({ row }) => <span className="">{row?.original?.dokter?.name}</span>,
  },
  {
    accessorKey: "keluhan",
    header: "KELUHAN",
  },
  {
    accessorKey: "diagnosa",
    header: "DIAGNOSA",
  },

  {
    accessorKey: "keterangan",
    header: "KETERANGAN",
  },

  {
    header: "TINDAKAN",
    cell: ({ row }) => {
      const { toast } = useToast();
      const queryClient = useQueryClient();

      const { mutate: deleteMutate } = useMutation({
        mutationFn: clientApi.rekamMedisDelete,
        onMutate: async (id) => {
          await queryClient.cancelQueries({ queryKey: ["rekamMedis"] });
          const previousRekamMedis = queryClient.getQueryData(["rekamMedis"]);

          queryClient.setQueryData(["rekamMedis"], () =>
            previousRekamMedis.filter((posts) => posts?.id !== id)
          );

          return { previousRekamMedis };
        },

        onError: (err, newTodo, context) => {
          queryClient.setQueryData("rekamMedis", context.previousRekamMedis);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              err?.message || "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });

          queryClient.invalidateQueries({ queryKey: ["rekamMedis"] });
        },

        onSuccess: () => {
          toast({
            title: "Success",
            description: "Data rekamMedis berhasil di hapus",
          });
        },
      });

      return (
        <div className="flex gap-x-4">
          {/* <Link href={`/dashboard/${row?.original?.id}`}> */}
          <Edit />
          {/* </Link> */}

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

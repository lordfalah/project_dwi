"use client";

import { Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "@/libs/actions";
import { FormEdit } from "./FormEdit";

export const columnsObat = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "ukuran",
    header: "UKURAN",
    cell: ({ row }) => (
      <span className="font-medium">{`${row.getValue("ukuran")} mg`}</span>
    ),
  },
  {
    accessorKey: "harga",
    header: "HARGA",
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
        mutationFn: clientApi.deleteObat,
        onMutate: async (id) => {
          await queryClient.cancelQueries({ queryKey: ["obat"] });
          const previousObat = queryClient.getQueryData(["obat"]);

          queryClient.setQueryData(["obat"], () =>
            previousObat.filter((posts) => posts?.id !== id)
          );

          return { previousObat };
        },

        onError: (err, newTodo, context) => {
          queryClient.setQueryData("obat", context.previousObat);
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
            description: "Data obat berhasil di hapus",
          });
        },

        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["obat"] });
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

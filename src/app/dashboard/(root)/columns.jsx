"use client";

import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientApi } from "@/libs/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EllipseVertical from "@/assets/icon/EllipseVertical";
import View from "@/assets/icon/View";
import { useRouter } from "next/navigation";

export const columnsRekamMedis = [
  {
    header: "No",
    cell: ({ row }) => <span className="font-medium">{row?.index + 1}</span>,
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
      const router = useRouter();

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
            variant: "success",
            description: "Data rekamMedis berhasil di hapus",
          });
        },
      });

      return (
        <div className="flex gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button">
                <EllipseVertical className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mr-20">
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <button
                    type="button"
                    onClick={() => {
                      router.push(`/dashboard/${row?.original?.id}`);
                      router.refresh();
                    }}
                  >
                    Edit
                  </button>
                  <DropdownMenuShortcut>
                    <Edit className="w-4 h-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    className="w-full text-left"
                    type="button"
                    onClick={() => {
                      deleteMutate(row?.original?.id);
                    }}
                  >
                    Delete
                  </button>
                  <DropdownMenuShortcut>
                    <Trash className="w-4 h-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href={`/dashboard/label/${row?.original?.id}`}
                  >
                    View
                  </Link>
                  <DropdownMenuShortcut>
                    <View className="w-4 h-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

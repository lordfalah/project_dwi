"use client";

import { Edit, Trash } from "lucide-react";

export const columns = [
  {
    accessorKey: "nama",
    header: "NAMA PASIEN",
  },
  {
    accessorKey: "umur",
    header: "UMUR",
  },
  {
    accessorKey: "keluhan",
    header: "KELUHAN",
  },
  {
    accessorKey: "obat",
    header: "OBAT",
  },

  {
    accessorKey: "diagnosa",
    header: "DIAGNOSA",
  },

  {
    header: "TINDAKAN",
    cell: ({ row }) => {
      return (
        <div className="flex gap-x-4">
          <button type="button">
            <Edit />
          </button>

          <button type="button">
            <Trash />
          </button>
        </div>
      );
    },
  },
];

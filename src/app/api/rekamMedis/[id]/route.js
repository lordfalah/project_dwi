import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const rekamMedis = await prisma.rekamMedis.delete({
      where: {
        id: params.id,
      },
    });

    if (!rekamMedis) return NextResponse.json(null, { status: 404 });

    return NextResponse.json(rekamMedis, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { resep, keluhan, diagnosa, keterangan, pasienId, dokterId, obats } =
      await req.json();
    if (!resep || !keluhan || !diagnosa || !keterangan) {
      return NextResponse.json(
        { message: "Isi semua fields !!!" },
        { status: 404 }
      );
    }

    const response = await prisma.rekamMedis.update({
      where: {
        id: params.id,
      },
      data: {
        resep,
        keluhan,
        diagnosa,
        keterangan,
        pasien: {
          connect: {
            id: pasienId,
          },
        },

        dokter: {
          connect: {
            id: dokterId,
          },
        },

        obat_pasien: {
          update: {
            data: {
              obat: obats,
            },
          },
        },
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

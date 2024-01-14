import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const rekamMedis = await prisma.rekamMedis.findMany({
      include: {
        dokter: true,
        pasien: true,
      },
    });

    return NextResponse.json(rekamMedis, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { resep, keluhan, diagnosa, keterangan, pasienId, dokterId, obats } =
      await req.json();
    if (
      !resep ||
      !keluhan ||
      !diagnosa ||
      !keterangan ||
      !pasienId ||
      !dokterId
    ) {
      return NextResponse.json(
        { message: "Isi semua fields !!!" },
        { status: 404 }
      );
    }

    const rekamMedis = await prisma.rekamMedis.create({
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
          create: {
            obat: obats,
          },
        },
      },
    });

    return NextResponse.json(rekamMedis, { status: 201 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

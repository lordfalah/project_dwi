import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const pasiens = await prisma.pasien.findMany({
      include: {
        rekamMedis: true,
      },
    });

    return NextResponse.json(pasiens, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { resep, keluhan, diagnosa, keterangan, pasienId, dokterId, obatId } =
      await req.json();
    if (
      !resep ||
      !keluhan ||
      !diagnosa ||
      !keterangan ||
      !pasienId ||
      !dokterId ||
      !obatId
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
        pasienId,
        dokterId,
        obatId,
      },
    });

    return NextResponse.json(rekamMedis, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

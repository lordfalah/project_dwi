import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const obat = await prisma.obat.findMany({
      include: {
        rekamMedis: true,
      },
    });

    return NextResponse.json(obat, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, ukuran, harga, keterangan } = await req.json();
    if (!name || !ukuran || !harga || !keterangan) {
      return NextResponse.json(
        { message: "Isi semua fields !!!" },
        { status: 404 }
      );
    }

    const obat = await prisma.obat.create({
      data: {
        name,
        ukuran: parseInt(ukuran),
        harga: parseFloat(harga),
        total_harga: parseFloat(harga),
        keterangan,
      },
    });

    return NextResponse.json(obat, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

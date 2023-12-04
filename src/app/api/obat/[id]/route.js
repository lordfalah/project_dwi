import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const obat = await prisma.obat.delete({
      where: {
        id: params.id,
      },
    });

    if (!obat) return NextResponse.json(null, { status: 404 });

    return NextResponse.json(obat, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { name, jumlah, ukuran, harga, keterangan } = await req.json();
    if (!name || !jumlah || !ukuran || !harga || !keterangan) {
      return NextResponse.json(
        { message: "Isi semua fields !!!" },
        { status: 404 }
      );
    }

    const response = await prisma.obat.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        jumlah: parseInt(jumlah),
        ukuran: parseInt(ukuran),
        harga: parseFloat(harga),
        keterangan,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const pasien = await prisma.pasien.findFirst({
      where: {
        id: params.id,
      },

      include: {
        rekamMedis: true,
      },
    });

    return NextResponse.json(pasien, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const pasien = await prisma.pasien.delete({
      where: {
        id: params.id,
      },
    });

    if (!pasien) return NextResponse.json(null, { status: 404 });

    return NextResponse.json(pasien, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { name, age, gender, address, gejala } = await req.json();
    if (!name || !age || !gender || !address || !gejala) {
      return NextResponse.json(
        { message: "Isi semua fields !!!" },
        { status: 404 }
      );
    }

    const response = await prisma.pasien.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        age: parseInt(age),
        gender,
        address,
        gejala,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

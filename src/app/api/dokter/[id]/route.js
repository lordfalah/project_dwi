import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const dokter = await prisma.dokter.findFirst({
      where: {
        id: params.id,
      },

      include: {
        rekamMedis: true,
      },
    });

    if (!dokter) return NextResponse.json(null, { status: 404 });

    return NextResponse.json(dokter, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const dokter = await prisma.dokter.delete({
      where: {
        id: params.id,
      },
    });

    if (!dokter) return NextResponse.json(null, { status: 404 });

    return NextResponse.json(dokter, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { name, address, email } = await req.json();
    if (!name || !address || !email) {
      return NextResponse.json(
        { message: "Isi semua fields !!!" },
        { status: 404 }
      );
    }

    const response = await prisma.dokter.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        address,
        email,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

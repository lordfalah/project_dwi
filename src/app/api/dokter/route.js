import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const dokter = await prisma.dokter.findMany({
      include: {
        rekamMedis: true,
      },
    });

    return NextResponse.json(dokter, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, address, email } = await req.json();
    if (!name || !address || !email) {
      return NextResponse.json(
        { message: "Isi semua fields !!!" },
        { status: 404 }
      );
    }

    const dokter = await prisma.dokter.create({
      data: {
        name,
        address,
        email,
      },
    });

    return NextResponse.json(dokter, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

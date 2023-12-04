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
    const { name, age, gender, address, gejala } = await req.json();
    if (!name || !age || !gender || !address || !gejala) {
      return NextResponse.json(
        { message: "Isi semua fields !!!" },
        { status: 404 }
      );
    }

    const pasien = await prisma.pasien.create({
      data: {
        name,
        age: parseInt(age),
        gender,
        address,
        gejala,
      },
    });

    return NextResponse.json(pasien, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

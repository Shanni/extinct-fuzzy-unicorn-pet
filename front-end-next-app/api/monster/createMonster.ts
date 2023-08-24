import { NextResponse } from "next/server";

import prisma from "@/api/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { level, name, rarity } = body;

  const monster = await prisma.monster.create({
    data: {
      level,
      name,
      rarity,
    },
  });

  return NextResponse.json(monster);
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const subject = params.get("subject");
  const topic = params.get("topic");
  const type = params.get("type");

  const questions = await prisma.question.findMany({
    where: {
      status: "PUBLISHED",
      ...(subject ? { subject: { slug: subject } } : {}),
      ...(topic ? { topic: { slug: topic } } : {}),
      ...(type === "map" ? { type: { in: ["MAP_SINGLE_PROVINCE", "MAP_MULTI_PROVINCE"] } } : {}),
    },
    select: {
      id: true, text: true, explanation: true, type: true, imageUrl: true,
      subject: { select: { slug: true, name: true, group: true } },
      topic: { select: { slug: true, name: true } },
      options: { select: { label: true, text: true, sortOrder: true }, orderBy: { sortOrder: "asc" } },
      mapAnswers: { select: { provinceId: true } },
    },
    take: Math.min(Math.max(Number(params.get("limit") ?? 20) || 20, 1), 100),
  });

  return NextResponse.json({ questions });
}

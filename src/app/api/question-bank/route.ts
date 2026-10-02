import { NextResponse } from "next/server";
import { readQuestions } from "@/lib/question-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ questions: readQuestions() }, { headers: { "Cache-Control": "no-store" } });
}

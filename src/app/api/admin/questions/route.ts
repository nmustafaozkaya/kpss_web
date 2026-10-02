import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyAdmin } from "@/lib/adminAuth";
import { readQuestions, writeQuestions } from "@/lib/question-store";

function deleteImageFile(imageUrl?: string | null) {
  if (!imageUrl) return;
  try {
    const cleanUrl = imageUrl.split("?")[0];
    if (!cleanUrl.startsWith("/uploads/questions/")) return;
    const root = path.resolve(process.cwd(), "public", "uploads", "questions");
    const fullPath = path.resolve(process.cwd(), "public", cleanUrl.slice(1));
    if (!fullPath.startsWith(root + path.sep)) return;
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.error("Error deleting image file:", err);
  }
}

export async function GET(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json(
      { error: "Yetkisiz erişim. Lütfen admin girişi yapın." },
      { status: 401 }
    );
  }

  const params = request.nextUrl.searchParams;
  const subject = params.get("subject");
  const topic = params.get("topic");
  const search = params.get("search");
  const hasImage = params.get("hasImage");

  let list = readQuestions();

  if (subject && subject !== "Tümü") {
    list = list.filter((q) => q.subject === subject);
  }

  if (topic && topic !== "Tümü") {
    list = list.filter((q) => q.topic === topic);
  }

  if (hasImage === "true") {
    list = list.filter((q) => Boolean(q.imageUrl));
  }

  if (search) {
    const s = search.toLocaleLowerCase("tr");
    list = list.filter((q) =>
      `${q.text} ${q.topic} ${q.subject} ${(q.options || []).join(" ")}`
        .toLocaleLowerCase("tr")
        .includes(s)
    );
  }

  return NextResponse.json({
    total: list.length,
    questions: list,
  });
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json(
      { error: "Yetkisiz erişim. Lütfen admin girişi yapın." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    if (!body.text || !body.subject || !Array.isArray(body.options) || body.options.length < 2) {
      return NextResponse.json(
        { error: "Geçersiz soru formatı. Metin, ders ve en az 2 şık zorunludur." },
        { status: 400 }
      );
    }

    const list = readQuestions();
    const newQuestion = {
      id: body.id || `q_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      subject: body.subject,
      topic: body.topic || "Genel",
      text: body.text,
      options: body.options,
      answer: typeof body.answer === "number" ? body.answer : 0,
      explanation: body.explanation || "",
      imageUrl: body.imageUrl || null,
    };

    list.unshift(newQuestion);
    writeQuestions(list);

    return NextResponse.json({ success: true, question: newQuestion });
  } catch (error) {
    return NextResponse.json(
      { error: "Soru eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json(
      { error: "Yetkisiz erişim. Lütfen admin girişi yapın." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Soru ID zorunludur." }, { status: 400 });
    }

    const list = readQuestions();
    const idx = list.findIndex((q) => q.id === body.id);
    if (idx === -1) {
      return NextResponse.json({ error: "Soru bulunamadı." }, { status: 404 });
    }

    list[idx] = {
      ...list[idx],
      subject: body.subject ?? list[idx].subject,
      topic: body.topic ?? list[idx].topic,
      text: body.text ?? list[idx].text,
      options: Array.isArray(body.options) ? body.options : list[idx].options,
      answer: typeof body.answer === "number" ? body.answer : list[idx].answer,
      explanation: body.explanation !== undefined ? body.explanation : list[idx].explanation,
      imageUrl: body.imageUrl !== undefined ? body.imageUrl : list[idx].imageUrl,
    };

    writeQuestions(list);

    return NextResponse.json({ success: true, question: list[idx] });
  } catch (error) {
    return NextResponse.json(
      { error: "Soru güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json(
      { error: "Yetkisiz erişim. Lütfen admin girişi yapın." },
      { status: 401 }
    );
  }

  try {
    const params = request.nextUrl.searchParams;
    const singleId = params.get("id");
    const idsParam = params.get("ids");
    
    let idsToDelete: string[] = [];

    if (singleId) {
      idsToDelete.push(singleId);
    } else if (idsParam) {
      idsToDelete = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
    } else {
      try {
        const body = await request.json();
        if (Array.isArray(body.ids)) {
          idsToDelete = body.ids.filter((id: unknown) => typeof id === "string" && id.trim().length > 0);
        } else if (body.id) {
          idsToDelete = [body.id];
        }
      } catch {
        // body parsing failed or was empty
      }
    }

    if (!idsToDelete.length) {
      return NextResponse.json(
        { error: "Silinecek soru ID veya ID listesi zorunludur." },
        { status: 400 }
      );
    }

    const toDeleteSet = new Set(idsToDelete);
    const list = readQuestions();
    
    const updated = list.filter((q) => !toDeleteSet.has(q.id));
    const deletedCount = list.length - updated.length;
    writeQuestions(updated);

    // Remove only images no remaining question uses, after saving the data.
    for (const q of list) {
      if (toDeleteSet.has(q.id) && q.imageUrl && !updated.some((other) => other.imageUrl === q.imageUrl)) {
        deleteImageFile(q.imageUrl);
      }
    }

    return NextResponse.json({ success: true, deletedCount });
  } catch (error) {
    return NextResponse.json(
      { error: "Soru silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

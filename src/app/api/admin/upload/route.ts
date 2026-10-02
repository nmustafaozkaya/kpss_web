import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyAdmin } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin())) {
    return NextResponse.json(
      { error: "Yetkisiz erişim. Lütfen admin girişi yapın." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Lütfen bir resim dosyası seçin." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    if (buffer.length > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Görsel en fazla 5 MB olabilir." }, { status: 400 });
    }
    const png = buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const jpeg = buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255;
    const webp = buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
    if (!png && !jpeg && !webp) return NextResponse.json({ error: "PNG, JPEG veya WebP görseli yükleyin." }, { status: 400 });

    const uploadsDir = process.env.QUESTION_UPLOAD_DIR || path.join(process.cwd(), "public", "uploads", "questions");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = png ? ".png" : jpeg ? ".jpg" : ".webp";
    const filename = `uploaded_${Date.now()}_${Math.random().toString(36).substr(2, 6)}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/questions/${filename}`,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Resim yüklenirken hata oluştu." }, { status: 500 });
  }
}

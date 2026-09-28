import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    const password = String(body.password ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Geçerli bir e-posta adresi gir." }, { status: 400 });
    if (name.length < 2 || name.length > 80) return NextResponse.json({ error: "Ad soyad 2–80 karakter arasında olmalı." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "Şifre en az 8 karakter olmalı." }, { status: 400 });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ error: "Bu e-posta adresi zaten kayıtlı. Giriş yapmayı dene." }, { status: 409 });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, name, passwordHash } });
    await createSession(user.id);
    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Kayıt sırasında bir hata oluştu." }, { status: 500 });
  }
}

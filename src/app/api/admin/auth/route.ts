import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  generateAdminToken,
  verifyAdmin,
} from "@/lib/adminAuth";

export async function GET() {
  const isAuth = await verifyAdmin();
  return NextResponse.json({
    authenticated: isAuth,
    email: isAuth ? DEFAULT_ADMIN_EMAIL : null,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();

    const expectedEmail = DEFAULT_ADMIN_EMAIL.toLowerCase();
    const expectedPassword = DEFAULT_ADMIN_PASSWORD;

    if (email !== expectedEmail || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Geçersiz yönetici e-posta adresi veya şifre." },
        { status: 401 }
      );
    }

    const token = generateAdminToken();
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, email: expectedEmail });
  } catch (error) {
    return NextResponse.json(
      { error: "Giriş yapılırken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  return NextResponse.json({ success: true });
}

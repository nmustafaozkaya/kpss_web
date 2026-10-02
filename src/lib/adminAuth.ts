import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_COOKIE = "sahmat_admin_session";

export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@sahmatkpss.com";
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "sahmat2026");

export function adminConfigured() {
  return Boolean(DEFAULT_ADMIN_PASSWORD && (process.env.ADMIN_SECRET || process.env.NODE_ENV !== "production"));
}

function getExpectedToken() {
  if (!adminConfigured()) throw new Error("Admin credentials are not configured");
  const secret = process.env.ADMIN_SECRET || "sahmat_super_admin_secret_key_2026";
  const email = DEFAULT_ADMIN_EMAIL;
  return crypto.createHmac("sha256", secret).update(email).digest("hex");
}

export async function verifyAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const expected = getExpectedToken();
  return token.length === expected.length && crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export function generateAdminToken(): string {
  return getExpectedToken();
}

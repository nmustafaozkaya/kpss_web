import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_COOKIE = "sahmat_admin_session";

export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@sahmatkpss.com";
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sahmat2026";

function getExpectedToken() {
  const secret = process.env.ADMIN_SECRET || "sahmat_super_admin_secret_key_2026";
  const email = DEFAULT_ADMIN_EMAIL;
  return crypto.createHmac("sha256", secret).update(email).digest("hex");
}

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return token === getExpectedToken();
}

export function generateAdminToken(): string {
  return getExpectedToken();
}

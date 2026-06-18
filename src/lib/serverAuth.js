import { cookies } from "next/headers";
import { getAdminUserFromToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return getAdminUserFromToken(token);
}

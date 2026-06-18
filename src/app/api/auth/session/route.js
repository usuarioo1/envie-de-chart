import { NextResponse } from "next/server";
import { getAdminUserFromRequest } from "@/lib/auth";

export async function GET(request) {
  try {
    const user = await getAdminUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Session invalide ou expirée" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json(
      { success: false, error: "Impossible de vérifier la session" },
      { status: 500 }
    );
  }
}

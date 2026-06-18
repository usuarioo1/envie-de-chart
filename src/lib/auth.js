import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const SESSION_COOKIE_NAME = "envie_admin_session";

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET || process.env.MONGODB_URI;

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured");
  }

  return secret;
}

function sign(value) {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

export function createSessionToken(user) {
  const payload = Buffer.from(
    JSON.stringify({
      userId: String(user._id || user.id),
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
    })
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (
      !session.userId ||
      session.role !== "admin" ||
      session.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function setSessionCookie(response, user) {
  response.cookies.set(SESSION_COOKIE_NAME, createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export function clearSessionCookie(response) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminUserFromToken(token) {
  const session = verifySessionToken(token);
  if (!session) return null;

  await connectDB();
  const user = await User.findById(session.userId)
    .select("_id name email role")
    .lean();

  if (!user || user.role !== "admin") return null;

  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function getAdminUserFromRequest(request) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return getAdminUserFromToken(token);
}

export async function requireAdmin(request) {
  const user = await getAdminUserFromRequest(request);

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, error: "Authentification administrateur requise" },
        { status: 401 }
      ),
    };
  }

  return { user, response: null };
}

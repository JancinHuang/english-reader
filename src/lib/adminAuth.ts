import crypto from "crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

type AdminSessionPayload = {
  v: 1;
  exp: number;
};

const COOKIE_NAME = "admin_session";

function mustGetEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

function base64UrlEncode(input: string) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64UrlDecode(input: string) {
  const padded = input.replaceAll("-", "+").replaceAll("_", "/");
  const padLen = (4 - (padded.length % 4)) % 4;
  const final = padded + "=".repeat(padLen);
  return Buffer.from(final, "base64").toString("utf8");
}

function sign(value: string) {
  const secret = mustGetEnv("ADMIN_SESSION_SECRET");
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function timingSafeEqualStrings(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) {
    return false;
  }
  return crypto.timingSafeEqual(ba, bb);
}

export async function createAdminSessionCookie() {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = { v: 1, exp: now + 60 * 60 * 24 * 7 };
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = base64UrlEncode(payloadStr);
  const sig = sign(payloadB64);
  const token = `${payloadB64}.${sig}`;

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSessionCookie() {
  const jar = await cookies();
  jar.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function isAdminRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return false;
  }

  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) {
    return false;
  }

  const expected = sign(payloadB64);
  const sigOk = timingSafeEqualStrings(expected, sig);
  if (!sigOk) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(payloadB64)) as AdminSessionPayload;
    if (payload.v !== 1) {
      return false;
    }
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string) {
  const expected = mustGetEnv("ADMIN_PASSWORD");
  return timingSafeEqualStrings(password, expected);
}

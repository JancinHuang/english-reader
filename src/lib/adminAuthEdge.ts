import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";

function mustGetEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

function base64UrlToBytes(input: string) {
  const b64 = input.replaceAll("-", "+").replaceAll("_", "/");
  const padLen = (4 - (b64.length % 4)) % 4;
  const padded = b64 + "=".repeat(padLen);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function hmacSha256Base64Url(message: string) {
  const secret = mustGetEnv("ADMIN_SESSION_SECRET");
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bytesToBase64Url(new Uint8Array(sig));
}

function base64UrlDecodeToString(input: string) {
  const bytes = base64UrlToBytes(input);
  return new TextDecoder().decode(bytes);
}

export async function isAdminRequestEdge(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return false;
  }
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) {
    return false;
  }

  const expected = await hmacSha256Base64Url(payloadB64);
  if (expected !== sig) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlDecodeToString(payloadB64)) as unknown;
    const p = payload as Record<string, unknown>;
    const now = Math.floor(Date.now() / 1000);
    return p?.v === 1 && typeof p?.exp === "number" && (p.exp as number) > now;
  } catch {
    return false;
  }
}

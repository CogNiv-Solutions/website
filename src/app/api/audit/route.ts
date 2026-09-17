import { NextRequest, NextResponse } from "next/server";
import { serverAuditSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { deliverAuditLead } from "@/lib/lead-delivery";
import { sanitizeFormInput } from "@/lib/sanitization";
import {
  checkHoneypot,
  checkSubmissionTime,
  verifyTurnstileToken,
  verifyRecaptchaToken,
} from "@/lib/bot-protection";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_PAYLOAD_BYTES = 16 * 1024; // 16 KB

const ALLOWED_ORIGINS = new Set([
  "https://cognivsolutions.in",
  "https://www.cognivsolutions.in",
  "http://cognivsolutions.in",
  "http://www.cognivsolutions.in",
]);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // Same-origin navigation or tools
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (origin.endsWith(".vercel.app")) return true;

  if (process.env.NODE_ENV !== "production") {
    try {
      const url = new URL(origin);
      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Origin / Cross-Site Check (CSRF defense)
    const origin = req.headers.get("origin");
    if (origin && !isAllowedOrigin(origin)) {
      return NextResponse.json(
        { ok: false, error: "Invalid request" },
        { status: 403 }
      );
    }

    // 2. Content-Type Check
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    // 3. Payload Size Guard (Header validation)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Payload too large" },
        { status: 413 }
      );
    }

    // 4. Rate Limiting Check (Max 3 submissions per IP per 10 minutes)
    const clientIp = getClientIp(req.headers);
    const rateLimit = await checkRateLimit(clientIp, 3, 10 * 60 * 1000);

    if (!rateLimit.success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a few minutes or connect on WhatsApp." },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetSeconds.toString(),
          },
        }
      );
    }

    // 5. Safe JSON Parsing & Buffer Size Guard
    let rawBody: unknown;
    try {
      const text = await req.text();
      if (text.length > MAX_PAYLOAD_BYTES) {
        return NextResponse.json(
          { ok: false, error: "Payload too large" },
          { status: 413 }
        );
      }
      if (!text.trim()) {
        return NextResponse.json(
          { ok: false, error: "Invalid request" },
          { status: 400 }
        );
      }
      rawBody = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    // 6. Strict Server-Side Schema Validation
    const parseResult = serverAuditSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form information. Please verify your details." },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 7. Anti-Spam Honeypot Verification (b_website & _hp)
    const honeypotResult = checkHoneypot(data);
    if (honeypotResult.isBot) {
      return NextResponse.json(
        { ok: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    // 8. Time-Analysis Validation (Rejects submissions under 2 seconds)
    if (data._formLoadedAt !== undefined) {
      const timeCheck = checkSubmissionTime(data._formLoadedAt, 2000);
      if (timeCheck.isBot) {
        return NextResponse.json(
          { ok: false, error: "Form submitted too quickly. Please take a moment to review." },
          { status: 400 }
        );
      }
    }

    // 9. Cloudflare Turnstile & Google reCAPTCHA v3 Server Verification
    if (process.env.TURNSTILE_SECRET_KEY) {
      const turnstileCheck = await verifyTurnstileToken(data.turnstileToken, clientIp);
      if (!turnstileCheck.success) {
        return NextResponse.json(
          { ok: false, error: "Bot verification failed. Please refresh and try again." },
          { status: 400 }
        );
      }
    }

    if (process.env.RECAPTCHA_SECRET_KEY) {
      const recaptchaCheck = await verifyRecaptchaToken(data.recaptchaToken, clientIp);
      if (!recaptchaCheck.success) {
        return NextResponse.json(
          { ok: false, error: "Bot verification failed. Please refresh and try again." },
          { status: 400 }
        );
      }
    }

    // 10. Deep Input Sanitization & Parameterization Layer
    const sanitizedData = sanitizeFormInput(data);

    // Strip internal bot verification meta-properties before delivery
    const leadData = { ...sanitizedData };
    delete (leadData as Record<string, unknown>).b_website;
    delete (leadData as Record<string, unknown>)._hp;
    delete (leadData as Record<string, unknown>)._formLoadedAt;
    delete (leadData as Record<string, unknown>).turnstileToken;
    delete (leadData as Record<string, unknown>).recaptchaToken;

    // 11. Secure Dispatch
    const delivery = await deliverAuditLead(leadData);

    if (!delivery.delivered && !delivery.configured) {
      console.warn("[AuditAPI] Delivery destination unconfigured in environment");
      return NextResponse.json(
        { ok: false, error: "Unable to process request" },
        { status: 500 }
      );
    }

    // 12. Generic, Sanitized Client Response
    // ZERO internal database errors or credential previews leaked to client
    return NextResponse.json(
      {
        ok: true,
        message: "Your audit request has been received. Our team will review your workflow.",
      },
      { status: 200 }
    );
  } catch (err) {
    // Log detailed error privately to server console only (never to client)
    console.error("[AuditAPI] Internal processing error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to process request" },
      { status: 500 }
    );
  }
}

// Explicit HTTP Method Protection (Only POST allowed)
const methodNotAllowed = () =>
  NextResponse.json(
    { ok: false, error: "Method not allowed" },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    }
  );

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}

export async function HEAD() {
  return methodNotAllowed();
}

export async function OPTIONS() {
  return methodNotAllowed();
}

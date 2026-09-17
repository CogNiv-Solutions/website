import { NextRequest, NextResponse } from "next/server";
import { serverAuditSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { deliverAuditLead } from "@/lib/lead-delivery";

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
  if (!origin) return true; // Direct/same-origin navigation or tools
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
    // 1. Origin / Cross-Site Check
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

    // 3. Payload Size Guard (Content-Length Header)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Payload too large" },
        { status: 413 }
      );
    }

    // 4. Rate Limiting Check
    const clientIp = getClientIp(req.headers);
    const rateLimit = await checkRateLimit(clientIp, 8, 10 * 60 * 1000);

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

    // 6. Server-Side Schema Validation
    const parseResult = serverAuditSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form information. Please verify your details." },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 7. Anti-Spam Honeypot Verification
    if (data._hp && data._hp.trim().length > 0) {
      // Reject bot submission without leaking internal reason
      return NextResponse.json(
        { ok: false, error: "Invalid request" },
        { status: 400 }
      );
    }

    // 8. Lead Delivery & Structured Preservation Layer
    const leadData = { ...data };
    delete (leadData as Record<string, unknown>)._hp;

    // Guaranteed runtime log capture (visible in Vercel Function logs)
    console.info("[AUDIT_LEAD_RECORDED]", JSON.stringify({
      lead: leadData,
      ip: clientIp,
      receivedAt: new Date().toISOString(),
    }));

    const delivery = await deliverAuditLead(leadData);

    // Return success to the legitimate user who submitted their request
    return NextResponse.json(
      {
        ok: true,
        delivered: delivery.delivered,
        diagnostics: {
          configured: delivery.configured,
          hasKey: delivery.debug?.hasKey,
          resendStatus: delivery.debug?.resendStatus,
          resendError: delivery.debug?.resendError,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[AuditAPI] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to process request" },
      { status: 500 }
    );
  }
}

// Phase 8: Explicit HTTP Method Protection
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

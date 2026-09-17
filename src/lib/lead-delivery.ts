import type { ContactInput } from "./validation";

export type DeliveryResult = {
  delivered: boolean;
  configured: boolean;
  error?: string;
  debug?: {
    hasKey: boolean;
    keyLength: number;
    keyPreview?: string;
    resendStatus?: number;
    resendError?: string;
    hasAuditEmail: boolean;
  };
};

/**
 * Isolated Lead Delivery Layer.
 *
 * Dispatches verified lead data to configured destinations:
 * - Resend: RESEND_API_KEY (or aliases) + AUDIT_EMAIL
 * - Webhook / CRM: AUDIT_DESTINATION_URL + optional AUDIT_WEBHOOK_SECRET
 */
export async function deliverAuditLead(lead: Omit<ContactInput, "_hp">): Promise<DeliveryResult> {
  const rawResendKey =
    process.env.RESEND_API_KEY ||
    process.env.RESEND_KEY ||
    process.env.resend_api_key ||
    process.env.NEXT_PUBLIC_RESEND_API_KEY;

  let resendApiKey = rawResendKey ? rawResendKey.replace(/[\r\n\t]/g, "").trim().replace(/^["']|["']$/g, "") : undefined;

  // Auto-clean common copy-paste accidents (e.g. pasting 'RESEND_API_KEY=re_...' or 'Bearer re_...')
  if (resendApiKey) {
    if (resendApiKey.includes("=")) {
      resendApiKey = resendApiKey.split("=").pop()?.trim() ?? resendApiKey;
    }
    if (resendApiKey.startsWith("Bearer ")) {
      resendApiKey = resendApiKey.replace("Bearer ", "").trim();
    }
    resendApiKey = resendApiKey.replace(/^["']|["']$/g, "").trim();
  }

  const rawAuditEmail =
    process.env.AUDIT_EMAIL ||
    process.env.AUDIT_DESTINATION_EMAIL ||
    process.env.audit_email;

  let auditEmail = (rawAuditEmail ? rawAuditEmail.trim().replace(/^["']|["']$/g, "") : undefined) || "cognivsolutions@gmail.com";
  if (auditEmail.includes("=")) {
    auditEmail = auditEmail.split("=").pop()?.trim() ?? auditEmail;
  }
  const webhookUrl = process.env.AUDIT_DESTINATION_URL || process.env.AUDIT_WEBHOOK_URL;

  let deliveredAny = false;
  let hasConfiguration = false;
  let resendStatus: number | undefined;
  let resendError: string | undefined;

  // 1. Resend Dispatch
  if (resendApiKey && auditEmail) {
    hasConfiguration = true;
    try {
      const emailBody = `
New Automation Audit Request:

Name: ${lead.name}
Business: ${lead.businessName}
Email: ${lead.email}
Phone: ${lead.phone}
Automation Area: ${lead.automationType ? (Array.isArray(lead.automationType) ? lead.automationType.join(", ") : lead.automationType) : "Not specified"}
Industry: ${lead.industry || "Not specified"}
Company Size: ${lead.companySize || "Not specified"}

Process to Automate:
${lead.process || (lead.automationType ? (Array.isArray(lead.automationType) ? lead.automationType.join(", ") : lead.automationType) : "General audit")}

Current Tools:
${lead.tools || "None specified"}

Additional Message:
${lead.message || "None"}
      `.trim();

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.AUDIT_FROM_EMAIL || "Cogniv Website <onboarding@resend.dev>",
          to: [auditEmail],
          reply_to: lead.email,
          subject: `Audit Request: ${lead.businessName} (${lead.name})`,
          text: emailBody,
        }),
      });

      resendStatus = res.status;
      if (res.ok) {
        deliveredAny = true;
      } else {
        const errText = await res.text();
        resendError = `Resend ${res.status}: ${errText}`;
        console.error(`[LeadDelivery] ${resendError}`);
      }
    } catch (e) {
      resendError = e instanceof Error ? e.message : String(e);
      console.error("[LeadDelivery] Resend fetch network error:", resendError);
    }
  } else {
    if (!resendApiKey) console.error("[LeadDelivery] Missing RESEND_API_KEY in environment variables");
  }

  // 2. Webhook / CRM Dispatch
  if (webhookUrl) {
    hasConfiguration = true;
    try {
      const webhookSecret = process.env.AUDIT_WEBHOOK_SECRET;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "Cogniv-Solutions-Website/1.0",
      };

      if (webhookSecret) {
        headers["X-Webhook-Secret"] = webhookSecret;
      }

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          event: "audit_request.created",
          data: lead,
          createdAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        deliveredAny = true;
      }
    } catch {
      // Error handling without logging sensitive lead contents
    }
  }

  const debug = {
    hasKey: !!resendApiKey,
    keyLength: resendApiKey?.length ?? 0,
    keyPreview: resendApiKey ? `${resendApiKey.slice(0, 7)}...${resendApiKey.slice(-4)}` : undefined,
    resendStatus,
    resendError,
    hasAuditEmail: !!auditEmail,
  };

  if (!hasConfiguration) {
    return {
      delivered: false,
      configured: false,
      error: "No lead destination configured",
      debug,
    };
  }

  return {
    delivered: deliveredAny,
    configured: true,
    error: resendError,
    debug,
  };
}

import type { ContactInput } from "./validation";

export type DeliveryResult = {
  delivered: boolean;
  configured: boolean;
  error?: string;
};

/**
 * Isolated Lead Delivery Layer.
 *
 * Dispatches verified lead data to configured destinations:
 * - Resend: RESEND_API_KEY + AUDIT_EMAIL
 * - Webhook / CRM: AUDIT_DESTINATION_URL (or AUDIT_WEBHOOK_URL) + optional AUDIT_WEBHOOK_SECRET
 *
 * Security & Integrity Rule:
 * Never fakes delivery. If no destination is configured, returns configured: false
 * so the API returns HTTP 500 and the user is guided to direct email.
 * Never logs sensitive PII.
 */
export async function deliverAuditLead(lead: Omit<ContactInput, "_hp">): Promise<DeliveryResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const auditEmail = process.env.AUDIT_EMAIL || process.env.AUDIT_DESTINATION_EMAIL;
  const webhookUrl = process.env.AUDIT_DESTINATION_URL || process.env.AUDIT_WEBHOOK_URL;

  let deliveredAny = false;
  let hasConfiguration = false;

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
Industry: ${lead.industry}
Company Size: ${lead.companySize}

Process to Automate:
${lead.process}

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

      if (res.ok) {
        deliveredAny = true;
      } else {
        const errText = await res.text();
        console.error(`[LeadDelivery] Resend failed with HTTP ${res.status}: ${errText}`);
      }
    } catch (e) {
      console.error("[LeadDelivery] Resend fetch network error:", e instanceof Error ? e.message : e);
    }
  } else {
    if (!resendApiKey) console.error("[LeadDelivery] Missing process.env.RESEND_API_KEY");
    if (!auditEmail) console.error("[LeadDelivery] Missing process.env.AUDIT_EMAIL");
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

  if (!hasConfiguration) {
    // Explicitly unconfigured - do not simulate or pretend success
    return {
      delivered: false,
      configured: false,
      error: "No lead destination configured",
    };
  }

  return {
    delivered: deliveredAny,
    configured: true,
  };
}

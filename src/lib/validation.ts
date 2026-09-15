import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  businessName: z.string().min(2, "Please enter your business name"),
  email: z.string().email("Enter a valid work email"),
  phone: z
    .string()
    .min(6, "Enter a valid phone number")
    .max(20, "Enter a valid phone number"),
  industry: z.string().min(1, "Select an industry"),
  companySize: z.string().min(1, "Select company size"),
  process: z.string().min(10, "Describe the process in a few words (min 10 characters)"),
  tools: z.string().optional(),
  message: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export async function submitAuditRequest(data: ContactInput): Promise<{ ok: boolean }> {
  // Abstraction point: swap this with your API route / CRM webhook later.
  // e.g. await fetch("/api/audit", { method: "POST", body: JSON.stringify(data) })
  await new Promise((r) => setTimeout(r, 1400));
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem("cogniv-audit-requests") ?? "[]");
      existing.push({ ...data, at: new Date().toISOString() });
      localStorage.setItem("cogniv-audit-requests", JSON.stringify(existing));
    } catch {
      /* storage unavailable — still resolve */
    }
  }
  return { ok: true };
}

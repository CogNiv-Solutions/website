import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long (max 100 characters)"),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business name")
    .max(150, "Business name is too long (max 150 characters)"),
  email: z
    .string()
    .trim()
    .email("Enter a valid work email")
    .max(254, "Email is too long (max 254 characters)"),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(30, "Phone number is too long (max 30 characters)"),
  industry: z
    .string()
    .trim()
    .min(1, "Select an industry")
    .max(100, "Industry is too long (max 100 characters)"),
  companySize: z
    .string()
    .trim()
    .min(1, "Select company size")
    .max(50, "Company size is too long (max 50 characters)"),
  process: z
    .string()
    .trim()
    .min(10, "Describe the process in a few words (min 10 characters)")
    .max(3000, "Process description is too long (max 3000 characters)"),
  tools: z
    .string()
    .trim()
    .max(500, "Tools field is too long (max 500 characters)")
    .optional(),
  message: z
    .string()
    .trim()
    .max(3000, "Message is too long (max 3000 characters)")
    .optional(),
  _hp: z
    .string()
    .max(100, "Invalid field")
    .optional(),
});

export const serverAuditSchema = contactSchema.strict();

export type ContactInput = z.infer<typeof contactSchema>;

export type SubmitAuditResult = {
  ok: boolean;
  status: number;
  error?: string;
};

export async function submitAuditRequest(data: ContactInput): Promise<SubmitAuditResult> {
  try {
    const response = await fetch("/api/audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: result?.error ?? "Unable to process request",
      };
    }

    return {
      ok: true,
      status: response.status,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: "Unable to process request",
    };
  }
}

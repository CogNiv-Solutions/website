import { z } from "zod";

// Strict Regexes for Whitelist Validation
// Name: Letters (any language/unicode), spaces, hyphens, apostrophes, and periods (2 to 100 chars)
const NAME_REGEX = /^[\p{L}\p{M}\s.'\-]{2,100}$/u;

// Phone: Standard international/domestic phone format (6 to 30 chars, digits, +, spaces, hyphens, parentheses)
const PHONE_REGEX = /^\+?[0-9\s\-()]{6,30}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long (max 100 characters)")
    .regex(NAME_REGEX, "Name contains invalid characters"),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business name")
    .max(150, "Business name is too long (max 150 characters)"),
  email: z
    .string()
    .trim()
    .email("Enter a valid work email")
    .max(254, "Email is too long (max 254 characters)")
    .refine((val) => !/[\r\n\t\0]/.test(val), "Email contains invalid control characters"),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(30, "Phone number is too long (max 30 characters)")
    .regex(PHONE_REGEX, "Enter a valid phone number"),
  automationType: z
    .union([z.string(), z.array(z.string())])
    .optional(),
  industry: z
    .string()
    .trim()
    .max(100, "Industry is too long")
    .optional(),
  companySize: z
    .string()
    .trim()
    .max(50, "Company size is too long")
    .optional(),
  process: z
    .string()
    .trim()
    .max(3000, "Process description is too long")
    .optional(),
  tools: z
    .string()
    .trim()
    .max(500, "Tools field is too long")
    .optional(),
  message: z
    .string()
    .trim()
    .max(3000, "Message is too long")
    .optional(),
  // Anti-Spam Honeypots
  b_website: z
    .string()
    .max(100, "Invalid field")
    .optional(),
  _hp: z
    .string()
    .max(100, "Invalid field")
    .optional(),
  // Time-Analysis Validation (Render timestamp in ms)
  _formLoadedAt: z
    .number()
    .int()
    .positive()
    .optional(),
  // Bot Verification Tokens (Turnstile / reCAPTCHA)
  turnstileToken: z
    .string()
    .max(2048)
    .optional(),
  recaptchaToken: z
    .string()
    .max(2048)
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
